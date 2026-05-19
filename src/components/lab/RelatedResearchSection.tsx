"use client";

import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";

type RelatedResearchSectionProps = {
  currentSlug: "brand-cep" | "seo-geo" | "geo-llmo-company";
};

const POSTS = [
  {
    slug: "seo-geo",
    cat: "SEO vs GEO",
    date: "2026.05.13",
    read: "6 MIN",
    title: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較",
    desc: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。",
    thumbVariant: "seo-geo" as const,
    href: "/lab/seo-geo",
  },
  {
    slug: "brand-cep",
    cat: "GEO Writing",
    date: "2026.05.18",
    read: "9 MIN",
    title: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ",
    desc: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEPの占有へ移行している。GEO戦略の核心を解説する。",
    thumbVariant: "brand-cep" as const,
    href: "/lab/brand-cep",
  },
  {
    slug: "geo-llmo-company",
    cat: "GEO / LLMO",
    date: "2026.05.19",
    read: "8 MIN",
    title: "GEO/LLMO対策におすすめの会社7選を徹底比較",
    desc: "GEO対策会社7社を4つの型で比較し、費用相場・選び方・FAQまで整理した比較記事。",
    thumbVariant: "geo-llmo-company" as const,
    href: "/lab/geo-llmo-company",
  },
] as const;

export function RelatedResearchSection({ currentSlug }: RelatedResearchSectionProps) {
  const items = POSTS.filter((post) => post.slug !== currentSlug).slice(0, 3);

  return (
    <section className="border-t border-[#E6E4DD] bg-[#F2F0EA] py-[88px]">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-10">
        <div className="mb-9 flex items-baseline justify-between gap-6">
          <h2 className="tracking-[-0.025em]" style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}>
            関連記事
          </h2>
          <Link href="/lab" className="font-mono text-[11px] tracking-[0.16em] text-[#1452FF] hover:underline">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((post) => (
            <Link key={post.slug} href={post.href} className="block">
              <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]">
                <ArticleThumbnail variant={post.thumbVariant} eyebrow={post.cat} className="h-[190px] w-full" />
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-[#6B6B73]">
                    <span className="text-[#1452FF]">{post.cat}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mb-3 flex-none text-[22px] font-bold leading-[1.25] tracking-[-0.015em]">
                    {post.title}
                  </h3>
                  <p className="mb-6 flex-1 text-[14px] leading-[1.55] text-[#6B6B73]">{post.desc}</p>
                  <div className="flex items-center justify-between border-t border-[#E6E4DD] pt-4 font-mono text-[11px] tracking-[0.1em] text-[#9A9AA0]">
                    <span>{post.read}</span>
                    <span className="text-[#1452FF] transition-colors group-hover:underline">READ →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
