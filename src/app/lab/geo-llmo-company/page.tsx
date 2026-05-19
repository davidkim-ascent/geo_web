import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleTOC } from "./ArticleTOC";
import companyComparisonImage from "./company-comparison.png";

const PAGE_TITLE = "GEO/LLMO対策におすすめの会社7選を徹底比較";
const PAGE_DESCRIPTION =
  "GEO/LLMO対策会社7社を4つの型で整理し、選び方の5つの基準、費用相場、FAQまでまとめた比較記事。質問データ起点のAscent Networksを含む主要プレイヤーを一望できます。";

const TYPE_ROWS = [
  ["SEO老舗対応型", "SEO実績10〜20年の老舗。GEOは既存SEOの拡張機能として提供。", "ジオコード / SEOジャパン"],
  ["GEO/LLMO専業型", "いち早くLLMOを前面に出した専業ポジション。サービスライン多数。", "東京SEOメーカー / メディアグロース"],
  ["ツール+コンサル融合型", "GEO計測ツールを軸に、コンサルへのアップセル構造。", "ミエルカ / ニュートラルワークス"],
  ["需要起点型", "ユーザーの実際の質問データから逆算してコンテンツを設計。", "Ascent Networks"],
];

const COMPANIES = [
  {
    name: "Ascent Networks",
    type: "需要起点型",
    origin: "ユーザーの質問データ",
    strength: "リスニングマインド・特許ベース設計",
    fit: "質問データから逆算したい企業",
  },
  {
    name: "ジオコード",
    type: "SEO老舗対応型",
    origin: "サイト診断",
    strength: "東証上場・20年実績",
    fit: "信頼性重視の大手企業",
  },
  {
    name: "SEOジャパン",
    type: "SEO老舗対応型",
    origin: "サイト診断",
    strength: "E-E-A-T・コンテンツ品質",
    fit: "メディアサイト運営企業",
  },
  {
    name: "東京SEOメーカー",
    type: "GEO/LLMO専業型",
    origin: "サイト診断",
    strength: "業界最多サービスライン",
    fit: "包括対応を望む企業",
  },
  {
    name: "メディアグロース",
    type: "GEO/LLMO専業型",
    origin: "サイト診断",
    strength: "業界最速・低価格",
    fit: "小さく始めたい企業",
  },
  {
    name: "ミエルカ",
    type: "ツール+コンサル融合型",
    origin: "計測・可視化",
    strength: "計測ツール + コンサル",
    fit: "数字で現状把握したい企業",
  },
  {
    name: "ニュートラルワークス",
    type: "ツール+コンサル融合型",
    origin: "総合デジマ",
    strength: "SEO・UI/UX・広告の総合力",
    fit: "デジタル全般を外注したい企業",
  },
];

const CHOICE_POINTS = [
  "「サイト診断起点」か「質問データ起点」かを確認する",
  "対応するAIエンジンの範囲を確認する",
  "効果測定のKPIとレポート頻度を確認する",
  "SEO実績の有無を確認する",
  "料金体系と最低契約期間を確認する",
];

const PRICE_ROWS = [
  ["初期診断（単発）", "20万〜100万円", "AI可視性診断・競合比較・改善提案"],
  ["月額コンサルティング", "月額20万〜100万円", "戦略立案・コンテンツ設計・モニタリング"],
  ["コンテンツ制作", "1本5万〜30万円", "Passage最適化・FAQ・Schema実装"],
  ["フルパッケージ（年間）", "年間500万〜2,000万円", "診断・コンサル・制作・運用を一括"],
];

const FAQ = [
  {
    q: "GEO対策の効果はどれくらいの期間で出ますか?",
    a: "一般的に4〜6週間で初期の引用変化が見え始め、3〜6カ月で明確な差が出るケースが多いです。ただし既存コンテンツの状態や対象キーワードの競争度合いによって変動します。",
  },
  {
    q: "SEO対策と並行して進めても問題ありませんか?",
    a: "問題ありません。むしろSEOで上位表示されているコンテンツはAIにも参照されやすいため、相乗効果が期待できます。SEOとGEOを一体で運用する会社も増えています。",
  },
  {
    q: "中小企業でもGEO対策は必要ですか?",
    a: "業種にもよりますが、AI検索の利用率が高まる中で、BtoB領域では特に必要性が高まっています。月額20万円台から始められるサービスもあるため、まずは小規模に始めることも可能です。",
  },
  {
    q: "GEO対策は内製でもできますか?",
    a: "質問形ヘッダーの導入、FAQ Schemaの実装など、基本的な施策は内製でも可能です。ただし、質問データの体系的な収集や、複数AIでの効果測定には専門ツールが必要なため、外部パートナーの活用が効率的です。",
  },
  {
    q: "どの会社も同じようなサービスに見えます。違いはどこにありますか?",
    a: "表面的なサービスメニューは類似していても、設計思想に大きな違いがあります。『サイトを診断して直す』のか『ユーザーの質問から逆算する』のかを確認すると、各社の本質的な違いが見えてきます。",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: `${PAGE_TITLE} - 株式会社 Ascent Networks`,
  description: PAGE_DESCRIPTION,
  path: "/lab/geo-llmo-company",
  keywords: ["GEO対策", "LLMO対策", "比較", "会社", "生成AI最適化", "AI検索最適化"],
});

export const dynamic = "force-static";

export default function GeoLlmoCompanyArticlePage() {
  return (
    <div className="article-page">
      <section
        className="hero-fixed article-hero relative"
        style={{
          background: "var(--hero-gradient)",
          minHeight: "0",
        }}
      >
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
                <Link href="/" className="transition-colors hover:text-[#FAFAF7]">
                  HOME
                </Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FAFAF7]">
                  GEO LAB
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FAFAF7]">GEO LLMO 会社比較</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO LLMO 会社比較
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">GEO/LLMO対策におすすめの会社</span>
                <span className="block text-[#1452FF]">7選を徹底比較</span>
              </h1>

              <p className="article-hero__lede">
                サイト診断起点か、質問データ起点か。4つの型で見る選び方
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.19" },
                  { l: "LENGTH", v: "約8,000文字" },
                  { l: "FORMAT", v: "GUIDE" },
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
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h4 className="article-h4">
                  【結論】GEO/LLMO対策会社は「質問データ起点」から設計するAscent Networksがおすすめ
                </h4>
                <div className="article-callout">
                  <p className="text-[18px] font-semibold leading-[1.7] text-[#0B0B0E]">
                    「ChatGPTに自社サービスを聞いたら、競合の名前ばかりが出てきた」と感じたことはありませんか。
                  </p>
                </div>
                <p className="article-prose">
                  AI検索の利用が一気に広がる中で、自社が引用されないという課題に直面する企業が増えています。GEO/LLMO対策の必要性は分かっていても、どの会社に頼めばよいかの判断は難しいのが現状です。
                </p>
                <p className="article-prose">
                  この記事を読めば、日本の主要なGEO対策会社7社の特徴と違いを4つの型で把握できます。さらに、自社の課題に合うパートナーを選ぶための5つの基準も整理しています。
                </p>
              </section>

              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">そもそもGEO対策とは何か</h2>
                <p className="article-prose">
                  GEO(Generative Engine Optimization)とは、ChatGPT、Gemini、Perplexity、Google AI Overviewなどの生成AIに、自社のコンテンツを引用・推薦してもらうための最適化施策を指します。LLMO(Large Language Model Optimization)もほぼ同義で使われます。
                </p>
                <p className="article-prose">
                  従来のSEOが「検索結果ページの上位表示」を目指す施策であるのに対し、GEOは「AIの回答文に自社が組み込まれる」状態を目指します。クリックされて訪問されるのではなく、AIの回答そのものに引用されることが新しい露出の形になります。
                </p>

                <h3 className="article-h3">SEO と GEO の違い(比較表)</h3>
                <div className="article-table">
                  <div className="article-table__head">
                    <div>比較軸</div>
                    <div>SEO</div>
                    <div>GEO(LLMO)</div>
                  </div>
                  {[
                    ["対象", "Google・Yahoo!などの検索エンジン", "ChatGPT・Gemini・Perplexity・AI Overview"],
                    ["ゴール", "検索結果ページでの上位表示", "AIの回答文での引用・推薦"],
                    ["評価単位", "ページ全体・キーワード", "パッセージ(文節)・質問への意味的一致"],
                    ["ユーザー行動", "検索結果をクリックして訪問", "AIの回答で完結 or 引用元として遷移"],
                    ["成果指標", "検索順位・流入数・CTR", "引用率・Brand Visibility・Share of Voice"],
                  ].map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <p className="article-prose">
                  両者は対立するものではありません。AI検索の多くは検索結果上位のコンテンツを参照するため、SEOで評価される土台があるサイトはGEOでも有利になります。
                </p>
                <p className="article-prose">
                  <Link href="/lab/seo-geo" className="text-[#1452FF] hover:underline">
                    関連記事：SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較。
                  </Link>
                </p>
              </section>

              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">なぜ今、GEO対策会社への相談が増えているのか</h2>
                <p className="article-prose">
                  AI検索の利用は現在も加速度的に増加しています。海外の調査レポートによれば、生成AI経由のトラフィックは従来のSEO経由と比べてCVR(コンバージョン率)が約23倍高いというデータも報告されています。比較検討段階のユーザーがAIの回答を意思決定に直結させているからです。
                </p>
                <p className="article-prose">
                  特にBtoB領域では、AIに「おすすめのSaaSは?」と聞かれた際に推薦された企業が、そのまま問い合わせリストに入るケースが増加しています。今までは営業力で優っていて契約につながっていてもAIの回答で他社を推奨していた場合、負けてしまう可能性もあります。
                </p>
                <p className="article-prose">
                  この変化を背景に、2025年後半から2026年にかけて日本国内でも、GEO/LLMO対策を専門に掲げる会社が一気に増えました。次の章では、その中でも実績と専門性が確認できる主要7社を比較していきます。
                </p>
              </section>

              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">GEO対策会社は4つの型に分かれる</h2>
                <p className="article-prose">
                  Ascentが日本のGEO対策会社を独自に調査した結果、各社のサービスは表面的には似ていますが、設計思想に着目すると明確に4つの型に分類できることが分かりました。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>型</div>
                    <div>特徴</div>
                    <div>代表的な会社</div>
                  </div>
                  {TYPE_ROWS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  多くの会社が「サイト診断 → 構造最適化 → コンテンツ修正」という供給側の起点でGEOを設計しています。一方、「ユーザーが実際にAIに何を質問しているか」という需要側の起点から逆算するプレイヤーは、現時点で極めて少数です。
                </p>
              </section>

              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">ポジショニングマップ: 各社はどこに位置するか</h2>
                <p className="article-prose">
                  4つの型を2軸で可視化したのが下のポジショニングマップです。横軸は「対策の起点(サイト中心 or ユーザー中心)」、縦軸は「サービスの主軸(戦略コンサルティング or ツール/プラットフォーム)」を示しています。
                </p>

                <figure className="my-8 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#FAFAF7] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                  <Image
                    src={companyComparisonImage}
                    alt="GEO/LLMO対策会社ポジショニングマップ"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </figure>

                <h3 className="article-h3">ポジショニングマップから読み取れる3つのこと</h3>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    競合6社はすべて左側(サイト中心象限)に集中しており、差別化が薄く価格競争に陥りやすい構造になっている
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    右上(ユーザー中心 × 戦略コンサル)象限はAscent Networksが独占しており、需要起点で戦略を設計するプレイヤーは他に存在しない
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    計測ツール系(ミエルカ・ニュートラルワークス)は左下に位置し、可視化は強いが戦略設計の深度は限定的
                  </li>
                </ul>
              </section>

              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">GEO(LLMO)対策におすすめの会社7選</h2>
                <p className="article-prose">
                  ここからは、2026年5月時点で実績と専門性が確認できる7社を、上記の4つの型に沿って紹介します。各社の特徴を一覧で確認できるよう、主要な比較軸でまとめました。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>会社名</div>
                    <div>型 / 起点</div>
                    <div>特徴的な強み / 向いている企業</div>
                  </div>
                  {COMPANIES.map((row) => (
                    <div key={row.name} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row.name}</div>
                      <div className="article-table__cell">
                        {row.type}
                        <br />
                        {row.origin}
                      </div>
                      <div className="article-table__cell article-table__cell--accent">
                        {row.strength}
                        <br />
                        {row.fit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="article-callout">
                  <p className="text-[16px] leading-[1.75] text-[#0B0B0E]">
                    <strong>Ascent Networks</strong> は、日本で唯一「ユーザーのニーズを調査しAIに実際に問いかけている質問の生成」から起点にGEOを設計するコンサルティング会社です。
                  </p>
                </div>
              </section>

              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">GEO対策会社の選び方 失敗しない5つのポイント</h2>
                <p className="article-prose">
                  7社の中から自社に合う1社を選ぶには、以下の5つの基準で評価することをおすすめします。
                </p>
                <ul className="article-list">
                  {CHOICE_POINTS.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="article-prose">
                  これが最も重要な分岐点です。多くの会社は「現在のサイトを診断して構造を最適化する」アプローチをとります。これは「既存のコンテンツを直す」発想です。一方で、「ユーザーがAIに実際に何を質問しているか」を把握した上で、足りないコンテンツを新規作成する発想が「ないものを作る、新規作成」アプローチです。
                </p>
              </section>

              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">GEO対策の費用相場はいくらか</h2>
                <p className="article-prose">
                  2026年5月時点での費用相場を整理すると、以下の通りです。
                </p>
                <div className="article-table">
                  <div className="article-table__head">
                    <div>サービス種別</div>
                    <div>料金相場</div>
                    <div>内容</div>
                  </div>
                  {PRICE_ROWS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>
                <p className="article-prose">
                  対象キーワード数、サイト規模、支援範囲によって料金は変動します。複数社から見積もりを取り、料金と支援内容のバランスを比較することをおすすめします。
                </p>
              </section>

              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">GEO対策会社に依頼する前に整理すべき5つのこと</h2>
                <p className="article-prose">
                  会社選びの精度を上げるには、相談前に自社側で以下を整理しておくと効果的です。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    目的の明確化: なぜGEO対策をするのか、ゴールは何か
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    対象キーワード・質問の仮説: 顧客がAIに聞きそうな質問を10〜20個書き出す
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    現状の課題: SEOやコンテンツマーケで困っていることは何か
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    予算と期間: 単発か継続か、月額の許容範囲
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    社内リソース: 実装・コンテンツ制作を内製できるか、外注必須か
                  </li>
                </ul>
              </section>

              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">GEO対策会社に関してよくある質問</h2>
                <div className="article-faq">
                  {FAQ.map((item) => (
                    <div key={item.q} className="article-faq__item">
                      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-[#1452FF]">Q</div>
                      <h4 className="article-h4">{item.q}</h4>
                      <div className="font-mono text-[10px] tracking-[0.18em] text-[#6B6B73]">A</div>
                      <p className="article-faq__answer mt-2">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">まとめ 自社に合う1社を見極めるために</h2>
                <p className="article-prose">
                  本記事では、日本のGEO/LLMO対策会社7社を4つの型で整理し、選び方の5つのポイントを解説しました。重要なポイントを最後に振り返ります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    GEO対策会社は「SEO老舗対応型」「GEO/LLMO専業型」「ツール+コンサル融合型」「需要起点型」の4類型がある
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    ポジショニングマップで見ると、競合6社は左側に集中し、右上(ユーザー中心 × 戦略コンサル)はAscentが独占
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    選び方の5つの基準: 起点・対応AI範囲・KPI・SEO実績・料金体系
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    費用相場は月額20万〜100万円、初期診断は20万〜100万円
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    相談前に目的・質問仮説・課題・予算・リソースを整理する
                  </li>
                </ul>
                <p className="article-prose">
                  AI検索の世界では「比較検討の主戦場」がGoogle検索からAI回答へと移りつつあります。早期に対策を始めた企業ほど引用ポジションを獲得しやすい構造です。本記事を参考に、自社に最適なパートナーを見つけてください。
                </p>

                <div className="article-callout">
                  <p className="text-[16px] leading-[1.75] text-[#0B0B0E]">
                    <strong>監修</strong>
                    <br />
                    株式会社Ascent Networks GEO戦略室。Google・Microsoftの検索特許分析と、リスニングマインドの日本語AI質問データを軸に、需要起点のGEO戦略を提供。Samsung Japanをはじめとする企業のAI Visibility改善を支援。
                  </p>
                </div>

                <p className="article-prose">
                  <strong>出典・参考</strong>
                  <br />
                  各社サービスページ、公開資料、業界調査レポート(2026年5月時点)。本記事の情報は2026年5月19日時点の最新情報に基づいて作成しました。
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <div className="article-cta">
        <CTASection
          kicker="GEO/LLMO対策、まずは無料相談から"
          title={
            <>
              GEO/LLMO対策、
              <br />
              まずは無料相談から
            </>
          }
          description={
            <>
              「どの会社に相談すべきか迷っている」「質問データ起点での設計を一度見てほしい」
              という方に向けて、Ascent Networksでは無料の初回相談を受け付けています。
              <br />
              <br />
              現状診断から、質問群の整理、GEO/LLMOコンテンツの優先順位付けまで、御社の状況に合わせて具体的にご提案します。
            </>
          }
          primaryButton={{ href: "/contact", label: "相談する" }}
          secondaryButtons={[
            { href: "/whitepaper", label: "サービス資料をダウンロード" },
            { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）" },
          ]}
        />
      </div>
    </div>
  );
}
