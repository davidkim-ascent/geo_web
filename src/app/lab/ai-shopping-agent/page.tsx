import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleTOC } from "./ArticleTOC";
import { RelatedResearchSection } from "@/components/lab/RelatedResearchSection";
import aiShoppingImage from "./ai-shopping.png";
import {
  AutomationLevelsChart,
  TransactionModelsChart,
  AgentFlowChart,
  ProtocolRaceChart,
  CategoryAutomationChart,
  EcosystemMapChart,
} from "./AiShoppingCharts";

const PAGE_TITLE = "AIショッピングエージェントとエージェンティックコマースの概要";
const PAGE_DESCRIPTION =
  "AIが商品を検索、比較、購入まで代行するエージェンティックコマースの仕組みを解説。EC・小売・テクノロジー企業が把握すべき構造変化を紹介。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/ai-shopping-agent",
  keywords: ["AIショッピング", "エージェンティックコマース", "agentic commerce", "GEO", "AEO", "Shopify MCP", "OpenAI ACP"],
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

export default function AiShoppingAgentPage() {
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
                <Link href="/" className="transition-colors hover:text-[#FDFDFB]">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FDFDFB]">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FDFDFB]">AIショッピングエージェント</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                AGENTIC COMMERCE
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">AIショッピングの登場と</span>
                <span className="block text-[#1452FF]">エージェンティックコマース</span>
              </h1>

              <p className="article-hero__lede">
                AIが「閲覧ツール」から「購買を代行する存在」へ。誰が消費者の購買の起点を握るかが根本的に変わる。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.05.21" },
                  { l: "LENGTH", v: "約8,000文字" },
                  { l: "FORMAT", v: "OVERVIEW" },
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
              <figure className="mb-10 overflow-hidden rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <Image
                  src={aiShoppingImage}
                  alt="AIショッピングエージェントとエージェンティックコマース"
                  className="h-auto w-full object-cover"
                  priority
                />
              </figure>

              {/* s1 */}
              <section id="s1" className="article-section">
                <span className="article-kicker">01</span>
                <h2 className="article-h2">ショッピングの「起点」が変わる</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    「AIに何を買えばいいか聞いたら、そのまま商品が買えてしまった」。そんな体験が、近い将来あたりまえになろうとしています。
                  </p>
                </blockquote>
                <p className="article-prose">
                  AIがユーザーの代わりに商品を探し、比較し、カートを組み、条件が合えば購入まで完了させる「AIショッピングエージェント」の時代が急速に近づいています。McKinseyは2030年までに世界で3〜5兆ドル規模のコマースがAIを通じて動くと推計しています。これは既存ECの「便利な進化」ではなく、誰が消費者の購買の起点を握るかが根本的に変わる構造変化です。
                </p>
                <p className="article-prose">
                  この記事では、AIショッピングエージェントの基本定義・自動化の6段階・OpenAI・Google・Shopifyが主導する業界標準の競争・コマースインフラに求められる変化・そして14の事業領域にわたるエコシステムまで、エージェンティック・コマースの全体像を体系的に把握できます。
                </p>
                <div className="article-callout">
                  <p className="article-callout__text">
                    EC・小売・テクノロジーのあらゆる企業にとって、「AIの回答に自社が選ばれるか、無視されるか」の競争はすでに始まっています。
                  </p>
                </div>
              </section>

              {/* s2 */}
              <section id="s2" className="article-section">
                <span className="article-kicker">02</span>
                <h2 className="article-h2">AIショッピングエージェントとは</h2>
                <h3 className="article-h3">定義と市場変化</h3>
                <p className="article-prose">
                  AIショッピングエージェントは、ユーザーが特定のショッピングサイトを開く前から動き始めます。予算・好み・配送締め切り・過去の購買履歴・位置情報といった情報を総合的に解釈し、複数の販売者やプラットフォームをまたいで最適な選択肢を自動的に構成します。
                </p>
                <p className="article-prose">
                  McKinseyはこの変化を「既存ECの延長」ではなく、検索・広告・決済・CRMがすべて再配置される根本的な構造変化と位置づけています。市場への影響は主に3つの方向で現れます。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    購買の出発点が、検索エンジンやショッピングアプリから対話型AIインターフェースへと移行する
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    商品選択の基準が、人向けのマーケティング表現より、AIが解釈できる構造化データ・在庫・価格・返品ポリシーを重視するようになる
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    ブランドやリテーラーの競争が、人の目を引く競争から、エージェントの選択基準に入り込む競争へと変わる
                  </li>
                </ul>

                <h3 className="article-h3">3つの取引モデル</h3>

                <figure className="my-8">
                  <TransactionModelsChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図1：エージェンティック・コマースの3つの取引モデル
                  </figcaption>
                </figure>

                <h3 className="article-h3">実際の消費者購買ジャーニーへの変化</h3>
                <p className="article-prose">
                  現時点では、AIショッピングは購買の実行よりも探索と比較の段階から変化が進んでいます。McKinseyの米国消費者調査では、回答者の68%が直近3ヶ月以内に少なくとも1つ以上のAIツールをショッピングに活用したと回答しています。
                </p>
                <p className="article-prose">
                  変化が最も早いのは、電子機器・衣類/靴・旅行など比較要素の多いカテゴリーです。スペック・価格・互換性といった属性が多いほど、AIが探索効率を高めやすくなります。一方、食料品や日用品のように繰り返し買うものについては、AIは比較・提案よりも自動で注文・補充する実行役として機能します。
                </p>
              </section>

              {/* s3 */}
              <section id="s3" className="article-section">
                <span className="article-kicker">03</span>
                <h2 className="article-h2">ショッピング自動化の6段階</h2>
                <p className="article-prose">
                  McKinseyは、AIによる購買の自動化を0から5までの6段階で説明しています。この段階は「技術的に何ができるか」だけでなく、「消費者がどこまでAIに任せるか」という委任レベルも同時に示しています。
                </p>

                <figure className="my-8">
                  <AutomationLevelsChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図2：McKinseyによるAIショッピング自動化6段階フレームワーク
                  </figcaption>
                </figure>

                <h3 className="article-h3">カテゴリー別の自動化速度の違い</h3>
                <p className="article-prose">
                  AIによる購買の自動化は、すべての商品カテゴリーで同じ速度で広がるわけではありません。繰り返しが多く失敗コストが低いカテゴリーでは自動化が早く進みます。
                </p>
                <figure className="my-8">
                  <CategoryAutomationChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図3：カテゴリー別自動化速度とAIの役割
                  </figcaption>
                </figure>
              </section>

              {/* s4 */}
              <section id="s4" className="article-section">
                <span className="article-kicker">04</span>
                <h2 className="article-h2">プロトコル競争 — 誰が標準をつくるのか</h2>
                <p className="article-prose">
                  AIショッピングエージェントをめぐる競争は、単に「決済をどこで処理するか」という問題ではありません。本質的な争点は4つです。
                </p>
                <ul className="article-list">
                  <li className="article-list__item"><span className="article-list__bullet">•</span>消費者の「買いたい」という意図を、誰が最初に受け取るか</li>
                  <li className="article-list__item"><span className="article-list__bullet">•</span>商品データを、AIが読み取れるどんな形式で提供するか</li>
                  <li className="article-list__item"><span className="article-list__bullet">•</span>カートからチェックアウトまでを、どうスムーズに繋げるか</li>
                  <li className="article-list__item"><span className="article-list__bullet">•</span>決済の承認と販売者の責任を、どう分離して管理するか</li>
                </ul>

                <h3 className="article-h3">OpenAI + Stripe の ACP</h3>
                <p className="article-prose">
                  OpenAIとStripeが共同で推進するACP（Agentic Commerce Protocol）は、AIエージェント・購入者・販売者の間の購買フローを標準化するための仕組みです。ChatGPTではInstant Checkoutを通じて、会話の中で商品を発見し数回の確認だけで購買を完了できる体験を実現しています。
                </p>
                <p className="article-prose">
                  ACPの最も重要な原則は、販売者がMerchant of Record（取引上の責任者）として残るという点です。AIエージェントは商品の発見とチェックアウトの入り口を提供しますが、販売者の既存システムを置き換えるものではありません。
                </p>

                <figure className="my-8">
                  <AgentFlowChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図4：ACP購買フロー — ChatGPT Instant Checkoutの仕組み
                  </figcaption>
                </figure>

                <h3 className="article-h3">Google + Shopify の UCP / AP2</h3>
                <p className="article-prose">
                  UCP（Universal Commerce Protocol）はGoogleが推進する共通規格で、消費者との接点・販売者・決済プロバイダーの三者間を一つの標準で繋げることを目指しています。販売者は自分が対応している機能（商品検索・カート作成・チェックアウトなど）を公開しておき、エージェントがそれを自動的に読み取って利用します。
                </p>
                <p className="article-prose">
                  AP2はUCPと組み合わせて使う、決済の信頼を担保するレイヤーです。AIが人間の代わりに決済する際、「ユーザーが何を承認したか」「どんな条件の範囲内か」を暗号的に紐づけることで、エージェントによる決済が本当に承認された取引であることを証明します。
                </p>

                <h3 className="article-h3">Shopify の Catalog MCP / Checkout MCP</h3>
                <p className="article-prose">
                  Shopifyは販売者側の実行レイヤーを担っています。Catalog MCPはAIエージェントがShopifyの商品を検索し、価格・オプション・在庫・詳細情報を取得できる商品発見レイヤーです。Checkout MCPはカートをチェックアウトセッションに転換し購買フローを管理する実行レイヤーです。
                </p>
                <figure className="my-8">
                  <ProtocolRaceChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図5：ショッピングエージェントプロトコル3社比較
                  </figcaption>
                </figure>

                <div className="article-callout">
                  <p className="article-callout__text">
                    この競争の最終的な問いは「エージェント時代のコマースにおける価値の分配を誰が握るか」です。Merchant of Record・顧客関係・注文データ・返品/返金・ロイヤリティ体験を誰が保持するかが、今後のコマースの優位性を左右します。
                  </p>
                </div>
              </section>

              {/* s5 */}
              <section id="s5" className="article-section">
                <span className="article-kicker">05</span>
                <h2 className="article-h2">コマース運営インフラの変化</h2>

                <h3 className="article-h3">Agent-Readable なカタログと構造化商品データ</h3>
                <p className="article-prose">
                  AIエージェントが商品を選ぶためには、商品データが「人間が見て分かりやすい」レベルを超えて、機械が比較・判断できる構造化された形式でなければなりません。カテゴリーごとに求められるデータの例は以下の通りです。
                </p>
                <div className="article-table" style={{ "--table-cols": "auto 1fr" } as React.CSSProperties}>
                  <div className="article-table__head">
                    <div>カテゴリー</div>
                    <div>AIエージェントが必要とするデータ項目</div>
                  </div>
                  {[
                    ["ファッション", "素材、厚さ、フィット感、季節、洗い方、サイズ誤差、体型への適合性、スタイリングのコンテキスト"],
                    ["電子機器", "スペック、バッテリー、対応機器、保証、使用環境、レビューに基づく長所と短所"],
                    ["食料品", "アレルギー情報、原産地、賞味期限、代替可能商品、配送可能時間帯"],
                  ].map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell">{row[1]}</div>
                    </div>
                  ))}
                </div>
                <p className="article-prose">
                  商品データはもはやバックオフィスの管理資料ではなく、エージェント時代のマーケティング資産として捉え直す必要があります。
                </p>

                <h3 className="article-h3">在庫・価格・配送・プロモーション API の重要性</h3>
                <p className="article-prose">
                  エージェントがカートを組み立てるには、リアルタイムの在庫・価格・配送可能時間・プロモーション条件・代替品ルールをその場で読み取れる必要があります。税金・送料・クーポン・メンバーシップ特典・まとめ割引・返品可否まで考慮した上で、予算と配送条件に合う購入可能な組み合わせを構成できる販売者が、エージェントに信頼されるデフォルトの選択肢になれます。
                </p>

                <h3 className="article-h3">決済委任・KYA・不正防止</h3>
                <p className="article-prose">
                  エージェンティック・コマースにおける決済の重要な問いは「誰が・誰の代わりに・どんな範囲で・どんな意図で決済したか」です。McKinseyは既存のKYC（本人確認）・AML（マネーロンダリング対策）の体系が、エージェントを識別するKYA（Know Your Agent）という概念へ拡張される必要があると説明しています。
                </p>
                <p className="article-prose">
                  販売者の視点では、リスク管理の発想そのものが変わります。従来は「自動化トラフィック＝ボットの脅威」でしたが、エージェンティック・コマースでは信頼できる自動化トラフィックが売上の重要な経路となります。「ボットを防ぐ」から「承認されたエージェントに安全に取引権限を与える」への転換が求められます。
                </p>

                <h3 className="article-h3">チェックアウト・返品・返金のエージェント対応</h3>
                <p className="article-prose">
                  チェックアウトはエージェンティック・コマースの最大のボトルネックです。エージェントがどれだけうまく商品を選んでも、決済ステップで人間の操作が必要になると自動化は途切れます。チェックアウトはエージェントが状態を追跡・更新できるセッションベースの構造でなければなりません。返品・返金の仕組みも同様に重要で、「間違えても元に戻せる」という安心感が消費者のAI委任の前提となります。
                </p>
              </section>

              {/* s6 */}
              <section id="s6" className="article-section">
                <span className="article-kicker">06</span>
                <h2 className="article-h2">SEOからAEO / Agent Optimizationへの転換</h2>
                <p className="article-prose">
                  AIショッピングエージェントが普及すると、検索最適化の対象が人間だけではなくなります。従来のSEOは「検索結果ページで人間にクリックしてもらう」ことを目的にしていました。エージェント時代には、AIが商品とブランドを理解し、比較し、推薦リストに選ぶことを目的とした最適化が必要になります。
                </p>
                <p className="article-prose">
                  これをAEO（Answer Engine Optimization）またはAgent Optimizationと呼びます。核心は、エージェントが参照する信頼できるデータソースに、ブランドと商品の情報が一貫して存在するようにすることです。自社ECの商品フィード・レビューサイト・アフィリエイトコンテンツ・マーケットプレイス・FAQ・ポリシー文書・PRコンテンツ・コミュニティでの言及が、すべてAIの判断材料になります。
                </p>
                <div className="article-callout">
                  <p className="article-callout__text">
                    McKinseyの調査では、AI検索を利用している消費者の44%がAI検索を最も信頼できる情報源として挙げており、これは検索エンジンやブランドサイト・レビューサイトを上回る数値です。
                  </p>
                </div>
                <p className="article-prose">
                  ブランドは自社チャンネルを管理するだけでは不十分で、AIが参照する外部コンテンツのエコシステム全体の中で、自社がどう表現されているかまで管理する必要があります。
                </p>
              </section>

              {/* s7 */}
              <section id="s7" className="article-section">
                <span className="article-kicker">07</span>
                <h2 className="article-h2">エージェンティック・コマース エコシステム 14領域</h2>
                <p className="article-prose">
                  エージェンティック・コマースのビジネスチャンスは、OpenAI・Google・AnthropicのようなAIモデルを開発する企業だけにあるわけではありません。AIエージェントが実際に購買を完了するには、商品情報の読み取り・在庫と価格の確認・安全な決済処理・配送/返品/カスタマー対応まで、多くの仕組みが連携して初めて成立します。
                </p>

                <figure className="my-8">
                  <EcosystemMapChart />
                  <figcaption className="mt-3 text-center text-[12px] text-[#9A9AA0]">
                    図6：エージェンティック・コマース エコシステム14領域
                  </figcaption>
                </figure>

                <p className="article-prose">
                  これからの勝者は「AIが良い答えを出せるようにする会社」だけでなく、AIが安全に探して・比較して・購入して・配送して・返品できるようにする会社たちです。
                </p>
              </section>

              {/* s8 */}
              <section id="s8" className="article-section">
                <span className="article-kicker">08</span>
                <h2 className="article-h2">まとめ</h2>
                <p className="article-prose">
                  AIショッピングエージェントの登場は、消費者の購買体験を根本から変える構造的な転換点です。McKinseyは2030年までに世界で3〜5兆ドル規模のコマースがAIを通じて動くと推計しており、この変化に対応するには3つの準備が不可欠です。
                </p>
                <ul className="article-list">
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>商品データの構造化：</strong>AIエージェントが比較・判断できる形式で商品情報を整備する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>リアルタイムAPIの整備：</strong>在庫・価格・配送・プロモーション・返品ポリシーをエージェントが呼び出せる形で公開する</span>
                  </li>
                  <li className="article-list__item">
                    <span className="article-list__bullet">•</span>
                    <span><strong>AEOへの転換：</strong>従来のSEOに代わり、AIに選ばれるための最適化戦略を実装する</span>
                  </li>
                </ul>
                <p className="article-prose">
                  「AIに選ばれるか、無視されるか」という競争はすでに始まっています。エージェンティック・コマースのエコシステムは14の事業領域にわたり、AIモデルだけでなく周辺インフラ全体が新しい市場を形成します。早期に対応の準備を進めることが、この構造変化を機会に変える第一歩です。
                </p>

                <div className="article-note-panel">
                  <div className="article-note-panel__grid">
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">参考・データソース</div>
                      <p className="article-note-panel__text">
                        本記事はMcKinsey Digital「Agentic commerce: From browsing to buying, AI is reshaping retail」をはじめ、OpenAI・Google・Shopifyの各社公式発表を基に構成しています。
                      </p>
                    </div>
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">監修</div>
                      <p className="article-note-panel__text article-note-panel__text--muted">
                        株式会社Ascent GEO GEO戦略室。本記事の情報は2026年5月21日時点の内容に基づいています。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </section>

      <RelatedResearchSection currentSlug="ai-shopping-agent" />
      <LabArticleCTASection />
    </div>
  );
}
