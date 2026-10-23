import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { buildPageMetadata, buildArticleJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import sovChatGptImage from "./sov-chatgpt.png";
import sovGeminiImage from "./sov-gemini.png";

const PAGE_TITLE = "AIのシェア・オブ・ボイス（SOV）とは？計算方法と低い時の確認ポイント";
const PAGE_DESCRIPTION =
  "AIのシェア・オブ・ボイス（SOV）の意味と計算式を、計算例を使って解説。比較する競合の選び方、SEOとの違い、数値が低いときの確認ポイントも紹介します。";
const PAGE_PATH = "/lab/ai-share-of-voice";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  keywords: ["シェア・オブ・ボイス AI", "AI SOV", "生成AI 言及シェア", "GEO Watcher", "GEO対策", "LLMO対策", "AI検索 競合比較"],
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

const METRIC_COMPARISON = [
  ["言及率", "自社が回答に登場した割合", "計測した回答の数"],
  ["引用率", "自社サイトのURLが回答の根拠として示された割合", "計測した回答の数"],
  ["シェア・オブ・ボイス", "自社と競合の言及のうち、自社が占める割合", "自社と競合の言及数の合計"],
];

const BRAND_EXAMPLE = [
  ["自社A", "24", "24%", "9"],
  ["競合B", "40", "40%", "12"],
  ["競合C", "16", "16%", "3"],
  ["競合D", "20", "20%", "8"],
  ["合計", "100", "100%", "―"],
];

const MODEL_EXAMPLE = [
  ["ChatGPT", "8", "25", "32%"],
  ["Gemini", "7", "25", "28%"],
  ["Perplexity", "6", "25", "24%"],
  ["Google AI Overviews", "3", "25", "12%"],
];

const COMPETITOR_TYPES = [
  ["事業上の競合", "営業の場面でよく比較される会社", "入れる"],
  ["AI上の競合", "AIが回答の中で自社と一緒に挙げる会社。事業上の競合と一致しないことも多い", "入れる"],
  ["情報源としての競合", "AIが回答の根拠として参照する比較サイトやメディア", "入れない（引用URLとして別に確認する）"],
];

const COMPETITOR_STEPS = [
  "手順1：計測したい質問（プロンプト）を、AIに何度か投げてみる",
  "手順2：回答に出てくるブランド名をすべて書き出す",
  "手順3：登場回数が多いブランドと、事業上の競合を合わせて、比較対象を決める",
  "手順4：新しいブランドが回答に出てきていないか、定期的に見直す",
];

const SEO_VS_AI_SOV = [
  ["測る対象", "検索結果での順位と推定クリック数", "AIの回答の中での言及"],
  ["計算の元になるデータ", "検索ボリューム、検索順位、順位ごとのクリック率", "回答の中でのブランドの言及数"],
  ["結果の安定性", "比較的安定している", "同じ質問でも日によって回答が変わる"],
  ["対象となる場所", "主にGoogleの検索結果", "ChatGPT、Gemini、Perplexityなど複数のAI"],
  ["1回の表示に出る企業", "上位10件前後のサイト", "回答の中で紹介された数社"],
];

const CHECK_SUMMARY = [
  ["① 数値が低いAI", "AIモデル別のシェア・オブ・ボイス", "どのAIで負けているか"],
  ["② 競合だけが登場している質問", "プロンプト別の言及状況", "優先して改善するテーマ"],
  ["③ AIが参照しているページ", "引用URL", "直すべき自社ページ、掲載を狙う外部サイト"],
  ["④ 改善前後の変化", "シェア・オブ・ボイスの推移", "取り組みの結果"],
];

const FAQ_ITEMS = [
  {
    q: "Q1．AIのシェア・オブ・ボイスとは何ですか。",
    a: "ChatGPTやGeminiなどの生成AIが回答の中で言及したブランドのうち、自社が占める割合のことです。「自社の言及数 ÷（自社＋競合の言及数の合計）× 100」で計算します。",
  },
  {
    q: "Q2．シェア・オブ・ボイスは何%を目指せばよいですか。",
    a: "業界や比較する競合の数によって変わるため、一律の目安はありません。まずは自社の数値の推移と、最も数値が高い競合との差を確認し、その差を縮めることを目標にするのがおすすめです。",
  },
  {
    q: "Q3．無料で計測することはできますか。",
    a: "ChatGPTなどに質問を投げ、回答に登場するブランドを手作業で数えれば計測できます。ただし、AIの回答は日によって変わるため、複数のAIで継続的に計測するには大きな手間がかかります。",
  },
  {
    q: "Q4．否定的な内容で言及された場合も、シェア・オブ・ボイスに含まれますか。",
    a: "シェア・オブ・ボイスは言及の量を示す指標のため、言及の内容が肯定的か否定的かは区別しません。どのように紹介されているかは、AIの回答の原文で確認しましょう。",
  },
  {
    q: "Q5．競合は何社と比較できますか。",
    a: "GEO Watcherでは、どのプランでも競合を最大20社まで登録し、AIモデル別・プロンプト別にシェア・オブ・ボイスを比較できます。",
  },
];

const ARTICLE_JSON_LD = buildArticleJsonLd({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  datePublished: "2026-10-23",
});

const FAQ_JSON_LD = buildFaqJsonLd(FAQ_ITEMS);

const BREADCRUMB_JSON_LD = buildBreadcrumbJsonLd([
  { name: "HOME", path: "/" },
  { name: "GEO LAB", path: "/lab" },
  { name: "AIのシェア・オブ・ボイスとは", path: PAGE_PATH },
]);

function TableCaption({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 mb-8 text-[12px] text-[#9A9AA0]">{children}</p>;
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

export default function AiShareOfVoicePage() {
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
                <span className="text-[#FDFDFB]">AIのシェア・オブ・ボイスとは</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO / LLMO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AIのシェア・オブ・ボイス（SOV）とは？</span>
                <span className="block">計算方法と低い時の確認ポイント</span>
              </h1>

              <p className="article-hero__lede">{PAGE_DESCRIPTION}</p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.10.23" },
                  { l: "LENGTH", v: "約5,500文字" },
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
                  AIのシェア・オブ・ボイス（SOV）とは、ChatGPTやGeminiなどの生成AIが回答の中で言及したブランドのうち、自社が占める割合のことです。「自社 ÷（自社＋競合）」で計算し、AIの回答の中で競合と比べてどれだけ存在感があるかを示します。
                </p>
                <p className="article-callout__text mt-3">
                  本記事では、定義と計算式、計算例、比較する競合の選び方、SEOのシェア・オブ・ボイスとの違い、数値が低いときの確認ポイントまでを解説します。
                </p>
              </div>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">AIのシェア・オブ・ボイスとは</h2>
                <p className="article-prose">
                  AIのシェア・オブ・ボイス（SOV）とは、ChatGPTやGeminiなどの生成AIが回答の中で言及したブランドのうち、自社が占める割合のことです。「AI SoV」「生成AI上の言及シェア」と呼ばれることもあります。
                </p>
                <p className="article-prose">
                  AI検索では、ユーザーが検索結果のリンクをクリックせずに回答だけを読んで終わることが多く、検索順位やアクセス数だけでは自社の存在感を測れません。GEO・LLMO対策でどのような指標を見るべきかの全体像は、「
                  <Link href="/lab/what-is-llmo" className={LINK_CLASS}>LLMOとは？意味・SEOとの違いから対策方法まで完全ガイド</Link>
                  」で解説しています。
                </p>

                <h3 className="article-h3">そもそもシェア・オブ・ボイス（SOV）とは</h3>
                <p className="article-prose">
                  シェア・オブ・ボイス（Share of Voice、SOV）は、市場やカテゴリー全体の露出量のうち、自社が占める割合を示すマーケティングの指標です。もともとは、テレビCMや新聞広告など、業界全体の広告出稿量に占める自社の割合を指していました。
                </p>
                <p className="article-prose">
                  現在では、SNS上での話題量や検索結果での露出など、さまざまな場面で「競合と比べて、自社の声がどれだけ届いているか」を測る指標として使われています。AIのシェア・オブ・ボイスは、この考え方をChatGPTやGeminiなどのAIの回答に当てはめたものです。
                </p>

                <h3 className="article-h3">「言及」とは、回答の中にブランド名が出てくること</h3>
                <p className="article-prose">
                  ここでいう「言及」とは、AIの回答文の中にブランド名や企業名が出てくることを指します。AIが回答の根拠として示すURL（引用URL）とは別のものです。
                </p>
                <p className="article-prose">
                  また、1つの回答の中で同じブランド名が何度も出てくることがあります。GEO Watcherでは、1つの回答の中で複数回名前が出た場合も、その回数を言及数として数えます。
                </p>

                <h3 className="article-h3">言及率・引用率との違い</h3>
                <p className="article-prose">
                  AIの回答に関する指標には、シェア・オブ・ボイスのほかに「言及率」「引用率」があります。それぞれ測っているものと分母が異なります。
                </p>

                <div className="article-table" style={{ marginBottom: 0 }}>
                  <div className="article-table__head">
                    <div>指標</div>
                    <div>何を測るか</div>
                    <div>計算の分母</div>
                  </div>
                  {METRIC_COMPARISON.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表1．言及率・引用率・シェア・オブ・ボイスの違い</TableCaption>

                <p className="article-prose">
                  言及率と引用率は「自社がどれだけ登場したか」を、シェア・オブ・ボイスは「競合と比べてどれだけ登場したか」を示します。自社の言及率が上がっていても、競合の言及がそれ以上に増えていれば、シェア・オブ・ボイスは下がります。
                </p>

                <Summary>
                  AIのシェア・オブ・ボイスは、AIの回答で言及されたブランドのうち自社が占める割合です。言及率や引用率が自社だけを見る指標なのに対し、シェア・オブ・ボイスは競合との比較で自社の位置を示します。
                </Summary>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">AIのシェア・オブ・ボイスの計算方法</h2>

                <h3 className="article-h3">基本の計算式</h3>
                <p className="article-prose">
                  計算式：AIのシェア・オブ・ボイス（%）＝ 自社の言及数 ÷（自社の言及数 ＋ 競合の言及数の合計）× 100
                </p>
                <p className="article-prose">
                  分母に入るのは、自社と、比較対象として選んだ競合の言及数だけです。比較対象に入れていないブランドが回答に登場しても、分母には含めません。そのため、どの競合と比べるかによって数値が変わります。競合の選び方は次の章で解説します。
                </p>

                <h3 className="article-h3">計算例（架空の数値）</h3>
                <p className="article-prose">
                  ここでは、架空の数値を使って計算の流れを説明します。以下の数値は、説明のために作成したもので、実際の企業や計測結果ではありません。
                </p>
                <p className="article-prose">
                  自社Aが、競合B・C・Dと比較するために20個の質問（プロンプト）を用意し、4つのAIで計測したとします。回答は合計80件です。各ブランドの言及数は次のとおりでした。
                </p>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "0.9fr 1fr 1.1fr 1.3fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>ブランド</div>
                    <div>言及数</div>
                    <div>シェア・オブ・ボイス</div>
                    <div>登場したプロンプト数</div>
                  </div>
                  {BRAND_EXAMPLE.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                      <div className="article-table__cell">{row[3]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表2．計算例：ブランド別の言及数とシェア・オブ・ボイス（架空の数値）</TableCaption>

                <p className="article-prose">
                  自社Aのシェア・オブ・ボイスは、24 ÷ 100 × 100 ＝ 24%です。
                </p>
                <p className="article-prose">
                  一方、自社Aが登場した回答が80件中20件だった場合、言及率は25%になります。言及率だけを見ると「4回に1回は紹介されている」と読めますが、シェア・オブ・ボイスで見ると、40%の競合Bに大きく差をつけられていることが分かります。
                </p>
                <p className="article-prose">
                  また、言及数と合わせて登場したプロンプト数も確認しましょう。競合Cは言及数が16ありますが、登場したプロンプトは3つだけです。特定の質問への回答で何度も名前が挙がっているだけで、幅広い質問で紹介されているわけではないことが読み取れます。
                </p>

                <h3 className="article-h3">AIモデル別・プロンプト別に分けて見る</h3>
                <p className="article-prose">
                  全体の数値だけでは、どこで負けているのかが分かりません。同じ計算例を、AIモデル別に分けると次のようになります。
                </p>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1fr 1.1fr 1.1fr 1.1fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>AIモデル</div>
                    <div>自社Aの言及数</div>
                    <div>全ブランドの言及数</div>
                    <div>自社Aのシェア・オブ・ボイス</div>
                  </div>
                  {MODEL_EXAMPLE.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                      <div className="article-table__cell">{row[3]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表3．計算例：AIモデル別のシェア・オブ・ボイス（架空の数値）</TableCaption>

                <p className="article-prose">
                  全体では24%でも、Google AI Overviewsでは12%しかないことが分かります。AIモデルごとに、参照する情報や回答の仕方が異なるためです。
                </p>
                <p className="article-prose">
                  プロンプト別に分けた場合も同じように、「どの質問で競合に負けているか」を特定できます。
                </p>

                <h3 className="article-h3">社名を含む質問と含まない質問は分けて計算する</h3>
                <p className="article-prose">
                  「Ascent GEOの評判は？」のように、質問の中に自社の社名が入っている場合、AIはほぼ確実に自社に言及します。こうした質問を含めて計算すると、シェア・オブ・ボイスは実態より高く出やすくなります。
                </p>
                <p className="article-prose">
                  一方、「GEO対策ツールのおすすめは？」のように社名を含まない質問は、AIが自社を候補として思い浮かべるかどうかが試されます。競合との比較では、社名を含まない質問だけでシェア・オブ・ボイスを計算するのがおすすめです。GEO Watcherでは、プロンプトにタグを付けて「社名あり」「社名なし」などに絞り込み、シェア・オブ・ボイスを分けて確認できます。
                </p>
                <p className="article-prose">
                  なお、AIの回答は同じ質問でも日によって変わるため、1回の計測結果だけで判断するのは避けましょう。手作業で確認する方法と注意点は、「
                  <Link href="/lab/ai-citation-self-check" className={LINK_CLASS}>自社サイトはAIにどれだけ引用されている？セルフチェック方法</Link>
                  」で解説しています。
                </p>

                <p className="article-prose">
                  20個のプロンプトを6つのAIで毎日計測すると、1日120件の回答になります。ここから競合ごとの言及数を手作業で数え続けるのは現実的ではありません。
                </p>
                <p className="article-prose">
                  GEO Watcherなら、最大20社の競合を登録するだけで、AIモデル別・プロンプト別のシェア・オブ・ボイスを毎日自動で算出します。
                </p>
                <div className="my-8">
                  <Link
                    href="/watcher"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1452FF] px-6 py-3 font-bold text-[#FDFDFB] transition-colors hover:bg-[#0B3FD9]"
                    style={{ fontSize: "var(--fs-label)" }}
                  >
                    ▶ GEO Watcherを見る
                  </Link>
                  <p className="mt-3 text-[12px] text-[#9A9AA0]">
                    ※6つのAIでの計測はスタンダードプラン以上。ライトプランは4モデル。
                  </p>
                </div>

                <Summary>
                  AIのシェア・オブ・ボイスは「自社の言及数 ÷（自社＋競合の言及数の合計）」で計算します。全体の数値に加えて、AIモデル別・プロンプト別に分けて見ること、社名を含む質問と含まない質問を分けることで、どこで負けているかが分かります。
                </Summary>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">比較する競合の選び方</h2>
                <p className="article-prose">
                  シェア・オブ・ボイスは、分母に入れる競合によって数値が変わります。比較する競合を適切に選ぶことが、正しく現在地を把握する第一歩です。
                </p>

                <h3 className="article-h3">競合は3種類に分けて考える</h3>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1fr 1.6fr 1fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>種類</div>
                    <div>どんな相手か</div>
                    <div>シェア・オブ・ボイスの分母</div>
                  </div>
                  {COMPETITOR_TYPES.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表4．比較する競合の3つの種類</TableCaption>

                <p className="article-prose">
                  見落としやすいのが「AI上の競合」です。営業の場面では名前が挙がらない会社でも、AIの回答では自社と並べて紹介されていることがあります。AIの回答を見るユーザーにとっては、その会社が比較相手になります。
                </p>

                <h3 className="article-h3">AI上の競合を選ぶ手順</h3>
                <ul className="article-list">
                  {COMPETITOR_STEPS.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="article-prose">
                  GEO Watcherでは、どのプランでも競合を最大20社まで登録できます。ブランド名とURLを登録すると、計測に使うプロンプトと競合企業が自動で提案されるため、手順1〜3を手作業で進める必要はありません。
                </p>

                <h3 className="article-h3">比較する競合の数を固定する</h3>
                <p className="article-prose">
                  競合を増やすと、分母が大きくなるため自社のシェア・オブ・ボイスは下がります。社内報告や前回との比較では、分母にした競合を固定し、競合を追加・削除したときはその旨を明記しましょう。
                </p>

                <Summary>
                  比較する競合は「事業上の競合」と「AI上の競合」から選びます。比較サイトなどの情報源は分母に入れず、引用URLとして別に確認します。数値を比較するときは、分母にした競合を固定します。
                </Summary>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">SEOのシェア・オブ・ボイスとの違い</h2>
                <p className="article-prose">
                  SEOでも、シェア・オブ・ボイスという指標が使われます。一般的には、対象キーワードの検索ボリュームと検索順位から推定したクリック数のうち、自社が占める割合を指します。AIのシェア・オブ・ボイスとは、測る対象も数値の動き方も異なります。
                </p>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "0.9fr 1.3fr 1.3fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>観点</div>
                    <div>SEOのシェア・オブ・ボイス</div>
                    <div>AIのシェア・オブ・ボイス</div>
                  </div>
                  {SEO_VS_AI_SOV.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表5．SEOのシェア・オブ・ボイスとAIのシェア・オブ・ボイスの違い</TableCaption>

                <p className="article-prose">
                  検索結果で上位に表示されていても、AIの回答では紹介されないことがあり、その逆もあります。ユーザーが検索エンジンとAIの両方を使っている以上、どちらか一方だけを見るのではなく、両方の数値を確認することが大切です。SEOとGEOの違いは、「
                  <Link href="/lab/seo-geo" className={LINK_CLASS}>SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較</Link>
                  」で詳しく解説しています。
                </p>

                <Summary>
                  SEOのシェア・オブ・ボイスは検索順位に基づく推定クリック数の割合、AIのシェア・オブ・ボイスはAIの回答の中での言及の割合です。測る対象が異なるため、両方を確認する必要があります。
                </Summary>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>シェア・オブ・ボイスが低いときの4つの確認ポイント</h2>
                <p className="article-prose">
                  シェア・オブ・ボイスが低いと分かっても、すべての質問、すべてのAIで一度に改善するのは難しいものです。次の4つのポイントを計測データで確認し、手をつける場所を絞り込みましょう。
                </p>

                <h3 className="article-h3">確認ポイント1：数値が特に低いAIはどれか</h3>
                <p className="article-prose">
                  <strong className="whitespace-nowrap">見るデータ：</strong>AIモデル別のシェア・オブ・ボイス
                </p>
                <p className="article-prose">
                  AIモデルごとのシェア・オブ・ボイスを比べ、自社の数値が特に低いAIがないかを確認します。全体の数値では目立たなくても、特定のAIで大きく負けている場合があります。
                </p>

                <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <figure className="overflow-hidden rounded-2xl border border-[#E6E4DD]">
                    <Image src={sovChatGptImage} alt="GEO WatcherのChatGPTにおけるシェア・オブ・ボイス画面" className="w-full h-auto" />
                    <figcaption className="px-5 py-3 text-[12px] text-[#9A9AA0]">↑ ChatGPTの場合</figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-[#E6E4DD]">
                    <Image src={sovGeminiImage} alt="GEO WatcherのGeminiにおけるシェア・オブ・ボイス画面" className="w-full h-auto" />
                    <figcaption className="px-5 py-3 text-[12px] text-[#9A9AA0]">↑ Geminiの場合</figcaption>
                  </figure>
                </div>

                <h3 className="article-h3">確認ポイント2：競合だけが登場している質問はどれか</h3>
                <p className="article-prose">
                  <strong className="whitespace-nowrap">見るデータ：</strong>プロンプト別の言及状況
                </p>
                <p className="article-prose">
                  プロンプトごとの回答を見て、競合は紹介されているのに自社が紹介されていない質問を確認します。これが、優先して取り組むべき改善テーマの候補になります。
                </p>

                <h3 className="article-h3">確認ポイント3：その質問で、AIはどのページを参照しているか</h3>
                <p className="article-prose">
                  <strong className="whitespace-nowrap">見るデータ：</strong>引用URL
                </p>
                <p className="article-prose">
                  確認ポイント2で見つけた質問について、AIが回答の根拠として参照しているURLを確認します。競合の公式サイトなのか、比較サイトやメディアなのかによって、取るべき対策が変わります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>競合の公式サイトが参照されている場合：</strong>同じテーマを扱う自社ページがあるか、内容が十分かを見直す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>比較サイトやメディアが参照されている場合：</strong>そのサイトに自社が掲載されているか、情報が正しいかを確認する</span>
                  </li>
                </ul>

                <h3 className="article-h3">確認ポイント4：改善の前後で、数値はどう変わったか</h3>
                <p className="article-prose">
                  <strong className="whitespace-nowrap">見るデータ：</strong>シェア・オブ・ボイスの推移
                </p>
                <p className="article-prose">
                  ページの改善などに取り組んだら、その内容と日付を記録し、前後でシェア・オブ・ボイスがどう変わったかを確認します。AIの回答は日々変わるため、1日の数値ではなく推移で判断しましょう。
                </p>

                <div
                  className="article-table"
                  style={{ marginBottom: 0, "--table-cols": "1.3fr 1.3fr 1.1fr" } as { [key: string]: string | number }}
                >
                  <div className="article-table__head">
                    <div>確認ポイント</div>
                    <div>見るデータ</div>
                    <div>分かること</div>
                  </div>
                  {CHECK_SUMMARY.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <TableCaption>表6．シェア・オブ・ボイスが低いときの4つの確認ポイント</TableCaption>

                <p className="article-prose">
                  確認した結果を改善につなげる進め方は、「
                  <Link href="/lab/geo-watcher-process" className={LINK_CLASS}>自社でできる！GEO Watcherを使った具体的なGEO・LLMO対策プロセス</Link>
                  」で詳しく紹介しています。
                </p>

                <Summary>
                  シェア・オブ・ボイスが低いときは、①数値が特に低いAI、②競合だけが登場している質問、③AIが参照しているページ、④改善前後の変化、の4点を確認し、手をつける場所を絞り込みます。
                </Summary>
              </section>

              {/* Section 6: まとめ */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ：AIのシェア・オブ・ボイスで、競合との差を数字で把握する</h2>
                <p className="article-prose">
                  AIのシェア・オブ・ボイスは、生成AIの回答で言及されたブランドのうち自社が占める割合で、「自社の言及数 ÷（自社＋競合の言及数の合計）」で計算します。自社の言及率だけでは分からない、競合との差を数字で把握できる指標です。
                </p>
                <p className="article-prose">
                  正しく活用するには、比較する競合を固定すること、社名を含む質問と含まない質問を分けること、AIモデル別・プロンプト別に分けて見ることが大切です。数値が低いときは、負けているAIと質問、AIが参照しているページを確認し、改善につなげましょう。
                </p>
                <p className="article-prose">
                  GEO Watcherでは、最大20社の競合を登録するだけで、主要AIでのシェア・オブ・ボイスを毎日自動で算出し、過去365日分の推移を確認できます。「自社の場合、どの質問や競合を計測すればよいのか」といった段階からでも、無料でご相談いただけます。
                </p>

                <div className="my-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/watcher"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1452FF] px-6 py-3 font-bold text-[#FDFDFB] transition-colors hover:bg-[#0B3FD9]"
                    style={{ fontSize: "var(--fs-label)" }}
                  >
                    ▶ GEO Watcherを見る
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1452FF] px-6 py-3 font-bold text-[#FDFDFB] transition-colors hover:bg-[#0B3FD9]"
                    style={{ fontSize: "var(--fs-label)" }}
                  >
                    ▶ 無料相談を予約する
                  </Link>
                </div>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section" style={{ marginTop: "56px" }}>
                <span className="article-kicker">07</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>「AIのシェア・オブ・ボイス」に関するよくある質問</h2>
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
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
