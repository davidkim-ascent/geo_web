"use client";

import Link from "next/link";
import { useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTASection } from "@/components/layout/CTASection";
import { SplitSection } from "@/components/layout/SplitSection";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";

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
      sectionClassName="relative bg-[#0B0B0E] overflow-hidden py-12 lg:py-16"
      sectionStyle={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
          <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#1452FF]/8 rounded-full blur-[100px] pointer-events-none" />
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
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)",
                boxShadow: "0 0 18px rgba(20,82,255,0.55)",
                opacity: 0.95,
                animation: "scan 6s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 4,
                background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)",
                boxShadow: "0 0 18px rgba(20,82,255,0.55)",
                opacity: 0.95,
                animation: "scanV 7s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 4,
                background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)",
                boxShadow: "0 0 18px rgba(20,82,255,0.55)",
                opacity: 0.95,
                animation: "scanV 9s ease-in-out -3.5s infinite",
              }}
            />
          </div>
        </>
      }
      containerClassName="relative max-w-[1280px] mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-[1.22fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      rightClassName="lg:pt-8"
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GENERATIVE ENGINE OPTIMIZATION
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "clamp(44px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em", wordBreak: "keep-all" }}
          >
            推測ではなく、<br />
            データと特許に基づく<br />
            <span className="text-blue-gradient">AI検索時代</span>のブランド<br />
            戦略。
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            Google・Microsoft の特許分析、リスニングマインドの実消費者インテント、Embeddingベースのセマンティック評価。GEO は推測ゲームではない。Ascent は根拠のあるフレームワークで設計する。
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
            <Button asChild variant="ctaOutline">
              <Link href="/contact">カレンダー予約（30分）</Link>
            </Button>
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
          </div>
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
   Search Shift Section
───────────────────────────────────────────── */
function SearchShiftSection() {
  return (
    <section className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionLabel title="AI 検索の地殻変動" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2 className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}>
            リンクから「答え」へ。検索のレイヤーが根本から書き換わる。
          </h2>
            <p className="mt-4 text-[17px] text-[#4e4e51] max-w-[52ch] leading-[1.6] font-[inherit]">
            検索の主戦場は SERP から AI Answer Engine へ。Citation がブランド露出の新しい単位になる。
          </p>
        </div>

        {/* Era comparison */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEO Era */}
          <div className="bg-white border border-black/[0.07] rounded-2xl p-7 card-hover">
            <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3">SEO Era</h3>
            <p className="text-[16px] text-[#4e4e51] leading-[1.6] mb-5 font-[inherit]">
              リンクとキーワードを軸に、SERPの上位を競った時代。
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag-light">LINK GRAPH</span>
              <span className="tag-light">KEYWORD</span>
            </div>
          </div>

          {/* AI Answer Era */}
          <div className="bg-[#0B0B0E] border border-white/[0.07] rounded-2xl p-7 card-hover-dark relative overflow-hidden">
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 text-xs">→</div>
            <h3 className="text-[19px] font-bold text-[#FAFAF7] mb-3">AI Answer Era</h3>
            <p className="text-[16px] text-[#d3d3d8] leading-[1.6] mb-5">
              回答エンジンが直接回答する。Citationこそが露出。
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag-blue">CITATION</span>
              <span className="tag-dark">PASSAGE</span>
              <span className="tag-dark">AI COMMERCE</span>
            </div>
          </div>
        </div>

        {/* Chart cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fig 01 */}
          <div className="bg-white border border-black/[0.07] rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[19px] font-semibold text-[#0B0B0E] mt-1">SERP クリック率の継続的減少</h3>
              </div>
              <div className="text-[24px] font-bold text-red-500 mono">−38%</div>
            </div>
            {/* Decline chart — line */}
            <div className="relative h-[100px] mt-2">
              <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(239,68,68,0.25)" />
                    <stop offset="100%" stopColor="rgba(239,68,68,0)" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d="M0,8 C40,10 80,18 120,28 C160,38 200,48 240,56 C280,64 320,70 360,76 L400,80 L400,90 L0,90 Z"
                  fill="url(#redGrad)"
                />
                {/* Line */}
                <path
                  d="M0,8 C40,10 80,18 120,28 C160,38 200,48 240,56 C280,64 320,70 360,76 L400,80"
                  fill="none"
                  stroke="rgba(239,68,68,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#d3d3d8]">2020</span>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#d3d3d8]">2026</span>
              </div>
            </div>
          </div>

          {/* Fig 02 */}
          <div className="bg-[#0B0B0E] border border-white/[0.07] rounded-2xl p-6 card-hover-dark">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[19px] font-semibold text-[#FAFAF7] mt-1">AI 回答エンジン利用の指数的成長</h3>
              </div>
              <div className="text-[24px] font-bold text-[#1452FF] mono">+412%</div>
            </div>
            {/* Growth chart — line */}
            <div className="relative h-[100px] mt-2">
              <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(20,82,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(20,82,255,0)" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d="M0,82 C60,80 120,78 180,72 C220,68 260,58 300,42 C330,28 360,14 400,4 L400,90 L0,90 Z"
                  fill="url(#blueGrad)"
                />
                {/* Line */}
                <path
                  d="M0,82 C60,80 120,78 180,72 C220,68 260,58 300,42 C330,28 360,14 400,4"
                  fill="none"
                  stroke="#1452FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* End dot */}
                <circle cx="400" cy="4" r="3" fill="#6B8FFF" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#d3d3d8]">2023</span>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[#d3d3d8]">2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Why Ascent Section
───────────────────────────────────────────── */
function WhyAscentSection() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      title: "特許ベースの GEO 分析",
      desc: "Google / Microsoft の検索特許を解析し、Passage Ranking や Intent Ranking など内部メカニズムから GEO を逆算します。",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      title: "リスニングマインド消費者インテント",
      desc: "実消費者の検索質問データを基盤に、想定ではなく「実際に問われている問い」から戦略を組み立てます。",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      title: "Search Path Intelligence",
      desc: "一次検索だけでなく、後続買問の連鎖を可視化。CDJベースで購買経路上の AI 露出をデザインします。",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="20" cy="12" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="4" cy="12" r="2" />
        </svg>
      ),
      title: "Semantic GEO Framework",
      desc: "Embedding による意味的類似度で、質問とコンテンツの GAP を 12 点モデルで定量評価します。",
    },
  ];

  return (
    <section id="why" className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionLabel title="WHY ASCENT" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              なぜ Ascent の<br />
              GEO は<span className="text-blue-gradient">違う</span>のか。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              4 本の柱が、AI 検索の中で「なぜ引用されるのか」を定量で説明します。
            </p>
          </div>
        </div>

        {/* 4 pillar cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-6 flex flex-col card-hover group"
            >
              <div className="w-[52px] h-[52px] rounded-xl border border-black/[0.08] flex items-center justify-center text-[#0B0B0E] mb-5 group-hover:border-[#1452FF]/30 group-hover:text-[#1452FF] transition-colors">
                {p.icon}
              </div>
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-3 leading-snug">{p.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] flex-1 font-[inherit]">{p.desc}</p>
              <div className="mt-6 pt-4 border-t border-black/[0.06]">
                <Button asChild variant="detail">
                  <Link href="#">詳しく見る →</Link>
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
   Framework (5-Step Loop)
───────────────────────────────────────────── */
function FrameworkSection() {
  const [active, setActive] = useState(0);

  const steps = [
    {
      id: "01",
      title: "Question Intelligence",
      sub: "CDJベースの質問生成 / Question Cluster",
    },
    {
      id: "02",
      title: "Semantic GAP 分析",
      sub: "12点評価モデル / Semantic Similarity",
    },
    {
      id: "03",
      title: "GEO コンテンツエンジニアリング",
      sub: "Passage Optimization / FAQ 構造",
    },
    {
      id: "04",
      title: "AI Visibility",
      sub: "Visibility / Citation / AI Traffic",
    },
    {
      id: "05",
      title: "Optimization Loop",
      sub: "継続的な改善サイクル",
    },
  ];

  const nodeData = [
    { cx: 270, cy: 70,    label: "Question\nIntelligence" },
    { cx: 460.2, cy: 208.2, label: "Semantic\nGAP" },
    { cx: 387.6, cy: 431.8, label: "GEO\nContent" },
    { cx: 152.4, cy: 431.8, label: "AI\nVisibility" },
    { cx: 79.8,  cy: 208.2, label: "Optimization\nLoop" },
  ];

  return (
    <section id="framework" className="section dark py-24">
      <div className="wrap max-w-[1280px] mx-auto px-10">
        <SectionLabel title="GEO FRAMEWORK" dark />
        <hr className="my-4 border-white/[0.06]" />

        <div className="mt-12 fw-grid">
          {/* Left: headline + fw-ring diagram */}
          <div>
            <h2
              className="text-[#FAFAF7] font-bold leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              5 ステップで回す、<br />
              <span className="text-blue-gradient">循環型</span> GEO 設計。
            </h2>

            <div className="fw-ring-wrap mt-12">
              <svg
                className="fw-ring"
                viewBox="0 0 540 540"
                width="100%"
                height="100%"
              >
                <defs>
                  <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0 0 L6 3 L0 6 Z" fill="rgba(255,255,255,0.3)" />
                  </marker>
                </defs>
                <circle cx="270" cy="270" r="224" fill="none" stroke="#FAFAF7" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="8 10" strokeLinecap="round" />
                <circle cx="270" cy="270" r="200" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.25" />
                <circle cx="270" cy="270" r="140" fill="none" stroke="#FAFAF7" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="8 10" strokeLinecap="round" />
                <path d="M 305.806,73.231 A 200,200 0 0,1 446.074,175.142" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.2" markerEnd="url(#ar)" />
                <path d="M 468.203,243.249 A 200,200 0 0,1 414.625,408.143" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.2" markerEnd="url(#ar)" />
                <path d="M 356.690,450.235 A 200,200 0 0,1 183.310,450.235" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.2" markerEnd="url(#ar)" />
                <path d="M 125.375,408.143 A 200,200 0 0,1 71.797,243.249" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.2" markerEnd="url(#ar)" />
                <path d="M 93.926,175.142 A 200,200 0 0,1 234.194,73.231" fill="none" stroke="#FAFAF7" strokeOpacity="0.24" strokeWidth="1.2" markerEnd="url(#ar)" />
                {nodeData.map((node, i) => {
                  const isActive = active === i;
                  const lines = node.label.split("\n");
                  const lineHeight = 14;
                  const startOffset = -((lines.length - 1) * lineHeight) / 2;
                  return (
                    <g key={i} className="node" style={{ cursor: "pointer" }} onClick={() => setActive(i)}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="54"
                        fill={isActive ? "#1452FF" : "#0B0B0E"}
                        stroke={isActive ? "#1452FF" : "rgba(255,255,255,0.2)"}
                        strokeWidth="1.5"
                      />
                      <text
                        x={node.cx}
                        y={node.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? "white" : "rgba(255,255,255,0.78)"}
                        fontFamily="'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif"
                        fontWeight="600"
                        fontSize="12"
                      >
                        {lines.map((line, li) => (
                          <tspan
                            key={li}
                            x={node.cx}
                            dy={li === 0 ? startOffset : lineHeight}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="fw-center">
                <div className="lab">GEO FRAMEWORK</div>
                <div className="ttl">5 Phase</div>
                <div className="ttl accent">Loop</div>
              </div>
            </div>
          </div>

          <div className="fw-list">
            {steps.map((step, i) => (
              <Button
                key={step.id}
                type="button"
                variant="bare"
                onClick={() => setActive(i)}
                className={`fw-step text-left ${active === i ? "active" : ""}`}
              >
                <span className="n">{step.id}</span>
                <div>
                  <h5 className={active === i ? "text-[#FAFAF7]" : "text-white/80"}>
                    {step.title}
                  </h5>
                  <div className="meta">{step.sub}</div>
                </div>
                <span className={`more text-[17px] ${active === i ? "text-[#1452FF]" : "text-white/20"}`}>→</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Services Section
───────────────────────────────────────────── */
function ServicesSection() {
  const services = [
    {
      title: "質問クラスター抽出",
      desc: "CDJ 5 段階 × 検索量 × 文脈データから、ブランドが応答すべき質問群をデータ基盤で導出。",
      bullets: ["CDJ 5 段階分類", "検索量による優先度化", "cluster・path 文脈結合"],
      visual: (
        <div className="bg-[#0B0B0E] rounded-xl p-4 text-left flex-1 flex flex-col justify-center">
          <div className="mono text-[9px] text-[#d3d3d8] tracking-[0.1em] mb-3">QUESTION CLUSTER</div>
          {[
            { label: "初期探索", val: "202,333", w: "100%" },
            { label: "情報探索", val: "19,303", w: "58%" },
            { label: "経験探索", val: "8,283", w: "40%" },
            { label: "購買確定", val: "4,120", w: "28%" },
            { label: "購買以後", val: "2,104", w: "18%" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-white/40 w-[52px] flex-shrink-0">{row.label}</span>
              <div className="flex-1 h-[6px] bg-white/[0.05] rounded-full">
                <div className="h-[6px] rounded-full bg-[#1452FF]" style={{ width: row.w }} />
              </div>
              <span className="mono text-[10px] text-white/50">{row.val}</span>
            </div>
          ))}
          <div className="mt-3 bg-[#1452FF]/10 border border-[#1452FF]/20 rounded-lg p-2.5">
            <div className="mono text-[9px] text-[#6B8FFF] mb-1">FINAL CLUSTER</div>
            <div className="text-[11px] text-white/70 leading-snug">
              &quot;免許なしで上り坂通勤に使える補助金対象の電動自転車は？&quot;
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "GAP Analysis",
      desc: "質問とコンテンツの間にある意味的ギャップを発見。",
      bullets: ["質問 ↔ コンテンツ GAP", "12 点 Semantic Score", "Cluster Mapping"],
      visual: (
        <div className="bg-[#0B0B0E] rounded-xl p-4 flex-1 flex flex-col">
          <div className="mono text-[10px] text-[#d3d3d8] tracking-[0.1em] mb-3">SEMANTIC SCORE</div>
          <div className="flex-1 flex items-center justify-center py-2">
            <div className="relative w-[120px] h-[120px]">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#1452FF" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.84} ${2 * Math.PI * 42}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold text-white">8.4</span>
                <span className="text-[11px] text-white/50">/ 12.0</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "GEO コンテンツ制作",
      desc: "AI に「引用される」構造を設計するライティング。",
      bullets: ["Passage 最適化", "FAQ / Schema 設計", "GEO Writing"],
      visual: (
        <div className="bg-[#0B0B0E] rounded-xl p-4 flex-1 flex flex-col justify-center">
          <div className="mono text-[9px] text-[#d3d3d8] tracking-[0.1em] mb-3">PASSAGE STRUCTURE</div>
          {[
            { label: "Lead Passage", w: "90%", color: "#1452FF" },
            { label: "Support 1", w: "70%", color: "#6B8FFF" },
            { label: "Support 2", w: "55%", color: "#6B8FFF" },
            { label: "FAQ Block", w: "80%", color: "#6B8FFF" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 mb-2">
              <div className="h-2 rounded-sm" style={{ width: row.w, background: row.color, opacity: 0.7 }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "GEO モニタリング",
      desc: "可視性・引用・トラフィックを継続トラッキング。",
      bullets: ["Brand Visibility", "Citation Tracking", "AI Traffic 分析"],
      visual: (
        <div className="bg-[#0B0B0E] rounded-xl p-4 flex-1 flex flex-col justify-center">
          <div className="mono text-[9px] text-[#d3d3d8] tracking-[0.1em] mb-3">CITATION TREND</div>
          <div className="flex items-end gap-1 h-[70px]">
            {[20, 28, 22, 35, 30, 42, 38, 55, 50, 68, 62, 80].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${v}%`,
                  background: i >= 9 ? "#1452FF" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["JAN", "FEB", "MAR"].map((m) => (
              <span key={m} className="mono text-[9px] text-white/30">{m}</span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="bg-[#FAFAF7] pt-24 pb-12">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionLabel title="SERVICES" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
          >
            質問 → 分析 → 制作 → モニタリング。
            <span className="text-blue-gradient"> フルスタック</span>で提供。
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white border border-black/[0.07] rounded-2xl p-7 card-hover group flex flex-col"
            >
              <h3 className="text-[19px] font-bold text-[#0B0B0E] mb-2">{svc.title}</h3>
              <p className="text-[16px] text-[#4e4e51] leading-[1.6] mb-4 font-[inherit]">{svc.desc}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[15px] text-[#4e4e51] font-[inherit]">
                    <span className="w-4 h-[1px] bg-[#1452FF]" />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Visual — flex-1로 나머지 공간 채움 */}
              <div className="flex-1 flex flex-col">{svc.visual}</div>
              <div className="mt-5">
                <Button type="button" variant="detail">
                  詳しく見る →
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
      tag: "TREND",
      num: "03",
      title: "検索はどう変わっているのか — 2026 AI 検索レポート",
      desc: "クリック率・回答出現率・引用率の最新データ。検索行動の根本的な変化を読み解く。",
      date: "04.18",
      readTime: "8 MIN READ",
      size: "large",
    },
    {
      tag: "COMPARE",
      num: "02",
      title: "SEO と GEO は何が違うのか",
      desc: "",
      date: "04.04",
      readTime: "6 MIN READ",
      size: "small",
    },
    {
      tag: "INSIGHT",
      num: "01",
      title: "AI はどんなコンテンツを引用するのか",
      desc: "",
      date: "03.22",
      readTime: "10 MIN READ",
      size: "small",
    },
  ];

  return (
    <section id="lab" className="bg-[#FAFAF7] pt-12 pb-24">
      <div className="max-w-[1280px] mx-auto px-10">
        <SectionLabel title="GEO LAB" />
        <hr className="my-4 border-black/[0.07]" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em] whitespace-nowrap"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              AI 検索時代の <span className="text-blue-gradient">リサーチハブ</span>。
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[17px] text-[#4e4e51] leading-[1.6] font-[inherit]">
              特許分析・実データ検証・引用構造の研究。GEO Lab は実務に効くリサーチを発信します。
            </p>
          </div>
        </div>

        {/* Article cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large card */}
          <div className="md:col-span-1 bg-[#0B0B0E] rounded-2xl overflow-hidden card-hover-dark group">
            <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1452FF]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-bold text-white/5"
                  style={{ fontSize: "120px", lineHeight: 1 }}
                >
                  03
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="tag-blue text-[10px]">TREND</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[19px] font-bold text-[#FAFAF7] leading-snug mb-2">
                {articles[0].title}
              </h3>
              <p className="text-[15px] text-[#d3d3d8] leading-[1.6] mb-4">{articles[0].desc}</p>
              <div className="flex items-center gap-3 mono text-[11px] text-[#d3d3d8]">
                <span>{articles[0].date}</span>
                <span>·</span>
                <span>{articles[0].readTime}</span>
              </div>
            </div>
          </div>

          {/* Small cards */}
          <div className="md:col-span-2 grid grid-rows-2 gap-4">
            {articles.slice(1).map((article) => (
              <div
                key={article.num}
                className="bg-[#0B0B0E] rounded-2xl overflow-hidden card-hover-dark group flex"
              >
                <div className="relative w-[160px] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1452FF]/15 to-transparent" />
                  <span className="font-bold text-white/5" style={{ fontSize: "72px", lineHeight: 1 }}>
                    {article.num}
                  </span>
                  <div className="absolute top-3 left-3">
                    <span className="tag-dark text-[9px]">{article.tag}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <h4 className="text-[17px] font-bold text-[#FAFAF7] leading-snug">{article.title}</h4>
                  <div className="flex items-center gap-3 mono text-[11px] text-[#d3d3d8]">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <SearchShiftSection />
      <WhyAscentSection />
      <FrameworkSection />
      <ServicesSection />
      <GeoLabSection />
      <CTASection
        kicker="CONTACT — START WITH A FREE AUDIT"
        title={<>AI 検索で、<br />あなたのブランドは<br /><span className="text-blue-gradient">何回引用されている</span>か？</>}
        description="まずは無料診断で、現在の AI Visibility と Citation 構造を可視化します。所要 30 分のオンライン MTG から。"
        primaryButton={{ href: '/contact', label: '相談する' }}
        secondaryButtons={[
          { href: '/whitepaper', label: 'サービス資料をダウンロード' },
          { href: '/contact', label: 'カレンダー予約（30分）' },
        ]}
      />
    </div>
  );
}
