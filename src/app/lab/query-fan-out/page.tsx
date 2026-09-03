import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";
import shimadaImage from "./shimada.png";

const PAGE_TITLE = "クエリファンアウトとは？GEO・LLMO対策への活用方法も解説！";
const PAGE_DESCRIPTION =
  "クエリファンアウトとは、AIが検索クエリを複数のサブクエリに分解し統合して回答を生成する技術です。GEO・LLMO対策への活用方法も紹介します";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/query-fan-out",
  keywords: ["クエリファンアウト", "ファンアウト", "GEO対策", "LLMO対策", "AI検索対策", "AIO対策", "AEO対策"],
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

const AI_OVERVIEW_VS_MODE = [
  ["表示場所", "検索結果ページの上部", "専用のタブ・対話画面"],
  ["回答形式", "要約＋根拠リンク", "対話形式で深掘り可能"],
  ["サブクエリ数", "比較的少ない", "より多くのサブクエリを発行"],
  ["向いている検索", "シンプルな質問", "複雑・探索的な質問"],
];

const SITE_OPERATOR_PATTERNS = [
  { pattern: "site:", n: 543, pct: 30.2 },
  { pattern: "完全一致（\"\"）", n: 427, pct: 23.8 },
  { pattern: "年号", n: 352, pct: 19.6 },
];

const FAQ_ITEMS = [
  {
    q: "クエリファンアウトに対応するために専用ツールは必要ですか？",
    a: "専用ツールが必須というわけではありません。まずは既存のアクセス解析ツールで、AI経由の流入状況を確認することから始められます。",
  },
  {
    q: "クエリファンアウトはGoogle以外のAI検索でも使われていますか？",
    a: "ChatGPTやPerplexityなど、他のAI検索サービスでも、質問を複数の観点に分解して検索する類似の仕組みが採用されています。",
  },
  {
    q: "従来のSEO対策はもう意味がないのですか？",
    a: "従来のSEO対策が不要になるわけではありません。クロールされやすいサイト構造や独自性のあるコンテンツは、クエリファンアウトの時代でも土台として重要です。",
  },
  {
    q: "自社サイトがクエリファンアウトに対応できているかは、どう確認すればよいですか？",
    a: "AI OverviewsやAIモードでの引用状況を定期的にチェックし、想定サブクエリごとのコンテンツが網羅できているかを見直す方法が有効です。",
  },
];

export default function QueryFanOutPage() {
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
                <span className="text-[#FDFDFB]">クエリファンアウト</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO / LLMO
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">クエリファンアウトとは？</span>
                <span className="block text-[#1452FF]">GEO・LLMO対策への活用方法</span>
              </h1>

              <p className="article-hero__lede">
                「AI検索に自社サイトが引用されない」とお悩みではありませんか。GoogleのAIによる概要やAIモードの回答生成には、クエリファンアウトと呼ばれる仕組みが使われています。この記事を読めば、クエリファンアウトの仕組みと、SEO・GEO・LLMO対策への具体的な活用方法がわかります。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.09.02" },
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
              <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <ArticleThumbnail variant="query-fan-out" eyebrow="GEO / LLMO" className="h-[260px] w-full" />
              </figure>

              <blockquote className="article-quote article-quote--wide">
                <p className="article-quote__text">
                  クエリファンアウトとは、AIが1つの検索クエリを複数のサブクエリに分解し、並列検索した結果を結合して回答を生成する仕組みです。
                </p>
                <span className="article-quote__note">この記事の結論</span>
              </blockquote>

              {/* Section 1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>クエリファンアウトとは？AI検索におけるクエリ分解の仕組み</h2>
                <p className="article-prose">
                  クエリファンアウトとは、AI検索が1つの検索クエリを複数のサブクエリへ分解し、並列で検索した結果を統合して回答を生成する仕組みです。Googleは AI モードの仕組みについて、質問をサブトピックへ分解し、複数の検索を同時に実行すると公式に説明しています。
                </p>
                <p className="article-prose">
                  たとえば「初心者向けのノートパソコンでコスパが良いものは？」と検索すると、AIは内部で「初心者向けノートパソコンの選び方」「コスパが良いノートパソコンの価格帯」「初心者に不要なスペック」といった複数のサブクエリに分解します。それぞれの検索結果をまとめて、1つの回答として提示する仕組みです。
                </p>
                <p className="article-prose">
                  クエリファンアウトは、検索者が入力した1つの質問の裏側で、複数の検索を同時に走らせる仕組みだといえます。AI検索を利用する人が増えるほど、クエリファンアウトを前提としたコンテンツ設計の重要性は高まっていくと考えられます。
                </p>
              </section>

              {/* Section 2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">従来のキーワードマッチング検索との違い</h2>
                <p className="article-prose">
                  従来のキーワードマッチング検索は、入力したキーワードと完全一致・部分一致するページを探す仕組みでした。一方でクエリファンアウトは、入力されたクエリの意図をAIが解釈し、関連する複数の視点からサブクエリを自動生成します。
                </p>
                <p className="article-prose">
                  検索者が言葉にしていない疑問にも、AIが先回りして答えを用意できる点が大きな違いです。
                </p>

                <h3 className="article-h4">「ファンアウト（fan-out）」という言葉の意味</h3>
                <p className="article-prose">
                  ファンアウトは、もともと電子回路の分野で使われてきた用語です。1つの信号の出力元が、複数の入力先に扇状に枝分かれする様子を指します。AI検索の文脈では、1つの検索クエリが複数のサブクエリへ枝分かれしていく様子を、この言葉で表現しています。
                </p>
              </section>

              {/* Section 3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">クエリファンアウトの仕組みを3ステップで解説</h2>
                <p className="article-prose">
                  クエリファンアウトの内部処理は、大きく3つのステップに分けられます。
                </p>

                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {[
                    { step: "STEP 1", title: "検索クエリをサブクエリへ分解する", desc: "AIは検索者の質問を読み取り、隠れた意図を含む複数のサブクエリへ分解します。分解の粒度は質問の複雑さによって変わり、シンプルな質問では数個、複雑な質問では数十個のサブクエリが生成される場合もあります。" },
                    { step: "STEP 2", title: "サブクエリごとに並列で検索を実行する", desc: "分解した複数のサブクエリに対して、AIはウェブページやナレッジグラフなど複数のデータソースを同時に検索します。この段階では、ページ全体ではなく、サブクエリに合致するページ内の一部分が評価の対象になっているとみられます。" },
                    { step: "STEP 3", title: "検索結果を統合して回答を生成する", desc: "複数の検索結果から関連性の高い情報を抽出し、1つのわかりやすい回答へと統合します。最終的な回答には根拠となったページへのリンクが添えられ、検索者は元の情報源をたどって確認できます。" },
                  ].map((s, i) => (
                    <div key={s.step} className={`flex items-start gap-4 px-5 py-4 ${i < 2 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex-none rounded-full bg-[#1452FF] px-3 py-0.5 font-mono text-[10px] text-white tracking-[0.12em]">{s.step}</span>
                      <div>
                        <div className="font-bold" style={{ fontSize: "var(--fs-body)" }}>{s.title}</div>
                        <div className="text-[#6B6B73]" style={{ fontSize: "var(--fs-body-sm)" }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  たとえば「新宿 カフェ 個室」と検索した場合でも、AIは「新宿駅からのアクセス」「個室があるカフェの特徴」「作業や勉強に向く店舗」といった切り口へ分解することがあります。検索は1件ずつ順番に処理するのではなく並列で実行されるため、サブクエリの数が増えても回答までの時間が大きく延びにくい仕組みです。
                </p>
                <p className="article-prose">
                  Googleの公式発表によると、AIモードに入力される質問の長さは、従来の検索クエリの2〜3倍になっているとのことです。質問が長く複雑になるほど、クエリファンアウトによる分解のメリットは大きくなります。
                </p>
              </section>

              {/* Section 4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>クエリファンアウトはGoogleのどの検索機能で使われていますか？</h2>
                <p className="article-prose">
                  クエリファンアウトは、Googleの複数のAI検索機能で活用されています。
                </p>

                <h3 className="article-h4">AIによる概要（AI Overviews）</h3>
                <p className="article-prose">
                  AIによる概要は、検索結果ページの上部に表示される、AIが生成した要約です。クエリファンアウトによって集めた情報をもとに、根拠となるリンクとあわせて簡潔な回答が表示されます。
                </p>

                <h3 className="article-h4">AIモード（AI Mode）</h3>
                <p className="article-prose">
                  AIモードは、対話形式でより深く検索できる、Googleの検索機能です。2025年5月のGoogle I/Oで発表され、その後アメリカやイギリス、日本を含む各国へ順次展開されました。AIモードでは、AIによる概要よりも多くのサブクエリを発行し、より網羅的な回答を作成します。
                </p>

                <h3 className="article-h4">AIによる概要とAIモードの違い</h3>
                <div className="my-6 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head"><div>項目</div><div>AIによる概要 / AIモード</div></div>
                    {AI_OVERVIEW_VS_MODE.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}／{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="article-h4">関連する特許情報</h3>
                <p className="article-prose">
                  クエリファンアウトに関連する技術は、Googleが出願した複数の特許にも記載されています。「WO2024064249A1」は、多様なサブクエリを生成し検索モデルを訓練する手法についての特許です。「US20240289407A1」は、対話の履歴を踏まえて検索を行う「Search with stateful chat」という技術に関する特許です。特許はあくまで技術的な可能性を示すものであり、実際の検索アルゴリズムのすべてが同じ内容とは限らない点に注意してください。
                </p>
              </section>

              {/* Section 5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">クエリファンアウトを活用した具体的なGEO・LLMO対策</h2>
                <p className="article-prose">
                  クエリファンアウトに対応するには、従来のSEO対策に加えて、GEO・<Link href="/lab/what-is-llmo" className="text-[#1452FF] underline decoration-[#1452FF]/30 underline-offset-4">LLMO</Link>の視点を取り入れる必要があります。
                </p>

                <h3 className="article-h4">トピッククラスターでサブクエリを網羅する</h3>
                <p className="article-prose">
                  1つのメインキーワードに対して、想定されるサブクエリを洗い出し、関連ページで網羅的にカバーする設計が有効です。「クエリファンアウト」であれば、「仕組み」「対策」「活用事例」といった切り口ごとに、専用のコンテンツを用意します。
                </p>
                <p className="article-prose">
                  まずはモニタリングツールなどでクエリファンアウトを特定し、自社コンテンツの中で足りないKWがあれば作成していきましょう。なお弊社が運営している「GEO Watcher」であればクエリファンアウトも表示されるので、ツールを検討中の方はぜひ確認してください。
                </p>

                <h3 className="article-h4">サブクエリ同士を内部リンクでつなぐ</h3>
                <p className="article-prose">
                  サブクエリごとのページができたら、内部リンクで関連ページ同士をつなぎます。記事本文中の関連語句にリンクを設置するほか、記事末尾に関連記事のブロックを設けると効果的です。パンくずリストやカテゴリーページも整備し、AIがサイト構造を把握しやすい状態にします。
                </p>

                <h3 className="article-h4">結論ファーストでAIが引用しやすい文章にする</h3>
                <p className="article-prose">
                  見出し直下の1〜2文で結論を提示し、理由や具体例をそのあとに続ける構成にします。見出しには、想定されるサブクエリに近い表現をそのまま使うと、AIが該当箇所を見つけやすくなります。数値や固有名詞を交えた具体的な記述にすることも、引用されやすさにつながります。
                </p>

                <h3 className="article-h4">専門領域を絞り込みE-E-A-Tを強化する</h3>
                <p className="article-prose">
                  専門外のトピックまで手を広げると、サイト全体の専門性が薄まり、E-E-A-Tの評価が下がるおそれがあります。自社が強みを持つ領域に絞ってコンテンツを充実させるほうが、AIに引用されやすくなります。更新頻度を保ち、古くなった情報をこまめに見直すことも、専門性を維持するうえで欠かせません。
                </p>
              </section>

              {/* Section 6 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">クエリファンアウトに関する最新情報</h2>
                <p className="article-prose">
                  GEO・LLMO対策においては日々、様々な情報がアップデートされています。そのなかで、クエリファンアウトに関する最新の情報を紹介します。
                </p>

                <h3 className="article-h4">ChatGPTのクエリファンアウトにおけるsite演算子の使用が急増</h3>
                <p className="article-prose">
                  MJ Cachón氏によるヘルスケア・スポーツ小売・ホテルの3業界、189プロンプトから生成された1,797件のサブクエリを分析した調査データから、site演算子を含むクエリファンアウトが急増していることが判明しました。具体的には30.2%にsite:演算子、23.8%に完全一致（&ldquo;&rdquo;）、19.6%に年号が含まれている結果になっています。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#F2F0EA]">
                  <div className="px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase border-b border-[#E6E4DD]">
                    ChatGPTクエリファンアウトのパターン分析（n=1,797）
                  </div>
                  <div className="flex flex-col gap-0 px-6 py-5">
                    {SITE_OPERATOR_PATTERNS.map((d, i, arr) => (
                      <div key={d.pattern} className={`flex items-center gap-4 py-3 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                        <div className="w-[110px] flex-none font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body-sm)" }}>{d.pattern}</div>
                        <div className="flex flex-1 items-center gap-3">
                          <div className="flex-1 h-[22px] rounded-full bg-[#E6E4DD] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#1452FF]"
                              style={{ width: `${(d.pct / 30.2) * 100}%`, opacity: 0.5 + (d.pct / 30.2) * 0.5 }}
                            />
                          </div>
                          <div className="w-[64px] flex-none text-right font-mono text-[14px] font-bold text-[#1452FF]">{d.pct}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-4 text-[11px] text-[#9A9AA0]">出典：MJ Cachón氏の調査データ（ヘルスケア・スポーツ小売・ホテルの3業界、189プロンプト／1,797サブクエリ）</div>
                </div>

                <p className="article-prose">
                  またPeec AIのDavid Konitzn氏の調査によると、「site:」演算子はChatGPT 5.5ではクエリファンアウト中0.004%しか出現しなかったのに対して、ChatGPT 5.6では約43%まで急増したというデータもあります。「site:演算子」は、Google検索で「特定のWebサイト内だけを検索する」ための検索演算子です。つまりChatGPTは、あるプロンプト（質問文）に対して回答文を作成する過程で「特定のWEBサイト内だけを検索する」仕様に変化しつつあると言えます。
                </p>
                <p className="article-prose">
                  アセントネットワークスが運営しているGEO Watcherでもクエリファンアウトが確認できるので調査してみました。今回は資生堂を対象ブランドにした例ですが、確かに「site:」演算子が確認できました。
                </p>
                <p className="article-prose">
                  「日本でおすすめのスキンケアブランドはどこですか？」というプロンプトに対するChatGPTのクエリファンアウトを見ると、「日本 おすすめ スキンケアブランド」という3語のキーワードを中心に複数のクエリへ派生しているほか、資生堂と無印良品のWEBサイトを「site:」演算子で指定して調べるクエリも生成されていました。つまりChatGPTは「日本のスキンケアブランド」について回答を生成する際に、資生堂や無印良品のWEBサイトを個別に確認する検索を行っていることがわかります。
                </p>
                <p className="article-prose">
                  これは、少なくともChatGPTの検索プロセスにおいて、資生堂や無印良品が「日本のスキンケアブランド」を調査する際の有力な確認対象として認識されている証拠と言えるでしょう。また新しいモデルが出たら変化する可能性はございますが、「site:」演算子を使ったクエリファンアウトが存在することは把握する必要があると思います。
                </p>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">クエリファンアウトに関してよくある質問</h2>

                {FAQ_ITEMS.map((item) => (
                  <div key={item.q}>
                    <h3 className="article-h3">{item.q}</h3>
                    <p className="article-prose">{item.a}</p>
                  </div>
                ))}
              </section>

              {/* Section 8: まとめ */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ｜クエリファンアウトを理解してAI検索時代の対策を進めよう</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    クエリファンアウトとは、AIが1つの検索クエリを複数のサブクエリに分解し、並列検索した結果を統合して回答を生成する仕組みです。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  AIによる概要やAIモードといったGoogleの検索機能で、すでに広く使われています。対策としては、サブクエリを想定したトピッククラスター設計と、専門領域に絞った質の高いコンテンツ作りが欠かせません。
                </p>
                <p className="article-prose">
                  従来のSEO対策を土台としながら、GEO・LLMOの視点を積み重ねていく姿勢が、これからの検索対策には求められます。Ascent GEO・LLMOでは、クエリファンアウトのモニタリングを含めたGEO Watcherの提供や、実消費者インテント分析・GEOコンテンツ制作を通じて、AI検索時代のブランド戦略を支援しています。
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
                      <ul className="flex flex-col gap-2">
                        {[
                          "Google「AI Mode in Google Search: Updates from Google I/O 2025」",
                          "Google Patents「WO2024064249A1 - Systems and methods for prompt-based query generation for diverse retrieval」",
                          "Google Patents「US20240289407A1 - Search with stateful chat」",
                          "MJ Cachón氏によるクエリファンアウト調査（mjcachon.com）",
                          "David Konitzny氏によるsite演算子使用率の調査（LinkedIn）",
                        ].map((src) => (
                          <li key={src} className="article-note-panel__text article-note-panel__text--muted flex gap-2" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                            <span className="flex-none">•</span>
                            <span>{src}</span>
                          </li>
                        ))}
                      </ul>
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
