import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { RelatedResearchSection } from "@/components/lab/RelatedResearchSection";
import lmCepFinderImage from "./lm-cep-finder.png";
import { TypingPromptCard } from "./TypingPromptCard";
import { buildPageMetadata } from "@/lib/seo";

const PAGE_TITLE =
  "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ";
const PAGE_DESCRIPTION =
  "消費者がAIに状況を話しかける時代、ブランドは「キーワード競争」から「CEP（カテゴリーエントリーポイント）の占有」へ戦略を転換する必要があります。GEO視点でCEP設計を解説します。";

export const metadata: Metadata = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/brand-cep",
});

export const dynamic = "force-static";

export default function BrandCepArticlePage() {
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
                <span className="text-[#FAFAF7]">BRAND × CEP</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                FEATURED RESEARCH · BRAND STRATEGY
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AI検索時代のブランド戦略：</span>
                <span className="block text-[#1452FF]">キーワードではなく、CEPを制覇せよ。</span>
              </h1>

              <p className="article-hero__lede">
                消費者がAIに「自分の状況」を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へと移行している。GEO戦略の核心を解説する。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.18" },
                  { l: "LENGTH", v: "約5,000文字" },
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
                  src={lmCepFinderImage}
                  alt="ListeningMind CEP Finder — 潜在顧客のCEPを可視化・構造化するツール"
                  className="h-auto w-full object-cover"
                  priority
                />
              </figure>

              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">
                  なぜ私たちのブランドはAIの回答の中に入っていないのか
                </h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">広告費を削ったわけでも、製品の競争力が落ちたわけでもない。それなのに、消費者が「おすすめを教えて」と尋ねる瞬間に、自社ブランドが言及されない。</p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  最近、多くのブランドが共通して感じている不安です。その原因は、消費者の情報収集行動そのものが変わったことにあります。
                </p>
                <p className="article-prose">
                  かつての検索では、消費者は検索窓に2〜3語、長くても4語程度の短いキーワードを入力していました。ブランドは、そのキーワードとカテゴリの中で競えばよかったのです。「ランニングシューズ おすすめ」「冬用ランニングシューズ」といった検索ワードで露出し、比較コンテンツに含まれ、検索結果の上位に位置することが重要でした。
                </p>
                <p className="article-prose">
                  しかし今、消費者はキーワードを入力する代わりに、AIに自分の状況を話しかけます。まるで友人に相談するように。
                </p>
              </section>

              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">
                  消費者の行動変容：キーワードから「状況の説明」へ
                </h2>
                <p className="article-prose">
                  たとえば消費者は今、このように尋ねます。「予算は1万円で、ランニング用に履くんだけど、足幅が広めで、長く履いても問題ないシューズを教えて」と。
                </p>
                <p className="article-prose">
                  この質問を前にすると、従来の多くのブランド戦略は突然力を失います。単に「ランニングシューズブランド」「プレミアムブランド」という説明だけでは、この複合的な質問への答えにはならないからです。
                </p>
                <p className="article-prose">
                  この変化の本質は、消費者が自分の状況と条件を説明し、その条件に合った選択をAIに委ねる形で行動し始めたことにあります。つまり、検索は情報探索の行為から<strong>「状況ベースの意思決定」</strong>の行為へと変わりつつあるのです。
                </p>
              </section>

              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">
                  CEP（カテゴリーエントリーポイント）とは何か
                </h2>
                <p className="article-prose">
                  マーケティング理論で言うカテゴリーエントリーポイント、すなわちCEPは、もともと「消費者はいつそのカテゴリーを思い浮かべるか」あるいは「どんな状況で特定のブランドが頭に浮かぶか」を説明する概念でした。
                </p>
                <p className="article-prose">
                  ブランド側としては、さまざまなデータ分析を通じて人々が特定の製品群を思い浮かべる瞬間や文脈を見つけ出し、その文脈の中でブランドが記憶されるようにすることが重要な課題でした。
                </p>
                <blockquote className="article-quote">
                  <p className="article-quote__text">ところがAI検索の登場により、そのCEPがプロンプトという形でAI検索窓に<strong>直接入力される</strong>ようになりました。消費者がAIに投げかける詳細な質問の中には、予算・状況・個人的な制約・好み・比較基準がすべて含まれています。</p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  つまり消費者の質問は今や「何を買うべきか」ではなく、「これらの条件をすべて考慮したとき、最善の選択は何か」という形に変わっています。
                </p>
              </section>

              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">
                  AIがCEPを処理する仕組み
                </h2>
                <p className="article-prose">
                  AIは質問を構成する要素を分解して解釈します。ある部分は価格条件、ある部分は使用状況、ある部分は個人の特性、また、ある部分は評価基準です。そのうえで、これらの条件を一つひとつ満たす候補を比較し、全体の条件を最も説得力のある形で満たす答えを提示します。
                </p>
                <p className="article-prose">
                  このプロセスにおいて、ブランドはもはやTop of Mindだけで評価されるわけではありません。むしろ、<strong>各文脈の条件に対してどれだけ説得力のある答えをコンテンツとして持っているか</strong>が重要になります。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    価格条件：「予算1万円以内」に対応するコンテンツがあるか
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    使用状況：「ランニング用途」に特化した情報があるか
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    個人特性：「足幅が広い」ユーザー向けの言及があるか
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    評価基準：「長時間着用の快適性」についての根拠があるか
                  </li>
                </ul>
              </section>

              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">
                  GEO：この変化全体を貫く視点
                </h2>
                <p className="article-prose">
                  この変化全体を貫く視点こそがGEOです。GEOは特定の技術テクニックを意味するものではありません。GEOとは「AIが消費者の質問に答えを生成する流れの中で、私たちのブランドはどんな理由で登場するのか」を問う視点です。
                </p>
                <p className="article-prose">
                  したがってブランドは今、「消費者が私たちの製品を探すのはいつか」という問いを把握しなければなりません。つまり、GEO対策においてCEPを活用することが成功のポイントになります。
                </p>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text"><strong>GEOはCEP構築のための非常に優れたマーケティング施策です。</strong>CEP戦略は、どのような状況で人々が製品やサービスのカテゴリーを思い浮かべるかを見つけ出し、次にその状況で自社ブランドが同時に想起されるようにしなければなりません。</p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
              </section>

              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">
                  CEP×GEO戦略の設計：出発点と次のステップ
                </h2>
                <p className="article-prose">
                  CEP戦略は、人間とAI双方の意味的ネットワークを同時に設計する作業と言えます。まず、顧客の生活文脈の中でどのCEPが実際に機能しているかを理解することが出発点です。
                </p>

                <div className="article-principles-grid">
                  {[
                    {
                      num: 1,
                      text: "CEPの発見：消費者がどの状況でカテゴリーを想起するかを、実際の検索・質問データから可視化する",
                    },
                    {
                      num: 2,
                      text: "CEPのクラスタリング：類似する状況を束ね、ブランドが応答すべき文脈グループを構造化する",
                    },
                    {
                      num: 3,
                      text: "GEOコンテンツ設計：各CEPクラスターに対して、AIが引用しやすい形で自社ブランドを結びつけるコンテンツを作成する",
                    },
                    {
                      num: 4,
                      text: "モニタリングと拡張：AIの回答を継続的に観測し、登場するCEPの幅と頻度を拡大していく",
                    },
                  ].map((item) => (
                    <div key={item.num} className="article-principle-card">
                      <div className="article-principle-card__number">{item.num}</div>
                      <div className="article-principle-card__text">{item.text}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  ブランドの成長は結局、潜在顧客のCEPの瞬間に自社ブランドが登場する頻度を、どれだけ広く・継続的に増やしていけるかによって決まるからです。
                </p>
              </section>

              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">
                  AIの意味空間におけるCEPクラスター
                </h2>
                <p className="article-prose">
                  「まだやることがたくさんあるのに疲れた」と訴えようが、「徹夜勉強のお供になるドリンク」を尋ねようが、AIはその言葉の裏にある本質的なニーズに着目します。AIはこれを、エナジードリンクを必要とする<em>疲労と集中の状況</em>という一つのCEPクラスターとして理解することができます。
                </p>
                <p className="article-prose">
                  したがってブランドがすべきことは、このCEPクラスターに自社ブランドが自然につながるようにすることです。
                </p>
                <p className="article-prose">
                  結局、製品ブランドのCEP拡張は、ユーザーの頭の中だけで行われることではなく、<strong>AIの意味空間においても同時に起こらなければなりません</strong>。これはブランドマネージャーたちに新たに与えられた戦略的課題です。
                </p>
              </section>

              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">
                  AI検索時代に求められるコンテンツの条件
                </h2>
                <p className="article-prose">
                  GEO戦略において重要なのは、AIが情報を処理する方式が従来の検索と異なるという点です。かつてはキーワード最適化さえうまくやれば、自社サイトやコンテンツを検索結果の上位に表示させることができました。
                </p>
                <p className="article-prose">
                  しかし今やAI検索は、一つの質問を複数のサブトピックに再構成し、各トピックに合った情報をまとめて要約した上で答えを提示します。このプロセスでブランドが引用・推薦されるかどうかは、その話題、すなわちCEPにどれだけうまく結びついているかによって変わります。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>評価軸</div>
                    <div>従来のSEO</div>
                    <div>AI検索時代（GEO）</div>
                  </div>
                  {[
                    ["最適化の対象", "キーワード", "状況・文脈（CEP）"],
                    ["競争の単位", "検索結果の順位", "AIの回答への引用率"],
                    ["コンテンツの形式", "キーワードを含む記事", "CEPに対応した構造化コンテンツ"],
                    ["ブランド評価基準", "Top of Mind", "Top of CEP（特定状況での最推薦）"],
                    ["成果の指標", "オーガニックトラフィック", "AI回答への登場頻度・文脈の幅"],
                  ].map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[2]}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  したがってAI検索時代には、「キーワード検索結果1ページ目の1位を占める」よりも、「非常に具体的な特定の状況で最初に呼び出されるブランド」として定着することのほうが、はるかに重要です。
                </p>
                <p className="article-prose">
                  AIは単純なキーワードの出現頻度やコンテンツの長さではなく、インテントベースの意味ベクトル空間の中で答えを探します。したがって、これまでのSEOテクニックだけでは対応することができません。
                </p>
              </section>

              <section id="s9" className="article-section">
                <span className="article-kicker">09</span>
                <h2 className="article-h2">
                  AscentのCEP設計アプローチ
                </h2>
                <p className="article-prose">
                  Ascentは自社開発の検索データソリューション「リスニングマインド」を活用し、潜在顧客のCEPを可視化・構造化してGEOを設計します。すなわち、ブランド・製品・使用状況・使用目的・効果など、潜在顧客の状況をデータに基づいて具体化します。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    実際の検索データからCEPクラスターを抽出・構造化
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    各CEPに対してAIが引用しやすいコンテンツを設計
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    AIの回答をモニタリングし、ブランドの登場頻度と文脈の幅を継続的に最適化
                  </li>
                </ul>
                <p className="article-prose">
                  架空の想定ではなく、実際の消費者の悩みと状況からCEPを構築するため、AIに引用される確率の高い「本当に答えるべき文脈」を特定することが可能です。
                </p>
                <TypingPromptCard />
              </section>

              <section id="s10" className="article-section">
                <span className="article-kicker">10</span>
                <h2 className="article-h2">
                  まとめ：Top of Mindから「Top of CEP」の時代へ
                </h2>
                <p className="article-prose">
                  CEP戦略とGEO設計は、ブランドが人間の記憶構造とAIの意味空間において同時に存在感を確保する方法です。今後、ブランド競争の本質は、この2つの空間における占有率争いへと移行していくでしょう。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    ブランドの成長は、未顧客のCEPの瞬間に自社ブランドが記憶され呼び出される頻度を、どれだけ広く・どれだけ長く維持・拡張できるかによって決まる
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    人間の頭の中でブランドが特定の状況と結びついていなければならないと同時に、AIの意味空間においても、ブランドが該当CEPの代表エンティティとして認識されなければならない
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">▸</span>
                    GEOはこの戦略を実行し、モニタリングし、修正する新たな武器。CEPはその中心を支える戦略的要衝
                  </li>
                </ul>
                <p className="article-prose">
                  したがってAI検索時代のブランド戦略は、Top of Mindから「最も具体的な状況で最も推薦される答え」、すなわち<strong>Top of CEPの時代</strong>となるでしょう。
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>

      <RelatedResearchSection currentSlug="brand-cep" />
      <SeoGeoCTASection />
    </div>
  );
}
