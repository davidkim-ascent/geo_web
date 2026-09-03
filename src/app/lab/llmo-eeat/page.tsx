import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "LLMOにおけるE-E-A-Tの重要性";
const PAGE_DESCRIPTION =
  "LLMOではE-E-A-TがAIに引用・推薦されるための信頼シグナルになる。Experience、Expertise、Authoritativeness、Trustworthinessを実務でどう設計するかを整理する。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/llmo-eeat",
  keywords: ["LLMO", "E-E-A-T", "EEAT", "GEO", "信頼性", "InformationGain"],
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

export default function LlmoEeatArticlePage() {
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
                <Link href="/" className="transition-colors hover:text-[#FDFDFB]">
                  HOME
                </Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FDFDFB]">
                  GEO LAB
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FDFDFB]">LLMO / E-E-A-T</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                RESEARCH NOTE · LLMO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">LLMOにおける</span>
                <span className="block text-[#1452FF]">E-E-A-Tの重要性</span>
              </h1>

              <p className="article-hero__lede">
                LLMOではE-E-A-Tが、検索順位のための評価軸にとどまらず、AIに引用・推薦されるための信頼シグナルになります。Experience、Expertise、Authoritativeness、Trustworthinessをどう実装するかを整理します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.06.22" },
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
              <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <ArticleThumbnail variant="llmo-eeat" eyebrow="LLMO / E-E-A-T" className="h-[260px] w-full" />
              </figure>

              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">結論：LLMOでE-E-A-Tは「信頼設計」になる</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    LLMOにおけるE-E-A-Tは、AIが「この情報は引用してよい」「このブランドは答えに含めてよい」と判断するための信頼インフラです。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  E-E-A-T（Experience、Expertise、Authoritativeness、Trustworthiness）は、Googleの検索品質評価だけでなく、生成AIが回答を作るときの参照判断にも強く関わります。特に重要なのはTrust、つまり情報の信頼性です。Experience、Expertise、Authoritativenessは、そのTrustを支える材料として機能します。
                </p>
                <p className="article-prose">
                  参考として、Google はヘルプフルコンテンツの考え方を公開しています。
                  {" "}
                  <a
                    href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4"
                  >
                    Google Search Central のガイド
                  </a>
                  もあわせて確認すると、E-E-A-Tを「単なるチェック項目」ではなく「信頼の設計図」として捉えやすくなります。
                </p>
              </section>

              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">なぜLLMOでE-E-A-Tが重要なのか</h2>
                <p className="article-prose">
                  従来のSEOでは、ユーザーは検索結果を見て複数ページを比較していました。しかし <Link href="/lab/what-is-llmo" className="text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4">LLMO</Link> では、ChatGPT、Perplexity、Gemini、AI Overview のようなAIが複数ソースを要約し、ひとつの「答え」として提示します。
                </p>
                <p className="article-prose">
                  そのため、単に上位表示されるだけでは足りません。AIに次のように判断される必要があります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>この情報は信頼できる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>このブランドはこのテーマの専門家である</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>このページは引用しても問題ない</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>この会社・著者・外部評価に一貫性がある</span>
                  </li>
                </ul>
                <p className="article-prose">
                  さらに、AIは自社サイトだけを見て判断するとは限りません。レビューサイト、比較記事、Q&A、SNS、動画、業界メディアなど、Web 上の複数の情報を横断して、どのブランドや情報源を回答に含めるかを決めます。
                </p>
                <p className="article-prose">
                  だからこそ、自社サイトの整備だけでなく、外部での信頼ある言及を増やすことが重要です。たとえばレビューサイト、比較記事、プレスリリース、専門家の発信、YouTube、コミュニティ投稿などで、同じブランドが一貫した文脈で語られている状態が理想です。
                </p>
              </section>

              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">E-E-A-Tの4要素をLLMOでどう実装するか</h2>
                <p className="article-prose">
                  E-E-A-Tは概念のままでは使えません。LLMO では、それぞれを AI と読者の両方が読み取りやすい形に落とし込む必要があります。
                </p>
                <p className="article-prose">
                  まずは全体像を掴み、そのあとで各要素を別々に見ていくと整理しやすくなります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>Experience：</strong>実体験、検証結果、現場で起きたこと</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>Expertise：</strong>判断基準、比較軸、選び方の根拠</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>Authoritativeness：</strong>第三者評価、外部掲載、引用・言及</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>Trustworthiness：</strong>著者情報、更新日、出典、透明性</span>
                  </li>
                </ul>
              </section>

              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">Experience：実体験を証拠として入れる</h2>
                <p className="article-prose">
                  Experience は「実際に使った」「現場で試した」「顧客と向き合った」ことが伝わる情報です。単に「便利です」と書くだけでは、AI にとっても読者にとっても一般論に見えます。
                </p>
                <p className="article-prose">
                  実務では、次のような情報が有効です。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>実際に使った画面、手順、設定内容</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>導入前後の数値変化</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>使って分かったメリットだけでなく、困った点や向かないケース</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>失敗例と改善プロセス</span>
                  </li>
                </ul>
                <p className="article-prose">
                  たとえば「おすすめツール」を紹介するなら、機能一覧だけでは不十分です。3か月使って分かった違い、無料プランで詰まりやすいポイント、小規模チームには便利だが承認フローが複雑な企業には向かない、といった一次情報が差別化になります。
                </p>
              </section>

              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">Expertise：専門性を判断基準として示す</h2>
                <p className="article-prose">
                  Expertise は、専門用語を多く並べることではありません。読者が意思決定できるように、専門家としての判断基準を示すことです。
                </p>
                <p className="article-prose">
                  具体的には、次のような観点があると専門性が伝わりやすくなります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>誰が書いたのか</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>なぜその人・会社が詳しいのか</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>どのデータや経験に基づいているのか</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>どの条件ではAが適していて、どの条件ではBが適しているのか</span>
                  </li>
                </ul>
                <p className="article-prose">
                  たとえば「MAツールの選び方」であれば、単に「機能が多いほうが良い」ではなく、「リード数が少ない段階では高機能なスコアリングより、メール配信とフォーム連携の運用しやすさを優先すべき」といった判断軸が専門性になります。
                </p>
              </section>

              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">Authoritativeness：外部から参照される状態を作る</h2>
                <p className="article-prose">
                  Authoritativeness は、自社サイト内で「私たちは専門家です」と書くだけでは成立しません。LLMO では、外部の信頼できる場所でブランドやコンテンツが言及されているかが重要になります。
                </p>
                <p className="article-prose">
                  たとえば、次のような外部サーフェスが考えられます。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>業界メディアでの掲載・引用</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>比較記事やおすすめ記事への掲載</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>レビューサイトでの評価</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>導入事例や顧客事例の公開</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>専門家やユーザーによるブログ、note、Qiita、Zenn、YouTube での言及</span>
                  </li>
                </ul>
                <p className="article-prose">
                  特に BtoB や SaaS では、レビューサイト、比較記事、導入事例、業界メディア、専門家の発信などに一貫して名前が出ている状態が強いです。AI は Web 上の複数の文脈を見て「このブランドはその分野で参照されているか」を判断します。
                </p>
              </section>

              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">Trustworthiness：AIに誤解されない情報設計</h2>
                <p className="article-prose">
                  Trust は E-E-A-T の中で最も重要な要素です。LLMO では、AI が回答に使っても誤解が起きにくいように、情報の根拠・条件・更新性を明確にする必要があります。
                </p>
                <p className="article-prose">
                  実務で整えたい項目は次の通りです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>著者名、監修者、運営会社を明記する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>記事の公開日・更新日を入れる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>事実・数値・調査データには出典を付ける</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>比較記事では評価基準を明示する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>価格、機能、対応範囲などの更新が必要な情報を定期的に見直す</span>
                  </li>
                </ul>
                <p className="article-prose">
                  Trust を高めるとは、良く見せることではありません。読者と AI が誤解しないように、判断材料を正直に出すことです。
                </p>
              </section>

              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">InformationGain と E-E-A-T の関係</h2>
                <p className="article-prose">
                  「オリジナルなら上位表示する」という考え方は、少し単純化しすぎです。InformationGain は、ひとことで言えば「そのページを読むことで新しく得られる情報量」を指します。
                </p>
                <p className="article-prose">
                  ただし、オリジナル情報が多ければ必ず勝てるわけではありません。重要なのは、検索意図に対して十分に答えたうえで、読者にとって意味のある追加価値を出すことです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>実際に使って分かった注意点</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>導入後の数値変化</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>失敗した事例と改善プロセス</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>他社比較で見落とされがちな判断基準</span>
                  </li>
                </ul>
                <p className="article-prose">
                  つまり、狙うべきなのは「オリジナルっぽい文章」ではなく、「読者と AI の判断を前に進める情報」です。E-E-A-T をきちんと設計した結果として、InformationGain が高まる状態を目指します。
                </p>
              </section>

              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">LLMO で E-E-A-T を高める実務チェックリスト</h2>
                <p className="article-prose">
                  E-E-A-T は記事単体では完結しません。自社サイト内の情報設計と、外部でのブランド言及を両方整える必要があります。
                </p>
                <h3 className="article-h3">自社サイトで整えること</h3>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>著者、監修者、運営会社、更新日を明記する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>冒頭で結論を明確に書く</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>一次情報、独自データ、実体験、事例、比較表を入れる</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>評価基準、比較条件、向いているケース、向いていないケースを明示する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>FAQ、定義、比較軸、メリット・デメリットを構造化する</span>
                  </li>
                </ul>
                <h3 className="article-h3">外部サーフェスで整えること</h3>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>レビューサイトのプロフィールや掲載情報を最新化する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>ITreview、BOXIL SaaS、G2、Capterra などでレビューを増やす</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>業界メディアの比較記事やリスト記事に掲載される機会を作る</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>導入事例、調査レポート、プレスリリースを発信する</span>
                  </li>
                </ul>
              </section>

              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">FAQ</h2>

                <h3 className="article-h3">E-E-A-Tとは何ですか？</h3>
                <p className="article-prose">
                  E-E-A-T とは、Experience（経験）、Expertise（専門性）、Authoritativeness（権威性）、Trustworthiness（信頼性）の4つを指す考え方です。LLMO では、AI が回答を生成するときに「この情報源は信頼できるか」を判断する材料になります。
                </p>

                <h3 className="article-h3">EATとEEATの違いは何ですか？</h3>
                <p className="article-prose">
                  EAT は Expertise、Authoritativeness、Trustworthiness の3要素を指していました。EEAT では Experience が追加され、実際に使った経験や現場の一次情報がより重視されるようになりました。
                </p>

                <h3 className="article-h3">YMYL と E-E-A-T の関係は？</h3>
                <p className="article-prose">
                  YMYL は健康、医療、金融、法律など、間違った情報が大きな影響を与える領域です。こうしたテーマでは、著者情報、出典、更新日、注意事項を明確にした E-E-A-T 設計が特に重要です。
                </p>

                <h3 className="article-h3">小規模サイトでも E-E-A-T は高められますか？</h3>
                <p className="article-prose">
                  はい。AI は被リンク数だけで判断するわけではありません。専門性の高いニッチなテーマでは、実体験、独自データ、丁寧な出典、外部での自然な言及があれば、小規模サイトでも十分に評価される可能性があります。
                </p>

                <h3 className="article-h3">LLMO で E-E-A-T を上げる最初の一歩は？</h3>
                <p className="article-prose">
                  まずは、最も重要な記事に著者情報、公開日・更新日、出典、比較基準、FAQ を追加することです。次に、レビューサイトや比較記事など外部での言及を増やしていくと、信頼シグナルが積み上がります。
                </p>
              </section>

              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">まとめ：LLMOにおけるE-E-A-Tは信頼設計である</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    LLMO で勝つための E-E-A-T は、「良い記事を書くこと」だけではなく、「Web 全体に一貫した証拠を残すこと」です。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  特に重要なのは、自社サイトで専門性と一次情報を明確に示すこと、外部サイトやレビューで第三者評価を増やすこと、そして AI が引用しやすい構造で結論・根拠・比較軸を明確に書くことです。
                </p>
                <p className="article-prose">
                  LLMO における E-E-A-T は、AI に「このブランドを答えに含めても安全だ」と判断させるための信頼インフラです。SEO と LLMO を分けて考えつつ、両方に効く情報設計へ少しずつ整えていくのが、これからの実務ではいちばん効率的です。
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
