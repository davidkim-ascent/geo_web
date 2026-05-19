import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleTOC } from "./ArticleTOC";
import { RelatedResearchSection } from "@/components/lab/RelatedResearchSection";

const PAGE_TITLE = "AIエージェントはウェブサイトをどう見るのか — 3つの方法とセマンティックHTMLの重要性";
const PAGE_DESCRIPTION =
  "AIエージェントがウェブサイトを認識する3つの方法（画面画像・構造読み取り・組み合わせ）を解説。セマンティックHTML・ラベル設計・SSRの実装ポイントまで、AI対応サイト設計の基本を整理します。";

export const metadata: Metadata = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ai-agent-site",
  keywords: ["AIエージェント", "セマンティックHTML", "アクセシビリティ", "GEO", "ラベル", "SSR"],
});

export const dynamic = "force-static";

const PLATFORM_TABLE = [
  ["Anthropic Computer Use", "画面画像", "スクリーンショットを見てクリックします"],
  ["Google Project Mariner", "画面＋コード構造", "画面とコードを一緒に見ます"],
  ["OpenAI Atlas", "ラベル", "ボタン、リンク、入力欄の意味を読みます"],
  ["OpenAI CUA", "複数の方法を組み合わせ", "画面、コード、ラベル情報を一緒に見ます"],
  ["Microsoft Playwright MCP", "ラベル", "画面よりも構造情報を見ます"],
  ["Perplexity Comet", "ラベル＋画面", "構造を中心に見ながら、画面も参考にします"],
];

export default function AiAgentSitePage() {
  return (
    <div className="article-page">
      {/* ── Hero ── */}
      <section
        className="hero-fixed article-hero relative"
        style={{ background: "var(--hero-gradient)", minHeight: "0" }}
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
                <Link href="/" className="transition-colors hover:text-[#FAFAF7]">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FAFAF7]">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FAFAF7]">AIエージェントとサイト設計</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                TECHNICAL GEO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AIエージェントは</span>
                <span className="block text-[#1452FF]">ウェブサイトをどう見るのか</span>
              </h1>

              <p className="article-hero__lede">
                3つの認識方法と、AI対応サイトを設計するためのセマンティックHTMLの基本
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.19" },
                  { l: "LENGTH", v: "約5,000文字" },
                  { l: "FORMAT", v: "TECHNICAL" },
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

      {/* ── Article Shell ── */}
      <section className="article-shell">
        <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
          <div className="article-shell__grid lg:grid-cols-[220px_1fr]">
            <div className="hidden lg:block">
              <ArticleTOC />
            </div>

            <article className="article-body">

              {/* s1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">AIエージェントがサイトを見る3つの方法</h2>
                <p className="article-prose">
                  AIエージェントがウェブサイトを見る方法は、大きく3つあります。1つ目は、画面をスクリーンショットのように見る方法です。2つ目は、ウェブサイトの構造を読む方法です。3つ目は、その2つを組み合わせて使う方法です。
                </p>
                <p className="article-prose">
                  それぞれのアプローチによって、AIエージェントがサイトをどこまで正確に理解できるかが変わります。そしてその理解の深さは、サイト設計の質に大きく左右されます。
                </p>
              </section>

              {/* s2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">画面を写真のように見る方法</h2>
                <p className="article-prose">
                  AIエージェントは、人が画面を見るように、ウェブサイトの画面を画像として見ることがあります。ボタンがどこにあるか、文字がどこにあるか、入力欄がどこにあるかを、画面を見ながら判断します。
                </p>
                <p className="article-prose">
                  AnthropicのClaude Computer Useは、この方法に近い仕組みです。まず画面をキャプチャし、その画面を分析して、どこをクリックするかを決めます。クリックしたあと、もう一度画面を見て次の行動を決めます。
                </p>
                <p className="article-prose">
                  GoogleのProject Marinerも似た方法を使います。まず画面とコードの構造を見て何をするかを計画し、そのあと実際のユーザーのようにクリックしたり入力したりします。
                </p>

                <div className="article-callout">
                  <p className="article-callout__text">
                    画面を写真のように見る方法には弱点があります。多くの計算が必要で、画面デザインが少し変わっただけで混乱することがあります。また、画面に表示されていない情報は理解しにくくなります。
                  </p>
                </div>
              </section>

              {/* s3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">ウェブサイトの構造を読む方法</h2>
                <p className="article-prose">
                  AIエージェントは、ウェブサイトの中にある構造を読み取ります。ここで重要になるのが「ラベル」です。ラベルとは、ウェブサイトの大事な部分だけを整理して示す、地図のようなものです。
                </p>
                <p className="article-prose">
                  <code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<img alt="商品写真">`}</code>、
                  <code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<button>購入する</button>`}</code>、
                  <code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<nav>`}</code>、
                  <code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<h1>`}</code>のように、<strong>HTMLに正しい意味と名前を入れること</strong>が大切です。するとブラウザはそれをもとに「これは購入するボタンだ」「これはメールアドレスの入力欄だ」というラベルを作ります。
                </p>
                <p className="article-prose">
                  OpenAIのChatGPT Atlasは、このラベル情報を使います。ボタン、リンク、入力欄などの要素がどのような役割を持っているのかを読み、その情報をもとにウェブサイトを理解します。MicrosoftのPlaywright MCPも同様に、ラベルスナップショットという構造情報を使い、より安定した理解を実現します。
                </p>
              </section>

              {/* s4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">画面と構造を一緒に見る方法</h2>
                <p className="article-prose">
                  性能の高いAIエージェントは、多くの場合この2つの方法を組み合わせて使います。画面も見ながら、ウェブサイトの構造も読みます。
                </p>
                <p className="article-prose">
                  OpenAIのComputer-Using Agentは、スクリーンショット、DOM、ラベルを一緒に見ます。Perplexity Cometも、ラベルと画面情報を組み合わせて使います。
                </p>

                <h3 className="article-h3">主要プラットフォームの比較</h3>
                <div className="article-table">
                  <div className="article-table__head">
                    <div>プラットフォーム</div>
                    <div>主な見方</div>
                    <div>わかりやすく言うと</div>
                  </div>
                  {PLATFORM_TABLE.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  まとめると、AIエージェントはラベルをますます重要な情報として使うようになっています。ウェブサイトのラベル構造がきちんと整理されていれば、AIはそのサイトをよりよく理解し、より正確に行動できます。
                </p>
              </section>

              {/* s5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">ラベルはAIエージェントにとってサイト内の案内図</h2>
                <p className="article-prose">
                  ラベルは、私たちがよく言うサイトマップとまったく同じものではありません。わかりやすく言うと、AIエージェントがウェブサイトの中で道に迷わないように助ける「AI向けのガイド」に近いものです。
                </p>
                <p className="article-prose">
                  一般的なサイトマップがウェブサイトにどのようなページがあるのかを教えるものだとすれば、ラベルは、1つのページの中で何がボタンで、何がリンクで、何が見出しで、何が入力欄なのかを教えるものです。だからAIエージェントは、ラベルを見ることで、このページで何を読み、何を押し、どこに入力すればよいのかを理解しやすくなります。
                </p>

                <blockquote className="article-quote">
                  <p className="article-quote__text">
                    ボタンに名前がなかったり、入力欄に説明がなかったり、重要な情報が隠れていたりすると、AIは道に迷いやすくなります。
                  </p>
                  <span className="article-quote__note">DESIGN PRINCIPLE</span>
                </blockquote>
              </section>

              {/* s6 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">意味のあるHTMLが最も重要です</h2>
                <p className="article-prose">
                  HTMLにはさまざまな種類のタグがあります。ボタンは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<button>`}</code>、リンクは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<a>`}</code>、見出しは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<h1>`}</code>のようなタグで表します。このようなタグをそれぞれの役割に合うように使うことを「セマンティックHTML」といいます。簡単に言えば、ウェブサイトの各部分に正しい名前札を付けることです。
                </p>

                <h3 className="article-h3">良い例：本物のボタン</h3>
                <pre className="article-code"><code>{`<button type="submit">航空券を検索</button>`}</code></pre>
                <p className="article-prose">
                  このように書けば、AIは「これはボタンで、航空券を検索するためのボタンなのだ」と理解できます。
                </p>

                <h3 className="article-h3">悪い例：見た目だけのボタン</h3>
                <pre className="article-code"><code>{`<div class="btn" onclick="searchFlights()">航空券を検索</div>`}</code></pre>
                <p className="article-prose">
                  人の目にはボタンのように見えるかもしれません。けれどもコード上では、これはただの<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">div</code>です。そのためAIは、これがクリックすべきボタンなのかをすぐには判断しにくくなります。
                </p>
              </section>

              {/* s7 */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">入力欄には説明を付ける必要があります</h2>
                <p className="article-prose">
                  ウェブサイトに名前、メールアドレス、電話番号を入力する欄があるなら、それぞれの欄に説明が必要です。そうすれば、人もAIも、何を入力すればよいのかがわかります。
                </p>

                <h3 className="article-h3">良い例</h3>
                <pre className="article-code"><code>{`<label for="email">メールアドレス</label>
<input type="email" id="email" name="email" autocomplete="email">`}</code></pre>
                <p className="article-prose">
                  <code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">autocomplete="email"</code>も重要です。この属性は、ブラウザとAIに「ここにはメールアドレスを入れればよい」と教えてくれます。
                </p>

                <h3 className="article-h3">悪い例</h3>
                <pre className="article-code"><code>{`<input type="text" placeholder="メールアドレスを入力してください">`}</code></pre>
                <p className="article-prose">
                  見た目には問題なさそうに見えますが、入力欄と説明がきちんと結びついていません。そのため、AIや支援技術にとって理解しにくくなることがあります。
                </p>
              </section>

              {/* s8 */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">見出しと領域も順番に整理する必要があります</h2>
                <p className="article-prose">
                  ウェブページには見出しがあります。いちばん大きな見出しは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">h1</code>、その次の見出しは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">h2</code>、さらに小さい見出しは<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">h3</code>というように、順番に使う必要があります。本のタイトル→章タイトル→小見出しという構造と同じです。
                </p>
                <p className="article-prose">
                  また、ウェブページにはメニュー、本文、横の領域、下部の情報といった区画があります。このような場所には、<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<nav>`}</code>、<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<main>`}</code>、<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<aside>`}</code>、<code className="rounded bg-[#F2F0EA] px-1.5 py-0.5 font-mono text-[13px]">{`<footer>`}</code>のようなタグを使います。
                </p>
                <pre className="article-code"><code>{`<nav aria-label="メインメニュー">
  <ul>
    <li><a href="/products">製品</a></li>
    <li><a href="/pricing">料金</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>航空券検索</h1>
  </article>
</main>`}</code></pre>
                <p className="article-prose">
                  このように作ると、AIは「ここはメニューで、ここは本文なのだ」と理解できます。
                </p>
              </section>

              {/* s9 */}
              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">重要な内容は最初から見えるようにする必要があります</h2>
                <p className="article-prose">
                  AIエージェントやAIクローラーがウェブサイトを見るとき、すべてのJavaScriptを実行するとは限りません。問題は、重要な内容がJavaScriptの実行後に初めて表示される場合です。最初のHTMLには空の画面だけがあり、あとからReactが内容を読み込む形になっていると、一部のAIクローラーはその内容を見られないことがあります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    価格、商品説明、在庫、重要な情報はタブやアコーディオンの奥に隠さない
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    サーバーサイドレンダリング（SSR）またはプリレンダリングで最初のHTMLに内容を含める
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    Next.jsのApp RouterはデフォルトでSSRになるため、この問題を自然に解決できる
                  </li>
                </ul>

                <div className="article-callout">
                  <p className="article-callout__text">
                    サーバーサイドレンダリング（SSR）とは、ユーザーのブラウザが内容を作る前に、サーバーが先に完成した内容を送る方法です。人も検索エンジンもAIも、重要な情報をより簡単に見ることができます。
                  </p>
                </div>
              </section>

              {/* s10 */}
              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">AIが使いやすいウェブサイトかどうかをテストする方法</h2>
                <p className="article-prose">
                  人にとって見やすいかどうかを確認するだけでは不十分です。これからは、AIエージェントが理解できるかどうかも確認する必要があります。
                </p>

                <h3 className="article-h3">スクリーンリーダーでテストする</h3>
                <p className="article-prose">
                  スクリーンリーダー（VoiceOver、NVDA、TalkBackなど）がボタン名を正しく読み、入力欄の説明をきちんと伝え、メニューと本文を区別できるなら、そのウェブサイトはAIエージェントにとっても理解しやすい構造である可能性が高いです。
                </p>

                <h3 className="article-h3">Playwright MCPでラベルスナップショットを確認する</h3>
                <p className="article-prose">
                  Playwright MCPを使うと、AIが見ているラベルスナップショットを確認できます。
                </p>
                <pre className="article-code"><code>{`[heading level=1] 航空券検索
[navigation "メインメニュー"]
  [link] 製品
  [link] 料金
[main]
  [textbox "出発空港"] value=""
  [textbox "到着空港"] value=""
  [button] 航空券検索`}</code></pre>
                <p className="article-prose">
                  この構造を見ると、AIはどの部分が見出しで、どの部分がメニューで、どの部分が入力欄なのかを簡単に理解できます。
                </p>
              </section>

              {/* s11 */}
              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">まとめ</h2>
                <p className="article-prose">
                  AIエージェントは、ウェブサイトを人間とまったく同じように見ているわけではありません。画面を画像として見ることもあれば、コード構造を読むこともあります。そして、ラベルを通じてボタン、リンク、入力欄の意味を理解することもあります。
                </p>
                <ul className="article-list">
                  {[
                    ["セマンティックHTMLが基本：", "ボタンはボタンタグで、リンクはリンクタグで、入力欄はラベルと一緒に作る"],
                    ["ラベルがAIの案内図：", "ラベルがきちんと作られていれば、AIエージェントはサイトをよりよく理解し、より正確に行動できる"],
                    ["重要なコンテンツは隠さない：", "AIクローラーがJavaScriptを実行できない場合、隠れている内容を見ることができない。SSRやプリレンダリングが重要"],
                    ["スクリーンリーダーでテスト：", "スクリーンリーダーがきちんと読めるサイトは、AIエージェントにとっても理解しやすい"],
                  ].map(([label, body]) => (
                    <li key={label} className="article-list__item">
                      <span className="article-list__bullet">•</span>
                      <span><strong>{label}</strong>{body}</span>
                    </li>
                  ))}
                </ul>

                <div className="article-note-panel">
                  <div className="article-note-panel__grid">
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">監修</div>
                      <p className="article-note-panel__text">
                        株式会社Ascent GEO GEO戦略室。AIエージェント対応・セマンティックHTML設計・GEO技術施策を通じて、企業サイトのAI可視性向上を支援。
                      </p>
                    </div>
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">参考</div>
                      <p className="article-note-panel__text article-note-panel__text--muted">
                        Anthropic Claude Computer Use、Google Project Mariner、OpenAI CUA、Microsoft Playwright MCP、Perplexity Cometの公開資料をもとに作成（2026年5月時点）。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </section>

      <RelatedResearchSection currentSlug="ai-agent-site" />

      <div className="article-cta">
        <CTASection
          kicker="AIエージェント対応サイト設計"
          title={
            <>
              AIに正しく読まれる
              <br />
              サイト設計、始めませんか
            </>
          }
          description={
            <>
              セマンティックHTML・ラベル設計・SSR対応まで、
              AIエージェントがあなたのサイトを正確に理解できるかどうかを診断します。
              <br />
              <br />
              Ascent GEOでは、AI可視性の観点からサイト構造を評価し、
              具体的な改善提案を無料の初回相談でお伝えします。
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
