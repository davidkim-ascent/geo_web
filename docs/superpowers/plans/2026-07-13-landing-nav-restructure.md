# ランディング/ナビ再構成 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ヘッダー/フッターのナビゲーションを4項目（モニタリングツール／診断ツール／GEO Lab／Contact）に再構成し、新規ページ `/watcher`・`/shindan` を追加、既存3ページ（`/why-ascent`, `/framework`, `/services`）への参照をナビ・サイトマップ・ランディングから除去する。

**Architecture:** Next.js App Router の既存パターン（`src/app/<route>/page.tsx` + `buildPageMetadata` + 既存UIコンポーネント再利用）に従う。`/watcher` は `docs/watcher構成.md` の内容をベースにした静的ページ。`/shindan` は暫定的に `/watcher` と同一セクション構成を再利用する薄いページ。ランディング（`src/app/page.tsx`）からは `WhyAscentSection`・`FrameworkSection` の呼び出しを削除し、代わりに新規2カード紹介セクションを追加する。

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind, 既存の `Button`/`ContactForm`/`Footer`/`Header` コンポーネント。

**重要な制約:** この作業はローカルのみで行う。ユーザーの明示的な指示があるまで `git push` は絶対に実行しない。各タスック末尾のコミットはローカルコミットに留める。

---

## 事前確認済みの実装詳細

- `ContactForm`（`src/components/contact/ContactForm.tsx`）の実フィールドは `company, role, name, phone, email, industry, website, challenge, human, agree` の固定スキーマ。`docs/watcher構成.md` に書かれた「問い合わせ種別プルダウン」フィールドは存在しないため **追加しない**。既存コンポーネントをそのまま `<ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />` として使う。
- FAQ用アコーディオンパターンは `src/app/services/ServicesFAQ.tsx` に既存実装がある。同じ構造をコピーして使う。
- `buildPageMetadata` は `src/lib/seo.ts` にあり、`{ title, description, path }` を渡す。
- ページ共通の見出しラベルは `page.tsx` 内 `SectionLabel` コンポーネントと同型のUIパターン（`ui-section-label-title` クラス）を使う。ページ単体ファイルなので、`/watcher` と `/shindan` それぞれのファイル内にローカルな `SectionLabel` 関数を定義する（既存 `page.tsx` の实装と同じ最小関数をコピー）。
- `Header.tsx` と `Footer.tsx` は nav配列をリテラルで2箇所（Header: デスクトップ・モバイル）ずつ持っている。

---

### Task 1: `/watcher` ページの新規作成

**Files:**
- Create: `src/app/watcher/page.tsx`

- [ ] **Step 1: ディレクトリと最小ページファイルを作成**

`src/app/watcher/page.tsx`:

```tsx
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { SplitSection } from "@/components/layout/SplitSection";
import { WatcherFAQ } from "./WatcherFAQ";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO（LLMO・AEO）対策のモニタリングツールなら、GEO Watcher | Ascent GEO",
  description:
    "GEO Watcherは、主要AIエンジンを横断して自社・競合のAI検索上での露出・言及・引用状況を継続的にモニタリングするツールです。デイリーモニタリング・7つのAIモデル・20社の競合分析に対応。",
  path: "/watcher",
});

export const dynamic = "force-static";

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className="ui-section-label-title">{title}</span>
    </div>
  );
}

function HeroSection() {
  return (
    <SplitSection
      sectionClassName="hero-fixed relative py-12 lg:py-16"
      sectionStyle={{
        background: "var(--hero-gradient)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      containerClassName="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GEO WATCHER
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            GEO（LLMO・AEO）対策の<br />
            モニタリングツールなら、<br />
            <span className="text-blue-gradient">GEO Watcher</span>
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            自社と競合のAI検索（露出）状況をモニタリング。GEO/LLMO対策の必須な情報をデータ化。
            デイリーモニタリング／7つのAIモデル／20社の競合分析／初心者にも見やすいUI。
          </p>
        </>
      }
      right={
        <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      }
    />
  );
}

function ProblemSection() {
  const items = [
    {
      title: "激変する検索行動：「ググる」から「AIに聞く」時代へ",
      body: "ユーザーの情報収集は、従来の検索結果一覧を見る行動から、生成AIに直接質問する行動へと変化しています。これからのマーケティングでは、検索順位だけでなく、AIの回答内で自社がどのように扱われているかを把握することが重要です。",
    },
    {
      title: "AI回答での自社・競合の変化を追えていますか？",
      body: "AIの回答に自社ブランドはどれくらい言及されているのか。競合と比べて、露出・引用・推奨の状況はどのように変化しているのか。変化を継続的に追えなければ、GEO/LLMO施策の成果や改善ポイントを正しく判断できません。",
    },
    {
      title: "必要なのは、AI検索上の変化を追い続ける仕組みです。",
      body: "AI検索上でのブランド評価や露出状況は、常に変化しています。一度の確認だけでは、施策による変化や競合との差を正しく把握することはできません。重要なのは、AI検索上での露出・言及・引用の推移を継続的に観測し、変化を追い続けることです。",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="課題" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            AI検索で、自社は選ばれ続けていますか？
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="bg-white border border-black/[0.07] rounded-2xl p-7">
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{item.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnswerSection() {
  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="課題に対するアンサー" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            推測ではなく、<span className="text-blue-gradient">継続データ</span>でAI検索上の変化を捉える。
          </h2>
          <p className="mt-4 text-[17px] text-[#4e4e51] max-w-[64ch] leading-[1.6]">
            GEOウォッチャーは、主要AIエンジンを横断して、自社・競合のAI検索上での露出、言及、引用状況を継続的にモニタリングするツールです。
            日々蓄積されるデータから、施策前後の変化や競合との差分を確認。AI検索上での自社の変化を捉え、継続的な改善判断を支援します。
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI可視性",
      desc: "主要なAIエンジンの回答内で、自社や競合がどれだけ露出しているかを一目で確認。プロンプト別、モデル別にフィルタリングが可能なので、GEO/LLMO対策の状況を正確に把握できます。",
    },
    {
      title: "プロンプト",
      desc: "注視したいプロンプトの検索結果を継続的にモニタリング。ブランド言及率や引用URLの推移はもちろん、実際のAI回答文も自動で記録されるため、アルゴリズムの変化にもいち早く気づけます。",
    },
    {
      title: "シェア・オブ・ボイス",
      desc: "各AIエンジンにおいて、自社ブランドと競合他社がどれくらいの割合で言及されているかを可視化します。ブランドの言及ランキングや、プロンプト・AIモデル別のシェアを詳細に比較・確認できます。",
    },
    {
      title: "引用URL",
      desc: "AIが回答を生成する際に参照・引用したリンク（ソース）を特定します。ドメイン別・URL別に分析できるほか、自社サイトやソーシャルメディアなど、どの種類のメディアが引用されやすいかの傾向も把握できます。",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="操作画面・主要機能" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            画面でわかる、GEOウォッチャーの主な機能
          </h2>
        </div>
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-black/[0.07]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/uHXiUjXvr6U"
            title="Ascent GEO Watcher機能説明"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-black/[0.07] rounded-2xl p-7">
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{f.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  const reasons = [
    { title: "主要AIエンジンを横断してモニタリング", desc: "7つのAIモデルに対応。AI検索上での自社・競合の露出状況を横断的に確認できます。" },
    { title: "競合比較で、自社の立ち位置変化を把握", desc: "20社の競合ブランドを登録可能。AI回答内での露出状況や言及傾向を比較し、自社の変化を確認できます。" },
    { title: "過去データから現在までの推移を追跡", desc: "過去365日分のデータを保存。施策前後の変化や、時系列でのAI検索上の推移を確認できます。" },
    { title: "毎日の変化を自動でモニタリング", desc: "毎日自動データ更新。AI検索上での露出・言及・引用状況の変化を継続的にモニタリングできます。" },
    { title: "データを活用しやすい形で取得", desc: "CSVダウンロード、資料にそのまま使える画像ダウンロードを提供。" },
    { title: "使い方に合わせた料金プランを提供", desc: "規模感に応じたカスタマイズプランにも対応。" },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="選ばれる理由" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            AI検索上の変化を、継続的に追える環境を提供
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-white border border-black/[0.07] rounded-2xl p-6">
              <h3 className="text-[17px] font-bold text-[#0B0B0E] mb-2 leading-snug">{r.title}</h3>
              <p className="text-[15px] text-[#4e4e51] leading-[1.6]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: "ライトプラン", price: "34,800円", prompts: "25", models: "4つ（aio, gemini, chatgpt, perplexty）" },
    { name: "スタンダードプラン", price: "49,800円", prompts: "50", models: "5つ（aio, gemini, Ai mode, chatgpt, perplexty）" },
    { name: "アドバンスプラン", price: "68,000円", prompts: "100", models: "6つ（aio, gemini, Ai mode, chatgpt, perplexty, copilot）" },
    { name: "カスタマイズプラン", price: "登録プロンプト数に合わせ", prompts: "自由選択", models: "アドバンスに準ずる" },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="料金プラン" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            料金プラン
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div key={p.name} className="bg-white border border-black/[0.07] rounded-2xl p-6 flex flex-col">
              <h3 className="text-[17px] font-bold text-[#0B0B0E] mb-2">{p.name}</h3>
              <p className="text-[22px] font-bold text-[#1452FF] mb-4">{p.price}</p>
              <ul className="flex flex-col gap-2 text-[14px] text-[#4e4e51] leading-[1.6]">
                <li>登録プロンプト数：{p.prompts}</li>
                <li>競合登録：20個</li>
                <li>AIモデル：{p.models}</li>
                <li>データ見れる期間：1年間</li>
                <li>更新頻度：毎日</li>
                <li>エクスポート機能：csv</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/contact" className="font-mono text-[11px] tracking-[0.18em] text-[#1452FF] hover:underline uppercase">
            料金・プランについて問い合わせる →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function WatcherPage() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <AnswerSection />
      <FeaturesSection />
      <ReasonsSection />
      <PricingSection />
      <WatcherFAQ />
    </div>
  );
}
```

- [ ] **Step 2: FAQコンポーネントを作成**

`src/app/watcher/WatcherFAQ.tsx`:

```tsx
"use client";

import { useState } from "react";

const WATCHER_FAQS = [
  { q: "対応しているAIモデルは？", a: "Chat GPT、Gemini、Google AI モード、AI Overview、Perplexty、Compilot、Claudeの7つに対応しています。Claudeを選択する場合はオプションとなります。" },
  { q: "競合ブランドは何社と比較できますか？", a: "最大20社まで比較可能です。自社ブランドと同じ項目で比較できます。競合ブランド登録数は全プラン共通して最大20社となっております。" },
  { q: "データはどのくらいの期間保存されますか？", a: "過去1年分のデータが保存されます。" },
  { q: "プロンプトの更新頻度はどれくらいですか？", a: "全プラン共通して毎日更新されます。更新日時も各プロンプトごとに確認可能です。" },
  { q: "プロンプトの内容は変更できますか？", a: "プロンプトの内容はいつでも自由に変更が可能です。" },
  { q: "最低契約期間はありますか？", a: "プランにより異なります。詳細はお問い合わせください。" },
  { q: "導入にはどのくらいの期間がかかりますか？", a: "お支払い完了後、アカウントの発行が終わり次第、すぐにご利用いただけます。" },
  { q: "無料トライアル期間はありますか？", a: "現在、無料トライアルは行っておりません。" },
  { q: "解約はいつできますか？", a: "解約をご希望の場合は、お問い合わせフォームより申請をお願いいたします。解約は原契約の契約終了日の属する月の末日をもって解約となります。" },
  { q: "プロンプトの更新頻度は調整できますか？", a: "現在、更新頻度を調整する機能はございません。どのプランであっても毎日更新となります。" },
];

export function WatcherFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="border-t border-[#E6E4DD] bg-[#FAFAF7] py-[120px]">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
        <div className="mb-6 font-mono text-[12px] tracking-[0.18em] text-[#9A9AA0] uppercase">
          [ FREQUENTLY ASKED ]
        </div>
        <h2 className="mb-14 max-w-[22ch] tracking-[-0.03em] leading-[1.05]">
          よくある質問。
        </h2>
        <div className="border-t border-[#E6E4DD]">
          {WATCHER_FAQS.map((f, i) => (
            <div
              key={i}
              className={`cursor-pointer border-b border-[#E6E4DD] transition-colors ${open === i ? "" : "hover:bg-[#F2F0EA]"}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="grid grid-cols-[64px_1fr_32px] items-center gap-5 px-6 py-7">
                <span className="font-mono text-[12px] tracking-[0.16em] text-[#1452FF]">
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[19px] font-semibold leading-[1.35] tracking-[-0.01em]">
                  {f.q}
                </h4>
                <span
                  className={`text-center text-[22px] leading-none text-[#6B6B73] transition-transform duration-[250ms] ${open === i ? "rotate-45 text-[#1452FF]" : ""}`}
                >
                  +
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-[400px] pb-7" : "max-h-0"}`}
              >
                <p className="px-6 pb-0 pl-[108px] text-[16px] leading-[1.7] text-[#6B6B73]">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: `/watcher` がstatic pageとして正常にビルドされる（エラーなし）

- [ ] **Step 4: コミット（ローカルのみ、pushしない）**

```bash
git add src/app/watcher/page.tsx src/app/watcher/WatcherFAQ.tsx
git commit -m "feat: /watcher ページを新規作成（GEO Watcher紹介）"
```

---

### Task 2: `/shindan` ページの新規作成（暫定コンテンツ）

**Files:**
- Create: `src/app/shindan/page.tsx`

- [ ] **Step 1: `/watcher` の構成を暫定流用したページを作成**

`src/app/shindan/page.tsx`:

```tsx
// NOTE: 本ページのコンテンツは暫定版です。
// 正式な構成案がユーザーより提供され次第、内容を差し替えます（ルーティングのみ先行構築）。
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { SplitSection } from "@/components/layout/SplitSection";
import { WatcherFAQ } from "../watcher/WatcherFAQ";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO(LLMO)診断ツール | Ascent GEO",
  description:
    "自社と競合のAI検索上での露出状況を診断。GEO/LLMO対策の現在地を可視化し、改善の出発点を明らかにします。",
  path: "/shindan",
  noIndex: true,
});

export const dynamic = "force-static";

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className="ui-section-label-title">{title}</span>
    </div>
  );
}

function HeroSection() {
  return (
    <SplitSection
      sectionClassName="hero-fixed relative py-12 lg:py-16"
      sectionStyle={{
        background: "var(--hero-gradient)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      containerClassName="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GEO(LLMO) 診断ツール
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            自社のAI検索上の<br />
            現在地を、<span className="text-blue-gradient">診断</span>する。
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            自社ブランドと競合のAI検索上での露出・言及・引用状況を診断し、GEO/LLMO対策の出発点を明らかにします。
          </p>
        </>
      }
      right={
        <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      }
    />
  );
}

export default function ShindanPage() {
  return (
    <div>
      <HeroSection />
      <WatcherFAQ />
    </div>
  );
}
```

- [ ] **Step 2: ビルド確認**

Run: `npm run build`
Expected: `/shindan` がstatic pageとして正常にビルドされる（エラーなし）

- [ ] **Step 3: コミット（ローカルのみ）**

```bash
git add src/app/shindan/page.tsx
git commit -m "feat: /shindan ルーティングを先行構築（暫定コンテンツ）"
```

---

### Task 3: ヘッダーのナビゲーションを4項目に変更

**Files:**
- Modify: `src/components/layout/Header.tsx:27-43` (デスクトップnav)
- Modify: `src/components/layout/Header.tsx:73-89` (モバイルnav)

- [ ] **Step 1: デスクトップnav配列を置換**

`src/components/layout/Header.tsx` の27-34行目：

```tsx
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "モニタリングツール", href: "/watcher" },
            { label: "診断ツール", href: "/shindan" },
            { label: "GEO Lab", href: "/lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
```

- [ ] **Step 2: モバイルnav配列を同様に置換**

`src/components/layout/Header.tsx` の73-80行目付近（`{menuOpen && (` ブロック内）：

```tsx
        <div className="md:hidden bg-[#FAFAF7] border-t border-black/[0.06] px-6 py-5 flex flex-col gap-4">
          {[
            { label: "モニタリングツール", href: "/watcher" },
            { label: "診断ツール", href: "/shindan" },
            { label: "GEO Lab", href: "/lab" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
```

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: エラーなし。TypeScript型エラーなし。

- [ ] **Step 4: コミット（ローカルのみ）**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: ヘッダーナビを4項目に再構成"
```

---

### Task 4: フッターのSitemapリストを変更

**Files:**
- Modify: `src/components/layout/Footer.tsx:44-49`

- [ ] **Step 1: Sitemap配列を置換**

`src/components/layout/Footer.tsx` の44-49行目：

```tsx
              {[
                { label: "Home", href: "/" },
                { label: "モニタリングツール", href: "/watcher" },
                { label: "診断ツール", href: "/shindan" },
                { label: "GEO Lab", href: "/lab" },
              ].map((item) => (
```

- [ ] **Step 2: ビルド確認**

Run: `npm run build`
Expected: エラーなし

- [ ] **Step 3: コミット（ローカルのみ）**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: フッターSitemapを4項目に再構成"
```

---

### Task 5: サイトマップから既存3ページのエントリを削除

**Files:**
- Modify: `public/sitemap.xml:9-26`
- Modify: `scripts/sitemap-static.test.mjs` (該当があれば)

- [ ] **Step 1: `public/sitemap.xml` から `/services`, `/framework`, `/why-ascent` の `<url>` ブロックを削除**

削除対象（現状9-26行目、3ブロック分）：

```xml
  <url>
    <loc>https://geo.ascentnet.co.jp/services</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://geo.ascentnet.co.jp/framework</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://geo.ascentnet.co.jp/why-ascent</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

削除し、代わりに `/watcher` と `/shindan` を追加する（`/` の直後に挿入）：

```xml
  <url>
    <loc>https://geo.ascentnet.co.jp/watcher</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

`/shindan` は暫定コンテンツのため sitemap には含めない（`noIndex: true` を設定済み）。

- [ ] **Step 2: `scripts/sitemap-static.test.mjs` の内容を確認し、削除したURLへの言及があれば修正**

Run: `grep -n "why-ascent\|framework\|services" scripts/sitemap-static.test.mjs`

もし該当箇所があれば、`/services`, `/framework`, `/why-ascent` の期待値を削除し、`/watcher` の期待値を追加する。テストファイルの既存アサーション形式に合わせて修正する。

- [ ] **Step 3: テスト実行**

Run: `node scripts/sitemap-static.test.mjs`
Expected: PASS

- [ ] **Step 4: コミット（ローカルのみ）**

```bash
git add public/sitemap.xml scripts/sitemap-static.test.mjs
git commit -m "feat: サイトマップを更新（/watcher追加、旧3ページ除去）"
```

---

### Task 6: ランディングページから WhyAscentSection・FrameworkSection を除去し、新規2カード紹介セクションを追加

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: `FrameworkSection` の import を削除**

`src/app/page.tsx:18-20` を削除：

```tsx
const FrameworkSection = dynamicImport(() => import("@/components/home/FrameworkSection"), {
  ssr: true,
});
```

- [ ] **Step 2: `WhyAscentSection` 関数定義を削除**

`src/app/page.tsx` の `WhyAscentSection` 関数全体（358-462行目、`/* Why Ascent Section */` コメントから関数終わりまで）を削除する。

- [ ] **Step 3: 新規 `WatcherShindanSection` 関数を、削除した箇所（`WhyAscentSection` があった位置）に追加**

```tsx
/* ─────────────────────────────────────────────
   Watcher / Shindan Intro Section
───────────────────────────────────────────── */
function WatcherShindanSection() {
  const cards = [
    {
      title: "モニタリングツール",
      subtitle: "GEO Watcher",
      desc: "主要AIエンジンを横断して、自社・競合のAI検索上での露出、言及、引用状況を継続的にモニタリング。デイリーモニタリング／7つのAIモデル／20社の競合分析に対応。",
      href: "/watcher",
    },
    {
      title: "診断ツール",
      subtitle: "GEO(LLMO) 診断",
      desc: "自社ブランドと競合のAI検索上での露出状況を診断し、GEO/LLMO対策の出発点を明らかにします。",
      href: "/shindan",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="MONITORING & DIAGNOSIS" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            現状を<span className="text-blue-gradient">可視化</span>し、<br />
            継続的に<span className="text-blue-gradient">追う</span>。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 flex flex-col card-hover group"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#1452FF] mb-2 uppercase">{c.subtitle}</p>
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{c.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] flex-1">{c.desc}</p>
              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href={c.href}>詳しく見る →</Link>
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

- [ ] **Step 4: `Home` コンポーネントの呼び出しを更新**

`src/app/page.tsx` 末尾の `export default function Home()` 内：

変更前：
```tsx
      <HeroSection />
      <SearchShiftSection />
      <WhyAscentSection />
      <FrameworkSection />
      <ServicesSection />
      <GeoLabSection />
      <SeoGeoCTASection />
```

変更後：
```tsx
      <HeroSection />
      <SearchShiftSection />
      <WatcherShindanSection />
      <ServicesSection />
      <GeoLabSection />
      <SeoGeoCTASection />
```

- [ ] **Step 5: ビルド確認**

Run: `npm run build`
Expected: エラーなし。`FrameworkSection` の未使用import警告が出ないことを確認（削除済みのため）。

- [ ] **Step 6: コミット（ローカルのみ）**

```bash
git add src/app/page.tsx
git commit -m "feat: ランディングのWhyAscent/Frameworkセクションを撤去しWatcher/Shindan紹介セクションを追加"
```

---

### Task 7: 動作確認（ローカル）

**Files:** なし（確認のみ）

- [ ] **Step 1: 開発サーバー起動**

Run: `npm run dev`

- [ ] **Step 2: ブラウザで以下を確認**

- `http://localhost:3000/` — ヘッダーに4項目（モニタリングツール／診断ツール／GEO Lab／Contact）が表示される
- `http://localhost:3000/` — Why Ascent・Frameworkセクションが消え、代わりに「モニタリングツール／診断ツール」2カードセクションが表示される
- 新セクションの「詳しく見る →」から `/watcher`, `/shindan` へ正しく遷移する
- `http://localhost:3000/watcher` — GEO Watcher紹介ページが表示され、フォーム・FAQアコーディオンが機能する
- `http://localhost:3000/shindan` — 暫定ページが表示される
- `http://localhost:3000/why-ascent`, `/framework`, `/services` — URL直接アクセスで引き続き閲覧可能（ヘッダー/フッターのメニューには出ない）
- フッターのSitemap欄が4項目になっている

- [ ] **Step 3: 既存テストスイートを実行**

Run: `npm test` (または既存の package.json スクリプトに従う。`node scripts/sitemap-static.test.mjs` を含む)
Expected: 全てPASS

---

## 完了条件

- ヘッダー・フッターのメニューが4項目（モニタリングツール／診断ツール／GEO Lab／Contact）になっている
- `/watcher`, `/shindan` が新規作成され、ビルド・表示ともに問題ない
- `/why-ascent`, `/framework`, `/services` のファイルは削除されず、URL直接アクセスは可能なまま
- ランディングページから Why Ascent・Framework セクションが消え、Watcher/Shindan紹介の2カードセクションに置き換わっている
- `public/sitemap.xml` から旧3ページが除去され、`/watcher` が追加されている
- 全てローカルコミットのみで完結しており、`git push` は実行されていない
