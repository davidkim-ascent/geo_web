"use client";

import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { LAB_ARTICLES as POSTS } from "@/lib/lab-articles";

function PostCard({ p, large = false }: { p: (typeof POSTS)[number]; large?: boolean }) {
  const card = (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FDFDFB] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]">
      <ArticleThumbnail
        variant={p.thumbVariant}
        eyebrow={p.cat}
        className={`w-full ${large ? "h-[280px]" : "h-[120px]"}`}
      />
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-[#6B6B73]">
          <span className="text-[#1452FF]">{p.cat}</span>
          <span>{p.date}</span>
        </div>
        <h3 className={`mb-2 flex-none font-bold leading-[1.25] tracking-[-0.015em] ${large ? "text-[24px]" : "text-[17px]"}`}>
          {p.t}
        </h3>
        <p className="card-desc mb-4 flex-1 text-[#6B6B73]">{p.d}</p>
        <div className="flex items-center justify-between border-t border-[#E6E4DD] pt-4 font-mono text-[11px] tracking-[0.1em] text-[#9A9AA0]">
          <span>{p.read}</span>
          <span className="text-[#1452FF] transition-colors group-hover:underline">READ →</span>
        </div>
      </div>
    </article>
  );

  return p.href ? (
    <Link href={p.href} className="flex h-full flex-col">
      {card}
    </Link>
  ) : (
    <div className="flex h-full flex-col">{card}</div>
  );
}

export function LabArticles() {
  const featuredHrefs = new Set(POSTS.slice(0, 3).map((p) => p.href));
  const gridPosts = POSTS
    .filter((p) => !featuredHrefs.has(p.href))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (gridPosts.length === 0) return null;

  return (
    <section className="px-0 pb-16 pt-6">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((p, i) => (
            <PostCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
