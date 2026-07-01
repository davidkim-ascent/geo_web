import Link from "next/link";
import type { Metadata } from "next";
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
import { ArticleTOC } from "../llmo-eeat/ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "AIに引用される記事の特徴とは？押さえるべき7つの特徴";
const PAGE_DESCRIPTION =
  "AIに引用されやすいコンテンツの特徴や設計ポイントを独自調査データを交えながら7つのポイントに絞って解説。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ai-cited-article",
  keywords: ["GEO", "LLMO", "AI引用", "コンテンツ設計", "結論ファースト", "FAQ構造", "セマンティックHTML"],
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

const SEVEN_FEATURES = [
  { num: "01", title: "結論ファーストの構成", icon: "◎", desc: "冒頭・見出し直下に結論を提示" },
  { num: "02", title: "パッセージ設計", icon: "¶", desc: "一段落で質問に完結して回答" },
  { num: "03", title: "具体的な数値・一次データ", icon: "#", desc: "出典付きの検証可能なデータ" },
  { num: "04", title: "FAQ構造", icon: "?", desc: "質問と回答の明確な一対一対応" },
  { num: "05", title: "見出しの網羅性", icon: "≡", desc: "複数の質問パターンを意味的にカバー" },
  { num: "06", title: "セマンティックHTML", icon: "</>", desc: "機械が読みやすい構造化マークアップ" },
  { num: "07", title: "根拠と出典の明示", icon: "✓", desc: "E-E-A-Tを支える信頼性シグナル" },
];

const CITATION_DATA = [
  { engine: "Perplexity", style: "積極的に検索して引用", cited: 18, total: 52 },
  { engine: "Google AI Mode", style: "検索連動型の引用", cited: 16, total: 52 },
  { engine: "ChatGPT", style: "学習済知識で完結する傾向", cited: 10, total: 52 },
  { engine: "Gemini", style: "学習済知識で完結する傾向", cited: 8, total: 52 },
];

const PASSAGE_TIPS = [
  { label: "見出し", tip: "想定される質問にできるだけ近い自然な文にする" },
  { label: "段落冒頭", tip: "主語と結論を1〜2文で完結させる" },
  { label: "段落末尾", tip: "次の段落に依存しない、自己完結した文で終わる" },
];

export default function AiCitedArticlePage() {
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
                <Link href="/" className="transition-colors hover:text-[#FAFAF7]">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FAFAF7]">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FAFAF7]">AI引用記事の特徴</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                RESEARCH NOTE · GEO / LLMO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AIに引用される記事の</span>
                <span className="block text-[#1452FF]">7つの特徴</span>
              </h1>

              <p className="article-hero__lede">
                AIに引用される記事には、共通する構造上の特徴があります。結論ファースト、パッセージ設計、具体的なデータ、FAQ構造など、Ascent独自の調査データ（52件の引用分析）をもとに7つのポイントを整理します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.07.01" },
                  { l: "LENGTH", v: "約6,500文字" },
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
              <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <ArticleThumbnail variant="ai-cited-article" eyebrow="GEO / LLMO" className="h-[260px] w-full" />
              </figure>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">AIに引用される記事とは</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AIに引用される記事とは「結論ファーストの構成」「質問にそのまま答える一段落」「具体的なデータ」「明確な構造」を備えた記事
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  AIに引用される記事には、共通する特徴があります。結論を最初に示す構成、見出し直下の一段落だけで質問への回答が完結していること、具体的な数値や一次データを伴っていること、そしてFAQやセマンティックHTMLなど機械が読み取りやすい構造を備えていることです。
                </p>
                <p className="article-prose">
                  これらの特徴は偶然に揃うものではなく、AIが回答を生成する際の情報抽出の仕組みを踏まえて意図的に設計することで実現できます。内容が優れていても、これらの特徴を欠いたコンテンツはAIの回答に取り上げられにくいということでもあります。
                </p>

                {/* 7特徴の一覧テーブル */}
                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    AIに引用される記事の7つの特徴
                  </div>
                  {SEVEN_FEATURES.map((f, i) => (
                    <div
                      key={f.num}
                      className={`flex items-center gap-4 px-5 py-4 ${i < SEVEN_FEATURES.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}
                    >
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#1452FF]/10 font-mono text-[11px] font-bold text-[#1452FF]">
                        {f.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[14px] text-[#0B0B0E]">{f.title}</div>
                        <div className="text-[13px] text-[#6B6B73]">{f.desc}</div>
                      </div>
                      <span className="font-mono text-[18px] text-[#1452FF]/40 flex-none">{f.icon}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">なぜ今、AI引用を意識する必要があるのか</h2>
                <p className="article-prose">
                  検索の主戦場は、検索結果ページからAIの回答そのものへと移りつつあります。Ahrefsの調査では、AI Overviewsが表示される検索クエリにおいて、上位表示ページのクリック率が58%低下したと報告されています。一方でAdobeの2026年のデータでは、AI経由でリテールサイトに訪問するユーザーが393%増加したとされています。
                </p>
                <p className="article-prose">
                  この変化が意味するのは、「検索結果で1位を取る」ための記事の書き方と「AIの回答に引用される」ための記事の書き方は、必ずしも同じではないということです。特徴を把握して設計することで、限られたコンテンツ制作リソースの中でもAIに引用される可能性を効率的に高めることができます。
                </p>

                {/* AIエンジン別引用スタイル比較 */}
                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    Ascent独自検証：AIエンジン別の引用スタイル（調査件数 52件）
                  </div>
                  <div className="article-table article-table--2col">
                    <div className="article-table__head">
                      <div>AIエンジン</div>
                      <div>引用スタイルの特徴</div>
                    </div>
                    {CITATION_DATA.map((row) => (
                      <div key={row.engine} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row.engine}</div>
                        <div className="article-table__cell">{row.style}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 text-[12px] text-[#9A9AA0]">
                    ※「GEOとSEOの違いは何ですか？」など4クエリをGoogle AI Mode、ChatGPT、Gemini、Perplexityで調査
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">特徴1：結論ファーストの構成になっている</h2>
                <p className="article-prose">
                  AIに引用される記事の最も基本的な特徴は、結論を冒頭や見出し直下に提示する構成です。AIは記事全体を丁寧に読み込んで要約するのではなく、回答に転用できる「答えそのもの」に近い文章を抽出する傾向があります。結論が文章の後半に隠れている記事は、AIにとって抽出しづらい構造です。
                </p>
                <p className="article-prose">
                  具体的には、記事冒頭の導入文に結論を要約した一文を置くこと、各見出しの直後の最初の1〜2文でその見出しに対する答えを完結させることが有効です。
                </p>

                {/* 独自検証データ — ドーナツ + 凡例 */}
                <div className="my-6 overflow-hidden rounded-xl border border-[#1452FF]/20 bg-[#1452FF]/[0.04]">
                  <div className="px-6 pt-5 pb-1 font-mono text-[10px] tracking-[0.22em] text-[#1452FF] uppercase">Ascent独自検証データ</div>
                  <div className="flex items-center gap-6 px-6 py-5">
                    {/* ドーナツチャート */}
                    <div className="flex-none">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        {/* 背景リング (60%) */}
                        <circle
                          cx="60" cy="60" r="44"
                          fill="none"
                          stroke="#E6E4DD"
                          strokeWidth="18"
                        />
                        {/* 前景リング (40%) — circumference = 2π×44 ≈ 276.5 */}
                        <circle
                          cx="60" cy="60" r="44"
                          fill="none"
                          stroke="#1452FF"
                          strokeWidth="18"
                          strokeDasharray="110.6 165.9"
                          strokeDashoffset="69.1"
                          strokeLinecap="round"
                        />
                        <text x="60" y="55" textAnchor="middle" fill="#0B0B0E" fontSize="22" fontWeight="700" fontFamily="sans-serif">40%</text>
                        <text x="60" y="72" textAnchor="middle" fill="#9A9AA0" fontSize="10" fontFamily="sans-serif">of 52</text>
                      </svg>
                    </div>
                    {/* 凡例 */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 flex-none rounded-full bg-[#1452FF]" />
                        <div>
                          <div className="text-[13px] font-bold text-[#0B0B0E]">結論ファースト構成　21件</div>
                          <div className="text-[12px] text-[#6B6B73]">加点要素として有効</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 flex-none rounded-full bg-[#E6E4DD]" />
                        <div>
                          <div className="text-[13px] font-bold text-[#0B0B0E]">その他の構成　31件</div>
                          <div className="text-[12px] text-[#6B6B73]">必須条件ではない</div>
                        </div>
                      </div>
                      <div className="mt-1 text-[12px] text-[#6B6B73] leading-relaxed border-t border-[#1452FF]/10 pt-3">
                        結論ファーストは<strong>加点要素</strong>。<br />構成以外の要因でも引用されます。
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">特徴2：質問にそのまま答える「パッセージ」が用意されている</h2>
                <p className="article-prose">
                  検索エンジンの内部では、Webページ全体ではなくページ内の特定の段落（パッセージ）を単位として評価する「Passage Ranking」という仕組みがあります。AIの回答生成においても、ページ内の特定の一段落が質問への的確な答えとして抽出される可能性があります。
                </p>
                <p className="article-prose">
                  「ある段落だけを読んでも質問の答えとして成立するか」という単位での設計が重要です。各段落をできるだけ自己完結させることがパッセージ設計の基本です。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    パッセージ設計の3ポイント
                  </div>
                  {PASSAGE_TIPS.map((t, i) => (
                    <div key={t.label} className={`flex items-start gap-4 px-5 py-4 ${i < PASSAGE_TIPS.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="mt-0.5 flex-none rounded bg-[#0B0B0E] px-2 py-0.5 font-mono text-[10px] text-white">{t.label}</span>
                      <span className="text-[14px] text-[#3B3B40]">{t.tip}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">特徴3：具体的な数値・一次データがある</h2>
                <p className="article-prose">
                  AIは抽象的な主張よりも、具体的な数値や検証可能なデータを伴う情報を引用対象として優先的に扱う傾向があります。「多くの企業が導入している」といった曖昧な表現よりも、「58%低下した」「393%増加した」のように出典が明記された具体的な数値のほうが、回答の根拠として採用されやすいということです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>自社調査のデータや独自検証結果</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>業界レポートからの引用（出典明記のもと）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>具体的な事例・数値・変化率</span>
                  </li>
                </ul>

                {/* 横棒グラフ */}
                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#F2F0EA]">
                  <div className="px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase border-b border-[#E6E4DD]">
                    Adobe 2026 Q1：業界別AIトラフィック増加率
                  </div>
                  <div className="flex flex-col gap-0 px-6 py-5">
                    {[
                      { label: "金融", pct: 63 },
                      { label: "メディア", pct: 84 },
                      { label: "旅行", pct: 158 },
                      { label: "食品飲料", pct: 233 },
                      { label: "リテール", pct: 393 },
                    ].map((d, i, arr) => (
                      <div key={d.label} className={`flex items-center gap-4 py-3 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                        <div className="w-[72px] flex-none text-[13px] font-bold text-[#0B0B0E]">{d.label}</div>
                        <div className="flex flex-1 items-center gap-3">
                          <div className="flex-1 h-[22px] rounded-full bg-[#E6E4DD] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#1452FF]"
                              style={{ width: `${(d.pct / 393) * 100}%`, opacity: 0.4 + (d.pct / 393) * 0.6 }}
                            />
                          </div>
                          <div className="w-[52px] flex-none text-right font-mono text-[14px] font-bold text-[#1452FF]">+{d.pct}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-4 text-[11px] text-[#9A9AA0]">出典：Adobe Analytics 2026 Q1 Digital Trends Report</div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">特徴4：FAQ構造で質問と回答が明確に対応している</h2>
                <p className="article-prose">
                  FAQ形式は、質問と回答が一対一で明確に対応しているため、AIが質問とコンテンツを意味的にマッチングする際に扱いやすい構造です。FAQを設計する際のポイントは、本文では深く触れられなかった周辺的な疑問や、読者が次に知りたくなるであろう質問をカバーすることです。
                </p>
                <p className="article-prose">
                  FAQPage構造化データ（スキーマ）をHTMLに実装することで、検索エンジンやAIクローラーに対して「これは質問と回答のペアである」という情報を明示的に伝えることができます。
                </p>

                {/* 独自検証データ — ドーナツ + 凡例 */}
                <div className="my-6 overflow-hidden rounded-xl border border-[#1452FF]/20 bg-[#1452FF]/[0.04]">
                  <div className="px-6 pt-5 pb-1 font-mono text-[10px] tracking-[0.22em] text-[#1452FF] uppercase">Ascent独自検証データ</div>
                  <div className="flex items-center gap-6 px-6 py-5">
                    <div className="flex-none">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="44" fill="none" stroke="#E6E4DD" strokeWidth="18" />
                        {/* 32% — circumference ≈ 276.5 → 88.5 / 188.0 */}
                        <circle
                          cx="60" cy="60" r="44"
                          fill="none"
                          stroke="#1452FF"
                          strokeWidth="18"
                          strokeDasharray="88.5 188.0"
                          strokeDashoffset="69.1"
                          strokeLinecap="round"
                        />
                        <text x="60" y="55" textAnchor="middle" fill="#0B0B0E" fontSize="22" fontWeight="700" fontFamily="sans-serif">32%</text>
                        <text x="60" y="72" textAnchor="middle" fill="#9A9AA0" fontSize="10" fontFamily="sans-serif">of 52</text>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 flex-none rounded-full bg-[#1452FF]" />
                        <div>
                          <div className="text-[13px] font-bold text-[#0B0B0E]">FAQあり　17件</div>
                          <div className="text-[12px] text-[#6B6B73]">加点要素として有効</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 flex-none rounded-full bg-[#E6E4DD]" />
                        <div>
                          <div className="text-[13px] font-bold text-[#0B0B0E]">FAQなし　35件</div>
                          <div className="text-[12px] text-[#6B6B73]">必須条件ではない</div>
                        </div>
                      </div>
                      <div className="mt-1 text-[12px] text-[#6B6B73] leading-relaxed border-t border-[#1452FF]/10 pt-3">
                        FAQ設定も結論ファーストと同様、<br /><strong>加点要素</strong>として捉えるとよいでしょう。
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">特徴5：見出しに網羅性がある</h2>
                <p className="article-prose">
                  AIは単語の一致だけでなく、文章の意味を数値化して比較する技術（Embedding、埋め込みベクトル）を用いて、質問とコンテンツの関連性を評価していると考えられています。
                </p>
                <p className="article-prose">
                  AIに引用される記事は、一つのキーワードに対して想定されるさまざまな角度の質問を見出しとしてカバーしています。たとえば「特徴」というテーマであれば、定義に近い質問、実践方法に関する質問、他の概念との違いに関する質問など、複数の切り口から見出しを設計することで、より幅広い質問パターンに対して意味的な関連性を持たせることができます。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    見出し設計の3つの切り口
                  </div>
                  <div className="article-table article-table--2col">
                    <div className="article-table__head">
                      <div>切り口</div>
                      <div>見出しの例</div>
                    </div>
                    {[
                      { type: "定義・概念", ex: "〇〇とは何か？なぜ重要なのか" },
                      { type: "実践・方法", ex: "〇〇を実装する具体的な手順" },
                      { type: "比較・違い", ex: "〇〇と△△の違いは何か" },
                    ].map((row) => (
                      <div key={row.type} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row.type}</div>
                        <div className="article-table__cell">{row.ex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">特徴6：セマンティックHTMLで構造化されている</h2>
                <p className="article-prose">
                  AIエージェントやクローラーがWebページを解釈する方法は、①画面を画像として読み取る方法、②HTMLの構造を直接読み取る方法、③その両方を組み合わせる方法の大きく3パターンです。AIに引用される記事は、デザイン上の見た目だけでなく、機械が読みやすい構造を備えています。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>見出しタグ（h1〜h3）の階層を飛ばさずに使う</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>箇条書きにすべき情報をテキストで詰め込まない</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>表で示すべきデータを画像ではなくHTMLの表として実装する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>コンテンツをJavaScriptに依存させずSSR（サーバーサイドレンダリング）で提供する</span>
                  </li>
                </ul>
                <p className="article-prose">
                  AIエージェントがウェブサイトをどう読み取るかの詳細は、
                  <Link href="/lab/ai-agent-site" className="text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4">
                    「AIエージェントはウェブサイトをどう見るのか」
                  </Link>
                  で詳しく解説しています。
                </p>
              </section>

              {/* Section 9 */}
              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">特徴7：根拠と出典が明示され、信頼性が担保されている</h2>
                <p className="article-prose">
                  AIが引用元を選ぶ際には、情報の正確性や出典の信頼性も重要な判断材料になっています。これは従来のSEOにおける「E-E-A-T（経験・専門性・権威性・信頼性）」の考え方と地続きにあるものです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>記事の執筆者・監修者のプロフィールを明示する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>公開日や更新日を記載して情報の鮮度を示す</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>外部の信頼できる情報源へのリンクを適切に設置する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>データの出典を明記してデータの信頼性を担保する</span>
                  </li>
                </ul>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    E-E-A-T × AI引用の関係
                  </div>
                  <div className="article-table">
                    <div className="article-table__head">
                      <div>要素</div>
                      <div>AI引用における役割</div>
                      <div>実装例</div>
                    </div>
                    {[
                      ["Experience", "一次情報として優先引用される", "実測データ、導入後の変化、失敗事例"],
                      ["Expertise", "専門的な判断基準として採用される", "比較軸の明示、条件分岐した推奨"],
                      ["Authoritativeness", "第三者評価として信頼シグナルになる", "外部メディア掲載、レビュー言及"],
                      ["Trustworthiness", "誤引用リスクを下げる", "著者・更新日・出典の明記"],
                    ].map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">AIに引用される記事を作成する実践的な進め方</h2>
                <p className="article-prose">
                  まず、記事のテーマに対して読者が抱くであろう質問を幅広く洗い出します。次に、それぞれの質問に対して見出し直下の一段落で完結する回答を用意します。その上で主張を裏付ける具体的なデータや事例を補足し、最後にFAQセクションで本文中に収まりきらなかった周辺的な疑問をカバーします。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    実践ステップ
                  </div>
                  {[
                    { step: "STEP 1", title: "質問の洗い出し", desc: "テーマに対する読者の疑問をできるだけ幅広く列挙する" },
                    { step: "STEP 2", title: "パッセージ設計", desc: "各質問に一段落で完結する回答を用意する" },
                    { step: "STEP 3", title: "データ補足", desc: "主張を裏付ける数値・事例・出典を追加する" },
                    { step: "STEP 4", title: "FAQ追加", desc: "本文に収まりきらない周辺的な疑問をカバーする" },
                    { step: "STEP 5", title: "構造確認", desc: "HTML階層・リスト・表の実装を機械可読な形に整える" },
                  ].map((s, i) => (
                    <div key={s.step} className={`flex items-start gap-4 px-5 py-4 ${i < 4 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex-none rounded-full bg-[#1452FF] px-3 py-0.5 font-mono text-[10px] text-white tracking-[0.12em]">{s.step}</span>
                      <div>
                        <div className="font-bold text-[14px]">{s.title}</div>
                        <div className="text-[13px] text-[#6B6B73]">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 11: FAQ */}
              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">AIに引用されやすい記事に関するFAQ</h2>

                <h3 className="article-h3">既存の記事をAI引用されやすい形にリライトすることは可能ですか？</h3>
                <p className="article-prose">
                  可能です。見出し直下に結論を要約した一文を追加する、根拠の薄い主張に出典を補足する、本文末尾にFAQセクションを追加するといった改修は既存記事にも取り組みやすい施策です。ただし、見出し構成自体に大きな偏りがある場合は構成の見直しから着手する必要があります。
                </p>

                <h3 className="article-h3">文字数が多い記事のほうがAIに引用されやすいのでしょうか？</h3>
                <p className="article-prose">
                  文字数の多さそのものが引用されやすさに直結するわけではありません。重要なのは、想定される質問にどれだけ幅広く、かつ的確に答えられているかという網羅性と精度です。Ascentの独自検証でも、記事ボリュームと引用率の間に明確な相関は確認できませんでした。
                </p>

                <h3 className="article-h3">FAQセクションの質問数に決まりはありますか？</h3>
                <p className="article-prose">
                  明確な決まりはありませんが、5問前後が一般的です。数を増やすことより、本文の内容と重複しない・読者が実際に抱きやすい疑問を選定することのほうが重要です。
                </p>

                <h3 className="article-h3">これらの特徴を満たせば必ずAIに引用されるようになりますか？</h3>
                <p className="article-prose">
                  必ず引用されることを保証するものではありません。AIの回答生成の仕組みはサービスごとに異なり、日々アップデートされています。これらの特徴は引用される可能性を高めるための基本的な加点要素であり、継続的にコンテンツを改善していくことが現実的なアプローチです。
                </p>

                <h3 className="article-h3">SEO対策との優先順位はどうすればよいですか？</h3>
                <p className="article-prose">
                  SEOとGEO（AI引用最適化）は多くの部分が重なります。まずSEOの基本（適切なHTML構造・見出し設計・内部リンク）を整えた上で、結論ファースト・パッセージ設計・FAQ構造などAI引用に特有の要素を追加していくアプローチが最も効率的です。
                </p>
              </section>

              {/* Section 12: まとめ */}
              <section id="s12" className="article-section">
                <span className="article-kicker">12</span>
                <h2 className="article-h2">まとめ</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AIに引用される記事の特徴は従来のSEOの基本とも重なっており、SEOとGEOを統合的なコンテンツ戦略として取り組むことが現実的です。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  AIに引用される記事には、①結論ファーストの構成、②質問にそのまま答えるパッセージ設計、③具体的な数値や一次データの提示、④FAQによる質問と回答の明確な対応、⑤意味的に網羅性のある見出し設計、⑥セマンティックHTMLによる構造化、⑦根拠と出典の明示、という7つの特徴があります。
                </p>
                <p className="article-prose">
                  Ascent GEO・LLMOでは、これらの特徴に加えて、特許分析・実消費者インテント・質問クラスター・GAP分析・GEOコンテンツ制作・AI Visibilityモニタリングを組み合わせて、AI検索時代のブランド戦略を支援しています。
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <SeoGeoCTASection />
    </div>
  );
}
