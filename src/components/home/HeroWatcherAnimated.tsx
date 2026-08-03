"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { label: "Shiseido", color: "#4A6FE0", d: "M0,45 C10,43 18,30 26,20 C34,15 42,15 50,15 C58,15 66,17 72,24 C78,30 82,38 84,40 C88,42 92,36 94,32 C96,28 98,26 100,18", end: { x: 100, y: 18 } },
  { label: "DECORTÉ", color: "#F5A623", d: "M0,82 C20,82 24,80 26,58 C28,32 34,22 42,20 C50,18 58,34 62,42 C66,50 70,45 74,42 C80,38 86,30 90,27 C94,24 98,25 100,22", end: { x: 100, y: 22 } },
  { label: "KOSÉ", color: "#9C6B4A", d: "M0,58 C10,60 18,66 26,50 C34,34 42,54 50,55 C58,56 66,53 72,48 C78,43 82,50 84,52 C88,54 92,51 94,52 C96,53 98,48 100,42", end: { x: 100, y: 42 } },
  { label: "SK-Ⅱ (P&G)", color: "#1E3A66", d: "M0,35 C8,36 16,22 22,20 C28,18 32,58 36,72 C40,75 46,75 50,75 C56,75 62,58 68,48 C74,38 78,40 82,40 C88,40 92,42 94,37 C96,32 98,27 100,24", end: { x: 100, y: 24 } },
];

const SIDEBAR_ITEMS = ["概要", "可視性", "プロンプト", "シェア・オブ・ボイス", "引用URL"];

export function HeroWatcherAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full rounded-lg overflow-hidden border border-black/[0.07] bg-white flex text-left" style={{ aspectRatio: "3 / 2" }}>
      {/* Sidebar */}
      <div className="hidden sm:flex w-[26%] flex-shrink-0 flex-col gap-1 bg-[#FAFAF9] border-r border-black/[0.06] px-3 py-3">
        <div className="font-bold text-[10px] text-[#0B0B0E] mb-2">
          ASCENT<span className="text-[#003393]">GEO</span>
        </div>
        <div className="text-[8px] text-[#003393] font-semibold mb-1">GEO Watcher</div>
        {SIDEBAR_ITEMS.map((item, i) => (
          <div
            key={item}
            className={`rounded px-2 py-1 text-[7px] ${i === 1 ? "bg-[#003393] text-white font-medium" : "text-[#6B6B73]"}`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-4 min-w-0">
        <div className="text-[10px] font-bold text-[#0B0B0E] mb-2">可視性</div>
        <div className="rounded bg-[#FFF8EC] border border-[#F5A623]/20 px-3 py-1.5 mb-3 flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#F5A623]">62%</span>
          <span className="text-[7px] text-[#8A6D2F]">可視性</span>
        </div>

        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] text-[#0B0B0E]">日本でおすすめのスキンケアブランドはどこですか？</span>
          <span className="text-[6px] rounded-full bg-[#0F9D58]/10 text-[#0F9D58] px-1.5 py-0.5 font-medium">100% 可視性</span>
        </div>

        <div className="relative flex-1 min-h-0 mt-1">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <line x1="0" y1="25" x2="100" y2="25" stroke="#00000010" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#00000010" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#00000010" strokeWidth="0.5" strokeDasharray="1 1" />
            {LINES.map((line, i) => (
              <path
                key={line.label}
                d={line.d}
                fill="none"
                stroke={line.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: played ? 0 : 400,
                  transition: "stroke-dashoffset 1400ms ease-out",
                  transitionDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </svg>
          {LINES.map((line, i) => (
            <div
              key={`dot-${line.label}`}
              className="absolute rounded-full"
              style={{
                left: `${line.end.x}%`,
                top: `${line.end.y}%`,
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                background: line.color,
                opacity: played ? 1 : 0,
                transition: "opacity 300ms",
                transitionDelay: `${1400 + i * 150}ms`,
                animation: played ? "hero-watcher-pulse 1.8s ease-in-out infinite" : "none",
                animationDelay: `${1500 + i * 150}ms`,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {LINES.map((line) => (
            <div key={`legend-${line.label}`} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: line.color }} />
              <span className="text-[6px] text-[#6B6B73]">{line.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-watcher-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(0,0,0,0.08); }
          50% { box-shadow: 0 0 0 6px rgba(0,0,0,0.02); }
        }
      `}</style>
    </div>
  );
}
