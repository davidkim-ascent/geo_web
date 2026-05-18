"use client";

import { useEffect, useRef, useState } from "react";

type LineKind = "tag" | "title" | "section" | "bullet";

type LineSpec = {
  kind: LineKind;
  text: string;
  pause?: number;
};

const LINES: LineSpec[] = [
  {
    kind: "tag",
    text: "CEP 10",
    pause: 180,
  },
  {
    kind: "title",
    text: "長距離ドライブ中に眠気が出てきて、高速のSAやコンビニで買ってリフレッシュしながら運転を続けたい",
    pause: 280,
  },
  {
    kind: "section",
    text: "詳細文脈（ナノインテント）",
    pause: 140,
  },
  {
    kind: "bullet",
    text: "・危ない眠気をその場で減らす",
    pause: 90,
  },
  {
    kind: "bullet",
    text: "・移動の責任を果たすために集中を保つ",
    pause: 90,
  },
  {
    kind: "bullet",
    text: "・途中で買える手軽さを活かして回復する",
    pause: 140,
  },
  {
    kind: "section",
    text: "購買決定要因（Key Buying Factor）",
    pause: 140,
  },
  {
    kind: "bullet",
    text: "・SA/コンビニで即購入しやすい缶・ペットボトル形態",
    pause: 90,
  },
  {
    kind: "bullet",
    text: "・移動中に飲みやすい炭酸レベル（炭酸の有無）",
    pause: 90,
  },
  {
    kind: "bullet",
    text: "・運用しやすい1本あたり容量帯（250ml前後/330〜355mlクラスなど）",
    pause: 0,
  },
];

const EMPTY_LINES = LINES.map(() => "");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function TypingPromptCard() {
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState<string[]>(EMPTY_LINES);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setLines(LINES.map((line) => line.text));
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.35 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;

    const run = async () => {
      setLines(EMPTY_LINES);
      setActiveIndex(0);
      setDone(false);

      for (let lineIndex = 0; lineIndex < LINES.length; lineIndex += 1) {
        const line = LINES[lineIndex];
        setActiveIndex(lineIndex);

        for (let i = 1; i <= line.text.length; i += 1) {
          if (cancelled) return;
          setLines((current) => {
            const next = [...current];
            next[lineIndex] = line.text.slice(0, i);
            return next;
          });
          await sleep(16);
        }

        if (cancelled) return;
        await sleep(line.pause ?? 100);
      }

      if (!cancelled) {
        setActiveIndex(null);
        setDone(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [started]);

  return (
    <div
      ref={rootRef}
      className="mb-10 w-full overflow-hidden rounded-2xl border border-[#2A2A32] bg-[#16181D] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]"
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#06D6A0]" />
        </div>
        <div className="text-[12px] tracking-[0.08em] text-white/45">
          New Chat · Untitled prompt
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-[0.18em] text-white/45 uppercase">
            Draft
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-[0.18em] text-white/45 uppercase">
            Auto-save
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(20,82,255,0.12), transparent 28%), radial-gradient(circle at 82% 26%, rgba(122,182,255,0.08), transparent 32%), radial-gradient(circle at 56% 78%, rgba(20,82,255,0.10), transparent 34%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-20%] top-[-15%] h-28 opacity-70"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, transparent 38%, rgba(255,255,255,0.04) 44%, rgba(122,182,255,0.28) 50%, rgba(255,255,255,0.08) 56%, transparent 62%, transparent 100%)",
            filter: "blur(10px)",
            transform: "rotate(8deg)",
          }}
        />

        <div className="relative z-10 rounded-[14px] border border-white/10 bg-[#191B21] px-4 py-4 sm:px-5 sm:py-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[11px] tracking-[0.18em] text-white/50 uppercase">
              Prompt
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#6BA2FF] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6BA2FF] shadow-[0_0_8px_rgba(107,162,255,0.9)]" />
              {done ? "Rendered" : "Typing"}
            </div>
          </div>

          <div
            className="space-y-3 text-[15px] leading-[1.85] tracking-[-0.01em] text-white sm:text-[16px]"
            aria-live="polite"
          >
            {LINES.map((line, index) => {
              if (line.text.length === 0) {
                return <div key={`blank-${index}`} className="h-2" aria-hidden="true" />;
              }

              const kindClass =
                line.kind === "tag"
                  ? "text-[#6BA2FF] font-semibold tracking-[0.14em] uppercase"
                  : line.kind === "section"
                    ? "text-[#C9D4F8] font-semibold"
                    : line.kind === "bullet"
                      ? "text-white/88"
                      : "text-white font-semibold";

              return (
                <div key={`${line.kind}-${index}`} className={kindClass}>
                  <span className="whitespace-pre-wrap break-words">
                    {lines[index]}
                  </span>
                  {activeIndex === index && !done ? (
                    <span className="ml-[2px] inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[#6BA2FF] shadow-[0_0_6px_rgba(107,162,255,0.95)]" />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-white/42">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 tracking-[0.16em] uppercase">
              AI Prompt
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 tracking-[0.16em] uppercase">
              ListeningMind
            </span>
            <span className="ml-auto font-mono tracking-[0.12em]">
              {done ? "10 lines" : "typing..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
