"use client";

import Image from "next/image";
import seoGeoImage from "@/app/lab/seo-geo/seo-geo.png";
import geoLlmoCompanyImage from "@/app/lab/geo-llmo-company/company-comparison.png";
import aiAgentSiteImage from "@/app/lab/ai-agent-site/ai-agent-site.png";
import { TypingPromptCard } from "@/app/lab/brand-cep/TypingPromptCard";

type ArticleThumbnailVariant = "seo-geo" | "brand-cep" | "geo-llmo-company" | "adobe-ai-traffic" | "ai-agent-site" | "abstract";

type ArticleThumbnailProps = {
  variant: ArticleThumbnailVariant;
  className?: string;
  eyebrow?: string;
};

const IMAGE_BY_VARIANT: Record<Exclude<ArticleThumbnailVariant, "abstract" | "adobe-ai-traffic" | "brand-cep">, typeof seoGeoImage> = {
  "seo-geo": seoGeoImage,
  "geo-llmo-company": geoLlmoCompanyImage,
  "ai-agent-site": aiAgentSiteImage,
};

const labelByVariant: Record<ArticleThumbnailVariant, string> = {
  "seo-geo": "SEO / GEO",
  "brand-cep": "BRAND × CEP",
  "geo-llmo-company": "GEO / LLMO",
  "adobe-ai-traffic": "INDUSTRY REPORT",
  "ai-agent-site": "TECHNICAL GEO",
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
