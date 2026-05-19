"use client";

import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";

const POSTS = [
  { cat: "SEO vs GEO", date: "2026.05.13", read: "8 min", t: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較", d: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。", href: "/lab/seo-geo", thumbVariant: "seo-geo" as const },
  { cat: "ブランド戦略", date: "2026.05.18", read: "10 min", t: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ", d: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。", href: "/lab/brand-cep", thumbVariant: "brand-cep" as const },
  { cat: "SEO vs GEO", date: "2026.04.05", read: "6 min", t: "SEO と GEO は、何が決定的に違うのか", d: "「キーワード」と「質問」、「ランク」と「引用」。両者を貫く違いを、検索エンジンの内部構造から整理し、移行戦略を提示する。", href: null, thumbVariant: "abstract" as const },
];

export function LabArticles() {
  return (
    <section className="px-0 pb-16 pt-6">
      <div className="mx-auto max-w-[1280px] px-10">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => {
            const card = (
              <article
                key={i}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]"
              >
                <ArticleThumbnail variant={p.thumbVariant} eyebrow={p.cat} className="h-[190px] w-full" />
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-[#6B6B73]">
                    <span className="text-[#1452FF]">{p.cat}</span>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="mb-3 flex-none text-[22px] font-bold leading-[1.25] tracking-[-0.015em]">
                    {p.t}
                  </h3>
                  <p className="mb-6 flex-1 text-[14px] leading-[1.55] text-[#6B6B73]">{p.d}</p>
                  <div className="flex items-center justify-between border-t border-[#E6E4DD] pt-4 font-mono text-[11px] tracking-[0.1em] text-[#9A9AA0]">
                    <span>{p.read}</span>
                    <span className="text-[#1452FF] transition-colors group-hover:underline">READ →</span>
                  </div>
                </div>
              </article>
            );
            return p.href ? (
              <Link key={i} href={p.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
