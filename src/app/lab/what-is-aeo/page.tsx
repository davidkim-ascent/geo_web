import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { buildPageMetadata, buildArticleJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

const PAGE_TITLE = "AEO（回答エンジン最適化）とは？SEOとの違いも徹底解説";
const PAGE_DESCRIPTION =
  "AEO（回答エンジン最適化）とは、AI検索の回答に自社の情報が採用されるよう最適化する施策です。SEOとAEOの違いも含めて解説します。";
const PAGE_PATH = "/lab/what-is-aeo";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  keywords: ["aeo とは", "AEO対策", "aeo seo", "aeo seo 違い", "aio aeo", "aeo geo", "aeo ai", "回答エンジン最適化"],
});

export const metadata: Metadata = {
  ..._base,
  openGraph: {
    ..._base.openGraph,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
  },
  twitter: {
    ..._base.twitter,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export const dynamic = "force-static";

const FAQ_ITEMS = [
  {
    q: "AEOとSEOはどちらを優先すべき？",
    a: "まずSEOを優先し、並行してAEOを重ねるのがおすすめです。Googleは、AIによる概要とAIモードに表示されるために、通常のSEOの基本が有効だと説明しています。クロール・インデックス・表示速度を、先に確認します。そのうえで、質問形式の見出しや結論ファーストの改善を、既存記事のリライトから始めましょう。両方に共通する施策から始めれば、二重の作業を避けられます。",
  },
  {
    q: "AEOの効果が出るまでの期間は？",
    a: "期間は、一概には言えません。AIの回答は変動し、公式に示された目安もないためです。判断するには、施策の前に、言及率や引用数のベースラインを計測しておきます。そのうえで、同じ質問セットを継続して計測し、数か月単位で推移を確認しましょう。ベースラインがあれば、変化があったときに、施策の影響を判断しやすくなります。",
  },
  {
    q: "AEO対策は自社でできる？支援会社は必要？",
    a: "自社でも対応できます。ステップ1〜4の、質問の洗い出し、質問形式の見出し、結論ファースト、表・リストの整理は、社内で着手できます。ただし、より専門的な支援が必要な場合は、GEO・LLMO対策会社の支援があったほうが進めやすくなります。次のようなケースです。・計測の設計（質問セットの作成、競合との比較）が必要・大規模サイトの構造改修や、技術的な実装が必要・外部での言及を増やす、広報・メディア施策が必要・社内に知見がなく、優先順位をつけられないアセントネットワークスは、GEO Watcherを提供しています。スポットサポートで、プロンプト設計やコンテンツ改善の個別支援も受けられます。",
  },
  {
    q: "個人ブログや小規模サイトでも対策は必要？",
    a: "必要ですが、優先順位を絞れば十分に対応できます。記事数が少なくても、専門領域に絞り、質問に明確に答える記事は、引用される可能性があります。まずは、得意分野の質問を10〜20個に絞り、冒頭の結論と著者情報の明記から始めましょう。大規模な計測ツールは、必須ではありません。AIに自社の分野の質問を投げ、引用されているかを手動で確認するだけでも、状況をつかめます。小規模なサイトは、1人の専門家の知見や、特定の分野への特化が強みになります。第三者のサイトで紹介される機会も、積極的に作りましょう。",
  },
  {
    q: "AEO対策に構造化データは必須？",
    a: "必須ではありません。Googleは、AIによる概要とAIモードに表示されるために、特別な構造化データは不要と説明しています。ただし、構造化データを整備する場合は、ページの表示テキストと一致させます。また、FAQのリッチリザルトは、2023年8月以降、表示が限定されています。構造化データを入れる場合は、Googleのリッチリザルトテストなどで、記述の誤りがないかを確認します。構造化データよりも、本文の質と、結論の明確さを優先しましょう。本記事では、AEO（回答エンジン最適化）の意味、SEOとの違い、具体的な対策を解説しました。要点は、次の5つです。・AEOは、AIが作る回答に自社の情報が選ばれるための施策・SEOの代わりではなく、SEOの土台の上に重ねて進める・GEO・LLMO・AIOは重なりが大きく、共通の土台から始める・対策は、想定質問・質問形式の見出し・結論ファースト・表とリスト・E-E-A-T・外部での言及・クローラーの許可が中心・効果は、引用・言及・流入の推移で測る最初の3か月は、次の進め方がおすすめです。・1か月目：想定質問を20個洗い出し、優先順位をつける・2か月目：検索需要の大きい上位5記事を、結論ファーストの構成に書き直す・3か月目：引用・言及の状況と流入を計測し、施策の前後を比較するAEOは、一度対応すれば終わる施策ではありません。AIの仕組みも、表示のされ方も、変化し続けています。小さく始めて、計測し、改善を重ねることが、成果への近道です。まずは、自社で最も検索されている質問を3つ選び、見出し直下の結論を書き直すところから始めましょう。",
  },
];

const ARTICLE_JSON_LD = buildArticleJsonLd({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  datePublished: "2026-10-09",
});

const FAQ_JSON_LD = buildFaqJsonLd(FAQ_ITEMS);

const BREADCRUMB_JSON_LD = buildBreadcrumbJsonLd([
  { name: "HOME", path: "/" },
  { name: "GEO LAB", path: "/lab" },
  { name: "AEOとは", path: PAGE_PATH },
]);

/** 本文中の出典表記 */
function Source({ name, url }: { name: string; url: string }) {
  return (
    <p className="-mt-2 mb-6 text-[12px] leading-[1.7] text-[#9A9AA0]">
      出典：{name}
      <br />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4"
      >
        {url}
      </a>
    </p>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#0B0B0E] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.5)]">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="ml-2 font-mono text-[11px] tracking-[0.1em] text-white/50">faq-page.json</span>
      </div>
      <pre className="px-6 py-5 font-mono text-[13px] leading-[1.9] text-[#E6E4DD] overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function RelatedCard({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="my-6 flex items-center justify-between gap-4 rounded-xl border border-[#E6E4DD] bg-[#FDFDFB] px-5 py-4 transition-colors hover:border-[#1452FF]/40"
    >
      <span>
        <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Related</span>
        <span className="block font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>{title}</span>
      </span>
      <span className="flex-none text-[#1452FF]" aria-hidden="true">→</span>
    </Link>
  );
}

function WatcherCTA() {
  return (
    <div className="my-8">
      <Link
        href="/watcher"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1452FF] px-6 py-3 font-bold text-[#FDFDFB] transition-colors hover:bg-[#0B3FD9]"
        style={{ fontSize: "var(--fs-label)" }}
      >
        ▼ GEO Watcher
      </Link>
    </div>
  );
}

export default function WhatIsAeoPage() {
  return (
    <div className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD).replace(/</g, "\\u003c") }}
      />

      <section className="hero-fixed article-hero relative" style={{ background: "var(--hero-gradient)", minHeight: "0" }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute right-[8%] top-[18%] h-[460px] w-[460px] rounded-full bg-[#1452FF]/[0.08] blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
          <div className="article-hero__grid pt-8 pb-4">
            <div>
              <div className="mb-8 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-[#9A9AA0] uppercase">
                <Link href="/" className="transition-colors hover:text-[#FDFDFB]">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FDFDFB]">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FDFDFB]">AEOとは</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                AEO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AEO（回答エンジン最適化）とは？</span>
                <span className="block">SEOとの違いも徹底解説</span>
              </h1>

              <p className="article-hero__lede">{PAGE_DESCRIPTION}</p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.10.09" },
                  { l: "LENGTH", v: "約21,000文字" },
                  { l: "FORMAT", v: "ARTICLE" },
                ].map((meta, index) => (
                  <div key={meta.l} className={`article-meta__item ${index < 2 ? "pr-6" : ""}`}>
                    <div className="article-meta__label">{meta.l}</div>
                    <div className="article-meta__value">{meta.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-shell">
        <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
          <div className="article-shell__grid lg:grid-cols-[220px_1fr]">
            <div className="hidden lg:block">
              <ArticleTOC />
            </div>

            <article className="article-body">
              <div className="article-callout" style={{ marginTop: 0 }}>
                <p className="mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>結論</p>
                <p className="article-callout__text">
                  AEO（回答エンジン最適化）とは、AIが作る回答に自社の情報が選ばれるよう、コンテンツを整える施策です。
                </p>
              </div>

              <p className="article-prose">「AI検索で、自社のサイトが引用されない」「SEOで上位なのに、AIの回答に社名が出ない」とお悩みではありませんか。</p>
              <p className="article-prose">GoogleのAIによる概要やChatGPTは、ページの一覧ではなく、回答そのものを作ります。</p>
              <p className="article-prose">その回答に自社の情報が選ばれるための施策が、AEO（回答エンジン最適化）です。</p>
              <p className="article-prose">この記事を読めば、AEOの意味、SEOとの違い、9つの具体的な対策、効果測定の方法までわかります。</p>
              <p className="article-prose">専門用語はできるだけかみ砕いて解説しますので、初めての方もご安心ください。</p>
              <p className="article-prose">読み終えたときには、明日から自社サイトで着手できる改善点が見つかるはずです。</p>
              <p className="article-prose">AI検索の利用は広がっています。今のうちに土台を整えておくことが重要です。</p>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">AEO（回答エンジン最適化）とは？</h2>
                <p className="article-prose">AEOとは、AIが作る回答に自社の情報が選ばれるよう、コンテンツを最適化する取り組みです。</p>
                <p className="article-prose">本章では、定義、対象となる回答エンジン、貿易の「AEO制度」との違いを順に解説します。</p>

                <h3 className="article-h3">AEOの定義｜AI回答に採用されるための最適化</h3>
                <p className="article-prose">AEOは「Answer Engine Optimization」の略で、日本語では回答エンジン最適化と呼びます。読み方は「エーイーオー」です。アンサーエンジン最適化と表記される場合もあります。</p>
                <p className="article-prose">回答エンジンとは、質問に対して答えそのものを返す仕組みの総称です。GoogleのAIによる概要やAIモード、ChatGPT、Perplexityなどが当てはまります。</p>
                <p className="article-prose">従来の検索エンジンの役割は、関連するページを一覧で表示することでした。回答エンジンは、複数のページから情報を集め、1つの回答にまとめて返します。</p>
                <p className="article-prose">たとえば「AEOとは何ですか」と質問すると、AIは定義を数行でまとめて答えます。回答の根拠として、引用元のページも示されます。</p>
                <p className="article-prose">AEOの目的は、この回答の文章や引用元に、自社のページや情報が選ばれることです。</p>
                <p className="article-prose">AEOが狙う場面は、主に次の3つです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>質問への直接の回答文の中で、自社の情報が使われる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>回答の根拠として、自社ページが引用リンクで示される</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>おすすめや比較の回答で、自社名が挙がる</span>
                  </li>
                </ul>
                <p className="article-prose">対象は、生成AIの回答だけに限りません。検索結果の上部に出る要約や、音声アシスタントの回答も、AEOの対象に含まれると説明されます。</p>
                <Source name="一創「AEO(Answer Engine Optimization)とは?SEO・GEO・LLMOとの違いと対策手順」" url="https://www.issoh.co.jp/column/details/4941" />
                <p className="article-prose">なお、AEOの定義は、業界でまだ統一されていません。本記事では「AIの回答に採用されるための最適化」という意味で使います。</p>

                <h3 className="article-h3">AEOが対象とする回答エンジンの種類</h3>
                <p className="article-prose">AEOの対象は、検索エンジンのAI機能から対話型AIまで、幅広く広がっています。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>AEOの主な対象となる回答エンジン</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>回答エンジン</div>
                    <div>提供元</div>
                    <div>特徴</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">GoogleのAIによる概要（AI Overviews）</div>
                    <div className="article-table__cell">Google</div>
                    <div className="article-table__cell">検索結果の上部にAIの要約を表示。日本では2024年8月に提供を開始</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">GoogleのAIモード（AI Mode）</div>
                    <div className="article-table__cell">Google</div>
                    <div className="article-table__cell">長く複雑な質問に対応する検索。日本語では2025年9月に提供を開始</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">ChatGPT</div>
                    <div className="article-table__cell">OpenAI</div>
                    <div className="article-table__cell">対話型AI。検索機能でウェブの情報を参照して回答</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">Perplexity</div>
                    <div className="article-table__cell">Perplexity AI</div>
                    <div className="article-table__cell">回答と出典リンクを並べて表示する回答型の検索サービス</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">Gemini</div>
                    <div className="article-table__cell">Google</div>
                    <div className="article-table__cell">Googleの対話型AI</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">音声アシスタント</div>
                    <div className="article-table__cell">各社</div>
                    <div className="article-table__cell">音声で質問すると、1つの回答を読み上げる</div>
                  </div>
                </div>
                <Source name="Google「Google 検索における「AI モード」を日本語で提供開始」" url="https://blog.google/intl/ja-jp/products/explore-get-answers/ai-mode-search/" />
                <p className="article-prose">たとえば「おすすめのSEOツールは？」と質問します。AIによる概要とChatGPTでは、挙がる名前や引用元が異なる場合があります。</p>
                <p className="article-prose">そのため、1つのAIだけで判断せず、複数のAIで確認する視点が欠かせません。</p>
                <p className="article-prose">各エンジンは、回答の作り方や引用元の選び方が、少しずつ異なります。</p>
                <p className="article-prose">ただし、信頼できる情報を探すという点は共通しています。そのため、次の3つの共通する土台を固めることが優先です。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>信頼できる一次情報があること</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>機械が読み取りやすい構造であること</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>第三者から言及されていること</span>
                  </li>
                </ul>

                <h3 className="article-h3">貿易の「AEO制度」とは別の概念</h3>
                <p className="article-prose">「AEO」は、貿易の分野でも使われる略称です。そちらは、税関の「認定事業者制度（Authorized Economic Operator）」を指します。</p>
                <p className="article-prose">輸出入の手続きで、法令を守る体制が整った事業者を、税関が認定する制度です。</p>
                <p className="article-prose">本記事で扱うAEOは、AI検索の回答に最適化する施策です。貿易の制度とは関係がありません。</p>
                <p className="article-prose">検索データでも、「AEO制度とは」「AEO 認定 事業者 一覧」など、貿易に関する検索が多く見られます。「AEO」とだけ検索すると、意味が混在しやすいためです。</p>
                <p className="article-prose">貿易のAEOについて調べている方は、税関の公式サイトをご確認ください。</p>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>AEOとSEOの違い｜目的・評価軸・指標を比較</h2>
                <p className="article-prose">AEOとSEOの最大の違いは、ゴールが「順位」か「回答への採用」という点です。</p>
                <p className="article-prose">本章では、目的・評価対象・指標の3つの観点で、違いを整理します。</p>

                <h3 className="article-h3">AEOとSEOの目的の違い｜順位か回答採用か</h3>
                <p className="article-prose">SEOの目的は、検索結果で上位に表示され、クリックされることです。</p>
                <p className="article-prose">一方、AEOの目的は、AIが作る回答の中で、自社の情報が引用・言及されることです。</p>
                <p className="article-prose">同じ「AEOとは」という検索でも、読者の行動が変わります。SEOでは、上位のページを開いて読み比べます。AEOでは、AIの回答を読んで終える場面が増えています。</p>
                <p className="article-prose">Pew Research Centerの調査です。AI要約が表示された検索では、従来のリンクをクリックした割合が8%でした。AI要約が表示されない検索では、15%です。</p>
                <Source name="AI Weekly「Pew: AI summaries cut Google click-throughs to 8% from 15%」" url="https://aiweekly.co/alerts/pew-ai-summaries-cut-google-click-throughs-to-8-from-15" />
                <p className="article-prose">具体的な場面で考えてみましょう。担当者が「AEO対策のやり方」を調べるとします。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>SEOの流れ：検索結果から複数の記事を開き、手順を読み比べる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AEOの流れ：AIの回答で手順の概要を読み、気になった点だけ、引用元のページで確認する</span>
                  </li>
                </ul>
                <p className="article-prose">AEOの流れでは、AIの回答に載らなければ、記事を開かれる機会そのものがありません。載った場合は、概要を理解した状態の読者が訪れます。</p>
                <p className="article-prose">順位が高くても、回答の中に社名が出なければ、読者に届かない場面が増えています。</p>
                <p className="article-prose">そのため、SEOに加えて、「回答に選ばれる」ための設計が必要になります。</p>

                <h3 className="article-h3">AEOとSEOの評価対象・指標の違い</h3>
                <p className="article-prose">評価される対象も異なります。SEOはページ単位、AEOは回答に使われる情報の単位です。</p>
                <p className="article-prose">AIは、ページ全体ではなく、質問に答えている部分を引用元として使う傾向があります。そのため、見出しの直下に答えが明確にあるかが重要です。</p>
                <p className="article-prose">たとえば、1つの記事に「定義」「手順」「費用」が書かれているとします。質問が「手順」なら、AIは手順の部分だけを根拠に使う可能性があります。</p>
                <p className="article-prose">そのため、1つの見出しの下に、1つの質問への答えを、完結させて書くことが大切です。</p>
                <p className="article-prose">追うべき指標も変わります。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>SEOの主な指標：検索順位、表示回数、クリック率（CTR）、オーガニック流入数</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AEOの主な指標：AI回答での引用数、言及率、AI経由の流入数、指名検索数（社名・サービス名での検索数）</span>
                  </li>
                </ul>
                <p className="article-prose">Googleは、AI機能からの流入も、Search Consoleのウェブ検索のデータに含まれると説明しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">ただし、AIの回答内での引用・言及は、Search Consoleだけでは把握できません。そのため、AEOでは、専用の計測も組み合わせます。詳しくは、効果測定の章で解説します。</p>

                <h3 className="article-h3">AEOとSEOの比較表</h3>
                <p className="article-prose">ここまでの違いを、表にまとめます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>AEOとSEOの比較表</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>項目</div>
                    <div>SEO</div>
                    <div>AEO</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">目的</div>
                    <div className="article-table__cell">検索結果での上位表示とクリック獲得</div>
                    <div className="article-table__cell">AIの回答での引用・言及の獲得</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">最適化の単位</div>
                    <div className="article-table__cell">ページ</div>
                    <div className="article-table__cell">質問に答える情報（見出し・段落単位）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">主な指標</div>
                    <div className="article-table__cell">順位・表示回数・クリック率・流入数</div>
                    <div className="article-table__cell">引用数・言及率・AI経由の流入・指名検索数</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">コンテンツの書き方</div>
                    <div className="article-table__cell">キーワードを軸に、網羅的に解説</div>
                    <div className="article-table__cell">質問に対し、結論から端的に回答</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">主な対象</div>
                    <div className="article-table__cell">Google・Bingなどの検索結果</div>
                    <div className="article-table__cell">AIによる概要・AIモード・ChatGPT・Perplexityなど</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">成果の出る場所</div>
                    <div className="article-table__cell">自社サイト</div>
                    <div className="article-table__cell">AIの回答画面（認知）と自社サイト</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">代表的な施策</div>
                    <div className="article-table__cell">タイトル最適化・内部リンク・被リンク獲得</div>
                    <div className="article-table__cell">質問形式の見出し・結論ファースト・FAQ・外部での言及</div>
                  </div>
                </div>
                <p className="article-prose">表のとおり、両者は排他的な関係ではありません。重なる部分が多くあります。</p>

                <h3 className="article-h3">SEOはAI時代に必要なのか</h3>
                <p className="article-prose">結論として、SEOはAI時代にも必要です。AIが回答に使う情報は、検索で見つけられるページが土台になるためです。</p>
                <p className="article-prose">Googleは公式ドキュメントで、AIによる概要とAIモードに表示されるための追加要件はないと説明しています。特別な最適化も不要で、通常のSEOの基本が、そのまま有効です。</p>
                <p className="article-prose">また、ページが回答の根拠として表示されるには、インデックスされ、スニペット付きで表示できる状態である必要があります。</p>
                <p className="article-prose">つまり、クロールされないページや、インデックスされないページは、AIの回答にも使われません。</p>
                <p className="article-prose">Googleは、AI機能が関連する複数の検索を行い、従来より幅広く多様なリンクを表示できるとも説明しています。</p>
                <p className="article-prose">上位表示されていないページでも、サブクエリに的確に答えていれば、拾われる可能性があります。</p>
                <p className="article-prose">さらに、AIは1つの質問を複数のサブクエリに分解して、関連ページを探します。この仕組みを、クエリファンアウトと呼びます。この過程でも、検索で見つかる状態であることが前提です。</p>
                <p className="article-prose">そのため、「SEOからAEOへ乗り換える」という発想は適切ではありません。SEOの土台の上に、AEOの工夫を重ねる考え方が現実的です。</p>
                <p className="article-prose">「SEOが不要になる」と見るより、「SEOの役割が広がる」と捉えるのが適切です。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />

                <h3 className="article-h3">AEOとSEOは対立せず補完し合う関係</h3>
                <p className="article-prose">AEOとSEOには、共通して必要な施策が多くあります。まず、共通施策を整理します。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>E-E-A-T（経験・専門性・権威性・信頼性）の強化</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>内部リンクとサイト構造の整理</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>表示速度とモバイル対応の改善</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>一次情報と独自データの掲載</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>公開日・更新日の管理</span>
                  </li>
                </ul>
                <p className="article-prose">次に、AEOで特に重視する固有の施策です。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>質問形式の見出し</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>見出し直下での結論ファースト</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>表・リストによる情報の整理</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AIクローラーのアクセス許可</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AI回答での引用・言及の計測</span>
                  </li>
                </ul>
                <p className="article-prose">共通施策は、AEOの土台にもなります。SEOで積み上げた資産は、そのまま活かせます。</p>
                <p className="article-prose">たとえば、E-E-A-Tの強化は、SEOの評価にもAIの引用にもつながります。質問形式の見出しや結論ファーストは、読者の離脱を減らす効果も期待できます。</p>
                <p className="article-prose">次の章では、AEOと混同されやすいGEO・LLMO・AIOとの違いを整理します。</p>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>AEOとGEO・LLMO・AIOの違いを整理</h2>
                <p className="article-prose">AEO・GEO・LLMO・AIOは、いずれもAI検索に向けた最適化を指し、重なる部分が大きい用語です。</p>
                <p className="article-prose">指す範囲には違いがあるため、本章で整理します。なお、各用語の定義は、解説する企業や媒体によって異なります。本記事では、一般的な使われ方に沿って説明します。</p>

                <h3 className="article-h3">AEOとGEOの違い｜対象と目的を比較</h3>
                <p className="article-prose">GEOは「Generative Engine Optimization」の略で、生成AIの回答に最適化する取り組みです。</p>
                <p className="article-prose">AEOは「回答」への採用に、GEOは「生成AIが作る文章」への採用に、焦点があります。</p>
                <p className="article-prose">たとえば「30代におすすめの転職サービスは？」とChatGPTに質問すると、AIは複数のサービス名を挙げて説明します。GEOでは、この回答の中で自社サービスが紹介されることを目指します。</p>
                <p className="article-prose">実務では、ほぼ同じ施策を指す場面が多くあります。どちらも、AIに引用されやすい情報を整える点が共通するためです。</p>
                <p className="article-prose">違いを一言でまとめると、AEOは回答枠全般、GEOは生成AIという範囲の差です。</p>
                <p className="article-prose">AEOの対象は、GoogleのAIによる概要だけではありません。強調スニペットや「他の人はこちらも質問」、音声アシスタントの回答も含むと説明されます。</p>
                <p className="article-prose">「AEO GEO」と検索する方は、どちらを使うか迷っている場合が多いです。社内の共通用語として、どちらかに統一すれば十分です。</p>

                <h3 className="article-h3">AEOとLLMOの違い｜最適化の範囲を整理</h3>
                <p className="article-prose">LLMOは「Large Language Model Optimization」の略です。大規模言語モデル（LLM）に向けた最適化を指します。</p>
                <p className="article-prose">LLMとは、ChatGPTやGeminiの中核となる、大量の文章を学習したAIのことです。</p>
                <p className="article-prose">LLMOは、AIが回答する際に、自社のブランドや情報が正しく言及されることを目指します。</p>
                <p className="article-prose">AEOが「回答への採用」を狙うのに対し、LLMOは「AIの知識の中での自社の認知」まで含めて語られます。</p>
                <p className="article-prose">たとえば「おすすめのSEO会社は？」と質問したとき、自社名が挙がるかどうかが、LLMOの観点です。</p>
                <p className="article-prose">LLMOでは、ウェブ上での言及の質と量が、AIの理解に影響すると考えられます。公式サイト、プレスリリース、第三者メディアなど、複数の場所で一貫した情報を発信することが基本です。</p>
                <p className="article-prose">整理すると、次のとおりです。引用リンクがつく回答への働きかけはAEO。AIの知識そのものへの働きかけはLLMOです。</p>

                <h3 className="article-h3">AEOとAIOの違い｜AI Overviewsとの関係</h3>
                <p className="article-prose">AIOは、Googleの「AI Overviews（AIによる概要）」への最適化を指す言葉です。</p>
                <p className="article-prose">AIによる概要は、検索結果の上部に表示されるAI要約で、日本では2024年8月に提供が始まりました。</p>
                <p className="article-prose">AEOは回答枠全般を指すため、AIOはAEOの一部と位置づけられます。</p>
                <p className="article-prose">Googleの公式ドキュメントによると、AIによる概要とAIモードは、異なるモデルや手法を使う場合があります。そのため、表示される回答やリンクが変わることがあります。</p>
                <p className="article-prose">なお、AIによる概要は、すべての検索で表示されるわけではありません。Googleによると、従来の検索結果に付加価値があると判断された場合に表示されます。</p>
                <p className="article-prose">AIOだけに絞らず、AIモードや他のAIも視野に入れることが重要です。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />

                <h3 className="article-h3">SEO・AEO・GEO・LLMO・AIOの比較表</h3>
                <p className="article-prose">5つの用語の違いを、表にまとめます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>SEO・AEO・GEO・LLMO・AIOの比較表</p>
                <div className="article-table" style={{ margin: "0 0 32px", "--table-cols": "1fr 1fr 1fr 1fr" } as { [key: string]: string | number }}>
                  <div className="article-table__head">
                    <div>用語</div>
                    <div>正式名称</div>
                    <div>主な対象</div>
                    <div>狙い</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">SEO</div>
                    <div className="article-table__cell">Search Engine Optimization</div>
                    <div className="article-table__cell">検索エンジンの検索結果</div>
                    <div className="article-table__cell">上位表示とクリック獲得</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AEO</div>
                    <div className="article-table__cell">Answer Engine Optimization</div>
                    <div className="article-table__cell">回答エンジン全般の回答</div>
                    <div className="article-table__cell">回答への採用</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">GEO</div>
                    <div className="article-table__cell">Generative Engine Optimization</div>
                    <div className="article-table__cell">生成AIの回答</div>
                    <div className="article-table__cell">生成AIの回答での引用・言及</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">LLMO</div>
                    <div className="article-table__cell">Large Language Model Optimization</div>
                    <div className="article-table__cell">大規模言語モデル</div>
                    <div className="article-table__cell">AIの中での自社ブランドの言及と認知</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AIO</div>
                    <div className="article-table__cell">AI Overviews向けの最適化</div>
                    <div className="article-table__cell">GoogleのAIによる概要</div>
                    <div className="article-table__cell">AIによる概要での引用</div>
                  </div>
                </div>
                <p className="article-prose">用語の使い分けに迷ったときの早見表として、ご活用ください。</p>

                <h3 className="article-h3">どの対策から始めるべきか</h3>
                <p className="article-prose">迷ったら、共通施策から始めるのが結論です。用語ごとに施策を分けても、土台となる条件は共通だからです。</p>
                <p className="article-prose">信頼できる一次情報、機械が読み取りやすい構造、第三者からの言及の3つは、どの用語でも求められると指摘されています。</p>
                <p className="article-prose">サイトの規模によって、重点を置く施策は変わります。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>小規模なサイト：専門領域を絞り、質問への回答と著者情報の明記から始める</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>中規模以上のサイト：既存記事の構成を改善し、トピッククラスターで関連ページをつなぐ</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>大規模なサイト：技術面（クロール・表示速度）の点検と、計測の仕組みづくりも並行する</span>
                  </li>
                </ul>
                <p className="article-prose">おすすめの優先順位は、次のとおりです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>SEOの基本を整える（クロール・インデックス・表示速度）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>質問と結論が明確なコンテンツに改善する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>E-E-A-Tと一次情報を強化する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>外部サイトでの言及を増やす</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">5.</span>
                    <span>AIでの引用・言及を計測する</span>
                  </li>
                </ol>
                <p className="article-prose">具体的な進め方は、AEO対策の章で詳しく解説します。</p>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">AEOが注目される理由と背景</h2>
                <p className="article-prose">AEOが注目される理由は、検索の入口が「リンクの一覧」から「AIの回答」へ広がっているためです。</p>
                <p className="article-prose">本章では、公式発表と調査データで、背景を確認します。</p>

                <h3 className="article-h3">AI回答で完結する検索行動の増加</h3>
                <p className="article-prose">検索の場で、AIが回答を示す機会が増えています。日本での主な動きは、次のとおりです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>2024年8月：AIによる概要（AI Overviews）が日本でも提供開始</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>2025年9月：AIモードが日本語で提供開始</span>
                  </li>
                </ul>
                <p className="article-prose">AIモードは、長く複雑な質問に、1回の検索で答えます。Googleによると、初期のユーザーは、従来の2〜3倍の長さの質問をしていました。</p>
                <p className="article-prose">質問が長くなると、AIは質問を分解し、複数の検索を同時に実行します。この仕組みが、クエリファンアウトです。</p>
                <p className="article-prose">その結果、検索者はリンクを開く前に、回答を読んで判断を終える場面が増えます。</p>
                <p className="article-prose">GoogleのAIモードは、可能な限りAIの回答を表示します。ただし、信頼性が低いと判断した場合は、ウェブ検索結果を表示すると説明しています。</p>
                <p className="article-prose">つまり、AIの回答と従来の検索結果が、併存している状態です。両方に向けた最適化を、並行して進める視点が欠かせません。</p>

                <h3 className="article-h3">ゼロクリック検索の拡大と流入への影響</h3>
                <p className="article-prose">ゼロクリック検索とは、検索結果のページで用が済み、サイトへ訪問されない検索のことです。</p>
                <p className="article-prose">Pew Research Centerの調査で、AI要約の影響が数字で示されています。対象は、2025年4月の米国の成人900人、検索68,879件です。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>AI要約の有無によるクリック行動の違い（Pew Research Center）</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>項目</div>
                    <div>AI要約あり</div>
                    <div>AI要約なし</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">従来の検索結果のリンクをクリックした割合</div>
                    <div className="article-table__cell">8%</div>
                    <div className="article-table__cell">15%</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">ブラウジングセッションが終了した割合</div>
                    <div className="article-table__cell">26%</div>
                    <div className="article-table__cell">16%</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AI要約内のリンクをクリックした割合</div>
                    <div className="article-table__cell">1%</div>
                    <div className="article-table__cell">-</div>
                  </div>
                </div>
                <Source name="AI Weekly「Pew: AI summaries cut Google click-throughs to 8% from 15%」" url="https://aiweekly.co/alerts/pew-ai-summaries-cut-google-click-throughs-to-8-from-15" />
                <p className="article-prose">AI要約が表示されると、従来のリンクのクリック率は、およそ半分になっています。</p>
                <p className="article-prose">数字が示す意味は、2つあります。1つ目は、AI要約の有無で、サイトへの訪問機会が変わることです。2つ目は、AI要約内のリンクのクリック率が1%と低く、リンクが示されても、訪問につながりにくいことです。</p>
                <p className="article-prose">つまり、AIの回答の中で、社名やサービス名が目に触れること自体が、認知の機会として重要になります。</p>
                <p className="article-prose">ただし、この調査は米国での結果です。日本の検索に、そのまま当てはまるとは限りません。</p>
                <p className="article-prose">一方、Googleは、AIによる概要を含む検索からのクリックは、滞在時間が長くなる傾向があると観察しています。</p>
                <p className="article-prose">クリック数は減っても、クリックされた訪問の質が高まる可能性があります。</p>

                <h3 className="article-h3">音声検索・AIエージェントの普及</h3>
                <p className="article-prose">回答が1つに絞られる環境ほど、AEOの重要度は高まります。</p>
                <p className="article-prose">音声検索では、AIが読み上げる回答は、通常1つです。10件の候補から選べる検索結果と異なり、2位以下がありません。</p>
                <p className="article-prose">画面に回答を表示する場合も同様です。AIの回答に載らなければ、読者の選択肢に入りません。</p>
                <p className="article-prose">たとえば「近くのおすすめのカフェは？」と音声で尋ねると、AIが読み上げる店舗は、1〜2件程度です。候補が一覧で並ぶ画面と異なり、選ばれなかった店舗は、紹介されません。</p>
                <p className="article-prose">AIモードは、音声やカメラ、画像アップロードでの質問にも対応しています。入力方法が広がるほど、回答を求める場面も増えます。</p>
                <p className="article-prose">情報を探す主体が、人からAIへ広がっている点は、押さえておきたい変化です。</p>

                <h3 className="article-h3">AI回答に引用されるブランドの価値</h3>
                <p className="article-prose">AI回答に引用されると、ブランドの認知につながる可能性があります。</p>
                <p className="article-prose">ただし、引用が売上や指名検索にどれだけ貢献するかを、定量的に示す公開データは、現時点で限られています。</p>
                <p className="article-prose">参考になるのは、Googleの観察です。AIによる概要を含む検索のクリックは、質が高い傾向があると説明しています。</p>
                <p className="article-prose">回答の中で繰り返し目にする社名は、読者の記憶に残りやすいと考えられます。</p>
                <p className="article-prose">引用される効果として、次の3つが期待されます。ただし、いずれも測定して確かめる必要があります。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AI回答での社名の露出による、認知の向上</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>引用リンクからの、質の高い訪問</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AI経由で社名を知った人による、指名検索</span>
                  </li>
                </ul>
                <p className="article-prose">まずは、引用・言及の状況を継続して見ることが、判断材料になります。計測方法は、後の章で解説します。</p>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">AEOの仕組み｜AIが回答を選ぶ流れ</h2>
                <p className="article-prose">AIは、学習済みの知識と、検索で集めた最新情報を組み合わせて、回答を作ります。</p>
                <p className="article-prose">仕組みを知ると、対策の理由が理解しやすくなります。</p>

                <h3 className="article-h3">回答エンジンが情報を取得する3つの流れ</h3>
                <p className="article-prose">回答エンジンが情報を得る方法は、大きく3つに整理できます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>回答エンジンが情報を取得する3つの流れ</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>流れ</div>
                    <div>概要</div>
                    <div>AEOでの意味</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">学習済みの知識</div>
                    <div className="article-table__cell">AIが事前学習で身につけた知識から回答する</div>
                    <div className="article-table__cell">学習データに自社情報が含まれているか（LLMOの領域）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">検索連動（RAG）</div>
                    <div className="article-table__cell">質問に関連するページを検索し、内容を取り込んで回答する</div>
                    <div className="article-table__cell">検索で見つかり、引用元に選ばれるか（AEOの中心）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">リアルタイム検索</div>
                    <div className="article-table__cell">ニュースなどの最新情報を、その場で検索して回答する</div>
                    <div className="article-table__cell">最新の情報を掲載し、更新を続けているか</div>
                  </div>
                </div>
                <p className="article-prose">RAGとは「Retrieval-Augmented Generation」の略です。検索した情報を取り込んで、回答を生成する仕組みを指します。</p>
                <p className="article-prose">AEO対策の多くは、2つ目と3つ目の流れに働きかけるものです。学習済みの知識は、個別のサイトが直接変えにくい領域だからです。</p>
                <p className="article-prose">たとえば、新製品を発表した場合を考えます。学習済みの知識には、発表前の情報しかありません。最新の製品情報を答えるには、検索連動やリアルタイム検索で、公式サイトやニュースが参照される必要があります。</p>
                <p className="article-prose">Googleも、AIモードは、ウェブコンテンツに加えて、ナレッジグラフなどのリアルタイム情報を活用すると説明しています。</p>

                <h3 className="article-h3">クエリファンアウトによる質問の分解</h3>
                <p className="article-prose">クエリファンアウトとは、AIが1つの質問を複数のサブクエリに分解して、検索する仕組みです。</p>
                <p className="article-prose">Googleは、AIモードが質問をサブトピックに分解し、サブクエリで検索を実行すると説明しています。</p>
                <p className="article-prose">たとえば「AEO対策のやり方を教えて」と質問します。AIは「AEOの定義」「見出しの書き方」「構造化データ」「効果測定」などに分解して、検索する可能性があります。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>サブクエリへの分解例</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>元の質問</div>
                    <div>サブクエリの例</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AEO対策のやり方を教えて</div>
                    <div className="article-table__cell">AEOとは／AEO対策の施策一覧／質問形式の見出しの書き方／構造化データは必要か／AEOの効果測定の方法</div>
                  </div>
                </div>
                <p className="article-prose">分解されたサブクエリごとに検索結果が集められ、1つの回答に統合されます。</p>
                <p className="article-prose">この仕組みでは、1つのページが、複数のサブクエリの回答元に選ばれる場合があります。</p>
                <p className="article-prose">逆に言えば、関連する疑問に答えていないページは、候補から外れやすくなります。</p>
                <p className="article-prose">そのため、1つのキーワードだけで上位を狙う発想から、関連する質問群に答える発想への転換が必要です。キーワードの順位ではなく、質問への答えが評価される場面が増えます。</p>
                <p className="article-prose">仕組みの詳細は、関連記事「クエリファンアウトとは？GEO・LLMO対策への活用方法も解説！」で解説しています。</p>
                <RelatedCard href="/lab/query-fan-out" title="クエリファンアウトとは？GEO・LLMO対策への活用方法も解説！" />

                <h3 className="article-h3">回答に選ばれやすい情報の共通点</h3>
                <p className="article-prose">回答に選ばれやすい情報には、5つの共通点があります。ただし、AIの選定基準は公開されていません。実務上の傾向を整理したものです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>結論が先に書かれている：質問の直後に、短く言い切る答えがある</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>構造がわかりやすい：見出し・表・リストで、情報が区切られている</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>根拠がある：数値・出典・一次情報が示されている</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>更新されている：公開日と更新日が明記され、情報が古くない</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">5.</span>
                    <span>発信者が信頼できる：著者や運営者の情報が明らかで、第三者からも言及されている</span>
                  </li>
                </ol>
                <p className="article-prose">たとえば、「AEOの効果は3か月で出ます」という断定は、根拠がなければ、信頼性の面で弱くなります。根拠となる調査や出典を添えることで、情報の信頼度が高まります。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>回答に選ばれやすい書き方の例</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>共通点</div>
                    <div>弱い書き方</div>
                    <div>強い書き方</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">結論が先</div>
                    <div className="article-table__cell">まず背景から説明します</div>
                    <div className="article-table__cell">結論：〇〇です。理由は2つあります</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">根拠がある</div>
                    <div className="article-table__cell">多くの企業が導入しています</div>
                    <div className="article-table__cell">導入企業は〇社です（2026年〇月時点、自社調べ）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">更新されている</div>
                    <div className="article-table__cell">公開日の記載なし</div>
                    <div className="article-table__cell">公開日と最終更新日を明記</div>
                  </div>
                </div>
                <p className="article-prose">Googleも、重要な内容をテキストで提供することと、構造化データを表示テキストと一致させることを推奨しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">次の章では、この5つの共通点を、9つの具体的な施策に落とし込みます。</p>
              </section>

              {/* Section 6 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>AEO対策のやり方｜今すぐできる9つの施策</h2>
                <p className="article-prose">AEO対策は、9つの施策に分けて進めると、迷わず実行できます。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>想定質問を洗い出す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>見出しを質問形式にする</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>冒頭で結論を簡潔に答える</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>表・リストで情報を整理する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">5.</span>
                    <span>FAQと構造化データを整備する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">6.</span>
                    <span>E-E-A-Tと一次情報を強化する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">7.</span>
                    <span>トピッククラスターで網羅する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">8.</span>
                    <span>外部での言及を増やす</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">9.</span>
                    <span>AIクローラーのアクセスを確認する</span>
                  </li>
                </ol>
                <p className="article-prose">各ステップに、ビフォー・アフターの例を入れています。</p>

                <h3 className="article-h3">ステップ1：想定質問を洗い出す</h3>
                <p className="article-prose">最初に、読者がAIに投げかける質問を集めます。質問が決まらないと、見出しも結論も決められないためです。</p>
                <p className="article-prose">質問を集める方法は、次のとおりです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>Google Search Consoleの検索クエリ</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「他の人はこちらも質問」とサジェストキーワード</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>営業や問い合わせ窓口に寄せられる質問</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>検索意図（インテント）を分析するツール</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AIへの質問（「〇〇について知りたい人は、何を質問しますか？」）</span>
                  </li>
                </ul>
                <p className="article-prose">AIに質問する方法もあります。たとえば「AEOについて調べる人は、どんな疑問を持ちますか？20個挙げてください」と聞きます。見落としている質問に気づけます。</p>
                <p className="article-prose">集めた質問は、4つに分類します。定義（〜とは）、手順（やり方）、比較（違い）、条件（いつ・誰が）です。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>想定質問の分類例</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>分類</div>
                    <div>質問の例</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">定義</div>
                    <div className="article-table__cell">AEOとは何ですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">手順</div>
                    <div className="article-table__cell">AEO対策は何から始めればよいですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">比較</div>
                    <div className="article-table__cell">AEOとSEOの違いは何ですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">条件</div>
                    <div className="article-table__cell">小規模なサイトでも、AEO対策は必要ですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">測定</div>
                    <div className="article-table__cell">AEOの効果は、どう測りますか？</div>
                  </div>
                </div>
                <p className="article-prose">「AEO」がテーマなら、「AEOとは」「AEO対策のやり方」「AEOとSEOの違い」「AEOの効果測定」などに分かれます。</p>
                <p className="article-prose">最後に、検索需要が大きく、自社が答えられる質問から、優先して着手します。</p>

                <h3 className="article-h3">ステップ2：見出しを質問形式にする</h3>
                <p className="article-prose">見出しは、読者が実際に使う質問の形にすると、AIが内容を把握しやすくなります。</p>
                <p className="article-prose">ポイントは、1つの見出しに、1つの質問だけを対応させることです。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>見出しのビフォー・アフター例</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>ビフォー</div>
                    <div>アフター</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AEOについて</div>
                    <div className="article-table__cell">AEOとは何ですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">対策の方法</div>
                    <div className="article-table__cell">AEO対策は何から始めればよいですか？</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">メリット・デメリット</div>
                    <div className="article-table__cell">AEO対策のデメリットは何ですか？</div>
                  </div>
                </div>
                <p className="article-prose">H2は、メインの質問に続くフォローアップ質問と、1対1で対応させます。「AEOとは？」の次に、「SEOとの違いは？」「なぜ必要か？」と続ける形です。</p>
                <p className="article-prose">質問は、答えが1つにまとまる粒度にします。広すぎる質問は、小さな質問に分けて、複数の見出しにします。</p>
                <p className="article-prose">たとえば「AEO対策のやり方」は広いため、「何から始めるか」「どこまで自社でできるか」などに分けられます。</p>
                <p className="article-prose">不自然になる場合は、名詞止めの見出しでも構いません。無理に質問へ変える必要はありません。</p>

                <h3 className="article-h3">ステップ3：冒頭で結論を簡潔に答える</h3>
                <p className="article-prose">見出しの直下1〜2文で、結論を言い切ります。理由や具体例は、そのあとに続けます。</p>
                <p className="article-prose">この順番を、PREP法と呼びます。結論（Point）、理由（Reason）、具体例（Example）、まとめ（Point）の順です。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>冒頭文のビフォー・アフター例</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>ビフォー</div>
                    <div>アフター</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AEOは近年、さまざまな分野で注目されており、多くの企業が関心を寄せている施策のひとつです。まず背景から整理します。</div>
                    <div className="article-table__cell">AEOとは、AIが作る回答に自社の情報が選ばれるよう、コンテンツを整える施策です。背景は次のとおりです。</div>
                  </div>
                </div>
                <p className="article-prose">結論が冒頭にあれば、AIは該当部分を回答として使いやすくなります。読者も、スクロールせずに答えを確認できます。</p>
                <p className="article-prose">結論を書くときのポイントは、次の3つです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>数字や固有名詞を入れて、言い切る</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「〜と思います」「〜かもしれません」の表現を避ける</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>結論の直後に、理由を1文で添える</span>
                  </li>
                </ul>
                <p className="article-prose">1文は、40〜60文字を目安にします。スマートフォンで見たときに、3行以内に収まる長さです。</p>

                <h3 className="article-h3">ステップ4：表・リストで情報を整理する</h3>
                <p className="article-prose">比較や手順は、文章より表やリストのほうが、AIにも読者にも伝わりやすくなります。使い分けは、次のとおりです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>3つ以上の並列する情報：箇条書き</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>複数の選択肢の比較：表</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>順序のある手順：番号付きリスト</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>用語の意味：冒頭に定義文を1文</span>
                  </li>
                </ul>
                <p className="article-prose">表は、項目名を左端の列に入れ、1行に1つの観点だけを書きます。</p>
                <p className="article-prose">たとえば、「手順が9つあり、1つ目は〜、2つ目は〜」と文章で続けるより、番号付きリストにするほうが、構造が明確になります。</p>
                <p className="article-prose">表のセルには、長文を入れず、1セル40字程度を目安に、簡潔に書きます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>表の書き方の例</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>おすすめの書き方</div>
                    <div>避けたい書き方</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">1行に1つの観点だけを書く</div>
                    <div className="article-table__cell">1つのセルに複数の観点を詰め込む</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">1セル40字程度に収める</div>
                    <div className="article-table__cell">セルに長文を入れる</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">テキストで表を作成する</div>
                    <div className="article-table__cell">画像で表を作成する</div>
                  </div>
                </div>
                <p className="article-prose">注意点は、画像で表を作らないことです。AIや検索エンジンが読み取れない場合があるため、テキストの表を使います。</p>

                <h3 className="article-h3">ステップ5：FAQと構造化データを整備する</h3>
                <p className="article-prose">FAQは、質問と回答のペアで構成できるため、AEOと相性のよいコンテンツです。まとめの前に、3〜5個のFAQを設置します。</p>
                <p className="article-prose">構造化データ（schema.org）とは、ページの内容を機械に伝えるための記述です。FAQPageなどの種類があります。</p>
                <p className="article-prose">ここで、注意点があります。Googleは、AIによる概要とAIモードに表示されるために、特別な構造化データは不要だと説明しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">また、2023年8月以降、FAQのリッチリザルトの表示は、限定されています。対象は、政府機関や医療・健康分野の権威あるサイトが中心です。</p>
                <Source name="Google検索セントラル ブログ「Changes to HowTo and FAQ rich results」" url="https://developers.google.com/search/blog/2023/08/howto-faq-changes" />
                <p className="article-prose">一方、構造化データを使う場合は、ページの表示テキストと一致させることを、Googleは推奨しています。</p>
                <p className="article-prose">そのため、次の方針が現実的です。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>FAQの本文は、人にもAIにも読める形で、見出しと文章で書く</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>構造化データを入れる場合は、表示している内容と一致させる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>構造化データだけに頼らず、本文の質を優先する</span>
                  </li>
                </ul>
                <p className="article-prose">FAQ Pageを使う場合の、記述の例です。JSON-LDという形式で、ページに埋め込みます。</p>
                <CodeBlock code={"{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [{\n    \"@type\": \"Question\",\n    \"name\": \"AEOとSEOはどちらを優先すべき？\",\n    \"acceptedAnswer\": {\n      \"@type\": \"Answer\",\n      \"text\": \"まずSEOを優先し、並行してAEOを重ねるのがおすすめです。\"\n    }\n  }]\n}"} />
                <p className="article-prose">なお、構造化データを残していても、検索結果に悪影響は出ないと、Googleは助言しています。</p>
                <Source name="Google検索セントラル ブログ「Changes to HowTo and FAQ rich results」" url="https://developers.google.com/search/blog/2023/08/howto-faq-changes" />

                <h3 className="article-h3">ステップ6：E-E-A-Tと一次情報を強化する</h3>
                <p className="article-prose">E-E-A-Tとは、コンテンツの品質を評価する観点として知られる言葉です。次の4つの頭文字を表します。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>経験（Experience）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>専門性（Expertise）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>権威性（Authoritativeness）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>信頼性（Trustworthiness）</span>
                  </li>
                </ul>
                <p className="article-prose">AIは、発信者の信頼性が見える情報を、回答に使いやすいと考えられます。次の5点を整えます。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>著者・監修者の氏名と経歴を明記する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>運営会社の情報（会社概要・問い合わせ先）を掲載する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>公開日と更新日を表示する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>出典のURLを明記する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>自社の調査データや事例など、一次情報を載せる</span>
                  </li>
                </ul>
                <p className="article-prose">書き方の例を示します。「多くの企業で効果が出ています」では、具体性に欠けます。「自社で計測した30件の質問のうち、12件で引用されました」のように、数字で書きます。</p>
                <p className="article-prose">一次情報は、他のサイトが真似できません。AIにとって、引用する価値の高い情報になります。</p>
                <p className="article-prose">著者情報は、「監修：〇〇（SEOコンサルタント、経験〇年）」のように、肩書きと経験を具体的に示します。</p>
                <p className="article-prose">第三者の目で信頼性を確認できる材料も、有効です。受賞歴、認証、メディア掲載、導入企業の声などを、実績のページにまとめます。</p>

                <h3 className="article-h3">ステップ7：トピッククラスターで網羅する</h3>
                <p className="article-prose">トピッククラスターとは、1つのテーマに関するページを、内部リンクでまとめて構成する手法です。</p>
                <p className="article-prose">クエリファンアウトでは、1つの質問が複数のサブクエリに分解されます。そのため、サブクエリにも答えるページ群があると、候補に入りやすくなります。</p>
                <p className="article-prose">構成の例を示します。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>親ページ（ピラー）：AEOとは</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>子ページ：AEOとSEOの違い</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>子ページ：AEO対策のやり方</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>子ページ：AEOの効果測定</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>子ページ：AEOとGEOの違い</span>
                  </li>
                </ul>
                <p className="article-prose">クラスターの作り方は、次の3つの手順です。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>メインの質問に答える、親ページを作る</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>サブクエリごとに、1ページ1質問の子ページを作る</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>親ページと子ページを、内部リンクで相互につなぐ</span>
                  </li>
                </ol>
                <p className="article-prose">各子ページから親ページへ、内部リンクを張ります。親ページからも、子ページへリンクします。</p>
                <p className="article-prose">自社の専門領域に絞って作ることが重要です。専門外のテーマまで広げると、サイト全体の専門性が薄まります。</p>
                <p className="article-prose">クラスターは、作って終わりではありません。新しい質問が増えたら、子ページを追加し、親ページからのリンクも更新します。</p>

                <h3 className="article-h3">ステップ8：外部での言及を増やす</h3>
                <p className="article-prose">AIは、自社サイトだけでなく、第三者の情報も参照して回答を作ります。</p>
                <p className="article-prose">そのため、外部サイトでの言及（サイテーション）が、AEOでも重要になります。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>業界メディアやニュースサイトへの掲載（プレスリリースの配信）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>他社サイトや協会サイトからの紹介</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>事例・導入インタビューの公開</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>口コミサイトやレビューサイトでの評価</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>公式SNSでの発信</span>
                  </li>
                </ul>
                <p className="article-prose">言及を増やす優先順位は、信頼性の高い媒体からです。業界団体、公的機関、専門メディアへの掲載は、自社発信より第三者性が高い情報として扱われやすいと考えられます。</p>
                <p className="article-prose">発信の際は、社名・サービス名・説明文の表記を統一します。表記がぶれると、AIが同じ会社だと認識しにくくなるためです。</p>
                <p className="article-prose">不自然な相互リンクや、宣伝と気づきにくい投稿は、逆効果になる可能性があります。</p>

                <h3 className="article-h3">ステップ9：AIクローラーのアクセスを確認する</h3>
                <p className="article-prose">AIに引用されるには、AIのクローラーが、ページにアクセスできる状態であることが前提です。</p>
                <p className="article-prose">robots.txtや、CDN・ホスティングの設定で、意図せずブロックしていないかを確認します。Googleも、クロールを許可するよう案内しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">確認の手順は、次のとおりです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>robots.txtで、OAI-SearchBotなどを誤って拒否していないか確認する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>サーバーのログや、CDNのボット対策で、AIクローラーを遮断していないか確認する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>重要なページが、noindexになっていないか確認する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>本文が、JavaScriptの実行後にだけ表示される状態になっていないか確認する</span>
                  </li>
                </ol>
                <p className="article-prose">OpenAIは、用途の異なる3種類のクローラーを公開しています。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>OpenAIの主なクローラーと役割</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>クローラー</div>
                    <div>役割</div>
                    <div>ブロックした場合</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">OAI-SearchBot</div>
                    <div className="article-table__cell">ChatGPTの検索機能での表示</div>
                    <div className="article-table__cell">ChatGPT検索の回答に表示されなくなる</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">GPTBot</div>
                    <div className="article-table__cell">生成AIの基盤モデルの学習</div>
                    <div className="article-table__cell">学習に使わないという意思表示になる</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">ChatGPT-User</div>
                    <div className="article-table__cell">ユーザーの操作に応じたアクセス</div>
                    <div className="article-table__cell">検索への掲載可否とは関係しない</div>
                  </div>
                </div>
                <p className="article-prose">OAI-SearchBotとGPTBotは、独立して設定できます。検索には表示しつつ、学習には使わせない設定も可能です。</p>
                <p className="article-prose">設定を変更しても、検索への反映には時間がかかります。OpenAIは、robots.txtの更新から、約24時間かかる場合があると説明しています。</p>
                <Source name="OpenAI「Overview of OpenAI Crawlers」" url="https://developers.openai.com/api/docs/bots" />
                <p className="article-prose">Google側にも設定があります。Googleの他のAIシステムの学習や根拠づけを制限したい場合は、Google-Extendedを確認します。</p>
                <p className="article-prose">あわせて、表示速度と、JavaScriptで表示する本文がクロールされているかも、点検しましょう。</p>
              </section>

              {/* Section 7 */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">AEO対策の効果測定｜指標・ツール・診断</h2>
                <p className="article-prose">AEOの効果は、検索順位だけでは測れません。引用・言及・流入の3つを見ます。</p>
                <p className="article-prose">本章では、見るべき指標、ツールの選び方、自社ツールの「GEO Watcher」を紹介します。</p>

                <h3 className="article-h3">AEOの効果測定で見るべき指標</h3>
                <p className="article-prose">AEOでは、次の5つの指標を組み合わせて見ます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>AEOの効果測定で見る主な指標</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>指標</div>
                    <div>何がわかるか</div>
                    <div>主な確認方法</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">引用数・引用率</div>
                    <div className="article-table__cell">AIの回答で、自社のURLが引用された回数と割合</div>
                    <div className="article-table__cell">専用ツール／質問を決めた手動確認</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">言及率</div>
                    <div className="article-table__cell">質問に対し、自社名が回答に含まれる割合</div>
                    <div className="article-table__cell">専用ツール／質問を決めた手動確認</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">シェアオブボイス</div>
                    <div className="article-table__cell">競合を含めた中での、自社の言及の割合</div>
                    <div className="article-table__cell">専用ツール</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">AI経由の流入数</div>
                    <div className="article-table__cell">AIの回答から、自社サイトを訪れた人数</div>
                    <div className="article-table__cell">アクセス解析（参照元の確認）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">指名検索数</div>
                    <div className="article-table__cell">自社名・サービス名での検索数</div>
                    <div className="article-table__cell">Search Console</div>
                  </div>
                </div>
                <p className="article-prose">質問セットの作り方も、あらかじめ決めておきます。目安は、自社の事業に関連する質問を、20〜30個選ぶことです。</p>
                <p className="article-prose">質問は、「定義」「比較」「おすすめ」「やり方」の4種類に分けると、傾向を比べやすくなります。</p>
                <p className="article-prose">計測の限界も、あらかじめ理解しておきましょう。AIの回答は、質問の言い回しやタイミングで変わります。</p>
                <p className="article-prose">1回の確認で判断せず、同じ質問を継続して計測し、推移で判断します。</p>
                <p className="article-prose">なお、Googleは、AI機能のトラフィックを、Search Consoleのウェブ検索のデータに含めて扱います。コンバージョンなどは、Googleアナリティクスで追跡できます。</p>

                <h3 className="article-h3">AEO対策ツールの種類と選び方</h3>
                <p className="article-prose">AEO対策のツールは、役割によって3種類に分けられます。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>AEO対策ツールの3つの種類</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>種類</div>
                    <div>できること</div>
                    <div>向いている場面</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">可視性モニタリング型</div>
                    <div className="article-table__cell">複数のAIで、自社・競合の言及や引用を継続的に計測する</div>
                    <div className="article-table__cell">施策の効果測定、競合との比較</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">診断レポート型</div>
                    <div className="article-table__cell">ブランド名やURLから、AI上の状況を診断してレポート化する</div>
                    <div className="article-table__cell">現状の把握、提案資料の作成</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">コンテンツ分析型</div>
                    <div className="article-table__cell">記事の構成や、回答のしやすさを分析する</div>
                    <div className="article-table__cell">記事改善の優先順位づけ</div>
                  </div>
                </div>
                <p className="article-prose">ツールを選ぶときは、次の6つの軸で比較します。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>対象のAI（ChatGPT・Gemini・AIモードなど）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>日本語の質問で計測できるか</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>競合を何社まで比較できるか</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>更新頻度と、データの保存期間</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>データの書き出し形式（CSVなど）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>料金と、個別支援の有無</span>
                  </li>
                </ul>
                <p className="article-prose">まずは診断で現状を確認し、必要に応じて、継続的に計測できるツールを導入する流れが、無理のない進め方です。</p>
                <p className="article-prose">導入前に、無料のトライアルやデモで、実際の質問を入れて試すと、使いやすさを確認できます。</p>
                <p className="article-prose">また、AIの回答は変動するため、ツールの数値は絶対値ではなく、推移と競合との差で見ます。</p>

                <h3 className="article-h3">GEO WatcherでAEO対策を始めよう</h3>
                <p className="article-prose">AEOの効果を継続的に計測したい場合は、アセントネットワークスが提供する「GEO Watcher」が活用できます。</p>
                <p className="article-prose">GEO Watcherは、自社と競合のブランドが、AI検索でどのように言及・引用されているかを毎日モニタリングするツールです。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>GEO Watcherの主な機能</p>
                <div className="article-table article-table--2col" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>項目</div>
                    <div>内容</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">対象のAI</div>
                    <div className="article-table__cell">ChatGPT、Gemini、Copilot、Google AI Overview、Google AI Mode、Perplexity（Claudeはオプション）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">計測できること</div>
                    <div className="article-table__cell">プロンプト（質問文）単位の言及・引用状況、可視性、シェアオブボイス、言及率の推移</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">プロンプト</div>
                    <div className="article-table__cell">自動生成と手動設定の両方に対応</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">競合比較</div>
                    <div className="article-table__cell">最大20社まで（全プラン共通）</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">計測頻度</div>
                    <div className="article-table__cell">6つのAIを365日自動計測し、毎日更新</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">データ蓄積</div>
                    <div className="article-table__cell">登録日から最大365日分。施策前後の効果測定に利用可能</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">出力形式</div>
                    <div className="article-table__cell">グラフはPNG、データはCSV</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">料金</div>
                    <div className="article-table__cell">月額29,800円から（3プラン）</div>
                  </div>
                </div>
                <p className="article-prose">施策の前後で言及率の推移を比べれば、AEO対策の効果を、数字で確認できます。</p>
                <p className="article-prose">活用の流れは、次の3ステップです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>プロンプトを登録する（自動生成も可能）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>現状の言及率やシェアオブボイスなどを把握する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>施策の実施後に、同じプロンプトで推移を比較する</span>
                  </li>
                </ol>
                <p className="article-prose">GEO Watcherは、次のような課題をお持ちの方に向いています。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AIでの自社の言及状況を、把握できていない</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>競合と比べた自社の位置を、知りたい</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AEO施策の効果を、数字で社内に説明したい</span>
                  </li>
                </ul>
                <p className="article-prose">プロンプト設計やコンテンツ改善の個別支援は、月額契約なしのスポットサポートで利用できます。</p>
                <p className="article-prose">詳しい機能や料金は、GEO Watcherの公式ページをご覧ください。</p>
                <WatcherCTA />
              </section>

              {/* Section 8 */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">AEOで引用されやすいコンテンツの型</h2>
                <p className="article-prose">引用されやすいコンテンツは、4つの型に整理できます。</p>
                <p className="article-prose">前章までの施策を、型として具体化します。各型の構成テンプレートを紹介します。</p>
                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>4つの型の使い分け</p>
                <div className="article-table" style={{ margin: "0 0 32px" }}>
                  <div className="article-table__head">
                    <div>型</div>
                    <div>向いている検索</div>
                    <div>冒頭の書き方</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">定義型</div>
                    <div className="article-table__cell">〜とは</div>
                    <div className="article-table__cell">「〇〇とは、△△です。」と1文で言い切る</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">手順型</div>
                    <div className="article-table__cell">〜のやり方・方法</div>
                    <div className="article-table__cell">完成形と手順の数を先に示す</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">比較型</div>
                    <div className="article-table__cell">AとBの違い・おすすめ</div>
                    <div className="article-table__cell">結論と比較の観点を先に示す</div>
                  </div>
                  <div className="article-table__row">
                    <div className="article-table__cell article-table__cell--label">FAQ型</div>
                    <div className="article-table__cell">疑問形の検索</div>
                    <div className="article-table__cell">質問の直後に、結論から答える</div>
                  </div>
                </div>

                <h3 className="article-h3">定義型コンテンツ（〜とは）の書き方</h3>
                <p className="article-prose">定義型は、用語の意味に答える型です。「〜とは」という検索に向いています。構成は、次の4段階です。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>1文で、定義を言い切る</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>略称・読み方・対象範囲を補足する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>具体例を示す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>関連用語との違いを説明する</span>
                  </li>
                </ol>
                <p className="article-prose">たとえば「AEOとは、AIが作る回答に自社の情報が選ばれるよう、コンテンツを整える施策です。」のように、冒頭で言い切ります。</p>
                <p className="article-prose">定義文は、主語と述語を省略せず、1文で完結させます。AIが、そのまま回答に使いやすくなるためです。</p>
                <p className="article-prose">完成例を示します。「GEOとは、生成AIの回答に自社の情報が引用・言及されるよう、コンテンツを最適化する取り組みです。略称はGEOで、Generative Engine Optimizationの頭文字です。」</p>

                <h3 className="article-h3">手順型コンテンツ（やり方）の書き方</h3>
                <p className="article-prose">手順型は、やり方を順番に答える型です。「〜のやり方」という検索に向いています。構成は、次の4段階です。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>完成形や所要時間を、先に示す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>手順を、番号付きで並べる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>各手順に、1〜2文で要点と注意点を書く</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>つまずきやすい点を補足する</span>
                  </li>
                </ol>
                <p className="article-prose">手順は、1ステップに1つの行動だけを書きます。</p>
                <p className="article-prose">見出しは、「ステップ3：冒頭で結論を簡潔に答える」のように、行動を動詞で表します。</p>
                <p className="article-prose">たとえば「AEO対策の手順」であれば、冒頭に「9つの施策を、上から順に実施します」と示します。読者が、全体像と作業量を把握できます。</p>

                <h3 className="article-h3">比較型コンテンツ（違い）の書き方</h3>
                <p className="article-prose">比較型は、複数の選択肢の違いに答える型です。「AとBの違い」という検索に向いています。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>比較表を、最初に提示する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>比較する観点を、明記する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>最後に、「どれを選ぶべきか」の結論を書く</span>
                  </li>
                </ul>
                <p className="article-prose">公平性が重要です。自社に有利な観点だけを選ぶと、読者の信頼を失います。比較の条件や調査日も、明記します。</p>
                <p className="article-prose">比較表の後には、「どちらを選ぶべきか」を、条件つきで書きます。「まずSEOを整えたい場合は〇〇、AIでの引用を優先する場合は〇〇」のように、読者の状況別に結論を示します。</p>
                <p className="article-prose">本記事の「SEO・AEO・GEO・LLMO・AIOの比較表」も、この型の例です。</p>

                <h3 className="article-h3">FAQ型コンテンツの書き方</h3>
                <p className="article-prose">FAQ型は、質問と回答を1組ずつ並べる型です。書き方のポイントは、次の4つです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>質問は、読者が実際に使う言い回しにする</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>回答の1文目で、結論を述べる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>補足は、2〜3文以内に収める</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">4.</span>
                    <span>詳しい解説が必要な場合は、関連ページへ内部リンクを張る</span>
                  </li>
                </ol>
                <p className="article-prose">回答が長くなる場合は、独立した記事に分けて、FAQからリンクします。</p>
                <p className="article-prose">本記事のFAQも、この型で書いています。</p>
                <p className="article-prose">質問は、検索キーワードやAIへの質問から拾うと、実際の言い回しに近づきます。回答の最後に、詳しく書いたページへのリンクを添えると、サイト内の回遊も促せます。</p>
              </section>

              {/* Section 9 */}
              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">AEO対策の注意点とリスク</h2>
                <p className="article-prose">AEO対策には、4つの注意点があります。リスクも知ったうえで、進めましょう。</p>

                <h3 className="article-h3">AI回答の誤りに対するリスク管理</h3>
                <p className="article-prose">AIの回答は、常に正確とは限りません。Google自身も、AIモードは初期段階の製品であり、完璧ではないと明記しています。</p>
                <Source name="Google「Google 検索における「AI モード」を日本語で提供開始」" url="https://blog.google/intl/ja-jp/products/explore-get-answers/ai-mode-search/" />
                <p className="article-prose">自社の情報が、古い内容や誤った内容で紹介される可能性があります。対策は、次のとおりです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>公式サイトに、最新で正しい情報をまとめたページを用意する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>更新日を明記し、古い記事は改訂または整理する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>定期的にAIへ自社について質問し、回答を確認する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>誤りを見つけたら記録し、正しい情報を発信し直す</span>
                  </li>
                </ul>
                <p className="article-prose">誤りを直接修正できる手段は限られます。正しい情報を増やす方針が基本です。</p>
                <p className="article-prose">たとえば、料金や仕様が古いまま引用されると、問い合わせ対応の負担が増える場合があります。重要な情報ほど、更新日とあわせて、最新のページへ導く設計にします。</p>

                <h3 className="article-h3">短期的な成果が見えにくい点</h3>
                <p className="article-prose">AEOは、成果が出るまでに時間がかかり、効果も見えにくい施策です。</p>
                <p className="article-prose">AIの回答は日々変わり、順位のように固定された数字がないためです。</p>
                <p className="article-prose">短期で判断せず、たとえば3〜6か月といった期間で、言及率の推移を見ましょう。</p>
                <p className="article-prose">同じ質問セットを、同じ条件で継続して計測すると、変動と傾向を区別しやすくなります。</p>
                <p className="article-prose">報告の型を決めておくと、担当者が変わっても運用が止まりません。次の3点を、毎月同じ形式で記録します。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>計測した質問の数と、言及された質問の数</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>新しく引用されたページと、引用されなくなったページ</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>その月に実施した施策と、次の月に試す施策</span>
                  </li>
                </ul>
                <p className="article-prose">数字が小さい時期も、記録を残すことが大切です。数か月後に振り返ると、どの施策が効いたかを判断する材料になります。</p>
                <p className="article-prose">あわせて、施策の効果が出ない場合の見直し観点も用意します。質問セットが実態とずれていないか、対象ページが引用されやすい型になっているか、第三者サイトでの言及が足りているか。この3点を順に確認すると、原因を切り分けやすくなります。</p>
                <p className="article-prose">途中経過を共有するときは、引用数だけでなく、実施した施策の一覧と、問い合わせや指名検索の動きもあわせて報告します。社内の理解が得られやすくなります。</p>

                <h3 className="article-h3">SEOを軽視してはいけない理由</h3>
                <p className="article-prose">具体的には、次の3つの理由から、SEOの土台は引き続き必要です。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AIの回答は、検索エンジンの上位ページを参照することが多いため</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>従来型の検索結果からの流入は、いまも多くのサイトで大きな割合を占めるため</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>クロールやインデックスといった技術基盤は、AEOの前提にもなるため</span>
                  </li>
                </ul>
                <p className="article-prose">たとえば、検索結果に表示されないページは、AIにも見つけてもらいにくくなります。SEOで整えたタイトル、見出し、内部リンク、表示速度は、そのままAEOの土台として働きます。</p>
                <p className="article-prose">AEOを新しい取り組みとして切り離すより、既存のSEOの改善項目に「回答を先頭に置く」「質問形式の見出しを増やす」といった作業を加える。この進め方であれば、少ない工数で両立できます。</p>
                <p className="article-prose">AEOに力を入れても、SEOは続ける必要があります。</p>
                <p className="article-prose">理由は、AIの回答の根拠が、検索で見つかるページだからです。Googleも、通常のSEOの基本が有効だと説明しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">また、AIによる概要は、従来の検索結果に付加価値があると判断された場合にのみ表示されます。AIの回答が出ない検索も、残っています。</p>
                <p className="article-prose">従来の検索結果からの流入も、引き続き重要です。SEOを土台とし、AEOを重ねる優先順位を崩さないことが大切です。</p>
                <p className="article-prose">実務では、Search Consoleで、表示回数とクリック数を確認します。AEOの施策の前後で推移を比較すると、両方の影響を見分けやすくなります。</p>

                <h3 className="article-h3">過度な最適化やスパム的手法のリスク</h3>
                <p className="article-prose">AIに引用されやすくするために、不自然な手法を使うのは避けましょう。次のような手法は、リスクが高いです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AI向けの隠しテキストや、キーワードの詰め込み</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>低品質な記事の大量生成</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>実体のない口コミやレビューの投稿</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>他社の情報の無断転載</span>
                  </li>
                </ul>
                <p className="article-prose">これらは、検索エンジンのスパムに関するポリシーに抵触する可能性があります。AIが信頼性を判断する際にも、マイナスに働くと考えられます。</p>
                <p className="article-prose">AI向けの工夫は、読者にも役立つ範囲にとどめます。読者に不要な情報を、AIのためだけに載せることは避けましょう。</p>
                <p className="article-prose">読者の役に立つ、正確で独自性のあるコンテンツを作ることが、結局は近道です。</p>
              </section>

              {/* Section 10 */}
              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">AEOに関するよくある質問</h2>

                <h3 className="article-h3">AEOとSEOはどちらを優先すべき？</h3>
                <p className="article-prose">まずSEOを優先し、並行してAEOを重ねるのがおすすめです。</p>
                <p className="article-prose">Googleは、AIによる概要とAIモードに表示されるために、通常のSEOの基本が有効だと説明しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">クロール・インデックス・表示速度を、先に確認します。そのうえで、質問形式の見出しや結論ファーストの改善を、既存記事のリライトから始めましょう。</p>
                <p className="article-prose">両方に共通する施策から始めれば、二重の作業を避けられます。</p>

                <h3 className="article-h3">AEOの効果が出るまでの期間は？</h3>
                <p className="article-prose">期間は、一概には言えません。AIの回答は変動し、公式に示された目安もないためです。</p>
                <p className="article-prose">判断するには、施策の前に、言及率や引用数のベースラインを計測しておきます。</p>
                <p className="article-prose">そのうえで、同じ質問セットを継続して計測し、数か月単位で推移を確認しましょう。</p>
                <p className="article-prose">ベースラインがあれば、変化があったときに、施策の影響を判断しやすくなります。</p>

                <h3 className="article-h3">AEO対策は自社でできる？支援会社は必要？</h3>
                <p className="article-prose">自社でも対応できます。ステップ1〜4の、質問の洗い出し、質問形式の見出し、結論ファースト、表・リストの整理は、社内で着手できます。</p>
                <p className="article-prose">ただし、より専門的な支援が必要な場合は、GEO・LLMO対策会社の支援があったほうが進めやすくなります。次のようなケースです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>計測の設計（質問セットの作成、競合との比較）が必要</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>大規模サイトの構造改修や、技術的な実装が必要</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>外部での言及を増やす、広報・メディア施策が必要</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>社内に知見がなく、優先順位をつけられない</span>
                  </li>
                </ul>
                <p className="article-prose">アセントネットワークスは、GEO Watcherを提供しています。スポットサポートで、プロンプト設計やコンテンツ改善の個別支援も受けられます。</p>
                <WatcherCTA />

                <h3 className="article-h3">個人ブログや小規模サイトでも対策は必要？</h3>
                <p className="article-prose">必要ですが、優先順位を絞れば十分に対応できます。</p>
                <p className="article-prose">記事数が少なくても、専門領域に絞り、質問に明確に答える記事は、引用される可能性があります。</p>
                <p className="article-prose">まずは、得意分野の質問を10〜20個に絞り、冒頭の結論と著者情報の明記から始めましょう。</p>
                <p className="article-prose">大規模な計測ツールは、必須ではありません。AIに自社の分野の質問を投げ、引用されているかを手動で確認するだけでも、状況をつかめます。</p>
                <p className="article-prose">小規模なサイトは、1人の専門家の知見や、特定の分野への特化が強みになります。第三者のサイトで紹介される機会も、積極的に作りましょう。</p>

                <h3 className="article-h3">AEO対策に構造化データは必須？</h3>
                <p className="article-prose">必須ではありません。Googleは、AIによる概要とAIモードに表示されるために、特別な構造化データは不要と説明しています。</p>
                <Source name="Google検索セントラル「AI features and your website」" url="https://developers.google.com/search/docs/appearance/ai-features" />
                <p className="article-prose">ただし、構造化データを整備する場合は、ページの表示テキストと一致させます。また、FAQのリッチリザルトは、2023年8月以降、表示が限定されています。</p>
                <Source name="Google検索セントラル ブログ「Changes to HowTo and FAQ rich results」" url="https://developers.google.com/search/blog/2023/08/howto-faq-changes" />
                <p className="article-prose">構造化データを入れる場合は、Googleのリッチリザルトテストなどで、記述の誤りがないかを確認します。</p>
                <p className="article-prose">構造化データよりも、本文の質と、結論の明確さを優先しましょう。</p>
              </section>

              {/* Section 11 */}
              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ｜AEOを理解してSEOと両立しよう</h2>
                <p className="article-prose">本記事では、AEO（回答エンジン最適化）の意味、SEOとの違い、具体的な対策を解説しました。要点は、次の5つです。</p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>AEOは、AIが作る回答に自社の情報が選ばれるための施策</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>SEOの代わりではなく、SEOの土台の上に重ねて進める</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>GEO・LLMO・AIOは重なりが大きく、共通の土台から始める</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>対策は、想定質問・質問形式の見出し・結論ファースト・表とリスト・E-E-A-T・外部での言及・クローラーの許可が中心</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>効果は、引用・言及・流入の推移で測る</span>
                  </li>
                </ul>
                <p className="article-prose">最初の3か月は、次の進め方がおすすめです。</p>
                <ol className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">1.</span>
                    <span>1か月目：想定質問を20個洗い出し、優先順位をつける</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">2.</span>
                    <span>2か月目：検索需要の大きい上位5記事を、結論ファーストの構成に書き直す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">3.</span>
                    <span>3か月目：引用・言及の状況と流入を計測し、施策の前後を比較する</span>
                  </li>
                </ol>
                <p className="article-prose">AEOは、一度対応すれば終わる施策ではありません。AIの仕組みも、表示のされ方も、変化し続けています。小さく始めて、計測し、改善を重ねることが、成果への近道です。</p>
                <p className="article-prose">まずは、自社で最も検索されている質問を3つ選び、見出し直下の結論を書き直すところから始めましょう。</p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
