"use client";

import Image from "next/image";
import seoGeoImage from "@/app/lab/seo-geo/seo-geo.png";
import geoLlmoCompanyImage from "@/app/lab/geo-llmo-company/company-comparison.png";
import aiAgentSiteImage from "@/app/lab/ai-agent-site/ai-agent-site.png";
import aiShoppingImage from "@/app/lab/ai-shopping-agent/ai-shopping.png";
import geoLlmoToolsImage from "@/app/lab/geo-llmo-tools/hero-collage.png";
import { TypingPromptCard } from "@/app/lab/brand-cep/TypingPromptCard";

type ArticleThumbnailVariant = "seo-geo" | "brand-cep" | "geo-llmo-company" | "adobe-ai-traffic" | "ai-agent-site" | "ai-shopping-agent" | "llmo-eeat" | "entity" | "ai-cited-article" | "geo-watcher-process" | "chatgpt-vs-google-seo" | "ai-citation-comparison" | "ecommerce-aeo-geo" | "geo-llmo-tools" | "abstract";

type ArticleThumbnailProps = {
  variant: ArticleThumbnailVariant;
  className?: string;
  eyebrow?: string;
};

const IMAGE_BY_VARIANT: Record<Exclude<ArticleThumbnailVariant, "abstract" | "adobe-ai-traffic" | "brand-cep" | "llmo-eeat" | "entity" | "ai-cited-article" | "geo-watcher-process" | "chatgpt-vs-google-seo" | "ai-citation-comparison" | "ecommerce-aeo-geo">, typeof seoGeoImage> = {
  "seo-geo": seoGeoImage,
  "geo-llmo-company": geoLlmoCompanyImage,
  "ai-agent-site": aiAgentSiteImage,
  "ai-shopping-agent": aiShoppingImage,
  "geo-llmo-tools": geoLlmoToolsImage,
};

const labelByVariant: Record<ArticleThumbnailVariant, string> = {
  "seo-geo": "SEO / GEO",
  "brand-cep": "BRAND × CEP",
  "geo-llmo-company": "GEO / LLMO",
  "adobe-ai-traffic": "INDUSTRY REPORT",
  "ai-agent-site": "TECHNICAL GEO",
  "ai-shopping-agent": "AGENTIC COMMERCE",
  "llmo-eeat": "LLMO / E-E-A-T",
  entity: "エンティティ / GEO・LLMO",
  "ai-cited-article": "GEO / LLMO",
  "geo-watcher-process": "GEO Watcher",
  "chatgpt-vs-google-seo": "COMPARE",
  "ai-citation-comparison": "GEO / LLMO",
  "ecommerce-aeo-geo": "EC / RETAIL",
  "geo-llmo-tools": "GEO / LLMO TOOLS",
  abstract: "RESEARCH NOTE",
};

export function ArticleThumbnail({ variant, className = "", eyebrow }: ArticleThumbnailProps) {
  const label = eyebrow ?? labelByVariant[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] bg-[#0B0B0E] ${className}`}
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(20,82,255,0.18), transparent 28%), radial-gradient(circle at 82% 28%, rgba(255,255,255,0.09), transparent 26%), linear-gradient(135deg, rgba(11,11,14,0.98) 0%, rgba(11,11,14,0.84) 45%, rgba(20,82,255,0.16) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {variant === "brand-cep" ? (
        <div className="absolute inset-0 overflow-hidden" style={{ transform: "scale(0.72)", transformOrigin: "top left", width: "139%", pointerEvents: "none" }}>
          <TypingPromptCard />
        </div>
      ) : variant === "adobe-ai-traffic" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(20,82,255,0.22),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_30%)]" />
          <div className="absolute inset-0 flex items-end justify-start p-5 gap-1.5 items-end">
            {[63, 84, 158, 233, 393].map((v, i) => (
              <div
                key={i}
                className="rounded-sm bg-[#1452FF] opacity-80"
                style={{
                  width: "16%",
                  height: `${20 + (v / 393) * 60}%`,
                  opacity: 0.4 + i * 0.12,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-white/[0.06]" style={{ fontSize: "clamp(52px, 6vw, 90px)", lineHeight: 1, letterSpacing: "-0.06em" }}>
              AI
            </span>
          </div>
        </>
      ) : variant === "llmo-eeat" ? (
        <>
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_28%,rgba(20,82,255,0.26),transparent_24%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_50%_78%,rgba(20,82,255,0.16),transparent_28%)]"
          />
          <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-white/72 uppercase backdrop-blur-[2px]">
            TRUST SIGNAL
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className="font-bold text-white"
                style={{
                  fontSize: "clamp(34px, 4.7vw, 66px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                E - E - A - T
              </div>
              <div
                className="mt-2 font-mono text-[10px] tracking-[0.32em] text-white/55 uppercase"
              >
                LLMO
              </div>
            </div>
          </div>
        </>
      ) : variant === "entity" ? (
        <>
          {/* warm cream background */}
          <div className="absolute inset-0" style={{ background: "#F2E8C8" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 520 260" width="92%" height="92%" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
              {/* ── LEFT: dense knowledge graph ── */}
              {/* edges */}
              <g stroke="#1B2A4A" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
                {/* red cluster top */}
                <line x1="120" y1="28" x2="88" y2="68" />
                <line x1="120" y1="28" x2="148" y2="68" />
                <line x1="88" y1="68" x2="148" y2="68" />
                <line x1="88" y1="68" x2="108" y2="104" />
                <line x1="148" y1="68" x2="108" y2="104" />
                <line x1="120" y1="28" x2="108" y2="104" />
                {/* red → purple bridge */}
                <line x1="148" y1="68" x2="188" y2="72" />
                {/* red → teal bridge */}
                <line x1="108" y1="104" x2="120" y2="148" />
                <line x1="88" y1="68" x2="56" y2="148" />
                {/* orange nodes */}
                <line x1="32" y1="180" x2="56" y2="148" />
                <line x1="32" y1="180" x2="68" y2="208" />
                <line x1="56" y1="148" x2="68" y2="208" />
                {/* teal cluster bottom */}
                <line x1="120" y1="148" x2="152" y2="168" />
                <line x1="120" y1="148" x2="140" y2="208" />
                <line x1="152" y1="168" x2="180" y2="148" />
                <line x1="152" y1="168" x2="168" y2="210" />
                <line x1="180" y1="148" x2="168" y2="210" />
                <line x1="180" y1="148" x2="200" y2="185" />
                <line x1="168" y1="210" x2="200" y2="185" />
                <line x1="140" y1="208" x2="168" y2="210" />
                <line x1="140" y1="208" x2="120" y2="148" />
                <line x1="68" y1="208" x2="120" y2="148" />
              </g>
              {/* red nodes */}
              <circle cx="120" cy="28" r="11" fill="#E8706A" stroke="#fff" strokeWidth="2" />
              <circle cx="88" cy="68" r="11" fill="#E8706A" stroke="#fff" strokeWidth="2" />
              <circle cx="148" cy="68" r="11" fill="#E8706A" stroke="#fff" strokeWidth="2" />
              <circle cx="108" cy="104" r="11" fill="#E8706A" stroke="#fff" strokeWidth="2" />
              {/* purple node */}
              <circle cx="188" cy="72" r="10" fill="#9B8EC4" stroke="#fff" strokeWidth="2" />
              {/* orange nodes */}
              <circle cx="56" cy="148" r="10" fill="#E8A84A" stroke="#fff" strokeWidth="2" />
              <circle cx="32" cy="180" r="10" fill="#E8A84A" stroke="#fff" strokeWidth="2" />
              <circle cx="68" cy="208" r="10" fill="#E8A84A" stroke="#fff" strokeWidth="2" />
              {/* teal nodes */}
              <circle cx="120" cy="148" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />
              <circle cx="152" cy="168" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />
              <circle cx="180" cy="148" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />
              <circle cx="140" cy="208" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />
              <circle cx="168" cy="210" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />
              <circle cx="200" cy="185" r="11" fill="#4BBFB0" stroke="#fff" strokeWidth="2" />

              {/* ── ARROW ── */}
              <line x1="238" y1="130" x2="278" y2="130" stroke="#1B2A4A" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" />
              <polygon points="278,124 290,130 278,136" fill="#1B2A4A" opacity="0.7" />

              {/* ── RIGHT: simplified entity graph ── */}
              <g stroke="#1B2A4A" strokeWidth="2" strokeLinecap="round" opacity="0.85">
                <line x1="360" y1="80" x2="330" y2="175" />
                <line x1="360" y1="80" x2="460" y2="170" />
                <line x1="330" y1="175" x2="460" y2="170" />
                <line x1="360" y1="80" x2="420" y2="68" />
              </g>
              {/* red node — 5 */}
              <circle cx="360" cy="80" r="28" fill="#E8706A" stroke="#fff" strokeWidth="2.5" />
              <text x="360" y="87" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="sans-serif">5</text>
              {/* purple node */}
              <circle cx="420" cy="68" r="18" fill="#9B8EC4" stroke="#fff" strokeWidth="2" />
              {/* orange node — 3 */}
              <circle cx="330" cy="175" r="24" fill="#E8A84A" stroke="#fff" strokeWidth="2.5" />
              <text x="330" y="182" textAnchor="middle" fill="white" fontSize="20" fontWeight="700" fontFamily="sans-serif">3</text>
              {/* teal node — 6 */}
              <circle cx="460" cy="170" r="28" fill="#4BBFB0" stroke="#fff" strokeWidth="2.5" />
              <text x="460" y="177" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="sans-serif">6</text>
            </svg>
          </div>
        </>
      ) : variant === "ai-cited-article" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(20,82,255,0.28),transparent_38%),radial-gradient(circle_at_80%_72%,rgba(20,82,255,0.14),transparent_32%)]" />
          {/* 大きな "7" */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-bold text-white select-none"
              style={{ fontSize: "clamp(100px, 14vw, 160px)", lineHeight: 1, letterSpacing: "-0.06em", opacity: 0.12 }}
            >
              7
            </span>
          </div>
          {/* 7つのタグを縦に並べる */}
          <div className="absolute inset-0 flex items-center justify-end pr-6">
            <div className="flex flex-col gap-[5px]">
              {[
                "結論ファースト",
                "パッセージ設計",
                "一次データ",
                "FAQ構造",
                "見出し網羅性",
                "セマンティックHTML",
                "根拠・出典",
              ].map((label, i) => (
                <div
                  key={i}
                  className="rounded-full px-3 py-[3px] font-mono text-[9px] tracking-[0.08em] text-white/80"
                  style={{
                    background: i < 2 ? "rgba(20,82,255,0.55)" : "rgba(255,255,255,0.07)",
                    border: `1px solid ${i < 2 ? "rgba(20,82,255,0.7)" : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} {label}
                </div>
              ))}
            </div>
          </div>
          {/* 左下ラベル */}
          <div className="absolute left-5 bottom-5 font-bold text-white/90" style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
            AI引用<br />
            <span className="text-[#1452FF]">7つの特徴</span>
          </div>
        </>
      ) : variant === "geo-watcher-process" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,82,255,0.26),transparent_36%),radial-gradient(circle_at_82%_78%,rgba(20,82,255,0.14),transparent_32%)]" />
          <div className="absolute left-6 top-1/2 h-20 w-20 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/25 sm:h-24 sm:w-24">
            <Image src="/design-assets/avatars/avatar-a-curious.png" alt="質問者" width={96} height={96} className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-6 top-1/2 h-20 w-20 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/25 sm:h-24 sm:w-24">
            <Image src="/design-assets/avatars/avatar-s-explaining.png" alt="島田" width={96} height={96} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center px-28 text-center sm:px-32">
            <p className="font-bold text-white" style={{ fontSize: "clamp(25px, 3.1vw, 33px)", lineHeight: 1.4, letterSpacing: "-0.02em" }}>
              自社でできる！GEO Watcherを使った<br />
              <span className="text-[#1452FF]">具体的なGEO・LLMO対策プロセス</span>
            </p>
          </div>
        </>
      ) : variant === "chatgpt-vs-google-seo" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(20,82,255,0.24),transparent_38%),radial-gradient(circle_at_82%_75%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center gap-8 px-6">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">Google</span>
              <span className="font-bold text-white" style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}>SEO</span>
            </div>
            <span className="font-bold text-[#1452FF]" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>vs</span>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-[#1452FF]/40 bg-[#1452FF]/10 px-6 py-5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#1452FF] uppercase">ChatGPT</span>
              <span className="font-bold text-white" style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}>最適化</span>
            </div>
          </div>
        </>
      ) : variant === "ai-citation-comparison" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(20,82,255,0.24),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center gap-5 px-6">
            {["ChatGPT", "Perplexity", "Gemini"].map((name, i) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-5"
                style={{ opacity: 0.5 + i * 0.25 }}
              >
                <span className="h-2 w-2 rounded-full bg-[#1452FF]" />
                <span className="whitespace-nowrap font-bold text-white" style={{ fontSize: "13px" }}>{name}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-6 bottom-5 font-bold text-white/90" style={{ fontSize: "clamp(20px, 2.8vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.03em" }}>
            モデルごとに異なる<br />
            <span className="text-[#1452FF]">ブランド引用</span>
          </div>
        </>
      ) : variant === "ecommerce-aeo-geo" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(20,82,255,0.22),transparent_34%),radial-gradient(circle_at_22%_78%,rgba(255,255,255,0.07),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-bold text-white/10 select-none"
              style={{ fontSize: "clamp(90px, 11vw, 140px)", lineHeight: 1, letterSpacing: "-0.05em" }}
            >
              EC
            </span>
          </div>
          <div className="absolute left-6 bottom-5 font-bold text-white/90" style={{ fontSize: "clamp(20px, 2.8vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.03em" }}>
            ECサイトのための<br />
            <span className="text-[#1452FF]">AEO・GEO最適化</span>
          </div>
        </>
      ) : variant === "abstract" ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_30%_72%,rgba(20,82,255,0.18),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-bold text-white/8"
              style={{
                fontSize: "clamp(72px, 8vw, 118px)",
                lineHeight: 1,
                letterSpacing: "-0.06em",
              }}
            >
              GEO
            </span>
          </div>
        </>
      ) : (
        <Image
          src={IMAGE_BY_VARIANT[variant]}
          alt={label}
          fill
          className="object-cover object-center opacity-90 brightness-[0.82] contrast-[1.04] saturate-[1.06]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,14,0) 0%, rgba(11,11,14,0.04) 45%, rgba(11,11,14,0.62) 100%)",
        }}
      />
      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase backdrop-blur-[2px]">
        {label}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0B0B0E]/70 to-transparent" />
    </div>
  );
}
