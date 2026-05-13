"use client";

import { useState } from "react";

const POSTS = [
  { cat: "検索の変化", date: "2026.04.12", read: "8 min", t: "AI Overview が変えた、検索結果ページの3秒間", d: "Google AI Overview の登場で、検索結果ページ上部に何が起きているか。クリック率の変動と、引用される側の条件を、12 業種のデータから分析する。" },
  { cat: "SEO vs GEO", date: "2026.04.05", read: "6 min", t: "SEO と GEO は、何が決定的に違うのか", d: "「キーワード」と「質問」、「ランク」と「引用」。両者を貫く違いを、検索エンジンの内部構造から整理し、移行戦略を提示する。" },
  { cat: "AI 検索構造", date: "2026.03.28", read: "12 min", t: "Gemini が引用する記事に、共通する 7 つの構造", d: "Gemini API の出力 1,200 件を分析。引用元として選ばれる記事に、なぜ FAQ Schema、Passage 構造、Authority Signal が共通して見つかるのか。" },
  { cat: "GEO Writing", date: "2026.03.21", read: "9 min", t: "Passage Optimization の実装ガイド", d: "段落単位で抜き出される時代の、執筆ルール。質問形ヘッダー、200 字単位の自己完結、Citation 密度。具体例つきで解説する。" },
  { cat: "KPI", date: "2026.03.14", read: "7 min", t: "AI Visibility は何で測るか — 5 つの指標", d: "従来の SEO では捕捉できない、AI 検索の効果。Brand Visibility / Citation Rate / AI Traffic / Share of Voice / Recency の 5 軸を提案する。" },
  { cat: "AI 検索構造", date: "2026.03.07", read: "10 min", t: "ChatGPT の Web 検索は、何をしているのか", d: "OpenAI の特許出願文書から逆算する、ChatGPT Search の内部処理。クエリ展開、再ランク、引用選択の 3 ステップを解説。" },
  { cat: "検索の変化", date: "2026.02.28", read: "5 min", t: "AI Commerce — 購入導線の根本的変化", d: "比較・検討・購入が、AI との対話の中で完結する時代。EC サイトの GEO 対応で、まず手をつけるべき 3 領域を整理。" },
  { cat: "GEO Writing", date: "2026.02.21", read: "11 min", t: "良い構造 vs 悪い構造 — Before/After 12 例", d: "実際のクライアント記事から、構造改善前後の Citation 率を比較。何が引用される/されないかが、構造で決まる。" },
  { cat: "KPI", date: "2026.02.14", read: "6 min", t: "GA4 で AI Traffic を計測する 3 つの方法", d: "AI 検索からの流入を、GA4 の標準機能と UTM 設計で識別する手順。Slack 連携の自動化サンプルつき。" },
];

const CATS = ["ALL", "検索の変化", "SEO vs GEO", "AI 検索構造", "GEO Writing", "KPI"];

export function LabArticles() {
  const [cat, setCat] = useState("ALL");

  const filtered = POSTS.filter((p) => cat === "ALL" || p.cat === cat);

  return (
    <section className="px-0 pb-16 pt-6">
      <div className="mx-auto max-w-[1280px] px-10">
        {/* Category bar */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E4DD] pb-4">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] transition-all ${
                  cat === c
                    ? "border-[#0B0B0E] bg-[#0B0B0E] text-[#FAFAF7]"
                    : "border-[#E6E4DD] bg-[#FAFAF7] text-[#6B6B73] hover:border-[#0B0B0E] hover:text-[#0B0B0E]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <article
              key={i}
              className="group flex cursor-pointer flex-col rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1452FF] hover:shadow-[0_12px_32px_-16px_rgba(20,82,255,0.2)]"
            >
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
