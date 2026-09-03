import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "自社サイトはAIにどれだけ引用されている？セルフチェック方法";
const PAGE_DESCRIPTION =
  "ChatGPT・Gemini・Perplexity・Copilotなどの主要AIモデルに自社サイトはどれだけ引用されるかのセルフチェック方法を分かりやすく解説します。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ai-citation-self-check",
  keywords: ["AI引用", "セルフチェック", "ChatGPT", "Gemini", "Perplexity", "Copilot", "GEO", "LLMO", "GEO Watcher"],
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

const SURVEY_ROWS = [
  ["第一弾", "2025年5月", "21.3%", "－"],
  ["第二弾", "2025年10月", "31.1%", "+9.8ポイント"],
  ["第三弾", "2026年2月", "37.0%", "+5.9ポイント"],
];

const ENGINE_ROWS = [
  ["ChatGPT", "チャットで質問を入力し、回答内の言及・出典リンクを確認", "「〇〇（業界）でおすすめの△△は？」"],
  ["Gemini", "Google検索と連携した回答内の引用元を確認", "「△△を選ぶときの比較ポイントは？」"],
  ["Perplexity", "回答下部の出典（Sources）一覧を確認", "「〇〇の課題を解決するには？」"],
  ["Copilot", "回答内のリンク番号・参照元を確認", "「△△の会社を比較して」"],
];

const PROMPT_GROUPS = [
  {
    label: "商品/サービスのカテゴリ名",
    items: ["「美白美容液のおすすめを教えて」", "「敏感肌向けの化粧水で人気があるのは？」", "「40代におすすめのエイジングケアクリームは？」"],
  },
  {
    label: "比較/選定の質問",
    items: ["「プチプラとデパコスの美容液、何が違う？」", "「エイジングケア化粧品を選ぶときのポイントは？」", "「乾燥肌向けと脂性肌向けの化粧水はどう選べばいい？」"],
  },
  {
    label: "課題ベースの質問",
    items: ["「毛穴の開きを改善するスキンケア方法は？」", "「肌荒れしやすい人におすすめの化粧水は？」", "「敏感肌でも使えるUVケアはどれ？」"],
  },
  {
    label: "自社名を含む質問",
    items: ["「（ブランド名）の美容液の口コミや評判は？」", "「（ブランド名）と（競合ブランド名）、どちらがいい？」", "「（ブランド名）の化粧水は敏感肌でも使える？」"],
  },
];

const CHECK_POINTS = [
  { title: "言及の有無", desc: "自社名・サービス名が回答文中に登場したか" },
  { title: "登場順位", desc: "複数社が紹介されている場合、自社が何番目に紹介されているか" },
  { title: "出典リンクの有無", desc: "回答の下に自社サイトへのリンクが表示されているか" },
];

const WALLS = [
  { title: "壁① 回答が揺れる", desc: "同じ質問でも、AIの回答はセッションや文脈によって内容が変わります。1回の結果だけで「自社は引用されている／されていない」と判断するのは早計です。" },
  { title: "壁② 質問数・AIエンジンが多すぎて手が回らない", desc: "CDJの5段階それぞれで質問を用意し、主要6つのAIエンジン×競合他社分をすべて手動でチェックしようとすると、1回の調査だけで数十〜百通り以上の組み合わせになります。" },
  { title: "壁③ 時系列の変化が追えない", desc: "手動チェックは「今この瞬間」のスナップショットです。先月と比べて改善したのか悪化したのか、都度メモを取って比較しない限り分かりません。" },
];

const MONITORING_ROWS = [
  ["自分で質問を考えて都度入力", "CDJ段階別の質問クラスターを継続的に投げかけ"],
  ["1回ごとのスナップショット", "月次でのトレンド推移を自動記録"],
  ["ChatGPTなど1エンジンずつ確認", "主要6エンジン（ChatGPT、Gemini、Perplexity、Google AI Overviews、AI Mode、Copilot。Claudeはオプションで追加可能）を横断して一括計測"],
  ["競合との比較はメモベース", "Share of Voice（競合内シェア）を自動算出"],
  ["出典リンクの有無を目視確認", "Citation数・Brand Positionを指標化"],
];

const REFERENCES = [
  { text: "株式会社サイバーエージェント「生成AIのユーザー利用実態調査 第三弾」（2026年3月5日）", url: "https://www.cyberagent.co.jp/news/detail/id=33041" },
  { text: "Ahrefs Pte. Ltd. プレスリリース「AIによる概要のゼロクリック影響、日本でも約38%のオーガニッククリック減少を確認」（2026年2月26日）", url: "https://prtimes.jp/main/html/rd/p/000000037.000157671.html" },
  { text: "Ascent GEO Lab「業界別AIトラフィックレポート2026 Q1 — Adobeレポート」", url: "https://geo.ascentnet.co.jp/lab/adobe-ai-traffic" },
];

const FAQS = [
  {
    q: "セルフチェックは何回くらいやればいいですか。",
    a: "まずは1回で構いません。ただしAIの回答は変動するため、判断を急がず、可能であれば同じ質問を数日おきに2〜3回試すと、より実態に近い傾向がつかめます。",
  },
  {
    q: "競合と比較する場合はどうすればいいですか。",
    a: "自社名を聞くのではなく、「〇〇（カテゴリ）でおすすめは？」のような一般的な比較質問を投げ、回答内で自社と競合のどちらが先に・どのくらいの分量で紹介されているかを比較します。",
  },
  {
    q: "セルフチェックで「引用されていない」と分かった場合、次に何をすべきですか。",
    a: "まずはAIが参照しやすい構造（質問形の見出し、FAQ、数値データの明示など）にコンテンツを見直すことが基本です。加えて、顧客がどんな質問をAIに投げているか把握できていない場合は、質問データの調査から始めることをおすすめします。",
  },
  {
    q: "GEO対策の効果はどうやって確認すればよいですか。",
    a: "ChatGPTやPerplexity、Google AI Overviewsなどに自社に関連する質問を実際に入力し、自社名やサイトが引用されているかを確認する方法があります。",
  },
  {
    q: "セルフチェックとGEO Watcherは何が違いますか。",
    a: "セルフチェックは無料で今すぐできる一時的な確認方法です。GEO Watcherは、CDJ段階別の質問クラスターを主要6エンジン横断・月次で自動計測し、競合比較やトレンド推移まで可視化する継続モニタリングです。",
  },
];

export default function AiCitationSelfCheckPage() {
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
                <span className="text-[#FDFDFB]">AI引用セルフチェック方法</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                SELF CHECK
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">自社サイトはAIにどれだけ</span>
                <span className="block text-[#1452FF]">引用されている？セルフチェック方法</span>
              </h1>

              <p className="article-hero__lede">
                自社がAIにどれだけ引用されているかは、ChatGPT・Gemini・Perplexity・Copilotに質問を投げるだけで今すぐ確認できます。4つのAIエンジンでのセルフチェック手順と結果の読み方を解説し、手動チェックの限界と、継続的にモニタリングする方法まで紹介します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.28" },
                  { l: "LENGTH", v: "約4,500文字" },
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
                <ArticleThumbnail variant="self-check" eyebrow="SELF CHECK" className="h-[260px] w-full" />
              </figure>

              {/* Section 1: なぜ確認すべきか */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>なぜ「AIに引用されているか」を確認すべきなのか</h2>
                <p className="article-prose">
                  生成AI検索の利用率はこの9カ月で15.7ポイント上昇し、2026年2月時点で37.0%に達しています。株式会社サイバーエージェントのGEOラボが全国10代〜60代の男女9,278名を対象に実施した調査では、生成AI検索の普及スピードが明確に示されています。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">生成AI検索利用率の推移（全国10代〜60代、9,278名対象）</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>調査回</div>
                      <div>実施時期</div>
                      <div>生成AI検索利用率</div>
                      <div>前回調査からの増加幅</div>
                    </div>
                    {SURVEY_ROWS.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                        <div className="article-table__cell">{row[3]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-[#9A9AA0]">
                  出典：株式会社サイバーエージェント「生成AIのユーザー利用実態調査 第三弾」（2026年3月5日）
                </p>

                <p className="article-prose mt-6">
                  もはや一部の層だけの動きにとどまらず、20代の利用率は2026年2月時点で初めて過半数を突破しました。
                </p>
                <p className="article-prose">
                  この変化を後押ししているのが、検索結果に要約を表示する「AI Overview」の普及です。Ahrefsの調査（2026年2月）では、AI Overviewが表示されるキーワードにおいて、検索1位ページのCTRがグローバルで約58%、日本でも約37.8%低下したことが明らかになっています。Adobeの調査（2026年）でも、AI経由でリテールサイトに流入する訪問数が前年比393%増加したと報告されています。つまり、検索順位が良くても、ユーザーがAIの回答だけで満足し、サイトへのクリックが発生しないケースが増えています。この状況で「自社がAIの回答の中に登場しているか」は、これからの露出を測る新しい指標になります。
                </p>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    つまり：生成AI検索の利用率は9カ月で15.7ポイント上昇し、2026年2月時点で37.0%に達しています。特定の世代・サービスに偏らず、全世代に広がっています。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 2: 4つのAIエンジンでのセルフチェック方法 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>4つのAIエンジンでセルフチェックする方法</h2>
                <p className="article-prose">
                  主要な4つのAIエンジンに、以下のような質問を投げかけて確認します。ポイントは、自社名で検索するのではなく、顧客が実際に使いそうな「悩み・比較の質問」で聞くことです。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">AIエンジン別セルフチェック方法</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>AIエンジン</div>
                      <div>チェック方法</div>
                      <div>プロンプト例</div>
                    </div>
                    {ENGINE_ROWS.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                        <div className="article-table__cell">{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="article-prose mt-8">
                  チェックする質問は1つだけでなく、以下のような切り口で複数用意すると精度が上がります。化粧品を例にカテゴリ別の質問の具体例を挙げてみます。
                </p>

                <div className="my-8 grid gap-6 sm:grid-cols-2">
                  {PROMPT_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="mb-3 font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-label)" }}>{group.label}</p>
                      <ul className="flex flex-col overflow-hidden rounded-xl border border-[#E6E4DD]">
                        {group.items.map((item, i) => (
                          <li
                            key={item}
                            className={`px-5 py-3.5 leading-[1.6] text-[#0B0B0E] ${i < group.items.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}
                            style={{ fontSize: "var(--fs-body-sm)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  最低でも5〜10問程度、CDJ（カスタマージャーニー：初期探索〜購買確定〜購買以後）の各段階を意識して用意すると、単なる「知名度チェック」ではなく「どの検討段階で自社が抜けているか」まで見えてきます。
                </p>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    つまり：ChatGPT・Gemini・Perplexity・Copilotに、自社名ではなく顧客目線の質問を5〜10問程度投げかけることで、AIにおける自社の扱われ方を今すぐ確認できます。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 3: チェック結果の確認方法 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">チェック結果の確認方法</h2>
                <p className="article-prose">
                  回答を確認する際は、以下の3点を記録しておくと後で比較しやすくなります。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {CHECK_POINTS.map((item, i, arr) => (
                    <div key={item.title} className={`flex items-start gap-4 px-5 py-5 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#1452FF]/10 font-mono text-[11px] font-bold text-[#1452FF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>{item.title}</div>
                        <div className="text-[#6B6B73]" style={{ fontSize: "var(--fs-body-sm)" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  例えば「回答文には触れられているが、出典リンクは競合サイトのみ」というケースはよくあります。これは、AIが自社の存在は認識しているものの、詳細情報の参照元としては選ばれていない状態を示しています。
                </p>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    つまり：AIの回答は「言及の有無」「登場順位」「出典リンクの有無」の3点で確認します。言及はあっても出典リンクがない場合は、参照元として選ばれていないサインです。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 4: 手動チェックだけでは分からないこと */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">手動チェックだけでは分からないこと</h2>
                <p className="article-prose">
                  ここまでの方法は無料かつ今すぐ実施できますが、実際にやってみると次のような限界にすぐ突き当たります。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {WALLS.map((item, i, arr) => (
                    <div key={item.title} className={`px-5 py-5 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <div className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>{item.title}</div>
                      <div className="mt-1 leading-[1.7] text-[#6B6B73]" style={{ fontSize: "var(--fs-body-sm)" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    つまり：手動チェックには「回答の揺れ」「網羅性の限界」「時系列で追えない」という3つの壁があります。継続的に・複数の質問で・競合と比較しながら追う場合は自動化が必要です。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 5: 継続的にモニタリングするには */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">継続的にモニタリングするには</h2>
                <p className="article-prose">
                  Ascentでは、AI検索での自社露出を継続的に可視化するモニタリングツール「GEO Watcher」を提供しています。手動チェックで確認した内容を、自動化・拡張したものと考えると分かりやすいです。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">セルフチェックとGEO Watcherの比較</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  <div className="article-table article-table--2col" style={{ margin: 0 }}>
                    <div className="article-table__head">
                      <div>手動セルフチェック</div>
                      <div>GEO Watcherによるモニタリング</div>
                    </div>
                    {MONITORING_ROWS.map((row) => (
                      <div key={row[0]} className="article-table__row">
                        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                        <div className="article-table__cell">{row[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="article-prose mt-8">
                  「Brand Visibility（AI回答内での自社露出率）」「Citations（引用された絶対数）」「AI Traffic（AI経由の流入比率）」「Brand Position（回答内での紹介順位）」の4指標を継続的に追跡することで、施策の効果を数字で確認できるようになります。
                </p>

                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    つまり：GEO Watcherは、手動チェックで行っていた確認作業をCDJ段階別・主要6エンジン横断・月次トレンドで自動化するツールです。Brand Visibilityなど4指標で効果を数字で確認できます。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              {/* Section 6: まとめ */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>まとめ：自社サイトのAI引用状況の確認方法</h2>
                <p className="article-prose">
                  自社がAIにどれだけ引用されているかは、ChatGPT・Gemini・Perplexity・Copilotなどに質問を投げるだけで、今すぐ無料で確認できます。まずはこの記事の手順で、自社の現在地を把握してみましょう。一方で、手動チェックには「回答の揺れ」「網羅性の限界」「時系列で追えない」という3つの壁があります。継続的に・複数の質問で・競合と比較しながら自社のAI露出を追いたい場合は、モニタリングの自動化が現実的な選択肢になります。
                </p>
                <p className="article-prose">
                  Ascentでは、セルフチェックの結果をもとにした無料相談も受け付けています。自社の状況を客観的に整理したい方は、お気軽にお問い合わせください。
                </p>
              </section>

              {/* Section 7: FAQ */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">「AI引用チェック」に関するよくある質問</h2>

                {FAQS.map((item) => (
                  <div key={item.q}>
                    <h3 className="article-h3">{item.q}</h3>
                    <p className="article-prose">{item.a}</p>
                  </div>
                ))}
              </section>

              {/* Section 8: 参考文献 */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">参考文献</h2>
                <ol className="article-list">
                  {REFERENCES.map((ref, i) => (
                    <li key={ref.url} className="article-list__item">
                      <span className="article-list__bullet font-mono text-[10px]">{i + 1}</span>
                      <span>
                        {ref.text}
                        {"　"}
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-[#1452FF] underline underline-offset-2 hover:text-[#0B3FCC]">
                          {ref.url}
                        </a>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
