import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Gauge, Eye, Lightbulb, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { HeroShindanAnimated } from "@/components/home/HeroShindanAnimated";
import { HeroWatcherAnimated } from "@/components/home/HeroWatcherAnimated";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import mktStressImage from "../../Design/mkt-stress.png";
import salesStressImage from "../../Design/sales-stress.png";
import salesSuccessImage from "../../Design/salessucccess.png";
import teamMeetImage from "../../Design/teammeet.png";
import voice1Image from "../../Design/voice1.png";
import voice2Image from "../../Design/voice2.png";
import voice3Image from "../../Design/voice3.png";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO・LLMO・AIO対策ツール｜Ascent GEO",
  description:
    "Ascent GEOは、AI検索上の自社・競合の変化をモニタリングする「GEO Watcher」と、GEO・LLMO営業提案に使える「GEO診断レポート」を提供。",
  path: "/",
});

export const dynamic = "force-static";

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative pt-12 pb-12 lg:pt-12 lg:pb-16 bg-white border-b border-black/[0.06]">
      <div className="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full flex flex-col items-center text-center">
        <div className="mb-8 border border-[#003393] rounded-full px-6 py-2 inline-block">
          <p className="text-[#003393] font-bold" style={{ fontSize: "var(--fs-label-sm)" }}>企業のGEO・LLMO対策を支援</p>
        </div>
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
        <h1
          className="text-[#0B0B0E] font-bold max-w-[34ch] mx-auto"
          style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
        >
          GEO・LLMO対策の目的に合わせた、<br />
          <span className="text-blue-gradient">2つのソリューション</span>
        </h1>
        <p className="mt-6 text-[#4e4e51] leading-[1.6] max-w-[72ch] mx-auto" style={{ fontSize: "var(--fs-body-sm)" }}>
          自社・競合の変化を継続的に追いたい企業には、<span className="text-marker-highlight">モニタリングツール「GEO Watcher」</span>。見込み顧客の課題を可視化し、<span className="text-marker-highlight">営業提案につなげたい企業には「GEO診断レポート」</span>。Ascent GEOは、自社ブランドの継続的な改善と、見込み顧客への営業提案。2つの目的に応えるソリューションを提供します。
        </p>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-[1232px] mx-auto">
          <div className="hero-solution-card relative flex flex-col items-center gap-6 rounded-2xl p-8 pt-9">
            <span className="hero-solution-card__eyebrow absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-[#003393] whitespace-nowrap" style={{ fontSize: "var(--fs-label)" }}>企業のマーケティング・ブランド担当者向け</span>
            <div className="flex flex-col items-center gap-2 text-center">
              <h3 className="font-bold text-[#003393] leading-snug" style={{ fontSize: "var(--fs-h3)" }}><span className="text-marker-highlight-blue">AI対策ツール「GEO Watcher」</span></h3>
              <p className="font-bold text-[#0B0B0E] leading-[1.45]" style={{ fontSize: "var(--fs-body)" }}>国内最大、7つの主要AIモデルをカバー</p>
              <p className="font-bold text-[#0B0B0E] leading-[1.45]" style={{ fontSize: "var(--fs-body)" }}>料金も、使える範囲も、最初から明確に</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[420px]">
              {[
                "ブランド言及", "競合比較", "URL引用", "トピック分類",
                "検索キーワード", "AI回答の原文", "自動プロンプト分析", "CSVデータ", "毎日追跡",
              ].map((tag) => (
                <span key={tag} className="text-[#4e4e51] bg-black/[0.04] rounded-full px-3 py-1.5" style={{ fontSize: "var(--fs-label-sm)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <Button
              asChild
              variant="cta"
              className="!h-[52px] !min-h-[52px] !max-h-[52px] !w-full !max-w-[320px] !min-w-0 !flex-none !items-center !justify-center !py-0 !px-6 !text-center !leading-none !bg-[#003393] hover:!bg-[#0B0B0E]" style={{ fontSize: "var(--fs-label)" }}
            >
              <Link href="/watcher" className="flex h-full w-full items-center justify-center gap-0">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-white">
                  <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="font-bold">GEO Watcherをもっと見る</span>
              </Link>
            </Button>
            <HeroWatcherAnimated />
          </div>
          <div className="hero-solution-card relative flex flex-col items-center gap-6 rounded-2xl p-8 pt-9">
            <span className="hero-solution-card__eyebrow absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-[14px] font-medium text-[#003393] whitespace-nowrap">SEO・Webマーケティング会社の法人営業向け</span>
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-bold text-[#003393] leading-snug" style={{ fontSize: "var(--fs-h3)" }}><span className="text-marker-highlight-blue">法人営業向け「GEO診断レポート」</span></h3>
              {[
                "診断結果を、自社の提案資料として使える",
                "自社仕様のレポートにカスタマイズ",
              ].map((line) => (
                <p key={line} className="font-bold text-[#0B0B0E] leading-[1.45]" style={{ fontSize: "var(--fs-body)" }}>{line}</p>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[420px]">
              {[
                "ブランド言及率", "競合比較", "URL引用", "自動プロンプト分析",
                "AI エンジン別パフォーマンス", "AI 検索クエリ上位", "コンテンツギャップ",
              ].map((tag) => (
                <span key={tag} className="text-[#4e4e51] bg-black/[0.04] rounded-full px-3 py-1.5" style={{ fontSize: "var(--fs-label-sm)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <Button
              asChild
              variant="cta"
              className="!h-[52px] !min-h-[52px] !max-h-[52px] !w-full !max-w-[320px] !min-w-0 !flex-none !items-center !justify-center !py-0 !px-6 !text-center !leading-none !bg-[#003393] hover:!bg-[#0B0B0E]" style={{ fontSize: "var(--fs-label)" }}
            >
              <Link href="/shindan" className="flex h-full w-full items-center justify-center gap-0">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-white">
                  <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="font-bold">GEO診断レポートをもっと見る</span>
              </Link>
            </Button>
            <HeroShindanAnimated />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   2 Solutions Section
───────────────────────────────────────────── */
function ChallengesSection() {
  const challenges = [
    {
      image: mktStressImage,
      imageAlt: "マーケティング・ブランド担当者の課題を表す円形イメージ",
      label: "GEO Watcher",
      audience: "マーケティング・ブランド担当者の課題",
      title: "AI検索上の自社・競合の変化を、追えていますか？",
      desc: "AIごとに言及や引用の状況は異なり、その結果も日々変化します。一度確認するだけでは、施策の効果や競合との差、次に改善すべきポイントを正しく判断できません。",
      bullets: [
        "複数のAIを横断して確認できていない",
        "競合との差や業界内の立ち位置が把握できていない",
        "施策前後の変化を継続的に追えていない",
        "改善すべきテーマをデータから判断できていない",
      ],
      accent: "#cd2e3a",
      bg: "#ffffff",
      border: "rgba(0,0,0,0.1)",
    },
    {
      image: salesStressImage,
      imageAlt: "法人営業担当者の課題を表す円形イメージ",
      label: "GEO診断レポート",
      audience: "SEO・Webマーケティング会社の法人営業担当者の課題",
      title: "「AI検索対策が必要です」だけで、商談を具体化できていますか？",
      desc: "一般論だけでは、相手企業にとっての課題が見えず、具体的な提案にはつながりません。商談前に、AI上の言及状況や競合との差、次に提案すべきテーマを把握する必要があります。",
      bullets: [
        "見込み顧客ごとの課題を短時間で調べられない",
        "初回商談で示せる具体的なデータがない",
        "SEO提案にGEO・LLMOの切り口を加えられない",
        "診断結果を次の相談や提案につなげにくい",
      ],
      accent: "#0070f3",
      bg: "#ffffff",
      border: "rgba(0,0,0,0.1)",
    },
  ];

  return (
    <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: "linear-gradient(180deg, #8bc0e8 0%, #d4e8f7 72%, #d4e8f7 100%)" }}>
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pb-24">
        <div className="mx-auto mb-10 flex min-h-[62px] w-full max-w-[560px] items-center justify-center rounded-full bg-white px-6 py-4 text-center">
          <p className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-h3)" }}>こんなお悩みありませんか？</p>
        </div>
        <div className="text-center">
          <h2
            className="text-white font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            <span style={{ color: "#003393" }}>GEO・LLMO、</span><span style={{ color: "#003393", backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "4px" }}>マーケティングと営業では課題が異なる。</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl pt-8 pb-7 px-7 card-hover-dark relative overflow-hidden flex flex-col items-center"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              <div className="relative mb-6 h-[168px] w-[168px] overflow-hidden rounded-full border border-black/[0.06] bg-[#f4f8fb] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:h-[182px] sm:w-[182px]">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 768px) 168px, 182px" className="object-cover" />
              </div>
              <p className="text-[#003393] mb-3 relative z-10 text-center font-bold" style={{ fontSize: "var(--fs-label-sm)" }}>{c.audience}</p>
              <h3 className="font-bold text-[#0B0B0E] mb-3 leading-snug relative z-10 text-center" style={{ fontSize: "var(--fs-h3)" }}>{c.title}</h3>
              <p className="text-[#4e4e51] leading-[1.6] mb-5 font-[inherit] relative z-10 text-center" style={{ fontSize: "var(--fs-body-xsm)" }}>{c.desc}</p>
              <ul className="flex w-full flex-col gap-2 relative z-10">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[#4e4e51] font-[inherit]" style={{ fontSize: "var(--fs-body)" }}>
                    <span className="w-4 h-[1px] bg-[#003393] mt-[10px] flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Down Divider */}
      <svg className="w-full h-24" viewBox="0 0 1200 96" preserveAspectRatio="none" style={{ display: "block", background: "#ffffff" }}>
        <polygon points="0,0 1200,0 600,96" fill="#d4e8f7" />
      </svg>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Solutions Section (화이트 배경)
───────────────────────────────────────────── */
function SolutionsSection() {
  const solutions = [
    {
      label: "GEO Watcher",
      title: "GEO Watcherで",
      subtitle: "変化を見逃さず、次の改善を判断できる。",
      desc: "AIごとの差や施策前後の変化を継続的に追うことで、GEO・LLMO対策の効果と、次に優先すべき改善テーマを判断できます。",
      cta: "GEO Watcherを見る",
      href: "/watcher",
      image: teamMeetImage,
      steps: [
        { label: "測る", desc: "主要AIでの言及・引用・露出を毎日計測", icon: "gauge" },
        { label: "比べる", desc: "自社と競合の差をAI・質問ごとに比較", icon: "eye" },
        { label: "改善する", desc: "差がある質問や引用元から、改善テーマを特定", icon: "lightbulb" },
        { label: "確かめる", desc: "施策前後の変化を時系列で追い、効果を確認", icon: "check" },
      ],
    },
    {
      label: "GEO診断レポート",
      title: "GEO診断ツールで",
      subtitle: "相手企業ごとの課題を、具体的な提案に変えられる。",
      desc: "相手企業ごとのAI検索上の課題と競合との差を、初回商談で示せるGEO・LLMOの具体的な提案材料に変えられます。",
      cta: "GEO診断レポートを見る",
      href: "/shindan",
      image: salesSuccessImage,
      steps: [
        { label: "診断する", desc: "ブランド名とURLだけでAI検索状況を数分で診断", icon: "gauge" },
        { label: "課題を示す", desc: "競合との引用差や、表示されていない質問を可視化", icon: "eye" },
        { label: "提案する", desc: "診断結果を顧客向けの提案資料に変換", icon: "lightbulb" },
        { label: "商談につなげる", desc: "相手企業ごとの課題を示し、次の提案へ", icon: "check" },
      ],
    },
  ];

  return (
    <section className="bg-white pt-12 pb-24">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-0 text-center">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
課題に合わせて選べる、<span className="text-[#0B0B0E] not-italic" style={{ backgroundImage: "linear-gradient(120deg, #d4e8f7 0%, #d4e8f7 100%)", backgroundPosition: "0 80%", backgroundRepeat: "repeat-x", backgroundSize: "100% 40%", paddingBottom: "4px" }}>2つのソリューション</span>。
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((s) => (
            <div key={s.label} className="flex flex-col">
              <div className={s.label === "GEO Watcher" || s.label === "GEO診断レポート" ? "mb-6 relative text-center px-8" : "mb-6"}>
                {(s.label === "GEO Watcher" || s.label === "GEO診断レポート") && (
                  <>
                    <svg aria-hidden="true" viewBox="0 0 24 120" className="absolute left-0 top-1/2 h-20 w-5 -translate-y-1/2">
                      <polygon points="0,0 13,0 24,112 17,120" fill="#1688c5" />
                    </svg>
                    <svg aria-hidden="true" viewBox="0 0 24 120" className="absolute right-0 top-1/2 h-20 w-5 -translate-y-1/2">
                      <polygon points="11,0 24,0 7,120 0,112" fill="#1688c5" />
                    </svg>
                  </>
                )}
                <p className="font-mono text-[#003393] mb-2 uppercase" style={{ fontSize: "var(--fs-label-xxs)", letterSpacing: "0.14em" }}>{s.label}</p>
                <h3 className="font-bold text-[#0B0B0E] mb-2 leading-snug" style={{ fontSize: "clamp(24px, 2.8vw, 32px)" }}>
                  {s.label === "GEO Watcher" || s.label === "GEO診断レポート" ? <span className="text-marker-highlight">{s.title}</span> : s.title}
                </h3>
                <p className="font-bold text-[#0B0B0E] mb-3" style={{ fontSize: "var(--fs-body)" }}>{s.subtitle}</p>
                <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>{s.desc}</p>
              </div>
              {s.image && (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
                  <Image src={s.image} alt={s.label} fill className="object-cover" />
                </div>
              )}
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-1">
                  {s.steps.map((step, i) => {
                    const getIcon = (iconType: string) => {
                      const iconProps = { size: 20, className: "flex-shrink-0" };
                      switch(iconType) {
                        case "gauge": return <Gauge {...iconProps} />;
                        case "eye": return <Eye {...iconProps} />;
                        case "lightbulb": return <Lightbulb {...iconProps} />;
                        case "check": return <Phone {...iconProps} />;
                        default: return null;
                      }
                    };

                    return (
                      <div key={i}>
                        <div className="step-item border border-[#003393]/20 rounded-lg p-4 bg-white">
                          <div className="flex gap-3 items-start">
                            <div className="flex-shrink-0 text-[#003393] mt-0.5">
                              {getIcon(step.icon || "gauge")}
                            </div>
                            <div className="flex-1">
                              <p className="text-[#0B0B0E]" style={{ fontSize: "var(--fs-body-sm)" }}>
                                <span className="font-bold">{step.label}：</span>
                                <span className="text-[#4e4e51] ml-1">{step.desc}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {i < s.steps.length - 1 && (
                          <div className="flex justify-center pt-2 pb-0">
                            <svg width="16" height="10" viewBox="0 0 16 10" className="fill-[#003393]">
                              <polygon points="0,0 16,0 8,10" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-auto flex gap-3 justify-center w-full">
                <Button
                  asChild
                  variant="cta"
                  className="!h-[52px] !min-h-[52px] !max-h-[52px] !w-full !max-w-[320px] !min-w-0 !flex-none !items-center !justify-center !py-0 !px-6 !text-center !leading-none !bg-[#003393] hover:!bg-[#0B0B0E]" style={{ fontSize: "var(--fs-label)" }}
                >
                  <Link href={s.href} className="flex h-full w-full items-center justify-center gap-0">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-white">
                      <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="font-bold">{s.cta}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GEO Lab Section
───────────────────────────────────────────── */
function GeoLabSection() {
  const articles = [
    {
      tag: "STRATEGY",
      num: "03",
      title: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ",
      desc: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。",
      date: "05.18",
      readTime: "10 MIN READ",
      size: "large",
      thumbVariant: "brand-cep" as const,
      href: "/lab/brand-cep",
    },
    {
      tag: "COMPARE",
      num: "02",
      title: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較",
      desc: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。",
      date: "05.13",
      readTime: "8 MIN READ",
      size: "small",
      thumbVariant: "seo-geo" as const,
      href: "/lab/seo-geo",
    },
    {
      tag: "GEO / LLMO",
      num: "01",
      title: "GEO/LLMO対策におすすめの会社7選を徹底比較",
      desc: "GEO対策会社7社を4つの型で比較し、費用相場・選び方・FAQまで整理した比較記事。",
      date: "05.19",
      readTime: "8 MIN READ",
      size: "small",
      thumbVariant: "geo-llmo-company" as const,
      href: "/lab/geo-llmo-company",
    },
  ];

  return (
    <section id="lab" className="bg-white pt-12 pb-10">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
              style={{ fontSize: "var(--fs-section-title)" }}
            >
              GEO・LLMO対策を、<br />
              <span className="text-blue-gradient">知識とデータ</span>の両面から。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[#4e4e51] leading-[1.6] font-[inherit]" style={{ fontSize: "var(--fs-body-sm)" }}>
              Ascent GEO LABは、AI検索時代の変化を、調査と実践から読み解くリサーチハブです。検索行動の変化、SEOとGEO・LLMOの違い、AIに引用されるコンテンツの条件、効果測定の考え方など、実務に役立つ知見を公開します。
            </p>
          </div>
        </div>

        {/* Article cards */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* 왼쪽: 큰 카드 50% */}
          <Link href={articles[0].href ?? "/lab"} className="block w-full lg:w-1/2">
            <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden card-hover group h-full flex flex-col">
              <ArticleThumbnail
                variant={articles[0].thumbVariant}
                eyebrow={articles[0].tag}
                className="h-[260px] w-full"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-[#0B0B0E] leading-snug mb-2" style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}>
                  {articles[0].title}
                </h3>
                <p className="text-[#4e4e51] leading-[1.6] mb-4 flex-1" style={{ fontSize: "var(--fs-body-xsm)" }}>{articles[0].desc}</p>
                <div className="flex items-center gap-3 mono text-[#6B6B73]" style={{ fontSize: "var(--fs-label-xxs)" }}>
                  <span>{articles[0].date}</span>
                  <span>·</span>
                  <span>{articles[0].readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* 오른쪽: 2개 세로 50% */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2" style={{ alignSelf: "stretch" }}>
            {articles.slice(1).map((article) => {
              const card = (
                <div
                  key={article.num}
                  className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden card-hover group flex h-full"
                >
                  <ArticleThumbnail
                    variant={article.thumbVariant}
                    eyebrow={article.tag}
                    className="h-full min-h-[160px] w-[160px] flex-shrink-0 rounded-none"
                  />
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-bold text-[#0B0B0E] leading-snug mb-2" style={{ fontSize: "var(--fs-h4)" }}>{article.title}</h4>
                      {article.desc && (
                        <p className="card-desc text-[#6B6B73]">{article.desc}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mono text-[#6B6B73] mt-3" style={{ fontSize: "var(--fs-label-xxs)" }}>
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              );
              return article.href ? (
                <Link key={article.num} href={article.href} className="block flex-1 h-full">
                  {card}
                </Link>
              ) : (
                <div key={article.num} className="flex-1 h-full">{card}</div>
              );
            })}
          </div>
        </div>

        {/* 하단 3카드 그리드 */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              tag: "INDUSTRY REPORT",
              title: "業界別AIトラフィックレポート 2026 Q1 — Adobeレポート",
              desc: "1兆件超の訪問データが示す変化。リテール+393%、旅行+233%など業界別AI訪問増加率と、コンバージョン・エンゲージメントへの影響をグラフで報告。",
              date: "05.19",
              readTime: "8 MIN",
              thumbVariant: "adobe-ai-traffic" as const,
              href: "/lab/adobe-ai-traffic",
            },
            {
              tag: "TECHNICAL GEO",
              title: "AIエージェントはウェブサイトをどう見るのか — 3つの方法とセマンティックHTMLの重要性",
              desc: "画面画像・構造読み取り・組み合わせの3方式を解説。セマンティックHTML・ラベル設計・SSRの実装ポイントまで、AI対応サイト設計の基本を整理します。",
              date: "05.19",
              readTime: "7 MIN",
              thumbVariant: "ai-agent-site" as const,
              href: "/lab/ai-agent-site",
            },
            {
              tag: "AGENTIC COMMERCE",
              title: "AIショッピングの登場とエージェンティックコマース",
              desc: "AIが購買を代行する時代の全体像。自動化6段階・OpenAI/Google/Shopifyのプロトコル競争・エコシステム14領域まで体系的に解説。",
              date: "05.21",
              readTime: "10 MIN",
              thumbVariant: "ai-shopping-agent" as const,
              href: "/lab/ai-shopping-agent",
            },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="block group">
              <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003393] hover:shadow-[0_12px_32px_-16px_rgba(0,51,147,0.2)]">
                <ArticleThumbnail variant={a.thumbVariant} eyebrow={a.tag} className="h-[140px] w-full" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between font-mono tracking-[0.12em] text-[#6B6B73]" style={{ fontSize: "var(--fs-caption)" }}>
                    <span className="text-[#003393]">{a.tag}</span>
                    <span>2026.{a.date}</span>
                  </div>
                  <h3 className="mb-2 flex-none font-bold leading-[1.3] tracking-[-0.01em] text-[#0B0B0E]" style={{ fontSize: "var(--fs-h4)" }}>{a.title}</h3>
                  <p className="card-desc mb-4 flex-1 text-[#6B6B73]">{a.desc}</p>
                  <div className="flex items-center justify-between border-t border-[#E6E4DD] pt-3 font-mono tracking-[0.1em] text-[#9A9AA0]" style={{ fontSize: "var(--fs-caption)" }}>
                    <span>{a.readTime}</span>
                    <span className="text-[#003393] transition-colors group-hover:underline">READ →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link href="/lab" className="font-mono tracking-[0.18em] text-[#003393] hover:underline uppercase" style={{ fontSize: "var(--fs-label)" }}>
            GEO(LLMO) LAB をすべて見る →
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Ascent Strengths Section
───────────────────────────────────────────── */
function AscentStrengthsSection() {
  return (
    <section className="bg-[#FAFAF7] border-t border-b border-black/[0.08] py-12 lg:py-16">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            <span style={{ fontSize: "28px", color: "#FFB81C" }}>✦</span> <span style={{ color: "#003393", backgroundImage: "linear-gradient(120deg, #fef08a 0%, #fef08a 100%)", backgroundPosition: "0 80%", backgroundRepeat: "repeat-x", backgroundSize: "100% 40%", paddingBottom: "4px" }}>Ascent GEO</span>が選ばれる理由 <span style={{ fontSize: "28px", color: "#FFB81C" }}>✦</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "20年以上のWebマーケティング、SEO 分野での実績",
              desc: "20年間、国内外の大手企業、中堅企業のSEO、サイト流入分析、サイトパフォーマンス分析を実施した専門性と経験を保有",
              evidenceImage: "/evidence-1.png",
            },
            {
              title: "15億件の検索ビッグデータを保有",
              desc: "検索経路、検索の理由、生活文脈(CEP)、AIOクエリなど、Googleの検索データ15億件以上を保有。圧倒的なデータ量と技術力で実データに基づく検索行動分析が可能",
              evidenceImage: "/evidence-2.png",
            },
            {
              title: "特許基盤のGEO・LLMO設計フレームワーク",
              desc: "Google・Microsoftの特許分析を通じて、推測ではなく、正確な根拠に基づいた顧客支援を実現",
              evidenceImage: "/evidence-3.png",
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg bg-white overflow-hidden border border-black/[0.06] shadow-lg shadow-black/[0.08]">
              {/* Evidence Image */}
              <div className="w-full h-[240px] relative">
                {item.evidenceImage && (
                  <Image
                    src={item.evidenceImage}
                    alt={item.title}
                    fill
                    className="object-contain bg-gray-50"
                  />
                )}
              </div>

              {/* Divider */}
              <hr className="border-black/[0.06]" />

              {/* Content */}
              <div className="p-6">
                <h4 className="font-bold text-[#0B0B0E] mb-3 leading-snug" style={{ fontSize: "var(--fs-h4)" }}>
                  {item.title}
                </h4>
                <p className="text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Award Logos */}
        <div className="mt-16 flex justify-center items-center gap-12">
          <div className="flex flex-col items-center">
            <Image
              src="/red-herring-logo.png"
              alt="Red Herring"
              width={90}
              height={62}
              className="h-auto w-auto"
            />
            <p className="mt-3 text-center text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>
              RED HERRING グローバル<br />TOP 100 技術企業として選定
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/jma-logo.jpg"
              alt="JMA"
              width={90}
              height={90}
              className="h-auto w-auto"
            />
            <p className="mt-3 text-center text-[#4e4e51] leading-[1.6]" style={{ fontSize: "var(--fs-body-xsm)" }}>
              公益社団法人<br />日本マーケティング協会会員社
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Final CTA Section
───────────────────────────────────────────── */
function FinalCtaSection() {
  return (
    <section
      className="relative py-10 lg:py-20 overflow-hidden"
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
            <span className="text-marker-highlight">AI検索で選ばれるための</span><br />一歩を、ここから。
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-label)" }}
            >
              <Link href="/watcher">GEO Watcherを見る →</Link>
            </Button>
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-label)" }}
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

          {/* Reviews */}
          <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                {
                  name: "EC運営担当者",
                  role: "化粧品・自社EC",
                  review: "GEO Watcherは、主要な計測機能をツール内で利用でき、苦手だったプロンプト設計だけを、1回単位で依頼できました。毎月の追加費用が発生しないため、社内でも説明しやすく、導入までスムーズに進められました。",
                  image: voice1Image,
                  rating: 5,
                },
                {
                  name: "広報・マーケティング担当者",
                  role: "地方製造業",
                  review: "GEO Watcherは、検索データやビッグデータを長年扱ってきた企業が開発しているため、計測データの信頼性にも安心感がありました。複数のAIにおける自社と競合の変化を、継続的に確認できる点も、社内で導入を決める後押しになりました。",
                  image: voice2Image,
                  rating: 5,
                },
                {
                  name: "マーケティングマネージャー",
                  role: "BtoB SaaS企業",
                  review: "GEO Watcherに切り替えてからは、毎日のデータで言及率や引用URLの変化を追えるため、施策後の反応を早い段階で確認できます。複数のAIの回答原文やグラフもまとめて共有でき、社内報告の根拠として使いやすくなりました。",
                  image: voice3Image,
                  rating: 5,
                },
              ].map((reviewer) => (
                <div key={reviewer.name} className="rounded-lg bg-white p-4 flex gap-4">
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
                    <p className="mb-2 text-[14px] leading-[1.5] text-[#4e4e51]">
                      {reviewer.review}
                    </p>
                    <div className="border-t border-[#e0e0e0] pt-2">
                      <p className="font-bold text-[#0B0B0E] leading-[1.2]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                        {reviewer.name}
                      </p>
                      <p className="text-[#999] leading-[1.2]" style={{ fontSize: "var(--fs-label-xs)" }}>
                        {reviewer.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full max-w-[560px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Page Root
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ChallengesSection />
      <SolutionsSection />
      <AscentStrengthsSection />
      <FinalCtaSection />
      <GeoLabSection />
    </div>
  );
}
