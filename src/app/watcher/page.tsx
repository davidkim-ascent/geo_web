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
import voice1Image from "../../../Design/voice1.png";
import voice2Image from "../../../Design/voice2.png";
import voice3Image from "../../../Design/voice3.png";

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
    <section className="relative bg-white py-12 pb-0">
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

        {/* H1 Title */}
        <h1
          className="font-bold max-w-[48ch] mt-6"
          style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
        >
          <span style={{ color: "#003393" }}>GEO・LLMO・AIO 対策</span>は<br />
          <span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>月額コンサルなしで、</span>これひとつ。
        </h1>

        {/* Subcopy Section */}
        <div className="mt-6 max-w-[900px] mb-8">
          <p className="text-[#0B0B0E] leading-[1.8] mb-0 font-medium" style={{ fontSize: "var(--fs-body)" }}>
            GEO Watcherは、AIにおける自社・競合の言及、引用、露出の変化を毎日計測するGEO・LLMO対策のモニタリングツールです。AIごとの比較から施策後の効果確認まで、GEO・LLMO対策に必要なデータをひとつの画面に集約。料金体系は3つのプランを用意。プロの専門支援が必要な時だけ、月額縛りのない「スポットサポート」を利用できます。
          </p>
        </div>

      </div>
    </section>
  );
}

function NavigationSection() {
  const items = [
    { label: "FEATURES", ja: "主要機能", href: "#features" },
    { label: "PRICING", ja: "料金プラン", href: "#pricing" },
    { label: "SPOT SUPPORT", ja: "スポットサポート", href: "#support" },
    { label: "VOICE", ja: "顧客の声", href: "#testimonials" },
    { label: "FAQ", ja: "FAQ", href: "#faq" },
  ];

  return (
    <section className="bg-white py-0 border-t border-b border-black/[0.06]">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap justify-center">
          {items.map((item, idx) => (
            <div key={item.href} className="flex items-center">
              <a
                href={item.href}
                className="px-4 sm:px-6 py-4 text-center hover:opacity-80 transition-opacity"
                style={{ minWidth: "140px" }}
              >
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: "#003393" }}>{item.label}</div>
                <div style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#003393" }}>{item.ja}</div>
                <div className="text-[10px] mt-1" style={{ color: "#003393" }}>•</div>
              </a>
              {idx < items.length - 1 && (
                <div style={{ width: "1px", height: "60px", backgroundColor: "#003393", margin: "0 0" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Step = { number: string; title: string; description: string; detail: string };

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-5 py-4" style={{ border: "1px solid #4472C4", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#0B2A6B", fontSize: "14px" }}>
          {step.number}
        </div>
        <h3 className="font-bold text-[#0B0B0E]" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>{step.title}</h3>
      </div>
      <p className="font-bold text-[#0B0B0E] mb-2.5" style={{ fontSize: "var(--fs-body-sm)" }}>{step.description}</p>
      <p className="text-[#4e4e51] leading-[1.75]" style={{ fontSize: "var(--fs-body-sm)" }}>{step.detail}</p>
    </div>
  );
}

function ArrowH({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: "72px" }}>
      <svg width="60" height="16" viewBox="0 0 60 16" style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
        <line x1="0" y1="8" x2="48" y2="8" stroke="#4472C4" strokeWidth="2.5" />
        <polygon points="48,2 60,8 48,14" fill="#4472C4" />
      </svg>
    </div>
  );
}

function ArrowV({ direction = "down" }: { direction?: "down" | "up" }) {
  return (
    <svg width="16" height="76" viewBox="0 0 16 76" style={{ transform: direction === "up" ? "scaleY(-1)" : undefined }}>
      <line x1="8" y1="0" x2="8" y2="64" stroke="#4472C4" strokeWidth="2.5" />
      <polygon points="2,64 14,64 8,76" fill="#4472C4" />
    </svg>
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
    <section className="pt-24 pb-24" style={{ background: "linear-gradient(180deg, #e8f4fb 0%, #d4e8f7 50%, #c8dff5 100%)" }}>
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            測り、知り、設計し、直し、確かめる。<br />
            <span style={{ color: "#003393" }}>GEO・LLMO対策を、自社で回せる環境へ。</span>
          </h2>
          <p className="text-[17px] text-[#4e4e51] leading-[1.6] max-w-[900px] mx-auto">
            GEO Watcherは、AI検索上の露出状況を確認するだけのツールではありません。自社・競合の現在地を把握し、改善点を見つけ、施策後の変化を確かめます。GEO・LLMO対策に必要な一連の流れを、自社で継続的に回せます。日々の計測と分析はツールで進め、専門的な判断に迷ったときだけ、スポットサポートを利用できます。
          </p>
        </div>

        {/* Cycle Layout */}
        <div className="hidden lg:block w-full max-w-[1320px] mx-auto">
          {/* 上段: 5 → 1 → 2 */}
          <div className="flex items-stretch">
            <StepCard step={steps[4]} />
            <ArrowH />
            <StepCard step={steps[0]} />
            <ArrowH />
            <StepCard step={steps[1]} />
          </div>

          {/* 中段: 縦矢印 (左: 4→5 上向き / 右: 2→3 下向き) */}
          <div className="flex items-center" style={{ height: "90px" }}>
            <div style={{ flex: "1 1 0" }} className="flex justify-center">
              <ArrowV direction="up" />
            </div>
            <div style={{ flex: "1 1 0" }} />
            <div style={{ flex: "1 1 0" }} className="flex justify-center">
              <ArrowV direction="down" />
            </div>
          </div>

          {/* 下段: 4 ← 3 (上段の左右端カード中心に合わせる) */}
          <div className="flex items-stretch" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
            <StepCard step={steps[3]} />
            <ArrowH direction="left" />
            <StepCard step={steps[2]} />
          </div>
        </div>

        {/* Mobile fallback: simple stacked list */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#0B2A6B", fontSize: "14px" }}>
                  {step.number}
                </div>
                <h3 className="font-bold text-[#0B0B0E]" style={{ fontSize: "22px" }}>{step.title}</h3>
              </div>
              <p className="font-bold text-[#0B0B0E] mb-2" style={{ fontSize: "var(--fs-body-sm)" }}>{step.description}</p>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-sm)" }}>{step.detail}</p>
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
    <section className="bg-white pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
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

function TestimonialsSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-12 grid grid-cols-1 gap-6">
          {[
            {
              name: "EC運営担当者",
              role: "化粧品・自社EC",
              review: "月額コンサルではなく、必要な支援だけ頼めました。「他社のGEO・LLMOツールを検討したときは、最後に月額コンサルを提案されることが多く、導入を見送っていました。GEO Watcherは、主要な計測機能をツール内で利用でき、苦手だったプロンプト設計だけを、1回単位で依頼できました。毎月の追加費用が発生しないため、社内でも説明しやすく、導入までスムーズに進められました。」",
              image: voice1Image,
              rating: 5,
            },
            {
              name: "広報・マーケティング担当者",
              role: "地方製造業",
              review: "ビッグデータの専門企業が開発していることが、導入の決め手でした。「GEO・LLMO対策はまだ新しい分野なので、ツールの機能だけでなく、どのような会社が開発・運営しているかも重視しました。GEO Watcherは、検索データやビッグデータを長年扱ってきた企業が開発しているため、計測データの信頼性にも安心感がありました。複数のAIにおける自社と競合の変化を、継続的に確認できる点も、社内で導入を決める後押しになりました。」",
              image: voice2Image,
              rating: 5,
            },
            {
              name: "マーケティングマネージャー",
              role: "BtoB SaaS企業",
              review: "施策後の変化を、データで説明できるようになりました。「以前利用していたGEO・LLMOツールは週3回の更新だったため、コンテンツ改善後の変化が、いつAIの回答に反映されたのか判断しづらい状態でした。GEO Watcherに切り替えてからは、毎日のデータで言及率や引用URLの変化を追えるため、施策後の反応を早い段階で確認できます。複数のAIの回答原文やグラフもまとめて共有でき、社内報告の根拠として使いやすくなりました。」",
              image: voice3Image,
              rating: 5,
            },
          ].map((reviewer) => (
            <div key={reviewer.name} className="rounded-lg bg-white p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-[80px] w-[80px] rounded-full overflow-hidden bg-gray-200">
                  {reviewer.image && (
                    <Image
                      src={reviewer.image}
                      alt={reviewer.name}
                      width={80}
                      height={80}
                      className={`h-full w-full object-cover ${reviewer.name === "広報・マーケティング担当者" ? "scale-200 -translate-y-1" : ""}`}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-3 text-[14px] leading-[1.6] text-[#4e4e51]">
                  {reviewer.review}
                </p>
                <div className="border-t border-[#e0e0e0] pt-3">
                  <p className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>
                    {reviewer.name}
                  </p>
                  <p className="text-[#999] mb-2" style={{ fontSize: "var(--fs-label-sm)" }}>
                    {reviewer.role}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < reviewer.rating ? "text-[#FFC93B] text-lg" : "text-[#ddd] text-lg"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
                  <span className="font-bold" style={{ fontSize: "clamp(28px, 3.2vw, 36px)" }}>{p.price}</span>
                  <span className="font-medium" style={{ fontSize: "var(--fs-label)" }}>円 / 月</span>
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
      style={{ background: "linear-gradient(180deg, #e8f4fb 0%, #d4e8f7 50%, #c8dff5 100%)" }}
    >
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
        <div>
          <div className="font-mono tracking-[0.18em] uppercase text-[#003393] mb-5" style={{ fontSize: "var(--fs-label-xxs)" }}>
            AI検索で選ばれるための一歩を、ここから
          </div>
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            AI検索で選ばれるための<br />一歩を、ここから。
          </h2>
          <p className="mt-6 text-[16px] text-[#4e4e51] leading-[1.6] max-w-[52ch]">
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
            <CalendarBookingButton className="!w-full !min-w-0 !max-w-none !h-[52px] !justify-start text-left px-6 gap-2 !bg-transparent !border !border-[#003393] !text-[#003393] hover:!bg-[#003393] hover:!text-white hover:!border-[#003393]">
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
      <NavigationSection />
      <StepsSection />
      <AnswerSection />
      <FeaturesSection />
      <ReasonsSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <WatcherFAQ />
    </div>
  );
}
