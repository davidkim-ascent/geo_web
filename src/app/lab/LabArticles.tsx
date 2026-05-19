"use client";

import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";

const POSTS = [
  { cat: "GEO / LLMO", date: "2026.05.19", read: "8 min", t: "GEO/LLMO対策におすすめの会社7選を徹底比較", d: "GEO対策会社7社を4つの型で比較し、費用相場・選び方・FAQまで整理した比較記事。", href: "/lab/geo-llmo-company", thumbVariant: "geo-llmo-company" as const },
  { cat: "SEO vs GEO", date: "2026.05.13", read: "8 min", t: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較", d: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。", href: "/lab/seo-geo", thumbVariant: "seo-geo" as const },
  { cat: "ブランド戦略", date: "2026.05.18", read: "10 min", t: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ", d: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。", href: "/lab/brand-cep", thumbVariant: "brand-cep" as const },
  { cat: "INDUSTRY REPORT", date: "2026.05.19", read: "8 min", t: "業界別AIトラフィックレポート 2026 Q2 — Adobeレポート", d: "1兆件超の訪問データが示す変化。リテール+393%、旅行+233%など業界別AI訪問増加率と、コンバージョン・エンゲージメントへの影響をグラフで報告。", href: "/lab/adobe-ai-traffic", thumbVariant: "adobe-ai-traffic" as const },
  { cat: "TECHNICAL GEO", date: "2026.05.19", read: "7 min", t: "AIエージェントはウェブサイトをどう見るのか — 3つの方法とセマンティックHTMLの重要性", d: "画面画像・構造読み取り・組み合わせの3方式を解説。セマンティックHTML・ラベル設計・SSRの実装ポイントまで、AI対応サイト設計の基本を整理します。", href: "/lab/ai-agent-site", thumbVariant: "ai-agent-site" as const },
];

function PostCard({ p, large = false }: { p: (typeof POSTS)[number]; large?: boolean }) {
  const card = (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]">
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
        <p className={`mb-4 flex-1 leading-[1.55] text-[#6B6B73] ${large ? "text-[14px]" : "text-[13px]"}`}>{p.d}</p>
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
  const gridPosts = POSTS.slice(2);

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
