import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE = "ECサイトのためのAEO・GEO最適化";
const PAGE_DESCRIPTION =
  "ECサイトのAEO・GEO最適化は、ユーザーがAIにショップやブランド、商品のおすすめを尋ねた際に、自社ブランドが回答に言及・推薦される可能性を高める取り組み。実務での優先順位まで解説する。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ecommerce-aeo-geo",
  keywords: ["EC", "AEO", "GEO", "LLMO", "商品ページ", "構造化データ", "Product Schema"],
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

const RECOMMENDED_CONTENT = [
  "A商品 vs B商品",
  "おすすめの◯◯ランキング",
  "予算別のおすすめ商品",
  "用途別のおすすめ商品",
];

const TARGET_EXAMPLES = [
  "ランニングを始めたばかりの人向け",
  "マラソン練習用",
  "膝への負担を減らしたい人向け",
  "普段使いのランニングシューズを探している人向け",
  "長距離ランニングを楽しむ人向け",
];

const CATEGORY_GUIDE_ITEMS = [
  "ランニングシューズの選び方",
  "クッション性の種類ごとの違い",
  "足の形に合わせたおすすめ",
  "距離別のおすすめ商品",
  "価格帯の比較",
  "人気商品の比較",
];

const PRIORITY_STEPS = [
  { step: "STEP 1", title: "主力商品の価格・在庫を最新化", desc: "販売量の多い商品から、価格と在庫データを常に最新の状態に保つ" },
  { step: "STEP 2", title: "Schemaの整備", desc: "Product・Offer・Review・FAQ Schemaを整備する" },
  { step: "STEP 3", title: "商品ページの構造改善", desc: "各商品ページの冒頭を、質問と回答を中心とした構造に改める" },
  { step: "STEP 4", title: "カテゴリページの拡充", desc: "比較表と購入ガイドをカテゴリページに追加する" },
  { step: "STEP 5", title: "FAQ・Q&Aへの展開", desc: "カスタマーサポートやレビューに頻出する質問をFAQ・Q&Aコンテンツとして拡張する" },
];

export default function EcommerceAeoGeoPage() {
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
                <span className="text-[#FDFDFB]">ECサイトのAEO・GEO最適化</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                INDUSTRY · EC / RETAIL
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">ECサイトのための</span>
                <span className="block text-[#1452FF]">AEO・GEO最適化</span>
              </h1>

              <p className="article-hero__lede">
                ユーザーがAIにショップ・ブランド・商品のおすすめを尋ねたとき、自社ブランドが回答に言及・推薦される可能性を高める取り組みが、ECのAEO・GEO最適化です。データ整備から実務の優先順位までを解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.20" },
                  { l: "LENGTH", v: "約3,500文字" },
                  { l: "FORMAT", v: "INDUSTRY GUIDE" },
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
                <ArticleThumbnail variant="ecommerce-aeo-geo" eyebrow="INDUSTRY · EC / RETAIL" className="h-[260px] w-full" />
              </figure>

              {/* Section 1: 結論 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>商品ページを飾るより、AIが正確に読める形にすることの方が重要</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AIが答えの中に挙げるブランドは、1〜5件だけ。その枠に入れなければ検討の対象にすら入らない。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  ECサイトのAEO・GEO最適化とは、ユーザーがAIにショップ・ブランド・商品のおすすめを尋ねた際に、自社ブランドが回答の中で言及・推薦される可能性を高める取り組みです。Ascent GEO（LLMO）では、カテゴリ・商品群・価格帯・配送・信頼シグナルを、AIが引用しやすい形に整理していきます。
                </p>
              </section>

              {/* Section 2: なぜ重要か */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">ECサイトでAI検索が重要な理由</h2>
                <p className="article-prose">
                  ECは選択肢が無限にあり、信頼性の判断が難しいカテゴリです。ユーザーは「安全なサイト」「コスパの良いデザイナーブランド」のように、信頼性とカテゴリを同時に尋ね、AIが提示するわずかなブランドを起点に検討を始めます。
                </p>
                <p className="article-prose">
                  検索エンジンが数十件のショップを並べていた時代とは異なり、AIは信頼シグナルとカテゴリとの関連性が明確なブランドを1〜5件だけ回答に挙げます。その枠に入れなければ、検討の対象にすら入りにくくなります。
                </p>
                <p className="article-prose">
                  AEO（Answer Engine Optimization）とGEO（Generative Engine Optimization）における要点は、意外にシンプルです。商品ページを華やかに飾ることよりも、AIが正確に読み取り、信頼できるデータを提供することの方がはるかに重要だということです。
                </p>
              </section>

              {/* Section 3: 商品データ */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">商品データは常に最新の状態を保つ</h2>
                <p className="article-prose">
                  最初に確認すべきは商品データです。Product Schemaを適用するだけでは十分ではありません。価格、在庫、SKU、GTIN、ブランド、色、サイズ、素材、配送情報、返品ポリシーなど、AIが回答に活用する主要な情報を、常に最新の状態に保つ必要があります。
                </p>
                <p className="article-prose">
                  特に<strong>価格と在庫</strong>は、実際の画面表示と構造化データ（Schema）が一致していなければならず、変更内容は速やかに反映される必要があります。AIは、古い情報や食い違った情報を提供するサイトよりも、一貫したデータを維持しているサイトを信頼する傾向があります。
                </p>
              </section>

              {/* Section 4: 比較コンテンツ */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">AIは比較しやすいコンテンツを好む</h2>
                <p className="article-prose">
                  比較コンテンツを積極的に、しかも表形式で整理することが有効です。たとえば同一カテゴリの商品であれば、重さ、素材、サイズ、防水等級、保証期間などを表にまとめることで、AIが商品間の違いを理解しやすくなります。
                </p>
                <p className="article-prose">また、次のようなコンテンツも推奨されます。</p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {RECOMMENDED_CONTENT.map((item, i, arr) => (
                    <div key={item} className={`flex items-center gap-3 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#1452FF]" />
                      <span className="text-[14px] font-bold text-[#0B0B0E]">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  このように、実際の購入検討者が検索する質問を軸にコンテンツを構成すると、AI検索においても引用される可能性が高まります。
                </p>
              </section>

              {/* Section 5: 商品ページ構造 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">商品ページは、質問に先に答える構造にする</h2>
                <p className="article-prose">
                  従来の商品詳細ページは、長い説明文から始まるケースが多く見られました。しかしAI検索においては、質問と回答の構造にする方が効果的です。たとえば、ページの冒頭に次のような一文を配置します。
                </p>

                <blockquote className="article-quote">
                  <p className="article-quote__text" style={{ fontSize: "24px" }}>この商品は敏感肌でも使用できますか？</p>
                </blockquote>

                <p className="article-prose">
                  そのすぐ下で、詳しい成分説明やテスト結果を展開していく流れです。AIは長い文章よりも、質問に対する短く明確な回答を優先的に活用する傾向があります。さらに、各種指標や検証データがあれば、必ず数値データを含めるようにしましょう。
                </p>
              </section>

              {/* Section 6: ターゲット明示 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">誰のための商品かを明確に説明する</h2>
                <p className="article-prose">
                  多くの商品ページは、商品の特徴しか説明していません。しかしAIは、商品の特徴よりも「誰に適した商品なのか」をより重視して判断します。たとえば「良いランニングシューズ」と説明するよりも、次のように具体的に表現する方が効果的です。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {TARGET_EXAMPLES.map((item, i, arr) => (
                    <div key={item} className={`flex items-center gap-3 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#1452FF]" />
                      <span className="text-[14px] text-[#0B0B0E]">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  こうした情報は、AIがユーザーの質問と商品を結びつける際の重要な根拠になります。
                </p>
              </section>

              {/* Section 7: レビュー */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">レビューは数値より経験が重要</h2>
                <p className="article-prose">
                  星評価4.8といった数値も重要ですが、実際の使用経験を綴ったレビューにはそれ以上の価値があります。たとえば次のようなレビューは、AIが回答に活用しやすいものです。
                </p>

                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「3か月使用してもバッテリー性能がほとんど落ちませんでした」</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span>「雨の日でも滑りにくく、通勤用として満足しています」</span>
                  </li>
                </ul>

                <p className="article-prose">
                  実際のユーザーの経験が反映されたレビューは、商品の信頼性を高める重要な要素であり、生成AIもこうした内容を頻繁に引用します。
                </p>
              </section>

              {/* Section 8: カテゴリページ */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">カテゴリページも購入ガイドにする</h2>
                <p className="article-prose">
                  カテゴリページを単なる商品一覧として構成する時代は終わりつつあります。
                </p>
                <p className="article-prose">
                  たとえばランニングシューズのカテゴリであれば、次のような情報を併せて提供するとよいでしょう。
                </p>

                <div className="my-8 overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {CATEGORY_GUIDE_ITEMS.map((item, i, arr) => (
                    <div key={item} className={`flex items-center gap-3 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#1452FF]" />
                      <span className="text-[14px] text-[#0B0B0E]">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  カテゴリページそのものが購入ガイドとしての役割を担うほど、AIが参照できる情報も増えていきます。
                </p>
              </section>

              {/* Section 9: ブランド一貫性 */}
              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">ブランド情報の一貫性も重要</h2>
                <p className="article-prose">
                  生成AIはブランドを一つのエンティティとして認識します。そのためサイト全体で、ブランド名、会社概要、設立年、主力商品群、公式サイトなどの情報を一貫して保つ必要があります。ページごとにブランドの表記が異なったり、情報が頻繁に変わったりすると、AIがブランドを正確に理解しづらくなります。
                </p>
              </section>

              {/* Section 10: サイト外信頼 */}
              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">サイト外の信頼性もAIは併せて評価する</h2>
                <p className="article-prose">
                  AIはブランドの公式サイトだけでなく、Reddit、専門レビューサイト、報道記事、YouTubeレビュー、専門家による評価といった第三者の意見も参照した上で、商品を推薦します。そのためAI検索で良い評価を得るには、サイト内部の最適化だけでなく、外部レビューやブランド言及を継続的に確保する戦略も併せて必要になります。
                </p>
              </section>

              {/* Section 11: 優先順位 */}
              <section id="s11" className="article-section">
                <span className="article-kicker">11</span>
                <h2 className="article-h2">実務で最初に着手すべき優先順位</h2>
                <p className="article-prose">
                  ECサイトであれば、次の順序で着手するのが効率的です。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">実践ステップ</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {PRIORITY_STEPS.map((s, i, arr) => (
                    <div key={s.step} className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex-none rounded-full bg-[#1452FF] px-3 py-0.5 font-mono text-[10px] text-white tracking-[0.12em]">{s.step}</span>
                      <div>
                        <div className="font-bold text-[14px]">{s.title}</div>
                        <div className="text-[13px] text-[#6B6B73]">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  ChatGPT、Perplexity、Claude、Geminiといった生成AIに実際のショッピングに関する質問を入力し、自社商品がどのように推薦されているかを継続的にモニタリングすることで、改善の優先順位をより明確に把握できます。
                </p>
                <p className="article-prose">
                  GEO Watcherを活用して自社ブランド・競合ブランド・質問を登録し、日次・週次・月次でSOVと可視性を確認しながらPDCAを回すことで、自社ブランドや商品の可視性を高め、回答内での優先順位を上げていく取り組みを地道に続けていくとよいでしょう。
                </p>
              </section>

              {/* Section 12: まとめ */}
              <section id="s12" className="article-section">
                <span className="article-kicker">12</span>
                <h2 className="article-h2">まとめ</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    AIが正確に読み取れる、信頼できるデータを提供することが、ECサイトのAEO・GEO最適化の核心である。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  ECサイトのAEO・GEO最適化は、商品データの最新性、比較しやすいコンテンツ、質問先行型の商品ページ構造、ターゲットの明示、経験に基づくレビュー、購入ガイド化したカテゴリページ、ブランド情報の一貫性、そしてサイト外の信頼シグナルという複数の要素が組み合わさって成り立ちます。
                </p>
                <p className="article-prose">
                  一度にすべてを整えることは難しくても、販売量の多い主力商品から着手し、GEO Watcherで継続的にモニタリングしながら優先順位をつけていけば、AI検索時代におけるECサイトの可視性は着実に高めていくことができます。
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
