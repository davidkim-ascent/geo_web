# ホームページ・ナビゲーション リニューアル Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `docs/01. GEOリニューアル-ホーム.docx` の新コンテンツ構成に合わせて、ヘッダーナビゲーションとトップページ（`/`）のセクション構成・コピーを刷新する。

**Architecture:** `Header.tsx` のナビ配列を1項目追加のみで更新。`src/app/page.tsx` は既存のセクション関数群（`HeroSection`, `SearchShiftSection`, `WatcherShindanSection`, `ServicesSection`, `GeoLabSection`）を、新しいセクション構成（Hero改修 → 2ソリューション紹介 → 課題提示 → 解決フロー → GEO Lab → CTA）に置き換える。既存のデザイントークン（`SectionLabel`, `card-hover`, `tag-blue`/`tag-dark`, `text-blue-gradient`, `CTASection`, `Button` variants）を再利用し、新規CSSは追加しない。

**Tech Stack:** Next.js App Router, React Server Components (page.tsx は `"use client"` なし), Tailwind (インラインstyleとの併用), 既存の `globals.css` ユーティリティクラス。

このプロジェクトにはページコンポーネント向けのユニットテストが存在しないため、各タスクの「テスト」はローカル開発サーバー（`npm run dev`、既に起動中: http://localhost:3000）でのブラウザ目視確認に置き換える。

---

## 事前情報：この計画のベースとなる設計書

`docs/superpowers/specs/2026-08-03-home-renewal-design.md` に全文あり。本計画はその内容をタスクに分解したもの。

## 事前情報：現状のファイル構造

- `src/components/layout/Header.tsx` — ヘッダーナビ（デスクトップ40行目付近の配列、モバイル73行目付近の配列、2箇所に同じ配列がある）
- `src/app/page.tsx` — 847行、6つのセクション関数 + `Home` root export
  - `SectionLabel` (30-37行目) — 汎用ラベルコンポーネント、削除しない
  - `HeroSection` (42-201行目) — 改修対象
  - `SearchShiftSection` (206-352行目) — 削除対象
  - `WatcherShindanSection` (357-409行目) — 置換対象
  - `ServicesSection` (414-643行目) — 削除対象
  - `GeoLabSection` (648-830行目) — コピーのみ差し替え、構造は維持
  - `Home` root (835-846行目) — 呼び出すセクションを差し替え
- `src/components/layout/CTASection.tsx` — 既存の再利用可能なCTAセクション（kicker/title/description/primaryButton/secondaryButtons props）。Task 6でこれを直接使う。
- `src/components/contact/CalendarBookingButton.tsx` — Hero右カラムのCTAボタン、変更しない
- `src/components/ui/button.tsx` — `variant="detail"`（カード内リンク）, `variant="ctaOutline"`/`"cta"`（CTAセクション）を使う

---

### Task 1: ヘッダーナビゲーション更新

**Files:**
- Modify: `src/components/layout/Header.tsx:28-33` (デスクトップnav配列)
- Modify: `src/components/layout/Header.tsx:73-78` (モバイルnav配列)

- [ ] **Step 1: デスクトップnav配列を更新**

`src/components/layout/Header.tsx` の28-33行目、現状:

```tsx
          {[
            { label: "モニタリングツール", href: "/watcher" },
            { label: "診断ツール", href: "/shindan" },
            { label: "GEO Lab", href: "/lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
```

これを次に置き換える:

```tsx
          {[
            { label: "Home", href: "/" },
            { label: "GEO Watcher", href: "/watcher" },
            { label: "GEO 診断", href: "/shindan" },
            { label: "GEO LAB", href: "/lab" },
          ].map((item) => (
```

- [ ] **Step 2: モバイルnav配列を同様に更新**

`src/components/layout/Header.tsx` の73-78行目、現状:

```tsx
          {[
            { label: "モニタリングツール", href: "/watcher" },
            { label: "診断ツール", href: "/shindan" },
            { label: "GEO Lab", href: "/lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
```

これを次に置き換える:

```tsx
          {[
            { label: "Home", href: "/" },
            { label: "GEO Watcher", href: "/watcher" },
            { label: "GEO 診断", href: "/shindan" },
            { label: "GEO LAB", href: "/lab" },
          ].map((item) => (
```

CTAボタン（`相談する` → `/contact`）部分（44-52行目、88-93行目）は変更しない。

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 を開き、ヘッダーに `Home / GEO Watcher / GEO 診断 / GEO LAB` が表示され、右端に `相談する →` ボタンがあることを確認。ブラウザ幅を768px以下に縮めてハンバーガーメニューを開き、同じ4項目+ボタンが表示されることを確認。各リンクをクリックして `/`, `/watcher`, `/shindan`, `/lab` に正しく遷移することを確認。

- [ ] **Step 4: コミット**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: ヘッダーナビをHome/GEO Watcher/GEO診断/GEO LABに更新"
```

---

### Task 2: Hero セクションのコピー・CTA差し替え

**Files:**
- Modify: `src/app/page.tsx:169-192` (Hero left content)

- [ ] **Step 1: ラベル・見出し・本文を差し替え**

`src/app/page.tsx` の169-184行目、現状:

```tsx
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GENERATIVE ENGINE OPTIMIZATION
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            推測ではなく、<br />
            データと特許に基づく<br />
            <span className="text-blue-gradient">AI検索時代</span>のブランド<br />
            戦略。
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            Google・Microsoft の特許分析、リスニングマインドの実消費者インテント、文脈・意図ベースでの評価。GEO(LLMO) は推測ゲームではない。Ascent は根拠のあるフレームワークで設計する。
          </p>
```

これを次に置き換える:

```tsx
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            企業のGEO・LLMO対策を支援
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            GEO・LLMOの<br />
            <span className="text-blue-gradient">診断</span>と<span className="text-blue-gradient">モニタリング</span><br />
            ツール
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            Ascent GEOは、見込み顧客の課題を可視化するエージェンシー向けの「GEO診断レポートツール」と、自社・競合の変化を継続的に追う「GEO Watcher（GEO・LLMOモニタリングツール）」を提供します。現状把握から提案、改善、効果検証まで、目的に合わせたGEO・LLMO対策を支援します。
          </p>
```

- [ ] **Step 2: CTAボタンを差し替え（資料ダウンロードボタンを削除、電話番号は追加しない）**

`src/app/page.tsx` の185-190行目、現状:

```tsx
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
            <CalendarBookingButton />
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
          </div>
```

これを次に置き換える（`CalendarBookingButton` のみ、1カラムで表示。資料ダウンロードボタンは資料準備後に復活予定のためコメントアウトで残す）:

```tsx
          <div className="mt-10 grid grid-cols-1 max-w-[360px]">
            <CalendarBookingButton />
            {/* 資料準備後に復活予定:
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
            */}
          </div>
```

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 のHeroセクションで新しい見出し・本文が表示され、CTAボタンが `CalendarBookingButton` 1つのみになっていることを確認。右側のContactFormは変更されていないことを確認。

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: Heroセクションのコピー・CTAをdocx新構成に合わせて更新"
```

---

### Task 3: SearchShiftSection と ServicesSection を削除

**Files:**
- Modify: `src/app/page.tsx:203-643` (SearchShiftSection, WatcherShindanSection, ServicesSection の関数定義)
- Modify: `src/app/page.tsx:835-846` (Home root export)

WatcherShindanSectionはTask 4で新しい2ソリューション紹介セクションに書き換えるため、ここでは削除しない。SearchShiftSectionとServicesSectionのみ削除する。

- [ ] **Step 1: SearchShiftSection関数を削除**

`src/app/page.tsx` の203-352行目（`/* ─── Search Shift Section ─── */` コメントから `SearchShiftSection` 関数の閉じ `}` まで）を丸ごと削除する。

- [ ] **Step 2: ServicesSection関数を削除**

`src/app/page.tsx` の411-643行目（`/* ─── Services Section ─── */` コメントから `ServicesSection` 関数の閉じ `}` まで）を丸ごと削除する。

- [ ] **Step 3: Home root から該当セクションの呼び出しを削除**

`src/app/page.tsx` の835-846行目、現状:

```tsx
export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchShiftSection />
      <WatcherShindanSection />
      <ServicesSection />
      <GeoLabSection />
      <SeoGeoCTASection />
    </div>
  );
}
```

これを次に置き換える（この時点ではまだ `WatcherShindanSection`, `SeoGeoCTASection` の呼び出しは残す。Task 4, 5, 6で順次差し替える）:

```tsx
export default function Home() {
  return (
    <div>
      <HeroSection />
      <WatcherShindanSection />
      <GeoLabSection />
      <SeoGeoCTASection />
    </div>
  );
}
```

- [ ] **Step 4: 未使用インポートがないか確認**

`src/app/page.tsx` 冒頭のimport文を確認し、削除したセクションでのみ使われていたインポートがあれば削除する。`SplitSection`, `Button`, `Link` 等は他のセクションでも使われているため残る想定。`npm run lint` を実行して未使用変数の警告が出ないか確認する。

```bash
npm run lint
```

Expected: `src/app/page.tsx` に関するエラー・警告なし（他ファイルの既存warningは無視してよい）

- [ ] **Step 5: ブラウザで目視確認**

http://localhost:3000 でHeroの直後に旧WatcherShindanSection（モニタリングツール/診断ツール2カード）が表示され、SEO時代比較セクションと4カードのServicesセクションが消えていることを確認。

- [ ] **Step 6: コミット**

```bash
git add src/app/page.tsx
git commit -m "refactor: SearchShiftSectionとServicesSectionを削除"
```

---

### Task 4: 2ソリューション紹介セクション（WatcherShindanSectionを置換）

**Files:**
- Modify: `src/app/page.tsx` (旧 `WatcherShindanSection` 関数、Task 3後は元357-409行目だった箇所)

- [ ] **Step 1: WatcherShindanSection関数を新しい2ソリューション紹介セクションに書き換え**

現状の `WatcherShindanSection` 関数全体（`SectionLabel title="MONITORING & DIAGNOSIS"` から始まるもの）を次のコードに置き換える:

```tsx
/* ─────────────────────────────────────────────
   2 Solutions Section
───────────────────────────────────────────── */
function TwoSolutionsSection() {
  const solutions = [
    {
      label: "GEO Watcher",
      audience: "企業のマーケティング・ブランド担当者向け",
      title: "自社・競合の変化を毎日追い、次の改善へ。",
      desc: "主要AIにおける自社・競合の言及、引用、露出を毎日計測。競合との差や施策前後の変化を継続的に確認し、次に取り組むべき改善テーマを判断できます。",
      specs: ["主要7AI", "毎日自動計測", "競合20社まで比較", "過去365日分を保存"],
      cta: "GEO Watcherを見る",
      href: "/watcher",
    },
    {
      label: "GEO診断レポート",
      audience: "SEO・Webマーケティング会社の法人営業向け",
      title: "GEO・LLMO診断データから、初回商談を具体化する。",
      desc: "ブランド名とURLを入力するだけで、見込み顧客のAI検索上の課題と競合との差を可視化。たった数分で、営業提案に使える診断レポートを作成できます。",
      specs: ["主要6AI", "プロンプト・競合を自動生成", "自社ロゴ・CTAに変更可能", "提案用レポートを作成"],
      cta: "GEO診断レポートを見る",
      href: "/shindan",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="サービス紹介" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            GEO・LLMO対策の目的に合わせて、<br />
            <span className="text-blue-gradient">2つのソリューション</span>を。
          </h2>
          <p className="mt-4 text-[17px] text-[#4e4e51] max-w-[64ch] leading-[1.6] font-[inherit]">
            自社・競合の変化を継続的に追いたい企業には、モニタリングツール「GEO Watcher」。見込み顧客の課題を可視化し、営業提案につなげたい企業には「GEO診断レポート」。Ascent GEOは、自社ブランドの継続的な改善と、見込み顧客への営業提案。2つの目的に応えるソリューションを提供します。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 flex flex-col card-hover group"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#1452FF] mb-2 uppercase">{s.label}</p>
              <p className="text-[13px] text-[#6B6B73] mb-3">{s.audience}</p>
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{s.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] flex-1 font-[inherit]">{s.desc}</p>
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                {s.specs.map((spec) => (
                  <span key={spec} className="tag-light">{spec}</span>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href={s.href}>{s.cta} →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Home root の呼び出しを更新**

`src/app/page.tsx` の `Home` 関数内、`<WatcherShindanSection />` を `<TwoSolutionsSection />` に置き換える。

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 で見出し「GEO・LLMO対策の目的に合わせて、2つのソリューションを。」の下に左右2枚のホワイトカードが表示され、各カードにラベル・対象者・タイトル・説明・4つのスペックバッジ・CTAリンクがあることを確認。カードにホバーすると `card-hover` の浮き上がりエフェクトが出ることを確認。

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: WatcherShindanSectionを2ソリューション紹介セクションに刷新"
```

---

### Task 5: 課題提示セクション（新規）

**Files:**
- Modify: `src/app/page.tsx` (新規関数 `ChallengesSection` を追加)

- [ ] **Step 1: ChallengesSection関数を追加**

`TwoSolutionsSection` 関数の直後に次の関数を追加する:

```tsx
/* ─────────────────────────────────────────────
   Challenges Section
───────────────────────────────────────────── */
function ChallengesSection() {
  const challenges = [
    {
      label: "GEO Watcher",
      audience: "マーケティング・ブランド担当者の課題",
      title: "AI検索上の自社・競合の変化を、追えていますか？",
      desc: "AIごとに言及や引用の状況は異なり、その結果も日々変化します。一度確認するだけでは、施策の効果や競合との差、次に改善すべきポイントを正しく判断できません。",
      bullets: [
        "複数のAIを横断して確認できていない",
        "競合との差や業界内の立ち位置が把握できていない",
        "施策前後の変化を継続的に追えていない",
        "改善すべきテーマをデータから判断できていない",
      ],
      accent: "#cd2e3a",
      bg: "linear-gradient(180deg, #0a0208 0%, #120514 40%, #180a1e 70%, #1a0b1a 100%)",
      border: "rgba(205,46,58,0.08)",
    },
    {
      label: "GEO診断レポート",
      audience: "SEO・Webマーケティング会社の法人営業担当者の課題",
      title: "「AI検索対策が必要です」だけで、商談を具体化できていますか？",
      desc: "一般論だけでは、相手企業にとっての課題が見えず、具体的な提案にはつながりません。商談前に、AI上の言及状況や競合との差、次に提案すべきテーマを把握する必要があります。",
      bullets: [
        "見込み顧客ごとの課題を短時間で調べられない",
        "初回商談で示せる具体的なデータがない",
        "SEO提案にGEO・LLMOの切り口を加えられない",
        "診断結果を次の相談や提案につなげにくい",
      ],
      accent: "#0070f3",
      bg: "radial-gradient(#0b2260, #0a0a12 70%)",
      border: "#7ab6ff12",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="CHALLENGES" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            目的によって異なる、<br />
            GEO・LLMO対策の<span className="text-blue-gradient">課題</span>。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl p-7 card-hover-dark relative overflow-hidden"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              <div
                className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${c.accent} 0%, ${c.accent}20 38%, transparent 65%)` }}
              />
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#7ab6ff] mb-2 uppercase">{c.label}</p>
              <p className="text-[13px] text-[#9A9AA0] mb-3">{c.audience}</p>
              <h3 className="text-[19px] font-bold text-[#FAFAF7] mb-3 leading-snug">{c.title}</h3>
              <p className="text-[15px] text-[#d3d3d8] leading-[1.6] mb-5 font-[inherit]">{c.desc}</p>
              <ul className="flex flex-col gap-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[14px] text-[#d3d3d8] font-[inherit]">
                    <span className="w-4 h-[1px] bg-[#7ab6ff] mt-[10px] flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`<li>` 内は `<span className="w-4 h-[1px] ...">` (bullet) + `<span>{b}</span>` (text) の2要素構成。`article-list__item` CSS grid の再発バグパターン（AGENTS.md記載）はこのセクションでは使っていない独自クラスなので該当しないが、念のためテキストは単一の `<span>` にラップしている。

- [ ] **Step 2: Home root に追加**

`Home` 関数内、`<TwoSolutionsSection />` の直後に `<ChallengesSection />` を追加する:

```tsx
      <HeroSection />
      <TwoSolutionsSection />
      <ChallengesSection />
      <GeoLabSection />
      <SeoGeoCTASection />
```

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 で「目的によって異なる、GEO・LLMO対策の課題。」見出しの下に左右2枚のダークカードが表示され、それぞれ4つのbulletリストが正しく改行されずに1行ずつ表示されることを確認（日本語テキストの不自然な改行がないか特に確認）。

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: 課題提示セクションを追加"
```

---

### Task 6: 解決フローセクション（新規）

**Files:**
- Modify: `src/app/page.tsx` (新規関数 `SolutionFlowSection` を追加)

- [ ] **Step 1: SolutionFlowSection関数を追加**

`ChallengesSection` 関数の直後に次の関数を追加する:

```tsx
/* ─────────────────────────────────────────────
   Solution Flow Section
───────────────────────────────────────────── */
function SolutionFlowSection() {
  const flows = [
    {
      label: "GEO Watcher",
      desc: "AIごとの差や施策前後の変化を継続的に追うことで、GEO・LLMO対策の効果と、次に優先すべき改善テーマを判断できます。",
      steps: ["測る", "比べる", "改善する", "確かめる"],
      cta: "GEO Watcherを見る",
      href: "/watcher",
    },
    {
      label: "GEO診断レポート",
      desc: "相手企業ごとのAI検索上の課題と競合との差を、初回商談で示せるGEO・LLMOの具体的な提案材料に変えられます。",
      steps: ["診断する", "課題を示す", "提案する", "商談につなげる"],
      cta: "GEO診断レポートを見る",
      href: "/shindan",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="SOLUTION" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            目的別の課題を、<br />
            2つのソリューションで<span className="text-blue-gradient">解決</span>。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {flows.map((f) => (
            <div
              key={f.label}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 flex flex-col card-hover group"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#1452FF] mb-3 uppercase">{f.label}</p>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] mb-6 font-[inherit]">{f.desc}</p>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {f.steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="tag-blue">{step}</span>
                    {i < f.steps.length - 1 && <span className="text-[#1452FF]">→</span>}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href={f.href}>{f.cta} →</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Home root に追加**

`Home` 関数内、`<ChallengesSection />` の直後に `<SolutionFlowSection />` を追加する:

```tsx
      <HeroSection />
      <TwoSolutionsSection />
      <ChallengesSection />
      <SolutionFlowSection />
      <GeoLabSection />
      <SeoGeoCTASection />
```

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 で「目的別の課題を、2つのソリューションで解決。」見出しの下に左右2枚のホワイトカードが表示され、各カードに矢印でつながれた4つの青いフローバッジ（測る→比べる→改善する→確かめる／診断する→課題を示す→提案する→商談につなげる）とCTAリンクがあることを確認。

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: 解決フローセクションを追加"
```

---

### Task 7: GEO Labセクションのコピー差し替え

**Files:**
- Modify: `src/app/page.tsx` (旧685-705行目付近、`GeoLabSection` 内の見出し・リード文)

- [ ] **Step 1: 見出し・リード文を差し替え**

`GeoLabSection` 関数内、現状:

```tsx
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              AI検索時代の<span className="text-blue-gradient">リサーチハブ</span>。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              特許分析・実データ検証・引用構造の研究。GEO(LLMO) Lab は実務に効くリサーチを発信します。
            </p>
          </div>
        </div>
```

これを次に置き換える:

```tsx
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              GEO・LLMO対策を、<br />
              <span className="text-blue-gradient">知識とデータ</span>の両面から。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              Ascent GEO LABは、AI検索時代の変化を、調査と実践から読み解くリサーチハブです。検索行動の変化、SEOとGEO・LLMOの違い、AIに引用されるコンテンツの条件、効果測定の考え方など、実務に役立つ知見を公開します。
            </p>
          </div>
        </div>
```

`SectionLabel title="GEO(LLMO) LAB"` の行はそのまま維持する（変更不要）。記事カード部分（Featured大カード、下部3カードグリッド）も変更しない。

- [ ] **Step 2: ブラウザで目視確認**

http://localhost:3000 でGEO Labセクションの見出しが「GEO・LLMO対策を、知識とデータの両面から。」に、リード文がdocxの新しい文言になっていることを確認。記事カードのレイアウトは変わっていないことを確認。

- [ ] **Step 3: コミット**

```bash
git add src/app/page.tsx
git commit -m "docs: GEO Labセクションのリード文をdocx新構成に合わせて更新"
```

---

### Task 8: 専用CTAセクションに差し替え（SeoGeoCTASectionを置換）

**Files:**
- Modify: `src/app/page.tsx` (import文、Home root)

`CTASection` コンポーネント（`src/components/layout/CTASection.tsx`）は既に `kicker`/`title`/`description`/`primaryButton`/`secondaryButtons` props を持つ汎用コンポーネントなので、新規コンポーネントを作らず `page.tsx` から直接使う。

- [ ] **Step 1: importを差し替え**

`src/app/page.tsx` 冒頭のimport文、現状:

```tsx
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
```

これを次に置き換える:

```tsx
import { CTASection } from "@/components/layout/CTASection";
```

- [ ] **Step 2: Home root で呼び出しを差し替え**

`Home` 関数内、現状:

```tsx
      <HeroSection />
      <TwoSolutionsSection />
      <ChallengesSection />
      <SolutionFlowSection />
      <GeoLabSection />
      <SeoGeoCTASection />
```

これを次に置き換える:

```tsx
      <HeroSection />
      <TwoSolutionsSection />
      <ChallengesSection />
      <SolutionFlowSection />
      <GeoLabSection />
      <CTASection
        kicker="AI検索で選ばれるための一歩を、ここから"
        title={
          <>
            AI検索で選ばれるための<br />
            一歩を、ここから。
          </>
        }
        description={
          <>
            自社ブランドの変化を継続的に捉えるなら、GEO Watcher。見込み顧客への提案を具体化するなら、GEO診断レポート。
            <br />
            <br />
            診断する。変化を追う。課題を次の改善へつなげる。目的に合った方法で、GEO・LLMO対策を始めましょう。
          </>
        }
        primaryButton={{ href: "/watcher", label: "GEO Watcherを見る" }}
        secondaryButtons={[{ href: "/shindan", label: "GEO診断レポートを見る" }]}
      />
```

- [ ] **Step 3: ブラウザで目視確認**

http://localhost:3000 の最下部CTAセクションが黒背景カードで表示され、見出し「AI検索で選ばれるための一歩を、ここから。」、説明文、`GEO Watcherを見る →`（プライマリボタン）と `GEO診断レポートを見る`（アウトラインボタン）の2ボタンが表示されることを確認。各ボタンをクリックして正しいページに遷移することを確認。

- [ ] **Step 4: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: フッターCTAをdocx新構成の2ボタンCTAに差し替え"
```

---

### Task 9: 最終確認・クリーンアップ

**Files:**
- Modify: `src/app/page.tsx` (未使用インポートの削除確認のみ、変更なしの可能性あり)

- [ ] **Step 1: SeoGeoCTASectionコンポーネントが他で使われているか確認**

```bash
grep -rn "SeoGeoCTASection" src/ --include="*.tsx" --include="*.ts"
```

Expected: `src/components/layout/SeoGeoCTASection.tsx`（定義ファイル自身）以外に参照が残っていないこと。他ページ（例: `/lab` 記事詳細等）で使われている場合はファイルを削除しない。参照が本当にゼロなら、この計画のスコープ外の判断（ファイル削除するか残すか）はユーザーに確認する。

- [ ] **Step 2: lint実行**

```bash
npm run lint
```

Expected: エラーなし。warningがある場合は `src/app/page.tsx` に関するもののみ対応する。

- [ ] **Step 3: 全セクション通しのブラウザ確認**

http://localhost:3000 を再読み込みし、上から順に: Header（新ナビ） → Hero（新コピー、CalendarBookingButtonのみ） → 2ソリューション紹介 → 課題提示 → 解決フロー → GEO Lab → CTA、の順で表示されることを確認。ブラウザ幅を375px（モバイル）に縮めて、各セクションのカードが縦積みになり、テキストが崩れていないことを確認。

- [ ] **Step 4: dev-log.md に作業履歴を記録**

`dev-log.md` の最上部に以下を追記する（既存内容の前に挿入）:

```markdown
## 2026-08-03 (時刻はコミット時点に合わせる)
- ホームページ・ヘッダーナビをGEOリニューアル設計書（docs/superpowers/specs/2026-08-03-home-renewal-design.md）に基づき刷新
- ヘッダー: Home/GEO Watcher/GEO診断/GEO LABの4項目構成に変更
- トップページ: Hero新コピー化、2ソリューション紹介/課題提示/解決フローの3セクション新設、SearchShift/Servicesセクション削除、GEO Labリード文更新、CTAセクションを2ボタン構成に変更
```

- [ ] **Step 5: コミット**

```bash
git add dev-log.md
git commit -m "docs: dev-log.mdにホームリニューアル作業履歴を記録"
```

---

## Self-Review Notes

- **Spec coverage:** Task 1=ヘッダー、Task 2=Hero、Task 3=旧セクション削除、Task 4=2ソリューション紹介、Task 5=課題提示、Task 6=解決フロー、Task 7=GEO Labコピー、Task 8=CTA。設計書の全6セクション構成に対応するタスクが揃っている。
- **Placeholder scan:** 全タスクに完全なコード・コマンド・期待結果を明記済み。「TODO」「後で実装」等の記述なし。
- **Type consistency:** 新規関数名は `TwoSolutionsSection`, `ChallengesSection`, `SolutionFlowSection` で統一。Home root（Task 3, 5, 6, 8）での呼び出し順序も各タスクで一致させている。`Button variant="detail"` は既存コードと同じ使い方に揃えている。
