import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { ShindanFAQ } from "./ShindanFAQ";
import { ShindanGuidedDemo } from "./ShindanGuidedDemo";
import { ShindanPricingSection } from "./ShindanPricingSection";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO診断レポート | GEO・LLMO診断レポート作成ツール",
  description:
    "商談で使えるSEO・Web制作会社向けGEO・LLMO診断レポート作成ツール。ブランド名とURL入力の2ステップで営業に使える提案資料が数分で完成。",
  path: "/shindan",
});

export const dynamic = "force-static";

function HeroSection() {
  return (
    <section className="relative bg-white py-8 pb-0">
      <div className="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full flex flex-col items-center text-center">
        {/* Label */}
        <div className="mb-8 border border-[#003393] rounded-full px-6 py-2 inline-block">
          <p className="text-[#003393] font-bold" style={{ fontSize: "var(--fs-label)" }}>SEO・Webエージェンシの法人営業向け</p>
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
          className="font-bold max-w-[48ch] mx-auto"
          style={{ fontSize: "53px", lineHeight: "1.5", letterSpacing: "-0.035em", fontFamily: "'NiveauGrotesk', sans-serif" }}
        >
GEO・LLMO<span style={{ marginLeft: "3px", fontSize: "49px", fontFamily: "'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif" }}>診断結果を、</span><br />商談と次の提案につなげる
        </h1>

        {/* Subcopy Section */}
        <div className="mt-6 max-w-[720px] mb-8">
          <p className="text-[#0B0B0E] leading-[1.8] mb-0 font-medium" style={{ fontSize: "var(--fs-body)" }}>
            見込み顧客のAI検索上の現在地と競合との差を、提案につながる診断レポートで可視化。<br />
            ブランド名とURLを入力するだけで、GEO・LLMO提案のきっかけを数分でつくる。
          </p>
        </div>

      </div>
    </section>
  );
}

function NavigationSection() {
  const items = [
    { label: "FEATURES", ja: "主要機能", href: "#features" },
    { label: "USE CASES", ja: "活用場面", href: "#reasons" },
    { label: "PRICING", ja: "料金プラン", href: "#pricing" },
    { label: "CONTACT", ja: "お問い合わせ", href: "#contact" },
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

type Step = { number: string; title: string; detail: string[] };

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-7 py-6" style={{ border: "1px solid #4472C4", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#0B2A6B", fontSize: "14px" }}>
          {step.number}
        </div>
        <h3 className="font-bold" style={{ fontSize: "var(--fs-h4)", letterSpacing: "-0.02em", color: "#003393" }}>
          <span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>{step.title}</span>
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {step.detail.map((line) => (
          <p key={line} className="text-[#4e4e51] leading-[1.7]" style={{ fontSize: "var(--fs-body-sm)" }}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function StepsSection() {
  const steps: Step[] = [
    {
      number: "1",
      title: "診断するブランド名とURLを入力",
      detail: [
        "ブランド名とWebサイトのURLを入力するだけで、診断を開始できます。プロンプトや競合企業は自動で生成されるため、複雑な事前設定は必要ありません。",
        "例えば、「ユニクロ」「UNIQLO」のように複数の表記がある場合は、それぞれ登録することで、より幅広い言及を検出できます。",
        "生成されたプロンプトや競合企業は、必要に応じて追加・変更できます。",
      ],
    },
    {
      number: "2",
      title: "自社の提案資料として整える",
      detail: [
        "レポートに表示するロゴ、CTA、メールアドレス、担当者名を自社仕様に変更できます。",
        "自社が提供する提案資料として整え、そのまま見込み顧客への商談や提案に活用できます。",
        "提案内容や営業方針に合わせて、CTAの文言や表示内容も調整できます。",
      ],
    },
  ];

  return (
    <section className="pt-24 pb-24" style={{ background: "#d4e8f7" }}>
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] mb-4"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            GEO・LLMOの商談で使える営業資料を、<br />
            <span style={{ color: "#003393" }}>かんたん2ステップで</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-[1100px] mx-auto">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
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
            <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span> GEO・LLMO診断レポートで<span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>分かること</span> <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span>
          </h2>
          <h4 className="font-bold mb-4" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
            商談で示すべき課題を、4つの視点で明確に。
          </h4>
          <p className="text-[17px] text-[#4e4e51] leading-[1.6] max-w-[900px] mx-auto">
            診断対象ブランドの言及状況だけでなく、競合との差や、対策候補となる質問・テーマまで確認できます。<br />
            初回商談で「現在の状況」と「次に検討すべき課題」を具体的に説明できるGEO・LLMO診断レポートを作成します。
          </p>
        </div>

        <ShindanGuidedDemo />

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div>
            <h3 className="font-bold mb-2 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>AIエンジン別言及率</span>
            </h3>
            <p className="font-bold mb-3" style={{ fontSize: "var(--fs-body-sm)", color: "#003393" }}>
              どのAIで表示され、どのAIで不足しているかを確認。
            </p>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              AIエンジンごとに、診断対象ブランドがどの程度言及されているかを確認できます。<br />
              AIによる違いを比較することで、露出が多い領域と、対策が必要な領域を整理できます。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-white p-6" style={{ border: "1px solid #E3E7F0" }}>
            <Image
              src="/shindan-demo/feature1_mention_rate.png"
              alt="AIエンジン別言及率画面"
              width={2106}
              height={1122}
              className="w-full h-auto"
            />
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div className="rounded-2xl overflow-hidden order-2 lg:order-1 bg-white p-6" style={{ border: "1px solid #E3E7F0" }}>
            <Image
              src="/shindan-demo/feature2_content_gap.png"
              alt="コンテンツギャップ画面"
              width={1146}
              height={548}
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-bold mb-2 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>コンテンツギャップ</span>
            </h3>
            <p className="font-bold mb-3" style={{ fontSize: "var(--fs-body-sm)", color: "#003393" }}>
              競合は表示され、診断対象ブランドは表示されていない質問を発見。
            </p>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              競合ブランドが言及されている一方で、診断対象ブランドが表示されていないプロンプトを確認できます。<br />
              対策すべきテーマをまとめて把握し、コンテンツ制作や改善提案につなげられます。
            </p>
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div>
            <h3 className="font-bold mb-2 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>競合状況分析</span>
            </h3>
            <p className="font-bold mb-3" style={{ fontSize: "var(--fs-body-sm)", color: "#003393" }}>
              競合と比べた、AI検索上の現在地を可視化。
            </p>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              診断対象ブランドと競合ブランドのシェア・オブ・ボイスを比較できます。<br />
              どの競合が優位なのか、どの領域に差があるのかを整理し、営業提案で伝えるべき課題を明確にできます。
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-white p-6" style={{ border: "1px solid #E3E7F0" }}>
            <Image
              src="/shindan-demo/feature3_competitor.png"
              alt="競合状況分析画面"
              width={1624}
              height={810}
              className="w-full h-auto"
            />
          </div>
        </div>

        <hr className="max-w-[1274px] mx-auto my-6 border-black/[0.08]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-[1274px] mx-auto">
          <div className="rounded-2xl overflow-hidden order-2 lg:order-1 bg-white p-6" style={{ border: "1px solid #E3E7F0" }}>
            <Image
              src="/shindan-demo/feature4_prompt_analysis.png"
              alt="プロンプト分析画面"
              width={2118}
              height={1188}
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="font-bold mb-2 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
              <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>プロンプト分析</span>
            </h3>
            <p className="font-bold mb-3" style={{ fontSize: "var(--fs-body-sm)", color: "#003393" }}>
              質問ごとに、診断対象ブランドと競合の差を確認。
            </p>
            <p className="text-[#4e4e51] leading-[1.8]" style={{ fontSize: "var(--fs-body)" }}>
              代表的なプロンプトごとに、診断対象ブランドと競合ブランドの言及状況を比較できます。<br />
              自社が露出しているクエリと、競合が優位なクエリを明確に整理。自社の強み・弱みに応じた具体的な改善テーマを抽出できます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  const useCases = [
    {
      image: "/shindan-demo/usecases/hypothesis.png",
      title: "商談前に、課題に対して仮説を持てる",
      desc: "見込み顧客の言及状況や競合との差を事前に把握。初回商談から、相手企業に合った具体的なテーマで会話を始められる。",
    },
    {
      image: "/shindan-demo/usecases/proposal-material.png",
      title: "診断結果を、自社の提案資料として使える",
      desc: "GEO・LLMO診断レポートのロゴ、問い合わせ先、担当者情報を自社仕様に変更可能。自社が提供する診断レポートとして、そのまま見込み顧客に提示できる。",
    },
    {
      image: "/shindan-demo/usecases/next-theme.webp",
      title: "次に提案すべきテーマが見える",
      desc: "競合は表示されている一方で、診断対象ブランドが表示されていない質問やテーマを確認。コンテンツ制作、サイト改善、GEO・LLMO対策など、次の提案内容を整理できる。",
    },
    {
      image: "/shindan-demo/usecases/new-angle.webp",
      title: "既存提案に、新しい切り口を加えられる",
      desc: "SEO、コンテンツ制作、Webマーケティングの提案に、GEO・LLMOという新たな提案機会を追加。新規顧客への初回提案だけでなく、既存顧客への追加提案にも活用できる。",
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
            法人営業での<span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>活用場面</span>
          </h2>
          <h4 className="font-bold mb-4" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
            商談前の仮説から、追加提案のきっかけまで。
          </h4>
          <p className="text-[17px] text-[#4e4e51] leading-[1.6] max-w-[900px] mx-auto">
            GEO・LLMO診断レポートは、見込み顧客のAI検索上の課題を可視化するだけでなく、商談前の調査から初回提案、提案後のフォローまで活用できるよう設計されています。<br />
            相手企業ごとの診断データをもとに、一般論ではない具体的な提案につなげられます。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto" style={{ width: "90%" }}>
          {useCases.map((u) => (
            <div key={u.title} className="rounded-2xl bg-white p-8 flex flex-col items-center text-center" style={{ border: "1px solid #7DD3FC" }}>
              <div
                className="rounded-full flex-shrink-0 mb-6"
                style={{
                  width: "180px",
                  height: "180px",
                  backgroundImage: `url(${u.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={u.title}
              />
              <h4 className="font-bold mb-3 leading-snug" style={{ fontSize: "var(--fs-h4)", color: "#003393" }}>
                <span style={{ backgroundImage: "linear-gradient(transparent 55%, #c7e8ff 55%, #c7e8ff 92%, transparent 92%)", paddingBottom: "4px" }}>{u.title}</span>
              </h4>
              <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{u.desc}</p>
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

export default function ShindanPage() {
  return (
    <div>
      <HeroSection />
      <NavigationSection />
      <StepsSection />
      <FeaturesSection />
      <ReasonsSection />
      <ShindanPricingSection />
      <ContactSection />
      <ShindanFAQ />
    </div>
  );
}
