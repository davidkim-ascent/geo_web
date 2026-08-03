"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ENGINE_BARS = [
  { label: "AI Overviews", value: 73, color: "#4A9FD8", top: 24.0 },
  { label: "Gemini", value: 73, color: "#F5A623", top: 26.25 },
  { label: "AI Mode", value: 73, color: "#7B5FE0", top: 28.5 },
  { label: "ChatGPT", value: 80, color: "#E0604D", top: 30.75 },
  { label: "Perplexity", value: 80, color: "#E85A97", top: 33.0 },
  { label: "Microsoft Copilot", value: 87, color: "#4FB8A8", top: 35.25 },
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
    const duration = 900;
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
    <div ref={ref} className="relative w-full aspect-[1600/1200] rounded-lg overflow-hidden bg-white border border-black/[0.07]">
      <Image src="/home/hero-shindan-full.png" alt="GEO 診断 レポート" fill className="object-cover" />

      <div className="absolute font-bold text-[#0B0B0E]" style={{ left: "23.25%", top: "26.2%", fontSize: "2.4vw" }}>
        <span className="tabular-nums">{count}</span>%
      </div>
      <div className="absolute rounded-full bg-black/[0.06] overflow-hidden" style={{ left: "23.25%", top: "34%", width: "21.5%", height: "0.9%" }}>
        <div
          className="h-full rounded-full bg-[#F5A623] transition-[width] ease-out"
          style={{ width: played ? `${SOV_VALUE}%` : "0%", transitionDuration: "900ms" }}
        />
      </div>

      {ENGINE_BARS.map((bar, i) => (
        <div
          key={bar.label}
          className="absolute rounded-full bg-black/[0.05] overflow-hidden"
          style={{ left: "60.3%", top: `${bar.top}%`, width: "18.75%", height: "1.35%" }}
        >
          <div
            className="h-full rounded-full transition-[width] ease-out"
            style={{
              width: played ? `${bar.value}%` : "0%",
              background: bar.color,
              transitionDuration: "800ms",
              transitionDelay: `${i * 90}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
