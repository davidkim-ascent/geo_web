import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { buildPageMetadata } from "@/lib/seo";
import shimadaImage from "./shimada.png";

const PAGE_TITLE = "Reciprocal Rank Fusion（RRF）とは？LLMが1つの質問で複数回検索する理由";
const PAGE_DESCRIPTION =
  "LLMは1つの質問に対し複数の検索クエリを実行し、RRF（Reciprocal Rank Fusion）で結果を統合しています。ChatGPTの実装例やスコア計算、トピッククラスターが効果的な理由まで解説。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/reciprocal-rank-fusion",
  keywords: ["RRF", "Reciprocal Rank Fusion", "GEO対策", "LLMO対策", "AI検索対策", "トピッククラスター", "ChatGPT"],
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

const RRF_SCORE_EXAMPLES = [
  ["1位", "1 /（60 + 1）= 0.0164"],
  ["5位", "1 /（60 + 5）= 0.0154"],
  ["10位", "1 /（60 + 10）= 0.0143"],
];

const RELATED_QUERY_EXAMPLES = [
  "「コーヒーメーカー」",
  "「おすすめ コーヒーメーカー」",
  "「コーヒーメーカー 選び方」",
  "「家庭用 コーヒーメーカー レビュー」など",
];

const PAGE_A_SCORES = [
  ["「コーヒーメーカー」", "1位", "0.0164"],
  ["「おすすめ コーヒーメーカー」", "15位", "0.0133"],
  ["「コーヒーマシン」", "圏外", "0"],
  ["「コーヒーメーカー レビュー」", "25位", "0.0118"],
];

const PAGE_B_SCORES = [
  ["「コーヒーメーカー」", "4位", "0.0156"],
  ["「おすすめ コーヒーメーカー」", "5位", "0.0154"],
  ["「コーヒーマシン」", "6位", "0.0152"],
  ["「コーヒーメーカー レビュー」", "4位", "0.0156"],
  ["「家庭用 コーヒーメーカー」", "7位", "0.0149"],
];

const CLUSTER_REASONS = [
  {
    title: "複数のクエリバリエーション",
    desc: "AIは1回だけ検索するのではなく、関連する複数のクエリを使って情報を探索します。",
  },
  {
    title: "スコアの累積",
    desc: "同じページが複数の検索結果に登場するほど、総合的な評価が高くなる可能性があります。",
  },
  {
    title: "トピック全体への理解",
    desc: "特定のキーワードだけでなく、そのテーマを幅広くカバーしているコンテンツが評価されやすくなります。",
  },
];

export default function ReciprocalRankFusionPage() {
  return (
    <div className="article-page">
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
                <span className="text-[#FDFDFB]">Reciprocal Rank Fusion（RRF）とは</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                TECHNICAL GEO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">Reciprocal Rank Fusion（RRF）とは？</span>
                <span className="block">LLMが1つの質問で複数回検索する理由</span>
              </h1>

              <p className="article-hero__lede">
                ChatGPTやPerplexity、GoogleのAIモードは、1つの質問に対して実は複数回の検索を行っています。その結果を統合する仕組みが「RRF（Reciprocal Rank Fusion）」です。この記事では、RRFの計算方法からChatGPTの実装コード、トピッククラスターが効果的な理由までを解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.09.23" },
                  { l: "LENGTH", v: "約3,300文字" },
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
              <blockquote className="article-quote article-quote--wide">
                <p className="article-quote__text">
                  RRF（Reciprocal Rank Fusion）は、決して新しい技術ではありません。2009年から存在しており、情報検索の分野では広く利用されてきた手法です。
                </p>
                <span className="article-quote__note">この記事の結論</span>
              </blockquote>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>Reciprocal Rank Fusion（RRF）とは？</h2>
                <p className="article-prose">
                  RRF（Reciprocal Rank Fusion）は、決して新しい技術ではありません。2009年から存在しており、情報検索の分野では広く利用されてきた手法です。簡単に言えば、複数の検索クエリから得られたランキングを統合し、最終的な順位を決定するための方法です。
                </p>
                <p className="article-prose">
                  システムが複数のクエリを実行し、同じページがそれぞれ異なる順位で表示された場合、それらのスコアがすべて加算されます。計算式は非常にシンプルです。
                </p>
                <p className="article-prose">
                  たとえば、次のようになります。
                </p>

                <div className="article-table article-table--2col">
                  <div className="article-table__head">
                    <div>順位</div>
                    <div>スコア計算</div>
                  </div>
                  {RRF_SCORE_EXAMPLES.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>なぜLLMは1つの質問に対して複数回検索するのか？</h2>
                <p className="article-prose">
                  意外と知られていないのですが、ChatGPTやPerplexity、GoogleのAIモードに質問した際、これらのシステムが実行しているのは、単純な「1回の検索」ではありません。複数の異なる検索クエリを生成して検索を行い、その結果を総合して回答を生成しています。
                </p>
                <p className="article-prose">
                  たとえば、「コーヒーメーカー」について質問した場合、AIは次のような関連クエリを検索する可能性があります。
                </p>

                <ul className="article-list">
                  {RELATED_QUERY_EXAMPLES.map((q) => (
                    <li key={q} className="article-list__item">
                      <span className="article-list__bullet">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>

                <p className="article-prose">
                  Googleの最新AIモードでも、基本的にはこれと同じように、複数の検索結果を組み合わせるアプローチが採用されています。RRFは、こうした複数の検索結果を1つのランキングに統合するための数学的な手法です。これが、AI検索の結果が従来のGoogle検索における単一の検索結果とは異なって見える理由の一つでもあります。
                </p>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>ChatGPTは検索結果をどのように処理しているのか</h2>
                <p className="article-prose">
                  ChatGPTの検索実装を調べていたところ、次のような興味深いコードを確認しました。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#0B0B0E] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.5)]">
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    </span>
                    <span className="ml-2 font-mono text-[11px] tracking-[0.1em] text-white/50">chatgpt_search_config.py</span>
                  </div>
                  <pre className="px-6 py-5 font-mono text-[13px] leading-[1.9] overflow-x-auto">
                    <code>
                      <span className="text-[#7DD3FC]">rrf_alpha</span>
                      <span className="text-white/60">: </span>
                      <span className="text-[#F5A623]">1</span>
                      <span className="text-white/60">,</span>
                      {"\n"}
                      <span className="text-[#7DD3FC]">rrf_input_threshold</span>
                      <span className="text-white/60">: </span>
                      <span className="text-[#F5A623]">0</span>
                      <span className="text-white/60">,</span>
                      {"\n"}
                      <span className="text-[#7DD3FC]">ranking_model</span>
                      <span className="text-white/60">: </span>
                      <span className="text-[#C084FC]">null</span>
                    </code>
                  </pre>
                </div>

                <p className="article-prose">
                  このコードからは、ChatGPTが複数の検索結果を統合する際に、標準的なRRFを利用していることが読み取れます。特に興味深いのは、この仕組みによって、複数のクエリバリエーションで安定して上位表示されることの重要性が見えてくる点です。
                </p>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>ページA・Bで比較するRRFスコアの違い</h2>

                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>ページA：単一キーワードに集中したページ</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ margin: 0 }}>
                    <div className="article-table__head"><div>クエリ</div><div>順位</div><div>スコア</div></div>
                    {PAGE_A_SCORES.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="article-prose">
                  RRF合計スコア：0.0415
                </p>

                <p className="mt-8 mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>ページB：トピッククラスター型のページ</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ margin: 0 }}>
                    <div className="article-table__head"><div>クエリ</div><div>順位</div><div>スコア</div></div>
                    {PAGE_B_SCORES.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="article-prose">
                  RRF合計スコア：0.0767
                </p>

                <p className="article-prose">
                  ページBは、より幅広い関連テーマをカバーしているため、ページAの約1.8倍のスコアを獲得しています。これが、トピッククラスターが非常に強力である理由です。
                </p>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>トピッククラスターが効果的な理由をRRFの視点から考える</h2>
                <p className="article-prose">
                  ChatGPTにおけるRRFの実装を見ることで、AI検索がコンテンツをどのように評価しているのか、その一端を理解できます。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {CLUSTER_REASONS.map((r, i, arr) => (
                    <div key={r.title} className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex-none rounded-full bg-[#1452FF] px-3 py-0.5 font-mono text-[10px] text-white tracking-[0.12em]">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <div className="font-bold" style={{ fontSize: "var(--fs-body)" }}>{r.title}</div>
                        <div className="text-[#6B6B73]" style={{ fontSize: "var(--fs-body-sm)" }}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  トピッククラスターは、単なるコンテンツマーケティングの手法ではありません。RRFのようなランキング統合方式を前提に考えると、複数の関連クエリで評価されやすい構造を作るための合理的なアプローチだと言えます。
                </p>
                <p className="article-prose">
                  ChatGPTが現在、あるいは将来的にどの検索エンジンや検索システムを利用するのかを正確に予測することはできません。しかし、RRFという仕組みを見ることで、AI検索システムが複数のクエリ、ランキング、情報源をどのように組み合わせて関連性を判断しているのかを考えるヒントが得られます。
                </p>
              </section>

              {/* Section 6: まとめ */}
              <section id="s6" className="article-section" style={{ marginTop: "56px" }}>
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ｜RRFを理解してトピッククラスター設計に活かそう</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AI検索が複数の検索クエリやシグナルを組み合わせる時代では、1つのキーワードだけで突出すること以上に、あるテーマ全体で継続的に検索結果へ露出することが重要になります。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  トピッククラスターは、単なるコンテンツ戦略ではありません。AI検索時代において、複数の関連クエリで継続的に評価されるための、非常に合理的な
                  <Link href="/lab/what-is-llmo" className="text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4">SEO</Link>
                  アプローチだと言えるでしょう。
                </p>

                <div className="article-note-panel">
                  <div className="article-note-panel__grid">
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">監修</div>
                      <div className="flex items-start gap-4">
                        <Image
                          src={shimadaImage}
                          alt="嶋田誠一"
                          width={77}
                          height={77}
                          className="h-[77px] w-[77px] flex-none rounded-full object-cover"
                        />
                        <p className="article-note-panel__text" style={{ fontSize: "14px" }}>
                          <strong>嶋田誠一</strong>
                          <br />
                          株式会社アセントネットワークス SEO担当者。新規事業として比較系メディアを立ち上げ、SEO戦略のみで月間80万PVまで成長させた実績を武器に、SEOコンサルタントへ転身。現在は海外大手メーカーのSEOを担当し、2026年からはGEO・LLMO領域の実務にもいち早く着手。検索エンジンとAI検索を理解した戦略設計を強みとしています。
                        </p>
                      </div>
                    </div>
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">出典・参考</div>
                      <p className="article-note-panel__text article-note-panel__text--muted">
                        ChatGPT検索実装の公開コード確認、RRF（Reciprocal Rank Fusion）の一般的な計算方式に基づく分析（2026年9月時点）。
                      </p>
                    </div>
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
