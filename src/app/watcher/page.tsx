import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { WatcherFAQ } from "./WatcherFAQ";
import { GuidedDemo } from "./GuidedDemo";
import { PricingSection } from "./PricingSection";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
const voice1Image = "/design-assets/voice1.png";
const voice2Image = "/design-assets/voice2.png";
const voice3Image = "/design-assets/voice3.png";

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
    <section id="top" className="relative bg-white py-12 pb-0">
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
        <h3
          className="font-bold max-w-[60ch] mx-auto"
          style={{ fontSize: "var(--fs-h3)", lineHeight: "1.5", letterSpacing: "-0.035em" }}
        >
          <span style={{ color: "#003393" }}>AI時代のGEO・LLMO・AIO対策</span>は<span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>月額コンサルなしで、</span>これひとつ。
        </h3>

        {/* H1 Title */}
        <h1
          className="hero-h1-match-index font-bold max-w-[48ch] mx-auto mt-4"
          style={{ fontSize: "53px", lineHeight: "1.5", letterSpacing: "-0.035em", fontFamily: "'NiveauGrotesk', sans-serif" }}
        >
GEO・LLMO<span style={{ marginLeft: "3px", fontSize: "49px", fontFamily: "'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif" }}>対策ツール</span> <span style={{ color: "#003393" }}>GEO Watcher</span>
        </h1>

        {/* Subcopy Section */}
        <div className="mt-6 max-w-[720px] mb-8">
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
    { label: "REASONS", ja: "選ばれる理由", href: "#reasons" },
    { label: "PRICING", ja: "料金プラン", href: "#pricing" },
    { label: "SPOT SUPPORT", ja: "スポットサポート", href: "#support" },
    { label: "VOICE", ja: "顧客の声", href: "#testimonials" },
    { label: "CONTACT", ja: "お問い合わせ", href: "#contact" },
    { label: "FAQ", ja: "FAQ", href: "#faq" },
  ];

  return (
    <section className="nav-anchor-section bg-white py-0 border-t border-b border-black/[0.06]">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="nav-anchor-list flex flex-col sm:flex-row flex-wrap justify-center">
          {items.map((item, idx) => (
            <div key={item.href} className="nav-anchor-item flex items-center">
              <a
                href={item.href}
                className="px-3 sm:px-4 py-4 text-center hover:opacity-80 transition-opacity w-full sm:w-auto"
                style={{ minWidth: "120px" }}
              >
                <div className="nav-anchor-label font-bold tracking-widest uppercase mb-1" style={{ color: "#003393", fontSize: "10px" }}>{item.label}</div>
                <div className="nav-anchor-ja" style={{ fontSize: "17px", fontWeight: "600", color: "#003393" }}>{item.ja}</div>
                <div className="nav-anchor-dot text-[10px] mt-1" style={{ color: "#003393" }}>•</div>
              </a>
              {idx < items.length - 1 && (
                <div className="nav-anchor-divider" style={{ width: "1px", height: "60px", backgroundColor: "#003393", margin: "0 0" }} />
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
      <p className="text-[#4e4e51] leading-[1.5]" style={{ fontSize: "var(--fs-label)" }}>{step.detail}</p>
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
      title: "確かめる",
      description: "施策後の変化を毎日追う",
      detail: "改善後に、言及率や引用状況がどう変わったかを確認します。施策前後を比較しながら、次の改善につなげます。"
    },
    {
      number: "5",
      title: "改善する",
      description: "サイトやコンテンツを見直す",
      detail: "引用されている競合ページや情報源を参考に、自社サイトやコンテンツを改善します。何を直すべきか迷う場合は、コンテンツ改善のスポットサポートも利用できます。"
    }
  ];

  return (
    <section className="pt-24 pb-24" style={{ background: "#d4e8f7" }}>
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
          {/* 上段: 1 → 2 → 3 */}
          <div className="flex items-stretch">
            <StepCard step={steps[0]} />
            <ArrowH />
            <StepCard step={steps[1]} />
            <ArrowH />
            <StepCard step={steps[2]} />
          </div>

          {/* 中段: 縦矢印 (左: 5→1 上向き / 右: 3→4 下向き) */}
          <div className="flex items-center" style={{ height: "90px" }}>
            <div style={{ flex: "1 1 0" }} className="flex justify-center">
              <ArrowV direction="up" />
            </div>
            <div style={{ flex: "1 1 0" }} />
            <div style={{ flex: "1 1 0" }} className="flex justify-center">
              <ArrowV direction="down" />
            </div>
          </div>

          {/* 下段: 5 ← 4 (上段の左右端カード中心に合わせる) */}
          <div className="flex items-stretch" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
            <StepCard step={steps[4]} />
            <ArrowH direction="left" />
            <StepCard step={steps[3]} />
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

function FeaturesSection() {
  return (
    <section id="features" className="bg-white pt-[72px] pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-7">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span> GEO Watcherの<span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>主要機能</span> <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span>
          </h2>
        </div>

        <GuidedDemo />

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div>
            <h3 className="font-bold mb-4 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>AI可視性：複数のAIで、自社の露出状況をひと目で確認</span>
            </h3>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              主要なAIエンジンの回答内で、自社や競合がどれだけ言及されているかを一覧で確認できます。<br />
              プロンプト別、AIモデル別に絞り込めるため、どのAIで露出が多く、どこで不足しているのかを正確に把握できます。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/watcher-demo/demo_visibility_v3.png"
              alt="AI可視性画面"
              width={1258}
              height={686}
              className="w-full h-auto"
            />
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div className="rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/watcher-demo/demo_prompt_v3.png"
              alt="プロンプトモニタリング画面"
              width={1258}
              height={686}
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-bold mb-4 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>プロンプトモニタリング：注目したい質問の変化を、継続的に追跡</span>
            </h3>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              登録したプロンプトごとに、ブランドの言及率、引用URL、実際のAI回答文を継続的に記録します。<br />
              「以前は自社が表示されていたのに、今は競合が表示されている」といった変化にも、いち早く気づけます。
            </p>
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div>
            <h3 className="font-bold mb-4 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>シェア・オブ・ボイス：競合と比べて、自社がどれだけ言及されているかを比較</span>
            </h3>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              各AIエンジンにおいて、自社と競合がどのくらいの割合で言及されているかを比較できます。<br />
              ブランドごとの言及順位や、プロンプト別・AIモデル別のシェアを確認することで、業界内での現在地が分かります。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/watcher-demo/demo_sov_v3.png"
              alt="シェア・オブ・ボイス画面"
              width={1258}
              height={686}
              className="w-full h-auto"
            />
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div className="rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/watcher-demo/demo_citation_v3.png"
              alt="引用URL分析画面"
              width={1258}
              height={686}
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-bold mb-4 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>引用URL分析：AIが、どのページを根拠にしているかを特定</span>
            </h3>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              AIが回答を生成する際に参照・引用したURLやドメインを確認できます。<br />
              自社サイトのどのページが引用されているか、競合のどのコンテンツが選ばれているかを把握し、改善すべきページやテーマの発見につなげられます。<br />
              また、公式サイト、メディア、SNSなど、どの種類の情報源が引用されやすいかも確認できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  const reasons = [
    {
      title: "国内最大、7つの主要AIモデルをカバー",
      highlight: "国内最大、7つの主要AIモデル",
      subtitle: "一つのAIだけでは分からない、ブランドの現在地を把握。",
      desc: "ChatGPT、Gemini、Perplexity、Google AI Overviews、AI Mode、Copilotの主要6AIに標準対応。（Claudeはオプションで追加できます）AIごとに異なる自社・競合の言及や引用状況を、まとめて確認できます。",
    },
    {
      title: "週数回では見えにくい変化まで、毎日追跡",
      highlight: "毎日追跡。",
      subtitle: "施策の効果を、点ではなく流れで判断。",
      desc: "AIの回答や引用元は日々変わるため、計測間隔が空くほど、その変化がいつ起きたのかを捉えにくくなります。GEO Watcherは毎日自動で計測し、プロンプトの実行条件も調整可能。改善後の反応を早い段階で捉え、次の判断につなげられます。",
    },
    {
      title: "最大20社の競合と比較",
      highlight: "最大20社の競合",
      subtitle: "自社だけでは分からない、業界内での立ち位置を可視化。",
      desc: "最大20社の競合ブランドを登録できます。自社と競合の露出、言及、引用状況を比較し、差が広がっているのか、縮まっているのかを継続的に把握できます。",
    },
    {
      title: "過去365日分のデータを保存",
      highlight: "365日分のデータを保存",
      subtitle: "季節変動も、施策の積み重ねも、1年単位で確認。",
      desc: "AI検索上の言及や引用は、季節要因やキャンペーン、コンテンツ更新によって変化します。過去365日分の計測データを保存することで、短期的な増減だけでなく、改善前後の違いや施策を積み重ねた結果を時系列で確認できます。",
    },
    {
      title: "データを、報告や共有にそのまま活用",
      highlight: "報告や共有にそのまま",
      subtitle: "分析結果を、社内で使える資料に。",
      desc: "計測結果はCSVでダウンロードできるほか、グラフや分析画面を画像として保存できます。社内報告や定例会議、施策前後の比較資料にも、そのまま活用できます。",
    },
    {
      title: "ブランド名とURLから、プロンプトを自動生成",
      highlight: "プロンプトを自動生成",
      subtitle: "何を計測するか迷わず、そのままスタート。",
      desc: "ブランド名とWebサイトのURLを登録するだけで、AI検索上の状況を確認するためのプロンプトを自動で生成します。専門的な設定は不要で、生成後のプロンプトは目的に合わせて自由に編集できます。",
    },
  ];

  return (
    <section id="reasons" className="pt-24 pb-24" style={{ background: "#e8f4fb" }}>
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            GEO Watcher、<span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>選ばれる理由</span>
          </h2>
          <h4 className="font-bold" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
            AI検索上の変化を、広く、毎日、長く追える。
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            return (
              <div key={r.title} className="rounded-2xl overflow-hidden bg-white p-7">
                <div className="flex items-center gap-2 mb-4 rounded-xl pl-3 pr-4" style={{ backgroundColor: "#ffcc00", minHeight: "56px", width: "100%" }}>
                  <span className="font-bold text-[#0B0B0E] flex-shrink-0" style={{ fontSize: "var(--fs-label)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="font-bold text-[#0B0B0E] leading-snug" style={{ fontSize: "var(--fs-h4)" }}>
                    {r.title}
                  </h4>
                </div>
                <p className="font-bold mb-3" style={{ fontSize: "var(--fs-body)", color: "#003393" }}>{r.subtitle}</p>
                <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-12 lg:py-16">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {[
            {
              name: "EC運営担当者",
              role: "化粧品・自社EC",
              headline: "月額コンサルではなく、必要な支援だけ頼めました。",
              review: "他社のGEO・LLMOツールを検討したときは、最後に月額コンサルを提案されることが多く、導入を見送っていました。GEO Watcherは、主要な計測機能をツール内で利用でき、苦手だったプロンプト設計だけを、1回単位で依頼できました。毎月の追加費用が発生しないため、社内でも説明しやすく、導入までスムーズに進められました。",
              image: voice1Image,
              rating: 5,
            },
            {
              name: "広報・マーケティング担当者",
              role: "地方製造業",
              headline: "ビッグデータの専門企業が開発していることが、導入の決め手でした。",
              review: "GEO・LLMO対策はまだ新しい分野なので、ツールの機能だけでなく、どのような会社が開発・運営しているかも重視しました。GEO Watcherは、検索データやビッグデータを長年扱ってきた企業が開発しているため、計測データの信頼性にも安心感がありました。複数のAIにおける自社と競合の変化を、継続的に確認できる点も、社内で導入を決める後押しになりました。",
              image: voice2Image,
              rating: 5,
            },
            {
              name: "マーケティングマネージャー",
              role: "BtoB SaaS企業",
              headline: "施策後の変化を、データで説明できるようになりました。",
              review: "以前利用していたGEO・LLMOツールは週3回の更新だったため、コンテンツ改善後の変化が、いつAIの回答に反映されたのか判断しづらい状態でした。GEO Watcherに切り替えてからは、毎日のデータで言及率や引用URLの変化を追えるため、施策後の反応を早い段階で確認できます。複数のAIの回答原文やグラフもまとめて共有でき、社内報告の根拠として使いやすくなりました。",
              image: voice3Image,
              rating: 5,
            },
          ].map((reviewer) => (
            <div key={reviewer.name} className="rounded-lg bg-white border border-black/[0.07] p-6 flex flex-col items-center text-center" style={{ boxShadow: "0 4px 12px -4px rgba(11,14,22,0.1)" }}>
              <div className="flex-shrink-0 mb-4">
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
              <div className="flex-1 w-full flex flex-col items-center">
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: "9px solid #0066ff",
                  }}
                />
                <div className="inline-flex items-center mb-3 rounded-xl px-4 py-2" style={{ backgroundColor: "#0066ff" }}>
                  <p className="font-bold text-white leading-snug" style={{ fontSize: "var(--fs-body)" }}>
                    {reviewer.headline}
                  </p>
                </div>
                <p className="mb-3 leading-[1.6] text-[#4e4e51] text-left" style={{ fontSize: "var(--fs-body-sm)" }}>
                  {reviewer.review}
                </p>
                <div className="border-t border-[#e0e0e0] pt-3">
                  <p className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>
                    {reviewer.name}
                  </p>
                  <p className="text-[#999] mb-2" style={{ fontSize: "var(--fs-label-sm)" }}>
                    {reviewer.role}
                  </p>
                  <div className="flex gap-1 justify-center">
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

function SpotSupportSection() {
  const spotSupports = [
    {
      title: "プロンプト設計サポート",
      image: "/spot01.png",
      tagline: "最適なプロンプトを、実際の検索データから設計",
      body: "ブランド、商品、ターゲットについてヒアリングし、消費者が実際に検索しているテーマをもとに、計測すべき最適なプロンプトを設計します。単に質問文を作るのではなく、「なぜこの質問を追うのか」まで整理した状態で納品します。",
      price: "30,000〜50,000円　※設計するプロンプト数に応じて、申し込み前に確定します",
      duration: "5営業日以内",
      hearing: "30分",
      deliverable: "プロンプトの設計・登録、設計意図をまとめた解説資料",
      useCases: ["どのプロンプトを登録すべきか分からない", "自動生成したプロンプトを精緻化したい", "購買段階に合わせて質問を設計したい"],
    },
    {
      title: "コンテンツ改善診断",
      image: "/spot02.png",
      tagline: "AI引用に特化した具体的なコンテンツ改善",
      body: "プロンプトと自社ページを分析し、改善すべきページと整理。GoogleとMicrosoftが保有する検索関連の特許をベースに、AI引用に特化した具体的なコンテンツ改善施策をレポート化して納品いたします。",
      price: "80,000円〜　1コンテンツあたり8,000円　※改善対象のページ数に応じて、価格を確定します",
      duration: "10営業日以内　※ページ数に応じて、変動いたします",
      hearing: "30分",
      deliverable: "コンテンツ改善施策レポート",
      useCases: ["具体的なコンテンツ改善のやり方がわからない", "優先して改善するページを絞り込みたい", "単発で専門的なサポートをしてほしい"],
    },
  ];

  return (
    <section id="support" className="pt-24 pb-24" style={{ background: "#e8f4fb" }}>
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            必要なときだけ使える、スポットサポート（オプション）
          </h2>
          <h3 className="font-bold mb-6" style={{ fontSize: "var(--fs-h3)", color: "#003393" }}>
            <span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>月額契約なし。必要な支援だけを、必要なときに。</span>
          </h3>
          <p className="text-[#4e4e51] leading-[1.8] max-w-[900px] mx-auto" style={{ fontSize: "var(--fs-body)" }}>
            GEO Watcherは、日々の計測や分析を自社で進められるツールです。<br />
            GEO・LLMO対策で専門的な判断に迷ったときは、計測結果をもとに、次に取り組むべき質問や改善テーマを整理するスポットサポートを利用できます。<br />
            この提案支援のベースとなるのが、<span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>日本3.5億件を含む15億件超の実検索データ</span>です。消費者の検索意図や需要と、現在の言及・引用状況、競合との差を照らし合わせ、優先すべき打ち手を明確にします。<br />
            <span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>月額契約や自動更新はなく、必要な支援だけをスポットで利用</span>できます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spotSupports.map((s, i) => (
            <div key={s.title} className="bg-white rounded-2xl overflow-hidden flex flex-col">
              {"image" in s && s.image && (
                <div className="w-full relative" style={{ aspectRatio: "16 / 9" }}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 rounded-full flex items-center justify-center" style={{ width: "36px", height: "36px", backgroundColor: "#003393" }}>
                    <span className="font-bold text-white" style={{ fontSize: "var(--fs-body-xsm)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-bold" style={{ fontSize: "var(--fs-h3)", color: "#003393" }}>
                    <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>{s.title}</span>
                  </h3>
                </div>
                <p className="font-bold mb-4" style={{ fontSize: "var(--fs-body-sm)", color: "#003393" }}>{s.tagline}</p>
                <p className="text-[#4e4e51] leading-[1.7] mb-6 flex-1" style={{ fontSize: "var(--fs-body-sm)" }}>{s.body}</p>

                <div className="mb-6 rounded-lg overflow-hidden border border-black/[0.1]">
                  {[
                    ["価格", s.price],
                    ["期間", s.duration],
                    ["ヒアリング", s.hearing],
                    ["納品内容", s.deliverable],
                  ].map(([label, value], i) => (
                    <div key={label} className={`grid grid-cols-[100px_1fr] ${i > 0 ? "border-t border-black/[0.1]" : ""}`}>
                      <div className="px-4 py-3 text-[#4e4e51] whitespace-nowrap" style={{ fontSize: "var(--fs-label)", backgroundColor: "#F6F7FB" }}>{label}</div>
                      <div className="px-4 py-3 text-[#0B0B0E]" style={{ fontSize: "var(--fs-label)" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="relative inline-block mb-4 rounded-xl px-4 py-2" style={{ backgroundColor: "#003393" }}>
                    <span className="font-bold text-white" style={{ fontSize: "var(--fs-body-xsm)" }}>こんなときに</span>
                    <div
                      className="absolute"
                      style={{
                        bottom: "-6px",
                        left: "22px",
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "7px solid #003393",
                      }}
                    />
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {s.useCases.map((u) => (
                      <li key={u} className="text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>・{u}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
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
              <Link href="/watcher#top" scroll={true}>GEO Watcherを見る →</Link>
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
          <div className="mt-32">
            <HeroLogoMark />
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
      <FeaturesSection />
      <ReasonsSection />
      <PricingSection />
      <SpotSupportSection />
      <TestimonialsSection />
      <ContactSection />
      <WatcherFAQ />
    </div>
  );
}
