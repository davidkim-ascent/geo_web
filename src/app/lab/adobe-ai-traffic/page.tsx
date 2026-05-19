import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleTOC } from "./ArticleTOC";
import { RelatedResearchSection } from "@/components/lab/RelatedResearchSection";
import {
  IndustryGrowthChart,
  RetailEngagementChart,
  TravelConversionChart,
  IndustryEngagementChart,
  GenerationAIUsageChart,
  TechPurchaseCategoryChart,
} from "./AdobeCharts";

const PAGE_TITLE = "業界別AIトラフィックレポート 2026 Q2 — Adobeレポート";
const PAGE_DESCRIPTION =
  "Adobeが1兆件超の訪問データを分析した2026 Q2 AIトラフィックレポートの要点まとめ。リテール+393%、旅行+233%など業界別AI訪問増加率と、コンバージョン・エンゲージメントへの影響をグラフで報告。";

export const metadata: Metadata = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/adobe-ai-traffic",
  keywords: ["AIトラフィック", "Adobe", "GEO", "AI検索", "コンバージョン率", "業界別"],
});

export const dynamic = "force-static";

export default function AdobeAiTrafficPage() {
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
                <span className="text-[#FAFAF7]">Adobe AIトラフィックレポート</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                INDUSTRY REPORT
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">業界別AIトラフィックレポート</span>
                <span className="block text-[#1452FF]">2026 Q2 — Adobeレポート</span>
              </h1>

              <p className="article-hero__lede">
                1兆件超の訪問データが示す変化。AIは「閲覧ツール」から「購入を後押しする力」へ。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.19" },
                  { l: "LENGTH", v: "約6,000文字" },
                  { l: "FORMAT", v: "REPORT" },
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

              {/* s1 主要ポイント */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">主要ポイント</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AIを経由して訪れたユーザーは、サイトにより長く滞在し、より購入につながりやすくなっている。
                    これはすべての業界で確認された傾向だ。
                  </p>
                  <span className="article-quote__note">Adobe Digital Insights 2026 Q2</span>
                </blockquote>
                <p className="article-prose">
                  このレポートはAdobe Digital Insightsが作成しました。米国のショッピングサイトへの訪問記録1兆件以上と、商品情報1億件以上を分析し、2026年3月には米国の消費者5,000人以上を対象にAIの利用について調査しています。
                </p>
                <p className="article-prose">
                  レポートが示す核心は明確です。AI経由でウェブサイトに流入する訪問はすべての業界で増加しており、AI経由で訪れたユーザーはサイトにより長く滞在し、より購入につながりやすくなっています。
                </p>

                <figure className="my-8">
                  <IndustryGrowthChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図1：業界別AI訪問増加率（前年比、2026年第1四半期）
                  </figcaption>
                </figure>

                <p className="article-prose">
                  テクノロジー／ソフトウェア分野はAI訪問の比率が最も高く、メディア／エンターテインメントの約2倍、リテールの約4倍です。AI訪問が多い優れたリテールサイトには共通点があります。AIがそのサイトの内容を読み取り、理解しやすいように作られていることです。
                </p>
              </section>

              {/* s2 リテール */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">リテール：AI訪問が393%増加、CVRも逆転</h2>
                <p className="article-prose">
                  2026年第1四半期に、AI経由でリテールサイトに入ってきた訪問は前年より393%増加しました。2025年12月には前年より1,151%増加し、ピークに達しています。
                </p>
                <p className="article-prose">
                  2026年3月の調査では、消費者の39%がオンラインショッピングでAIアシスタントを使ったことがあると答えました。ショッピングにAIを使う人のうち85%は、AIがオンラインショッピング体験をより良いものにしたと答えています。
                </p>

                <h3 className="article-h3">AI訪問者は、今ではより購入につながりやすくなっています</h3>
                <p className="article-prose">
                  1年前、AI経由で訪れたユーザーの購入コンバージョン率は、通常訪問者のほぼ半分の水準でした。しかし2026年3月には、AI訪問者のコンバージョン率が通常訪問者より<strong>42%高く</strong>なりました。
                </p>

                <figure className="my-8">
                  <RetailEngagementChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図2：AI訪問者 vs 通常訪問者の主要指標比較（リテール、2026年3月）
                  </figcaption>
                </figure>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者のエンゲージメントは通常訪問者より12%高い（2026年3月）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者のサイト滞在時間は通常訪問者より48%長い
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者の1訪問あたり閲覧ページ数は13%多い
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者の直帰率は通常訪問者より32%低い
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問の1訪問あたり売上は通常訪問より37%高い（1年前は逆に通常訪問が128%高かった）
                  </li>
                </ul>

                <div className="article-callout">
                  <p className="article-callout__text">
                    消費者の66%はGenAIツールが正確な結果を提供すると信頼しており、AIを使う買い物客の79%はAIを使った後に購入への確信が高まると答えています。
                  </p>
                </div>
              </section>

              {/* s3 旅行 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">旅行：AI訪問233%増、CVR差が86%→14%に縮小</h2>
                <p className="article-prose">
                  2026年第1四半期、旅行サイトへのAI訪問は前年より233%増加しました。2024年10月以降、継続して2桁または3桁の成長を示しています。
                </p>
                <p className="article-prose">
                  2026年3月の調査では、旅行者の86%が「AIで旅行を計画すると体験がより良くなる」と答えました。旅行者はAIを旅行の調査（48%）、旅行アイデアとおすすめ（44%）、予算づくり（30%）、荷造りのサポート（21%）に使っています。
                </p>

                <figure className="my-8">
                  <TravelConversionChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図3：旅行分野 AI訪問 vs 通常訪問のCVR差の推移（2024年10月〜2026年3月）
                  </figcaption>
                </figure>

                <p className="article-prose">
                  AI訪問と通常訪問のコンバージョン率の差は、2024年10月の約86%から2026年3月には14%まで急速に縮小しました。AI訪問はまだ通常訪問よりコンバージョン率が低いものの、その差は急速に縮まっています。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者のエンゲージメント率：通常訪問者より17%高い
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    サイト滞在時間：通常訪問者より61%長い（差は時間とともに拡大）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    直帰率：通常訪問者より41%低い
                  </li>
                </ul>
              </section>

              {/* s4 金融 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">金融サービス：AI訪問158%増、信頼度89%</h2>
                <p className="article-prose">
                  2026年第1四半期、金融サービスサイトへのAI訪問は前年より158%増加しました。2024年10月以降、15か月連続で安定して増加しています。
                </p>
                <p className="article-prose">
                  2026年3月の調査では、消費者の24%が金融に関するニーズのためにAIアシスタントを使っていると答えました。消費者が金融分野でAIを使う用途は次のとおりです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    預金口座や銀行商品のおすすめ：39%
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    複雑な金融概念の理解：36%
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    金融商品の理解：35%
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    個人の予算づくり：32%
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    投資のおすすめ：31%
                  </li>
                </ul>
                <p className="article-prose">
                  AI訪問者は金融サービスサイトで通常訪問者より29%長く滞在し、直帰率は17%低くなりました。エンゲージメント率は7%高くなっています。特筆すべきは、消費者の89%が「人の助けがなくてもAIが金融のおすすめをしてくれることを信頼している」と答えていることです。
                </p>
              </section>

              {/* s5 メディア */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">メディア／エンタメ：AI訪問84%増、継続的エンゲージメント向上</h2>
                <p className="article-prose">
                  2026年第1四半期、メディア／エンターテインメントサイトへのAI訪問は前年より84%増加しました。2026年3月の調査では、消費者の48%がメディアやエンターテインメントコンテンツを探すときにAIアシスタントを使っており、56%は近い将来に使う予定だと答えています。
                </p>
                <p className="article-prose">
                  消費者がAIを使って探すコンテンツはテレビ番組または映画（56%）、ニュースと時事問題（47%）、ソーシャルメディアとインフルエンサーコンテンツ（42%）、本とポッドキャストのおすすめ（25%）の順です。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    エンゲージメント：通常訪問者より14%高い（2024年11月以降、13〜18%の範囲を継続）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    滞在時間：通常訪問者より29%長い
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    直帰率：通常訪問者より17%低い
                  </li>
                </ul>
                <div className="article-callout">
                  <p className="article-callout__text">
                    この分野でAIを使う消費者の84%は、AIがすすめたコンテンツを購入する可能性が高いと答えました。68%はAIが提供するおすすめに満足していると答えています。
                  </p>
                </div>
              </section>

              {/* s6 テクノロジー */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">テクノロジー／ソフトウェア：AI訪問シェアが最も高い分野</h2>
                <p className="article-prose">
                  2026年第1四半期、テクノロジー／ソフトウェアサイトのAI訪問シェアは前年より63%増加しました。2026年3月時点でメディア／エンターテインメントのほぼ2倍、銀行の10倍、リテールと旅行の約4倍です。
                </p>
                <p className="article-prose">
                  消費者の47%が技術製品やサービスを理解し、問題を解決し、購入判断をするためにAIを使っており、61%は今後使いたいと答えています。消費者の21%はAIの助けを受けて技術またはソフトウェア製品を購入したことがあります。
                </p>

                <figure className="my-8">
                  <TechPurchaseCategoryChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図4：AIを使って購入した技術製品カテゴリ内訳
                  </figcaption>
                </figure>

                <p className="article-prose">
                  テクノロジー分野はエンゲージメントと直帰率改善で最も大きな差を示しました。AI訪問者は通常訪問者よりエンゲージメントが30%高く（調査業界中最大）、直帰率は40%低くなりました。AI訪問者は滞在時間が40%長く、閲覧ページ数が23%多くなっています。
                </p>

                <figure className="my-8">
                  <IndustryEngagementChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図5：業界別 AI訪問のエンゲージメント向上率・直帰率低下率
                  </figcaption>
                </figure>
              </section>

              {/* s7 AIユーザーの特徴 */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">AIユーザーの特徴：都市部・高学歴・若い世代が先行</h2>
                <p className="article-prose">
                  Adobe Digital Insightsは今回のレポートで、AIを多く使うユーザーの属性についても分析しています。
                </p>

                <h3 className="article-h3">地域差：都市部での普及が先行</h3>
                <p className="article-prose">
                  都市部と郊外の消費者は、農村部の消費者よりAIアシスタントをよく知っており、より頻繁に使っていました。農村部では、AIへの親しみ、定期利用、利用の増加のすべてが低くなりました。都市部の消費者は、AIが作業を代わりに処理したり、意思決定を助けたりすることをより信頼していました。
                </p>

                <h3 className="article-h3">教育水準：知識の差、信頼の差ではない</h3>
                <p className="article-prose">
                  学位を持つ人は、高校卒業以下の学歴の人より、AIアシスタントにより慣れており、AIを使えばより多くのことができると考えていました。一方で、AIの結果が正確だと信じる割合は教育水準によって大きな差はありませんでした（高校卒業以下66%、学位保有68%）。差が大きかったのは「AIで何ができるかを知っている度合い」でした。
                </p>

                <h3 className="article-h3">世代別：Gen ZとMillennialがショッピングでAIを牽引</h3>
                <figure className="my-8">
                  <GenerationAIUsageChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図6：世代別オンラインショッピングでのAI利用率
                  </figcaption>
                </figure>
                <p className="article-prose">
                  オンラインショッピングでAIを使ったことがある割合はGen Zが53%、ミレニアル世代が48%と高く、Gen Xとベビーブームはそれぞれ34%でした。ミレニアル世代とGen Zは、AIが作業を代わりに処理したり自動化したりすることをより信頼していました。
                </p>

                <h3 className="article-h3">所得と利用意識</h3>
                <p className="article-prose">
                  回答者の61%はAIに慣れていると答えました。73%はAIが生活をより楽にすると考えています。しかし、AIを定期的に使っていると答えた人は30%でした。知っていて期待している人は多いものの、頻繁に使う人はまだ少ない状況です。年収7万ドル以上の消費者は、エージェント型AIの利用（予定の設定、食料品配達、仕事の支援）に対してより強い確信を示しました。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>業種</div>
                    <div>AIへの親しみ</div>
                    <div>定期利用率</div>
                  </div>
                  {[
                    ["テクノロジー／SW", "89%", "64%"],
                    ["金融サービス", "80%", "40%"],
                    ["旅行", "—", "42%"],
                    ["リテール", "66%", "30%"],
                  ].map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* s8 まとめ */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">まとめ：AIトラフィックの「質」が変わった</h2>
                <p className="article-prose">
                  Adobeレポートが示す最も重要な変化は、AIトラフィックの「量」だけでなく「質」の向上です。1年前はAI訪問者のコンバージョン率が通常訪問者の半分以下でした。今では逆転し、AI訪問者の方がより長く滞在し、より多くページを見て、より購入につながっています。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問はすべての業界で前年比50%以上増加（リテールは393%増）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    AI訪問者のコンバージョン率は通常訪問者を上回った（リテール+42%）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    旅行のCVR差は86%→14%に急縮小し、格差はほぼ消滅しつつある
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    テクノロジー分野はAI訪問シェアが最高（他業界の2〜10倍）
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    消費者の信頼が高まっており、89%（金融）がAIのおすすめを信頼
                  </li>
                </ul>
                <p className="article-prose">
                  AI経由トラフィックの増加は、AIが「閲覧のサポート役」から「意思決定と購入を後押しする存在」へと役割を変えていることを示しています。AIに自社コンテンツを引用・推薦されるための対策（GEO）は、もはや将来の課題ではなく現在進行形の優先事項です。
                </p>

                <div className="article-note-panel">
                  <div className="article-note-panel__grid">
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">原典・データソース</div>
                      <p className="article-note-panel__text">
                        本記事はAdobe Digital Insightsが作成した「2026 Q2 AI Traffic Report」の要点をまとめたものです。原文は{" "}
                        <a
                          href="https://business.adobe.com/resources/sdk/2026-q2-ai-traffic-report.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1452FF] hover:underline"
                        >
                          Adobe Business
                        </a>
                        {" "}で公開されています。分析対象：米国ショッピングサイトへの訪問記録1兆件以上、商品情報1億件以上、消費者調査5,000人以上（2026年3月実施）。
                      </p>
                    </div>
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">監修</div>
                      <p className="article-note-panel__text article-note-panel__text--muted">
                        株式会社Ascent GEO GEO戦略室。本記事の情報は2026年5月19日時点の内容に基づいて作成しました。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </section>

      <RelatedResearchSection currentSlug="adobe-ai-traffic" />

      <div className="article-cta">
        <CTASection
          kicker="AIトラフィックを自社サイトへ引き込む"
          title={
            <>
              AIに引用される
              <br />
              コンテンツ設計、始めませんか
            </>
          }
          description={
            <>
              Adobeレポートが示す通り、AI経由トラフィックの質は急速に向上しています。
              自社サイトがAIに引用・推薦されるためのGEO戦略を、
              Ascent GEOが需要データ起点で設計します。
              <br />
              <br />
              まずは無料の初回相談で、現状のAI可視性と改善余地をお伝えします。
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
