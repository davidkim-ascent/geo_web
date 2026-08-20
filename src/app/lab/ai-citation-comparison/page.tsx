import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "ChatGPT・Perplexity・Geminiはブランドをどう違って引用・推薦するのか";
const PAGE_DESCRIPTION =
  "同じ質問をChatGPT・Perplexity・Geminiに投げても、推薦されるブランドは異なる。モデルごとの引用方式の違いと、GEO Watcherを使った追跡方法を解説する。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ai-citation-comparison",
  keywords: ["ChatGPT", "Perplexity", "Gemini", "AI引用", "GEO", "LLMO", "SOV", "シェア・オブ・ボイス"],
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

const MODEL_ROWS = [
  ["ChatGPT", "学習知識＋必要に応じたリアルタイム検索", "中程度（モード・質問により変動）", "外部で繰り返し登場する定義・エンティティのシグナル"],
  ["Perplexity", "リアルタイムのWeb検索を優先し、出典を前面に表示", "高い（回答ごとに引用リンクを表示）", "最新性、外部引用資産"],
  ["Gemini", "学習知識＋Google検索との連携", "中程度（質問により引用の有無が変動）", "構造化データ、Web上の権威シグナル"],
  ["Google AI Overviews", "検索結果上部に生成される要約", "高い（引用カードが併記される）", "検索インデックス内の権威性、構造化"],
  ["Claude", "学習知識を中心とした慎重な記述", "中程度（検索連携時に引用あり）", "明確な定義文、一貫した外部での説明"],
  ["Grok", "リアルタイムのSNS・Webシグナルを反映", "中程度", "最新の話題性、リアルタイムの言及"],
];

const RISK_ROWS = [
  ["一つのモデルだけを見た場合", "他のプラットフォームの顧客を取りこぼす"],
  ["リスク", "マルチプラットフォームで見た場合"],
];

export default function AiCitationComparisonPage() {
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
                <span className="text-[#FDFDFB]">AIモデル別ブランド引用比較</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                RESEARCH NOTE · GEO / LLMO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">ChatGPT・Perplexity・Geminiは</span>
                <span className="block text-[#1452FF]">ブランドをどう違って引用・推薦するのか</span>
              </h1>

              <p className="article-hero__lede">
                同じ質問をChatGPT・Perplexity・Geminiにそれぞれ投げると、推薦されるブランドは異なります。モデルごとの引用方式の違いと、GEO Watcherを使ったモデル別の追跡方法を解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.20" },
                  { l: "LENGTH", v: "約4,000文字" },
                  { l: "FORMAT", v: "RESEARCH NOTE" },
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
                <ArticleThumbnail variant="ai-citation-comparison" eyebrow="RESEARCH NOTE · GEO / LLMO" className="h-[260px] w-full" />
              </figure>

              {/* Section 1: 結論 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>推薦されるブランドがAIごとに違うのは、バグではなく構造の違いである</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    一つのモデルで1位に推薦されても、別のモデルではまったく言及されないことがある。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  同じ質問をChatGPT・Perplexity・Geminiにそれぞれ投げると、推薦されるブランドが違うのはよくあることです。これは各モデルが学習している知識の時点、リアルタイムのWeb検索をどの程度活用するか、そして出典をどう選ぶかという基準が異なるために起こります。つまりAI回答最適化（AEO/GEO）とは、「唯一の正解コンテンツ」を作る作業ではなく、モデルごとに異なる弱点を個別に埋めていく作業に近いものです。
                </p>
              </section>

              {/* Section 2: なぜ違うのか */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">なぜAIごとに推薦ブランドが違うのか</h2>
                <p className="article-prose">
                  各モデルがブランドを回答に取り上げる方式は、（1）どこまでを「事実」として学習しているか、（2）回答時に外部のWebをどれだけ参照するか、（3）どの出典を信頼できると判断するか、という3つの観点でそれぞれ異なります。この違いがある限り、一つのコンテンツですべてのモデルに対応することは現実的ではありません。
                </p>
              </section>

              {/* Section 3: モデル別引用方式 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">AIモデル別の引用方式</h2>
                <p className="article-prose">
                  各モデルがブランドを回答に取り上げる方式を定性的に整理すると、次のようになります。表中の「強・中・弱」は絶対的な数値ではなく、モデル間の相対的な強調ポイントを示しています。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">AIモデル別の回答特性</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ ["--table-cols" as string]: "0.7fr 1.3fr 1fr 1.3fr", margin: 0 }}>
                    <div className="article-table__head">
                      <div>モデル</div>
                      <div>回答の性質</div>
                      <div>出典の露出</div>
                      <div>相対的に強く働くシグナル</div>
                    </div>
                    {MODEL_ROWS.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                        <div className="article-table__cell">{row[3]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="article-prose">
                  重要なのは、「引用を多く見せるモデル」と「出典シグナルの影響を受けるモデル」は必ずしも同じではないという点です。Perplexityのように回答のたびに引用リンクを表示するモデルは、外部引用資産がそのまま表面に現れます。一方ChatGPTやClaudeのように引用を常に表示しないモデルでも、内部的には学習された外部の記述やリアルタイムの出典の影響を受けています。つまり外部引用資産はどのモデルにおいても意味を持ちますが、それが回答に反映されるまでの速度が異なるということです。
                </p>
              </section>

              {/* Section 4: 3つのシグナル */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>最新性・外部引用・エンティティシグナルの重み</h2>
                <p className="article-prose">
                  モデルごとの違いをより実務的に見ると、3つのシグナルの重み付けが分かれます。
                </p>

                <h3 className="article-h3">最新性（リアルタイム性）</h3>
                <p className="article-prose">
                  PerplexityやGrokのように、回答のたびにリアルタイムのWeb・SNSシグナルを取り込むモデルは、直近に公開されたコンテンツや最新の引用に敏感です。新しいページや新しい報道が、比較的早く回答に反映される余地があります。一方、学習済みの知識を中心に回答するモードでは、過去に蓄積された記述の方が長く効き続けます。そのため「コンテンツを公開したばかりなのに、なぜChatGPTはまだ知らないのか」という状況と、「Perplexityにはもう出てきている」という状況が同時に起こり得ます。
                </p>

                <h3 className="article-h3">外部引用資産</h3>
                <p className="article-prose">
                  自社サイトの外側で、同じ定義や推薦が繰り返し語られている度合いを指します。メディア・レビュー・ディレクトリ・書籍・コミュニティなど、外部チャネルでの一貫した記述が積み重なると、出典を前面に表示するモデル（Perplexity、AI Overviews）ではそのまま引用リンクとして現れ、学習中心のモデルでは次の学習・検索により反映されやすくなります。外部引用はほぼすべてのモデルで共通して機能しますが、反映されるまでの速度がモデルごとに異なります。
                </p>

                <h3 className="article-h3">エンティティシグナル</h3>
                <p className="article-prose">
                  ブランドが「何をしている、誰なのか」をモデルが明確な実体（エンティティ）として理解できるようにするシグナルです。一貫した名称、明確な定義文、構造化データ（JSON-LD）、カテゴリとの紐づけがこれにあたります。Gemini・AI Overviewsのように、Google検索インデックスや構造化データと親和性の高いモデルでは相対的に強く働きますが、エンティティが曖昧なままでは、どのモデルにおいても「その分野の候補の一つ」としてしか扱われにくくなります。
                </p>
              </section>

              {/* Section 5: マルチプラットフォーム対応 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">マルチプラットフォーム対応が必要な理由</h2>
                <p className="article-prose">
                  一つのモデルだけを見て最適化するのはリスクがあります。理由は3つあります。
                </p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>ユーザーは一つのモデルだけを使うわけではない。</strong>ある人はChatGPTで、ある人はPerplexityで、また別の人はGoogle検索のAI Overviewsで同じ意思決定をしています。一つのモデルだけで推薦されていても、それ以外の接点にいる見込み顧客をまるごと取りこぼしてしまいます。</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>モデルごとの結果は個別に動く。</strong>あるモデルで言及率が上がっても、他のモデルは変わらないことがあります。モデルのアップデートによって、昨日まで良好だった回答が変わることもあります。モデルごとに追跡していないと、全体としては「改善している」と錯覚しながら、特定のモデルでは取りこぼしが続いている状況に気づけません。</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>弱点はモデルごとに異なる処方を必要とする。</strong>最新性の弱いモデルには新しいコンテンツと外部引用を素早く供給する必要があり、エンティティが曖昧なモデルには定義文と構造化データの整備が必要です。同じ弱点であっても、モデルによって優先順位が変わるため、「どのモデルで何が不足しているか」を先に把握することが処方の精度を左右します。</span>
                  </li>
                </ul>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">単一モデル視点とマルチプラットフォーム視点の違い</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>{RISK_ROWS[1][0]}</div>
                      <div>{RISK_ROWS[1][1]}</div>
                    </div>
                    <div className="article-table__row">
                      <div className="article-table__cell">{RISK_ROWS[0][0]}</div>
                      <div className="article-table__cell">{RISK_ROWS[0][1]}</div>
                    </div>
                    <div className="article-table__row">
                      <div className="article-table__cell">全体改善と錯覚し、特定モデルの取りこぼしを放置する</div>
                      <div className="article-table__cell">弱いモデルをピンポイントで補強できる</div>
                    </div>
                    <div className="article-table__row">
                      <div className="article-table__cell">モデルアップデートで回答が変わっても気づけない</div>
                      <div className="article-table__cell">変化のタイミングを素早く捉えられる</div>
                    </div>
                    <div className="article-table__row">
                      <div className="article-table__cell">処方が曖昧になりがち</div>
                      <div className="article-table__cell">モデルごとに異なる処方を適用できる</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: GEO Watcher */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>GEO Watcherはモデル間の違いをどう扱うのか</h2>
                <p className="article-prose">
                  AscentのGEO Watcherは、モデルごとの違いを「感覚」ではなく指標として扱います。中心となるのは<strong>シェア・オブ・ボイス（SOV）</strong>です。SOVは、目標とする質問セットに対して、主要LLMの回答の中で自社ブランドと競合ブランドが言及される割合を測る指標で、これをモデル別・質問別に個別に追跡します。そのため「ChatGPTでは頻繁に言及されるのに、Perplexityではほとんど出てこない」といったモデル間のギャップが一目で分かります。
                </p>
                <p className="article-prose">
                  追跡対象はChatGPT・Claude・Gemini・Perplexity・Copilot・Google AI Overviewsの主要6モデルで、日次でモニタリングします。毎日計測することで、モデルアップデートによる回答の変化や、新しく公開したコンテンツがどのモデルに先に反映されるかといった変化を、比較的早く捉えることができます。
                </p>
                <p className="article-prose">
                  つまり、モデルごとに推薦が異なること自体は避けられない構造ですが、「どのモデルで何が不足しているか」をモデル別に測定し、弱い部分を選んで埋めていく運用によって対応することができます。
                </p>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">FAQ</h2>

                <h3 className="article-h3">ChatGPTとPerplexityでは最適化の方法が違いますか？</h3>
                <p className="article-prose">
                  強調すべきポイントが異なります。Perplexityは回答のたびにリアルタイムのWeb出典を目に見える形で引用するため、最新性と外部引用資産が相対的に強く働きます。ChatGPTは学習済みの知識とリアルタイム検索を併用するため、外部で繰り返し語られる定義文とエンティティシグナルの蓄積がより重要になります。同じコンテンツでも、モデルごとの強調ポイントに合わせて資産を配置する必要があります。
                </p>

                <h3 className="article-h3">出典を最も多く引用するAIはどれですか？</h3>
                <p className="article-prose">
                  定性的に見ると、Perplexityが出典の引用をもっとも前面に出すモデルで、Google AI Overviewsも引用リンクを併せて表示する傾向があります。ChatGPT・Claude・Geminiは、質問やモードによって引用を表示することも、生成した知識で回答することもあります。ただし引用をあまり見せないモデルであっても、内部的には出典シグナルの影響を受けているため、外部引用資産はどのモデルにおいても意味を持ちます。
                </p>

                <h3 className="article-h3">一つのモデルでうまく推薦されれば、他のモデルでも同じように出ますか？</h3>
                <p className="article-prose">
                  必ずしもそうとは限りません。モデルごとに学習時点、リアルタイム検索への依存度、出典の選定基準が異なるため、あるモデルで1位に推薦されるブランドが、別のモデルではまったく言及されないこともあります。そのためモデルごとに個別に追跡し、空白を補強していく運用が必要です。
                </p>

                <h3 className="article-h3">AIごとに推薦ブランドが違う中で、すべてに対応するにはどうすればよいですか？</h3>
                <p className="article-prose">
                  まず目標とする質問セットを定め、各質問をモデルごとに投げかけて、現在自社ブランドがどこで言及され、どこで抜け落ちているかを診断する必要があります。GEO Watcherでは、主要6モデルを対象に、プロンプトごとの可視性・言及・引用といったGEO・LLMOの主要指標を、モデル別にフィルタリングして把握できます。
                </p>

                <h3 className="article-h3">GeminiとGoogle AI Overviewsは同じものですか？</h3>
                <p className="article-prose">
                  異なります。Geminiは独立したチャットボットのインターフェースであり、AI OverviewsはGoogle検索の上部に表示される生成型の要約です。どちらもGoogle系の生成技術を使っていますが、表示される場所や回答の文脈が異なるため、AEOの観点では別モデルとして捉え、それぞれ追跡するのが安全です。
                </p>
              </section>

              {/* Section 8: まとめ */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">まとめ</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    どのモデルで何が不足しているかをモデル別に測定し、弱いところを選んで埋めていく運用こそが、AI検索時代のブランド対策の実務である。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  ChatGPT・Perplexity・Geminiがブランドを異なる基準で引用・推薦するのは、学習知識の時点、リアルタイム検索への依存度、出典選定の基準がそれぞれ異なるためです。この構造そのものを変えることはできませんが、モデル別にSOVを測定し、弱いモデルを狙って補強する運用によって、対応することは可能です。
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
