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

export const metadata: Metadata = buildPageMetadata({
  title: "GEO・AIO・LLMOによるAI検索最適化 | Ascent GEO",
  description:
    "GEO・AIO・LLMOによるAI検索最適化を支援。特許分析と検索データに基づく戦略設計から、AI検索でのブランドプレゼンスを継続的に可視化・改善するモニタリングツール「GEO Watcher」まで、株式会社 Ascent Networksが提供します。",
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
          <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#1452FF]/4 rounded-full blur-[120px] pointer-events-none" />
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
            企業のGEO・LLMO対策を支援
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            GEO・LLMOの<br />
            <span className="text-blue-gradient">診断</span>と<span className="text-blue-gradient">モニタリング</span><br />
            ツール
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            Ascent GEOは、見込み顧客の課題を可視化するエージェンシー向けの「GEO診断レポートツール」と、自社・競合の変化を継続的に追う「GEO Watcher（GEO・LLMOモニタリングツール）」を提供します。現状把握から提案、改善、効果検証まで、目的に合わせたGEO・LLMO対策を支援します。
          </p>
          <div className="mt-10 grid grid-cols-1 max-w-[360px]">
            <CalendarBookingButton />
            {/* 資料準備後に復活予定:
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
            */}
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
   Watcher / Shindan Intro Section
───────────────────────────────────────────── */
function WatcherShindanSection() {
  const cards = [
    {
      title: "モニタリングツール",
      subtitle: "GEO Watcher",
      desc: "主要AIエンジンを横断して、自社・競合のAI検索上での露出、言及、引用状況を継続的にモニタリング。デイリーモニタリング／7つのAIモデル／20社の競合分析に対応。",
      href: "/watcher",
    },
    {
      title: "診断ツール",
      subtitle: "GEO(LLMO) 診断",
      desc: "自社ブランドと競合のAI検索上での露出状況を診断し、GEO/LLMO対策の出発点を明らかにします。",
      href: "/shindan",
    },
  ];

  return (
    <section className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="MONITORING & DIAGNOSIS" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            現状を<span className="text-blue-gradient">可視化</span>し、<br />
            継続的に<span className="text-blue-gradient">追う</span>。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 flex flex-col card-hover group"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#1452FF] mb-2 uppercase">{c.subtitle}</p>
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{c.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] flex-1 font-[inherit]">{c.desc}</p>
              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href={c.href}>詳しく見る →</Link>
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
    <section id="lab" className="bg-[#FAFAF7] pt-12 pb-10">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="GEO(LLMO) LAB" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              AI検索時代の<span className="text-blue-gradient">リサーチハブ</span>。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              特許分析・実データ検証・引用構造の研究。GEO(LLMO) Lab は実務に効くリサーチを発信します。
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
                        <p className="card-desc text-[#9A9AA0]">{article.desc}</p>
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
              <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]">
                <ArticleThumbnail variant={a.thumbVariant} eyebrow={a.tag} className="h-[140px] w-full" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[#6B6B73]">
                    <span className="text-[#1452FF]">{a.tag}</span>
                    <span>2026.{a.date}</span>
                  </div>
                  <h3 className="mb-2 flex-none text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0B0B0E]">{a.title}</h3>
                  <p className="card-desc mb-4 flex-1 text-[#6B6B73]">{a.desc}</p>
                  <div className="flex items-center justify-between border-t border-[#E6E4DD] pt-3 font-mono text-[10px] tracking-[0.1em] text-[#9A9AA0]">
                    <span>{a.readTime}</span>
                    <span className="text-[#1452FF] transition-colors group-hover:underline">READ →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link href="/lab" className="font-mono text-[11px] tracking-[0.18em] text-[#1452FF] hover:underline uppercase">
            GEO(LLMO) LAB をすべて見る →
          </Link>
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
      <WatcherShindanSection />
      <GeoLabSection />
      <SeoGeoCTASection />
    </div>
  );
}
