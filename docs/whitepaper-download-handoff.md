# 資料ダウンロード機能 移管仕様書

対象ページ：`/whitepaper`（資料紹介・フォーム）、`/whitepaper/downloaded`（ダウンロード完了）、`/whitepaper/denied`（不正アクセス）

他プロジェクトへ同機能を移植する際に必要な、画面・API・DB・ストレージ・環境変数・メール送信の一式をまとめたもの。

---

## 1. 画面構成とユーザーフロー

```
/whitepaper（フォーム入力）
  → POST /api/whitepaper（DB保存 + トークン発行 + メール送信）
  → クライアント側で Cookie(ascent_whitepaper_downloaded=1) をセット
  → /whitepaper/downloaded へ遷移（フォーム送信完了画面）

ユーザーがメール内のリンクをクリック
  → GET /api/whitepaper/download?token=xxx
  → Supabase Storage から PDF を取得して返却（ダウンロード開始）
```

`/whitepaper/downloaded` は、直接URLを叩いて開けないよう Cookie ガードがかかっている。Cookie が無い場合は `/whitepaper/denied`（不正アクセス画面）と同じ `DeniedAccess` コンポーネントを表示する。

---

## 2. ファイル一覧

| ファイル | 役割 |
|---|---|
| `src/app/whitepaper/page.tsx` | 資料紹介ページ（目次・フォームセクション） |
| `src/app/whitepaper/downloaded/page.tsx` | ダウンロード完了ページ。`force-dynamic`（Cookie読み取りのため） |
| `src/app/whitepaper/denied/page.tsx` | 不正アクセスページ |
| `src/components/whitepaper/DownloadForm.tsx` | フォーム本体（クライアントコンポーネント） |
| `src/components/access/DeniedAccess.tsx` | 完了画面・不正アクセス画面で共用するUI |
| `src/lib/completion-access.ts` | Cookie名・有効期限・判定関数（サーバー/クライアント共通） |
| `src/lib/completion-access.client.ts` | Cookieセット関数（クライアント専用） |
| `src/lib/whitepaper-download.ts` | ダウンロード関連の定数（バケット名、ファイル名など） |
| `src/lib/contact-blocking.ts` | メールドメインのブロックリスト判定（お問い合わせフォームと共用） |
| `src/lib/website-validation.ts` | Webサイト欄のバリデーション（お問い合わせフォームと共用） |
| `src/lib/supabase/admin.ts` | Supabase Service Role クライアント生成 |
| `src/app/api/whitepaper/route.ts` | フォーム送信API（DB保存＋メール送信） |
| `src/app/api/whitepaper/download/route.ts` | PDFダウンロードAPI（トークン検証＋Storage取得） |
| `src/emails/WhitepaperConfirmEmail.tsx` | ユーザー宛メール（ダウンロードリンク） |
| `src/emails/WhitepaperAdminEmail.tsx` | 管理者宛通知メール |

---

## 3. Cookie 仕様（完了画面ガード）

`src/lib/completion-access.ts`:

```ts
export const CONTACT_THANKS_COOKIE = "ascent_contact_thanks";
export const WHITEPAPER_DOWNLOADED_COOKIE = "ascent_whitepaper_downloaded";
export const COMPLETION_COOKIE_MAX_AGE = 10 * 60; // 10分

export function hasCompletionAccess(cookieValue: string | undefined): boolean {
  return cookieValue === "1";
}
```

- フォーム送信成功時、クライアント側で `document.cookie` に `ascent_whitepaper_downloaded=1`（Max-Age 10分、`SameSite=Lax`、httpsなら`Secure`付き）をセットする。
- `/whitepaper/downloaded` はサーバーコンポーネントで `cookies()` を読み、値が `"1"` でなければ `DeniedAccess` を表示する（`force-dynamic` 必須）。
- この仕組みは `/contact/thanks`（お問い合わせ完了画面）とも共通（`CONTACT_THANKS_COOKIE`）。移植時は他プロジェクトの完了画面と混同しないよう、Cookie名を変える場合はここを修正する。

---

## 4. フォーム項目とバリデーション

`DownloadForm.tsx` の Zod スキーマ：

| 項目 | 型 | 必須 | バリデーション |
|---|---|---|---|
| company（会社名） | string | ✓ | 1文字以上 |
| role（役職） | string | ✓ | 1文字以上 |
| name（お名前） | string | ✓ | 1文字以上 |
| phone（電話番号） | string | ✓ | 正規表現 `^[\d\-\+\(\)\s]{10,15}$` |
| email（メール） | string | ✓ | メール形式＋ブロックドメインチェック |
| industry（業種） | string | ✓ | プルダウン選択必須（選択肢はコード内に固定配列） |
| website（Webサイト） | string | 任意 | `isValidWebsiteValue()` で形式チェック（空文字は許可） |
| challenge（現在の課題） | string | ✓ | 10文字以上 |
| human（ロボットでない） | boolean | ✓ | true必須 |
| agree（個人情報同意） | boolean | ✓ | true必須（`/privacy` へのリンクを表示） |

送信成功後、フロントは以下を実行：
1. `setCompletionAccessCookie(WHITEPAPER_DOWNLOADED_COOKIE)` でCookieセット
2. `router.push('/whitepaper/downloaded')` で完了画面へ遷移

---

## 5. API仕様

### `POST /api/whitepaper`

- 必須フィールド（company/role/name/phone/email/industry/challenge）欠落 → `400 { error: 'missing_required_fields' }`
- ブロックドメイン → `400 { error: 'blocked_domain' }`
- Supabaseへのinsert失敗 → `500 { error: 'db_error' }`
- 確認メール送信失敗 → `500 { error: 'email_error' }`
- 管理者通知メール送信失敗はログのみ（レスポンスは失敗させない）
- 成功時 → `200 { ok: true }`

処理内容：
1. `randomUUID()` でダウンロードトークンを発行
2. Supabaseテーブル `whitepaper_downloads` へ全項目＋トークンをinsert
3. ダウンロードURL（`/api/whitepaper/download?token=xxx`）を生成
4. Resendでユーザー宛の確認メール（ダウンロードリンク付き）を送信
5. Resendで管理者宛の通知メールを送信

### `GET /api/whitepaper/download?token=xxx`

- `token` パラメータなし → `/whitepaper/denied` へ302リダイレクト
- Supabaseに該当トークンのレコードが無い → `/whitepaper/denied` へリダイレクト
- Supabase Storageからのファイル取得失敗 → `/whitepaper/denied` へリダイレクト
- 成功時 → PDFバイナリを `Content-Type: application/pdf`、`Content-Disposition: attachment` で返却

`runtime = 'nodejs'` 指定（Supabase Storageのバイナリ処理のため）。

---

## 6. Supabase（DB / Storage）

### テーブル: `whitepaper_downloads`

コード上でinsertしているカラム：

| カラム | 型（想定） | 説明 |
|---|---|---|
| company | text | 会社名 |
| role | text | 役職 |
| name | text | 氏名 |
| phone | text | 電話番号 |
| email | text | メールアドレス |
| industry | text | 業種 |
| website | text | Webサイト（空文字可） |
| challenge | text | 課題内容 |
| download_token | text (unique推奨) | ダウンロードトークン（UUID） |

※ `id`, `created_at` 等はSupabase側のデフォルト構成に準拠（コード側では明示していない）。移植先で新規にテーブルを作る場合は、`download_token` にユニーク制約を張ることを推奨。

### Storage バケット

- バケット名: `whitepaper-assets`（`WHITEPAPER_STORAGE_BUCKET`）
- オブジェクトパス: `whitepaper.pdf`（`WHITEPAPER_STORAGE_OBJECT_PATH`）
- ダウンロード時のファイル名: `GEOサービス紹介資料.pdf`（`WHITEPAPER_DOWNLOAD_FILENAME`、UTF-8エンコードしてContent-Dispositionに設定）
- バケットは非公開のままでよい（Service Role Keyでサーバー経由アクセスするため、公開URL化は不要）

`src/lib/whitepaper-download.ts` に定数がまとまっているので、移植先ではこのファイルのバケット名・オブジェクトパス・ファイル名を変更するだけで良い。

---

## 7. 環境変数

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクトURL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key（サーバー専用、公開厳禁） |
| `RESEND_API_KEY` | Resend APIキー（メール送信） |
| `RESEND_FROM_EMAIL` | 送信元メールアドレス（未設定時は `geo@ascentnet.co.jp` にフォールバック） |
| `CONTACT_ADMIN_EMAIL` | 管理者通知の宛先（未設定時は `geo@ascentnet.co.jp` にフォールバック） |
| `BLOCKED_EMAIL_DOMAINS` | カンマ区切りのブロック対象ドメインリスト |

---

## 8. 移植時のチェックリスト

- [ ] Supabaseプロジェクトに `whitepaper_downloads` テーブルを作成（またはリネーム）
- [ ] Supabase Storageに非公開バケットを作成し、PDFをアップロード
- [ ] `src/lib/whitepaper-download.ts` のバケット名・パス・ファイル名を移植先の資料に合わせて変更
- [ ] Resendのドメイン認証・送信元アドレスを移植先用に設定
- [ ] 環境変数一式（上記7項目）を移植先の `.env` に設定
- [ ] Cookie名（`ascent_whitepaper_downloaded`）が他システムと衝突しないか確認。衝突する場合は `completion-access.ts` で名称変更
- [ ] `/privacy` へのリンク（同意チェックボックス内）を移植先の実際のプライバシーポリシーURLに差し替え
- [ ] フォームの業種選択肢（`INDUSTRIES` 配列）を業種・業界に応じて見直し
- [ ] メールテンプレート（`WhitepaperConfirmEmail.tsx` / `WhitepaperAdminEmail.tsx`）の文言・ブランド名を差し替え
- [ ] `/whitepaper/downloaded` ページの電話番号・問い合わせ導線を移植先の情報に差し替え
