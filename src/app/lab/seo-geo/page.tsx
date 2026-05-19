import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { ArticleTOC } from "./ArticleTOC";
import { RelatedResearchSection } from "@/components/lab/RelatedResearchSection";
import seoGeoImage from "./seo-geo.png";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較";
const PAGE_DESCRIPTION =
  "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策です。違いと実践方法を比較表を用いてわかりやすく解説します。";

const SEO_EVALUATION = [
  "関連性：ユーザーの検索意図とページの内容がどれだけ一致しているか",
  "信頼性：被リンクの数や質、ドメインの権威性（オーソリティ）",
  "ページ品質：読み込み速度、モバイル対応、コアウェブバイタルなどの技術的指標",
];

const SEO_FEATURES = [
  "狙ったキーワードを適切な密度で含む",
  "ユーザーの検索意図を的確に満たす構成になっている",
  "他サイトからのリンクが集まるほどの情報価値がある",
  "定期的に更新されており、情報の鮮度が保たれている",
];

const GEO_FEATURES = [
  "質問形式のタイトルと、冒頭での明確な回答がある",
  "数値・データ・引用など、AIが参照しやすいファクトが豊富に含まれている",
  "FAQ構造（Q&A形式）が整備されており、フォローアップ質問に対応している",
  "JSON-LDスキーマなど、構造化データが実装されている",
  "1ページだけで疑問が完結できる情報の完結性がある",
];

const COMPARISON_ROWS = [
  ["最適化の対象", "Google・Bingなどの検索エンジン", "ChatGPT・Gemini・Perplexityなどの生成AI"],
  ["評価の主体", "アルゴリズムによるランキング", "AIモデルによる引用・参照"],
  ["ユーザーの行動", "キーワードを入力→結果一覧からクリック", "質問を入力→AIが要約した回答を受け取る"],
  ["重視されるもの", "被リンク・キーワード密度・ページ速度", "ファクト・構造化データ・完結性・引用元の明確さ"],
  ["タイトル形式", "キーワードを含む端的な表現", "「〜とは？」「〜の違いは？」などの質問形式"],
  ["見出しの役割", "キーワードを含む構成の整理", "ユーザーのサブ質問に1:1で対応する"],
  ["成果の指標", "検索順位・オーガニックトラフィック", "AI回答への引用率・ブランドの露出頻度"],
  ["スキーマ実装", "あると有利（必須ではない）", "FAQ・Q&AのJSON-LDは必須レベル"],
];

const SEVEN_PRINCIPLES = [
  "質問形式のH1タイトルにする：「〜とは？」「〜の違いは？」という形式で、50文字以内・核心キーワードを含むタイトルを設定する。",
  "冒頭に核心的な回答を置く：AIはページの最初のパッセージを優先して引用するため、スクロールなしで回答が読めるよう導入文を設計する。",
  "H2をサブ質問に1:1でマッピングする：各H2見出しがユーザーのフォローアップ質問に対応する形で構成する。「質問形式のH2」を意識する。",
  "数値・引用・データを積極的に入れる：「便利です」などの抽象表現を避け、具体的な数値や信頼できるデータを根拠として示す。",
  "「つまり」結論ボックスを設ける：このページだけで判断・理解が完結するよう、まとめセクションに結論を明示する。",
  "クラスターキーワードを自然に含める：関連キーワードを各セクションに2〜3個程度、不自然にならない形で盛り込む。",
  "FAQ・Q&AにJSON-LDスキーマを適用する：構造化データを実装することで、AIがコンテンツを正確に解釈しやすくなる。",
];

const FAQ = [
  {
    q: "SEOをやっていればGEOは不要ですか？",
    a: "SEOとGEOは補完関係にあります。SEOだけでは生成AIの回答に引用されにくく、GEOだけでは従来の検索流入が期待できません。両方の施策を組み合わせることで、検索エンジンにも生成AIにも対応した強いコンテンツを作れます。",
  },
  {
    q: "GEOの効果はどうやって測定すればよいですか？",
    a: "GEOの直接的な効果測定はSEOより難しいのが現状です。ChatGPTやGeminiに自社ブランドや関連キーワードを入力して回答内に引用されているか定期的に確認する方法や、ブランド名での検索流入の変化を追う方法が有効です。",
  },
  {
    q: "GEOに対応するには、既存記事をすべて書き直す必要がありますか？",
    a: "すべてを書き直す必要はありません。まずは流入数の多い重要記事から優先して対応するのが現実的です。冒頭への結論追加・FAQセクションの設置・構造化データの実装といった部分的なリライトから始めると、効率よくGEO対策を進められます。",
  },
  {
    q: "小規模サイトでもGEOの効果はありますか？",
    a: "あります。生成AIは被リンク数よりもコンテンツの質・構造・ファクトの豊富さを重視する傾向があるため、大手サイトに劣る小規模サイトでも、質の高いGEO対応コンテンツを作成すれば引用される可能性があります。専門性の高いニッチなテーマほど、小規模サイトに有利な場合もあります。",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/seo-geo",
});

export const dynamic = "force-static";

export default function SeoGeoArticlePage() {
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
                <span className="text-[#FAFAF7]">SEO / GEO</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                FEATURED RESEARCH · SEO / GEO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">SEOとGEOは何が違うのか？</span>
                <span className="block text-[#1452FF]">検索最適化と生成AI最適化を比較。</span>
              </h1>

              <p className="article-hero__lede">
                SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策です。違いと実践方法を比較表を用いてわかりやすく解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.13" },
                  { l: "LENGTH", v: "約4,500文字" },
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
                <Image
                  src={seoGeoImage}
                  alt="SEOとGEOの記事ビジュアル"
                  className="h-auto w-full object-cover"
                  priority
                />
              </figure>

              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h4 className="article-h4">
                  【結論】
                </h4>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">SEO：検索エンジンの上位表示を狙う施策</p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">GEO：生成AIに引用されやすくするための施策</p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  「SEOはやっているけど、最近サイトへの流入が伸び悩んでいる」と感じていませんか？
                </p>
                <p className="article-prose">
                  その原因の一つとして、生成AIによる情報収集の変化が挙げられます。ChatGPTやGeminiといった生成AIを使って情報を調べる人が増えており、従来の「Googleで検索する」という行動パターンが変わりつつあります。
                </p>
                <p className="article-prose">
                  この記事を読めば、SEO（検索エンジン最適化）とGEO（生成エンジン最適化）の違いと、それぞれに必要な施策が明確になります。
                </p>
              </section>

              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">
                  SEOとは？仕組みとポイントをおさらい
                </h2>
                <p className="article-prose">
                  SEO（Search Engine Optimization）は、GoogleやBingなどの検索エンジンで上位表示されるようにコンテンツを最適化する手法です。ユーザーが検索したキーワードに対して、検索エンジンが「最も関連性・信頼性が高い」と判断したページを上位に表示する仕組みを利用します。
                </p>
                <h3 className="article-h3">
                  SEOの主な評価基準
                </h3>
                <p className="article-prose">
                  Googleはウェブページを評価する際、主に以下の3つの観点からスコアリングを行っています。
                </p>
                <ul className="article-list">
                  {SEO_EVALUATION.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="article-prose">
                  SEOの世界では「E-E-A-T（経験・専門性・権威性・信頼性）」と呼ばれる概念が重視されており、一次情報や実体験に基づいたコンテンツが高く評価される傾向にあります。
                </p>
                <h3 className="article-h3">
                  SEOで重視されるコンテンツの特徴
                </h3>
                <ul className="article-list">
                  {SEO_FEATURES.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">
                  GEOとは？生成AIが変えた「検索」の形
                </h2>
                <p className="article-prose">
                  GEO（Generative Engine Optimization）は、ChatGPT・Gemini・Perplexityといった生成AIが回答を生成する際に、自分のコンテンツが引用・参照されやすくするための最適化手法です。2024年ごろから注目を集めており、2026年現在では「AIオーバービュー」を導入したGoogleの影響もあり、急速に重要性が高まっています。
                </p>
                <p className="article-prose">
                  生成AIは検索エンジンとは異なる仕組みで情報を処理します。ユーザーが質問を入力すると、AIは複数のウェブページや学習データを参照し、「最も的確な回答」を自分の言葉でまとめて提示します。そのため、検索エンジンのランキングに乗るだけでは、AIの回答に引用されるとは限りません。
                </p>
                <h3 className="article-h3">
                  GEOで重視されるコンテンツの特徴
                </h3>
                <ul className="article-list">
                  {GEO_FEATURES.map((item) => (
                    <li key={item} className="article-list__item">
                      <span className="article-list__bullet">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">
                  SEOとGEOの違いを比較表で確認する
                </h2>
                <p className="article-prose">
                  SEOとGEOは「コンテンツを最適化する」という方向性は同じですが、最適化の対象（誰・何に向けて書くか）が根本的に異なります。以下の表で主要な違いを整理します。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>比較項目</div>
                    <div>SEO（検索エンジン最適化）</div>
                    <div>GEO（生成エンジン最適化）</div>
                  </div>
                  {COMPARISON_ROWS.map((row) => (
                    <div
                      key={row[0]}
                      className="article-table__row"
                    >
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  SEOは「検索結果の一覧に表示されること」を目指しますが、GEOは「AIが生成する回答の中に自分のコンテンツが引用されること」を目指します。ゴールが異なるため、施策の内容も自然と変わってきます。
                </p>
              </section>

              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">
                  なぜ今GEOが注目されているのか
                </h2>
                <p className="article-prose">
                  生成AIの普及速度は予想をはるかに上回っています。2025年時点でChatGPTのユーザー数は月間1億人を超え、GoogleもAIO（AI Over view）を検索結果に組み込むようになりました。この変化により、検索エンジンの上位に表示されていても、AIが回答を生成してしまうことでクリックが発生しないケースが増えています。
                </p>
                <h3 className="article-h3">
                  ゼロクリック検索の増加
                </h3>
                <p className="article-prose">
                  AIが検索結果の上部に直接回答を表示すると、ユーザーはわざわざページを開かずに情報を得られます。これが「ゼロクリック検索」と呼ばれる現象で、SEOだけに頼るコンテンツ戦略のリスクが高まっています。SEOとGEOを組み合わせることで、「検索エンジンにも強く、AIにも引用されやすい」コンテンツを実現できます。
                </p>
                <h3 className="article-h3">
                  AIが参照するコンテンツの条件
                </h3>
                <p className="article-prose">
                  生成AIは「信頼できる情報源」を優先して参照する傾向があります。具体的には、以下の条件を満たすページが引用されやすいとされています。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    数値や統計データが明確に示されている
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    一次情報（独自調査・実体験）が含まれている
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    構造が明快で、質問と回答の関係が明確になっている
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    権威性のある著者・監修者情報が記載されている
                  </li>
                </ul>
              </section>

              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">
                  GEOを実践するための7つの原則
                </h2>
                <p className="article-prose">
                  GEOに最適化されたページを作成するために、次の7つの原則を意識することが重要です。SEO施策とも相性がよく、両立して取り組める内容です。
                </p>
                <div className="article-principles-grid">
                  {SEVEN_PRINCIPLES.map((item, index) => (
                    <div key={item} className="article-principle-card">
                      <div className="article-principle-card__number">{index + 1}</div>
                      <div className="article-principle-card__text">{item}</div>
                    </div>
                  ))}
                </div>
                <p className="article-prose">
                  これら7つの原則はGEO対策であると同時に、読者にとっての「読みやすさ」「わかりやすさ」を高める施策でもあります。SEOとGEO、そして読者体験の3つを同時に向上させられる点が、GEO最適化の大きなメリットです。
                </p>
              </section>

              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">
                  GEOに強い「質問設計」をするために
                </h2>
                <p className="article-prose">
                  GEO最適化において、「どのような質問をユーザーがAIに投げかけているか」を正確に把握することは、コンテンツ設計の出発点であり、最も重要なステップです。
                </p>
                <p className="article-prose">
                  弊社では、消費者インサイトを分析できるツール「リスニングマインド（ListeningMind）」を開発・提供しています。リスニングマインドは、Googleの実際の検索データをもとに消費者の検索行動パターンを可視化するツールで、「消費者がどのような言葉でAIに質問するか」を実データから導き出すことができます。
                </p>
                <p className="article-prose">
                  架空の質問や想定ではなく、実際の消費者の悩みベースで質問クラスターを作成できるため、AIに引用されやすい「本当に答えるべき質問」を特定することが可能です。CDJ（消費者購買ジャーニー）の各ステージに対応した質問群を自動生成し、GEOコンテンツ設計の精度を大きく高めます。
                </p>
                <p className="article-prose">
                  リスニングマインドを活用したGEO質問設計にご興味のある方は、ぜひお気軽にお問い合わせください。
                </p>
              </section>

              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">
                  SEOとGEOに関してよくある質問（FAQ）
                </h2>
                <div className="article-faq">
                  {FAQ.map((item) => (
                    <div key={item.q} className="article-faq__item">
                      <div className="article-faq__q">
                        <span className="article-faq__q-label">Q</span>
                        <h4 className="article-h4">{item.q}</h4>
                      </div>
                      <div className="article-faq__a">
                        <span className="article-faq__a-label">A</span>
                        <p className="article-faq__answer">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">
                  まとめ
                </h2>
                <p className="article-prose">
                  SEOとGEOの違いは以下の通りです。
                </p>
                <p className="article-prose">
                  SEOは「検索エンジンのランキングで上位表示されること」を目的とした最適化であり、GEOは「生成AIの回答の中で引用・参照されること」を目的とした最適化です。
                </p>
                <p className="article-prose">
                  2026年現在、ユーザーの情報収集行動は急速にAIシフトしており、SEOだけに依存するコンテンツ戦略には限界が見え始めています。今後を見据えるなら、以下の3点を押さえておきましょう。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    SEOとGEOは対立するものではなく、組み合わせて活用するもの
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    GEOでは「質問形式の構成」「ファクトの充実」「FAQ構造」が鍵になる
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    既存コンテンツへの部分的なGEO対応から、無理なく始められる
                  </li>
                </ul>
                <p className="article-prose">
                  まずは自社の主要コンテンツをGEOの7原則に照らし合わせてチェックすることから始めてみてください。小さな改善の積み重ねが、生成AI時代のコンテンツ競争力を大きく左右します。
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <RelatedResearchSection currentSlug="seo-geo" />

      <div className="article-cta">
        <CTASection
          kicker="GEO対策、まずは無料相談から"
          title={
            <>
              GEO対策、
              <br />
              まずは無料相談から
            </>
          }
          description={
            <>
              「自社コンテンツはGEOに対応できているか？」「どの質問からGEO対策を始めるべきか？」
              そのような疑問・課題をお持ちの方に向けて、弊社では無料の初回相談を受け付けています。
              <br />
              <br />
              GEO戦略の立案から、リスニングマインドを活用した質問クラスター設計、コンテンツ改善の優先順位付けまで、
              御社の状況に合わせた具体的なアドバイスをご提供します。お問い合わせから24時間以内にご返信いたします。
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
