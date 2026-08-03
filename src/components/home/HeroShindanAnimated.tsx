"use client";

import { useEffect, useRef, useState } from "react";

const ENGINE_BARS = [
  { label: "AI Overviews", value: 73, color: "#4A9FD8" },
  { label: "Gemini", value: 73, color: "#F5A623" },
  { label: "AI Mode", value: 73, color: "#7B5FE0" },
  { label: "ChatGPT", value: 80, color: "#E0604D" },
  { label: "Perplexity", value: 80, color: "#E85A97" },
  { label: "Microsoft Copilot", value: 87, color: "#4FB8A8" },
];

const SOV_VALUE = 38;

export function HeroShindanAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (!played) return;
    const duration = 3200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * SOV_VALUE));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [played]);

  return (
    <div ref={ref} className="w-full rounded-lg overflow-hidden border border-black/[0.07] bg-white flex flex-col p-4 text-left" style={{ aspectRatio: "3 / 2" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-[10px] text-[#0B0B0E]">
          ASCENT<span className="text-[#003393]">GEO</span>
          <span className="ml-1.5 text-[7px] font-normal text-[#6B6B73]">AI検索結果 診断レポート</span>
        </div>
        <span className="text-[6px] text-[#9A9AA0]">2026年7月16日</span>
      </div>

      <div className="flex items-baseline gap-2 mb-3 pb-1 border-b-2 border-[#0B0B0E] w-fit">
        <span className="text-[13px] font-bold text-[#0B0B0E]">ユニクロ</span>
        <span className="text-[13px] font-bold text-[#0B0B0E]">GEO(LLMO) リポート</span>
      </div>

      <div className="flex gap-3 flex-1 min-h-0">
        <div className="w-[40%] rounded-md bg-[#F7F8FA] p-3 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: "68%", aspectRatio: "1 / 1" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#00000010" strokeWidth="12" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#F5A623"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={played ? 2 * Math.PI * 42 * (1 - SOV_VALUE / 100) : 2 * Math.PI * 42}
                style={{ transition: "stroke-dashoffset 3200ms ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-[#0B0B0E]" style={{ fontSize: "min(3.2vw, 16px)" }}>
              <span className="tabular-nums">{count}</span>%
            </div>
          </div>
          <div className="text-[6px] text-[#6B6B73] mt-2">シェア・オブ・ボイス</div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="text-[7px] font-semibold text-[#0B0B0E] mb-1.5">AI エンジン別ブランド言及率</div>
          <div className="flex flex-col gap-1.5 flex-1 justify-center">
            {ENGINE_BARS.map((bar, i) => (
              <div key={bar.label} className="flex items-center gap-1.5">
                <span className="text-[6px] text-[#6B6B73] w-[34%] truncate flex-shrink-0">{bar.label}</span>
                <div className="flex-1 h-[6px] rounded-full bg-black/[0.05] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] ease-out"
                    style={{
                      width: played ? `${bar.value}%` : "0%",
                      background: bar.color,
                      transitionDuration: "2400ms",
                      transitionDelay: `${i * 260}ms`,
                    }}
                  />
                </div>
                <span className="text-[6px] text-[#9A9AA0] w-[16px] text-right flex-shrink-0">{bar.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
