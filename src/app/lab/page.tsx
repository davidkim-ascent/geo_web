import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTASection } from "@/components/layout/CTASection";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { LabArticles } from "./LabArticles";

export const metadata: Metadata = {
  title: "GEO Lab — Ascent",
  description: "検索の変化、SEO と GEO の差、AI が引用する条件、GEO Writing の実装、KPI の測り方。Ascent が日々のクライアントワークから抽出した知見を、リサーチノートとして公開する。",
};

export const dynamic = "force-static";

const featuredSide = [
  {
    cat: "SEO vs GEO",
    title: "SEO と GEO は、何が決定的に違うのか",
    desc: "キーワードと質問、ランクと引用。両者を貫く違いを構造から。",
    meta: "2026.04.05 · 6 MIN",
  },
  {
    cat: "AI 検索構造",
    title: "Gemini が引用する記事に、共通する 7 つの構造",
    desc: "Gemini API の出力 1,200 件を分析した実証レポート。",
    meta: "2026.03.28 · 12 MIN",
  },
  {
    cat: "GEO Writing",
    title: "Passage Optimization の実装ガイド",
    desc: "段落単位で抜き出される時代の、執筆ルール。",
    meta: "2026.03.21 · 9 MIN",
  },
];

export default function LabPage() {
  return (
    <div className="bg-[#FAFAF7]">
      {/* Hero */}
      <section
        className="hero-fixed relative overflow-hidden py-12 lg:py-16"
        style={{
          background: "var(--hero-gradient)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#1452FF]/[0.08] blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="arc-spin"
            style={{ position: "absolute", width: 1100, height: 1100, right: -480, top: -260, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "50%" }}
          />
          <div style={{ position: "absolute", width: 720, height: 720, right: -200, top: 40, border: "1px solid rgba(20,82,255,0.18)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: 360, height: 360, right: 40, top: 200, border: "1px dashed rgba(20,82,255,0.32)", borderRadius: "50%" }} />
          <div
            style={{
              position: "absolute", left: -40, bottom: -40,
              fontFamily: "'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif",
              fontWeight: 800, fontSize: "clamp(180px, 22vw, 320px)",
              letterSpacing: "-0.06em", color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              lineHeight: 0.85, userSelect: "none", whiteSpace: "nowrap",
            }}
          >
            LAB.
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scan 8s ease-in-out -2s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 11s ease-in-out -1s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 13s ease-in-out -5s infinite" }} />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.18fr_1fr] lg:gap-16">
            <div className="relative z-10 pt-8">
              <div className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO LAB
              </div>
              <h1
                className="font-bold text-white"
                style={{ fontSize: "clamp(44px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em", wordBreak: "keep-all" }}
              >
                <span className="block">AI 検索時代の、</span>
                <span className="block text-[#1452FF]">リサーチハブ。</span>
              </h1>
              <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.75] text-white/[0.68]">
                検索の変化、SEO と GEO の差、AI が引用する条件、GEO Writing の実装、KPI の測り方。Ascent が日々のクライアントワークから抽出した知見を、リサーチノートとして公開する。
              </p>
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[640px]">
                <CalendarBookingButton />
                <Button asChild variant="ctaOutline">
                  <Link href="/whitepaper">サービス資料をダウンロード</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
                <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-0 pb-16 pt-[100px]">
        <div className="mx-auto max-w-[1280px] px-10">
          <div className="mb-6 font-mono text-[12px] tracking-[0.18em] text-[#6B6B73] uppercase">
            [ 01 ] FEATURED RESEARCH
          </div>
          <h2 className="mb-12 max-w-[22ch] tracking-[-0.03em] leading-[1.05]">
            今月、もっとも読まれている。
          </h2>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Main featured */}
            <Link href="/lab/ai-overview" className="block">
            <article className="relative flex min-h-[420px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-[#0B0B0E] p-14 text-[#FAFAF7] transition-opacity hover:opacity-90">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: "radial-gradient(ellipse at 80% 20%, black 30%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <div className="mb-6 font-mono text-[11px] tracking-[0.18em] text-[#1452FF]">
                  FEATURED · 2026.04.12
                </div>
                <span className="font-mono text-[11px] tracking-[0.16em] text-[#9A9AA0]">
                  検索の変化
                </span>
                <h3
                  className="mt-4 mb-5 max-w-[18ch] tracking-[-0.025em] leading-[1.1]"
                  style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
                >
                  AI Overview が変えた、
                  <em className="text-[#1452FF] not-italic">検索結果ページの 3 秒間</em>
                </h3>
                <p className="max-w-[52ch] text-[16px] leading-[1.65] text-[#9A9AA0]">
                  Google AI Overview の登場で、検索結果ページ上部に何が起きているか。クリック率の変動と、引用される側の条件を、12 業種・1,400 ページのデータから分析する。AI 検索時代の新しい「ファーストビュー」とは何か。
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-center gap-6 border-t border-white/[0.12] pt-6 font-mono text-[11px] tracking-[0.12em] text-[#9A9AA0]">
                <span>RYO TANAKA · GEO RESEARCHER</span>
                <span className="text-[#FAFAF7]">READ · 8 MIN →</span>
              </div>
            </article>
            </Link>

            {/* Side items */}
            <div className="grid gap-4">
              {featuredSide.map((item, i) => (
                <article
                  key={i}
                  className="cursor-pointer rounded-xl border border-[#E6E4DD] bg-[#F2F0EA] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF]"
                >
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#1452FF]">
                    {item.cat}
                  </span>
                  <h4 className="mt-2 mb-2 text-[18px] font-bold leading-[1.3] tracking-[-0.01em]">
                    {item.title}
                  </h4>
                  <p className="text-[13px] leading-[1.5] text-[#6B6B73]">{item.desc}</p>
                  <div className="mt-3.5 font-mono text-[10px] tracking-[0.12em] text-[#9A9AA0]">
                    {item.meta}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles list with filter */}
      <LabArticles />

      {/* CTA */}
      <CTASection
        kicker="CONTACT — START WITH A FREE AUDIT"
        title={
          <>
            AI 検索で、
            <br />
            あなたのブランドは
            <br />
            <span className="text-blue-gradient">何回引用されている</span>か？
          </>
        }
        description="まずは無料診断で、現在の AI Visibility と Citation 構造を可視化します。所要 30 分のオンライン MTG から。"
        primaryButton={{ href: "/contact", label: "相談する" }}
        secondaryButtons={[
          { href: "/whitepaper", label: "サービス資料をダウンロード" },
          { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）" },
        ]}
      />
    </div>
  );
}
