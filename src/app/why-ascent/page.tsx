import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";

export const metadata: Metadata = {
  title: "Why Ascent — GEO",
  description: "GEO は、推測ではなく設計の科学である。",
};

const pillars = [
  {
    num: "01",
    title: "特許ベースの GEO 解析",
    desc: "Google / Microsoft の検索特許を起点に、Passage Ranking や Intent Ranking の構造から GEO を逆算します。",
  },
  {
    num: "02",
    title: "実消費者インテント",
    desc: "検索質問の実データをもとに、想定ではなく「実際に問われている問い」から設計します。",
  },
  {
    num: "03",
    title: "Search Path Intelligence",
    desc: "一次検索だけでなく、後続質問の連鎖まで見て、引用される文脈を設計します。",
  },
  {
    num: "04",
    title: "Semantic GEO Framework",
    desc: "Embedding による意味的類似度で、質問とコンテンツの GAP を定量化します。",
  },
];

function HeroDecoration() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 32%, transparent 82%)",
        }}
      />
      <div className="absolute right-[3%] top-[-8%] w-[760px] h-[760px] rounded-full border border-[#1452FF]/20" />
      <div className="absolute right-[11%] top-[9%] w-[520px] h-[520px] rounded-full border border-[#1452FF]/18 border-dashed circle-spin" />
      <div className="absolute right-[-2%] top-[18%] w-[340px] h-[340px] rounded-full border border-[#1452FF]/30 border-dashed circle-spin-r" />
      <div className="absolute left-[-6%] bottom-[-12%] text-transparent select-none"
        style={{
          fontSize: "clamp(180px, 22vw, 320px)",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          lineHeight: 0.85,
        }}
      >
        GEO
      </div>
      <div className="absolute right-8 top-8 text-[10px] tracking-[0.18em] text-white/40 font-mono text-right">
        <div className="flex items-center gap-2 justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1452FF] shadow-[0_0_8px_#1452FF]" />
          <span>VISIBILITY · LIVE</span>
        </div>
        <div className="mt-1">CITATIONS +34 / WK</div>
        <div className="mt-1">AI TRAFFIC +22%</div>
      </div>
      <div className="absolute left-0 right-0 top-[44%] h-px bg-[#1452FF]/75 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
      <div className="absolute left-[12%] top-0 bottom-0 w-px bg-[#1452FF]/75 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
      <div className="absolute right-[14%] top-0 bottom-0 w-px bg-[#1452FF]/75 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
    </div>
  );
}

export default function WhyAscentPage() {
  return (
    <div className="bg-[#FAFAF7] text-[#0B0B0E]">
      <section className="relative overflow-hidden bg-[#0B0B0E] text-[#FAFAF7]">
        <HeroDecoration />
        <div className="relative max-w-[1280px] mx-auto px-10 pt-16 pb-14 lg:pt-20 lg:pb-16">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/45 mb-10">
            <Link href="/" className="text-white/45 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white">WHY ASCENT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-start">
            <div className="relative z-10">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
                <span className="pulse-dot" />
                Why Ascent
              </div>
              <h1
                className="font-bold tracking-[-0.035em] text-white"
                style={{ fontSize: "clamp(54px, 5.8vw, 88px)", lineHeight: 0.98 }}
              >
                GEO は、
                <span className="text-blue-gradient">推測</span>
                ではなく
                <br />
                設計の科学である。
              </h1>
              <p className="mt-7 text-[17px] lg:text-[18px] text-white/72 leading-[1.7] max-w-[54ch]">
                AI はどこから、なぜ引用するのか。Ascent は特許・実消費者インテント・Embedding 評価という 4 本の柱で、その問いに定量で答える GEO を構築します。
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <CalendarBookingButton />
                <Button asChild variant="ctaOutline">
                  <Link href="/whitepaper">サービス資料をダウンロード</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10 lg:pt-4">
              <div className="max-w-[620px] ml-auto lg:mr-0">
                <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.num} className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 min-h-[150px]">
                <div className="font-mono text-[10px] tracking-[0.22em] text-[#1452FF] mb-4">{pillar.num}</div>
                <h2 className="text-[20px] font-bold leading-tight text-white mb-3">{pillar.title}</h2>
                <p className="text-[15px] leading-[1.65] text-white/65">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
