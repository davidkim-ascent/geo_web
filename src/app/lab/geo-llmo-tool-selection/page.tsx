import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { buildPageMetadata, buildArticleJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import scene1VisibilityImage from "./scene1-visibility.png";
import scene2SovImage from "./scene2-sov.png";
import scene3CitationImage from "./scene3-citation.png";

const PAGE_TITLE = "GEO・LLMO対策ツールの選び方|活用シーン別の例を解説";
const PAGE_DESCRIPTION =
  "GEO・LLMO対策ツールの選び方を5つのチェックポイントで解説。Ascent GEOのGEO WatcherとGEO診断レポートの機能を活用シーンを交えて紹介。";
const PAGE_PATH = "/lab/geo-llmo-tool-selection";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  keywords: ["GEO対策 ツール", "LLMO対策 ツール", "GEO ツール 選び方", "AI検索 モニタリング", "GEO Watcher", "GEO診断レポート", "GEO対策", "LLMO対策"],
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

const LINK_CLASS = "text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4";

const TOOL_PURPOSES = [
  ["自社ブランドの露出を継続的に改善する", "事業会社のマーケティング・ブランド・広報担当者", "毎日の計測、競合比較、施策前後の変化確認", "GEO Watcher"],
  ["見込み顧客への提案に使う", "SEO・Web制作・Webマーケティング会社の法人営業担当者", "短時間での診断、提案資料への転用", "GEO診断レポート"],
];

const SCENE_SUMMARY = [
  ["① AI上の全体像を知りたい", "AI可視性、自動プロンプト生成", "AIごとの露出の差を把握"],
  ["② 競合との差を知りたい", "シェア・オブ・ボイス（最大20社）", "負けているテーマを特定"],
  ["③ 参照元を知りたい", "引用URL分析", "改善すべきページ・外部メディアを特定"],
  ["④ 効果を確認・報告したい", "毎日計測、365日保存、回答原文、CSV", "施策前後の変化を数字で報告"],
  ["⑤ 専門家に相談したい", "スポットサポート", "苦手な部分だけ1回単位で依頼"],
  ["⑥ 顧客に提案したい", "GEO診断レポート", "相手企業ごとのデータで具体的に提案"],
];

const STRENGTHS = [
  ["対応AIモデル・計測頻度", "主要7モデル（Claudeはオプション）を毎日計測", "AIごとの差と短期的な変化を見逃さない"],
  ["検索ビッグデータ", "Googleの検索データ15億件以上", "実際の検索行動に基づいた分析・支援"],
  ["特許分析", "Google・Microsoftの特許に基づく設計フレームワーク", "推測ではなく根拠のある改善提案"],
  ["実績と料金", "SEO・Webマーケティング20年以上、シンプルな料金体系", "安心して導入・社内説明ができる"],
];

const WATCHER_PLANS = [
  ["ライト", "29,800円", "20個", "20社", "4モデル", "1"],
  ["スタンダード", "39,800円", "50個", "20社", "6モデル", "1"],
  ["アドバンス", "79,800円", "100個", "20社", "6モデル", "2"],
];

const SPOT_SUPPORT = [
  ["プロンプト設計サポート", "30,000円〜50,000円 (51プロンプト以上〜20プロンプト)", "5営業日以内"],
  ["コンテンツ改善診断", "80,000円〜（1ページ8,000円）", "10営業日以内"],
];

const SHINDAN_PLANS = [
  ["お試し", "19,800円", "月10件", "10個"],
  ["STANDARD", "45,000円", "月50件", "20個"],
  ["ENTERPRISE", "80,000円", "月100件", "30個"],
];

const CHECKPOINTS = [
  ["① 対応AIモデルの数と種類", "ユーザーが使うAIはさまざまで、AIごとに回答内容も異なるため", "標準6モデル＋Claude（オプション）"],
  ["② 計測頻度とデータ保存期間", "回答は日々変わり、施策の効果は時系列でしか判断できないため", "毎日計測・365日分を保存"],
  ["③ 競合比較の範囲", "自社の数値だけでは、良いのか悪いのか判断できないため", "最大20社、質問別・AI別に比較"],
  ["④ 改善につながるデータがあるか", "言及率だけでは、次に何をすべきか分からないため", "引用URL、AI回答の原文、コンテンツギャップ（診断）"],
  ["⑤ 料金の明確さとサポート体制", "追加費用や運用の負担が、導入後の障壁になりやすいため", "料金を公開、スポットサポートは月額契約なし"],
];

const SUITABLE_COMPANIES = [
  "ChatGPTやGoogle AI Overviewsなど複数のAIで、自社と競合の状況を継続的に追いたい企業",
  "計測は社内で行い、プロンプト設計や改善方針など必要な部分だけ専門家に相談したい企業",
  "SEO・Web制作会社として、GEO・LLMO対策を提案メニューに加えたい企業",
];

const CTA_LINKS = [
  { label: "GEO Watcherを見る", href: "/watcher" },
  { label: "GEO診断レポートを見る", href: "/shindan" },
  { label: "無料相談を予約する", href: "/contact" },
];

const FAQ_ITEMS = [
  {
    q: "Q1．Ascent GEOでは具体的に何ができますか。",
    a: "GEO Watcherでは、ChatGPTやGoogle AI Overviewsなど主要AIの回答における自社・競合の言及状況、シェア・オブ・ボイス、引用URLを毎日計測できます。GEO診断レポートでは、ブランド名とURLから数分でAI検索上の状況を診断し、提案資料として使えるレポートを作成できます。",
  },
  {
    q: "Q2．GEO WatcherとGEO診断レポートはどう使い分ければよいですか。",
    a: "自社ブランドのAI検索上の露出を継続的に改善したい事業会社はGEO Watcher、見込み顧客への提案材料が欲しい広告代理店や、SEO、Web制作、Webマーケティング会社はGEO診断レポートが適しています。",
  },
  {
    q: "Q3．AIにどんな質問をすればよいか分かりません。",
    a: "GEO Watcherでは、ブランド名とURLを登録すると計測用の質問（プロンプト）が自動生成されるため、そのまま計測を始められます。自社向けに質問を設計し直したい場合は、スポットサポートの「プロンプト設計サポート」を1回単位でご利用いただけます。",
  },
  {
    q: "Q4．どのAIモデルに対応していますか。",
    a: "ChatGPT、Gemini、Google AI Overviews、AI Mode、Perplexity、Microsoft Copilotに対応しており、Claudeはオプションで追加できます。 対応モデル数はプランにより異なり、ライトプランは4モデル(ChatGPT、Gemini、Google AI Overviews、AI Mode、Perplexity)、スタンダード・アドバンスプランは6モデル(ChatGPT、Gemini、Google AI Overviews、AI Mode、Perplexity、Microsoft Copilot)です。",
  },
  {
    q: "Q5．競合は何社まで比較できますか。",
    a: "GEO Watcherでは、どのプランでも競合を最大20社まで登録し、質問別・AI別に比較できます。",
  },
  {
    q: "Q6．GEO診断レポートに最低契約期間はありますか。",
    a: "最低契約期間や解約金はありません。お支払い完了後、アカウントが発行されればすぐに利用を開始できます。",
  },
];

const REFERENCES = [
  { text: "株式会社サイバーエージェント「生成AIのユーザー利用実態調査 第三弾」（2026年3月5日）", url: "https://www.cyberagent.co.jp/news/detail/id=33041" },
  { text: "Ascent GEO「GEO Watcher」", url: "https://geo.ascentnet.co.jp/watcher" },
  { text: "Ascent GEO「GEO診断レポート」", url: "https://geo.ascentnet.co.jp/shindan" },
];

const ARTICLE_JSON_LD = buildArticleJsonLd({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  datePublished: "2026-10-07",
});

const FAQ_JSON_LD = buildFaqJsonLd(FAQ_ITEMS);

const BREADCRUMB_JSON_LD = buildBreadcrumbJsonLd([
  { name: "HOME", path: "/" },
  { name: "GEO LAB", path: "/lab" },
  { name: "GEO・LLMO対策ツールの選び方", path: PAGE_PATH },
]);

/** 脚注番号（参考文献へのリンク） */
function Ref({ n }: { n: number[] }) {
  return (
    <sup className="ml-0.5 text-[11px] font-medium text-[#1452FF]">
      {n.map((num, i) => (
        <span key={num}>
          {i > 0 && ","}
          <a href={`#ref-${num}`} className="hover:underline">{num}</a>
        </span>
      ))}
    </sup>
  );
}

function TableCaption({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 mb-8 text-[12px] text-[#9A9AA0]">{children}</p>;
}

function SceneFigure({ src, alt }: { src: typeof scene1VisibilityImage; alt: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-[#E6E4DD]">
      <Image src={src} alt={alt} className="w-full h-auto" />
    </figure>
  );
}

function SceneMeta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="article-prose">
      <strong className="whitespace-nowrap">{label}：</strong>
      {children}
    </p>
  );
}

function Summary({ children }: { children: React.ReactNode }) {
  return (
    <div className="article-callout">
      <p className="article-callout__text">
        <strong>つまり：</strong>
        {children}
      </p>
    </div>
  );
}

export default function GeoLlmoToolSelectionPage() {
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
                <span className="text-[#FDFDFB]">GEO・LLMO対策ツールの選び方</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO / LLMO TOOLS
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">GEO・LLMO対策ツールの選び方</span>
                <span className="block">活用シーン別の例を解説</span>
              </h1>

              <p className="article-hero__lede">{PAGE_DESCRIPTION}</p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.10.07" },
                  { l: "LENGTH", v: "約7,000文字" },
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
                <p className="mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>この記事の要約</p>
                <p className="article-callout__text">
                  Ascent GEOは、AI検索上の自社・競合の変化を毎日追うモニタリングツール「GEO Watcher」と、見込み顧客への提案材料を数分で作れる「GEO診断レポート」の2つのサービスを提供しています。
                </p>
                <p className="article-callout__text mt-3">
                  本記事では「具体的に何ができるの？」「他のツールとの違いは？」という疑問に答えるため、6つの活用シーン別にできることを整理し、Ascent GEOの強み、料金、ツールを選ぶときのチェックポイントまで解説します。
                </p>
              </div>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>GEO・LLMO対策ツールで「できること」は大きく2種類</h2>
                <p className="article-prose">
                  生成AI検索の利用率は、2026年2月時点で37.0%に達しています。株式会社サイバーエージェントが全国10代〜60代の男女9,278名を対象に実施した調査では、2025年5月の21.3%から9カ月で15.7ポイント上昇しました。<Ref n={[1]} />
                </p>
                <p className="article-prose">
                  AIの回答の中で自社がどう紹介されているかを把握する必要性が高まり、GEO・LLMO対策ツールも増えています。一方で、「ツールで具体的に何ができて、自社のどんな課題が解決するのか分かりにくい」という声も少なくありません。
                </p>
                <p className="article-prose">
                  まず押さえておきたいのは、GEO・LLMO対策ツールの使い道が大きく2つに分かれることです。
                </p>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1.1fr 1.2fr 1.1fr 0.8fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>目的</div>
                    <div>主な利用者</div>
                    <div>必要な機能</div>
                    <div>Ascent GEOのサービス</div>
                  </div>
                  {TOOL_PURPOSES.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                      <div className="article-table__cell">{row[3]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表1．GEO・LLMO対策ツールの2つの目的とAscent GEOのサービス</TableCaption>

                <p className="article-prose">
                  同じ「AI検索での露出を調べる」ツールでも、自社の改善に使うのか、顧客への提案に使うのかで、重視すべき機能はまったく異なります。Ascent GEOはこの2つの目的それぞれに合わせたサービスを用意しています。
                </p>

                <Summary>
                  GEO・LLMO対策ツールは「自社の改善を続けるため」か「顧客への提案に使うため」かで必要な機能が変わります。Ascent GEOは前者にGEO Watcher、後者にGEO診断レポートを提供しています。
                </Summary>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">活用シーン別｜Ascent GEOでできること</h2>
                <p className="article-prose">
                  ここでは、商談でよく聞かれる「で、具体的に何ができるの？」に答えるため、機能を一覧で並べるのではなく、よくある課題ごとに整理します。シーン1〜5はGEO Watcher、シーン6はGEO診断レポートの活用例です。
                </p>

                <h3 className="article-h3">シーン1：主要AIで自社がどう答えられているか、まず全体像を知りたい</h3>
                <SceneMeta label="使う機能">AI可視性／自動プロンプト生成（GEO Watcher）</SceneMeta>
                <p className="article-prose">
                  GEO Watcherでは、ブランド名とURLを登録するだけで、計測に使う質問（プロンプト）と競合企業が自動で生成されます。「AIに何を聞けばよいか分からない」という状態からでも、すぐに計測を始められます。
                </p>
                <p className="article-prose">
                  計測結果は「AI可視性」として、AIの回答の中で自社ブランドがどれだけ登場しているかを、AIモデルごとに一覧で確認できます。
                </p>
                <SceneMeta label="できるようになること">「ChatGPTでは紹介されるのに、Google AI Overviewsではほとんど出てこない」といった、AIごとの差が一目で分かります。</SceneMeta>
                <SceneFigure src={scene1VisibilityImage} alt="GEO WatcherのAI可視性画面" />

                <h3 className="article-h3">シーン2：競合と比べて、自社がどの位置にいるのか知りたい</h3>
                <SceneMeta label="使う機能">シェア・オブ・ボイス（GEO Watcher）</SceneMeta>
                <p className="article-prose">
                  競合は最大20社まで登録でき、AIの回答の中で各社がどれだけ言及されているかを「シェア・オブ・ボイス（SOV）」として数値化します。質問ごと・AIごとに比較できるため、「業界全体ではシェアが高いが、価格比較の質問では競合に負けている」のように、差がついているテーマまで特定できます。
                </p>
                <SceneMeta label="できるようになること">次に優先して取り組むべき改善テーマを、感覚ではなくデータで決められます。</SceneMeta>
                <SceneFigure src={scene2SovImage} alt="GEO Watcherのシェア・オブ・ボイス画面" />

                <h3 className="article-h3">シーン3：AIがどのサイトを参照して回答しているのか知りたい</h3>
                <SceneMeta label="使う機能">引用URL分析（GEO Watcher）</SceneMeta>
                <p className="article-prose">
                  AIが回答の根拠として参照したURLを記録し、ドメインの種類ごとに分類します。自社サイトのどのページが引用されているか、競合サイトや比較メディア、口コミサイトなど、どのような外部サイトが参照されているかが分かります。
                </p>
                <SceneMeta label="できるようになること">手を入れるべき自社ページや、掲載・露出を狙うべき外部メディアが具体的に見えてきます。</SceneMeta>
                <SceneFigure src={scene3CitationImage} alt="GEO Watcherの引用URL画面" />

                <h3 className="article-h3">シーン4：施策の効果を確かめ、社内に報告したい</h3>
                <SceneMeta label="使う機能">毎日の自動計測／時系列データ／AI回答の原文／CSV出力（GEO Watcher）</SceneMeta>
                <p className="article-prose">
                  計測は毎日自動で行われ、過去365日分のデータが保存されます。コンテンツを改善した後に、言及率や引用URLがどう変化したかを時系列で追えます。AIの回答原文も確認でき、データはCSVで書き出せるため、社内報告資料の根拠としてそのまま使えます。
                </p>
                <SceneMeta label="できるようになること">施策前後の変化を短いサイクルで確認でき、「対策は効いているのか」という社内の問いに数字で答えられます。</SceneMeta>

                <h3 className="article-h3">シーン5：質問の設計や改善の方向性は、専門家に相談したい</h3>
                <SceneMeta label="使う機能">スポットサポート（GEO Watcherのオプション）</SceneMeta>
                <p className="article-prose">
                  自動生成された質問を自社向けに調整したい、引用されるためにページをどう直せばよいか知りたい、といった場合は、月額契約なしで1回単位で依頼できるスポットサポートを利用できます。メニューは「プロンプト設計サポート」と「コンテンツ改善診断」の2種類です。
                </p>
                <SceneMeta label="できるようになること">計測は自社で行い、苦手な部分だけを専門家に任せるという使い分けができます。</SceneMeta>

                <h3 className="article-h3">シーン6：見込み顧客に、AI検索対策を具体的に提案したい（SEO・Web会社向け）</h3>
                <SceneMeta label="使う機能">GEO診断レポート</SceneMeta>
                <p className="article-prose">
                  GEO診断レポートは、診断したい企業のブランド名とURLを入力するだけで、数分でAI検索上の状況をレポートにまとめます。AIエンジン別の言及率、競合とのシェア・オブ・ボイス比較、質問ごとの強み・弱みに加え、「競合は表示されているのに、診断対象のブランドは表示されていない質問」をコンテンツギャップとして抽出します。
                </p>
                <p className="article-prose">
                  レポートには自社のロゴ、担当者名やコメント、CTAの文言を設定できるため、自社の提案資料として顧客にそのまま渡せます。
                </p>
                <SceneMeta label="できるようになること">「AI検索対策が必要です」という一般論ではなく、相手企業ごとのデータをもとに、初回商談から具体的な提案ができます。</SceneMeta>

                <div className="article-table" style={{ marginBottom: 0 }}>
                  <div className="article-table__head">
                    <div>活用シーン</div>
                    <div>使う機能</div>
                    <div>できるようになること</div>
                  </div>
                  {SCENE_SUMMARY.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表2．活用シーン別　Ascent GEOでできること</TableCaption>

                <Summary>
                  Ascent GEOでは「現状把握」「競合比較」「参照元の特定」「効果測定」「専門家への相談」「顧客への提案」の6つのシーンに対応できます。計測から改善テーマの特定、効果確認までを1つのツールで回せます。
                </Summary>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>他のツールとの違いは？Ascent GEOの4つの強み</h2>
                <p className="article-prose">
                  「他のGEO・LLMO対策ツールと何が違うの？」という質問に対しては、次の4点が答えになります。
                </p>

                <h3 className="article-h3">強み1：最大7つの主要AIモデルを毎日計測</h3>
                <p className="article-prose">
                  ChatGPT、Gemini、Google AI Overviews、AI Mode、Perplexity、Microsoft Copilotの6モデルに標準で対応し、Claudeもオプションで追加できます（対応モデル数はプランにより異なります）。AIの回答は日々変化するため、毎日計測することで、週次・月次の計測では見逃しやすい短期的な変化も捉えられます。
                </p>

                <h3 className="article-h3">強み2：15億件の検索ビッグデータに基づく分析</h3>
                <p className="article-prose">
                  サービスを提供する株式会社Ascent Networksは、検索経路や検索意図、カテゴリーエントリーポイント（CEP）、AI Overviewsが表示されるクエリなど、Googleの検索データを15億件以上保有しています。実際の消費者の検索行動データをもとに分析するため、「顧客が本当に知りたいこと」を特定した上でのマーケティング支援が可能です。
                </p>

                <h3 className="article-h3">強み3：Google・Microsoftの特許分析に基づく設計フレームワーク</h3>
                <p className="article-prose">
                  Google・Microsoftの特許を分析し、AIが情報を選んで引用する仕組みを根拠にしたGEO・LLMO設計フレームワークを持っています。推測ではなく根拠に基づいて、改善の方向性を示せることが特長です。
                </p>

                <h3 className="article-h3">強み4：20年以上のSEO実績と、シンプルな料金体系</h3>
                <p className="article-prose">
                  国内外の大手・中堅企業のSEO、サイト流入分析、サイトパフォーマンス分析を20年以上手がけてきた知見が、ツールとサポートに生かされています。料金プランも基本3プランから選択可能です。スポットサポートはオプションのため、困ったときだけ依頼できます。
                </p>

                <div className="article-table" style={{ marginBottom: 0 }}>
                  <div className="article-table__head">
                    <div>強み</div>
                    <div>内容</div>
                    <div>お客さまにとってのメリット</div>
                  </div>
                  {STRENGTHS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表3．Ascent GEOの4つの強み</TableCaption>

                <Summary>
                  Ascent GEOの強みは「7つの主要AIモデルの毎日計測」「15億件の検索データ」「特許分析に基づくフレームワーク」「20年以上のSEO実績と明確な料金」の4点です。計測データの信頼性と、改善につなげる根拠の両方を備えています。
                </Summary>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">Ascent GEOの料金プラン</h2>

                <h3 className="article-h3">GEO Watcher</h3>
                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1.1fr 1fr 0.9fr 0.9fr 0.9fr 0.9fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>プラン</div>
                    <div>月額</div>
                    <div>プロンプト数</div>
                    <div>競合登録数</div>
                    <div>AIモデル数</div>
                    <div>プロジェクト数</div>
                  </div>
                  {WATCHER_PLANS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                      <div className="article-table__cell">{row[3]}</div>
                      <div className="article-table__cell">{row[4]}</div>
                      <div className="article-table__cell">{row[5]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表4．GEO Watcherの料金プラン（年払いの場合は2カ月分割引。Claudeはオプション）</TableCaption>

                <div className="article-table" style={{ marginBottom: 0 }}>
                  <div className="article-table__head">
                    <div>スポットサポート</div>
                    <div>料金</div>
                    <div>納期の目安</div>
                  </div>
                  {SPOT_SUPPORT.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表5．スポットサポート（月額契約なし・1回単位で依頼可能）</TableCaption>

                <h3 className="article-h3">GEO診断レポート</h3>
                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1fr 1fr 1fr 1fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>プラン</div>
                    <div>月額</div>
                    <div>レポート作成数</div>
                    <div>プロンプト数</div>
                  </div>
                  {SHINDAN_PLANS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                      <div className="article-table__cell">{row[3]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>
                  表6．GEO診断レポートの料金プラン（最低契約期間・解約金なし）
                  <br />
                  ※料金は2026年10月時点。
                </TableCaption>

                <Summary>
                  GEO Watcherは月額29,800円から、GEO診断レポートは月額19,800円から利用できます。プロンプト設計やコンテンツ改善は、月額契約なしのスポットサポートで必要なときだけ依頼できます。
                </Summary>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>GEO・LLMO対策ツールを選ぶ5つのチェックポイント</h2>
                <p className="article-prose">
                  Ascent GEOに限らず、GEO・LLMO対策ツールを比較するときは、次の5点を確認すると失敗しにくくなります。
                </p>

                <div className="article-table" style={{ marginBottom: 0 }}>
                  <div className="article-table__head">
                    <div>チェックポイント</div>
                    <div>確認すべき理由</div>
                    <div>Ascent GEOの場合</div>
                  </div>
                  {CHECKPOINTS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表7．GEO・LLMO対策ツールを選ぶ5つのチェックポイント</TableCaption>

                <h3 className="article-h3">Ascent GEOが向いている企業</h3>
                <ul className="article-list">
                  {SUITABLE_COMPANIES.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="article-h3">別の選択肢も検討したほうがよいケース</h3>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>
                      <strong>戦略立案からコンテンツ制作・実行まで一括で外部に任せたい場合：</strong>
                      GEO・LLMO対策会社への依頼も選択肢になります。各社の特徴は「
                      <Link href="/lab/geo-llmo-company" className={LINK_CLASS}>GEO/LLMO対策におすすめの会社7選を徹底比較</Link>
                      」で整理しています。
                    </span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>
                      <strong>まずは費用をかけずに現状だけ確認したい場合：</strong>
                      ChatGPTなどに直接質問する手動のセルフチェックから始めるのがおすすめです。手順は「
                      <Link href="/lab/ai-citation-self-check" className={LINK_CLASS}>自社サイトはAIにどれだけ引用されている？セルフチェック方法</Link>
                      」で解説しています。
                    </span>
                  </li>
                </ul>

                <Summary>
                  ツールは「対応AIモデル」「計測頻度」「競合比較の範囲」「改善につながるデータ」「料金とサポート」の5点で比較します。継続的に計測しながら社内で改善を回したい企業や、GEOを提案に加えたいSEO・Web会社にはAscent GEOが適しています。
                </Summary>
              </section>

              {/* Section 6: まとめ */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ：Ascent GEOでできることと選び方</h2>
                <p className="article-prose">
                  Ascent GEOは、AI検索上の自社・競合の変化を毎日追う「GEO Watcher」と、見込み顧客への提案材料を数分で作れる「GEO診断レポート」の2つのサービスで、GEO・LLMO対策を支援しています。
                </p>
                <p className="article-prose">
                  GEO Watcherでは、主要AIでの露出の把握、競合との比較、引用元の特定、施策効果の確認までを1つのツールで行えます。GEO診断レポートでは、相手企業ごとのAI検索上の課題をデータで示し、初回商談から具体的な提案につなげられます。
                </p>
                <p className="article-prose">
                  「自社の場合、どのプランが合うのか」「まず何から計測すればよいのか」といった段階からでも、無料でご相談いただけます。自社や顧客のAI検索上の現在地を知りたい方は、お気軽にお問い合わせください。
                </p>

                <div className="my-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {CTA_LINKS.map((cta) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1452FF] px-6 py-3 font-bold text-[#FDFDFB] transition-colors hover:bg-[#0B3FD9]"
                      style={{ fontSize: "var(--fs-label)" }}
                    >
                      ▶ {cta.label}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section" style={{ marginTop: "56px" }}>
                <span className="article-kicker">07</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>「Ascent GEO」に関するよくある質問</h2>
                <div className="article-faq">
                  {FAQ_ITEMS.map((item) => (
                    <div key={item.q} className="article-faq__item">
                      <div className="article-faq__q">
                        <span className="article-faq__q-label">Q</span>
                        <h3 className="article-h4">{item.q}</h3>
                      </div>
                      <div className="article-faq__a">
                        <span className="article-faq__a-label">A</span>
                        <p className="article-faq__answer">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="article-note-panel">
                  <div className="article-note-panel__section">
                    <div className="article-note-panel__label">参考文献</div>
                    <ol className="flex flex-col gap-2">
                      {REFERENCES.map((src, i) => (
                        <li
                          key={src.url}
                          id={`ref-${i + 1}`}
                          className="article-note-panel__text article-note-panel__text--muted flex gap-2 scroll-mt-[120px]"
                          style={{ fontSize: "13px", lineHeight: 1.7 }}
                        >
                          <span className="flex-none">{i + 1}．</span>
                          <span className="min-w-0">
                            {src.text}
                            <br />
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4"
                            >
                              {src.url}
                            </a>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
