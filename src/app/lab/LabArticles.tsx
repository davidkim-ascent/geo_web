"use client";

import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";

const POSTS = [
  { cat: "HOW TO / GEO Watcher", date: "2026.08.18", read: "9 min", t: "自社でできる！GEO Watcherを使った具体的なGEO・LLMO対策プロセスを解説", d: "GEO Watcherを使ったGEO・LLMO対策の実践プロセスを紹介。現状分析、モニタリング、プロンプト設計、コンテンツ改善の進め方を解説します。", href: "/lab/geo-watcher-process", thumbVariant: "geo-watcher-process" as const },
  { cat: "GEO / LLMO", date: "2026.05.19", read: "8 min", t: "GEO/LLMO対策におすすめの会社7選を徹底比較", d: "GEO対策会社7社を4つの型で比較し、費用相場・選び方・FAQまで整理した比較記事。", href: "/lab/geo-llmo-company", thumbVariant: "geo-llmo-company" as const },
  { cat: "SEO vs GEO", date: "2026.05.13", read: "8 min", t: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較", d: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。", href: "/lab/seo-geo", thumbVariant: "seo-geo" as const },
  { cat: "COMPARE", date: "2026.08.20", read: "5 min", t: "ChatGPT最適化とGoogle SEOは何が違うのか", d: "Google SEOとChatGPT最適化（AEO/GEO）は、ユーザー行動も施策の単位も異なる。両者の違いと、両立させるための統合戦略を解説する。", href: "/lab/chatgpt-vs-google-seo", thumbVariant: "chatgpt-vs-google-seo" as const },
  { cat: "GEO / LLMO", date: "2026.08.20", read: "7 min", t: "ChatGPT・Perplexity・Geminiはブランドをどう違って引用・推薦するのか", d: "同じ質問を投げても推薦されるブランドはAIごとに異なる。モデル別の引用方式の違いと、GEO Watcherを使った追跡方法を解説する。", href: "/lab/ai-citation-comparison", thumbVariant: "ai-citation-comparison" as const },
  { cat: "EC / RETAIL", date: "2026.08.20", read: "6 min", t: "ECサイトのためのAEO・GEO最適化", d: "ユーザーがAIにショップや商品のおすすめを尋ねたとき、自社ブランドが回答に言及される可能性を高める取り組み。実務の優先順位まで解説する。", href: "/lab/ecommerce-aeo-geo", thumbVariant: "ecommerce-aeo-geo" as const },
  { cat: "ブランド戦略", date: "2026.05.18", read: "10 min", t: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ", d: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。", href: "/lab/brand-cep", thumbVariant: "brand-cep" as const },
  { cat: "LLMO / E-E-A-T", date: "2026.06.22", read: "9 min", t: "LLMOにおけるE-E-A-Tの重要性", d: "LLMOではE-E-A-TがAIに引用・推薦されるための信頼シグナルになる。Experience、Expertise、Authoritativeness、Trustworthinessを実務でどう設計するかを整理する。", href: "/lab/llmo-eeat", thumbVariant: "llmo-eeat" as const },
  { cat: "INDUSTRY REPORT", date: "2026.05.19", read: "8 min", t: "業界別AIトラフィックレポート 2026 Q1 — Adobeレポート", d: "1兆件超の訪問データが示す変化。リテール+393%、旅行+233%など業界別AI訪問増加率と、コンバージョン・エンゲージメントへの影響をグラフで報告。", href: "/lab/adobe-ai-traffic", thumbVariant: "adobe-ai-traffic" as const },
  { cat: "TECHNICAL GEO", date: "2026.05.19", read: "7 min", t: "AIエージェントはウェブサイトをどう見るのか — 3つの方法とセマンティックHTMLの重要性", d: "画面画像・構造読み取り・組み合わせの3方式を解説。セマンティックHTML・ラベル設計・SSRの実装ポイントまで、AI対応サイト設計の基本を整理します。", href: "/lab/ai-agent-site", thumbVariant: "ai-agent-site" as const },
  { cat: "AGENTIC COMMERCE", date: "2026.05.21", read: "10 min", t: "AIショッピングの登場とエージェンティックコマース", d: "AIが購買を代行する時代の全体像。自動化6段階・OpenAI/Google/Shopifyのプロトコル競争・エコシステム14領域まで体系的に解説。", href: "/lab/ai-shopping-agent", thumbVariant: "ai-shopping-agent" as const },
  { cat: "エンティティ / GEO・LLMO", date: "2026.06.24", read: "8 min", t: "エンティティとは？LLMOやGEOなどAI検索の重要性について解説", d: "エンティティを基礎知識から解説。AI検索に引用されるための仕組みやEEATとの関係、自社で可能な対策まで網羅。独自調査：5つのAIエンジンでブランド認識がどれだけ揃うかを検証。", href: "/lab/entity", thumbVariant: "entity" as const },
  { cat: "GEO / LLMO", date: "2026.07.01", read: "8 min", t: "AIに引用される記事の特徴とは？押さえるべき7つの特徴", d: "AIに引用されやすいコンテンツの特徴や設計ポイントを独自調査データ（52件の引用分析）を交えながら7つのポイントに絞って解説。", href: "/lab/ai-cited-article", thumbVariant: "ai-cited-article" as const },
];

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
