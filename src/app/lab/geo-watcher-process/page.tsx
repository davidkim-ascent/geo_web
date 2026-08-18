import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { DialogueBubble } from "./DialogueBubble";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";
import stepBrand from "./step1-brand.png";
import stepCompetitor from "./step1-competitor.png";
import stepPrompt from "./step1-prompt.png";
import stepVisibility from "./step2-visibility.png";
import stepPromptDetail from "./step2-prompt-detail.png";
import stepSov from "./step2-sov.png";
import stepCitation from "./step2-citation.png";

const PAGE_TITLE = "自社でできる！GEO Watcherを使った具体的なGEO・LLMO対策プロセスを解説";
const PAGE_DESCRIPTION =
  "GEO Watcherを使ったGEO・LLMO対策の実践プロセスを紹介。現状分析、モニタリング、プロンプト設計、コンテンツ改善の進め方を解説します。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/geo-watcher-process",
  keywords: ["GEO対策", "AI検索対策", "LLMO対策", "AIO対策", "AEO対策", "生成AI検索", "AI Overview", "LLMO", "AIO", "AEO"],
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

const ANALYSIS_ITEMS = [
  { label: "ブランド名", desc: "ユニクロや資生堂などのサービス名や会社名の総称" },
  { label: "URL", desc: "分析対象のURL" },
  { label: "プロンプト", desc: "ChatGPTなどに質問する文章" },
  { label: "競合他社のURL", desc: "分析対象の競合他社となるサービス、会社名のURL" },
];

const MONITORING_METRICS = [
  { label: "AI可視性", desc: "AI回答の中で、自社ブランドがどれだけ露出しているかを確認します。" },
  { label: "プロンプト別パフォーマンス", desc: "各プロンプトのAI可視性と引用URLパフォーマンスを確認します。" },
  { label: "シェア・オブ・ボイス", desc: "AIエンジンが自社ブランドと競合他社をどれだけ言及するかを確認します。" },
  { label: "引用URL", desc: "プロンプトへの回答においてLLMが参照するソースを確認します。" },
];

const SEVEN_RULES = [
  { num: "01", title: "タイトル（H1）は質問形式にする", desc: "「質問＋核心となる結論」で構成し、50字以内で核心キーワードを含める" },
  { num: "02", title: "最初の段落で核心質問に答え切る", desc: "結論を後半に取っておかず、スクロールなしで回答が表示される位置に置く" },
  { num: "03", title: "H2はフォローアップ質問と1:1で対応させる", desc: "ひとつの見出しにひとつの質問、が原則" },
  { num: "04", title: "ファクトを提示する", desc: "数値・引用・データの根拠を本文に含める" },
  { num: "05", title: "「つまり」で完結させる", desc: "要所に結論を明示し、そのページだけで意思決定できる完結性を持たせる" },
  { num: "06", title: "クラスターキーワードを自然に含める", desc: "関連キーワードを1セクションあたり2〜3個を目安に織り込む" },
  { num: "07", title: "スキーマを適用する", desc: "FAQ・Q&AセクションにJSON-LDの構造化データを適用する" },
];

const KPI_ITEMS = [
  { label: "AI可視性", desc: "AI回答の中で、自社ブランドがどれだけ露出しているか" },
  { label: "シェア・オブ・ボイス（SOV）", desc: "競合他社と比較して自社ブランドが、どれだけ言及されているか" },
  { label: "引用状況", desc: "自社ドメインがAI回答の情報源として引用された数" },
  { label: "AI経由の流入", desc: "出典リンクを提供するAIエンジンからの、自社サイトへの流入（GA4で確認）" },
];

export default function GeoWatcherProcessPage() {
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
                <span className="text-[#FDFDFB]">GEO Watcher対策プロセス</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                HOW TO · GEO Watcher
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">自社でできる！GEO Watcherを使った</span>
                <span className="block text-[#1452FF]">具体的なGEO・LLMO対策プロセス</span>
              </h1>

              <p className="article-hero__lede">
                GEO・LLMO対策は何から始めればいいか分からない、という担当者は多いはずです。GEO Watcherを使った現状分析、モニタリング、プロンプト設計、コンテンツ改善という一連のプロセスを、実際の画面を交えて解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.18" },
                  { l: "LENGTH", v: "約6,000文字" },
                  { l: "FORMAT", v: "HOW TO" },
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
                <ArticleThumbnail variant="geo-watcher-process" eyebrow="HOW TO · GEO Watcher" className="h-[260px] w-full" />
              </figure>

              {/* Section 1: 結論 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>GEO・LLMO対策は「測る→知る→設計する→改善する→確かめる」の5ステップで回す</h2>
                <DialogueBubble speaker="A" emotion="thinking">GEO・LLMO対策をしたいけど、まず何からしたらいいか分からない。重要なのは分かっているけど具体的な方法はあるの？</DialogueBubble>
                <DialogueBubble speaker="S" emotion="explaining">そんなお悩みをお持ちの担当者も多いと思います。GEO・LLMO対策は現状分析から行います！自社がAI検索において、まずどの状況なのか確かめましょう。</DialogueBubble>
                <p className="article-prose">
                  本記事では、GEO Watcherを使って現状分析からモニタリング、プロンプト設計、コンテンツ改善までを回す具体的なプロセスを、実際の管理画面を交えて解説します。
                </p>
              </section>

              {/* Section 2: ステップ1 現状分析 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">ステップ1：GEO Watcherで現状分析から始める</h2>
                <p className="article-prose">
                  まずは自社やクライアントのブランド名を入力して、AI検索上における現状分析から始めましょう。AI検索においての現状分析に必要な情報は、以下の4つです。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">現状分析に必要な4つの情報</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>項目</div>
                      <div>意味</div>
                    </div>
                    {ANALYSIS_ITEMS.map((row) => (
                      <div key={row.label} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row.label}</div>
                        <div className="article-table__cell">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="article-prose">
                  この4つを準備してGEO・LLMOのモニタリングツールに情報を入力すると、現段階でのAI検索上における露出状況が把握できます。アセントネットワークスが提供しているGEO Watcherでは、対象となるブランド名とURLの2つを入れるだけで、簡単に現在の露出状況を把握することができます。また自動で競合他社を設定し、プロンプト（質問文）も数分で自動生成されるため、短時間で分析ができます。
                </p>
              </section>

              {/* Section 3: 初期設定 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">GEO Watcherを使った初期設定方法</h2>

                <h3 className="article-h3">初期設定1：ブランド設定</h3>
                <p className="article-prose">
                  管理画面に入ると「設定」からブランド名や競合他社の設定ができます。「ブランド」の設定画面では、対象となるブランド名とウェブサイトURLを入力します。また必須ではありませんが、サブドメインやブランドの別名称も入れると分析の精度がアップします。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepBrand} alt="GEO Watcherのブランド設定画面" className="w-full h-auto" />
                </figure>

                <h3 className="article-h3">初期設定2：競合他社</h3>
                <p className="article-prose">
                  次に競合他社を設定します。GEO Watcherでは、1つ前で設定したブランドから自動で競合他社が設定されます。事前に準備していなくても自動で入力されるので、とても便利です。もちろん、事前に用意した競合他社に変更することも可能です。競合他社は最大で20社まで登録できます。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepCompetitor} alt="GEO Watcherの競合他社設定画面" className="w-full h-auto" />
                </figure>

                <h3 className="article-h3">初期設定3：プロンプト設定</h3>
                <p className="article-prose">
                  プロンプトは、ユーザーがChatGPTなどに質問する文章を指します。こちらのプロンプトも自動で生成されるので、事前に準備する必要はありません。もちろんプロンプトの編集も可能なので、準備したプロンプトにも変更できます。モニタリングするプロンプト数が増えると、確認できる範囲が広くなります。ただし、関係のない質問を増やすより、実際のユーザーが質問しそうな内容を考えることが重要です。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepPrompt} alt="GEO Watcherのプロンプト設定画面" className="w-full h-auto" />
                </figure>
                <p className="article-prose">ここまで設定できたら、分析が開始できます。</p>
              </section>

              {/* Section 4: ステップ2 モニタリング */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">ステップ2：AI検索上での露出状況をモニタリング</h2>
                <p className="article-prose">
                  準備が整ったら、実際にAI検索上での露出状況をモニタリングします。モニタリングする指標は主に4つあり、この4つはGEO Watcherでも計測が可能です。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">モニタリングする4つの指標</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>項目</div>
                      <div>意味</div>
                    </div>
                    {MONITORING_METRICS.map((row) => (
                      <div key={row.label} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row.label}</div>
                        <div className="article-table__cell">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 5: AI可視性 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">モニタリング指標1：AI可視性</h2>
                <p className="article-prose">
                  登録したプロンプトごとに、自社ブランドがどれだけ露出されているかが分かる指標です。自社ブランドの名称が入ったプロンプトでは100%に近い可視性があるか、「おすすめの〜は？」といった比較検討のプロンプトでは競合他社に負けていないか、などAI検索上での可視性をチェックしましょう。もし自社ブランドの名称が入ったプロンプトで露出がされていなければ、対策が必要です。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepVisibility} alt="GEO WatcherのAI可視性画面" className="w-full h-auto" />
                </figure>
              </section>

              {/* Section 6: プロンプト別パフォーマンス */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">モニタリング指標2：プロンプト別のパフォーマンス</h2>
                <p className="article-prose">
                  登録したプロンプトの詳細パフォーマンスを確認します。GEO Watcherでは「詳細を見る」を押すと、各プロンプトのブランド言及、AI検索クエリ、引用URL、LLM応答が確認できます。特にLLM応答では、設定したAIエンジンでの実際の回答が見られます。AIエンジンの回答は検索結果と違い、毎回若干の差異があります。その中でも自社ブランドがしっかり引用されているか、推奨されているか、を定期的にモニタリングすることが大切です。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepPromptDetail} alt="GEO Watcherのプロンプト履歴・LLM応答画面" className="w-full h-auto" />
                </figure>
              </section>

              {/* Section 7: シェア・オブ・ボイス */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">モニタリング指標3：シェア・オブ・ボイス（SOV）</h2>
                <p className="article-prose">
                  競合他社と比較して自社ブランドが、どれだけ言及されているかが分かる指標です。シェア・オブ・ボイスは「SOV」と略されることもあります。画像では資生堂を例にしていますが、競合他社と比較して32%言及されていることが分かります。このシェア・オブ・ボイス（SOV）の数値が下がると、競合他社が何かしらの新製品を発表したか、PR活動をしたかなどの可能性があり、競合他社の動向がすぐにキャッチアップできます。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepSov} alt="GEO Watcherのシェア・オブ・ボイス画面" className="w-full h-auto" />
                </figure>
              </section>

              {/* Section 8: 引用URL */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">モニタリング指標4：引用URL</h2>
                <p className="article-prose">
                  AIエンジンに引用されたURLやドメインの詳細が確認できます。特にドメイン種別（自社、ソーシャルメディア、政府機関など）など細かく確認が可能です。自社ブランドのページにおいては改修ができるので、まずは自社のページの引用状況を把握して対策に移りましょう。
                </p>
                <figure className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <Image src={stepCitation} alt="GEO Watcherの引用URL画面" className="w-full h-auto" />
                </figure>
              </section>

              {/* Section 9: プロンプト設計 */}
              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">ステップ3：最適なプロンプトを設計する</h2>
                <DialogueBubble speaker="A" emotion="curious">モニタリングツールを使って数値として自社ブランド現状が把握できました！AI検索における指標も分かったので、これをモニタリングしていけばいいですね？</DialogueBubble>
                <DialogueBubble speaker="S" emotion="proposing">ありがとうございます。このままモニタリングしてもいいですが、今のプロンプトは自動で生成されたものです。もっと精度を上げるには「最適なプロンプト設計」をしましょう！</DialogueBubble>
                <p className="article-prose">
                  現状の把握が見えたら、次は本命のプロンプトを設計します。問いは「自社のビジネスにとって、どんな質問をされたときに、自社ブランドが回答に登場してほしいか」です。ここがGEOとSEOの実務が最も大きく分かれるポイントです。
                </p>
                <p className="article-prose">
                  SEOのキーワード調査が「検索される語」を集めるのに対し、GEOでは「AIに投げかけられる質問」を設計します。そしてAI検索の特徴は、最初の質問で終わらず、回答を受けてさらに質問を重ねるフォローアップ質問の連なりになることです。たとえば、ある製品カテゴリについて消費者は次のように質問を重ねます。
                </p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「〇〇にはどんな種類がある？」（カテゴリの学習）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「初心者に向いているのはどれ？」（自分ごと化）</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「AとBはどう違う？ デメリットは？」（比較と不安の解消）</span>
                  </li>
                </ul>

                <p className="article-prose">
                  ひとつのトピックの下で、消費者は必ず質問を続けます。この質問の連なりのどこに自社が回答者として登場できるかが、プロンプト設計の重要ポイントです。プロンプトは担当者が考えて作るのも問題ありませんが、それだとバイアスがかかります。SEOであれば検索ボリュームという定量的な判断ができましたが、GEO・LLMOでは定量的に判断できる材料がありません。
                </p>
                <p className="article-prose">
                  今すぐできるプロンプトの設計方法は、基準となるKW「〜 おすすめ」などのカスタマージャーニーマップを作成したあと、トピックKWを分類します。トピックKWが出たら検索ボリュームを調査して、1番検索ボリュームの多いKWに対してプロンプトを作成します。必要であればGEO Watcherの「
                  <Link href="/watcher" className="font-bold underline hover:opacity-80" style={{ color: "#1452FF" }}>スポットサポート（オプション）</Link>
                  」で、データ根拠に基づくプロンプト設計ができます。担当者がブランド、商品、ターゲットについてヒアリングし、検索ビッグデータに基づき消費者が実際に検索しているテーマから、計測すべき最適なプロンプトを設計します。単に質問文（プロンプト）を作るのではなく、「なぜこの質問を追うのか」まで整理した状態で納品します。
                </p>
                <p className="article-prose">
                  最適なプロンプトに設計したあと、改めてモニタリングを開始します。目的は、「どのプロンプトで自社が露出されていないのか」という弱点の特定です。再設計したプロンプトは、AIが自社のブランドをどのように紹介するか／しないかを測るベンチマークです。これを継続的にモニタリングすることで、以下のような問題が特定できます。
                </p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>競合は複数社が引用・言及されているのに、自社だけが登場しないプロンプト</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>自社が言及はされるものの、扱いが弱い（引用位置が低い、文脈が不利）プロンプト</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>どのAIエンジンで、どのトピック（価格比較・用途相談など）が弱いのか</span>
                  </li>
                </ul>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    「競合は出ているのに自社が出ていない場所」こそ、次のステップで優先的にコンテンツを対策する領域。ここを特定しないままコンテンツ制作を始めると、労力をかけても成果につながりにくい。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 10: コンテンツ改善 */}
              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">ステップ4：GEO・LLMOに特化したコンテンツ改善</h2>
                <DialogueBubble speaker="A" emotion="understanding">確かに、ユーザーがどんな質問をするかを再設計するのは大切ですね。なぜこの質問を追うのか？ここまで考えてプロンプトを考えてモニタリングすると、より精度が高くなりますね！</DialogueBubble>
                <DialogueBubble speaker="S" emotion="guiding">はい、アセントネットワークスでは検索ビッグデータに基づいたプロンプト設計サポートも行っています。ここまで来たら、次はAIに引用されるようにコンテンツを改善しましょう。</DialogueBubble>
                <p className="article-prose">
                  特定した弱点プロンプトに対して、その「答え」となるコンテンツを制作・改修します。ここで制作するコンテンツは、SEO対策を意識した記事作成と重なりつつも異なります。AIは、質問に対して明確・簡潔に回答し、根拠を伴い、ページ単体で完結しているコンテンツを優先的に引用します。「キーワードを含む網羅的な長文」というSEO的発想のままでは、AIにとって引用しやすい情報源にはなりません。具体的には、次の7つの設計ルールに沿ってコンテンツを組み立てます。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    GEO・LLMO最適化のためのページ作成7原則
                  </div>
                  {SEVEN_RULES.map((rule, i) => (
                    <div
                      key={rule.num}
                      className={`flex items-center gap-4 px-5 py-4 ${i < SEVEN_RULES.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}
                    >
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#1452FF]/10 font-mono text-[11px] font-bold text-[#1452FF]">
                        {rule.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[14px] text-[#0B0B0E]">{rule.title}</div>
                        <div className="text-[13px] text-[#6B6B73]">{rule.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  この7つのルールのうち中心にあるのは「H2はフォローアップ質問と1:1で対応させる」です。再設計したフォローアップ質問のリストが、そのまま見出し設計・FAQ設計の骨格になるため、「何を書くか」をゼロから考える必要はありません。質問リストを介して直結しているのです。そのうえで、既存コンテンツで対応できるものは7つのルールに沿ったリライトで、存在しないものは新規制作で対応し、限られた制作リソースを弱点の大きい順に投じていきます。
                </p>
                <p className="article-prose">
                  もしGEO・LLMOに特化した専門的なコンテンツ改修サポートが必要なら、GEO Watcherの「
                  <Link href="/watcher" className="font-bold underline hover:opacity-80" style={{ color: "#1452FF" }}>スポットサポート（オプション）</Link>
                  」をご利用ください。AIに引用されている競合ページと自社ページを比較し、改善すべきページと優先順位を整理します。感覚ではなく、現在の引用状況や競合との差をもとに、次に取り組むべき改善の方向性を明確にします。
                </p>
              </section>

              {/* Section 11: 再設計サイクル */}
              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">ステップ5：モニタリングと再設計を繰り返し次の改善へ</h2>
                <DialogueBubble speaker="A" emotion="impressed">GEO・LLMOの最適化7原則は分かりやすいですね！SEOとは、また違う視点でのページ設計が必要だと感じました。改修サポートの利用も考えてみます。</DialogueBubble>
                <DialogueBubble speaker="S" emotion="closing">GEO・LLMOはSEOとは違った視点での対策が必要です。最後はこれまでのプロセスを測る、比べる、改善する、確かめるサイクルで回していきましょう。</DialogueBubble>
                <p className="article-prose">
                  最後のステップは、特別な作業ではありません。ここまでの流れを、サイクルとして回し続けることです。
                </p>
                <p className="article-prose">
                  制作・改修したコンテンツの成果は、モニタリング結果に現れます。言及回数（シェア・オブ・ボイス）は増えたか、引用は獲得できたか、弱点だったプロンプトでの扱いは変わったか。改善が確認できた領域は維持し、改善ができていない領域はプロンプトの設計（ステップ3）に立ち返って見直します。この判断を、計測データに基づいて繰り返します。KPIとしては、次の4つを軸に据えます。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">継続モニタリングのKPI</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>KPI</div>
                      <div>内容</div>
                    </div>
                    {KPI_ITEMS.map((row) => (
                      <div key={row.label} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row.label}</div>
                        <div className="article-table__cell">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 12: FAQ */}
              <section id="s12" className="article-section">
                <span className="article-kicker">12</span>
                <h2 className="article-h2">GEO Watcherを使ったGEO・LLMO対策に関するFAQ</h2>

                <h3 className="article-h3">GEO Watcherの初期設定にはどれくらい時間がかかりますか？</h3>
                <p className="article-prose">
                  ブランド名とURLを入力するだけで、競合他社とプロンプトは自動で生成されます。専門的な設定をしなくても、数分で分析を開始できます。
                </p>

                <h3 className="article-h3">プロンプトは自動生成されたものをそのまま使ってよいですか？</h3>
                <p className="article-prose">
                  まずは自動生成されたプロンプトでモニタリングを開始し、全体像を把握することをおすすめします。そのうえで、実際のユーザーが質問しそうな内容や、自社が回答に登場してほしい質問に絞って再設計すると、より精度の高い分析になります。
                </p>

                <h3 className="article-h3">競合他社は何社まで登録できますか？</h3>
                <p className="article-prose">
                  GEO Watcherでは競合他社を最大20社まで登録できます。自動で設定された競合他社を、事前に用意した競合他社に変更することも可能です。
                </p>

                <h3 className="article-h3">プロンプト設計を自社で行うのが難しい場合はどうすればよいですか？</h3>
                <p className="article-prose">
                  GEO Watcherの「
                  <Link href="/watcher" className="font-bold underline hover:opacity-80" style={{ color: "#1452FF" }}>スポットサポート（オプション）</Link>
                  」をご利用いただくと、検索ビッグデータに基づき、消費者が実際に検索しているテーマから計測すべき最適なプロンプトを設計します。コンテンツ改善についても、同様にスポットサポートで対応可能です。
                </p>

                <h3 className="article-h3">どのくらいの頻度でモニタリングすればよいですか？</h3>
                <p className="article-prose">
                  AIエンジンの回答は検索結果と違い、毎回若干の差異があります。GEO Watcherでは毎日の計測が可能なため、日々の変化を追いながら、施策前後の変化を時系列で比較することが効果検証の基本になります。
                </p>
              </section>

              {/* Section 13: まとめ */}
              <section id="s13" className="article-section">
                <span className="article-kicker">13</span>
                <h2 className="article-h2">まとめ：具体的なGEO・LLMO対策のプロセス</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    計測（現状把握）→設計（プロンプト）→計測（弱点特定）→制作（コンテンツ）→計測（効果検証）という往復こそが、データに根拠を持つ、再現性のあるGEO・LLMO対策である。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>

                <p className="article-prose">GEO・LLMO対策のプロセスは、次の5つのステップで整理できます。</p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>現状分析</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>モニタリング</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>最適プロンプト設計</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>GEO・LLMOに特化したコンテンツ改善</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>モニタリングと再設計の繰り返し</span>
                  </li>
                </ul>

                <p className="article-prose">
                  AIの回答はモデルの更新によっても変化するため、GEO・LLMOに「やり切って終わり」はありません。しかし裏を返せば、モニタリングの仕組みさえあれば、変化は必ず数字として把握でき、改善につなげられます。まずは現状分析〜モニタリングをするのが対策の1歩です。GEO Watcherは、本格的にGEO・LLMO対策に取り組めるモニタリングツールとしてご利用いただけます。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    GEO Watcherの特徴
                  </div>
                  {[
                    "主要7個のAIに対応",
                    "毎日計測",
                    "競合20社まで比較",
                    "データ1年保存",
                  ].map((f, i, arr) => (
                    <div key={f} className={`flex items-center gap-3 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#1452FF]" />
                      <span className="text-[14px] font-bold text-[#0B0B0E]">{f}</span>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  計測（現状把握）→設計（プロンプト）→計測（弱点特定）→制作（コンテンツ）→計測（効果検証）という往復こそが、データに根拠を持つ、再現性のあるGEO・LLMO対策です。
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
