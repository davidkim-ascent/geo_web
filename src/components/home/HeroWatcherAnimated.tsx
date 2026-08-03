"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { label: "Shiseido", color: "#4A6FE0", d: "M0,42 C10,40 18,20 26,8 C34,2 42,2 50,2 C58,2 66,4 72,12 C78,20 82,32 84,36 C88,40 92,30 94,24 C96,20 98,20 100,10" },
  { label: "DECORTÉ", color: "#F5A623", d: "M0,100 C20,100 24,98 26,60 C28,20 34,8 42,6 C50,4 58,28 62,40 C66,54 70,46 74,42 C80,36 86,24 90,20 C94,16 98,18 100,14" },
  { label: "KOSÉ", color: "#9C6B4A", d: "M0,64 C10,68 18,78 26,52 C34,26 42,58 50,60 C58,62 66,58 72,50 C78,42 82,54 84,58 C88,62 92,56 94,58 C96,60 98,52 100,44" },
  { label: "SK-Ⅱ (P&G)", color: "#1E3A66", d: "M0,32 C8,34 16,10 22,8 C28,6 32,72 36,96 C40,100 46,100 50,100 C56,100 62,74 68,58 C74,42 78,44 82,44 C88,44 92,48 94,40 C96,32 98,24 100,20" },
];

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
    <div ref={ref} className="relative w-full aspect-[2940/1622] rounded-lg overflow-hidden bg-white border border-black/[0.07]">
      <Image src="/home/hero-watcher-full.png" alt="GEO Watcher 可視性グラフ" fill className="object-cover" />

      <div className="absolute" style={{ left: "20.9%", top: "40.7%", width: "76.5%", height: "34.5%" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {LINES.map((line, i) => (
            <path
              key={line.label}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeWidth="1.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              style={{
                strokeDasharray: 100,
                strokeDashoffset: played ? 0 : 100,
                transition: `stroke-dashoffset 1400ms ease-out`,
                transitionDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </svg>
        {LINES.map((line, i) => {
          const endpoints: Record<string, { x: number; y: number }> = {
            Shiseido: { x: 100, y: 10 },
            "DECORTÉ": { x: 100, y: 14 },
            "KOSÉ": { x: 100, y: 44 },
            "SK-Ⅱ (P&G)": { x: 100, y: 20 },
          };
          const p = endpoints[line.label];
          return (
            <div
              key={`dot-${line.label}`}
              className="absolute rounded-full transition-opacity"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
                background: line.color,
                boxShadow: `0 0 0 4px ${line.color}33`,
                opacity: played ? 1 : 0,
                transitionDelay: `${1400 + i * 150}ms`,
                animation: played ? "hero-watcher-pulse 1.8s ease-in-out infinite" : "none",
                animationDelay: `${1500 + i * 150}ms`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes hero-watcher-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(0,0,0,0.08); }
          50% { box-shadow: 0 0 0 8px rgba(0,0,0,0.03); }
        }
      `}</style>
    </div>
  );
}
