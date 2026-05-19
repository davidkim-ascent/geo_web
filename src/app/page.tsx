import Link from "next/link";
import type { Metadata } from "next";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
import { SplitSection } from "@/components/layout/SplitSection";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import dynamicImport from "next/dynamic";

const ContactForm = dynamicImport(
  () => import("@/components/contact/ContactForm").then((mod) => mod.ContactForm),
  { ssr: true }
);

const FrameworkSection = dynamicImport(() => import("@/components/home/FrameworkSection"), {
  ssr: true,
});

export const metadata: Metadata = buildPageMetadata({
  title: "Ascent GEO・LLMO（アセント GEO・LLMO）- 株式会社 Ascent Networks",
  description:
    "推測ではなく、データと特許に基づくGEO戦略。特許分析と実消費者インテントに基づくGEO戦略を、Ascentが設計します。",
  path: "/",
});

export const dynamic = "force-static";

/* ─────────────────────────────────────────────
   Section Label (공통 컴포넌트)
───────────────────────────────────────────── */
function SectionLabel({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className={`ui-section-label-title ${dark ? "ui-section-label-title-dark" : ""}`}>{title}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <SplitSection
      sectionClassName="hero-fixed relative py-12 lg:py-16"
      sectionStyle={{
        background: "var(--hero-gradient)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      background={
        <>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#1452FF]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="arc-spin"
              style={{
                position: "absolute",
                width: 1100,
                height: 1100,
                right: -480,
                top: -260,
                border: "1px dashed rgba(255,255,255,0.08)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 720,
                height: 720,
                right: -200,
                top: 40,
                border: "1px solid rgba(20,82,255,0.18)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 360,
                height: 360,
                right: 40,
                top: 200,
                border: "1px dashed rgba(20,82,255,0.32)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -40,
                bottom: -40,
                fontFamily: "'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(180px, 22vw, 320px)",
                letterSpacing: "-0.06em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                lineHeight: 0.85,
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              GEO.
            </div>
            <div
              style={{
                position: "absolute",
                right: 32,
                top: 28,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.42)",
                display: "grid",
                gap: 4,
                textAlign: "right",
              }}
            >
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#1452FF",
                    boxShadow: "0 0 8px #1452FF",
                    alignSelf: "center",
                  }}
                />
                <span>LIVE · AI VISIBILITY INDEX</span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <span>ChatGPT</span><span style={{ color: "rgba(255,255,255,0.7)" }}>78%</span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <span>Gemini</span><span style={{ color: "rgba(255,255,255,0.7)" }}>64%</span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <span>Perplexity</span><span style={{ color: "rgba(255,255,255,0.7)" }}>51%</span>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <span>Copilot</span><span style={{ color: "rgba(255,255,255,0.7)" }}>42%</span>
              </div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
            <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scan 8s ease-in-out -2s infinite" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 11s ease-in-out -1s infinite" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 13s ease-in-out -5s infinite" }} />
          </div>
        </>
      }
      containerClassName="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      rightClassName=""
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GENERATIVE ENGINE OPTIMIZATION
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            推測ではなく、<br />
            データと特許に基づく<br />
            <span className="text-blue-gradient">AI検索時代</span>のブランド<br />
            戦略。
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            Google・Microsoft の特許分析、リスニングマインドの実消費者インテント、文脈・意図ベースでの評価。GEO は推測ゲームではない。Ascent は根拠のあるフレームワークで設計する。
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
            <CalendarBookingButton />
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
          </div>
          <HeroLogoMark />
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

/* ─────────────────────────────────────────────
   Search Shift Section
───────────────────────────────────────────── */
function SearchShiftSection() {
  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="AI 検索の地殻変動" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2 className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}>
            ページリンクから「答え」へ。検索の仕組みが根本から書き変わる。
          </h2>
            <p className="mt-4 text-[17px] text-[#4e4e51] max-w-[52ch] leading-[1.6] font-[inherit]">
            検索の主戦場は、Google結果画面からAIの回答へ。AIに&quot;引用される&quot;ことが、ブランドの新しい露出指標になる。
          </p>
        </div>

        {/* Era comparison */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEO時代 */}
          <div className="bg-white border border-black/[0.07] rounded-2xl p-7 card-hover">
            <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3">SEO時代</h3>
            <p className="text-[16px] text-[#4e4e51] leading-[1.6] mb-5 font-[inherit]">
              リンクとキーワードを軸に、SERPの上位を競った時代。
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag-light">LINK GRAPH</span>
              <span className="tag-light">KEYWORD</span>
            </div>
          </div>

          {/* AI Answer時代 */}
          <div className="rounded-2xl p-7 card-hover-dark relative overflow-hidden" style={{ background: "radial-gradient(#0b2260, #0a0a12 70%)", border: "1px solid #7ab6ff12" }}>
            <div className="absolute top-0 right-0 w-[160px] h-[160px] rounded-full blur-[60px] pointer-events-none" style={{ background: "radial-gradient(circle, #0070f330, transparent 65%)" }} />
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: "#0070f315", color: "#7ab6ff60" }}>→</div>
            <h3 className="text-[19px] font-bold text-[#FAFAF7] mb-3">AI Answer時代</h3>
            <p className="text-[16px] text-[#d3d3d8] leading-[1.6] mb-5">
              回答エンジンが直接回答する。AIに引用されることこそが、露出。
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag-blue">CITATION</span>
              <span className="tag-dark">PASSAGE</span>
              <span className="tag-dark">AI COMMERCE</span>
            </div>
          </div>
        </div>

        {/* Chart cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fig 01 — SERP decline */}
          <div className="rounded-2xl p-6 card-hover overflow-hidden relative" style={{ background: "radial-gradient(120% 100% at 50% 0, #0e1b3e 0%, #050b22 45%, #02050f 80%, #010108 100%)", border: "1px solid rgba(122,182,255,0.08)" }}>
            <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full blur-[70px] pointer-events-none" style={{ background: "radial-gradient(circle, #cd2e3a 0%, #cd2e3a33 32%, transparent 64%)" }} />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-semibold text-white leading-snug max-w-[200px]">SERP クリック率の継続的減少</h3>
              <div className="text-right">
                <div className="text-[26px] font-bold mono" style={{ background: "linear-gradient(135deg, #ff5c73, #cd2e3a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>−28%</div>
                <div className="text-[10px] font-['JetBrains_Mono',monospace] tracking-[0.1em]" style={{ color: "#ff5c7399" }}>3YR TREND</div>
              </div>
            </div>
            <div className="relative h-[108px] mt-2">
              <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="redAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cd2e3a33" />
                    <stop offset="60%" stopColor="#cd2e3a0d" />
                    <stop offset="100%" stopColor="#cd2e3a00" />
                  </linearGradient>
                  <linearGradient id="redLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff5c73" />
                    <stop offset="100%" stopColor="#cd2e3a" />
                  </linearGradient>
                  <filter id="redGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <line x1="0" y1="22" x2="400" y2="22" stroke="#7ab6ff0a" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="55" x2="400" y2="55" stroke="#7ab6ff0a" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M0,8 C40,10 80,18 120,28 C160,38 200,48 240,56 C280,64 320,70 360,76 L400,80 L400,90 L0,90 Z" fill="url(#redAreaGrad)" />
                <path d="M0,8 C40,10 80,18 120,28 C160,38 200,48 240,56 C280,64 320,70 360,76 L400,80" fill="none" stroke="#cd2e3a40" strokeWidth="4" strokeLinecap="round" />
                <path d="M0,8 C40,10 80,18 120,28 C160,38 200,48 240,56 C280,64 320,70 360,76 L400,80" fill="none" stroke="url(#redLineGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#redGlow)" />
                <circle cx="0" cy="8" r="3.5" fill="#ff5c73" opacity="0.9" />
                <circle cx="133" cy="30" r="3" fill="#ff5c73" opacity="0.7" />
                <circle cx="266" cy="58" r="3" fill="#cd2e3a" opacity="0.8" />
                <circle cx="400" cy="80" r="4" fill="#cd2e3a">
                  <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[2px]">
                <span className="font-['JetBrains_Mono',monospace] text-[10px]" style={{ color: "#7ab6ff40" }}>2020</span>
                <span className="font-['JetBrains_Mono',monospace] text-[10px]" style={{ color: "#7ab6ff40" }}>2026</span>
              </div>
            </div>
          </div>

          {/* Fig 02 — AI growth */}
          <div className="rounded-2xl p-6 card-hover-dark overflow-hidden relative" style={{ background: "radial-gradient(120% 100% at 50% 0, #0b2260 0%, #061540 35%, #020818 65%, #000 100%)", border: "1px solid rgba(122,182,255,0.12)" }}>
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[70px] pointer-events-none" style={{ background: "radial-gradient(circle, #0070f3 0%, #0070f366 32%, transparent 64%)" }} />
            <div className="absolute bottom-0 left-0 w-[160px] h-[160px] rounded-full blur-[60px] pointer-events-none" style={{ background: "radial-gradient(circle, #3d7eff 0%, #3d7eff2e 32%, transparent 64%)" }} />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-semibold leading-snug max-w-[200px]" style={{ color: "#fff" }}>AI 回答エンジン利用の指数的成長</h3>
              <div className="text-right">
                <div className="text-[26px] font-bold mono" style={{ background: "linear-gradient(135deg, #7ab6ff, #0070f3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>+240%</div>
                <div className="text-[10px] font-['JetBrains_Mono',monospace] tracking-[0.1em]" style={{ color: "#7ab6ff99" }}>YoY GROWTH</div>
              </div>
            </div>
            <div className="relative h-[108px] mt-2">
              <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7ab6ff38" />
                    <stop offset="50%" stopColor="#0070f31a" />
                    <stop offset="100%" stopColor="#0070f300" />
                  </linearGradient>
                  <linearGradient id="blueLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0070f3" />
                    <stop offset="100%" stopColor="#7ab6ff" />
                  </linearGradient>
                  <filter id="blueGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <line x1="0" y1="22" x2="400" y2="22" stroke="#7ab6ff0d" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="55" x2="400" y2="55" stroke="#7ab6ff0d" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M0,82 C60,80 120,78 180,72 C220,68 260,58 300,42 C330,28 360,14 400,4 L400,90 L0,90 Z" fill="url(#blueAreaGrad)" />
                <path d="M0,82 C60,80 120,78 180,72 C220,68 260,58 300,42 C330,28 360,14 400,4" fill="none" stroke="#7ab6ff2e" strokeWidth="5" strokeLinecap="round" />
                <path d="M0,82 C60,80 120,78 180,72 C220,68 260,58 300,42 C330,28 360,14 400,4" fill="none" stroke="url(#blueLineGrad)" strokeWidth="2" strokeLinecap="round" filter="url(#blueGlow)" />
                <circle cx="0" cy="82" r="3" fill="#0070f3" opacity="0.7" />
                <circle cx="133" cy="74" r="3" fill="#3d7eff" opacity="0.8" />
                <circle cx="266" cy="46" r="3" fill="#5c8dff" opacity="0.9" />
                <circle cx="400" cy="4" r="4.5" fill="#7ab6ff">
                  <animate attributeName="r" values="4.5;7;4.5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="4" r="4.5" fill="none" stroke="#7ab6ff" strokeWidth="1">
                  <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[2px]">
                <span className="font-['JetBrains_Mono',monospace] text-[10px]" style={{ color: "#7ab6ff40" }}>2023</span>
                <span className="font-['JetBrains_Mono',monospace] text-[10px]" style={{ color: "#7ab6ff40" }}>2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Why Ascent Section
───────────────────────────────────────────── */
function WhyAscentSection() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      title: "特許ベースの GEO 分析",
      desc: "Google / Microsoft の検索特許を解析し、Passage Ranking や Intent Ranking など内部メカニズムから GEO を逆算します。",
      href: "/why-ascent",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      title: "リスニングマインド消費者インテント",
      desc: "実消費者の検索質問データを基盤に、想定ではなく「実際に問われている問い」から戦略を組み立てます。",
      href: "/why-ascent",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      title: "検索経路探索",
      desc: "「最初の検索」だけで終わらず、そこから生まれた疑問や調べ直したルートを可視化します。",
      href: "/why-ascent",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="20" cy="12" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="4" cy="12" r="2" />
        </svg>
      ),
      title: "GEO Framework",
      desc: "Embedding による意味的類似度で、質問とコンテンツの GAP を10点モデルで定量評価します。",
      href: "/framework",
    },
  ];

  return (
    <section id="why" className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="WHY ASCENT" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              なぜ Ascent の<br />
              GEO は<span className="text-blue-gradient">違う</span>のか。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              4 本の柱が、AI 検索の中で「なぜ引用されるのか」を定量で説明します。
            </p>
          </div>
        </div>

        {/* 4 pillar cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-6 flex flex-col card-hover group"
            >
              <div className="w-[52px] h-[52px] rounded-xl border border-black/[0.08] flex items-center justify-center text-[#0B0B0E] mb-5 group-hover:border-[#1452FF]/30 group-hover:text-[#1452FF] transition-colors">
                {p.icon}
              </div>
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{p.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] flex-1 font-[inherit]">{p.desc}</p>
              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href={p.href}>詳しく見る →</Link>
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
   Services Section
───────────────────────────────────────────── */
function ServicesSection() {
  const services = [
    {
      title: "質問クラスター抽出",
      href: "/services",
      desc: "CDJ 5 段階 × 検索量 × 文脈データから、ブランドが応答すべき質問群をデータ基盤で導出。",
      bullets: ["CDJ 5 段階分類", "検索量による優先度化", "cluster・path 文脈結合"],
      visual: (
        <div className="relative rounded-xl p-4 text-left flex-1 flex flex-col justify-center overflow-hidden" style={{ background: "radial-gradient(#112030, #0a0a12 70%)", border: "1px solid #7ab6ff0a" }}>
          <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full blur-[50px] pointer-events-none" style={{ background: "radial-gradient(circle, #0070f340, transparent 60%)" }} />
          <div className="mono text-[9px] tracking-[0.14em] mb-3 flex items-center gap-1.5" style={{ color: "#7ab6ff" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7ab6ff", boxShadow: "0 0 6px #7ab6ff" }} />
            QUESTION CLUSTER
          </div>
          {[
            { label: "初期探索", val: "202,333", w: "100%", color: "linear-gradient(90deg, #0070f3, #7ab6ff)" },
            { label: "情報探索", val: "19,303",  w: "58%",  color: "linear-gradient(90deg, #0070f3, #5c8dff)" },
            { label: "経験探索", val: "8,283",   w: "40%",  color: "linear-gradient(90deg, #0070f3, #3d7eff)" },
            { label: "購買確定", val: "4,120",   w: "28%",  color: "linear-gradient(90deg, #1547ad, #0070f3)" },
            { label: "購買以後", val: "2,104",   w: "18%",  color: "linear-gradient(90deg, #0b2260, #1547ad)" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] w-[52px] flex-shrink-0" style={{ color: "#7ab6ff60" }}>{row.label}</span>
              <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: "#7ab6ff0a" }}>
                <div className="h-[6px] rounded-full" style={{ width: row.w, background: row.color }} />
              </div>
              <span className="mono text-[10px]" style={{ color: "#7ab6ff50" }}>{row.val}</span>
            </div>
          ))}
          <div className="mt-3 rounded-lg p-2.5" style={{ background: "linear-gradient(90deg, #0070f32e, #0070f305)", border: "1px solid #3d7eff2e" }}>
            <div className="mono text-[9px] mb-1 flex items-center gap-1" style={{ color: "#7ab6ff" }}>
              <span className="w-1 h-1 rounded-full" style={{ background: "#7ab6ff" }} />
              FINAL CLUSTER
            </div>
            <div className="text-[11px] leading-snug" style={{ color: "#ffffff99" }}>
              &quot;免許なしで上り坂通勤に使える補助金対象の電動自転車は？&quot;
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "GAP分析",
      href: "/services",
      desc: "質問とコンテンツの間にある意味的ギャップを発見。",
      bullets: ["質問 ↔ コンテンツ GAP", "10点評価", "Cluster Mapping"],
      visual: (
        <div className="relative rounded-xl p-4 flex-1 flex flex-col overflow-hidden" style={{ background: "radial-gradient(#161a30, #0a0a12 70%)", border: "1px solid #7ab6ff0d" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 60%, #0070f31f, transparent 65%)" }} />
          <div className="mono text-[10px] tracking-[0.14em] mb-3 flex items-center gap-1.5" style={{ color: "#7ab6ff" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7ab6ff", boxShadow: "0 0 6px #7ab6ff" }} />
            SEMANTIC SCORE
          </div>
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="relative w-[120px] h-[120px]">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <defs>
                  <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0070f3" />
                    <stop offset="100%" stopColor="#7ab6ff" />
                  </linearGradient>
                  <filter id="donutGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7ab6ff0d" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#0070f31a" strokeWidth="9"
                  strokeDasharray={`${2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7ab6ff2e" strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.84} ${2 * Math.PI * 42}`}
                  strokeLinecap="round" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#donutGrad)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.84} ${2 * Math.PI * 42}`}
                  strokeLinecap="round" filter="url(#donutGlow)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold" style={{ background: "linear-gradient(135deg, #fff, #7ab6ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>8.4</span>
                <span className="text-[11px]" style={{ color: "#7ab6ff60" }}>/ 12.0</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#7ab6ff0a" }}>
              <div className="h-full rounded-full" style={{ width: "70%", background: "linear-gradient(90deg, #0070f3, #7ab6ff)" }} />
            </div>
            <span className="mono text-[9px]" style={{ color: "#7ab6ff40" }}>GAP: 30%</span>
          </div>
        </div>
      ),
    },
    {
      title: "GEO コンテンツ制作",
      href: "/services",
      desc: "AI に「引用される」構造を設計するライティング。",
      bullets: ["Passage 最適化", "FAQ / Schema 設計", "GEO Writing"],
      visual: (
        <div className="relative rounded-xl p-4 flex-1 flex flex-col justify-center overflow-hidden" style={{ background: "radial-gradient(#122430, #0a0a12 70%)", border: "1px solid #7ab6ff0a" }}>
          <div className="absolute bottom-0 left-0 w-[130px] h-[80px] blur-[40px] pointer-events-none" style={{ background: "radial-gradient(circle, #3d7eff2e, transparent 60%)" }} />
          <div className="mono text-[9px] tracking-[0.14em] mb-3 flex items-center gap-1.5" style={{ color: "#7ab6ff" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7ab6ff", boxShadow: "0 0 6px #7ab6ff" }} />
            PASSAGE STRUCTURE
          </div>
          {[
            { label: "Lead Passage", w: "90%", score: "9.2", color: "linear-gradient(90deg, #0070f3, #7ab6ff)" },
            { label: "Support 1",    w: "70%", score: "7.1", color: "linear-gradient(90deg, #0070f3, #5c8dff)" },
            { label: "Support 2",    w: "55%", score: "5.5", color: "linear-gradient(90deg, #1547ad, #3d7eff)" },
            { label: "FAQ Block",    w: "80%", score: "8.0", color: "linear-gradient(90deg, #0070f3, #3d7eff)" },
          ].map((row) => (
            <div key={row.label} className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-[9px]" style={{ color: "#7ab6ff60" }}>{row.label}</span>
                <span className="mono text-[9px]" style={{ color: "#7ab6ff40" }}>{row.score}</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#7ab6ff08" }}>
                <div className="h-full rounded-full" style={{ width: row.w, background: row.color }} />
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center gap-1.5 rounded-md px-2.5 py-1.5" style={{ background: "linear-gradient(90deg, #0070f32e, #0070f305)", border: "1px solid #3d7eff2e" }}>
            <span className="w-1 h-1 rounded-full" style={{ background: "#7ab6ff" }} />
            <span className="text-[9px] mono tracking-[0.08em]" style={{ color: "#7ab6ff" }}>AI CITATION READY</span>
          </div>
        </div>
      ),
    },
    {
      title: "GEO モニタリング",
      href: "/services",
      desc: "可視性・引用・トラフィックを継続トラッキング。",
      bullets: ["Brand Visibility", "Citation Tracking", "AI Traffic 分析"],
      visual: (
        <div className="relative rounded-xl p-4 flex-1 flex flex-col justify-center overflow-hidden" style={{ background: "radial-gradient(#0b2260, #0a0a12 70%)", border: "1px solid #7ab6ff0d" }}>
          <div className="absolute top-0 right-0 w-[100px] h-[100px] blur-[45px] pointer-events-none" style={{ background: "radial-gradient(circle, #0070f340, transparent 60%)" }} />
          <div className="mono text-[9px] tracking-[0.14em] mb-3 flex items-center gap-1.5" style={{ color: "#7ab6ff" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7ab6ff", boxShadow: "0 0 6px #7ab6ff" }} />
            CITATION TREND
          </div>
          <div className="flex items-end gap-[3px] h-[68px]">
            {[20, 28, 22, 35, 30, 42, 38, 55, 50, 68, 62, 80].map((v, i) => {
              const isRecent = i >= 9;
              const isLatest = i === 11;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${v}%`,
                    background: isLatest
                      ? "linear-gradient(180deg, #7ab6ff, #0070f3)"
                      : isRecent
                      ? "linear-gradient(180deg, #3d7eff, #0070f3)"
                      : `#7ab6ff${Math.round((0.04 + i * 0.004) * 255).toString(16).padStart(2, "0")}`,
                    boxShadow: isLatest ? "0 0 8px #7ab6ff50" : isRecent ? "0 0 4px #0070f340" : "none",
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5 pt-1.5" style={{ borderTop: "1px solid #7ab6ff08" }}>
            {["JAN", "FEB", "MAR"].map((m) => (
              <span key={m} className="mono text-[9px]" style={{ color: "#7ab6ff30" }}>{m}</span>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="mono text-[9px]" style={{ color: "#7ab6ff30" }}>12-week window</span>
            <span className="mono text-[9px]" style={{ color: "#7ab6ff" }}>↑ +60% MoM</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="SERVICES" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            質問 → 分析 → 制作 → モニタリング。
            <span className="text-blue-gradient"> フルスタック</span>で提供。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 card-hover group flex flex-col"
            >
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-2">{svc.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] mb-4 font-[inherit]">{svc.desc}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[15px] text-[#4e4e51] font-[inherit]">
                    <span className="w-4 h-[1px] bg-[#1452FF]" />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Visual — flex-1로 나머지 공간 채움 */}
              <div className="flex-1 flex flex-col">{svc.visual}</div>
              <div className="mt-5">
                <Button asChild variant="detail">
                  <Link href={svc.href}>詳しく見る →</Link>
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
    <section id="lab" className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="GEO LAB" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              AI 検索時代の <span className="text-blue-gradient">リサーチハブ</span>。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              特許分析・実データ検証・引用構造の研究。GEO Lab は実務に効くリサーチを発信します。
            </p>
          </div>
        </div>

        {/* Article cards */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* 왼쪽: 큰 카드 50% */}
          <Link href={articles[0].href ?? "/lab"} className="block w-full lg:w-1/2">
            <div className="bg-[#0B0B0E] rounded-2xl overflow-hidden card-hover-dark group h-full flex flex-col">
              <ArticleThumbnail
                variant={articles[0].thumbVariant}
                eyebrow={articles[0].tag}
                className="h-[260px] w-full"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[20px] font-bold text-[#FAFAF7] leading-snug mb-2">
                  {articles[0].title}
                </h3>
                <p className="text-[15px] text-[#d3d3d8] leading-[1.6] mb-4 flex-1">{articles[0].desc}</p>
                <div className="flex items-center gap-3 mono text-[11px] text-[#d3d3d8]">
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
                  className="bg-[#0B0B0E] rounded-2xl overflow-hidden card-hover-dark group flex h-full"
                >
                  <ArticleThumbnail
                    variant={article.thumbVariant}
                    eyebrow={article.tag}
                    className="h-full min-h-[160px] w-[160px] flex-shrink-0 rounded-none"
                  />
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-[17px] font-bold text-[#FAFAF7] leading-snug mb-2">{article.title}</h4>
                      {article.desc && (
                        <p className="text-[13px] leading-[1.55] text-[#9A9AA0]">{article.desc}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mono text-[11px] text-[#d3d3d8] mt-3">
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
      <SearchShiftSection />
      <WhyAscentSection />
      <FrameworkSection />
      <ServicesSection />
      <GeoLabSection />
      <SeoGeoCTASection />
    </div>
  );
}
