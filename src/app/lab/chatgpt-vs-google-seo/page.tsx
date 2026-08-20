import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "ChatGPT最適化とGoogle SEOは何が違うのか";
const PAGE_DESCRIPTION =
  "Google SEOとChatGPT最適化（AEO/GEO）は、ユーザー行動も施策の単位も異なる。両者の違いを整理し、両立させるための統合戦略を解説する。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/chatgpt-vs-google-seo",
  keywords: ["ChatGPT最適化", "Google SEO", "AEO", "GEO", "LLMO", "検索行動", "質問設計"],
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

const USER_FLOW = [
  {
    label: "Googleユーザー",
    steps: [
      "キーワードを入力する（例：「スタートアップ アクセラレーター おすすめ」）",
      "検索結果ページで3〜5件のリンクをクリックする",
      "各サイトを見比べる",
      "意思決定する",
    ],
  },
  {
    label: "ChatGPTユーザー",
    steps: [
      "自然言語で質問する（例：「スタートアップ向けのアクセラレーターを教えて」）",
      "回答の中で挙げられた1〜3件のブランドを確認する",
      "追加の質問で詳細を確認する",
      "その場で意思決定する（多くはChatGPTの回答内で完結する）",
      "意思決定した後にサイトを訪問する",
    ],
  },
];

const COMPARISON_ROWS = [
  ["施策の単位", "ページ・キーワード", "質問・定義文"],
  ["中心となるコンテンツ", "キーワード中心の本文、被リンク", "Q&A形式の文章、FAQ、比較、外部引用"],
  ["計測環境", "Google Search Console、Ahrefsなど", "LLM回答のモニタリング、SOV計測"],
  ["蓄積効果", "ドメインオーソリティ", "キャッシュ（再利用）効果"],
  ["広告領域", "Google広告として分離", "スポンサー広告が本格化しつつある"],
  ["変動要因", "アルゴリズムアップデート単位", "モデルバージョンのアップデート単位"],
];

export default function ChatGptVsGoogleSeoPage() {
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
                <span className="text-[#FDFDFB]">ChatGPT最適化 vs Google SEO</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                COMPARE · SEO / GEO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">ChatGPT最適化とGoogle SEOは</span>
                <span className="block text-[#1452FF]">何が違うのか</span>
              </h1>

              <p className="article-hero__lede">
                Google SEOとChatGPT最適化（AEO/GEO）は、どちらも「見つけてもらう」ための施策だが、ユーザーの行動も、施策の単位も、成果の測り方も異なる。両者の違いを整理し、両立させるための統合戦略を解説する。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.20" },
                  { l: "LENGTH", v: "約3,000文字" },
                  { l: "FORMAT", v: "COMPARE" },
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
              <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <ArticleThumbnail variant="chatgpt-vs-google-seo" eyebrow="COMPARE · SEO / GEO" className="h-[260px] w-full" />
              </figure>

              {/* Section 1: 結論 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>ChatGPT最適化はGoogle SEOを置き換えるものではなく、拡張するもの</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    ChatGPTの回答に一度も引用されない限り、そのブランドは候補から静かに消えていく。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  Google検索では、ユーザーは複数のリンクをクリックし、サイトを見比べながら意思決定します。一方ChatGPTでは、回答の中で名前が挙がった1〜3件のブランドだけを見て、その場で意思決定が完結することが少なくありません。この違いが、ChatGPT最適化とGoogle SEOで取り組むべき施策の単位や優先順位を大きく分けています。
                </p>
              </section>

              {/* Section 2: 一言で言うと */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">一言で言うと</h2>
                <p className="article-prose">
                  Google SEOとは、ユーザーがGoogleでキーワード検索をした際に、自社のページが検索結果の上位に表示されるようにする施策です。一方ChatGPT最適化とは、ユーザーがChatGPTに自然言語で質問した際に、自社ブランドが回答の中で引用・推薦されるようにする施策を指します。
                </p>
                <p className="article-prose">
                  どちらも「見つけてもらう」ための取り組みという点は共通していますが、最適化の対象がまったく異なります。SEOはページとキーワードを単位に設計しますが、ChatGPT最適化は質問と、その質問に対する定義文・回答文を単位に設計します。
                </p>
              </section>

              {/* Section 3: ユーザー行動の違い */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">ユーザー行動の違い</h2>
                <p className="article-prose">
                  Googleを使うユーザーとChatGPTを使うユーザーでは、意思決定に至るまでの行動フローがまったく異なります。
                </p>

                <div className="my-8 grid gap-6 sm:grid-cols-2">
                  {USER_FLOW.map((flow) => (
                    <div key={flow.label}>
                      <p className="mb-3 font-bold text-[15px] text-[#0B0B0E]">{flow.label}の行動フロー</p>
                      <ol className="flex flex-col overflow-hidden rounded-xl border border-[#E6E4DD]">
                        {flow.steps.map((step, i) => (
                          <li
                            key={step}
                            className={`flex items-start gap-3 px-5 py-3.5 ${i < flow.steps.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}
                          >
                            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#1452FF]/10 font-mono text-[11px] font-bold text-[#1452FF]">
                              {i + 1}
                            </span>
                            <span className="text-[14px] leading-[1.6] text-[#0B0B0E]">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  この違いは、マーケティングやブランディングの観点で決定的な意味を持ちます。ChatGPTでは一度回答に登場すれば意思決定がその場で終わってしまうのに対し、Googleではクリック・比較・意思決定というプロセスを踏みます。ChatGPTの回答に引用されなかったブランドは、事実上その時点で検討の候補から外れてしまうのです。
                </p>
              </section>

              {/* Section 4: 施策の違い */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">SEOとChatGPT最適化、施策の違い</h2>
                <p className="article-prose">
                  行動フローの違いは、そのまま施策の単位や測定方法の違いにつながります。両者を項目ごとに整理すると、次のようになります。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">Google SEOとChatGPT最適化の比較</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>観点</div>
                      <div>Google SEO</div>
                      <div>ChatGPT最適化</div>
                    </div>
                    {COMPARISON_ROWS.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 5: 統合戦略 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>ChatGPT最適化とGoogle SEOを両立させる統合戦略</h2>
                <p className="article-prose">
                  ChatGPT最適化とGoogle SEOは対立するものではなく、両立できる施策です。実務では、次の4つの統合戦略が有効です。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {[
                    { title: "共通資産を優先的に整備する", desc: "AIボットのアクセスに問題のないテクニカル構造、FAQ、構造化データ、内部リンクは、SEO・ChatGPT最適化の両方に加点となる。まずここから着手する。" },
                    { title: "コンテンツを分けて設計する", desc: "SEO向けのキーワード中心ブログと、AEO向けの質問形式ガイドページを別々に運用するか、既存のSEOページの中にAEO向けコンテンツを補強する。" },
                    { title: "外部チャネルを統合的に活用する", desc: "メディア掲載・レビュー・書籍・ディレクトリへの掲載は、SEOとChatGPT最適化の両方に効果がある。" },
                    { title: "計測は分けて管理する", desc: "SEOはSearch Consoleで、ChatGPTは可視性やシェア・オブ・ボイス（SOV）で計測する。指標を混同すると、施策の効果が正しく評価できなくなる。" },
                  ].map((item, i, arr) => (
                    <div key={item.title} className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#1452FF]/10 font-mono text-[11px] font-bold text-[#1452FF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[14px] text-[#0B0B0E]">{item.title}</div>
                        <div className="text-[13px] text-[#6B6B73]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6: 併走体制 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>ChatGPT最適化とSEOエージェンシーを併走させる体制</h2>
                <p className="article-prose">
                  ChatGPT最適化はGoogle SEOを代替するものではなく、その領域を拡張するものです。ただし、ChatGPTの回答に入り込めなければ、SEOだけではユーザーとの最初の接点を取りこぼしかねません。Ascent GEO（LLMO）のクライアントでは、一般的に次のような運用体制が組まれています。
                </p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>Ascent GEO（LLMO）：</strong>ChatGPT・Claude・Gemini・Perplexity、AI Modeにおける回答の最適化。質問クラスターの設計と、GEO Watcherによる継続的なモニタリングを担う。</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>SEOエージェンシー（併走）：</strong>Googleにおけるキーワードリサーチ、コンテンツ戦略、テクニカルSEOを担う。</span>
                  </li>
                </ul>

                <p className="article-prose">
                  両施策の共通資産は、結局のところ自社サイトそのものにあります。Ascent GEO（LLMO）のガイドラインに沿ってサイトを整備すれば、SEOの加点効果も自然についてきます。
                </p>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">ChatGPT最適化に関するFAQ</h2>

                <h3 className="article-h3">Google AI Overviewsに掲載されると、ChatGPTの回答にも自動的に反映されますか？</h3>
                <p className="article-prose">
                  直接的な自動連携はありませんが、間接的な効果は期待できます。AI Overviewsに引用されるページは権威性のシグナルが強く、それ自体が外部引用の蓄積となるため、結果としてChatGPTの学習データにも良い影響を与える可能性があります。
                </p>

                <h3 className="article-h3">ChatGPT最適化にも、SEOと同じようなキーワードリサーチが必要ですか？</h3>
                <p className="article-prose">
                  キーワードリサーチよりも「質問リサーチ」が重要になります。見込み顧客がChatGPTに自然言語でどのような質問を投げかけるかを50〜200件ほど洗い出し、それぞれの質問に対して引用されやすい回答を用意することが施策の核になります。
                </p>
              </section>

              {/* Section 8: まとめ */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">まとめ</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    Google SEOとChatGPT最適化は競合する施策ではなく、共通の土台の上に成り立つ、補完し合う施策である。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  Google SEOはキーワードとページを単位に、クリックと比較を経て意思決定に至るユーザーに向けた施策です。ChatGPT最適化は質問と回答文を単位に、その場で意思決定が完結してしまうユーザーに向けた施策です。両者はアプローチこそ異なりますが、テクニカル構造・FAQ・構造化データ・外部引用といった共通資産の上に成り立っている点は同じです。
                </p>
                <p className="article-prose">
                  まずは自社の見込み顧客がChatGPTにどのような質問を投げかけているかを把握することから始め、SEOとChatGPT最適化を並走させる体制を整えることが、AI検索時代における現実的な一歩になります。
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
