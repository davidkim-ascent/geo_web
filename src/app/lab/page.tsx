import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { LabArticles } from "./LabArticles";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO Lab | AI検索リサーチハブ - 株式会社 Ascent Networks",
  description:
    "AI検索時代に引用される知識を、実データに基づき分析。特許・消費者インテント・GEO戦略など、Ascent GEO Labで体系的に学べます。",
  path: "/lab",
});

export const dynamic = "force-static";

const featuredSide = [
  {
    cat: "ブランド戦略",
    title: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ",
    desc: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。",
    meta: "2026.05.18 · 10 MIN",
    thumbVariant: "brand-cep" as const,
    href: "/lab/brand-cep",
  },
  {
    cat: "SEO vs GEO",
    title: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較",
    desc: "SEOは検索エンジン、GEOは生成AI。比較表と実践原則で違いを整理した記事。",
    meta: "2026.05.13 · 8 MIN",
    thumbVariant: "seo-geo" as const,
    href: "/lab/seo-geo",
  },
];

export default function LabPage() {
  return (
    <div className="bg-[#FAFAF7]">
      {/* Hero */}
      <section
        className="hero-fixed relative py-12 lg:py-16"
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
              <HeroLogoMark />
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
            <Link href="/lab/seo-geo" className="block">
              <article className="relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#0B0B0E] text-[#FAFAF7] transition-opacity hover:opacity-90">
                <ArticleThumbnail
                  variant="seo-geo"
                  eyebrow="FEATURED RESEARCH · SEO / GEO"
                  className="h-[240px] w-full"
                />
                <div className="relative z-10 flex flex-1 flex-col justify-between p-10 lg:p-14">
                  <div>
                    <div className="mb-6 font-mono text-[11px] tracking-[0.18em] text-[#1452FF]">
                      FEATURED · 2026.04.12
                    </div>
                    <h3
                      className="max-w-[18ch] tracking-[-0.025em] leading-[1.1]"
                      style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
                    >
                      SEOとGEOは何が違うのか？
                      <em className="text-[#1452FF] not-italic">検索最適化と生成AI最適化を比較</em>
                    </h3>
                    <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-[#9A9AA0]">
                      SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表を用いてわかりやすく解説します。
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-6 border-t border-white/[0.12] pt-6 font-mono text-[11px] tracking-[0.12em] text-[#9A9AA0]">
                    <span>Ascent Research · GEO LAB</span>
                    <span className="text-[#FAFAF7]">READ · 8 MIN →</span>
                  </div>
                </div>
              </article>
            </Link>

            {/* Side items */}
            <div className="grid gap-4">
              {featuredSide.map((item, i) => (
                <Link key={i} href={item.href} className="block">
                  <article className="group cursor-pointer overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#F2F0EA] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF]">
                    <ArticleThumbnail variant={item.thumbVariant} eyebrow={item.cat} className="h-[176px] w-full" />
                    <div className="p-6">
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
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles list with filter */}
      <LabArticles />

      {/* CTA */}
      <SeoGeoCTASection />
    </div>
  );
}
