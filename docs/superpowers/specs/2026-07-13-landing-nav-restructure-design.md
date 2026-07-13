# ランディング / ナビゲーション再構成 設計書

作成日: 2026-07-13

## 背景・目的

現在のグローバルナビゲーションは `Why Ascent / Framework / Services / GEO Lab / Contact` の5項目。
これを `モニタリングツール / 診断ツール / GEO Lab / Contact` の4項目に変更する。

- 「モニタリングツール」= 新規ページ `/watcher`（GEO Watcher 紹介）
- 「診断ツール」= 新規ページ `/shindan`（構成案は別途作成予定。今回はルーティングのみ先行構築）

既存の `/why-ascent`, `/framework`, `/services` ページはファイルとして削除しない（コードはローカル・Git に残す）。
ナビゲーション・フッター・サイトマップ・ランディング内リンクからのみ参照を外す。URL直接アクセスは許容する（404化はしない）。

## スコープ

### 1. ヘッダー / モバイルメニュー（`src/components/layout/Header.tsx`）

nav配列（デスクトップ・モバイル両方）を以下に置換：

```
{ label: "モニタリングツール", href: "/watcher" }
{ label: "診断ツール", href: "/shindan" }
{ label: "GEO Lab", href: "/lab" }
{ label: "Contact", href: "/contact" }
```

### 2. フッター（`src/components/layout/Footer.tsx`）

Sitemap欄のリストを以下に置換：

```
{ label: "Home", href: "/" }
{ label: "モニタリングツール", href: "/watcher" }
{ label: "診断ツール", href: "/shindan" }
{ label: "GEO Lab", href: "/lab" }
```

### 3. 新規ページ `/watcher`

`docs/watcher構成.md` の9セクション（フッターを除く）を反映した単一ページを新規作成する。

- ファイル: `src/app/watcher/page.tsx`
- メタデータ: `buildPageMetadata` で他ページと同様に設定（title/description は文書のヘッドコピーを基に作成）
- 構成（上から順）:
  1. **ファーストビュー** — ヘッドコピー「GEO（LLMO・AEO）対策のモニタリングツールなら、GEO Watcher」+ サブコピー。右側もしくは下部に既存 `ContactForm` コンポーネントを再利用したお問い合わせフォームを設置（項目は既存フォームのまま。問い合わせ種別プルダウンの選択肢がwatcher構成.md記載内容と異なる場合は既存フォームの仕様を優先する）
  2. **課題提起** — 3つの小見出し（検索行動の変化／自社競合の変化把握／継続的な追跡の必要性）
  3. **課題へのアンサー** — GEO Watcherの一行紹介
  4. **操作画面・主要機能** — 動画埋め込み枠（YouTube: `https://www.youtube.com/watch?v=uHXiUjXvr6U`）+ 4機能カード（AI可視性／プロンプト／シェア・オブ・ボイス／引用URL）+ CTA
  5. **選ばれる理由** — 6項目の特徴リスト
  6. **料金プラン** — 4プラン横並び（ライト/スタンダード/アドバンス/カスタマイズ）+ CTA。カスタマイズプランの「50〜200の幅で自由選択」ポップアップは今回のスコープ外（静的テキスト表示のみ）
  7. **FAQ** — 10問（アコーディオンまたは単純リスト。既存サイトにアコーディオンパターンがなければ単純リスト表示を採用）
  8. 既存 `<Footer />` を使用（ページ固有フッターは作らない）
- 画像（image1〜6参照）は元ドキュメントが外部URL参照のみで実体を持たないため、今回は画像なしのテキスト構成で実装する。将来画像素材が用意され次第差し込み可能な構造にする。

### 4. 新規ページ `/shindan`

- ファイル: `src/app/shindan/page.tsx`
- 今回は **ルーティングの先行構築のみ**。コンテンツは `/watcher` と同一のセクション構成を暫定的に流用する（コピー＆コンポーネント共通化どちらでも可、実装時に判断）。
- ページ内に「本ページのコンテンツは暫定版であり、正式な構成案は別途反映予定」の旨がひと目でわかるよう、コード上にコメントを残す（本番表示テキストとしては出さない）。

### 5. 既存3ページ（`/why-ascent`, `/framework`, `/services`）

- ページファイル自体は変更しない。
- 参照除去対象：
  - `Header.tsx` nav配列
  - `Footer.tsx` Sitemap配列
  - `public/sitemap.xml` の該当3 `<url>` エントリ
  - ランディングページ（`src/app/page.tsx`）内 `WhyAscentSection` 関数呼び出しとその定義
  - `src/components/home/FrameworkSection.tsx` の呼び出し（`page.tsx` 内 `<FrameworkSection />`）。コンポーネントファイル自体は削除しない（未使用コンポーネントとして残置、または削除は任意 — 今回は呼び出しのみ除去し、ファイルは残す）

### 6. ランディングページ構成変更（`src/app/page.tsx`）

現行: `Hero → SearchShift → WhyAscent → Framework → Services → GeoLab → CTA`

変更後: `Hero → SearchShift → WatcherShindanIntro（新規） → Services → GeoLab → CTA`

新規セクション `WatcherShindanIntro`:
- 既存 `ServicesSection` 内のカードスタイル（白背景カード + card-hover + 詳しく見る→ボタン）を踏襲した、横並び2カードのシンプルな紹介セクション
- カード1: モニタリングツール（GEO Watcher）紹介 + 「詳しく見る →」で `/watcher` へ
- カード2: 診断ツール紹介 + 「詳しく見る →」で `/shindan` へ
- 見出し・リード文はSectionLabel（例: `MONITORING & DIAGNOSIS`）+ 短い導入コピーを新規作成

## 除外事項（今回のスコープ外）

- `/shindan` の正式コンテンツ設計（別途ユーザーが構成案を用意）
- 既存3ページの完全削除・404化
- watcher構成.md記載の画像素材の実装（実体ファイルが存在しないため）
- カスタマイズプランのポップアップUI

## リスク・確認事項

- `docs/watcher構成.md` の問い合わせフォーム項目（会社名/お名前/電話番号/メールアドレス/問い合わせ種別プルダウン/プライバシー同意）と既存 `ContactForm` コンポーネントの実際のprops/フィールドが一致しない場合、既存コンポーネントの仕様を優先し、文書の項目名は参考情報として扱う。
