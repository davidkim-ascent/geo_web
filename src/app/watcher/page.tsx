import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { SplitSection } from "@/components/layout/SplitSection";
import { WatcherFAQ } from "./WatcherFAQ";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO（LLMO・AEO）対策のモニタリングツールなら、GEO Watcher | Ascent GEO",
  description:
    "GEO Watcherは、主要AIエンジンを横断して自社・競合のAI検索上での露出・言及・引用状況を継続的にモニタリングするツールです。デイリーモニタリング・7つのAIモデル・20社の競合分析に対応。",
  path: "/watcher",
});

export const dynamic = "force-static";

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className="ui-section-label-title">{title}</span>
    </div>
  );
}

function HeroSection() {
  return (
    <SplitSection
      sectionClassName="hero-fixed relative py-12 lg:py-16"
      sectionStyle={{
        background: "var(--hero-gradient)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      containerClassName="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GEO WATCHER
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            GEO（LLMO・AEO）対策の<br />
            モニタリングツールなら、<br />
            <span className="text-blue-gradient">GEO Watcher</span>
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            自社と競合のAI検索（露出）状況をモニタリング。GEO/LLMO対策の必須な情報をデータ化。
            デイリーモニタリング／7つのAIモデル／20社の競合分析／初心者にも見やすいUI。
          </p>
        </>
      }
      right={
        <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      }
    />
  );
}

function ProblemSection() {
  const items = [
    {
      title: "激変する検索行動：「ググる」から「AIに聞く」時代へ",
      body: "ユーザーの情報収集は、従来の検索結果一覧を見る行動から、生成AIに直接質問する行動へと変化しています。これからのマーケティングでは、検索順位だけでなく、AIの回答内で自社がどのように扱われているかを把握することが重要です。",
    },
    {
      title: "AI回答での自社・競合の変化を追えていますか？",
      body: "AIの回答に自社ブランドはどれくらい言及されているのか。競合と比べて、露出・引用・推奨の状況はどのように変化しているのか。変化を継続的に追えなければ、GEO/LLMO施策の成果や改善ポイントを正しく判断できません。",
    },
    {
      title: "必要なのは、AI検索上の変化を追い続ける仕組みです。",
      body: "AI検索上でのブランド評価や露出状況は、常に変化しています。一度の確認だけでは、施策による変化や競合との差を正しく把握することはできません。重要なのは、AI検索上での露出・言及・引用の推移を継続的に観測し、変化を追い続けることです。",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="課題" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            AI検索で、自社は選ばれ続けていますか？
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="bg-white border border-black/[0.07] rounded-2xl p-7">
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{item.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnswerSection() {
  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="課題に対するアンサー" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            推測ではなく、<span className="text-blue-gradient">継続データ</span>でAI検索上の変化を捉える。
          </h2>
          <p className="mt-4 text-[17px] text-[#4e4e51] max-w-[64ch] leading-[1.6]">
            GEOウォッチャーは、主要AIエンジンを横断して、自社・競合のAI検索上での露出、言及、引用状況を継続的にモニタリングするツールです。
            日々蓄積されるデータから、施策前後の変化や競合との差分を確認。AI検索上での自社の変化を捉え、継続的な改善判断を支援します。
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI可視性",
      desc: "主要なAIエンジンの回答内で、自社や競合がどれだけ露出しているかを一目で確認。プロンプト別、モデル別にフィルタリングが可能なので、GEO/LLMO対策の状況を正確に把握できます。",
    },
    {
      title: "プロンプト",
      desc: "注視したいプロンプトの検索結果を継続的にモニタリング。ブランド言及率や引用URLの推移はもちろん、実際のAI回答文も自動で記録されるため、アルゴリズムの変化にもいち早く気づけます。",
    },
    {
      title: "シェア・オブ・ボイス",
      desc: "各AIエンジンにおいて、自社ブランドと競合他社がどれくらいの割合で言及されているかを可視化します。ブランドの言及ランキングや、プロンプト・AIモデル別のシェアを詳細に比較・確認できます。",
    },
    {
      title: "引用URL",
      desc: "AIが回答を生成する際に参照・引用したリンク（ソース）を特定します。ドメイン別・URL別に分析できるほか、自社サイトやソーシャルメディアなど、どの種類のメディアが引用されやすいかの傾向も把握できます。",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="操作画面・主要機能" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            画面でわかる、GEOウォッチャーの主な機能
          </h2>
        </div>
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-black/[0.07]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/uHXiUjXvr6U"
            title="Ascent GEO Watcher機能説明"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-black/[0.07] rounded-2xl p-7">
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{f.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  const reasons = [
    { title: "主要AIエンジンを横断してモニタリング", desc: "7つのAIモデルに対応。AI検索上での自社・競合の露出状況を横断的に確認できます。" },
    { title: "競合比較で、自社の立ち位置変化を把握", desc: "20社の競合ブランドを登録可能。AI回答内での露出状況や言及傾向を比較し、自社の変化を確認できます。" },
    { title: "過去データから現在までの推移を追跡", desc: "過去365日分のデータを保存。施策前後の変化や、時系列でのAI検索上の推移を確認できます。" },
    { title: "毎日の変化を自動でモニタリング", desc: "毎日自動データ更新。AI検索上での露出・言及・引用状況の変化を継続的にモニタリングできます。" },
    { title: "データを活用しやすい形で取得", desc: "CSVダウンロード、資料にそのまま使える画像ダウンロードを提供。" },
    { title: "使い方に合わせた料金プランを提供", desc: "規模感に応じたカスタマイズプランにも対応。" },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="選ばれる理由" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            AI検索上の変化を、継続的に追える環境を提供
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-white border border-black/[0.07] rounded-2xl p-6">
              <h3 className="text-[17px] font-bold text-[#0B0B0E] mb-2 leading-snug">{r.title}</h3>
              <p className="text-[15px] text-[#4e4e51] leading-[1.6]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: "ライトプラン", price: "34,800円", prompts: "25", models: "4つ（aio, gemini, chatgpt, perplexty）" },
    { name: "スタンダードプラン", price: "49,800円", prompts: "50", models: "5つ（aio, gemini, Ai mode, chatgpt, perplexty）" },
    { name: "アドバンスプラン", price: "68,000円", prompts: "100", models: "6つ（aio, gemini, Ai mode, chatgpt, perplexty, copilot）" },
    { name: "カスタマイズプラン", price: "登録プロンプト数に合わせ", prompts: "自由選択", models: "アドバンスに準ずる" },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="料金プラン" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            料金プラン
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div key={p.name} className="bg-white border border-black/[0.07] rounded-2xl p-6 flex flex-col">
              <h3 className="text-[17px] font-bold text-[#0B0B0E] mb-2">{p.name}</h3>
              <p className="text-[22px] font-bold text-[#1452FF] mb-4">{p.price}</p>
              <ul className="flex flex-col gap-2 text-[14px] text-[#4e4e51] leading-[1.6]">
                <li>登録プロンプト数：{p.prompts}</li>
                <li>競合登録：20個</li>
                <li>AIモデル：{p.models}</li>
                <li>データ見れる期間：1年間</li>
                <li>更新頻度：毎日</li>
                <li>エクスポート機能：csv</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/contact" className="font-mono text-[11px] tracking-[0.18em] text-[#1452FF] hover:underline uppercase">
            料金・プランについて問い合わせる →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function WatcherPage() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <AnswerSection />
      <FeaturesSection />
      <ReasonsSection />
      <PricingSection />
      <WatcherFAQ />
    </div>
  );
}
