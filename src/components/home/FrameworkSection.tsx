"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function SectionLabel({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#1452FF]" />
      <span className={`ui-section-label-title ${dark ? "ui-section-label-title-dark" : ""}`}>{title}</span>
    </div>
  );
}

export default function FrameworkSection() {
  const [active, setActive] = useState(0);

  const steps = [
    {
      id: "01",
      title: "質問分析",
      sub: "カスタマージャーニーベースで質問生成 / 質問クラスター生成",
    },
    {
      id: "02",
      title: "GAP分析",
      sub: "10点評価でスコアリング / 意味的類似度",
    },
    {
      id: "03",
      title: "実践的なGEO対策",
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
    { cx: 270, cy: 70, label: "Question\nIntelligence" },
    { cx: 460.2, cy: 208.2, label: "Semantic\nGAP" },
    { cx: 387.6, cy: 431.8, label: "GEO\nContent" },
    { cx: 152.4, cy: 431.8, label: "AI\nVisibility" },
    { cx: 79.8, cy: 208.2, label: "Optimization\nLoop" },
  ];

  return (
    <section id="framework" className="section dark py-24">
      <div className="wrap max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionLabel title="GEO FRAMEWORK" dark />
        <hr className="my-4 border-white/[0.06]" />

        <div className="mt-12 fw-grid">
          <div>
            <h2
              className="text-[#FAFAF7] font-bold leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px, 3.2vw, 48px)" }}
            >
              5 ステップで回す、<br />
              <span className="text-blue-gradient">循環型</span> GEO 設計。
            </h2>

            <div className="fw-ring-wrap mt-12">
              <style>{`
                  @keyframes fw-ripple {
                    0%   { r: 65;  opacity: 0.6; }
                    100% { r: 270; opacity: 0; }
                  }
                  .fw-ripple-1 { animation: fw-ripple 14s ease-out infinite 0s; }
                  .fw-ripple-2 { animation: fw-ripple 14s ease-out infinite 4.6s; }
                  .fw-ripple-3 { animation: fw-ripple 14s ease-out infinite 9.2s; }
                `}</style>
              <svg className="fw-ring" viewBox="0 0 540 540" width="100%" height="100%">
                <defs>
                  <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0 0 L6 3 L0 6 Z" fill="rgba(255,255,255,0.3)" />
                  </marker>
                  <mask id="fw-ripple-mask">
                    <rect x="0" y="0" width="540" height="540" fill="white" />
                    <circle cx="270" cy="270" r="62" fill="black" />
                  </mask>
                </defs>
                {/* Ripple waves — CSS blur to avoid rectangular SVG filter clipping */}
                <circle className="fw-ripple-1" cx="270" cy="270" r="65" fill="none" stroke="#4a90d9" strokeWidth="6" mask="url(#fw-ripple-mask)" style={{ filter: "blur(12px)" }} />
                <circle className="fw-ripple-2" cx="270" cy="270" r="65" fill="none" stroke="#4a90d9" strokeWidth="6" mask="url(#fw-ripple-mask)" style={{ filter: "blur(12px)" }} />
                <circle className="fw-ripple-3" cx="270" cy="270" r="65" fill="none" stroke="#4a90d9" strokeWidth="6" mask="url(#fw-ripple-mask)" style={{ filter: "blur(12px)" }} />

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
                        fill={isActive ? "#1452FF" : "#1e2a52"}
                        stroke={isActive ? "#1452FF" : "none"}
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
                          <tspan key={li} x={node.cx} dy={li === 0 ? startOffset : lineHeight}>
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
                asChild
                variant="bare"
                className={`fw-step text-left ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <Link href="/framework">
                  <span className="n">{step.id}</span>
                  <div>
                    <h5 className={active === i ? "text-[#FAFAF7]" : "text-white/80"}>{step.title}</h5>
                    <div className="meta">{step.sub}</div>
                  </div>
                  <span className={`more text-[17px] ${active === i ? "text-[#1452FF]" : "text-white/20"}`}>→</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
