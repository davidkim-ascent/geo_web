import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { WatcherFAQ } from "./WatcherFAQ";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO Watcher｜GEO・LLMO対策モニタリングツール",
  description:
    "GEO Watcherは、主要AIにおける自社・競合の言及や露出の変化を毎日計測するGEO・LLMO対策のモニタリングツール。必要な時だけ専門支援も可能",
  path: "/watcher",
});

export const dynamic = "force-static";

function SectionLabel({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className={`ui-section-label-title ${dark ? "ui-section-label-title-dark" : ""}`}>{title}</span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-white py-16 lg:py-20 border-b border-black/[0.06]">
      <div className="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full flex flex-col items-center text-center">
        {/* Label */}
        <div className="mb-8 border border-[#003393] rounded-full px-6 py-2 inline-block">
          <p className="text-[#003393] font-bold" style={{ fontSize: "var(--fs-label)" }}>企業のマーケティング・ブランド担当者向け</p>
        </div>

        {/* AI Model Logos */}
        <div className="flex items-center justify-center gap-12 flex-wrap mb-8">
          {[
            { src: "/ai-model-logos/chatgpt.png", alt: "ChatGPT", whiteBg: true, scale: false },
            { src: "/ai-model-logos/claude.png", alt: "Claude", whiteBg: false, scale: false },
            { src: "/ai-model-logos/gemini.webp", alt: "Gemini", whiteBg: false, scale: false },
            { src: "/ai-model-logos/perplexity.png", alt: "Perplexity", whiteBg: false, scale: true },
            { src: "/ai-model-logos/copilot.png", alt: "Copilot", whiteBg: false, scale: false },
            { src: "/ai-model-logos/google.svg", alt: "Google AI", whiteBg: false, scale: false },
          ].map((logo) =>
            logo.whiteBg ? (
              <div key={logo.alt} className="h-7 w-7 rounded-full bg-white border border-black/[0.06] p-1 flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={28} height={28} className="h-full w-full object-contain" />
              </div>
            ) : (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={28}
                height={28}
                className={`h-7 w-7 object-contain ${logo.scale ? "scale-125" : ""}`}
              />
            )
          )}
        </div>

        {/* H3 Title */}
        <h3 className="font-bold text-[#0B0B0E] mt-6" style={{ fontSize: "var(--fs-h3)" }}>
          GEO・LLMOモニタリングツール GEO Watcher : 主要AIでの自社・競合の動向を、毎日モニタリング。
        </h3>

        {/* H1 Title */}
        <h1
          className="text-[#0B0B0E] font-bold max-w-[36ch] mt-4"
          style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
        >
          GEO・LLMO対策は、月額コンサルなしで、これひとつ。
        </h1>

        {/* Subcopy Section */}
        <div className="mt-12 bg-white rounded-2xl border border-[#003393]/20 p-8 max-w-[800px]">
          <p className="text-[#0B0B0E] leading-[1.8] mb-5 font-medium" style={{ fontSize: "var(--fs-body-xsm)" }}>
            GEO Watcherは、主要AIにおける自社・競合の言及、引用、露出の変化を毎日計測するGEO・LLMO対策のモニタリングツールです。
          </p>
          <p className="text-[#4e4e51] leading-[1.8] mb-6" style={{ fontSize: "var(--fs-body-xsm)" }}>
            AIごとの比較から施策後の効果確認まで、GEO・LLMO対策に必要なデータをひとつの画面に集約。料金体系は3つのプランを用意。プロの専門支援が必要な時だけ、月額縛りのない「スポットサポート」を利用できます。
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 justify-center text-[#003393] font-medium" style={{ fontSize: "var(--fs-label)" }}>
            <span>主要７AIに対応</span>
            <span className="text-[#ccc]">｜</span>
            <span>毎日計測</span>
            <span className="text-[#ccc]">｜</span>
            <span>競合20社まで比較</span>
            <span className="text-[#ccc]">｜</span>
            <span>データ1年保存</span>
          </div>

          {/* JMA Logo Placeholder */}
          <div className="mt-6 pt-6 border-t border-[#e0e0e0]">
            <p className="text-[#999] mb-2" style={{ fontSize: "var(--fs-label-xs)" }}>認定団体</p>
            <p className="text-[#666]" style={{ fontSize: "var(--fs-label-xs)" }}>JMA（日本マーケティング協会）ロゴ</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Link href="#contact" className="inline-flex items-center justify-center rounded-lg bg-[#003393] px-8 py-3 font-medium text-white transition-colors hover:bg-[#0f3de0]" style={{ fontSize: "var(--fs-body-xsm)" }}>
            GEO Watcherについて問い合わせる
          </Link>
        </div>

        {/* Dashboard Image */}
        <div className="mt-14 w-full max-w-[1100px] rounded-2xl border border-black/[0.08] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)] overflow-hidden">
          <Image
            src="/watcher-hero-screen.png"
            alt="GEO Watcher ダッシュボード画面"
            width={2833}
            height={1866}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
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
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            AI検索で、自社は選ばれ続けていますか？
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="bg-white border border-black/[0.07] rounded-2xl p-7">
              <h3 className="font-bold text-[#0B0B0E] mb-3 leading-snug" style={{ fontSize: "var(--fs-h3)" }}>{item.title}</h3>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "測る",
      description: "まず、AI検索上の現在地を把握",
      detail: "ブランド名やWebサイトを登録すると、AI検索上での言及や引用の計測を開始できます。プロンプトは自動で生成されるため、専門的な設定をしなくても始められます。"
    },
    {
      number: "2",
      title: "知る",
      description: "自社と競合の違いを把握",
      detail: "AIごとの言及率、回答内容、引用URLを確認し、自社がどのように扱われているかを把握します。競合と比較することで、強みと弱みが見えてきます。"
    },
    {
      number: "3",
      title: "設計する",
      description: "次に取り組むべきテーマを明確に",
      detail: "競合は表示されているのに、自社は表示されていない質問を確認します。優先して改善すべきテーマやコンテンツを絞り込めます。"
    },
    {
      number: "4",
      title: "改善する",
      description: "サイトやコンテンツを見直す",
      detail: "引用されている競合ページや情報源を参考に、自社サイトやコンテンツを改善します。何を直すべきか迷う場合は、コンテンツ改善のスポットサポートも利用できます。"
    },
    {
      number: "5",
      title: "確かめる",
      description: "施策後の変化を毎日追う",
      detail: "改善後に、言及率や引用状況がどう変わったかを確認します。施策前後を比較しながら、次の改善につなげます。"
    }
  ];

  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(28px, 2.8vw, 44px)" }}
          >
            測り、知り、設計し、直し、確かめる。<br />
            GEO・LLMO対策を、自社で回せる環境へ。
          </h2>
          <p className="text-[17px] text-[#4e4e51] leading-[1.6] max-w-[72ch] mx-auto">
            GEO Watcherは、AI検索上の露出状況を確認するだけのツールではありません。自社・競合の現在地を把握し、改善点を見つけ、施策後の変化を確かめます。GEO・LLMO対策に必要な一連の流れを、自社で継続的に回せます。日々の計測と分析はツールで進め、専門的な判断に迷ったときだけ、スポットサポートを利用できます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-[#003393] text-white flex items-center justify-center text-[20px] font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="font-bold text-[#0B0B0E] mb-2" style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}>{step.title}</h3>
              <p className="text-[#4e4e51] font-bold mb-3" style={{ fontSize: "var(--fs-label)" }}>{step.description}</p>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-label)" }}>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnswerSection() {
  return (
    <section className="bg-white pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="課題に対するアンサー" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            推測ではなく、<span className="text-blue-gradient" style={{ fontStyle: "normal" }}>継続データ</span>でAI検索上の変化を捉える。
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
            style={{ fontSize: "var(--fs-section-title)" }}
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
              <h3 className="font-bold text-[#0B0B0E] mb-3 leading-snug" style={{ fontSize: "var(--fs-h3)" }}>{f.title}</h3>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{f.desc}</p>
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
    <section className="bg-white pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="選ばれる理由" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            AI検索上の変化を、継続的に追える環境を提供
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="bg-white border border-black/[0.07] rounded-2xl p-6">
              <h3 className="font-bold text-[#0B0B0E] mb-2 leading-snug" style={{ fontSize: "var(--fs-h4)" }}>{r.title}</h3>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "ライトプラン",
      price: "34,800",
      prompts: "25",
      models: "4つ",
      featured: false,
      tagline: "まずは小さく始めたいチームに",
    },
    {
      name: "スタンダードプラン",
      price: "49,800",
      prompts: "50",
      models: "5つ",
      featured: true,
      tagline: "本格的にGEO対策を進めるチームに",
    },
    {
      name: "アドバンスプラン",
      price: "68,000",
      prompts: "100",
      models: "6つ",
      featured: false,
      tagline: "複数ブランド・広範囲を追うチームに",
    },
    {
      name: "カスタマイズプラン",
      price: null,
      prompts: "自由選択",
      models: "アドバンスに準ずる",
      featured: false,
      tagline: "規模に合わせて柔軟に設計",
    },
  ];

  const ALL_MODELS = [
    { key: "aio", label: "AI Overviews", logo: "/ai-model-logos/google.svg" },
    { key: "gemini", label: "Gemini", logo: "/ai-model-logos/gemini.webp" },
    { key: "aimode", label: "AI Mode", logo: "/ai-model-logos/google.svg" },
    { key: "chatgpt", label: "ChatGPT", logo: "/ai-model-logos/chatgpt.png" },
    { key: "perplexity", label: "Perplexity", logo: "/ai-model-logos/perplexity.png" },
    { key: "copilot", label: "Microsoft Copilot", logo: "/ai-model-logos/copilot.png" },
    { key: "claude", label: "Claude（オプション）", logo: "/ai-model-logos/claude.png" },
  ];

  const planModelKeys = [
    ["aio", "gemini", "chatgpt", "perplexity"],
    ["aio", "gemini", "aimode", "chatgpt", "perplexity"],
    ["aio", "gemini", "aimode", "chatgpt", "perplexity", "copilot"],
    ["aio", "gemini", "aimode", "chatgpt", "perplexity", "copilot", "claude"],
  ];

  const comparisonRows = [
    { label: "登録プロンプト数", values: ["25", "50", "100", "自由選択"] },
    { label: "競合登録", values: ["20個", "20個", "20個", "20個"] },
    { label: "データ保存期間", values: ["1年間", "1年間", "1年間", "1年間"] },
    { label: "更新頻度", values: ["毎日", "毎日", "毎日", "毎日"] },
    { label: "エクスポート機能", values: ["csv", "csv", "csv", "csv"] },
  ];

  return (
    <section id="pricing" className="bg-white pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="料金プラン" />
        <hr className="my-4 border-black/[0.07]" />
        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            料金プラン
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-6 ${
                p.featured
                  ? "bg-[#0B0B0E] border border-[#1452FF]"
                  : "bg-white border border-black/[0.07]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#1452FF] px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-white">
                  おすすめ
                </span>
              )}
              <h3 className={`font-bold mb-1 ${p.featured ? "text-white" : "text-[#0B0B0E]"}`} style={{ fontSize: "var(--fs-h4)" }}>
                {p.name}
              </h3>
              <p className={`mb-4 ${p.featured ? "text-white/60" : "text-[#6B6B73]"}`} style={{ fontSize: "var(--fs-label-sm)" }}>
                {p.tagline}
              </p>
              {p.price ? (
                <p className={`mb-5 ${p.featured ? "text-white" : "text-[#0B0B0E]"}`}>
                  <span className="text-[30px] font-bold">{p.price}</span>
                  <span className="text-[14px] font-medium">円 / 月</span>
                </p>
              ) : (
                <p className={`mb-5 text-[22px] font-bold ${p.featured ? "text-white" : "text-[#0B0B0E]"}`}>
                  お問い合わせください
                </p>
              )}
              <ul className={`flex flex-1 flex-col gap-2.5 leading-[1.5] ${p.featured ? "text-white/80" : "text-[#4e4e51]"}`} style={{ fontSize: "var(--fs-label)" }}>
                {[
                  `登録プロンプト数：${p.prompts}`,
                  "競合登録：20個",
                  `AIモデル：${p.models}`,
                  "データ保存期間：1年間",
                  "更新頻度：毎日",
                  "エクスポート機能：csv",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" stroke={p.featured ? "#7ab6ff" : "#1452FF"} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={`mt-6 block rounded-lg py-2.5 text-center font-bold tracking-[0.02em] transition-colors ${
                  p.featured
                    ? "bg-[#1452FF] text-white hover:bg-[#1452FF]/90"
                    : "bg-[#F2F0EA] text-[#0B0B0E] hover:bg-black/[0.08]"
                }`}
                style={{ fontSize: "var(--fs-label-sm)" }}
              >
                お問い合わせ
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-black/[0.1] pb-3">
              <span className="font-bold text-[#6B6B73]" style={{ fontSize: "var(--fs-body-xsm)" }}>項目</span>
              {plans.map((p) => (
                <span
                  key={p.name}
                  className="font-bold text-[#0B0B0E] text-center border-l border-black/[0.08]" style={{ fontSize: "var(--fs-body-xsm)" }}
                >
                  {p.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-black/[0.06] py-4">
              <span className="text-[#4e4e51] pt-1" style={{ fontSize: "var(--fs-body-xsm)" }}>AIモデル</span>
              {planModelKeys.map((keys, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start justify-center gap-1.5 px-2 border-l border-black/[0.08]"
                >
                  {keys.map((key) => {
                    const model = ALL_MODELS.find((m) => m.key === key)!;
                    return (
                      <div key={key} className="flex items-center gap-1.5">
                        <Image
                          src={model.logo}
                          alt=""
                          width={16}
                          height={16}
                          className="h-4 w-4 shrink-0 rounded-sm object-contain"
                        />
                        <span className="text-[#0B0B0E] whitespace-nowrap" style={{ fontSize: "var(--fs-body-xsm)" }}>{model.label}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-black/[0.06] py-3">
                <span className="text-[#4e4e51]" style={{ fontSize: "var(--fs-body-xsm)" }}>{row.label}</span>
                {row.values.map((v, i) => (
                  <span
                    key={`${row.label}-${i}`}
                    className="text-[#0B0B0E] text-center border-l border-black/[0.08]" style={{ fontSize: "var(--fs-body-xsm)" }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/contact" className="font-mono tracking-[0.18em] text-[#1452FF] hover:underline uppercase" style={{ fontSize: "var(--fs-label-xxs)" }}>
            料金・プランについて問い合わせる →
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      className="relative py-10 lg:py-14 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a1a3a 0%, #071228 40%, #05070f 75%, #000000 100%)" }}
    >
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
        <div>
          <div className="font-mono tracking-[0.18em] uppercase text-[#7ab6ff] mb-5" style={{ fontSize: "var(--fs-label-xxs)" }}>
            AI検索で選ばれるための一歩を、ここから
          </div>
          <h2
            className="text-[#FAFAF7] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(31px, 3.08vw, 48px)" }}
          >
            AI検索で選ばれるための<br />一歩を、ここから。
          </h2>
          <p className="mt-6 text-[16px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            自社ブランドの変化を継続的に捉えるなら、GEO Watcher。見込み顧客への提案を具体化するなら、GEO診断レポート。
            <br />
            <br />
            診断する。変化を追う。課題を次の改善へつなげる。目的に合った方法で、GEO・LLMO対策を始めましょう。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-body-xsm)" }}
            >
              <Link href="/watcher">GEO Watcherを見る →</Link>
            </Button>
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-body-xsm)" }}
            >
              <Link href="/shindan">GEO診断レポートを見る →</Link>
            </Button>
          </div>
          <div className="mt-3">
            <CalendarBookingButton className="!w-full !min-w-0 !max-w-none !h-[52px] !justify-start text-left px-6 gap-2 hover:!bg-[#003393] hover:!border-[#003393] !text-[16px]">
              <Calendar size={16} />
              無料相談予約（Googleカレンダー）
            </CalendarBookingButton>
          </div>
        </div>
        <div className="w-full max-w-[560px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
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
      <StepsSection />
      <AnswerSection />
      <FeaturesSection />
      <ReasonsSection />
      <PricingSection />
      <ContactSection />
      <WatcherFAQ />
    </div>
  );
}
