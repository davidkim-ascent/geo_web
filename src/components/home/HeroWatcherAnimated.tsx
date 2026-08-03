"use client";

import { useEffect, useRef, useState } from "react";

// x: 0-100, y: 0(下)-100(上) の観測点。ブランドごとにレンジを分けて重なりを抑えている。
const SERIES = [
  { label: "Shiseido", color: "#4A6FE0", points: [{ x: 0, y: 82 }, { x: 25, y: 78 }, { x: 50, y: 88 }, { x: 75, y: 80 }, { x: 100, y: 90 }] },
  { label: "DECORTÉ", color: "#F5A623", points: [{ x: 0, y: 20 }, { x: 25, y: 22 }, { x: 50, y: 48 }, { x: 75, y: 40 }, { x: 100, y: 62 }] },
  { label: "KOSÉ", color: "#9C6B4A", points: [{ x: 0, y: 48 }, { x: 25, y: 40 }, { x: 50, y: 52 }, { x: 75, y: 46 }, { x: 100, y: 50 }] },
  { label: "SK-Ⅱ (P&G)", color: "#1E3A66", points: [{ x: 0, y: 60 }, { x: 25, y: 34 }, { x: 50, y: 12 }, { x: 75, y: 24 }, { x: 100, y: 30 }] },
];

const DOT_POP_DURATION = 0.4;
const DOT_STAGGER = 0.1;
const DOTS_TOTAL_TIME = 1.2; // 全ブランドの点が出そろうまでの時間
const LINE_DURATION = 2.2; // seconds per line draw
const LINE_STAGGER = 0.4;

function catmullRomToBezier(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

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

            {played &&
              SERIES.map((s, si) => {
                const flipped = s.points.map((p) => ({ x: p.x, y: 100 - p.y }));
                const d = catmullRomToBezier(flipped);
                const lineBegin = DOTS_TOTAL_TIME + si * LINE_STAGGER;
                return (
                  <g key={s.label}>
                    {flipped.map((p, pi) => (
                      <ellipse key={pi} cx={p.x} cy={p.y} rx="0" ry="0" fill={s.color}>
                        <animate
                          attributeName="rx"
                          from="0"
                          to="1"
                          dur={`${DOT_POP_DURATION}s`}
                          begin={`${si * DOT_STAGGER + pi * DOT_STAGGER}s`}
                          fill="freeze"
                        />
                        <animate
                          attributeName="ry"
                          from="0"
                          to="1.6"
                          dur={`${DOT_POP_DURATION}s`}
                          begin={`${si * DOT_STAGGER + pi * DOT_STAGGER}s`}
                          fill="freeze"
                        />
                      </ellipse>
                    ))}
                    <path
                      d={d}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="500"
                      strokeDashoffset="500"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="500"
                        to="0"
                        dur={`${LINE_DURATION}s`}
                        begin={`${lineBegin}s`}
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.25 0.1 0.25 1"
                        keyTimes="0;1"
                      />
                    </path>
                  </g>
                );
              })}
          </svg>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {SERIES.map((s) => (
            <div key={`legend-${s.label}`} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-[6px] text-[#6B6B73]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
