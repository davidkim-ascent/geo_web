"use client";

import { useState } from "react";

const searchPathPaths = [
  {
    tag: "PATH 01",
    name: "通勤目的",
    en: "COMMUTE",
    nodes: [
      { kw: "電動自転車", prompt: "電動自転車って実際どう？普通の自転車と何が違うの？" },
      { kw: "電動自転車 おすすめ", prompt: "通勤に使える電動自転車のおすすめを教えて。" },
      { kw: "電動自転車 おすすめ 通勤", prompt: "毎日 10km の通勤で坂道もある場合、おすすめの電動自転車は？充電 1 回でどれくらい走れる？" },
    ],
  },
  {
    tag: "PATH 02",
    name: "価格重視",
    en: "PRICE",
    nodes: [
      { kw: "電動自転車", prompt: "電動自転車って高そうだけど、相場ってどれくらい？" },
      { kw: "電動自転車 安い", prompt: "5 万円以下で買える電動自転車ってある？" },
      { kw: "電動自転車 安い 型落ち", prompt: "型落ちでもいいから安く買える電動自転車、どこのメーカーがおすすめ？" },
    ],
  },
  {
    tag: "PATH 03",
    name: "補助金確認",
    en: "SUBSIDY",
    nodes: [
      { kw: "電動自転車", prompt: "電動自転車を買おうか迷ってる。何を見て決めればいい？" },
      { kw: "電動自転車 補助金", prompt: "電動自転車って、自治体の補助金もらえる？" },
      { kw: "電動自転車 補助金 東京都 2025", prompt: "東京都で 2025 年に電動自転車の補助金をもらうには？申請条件と上限額を教えて。" },
    ],
  },
] as const;

export function SearchPathPanel() {
  const [active, setActive] = useState(2);
  const cur = searchPathPaths[active];

  return (
    <div className="rounded-[22px] bg-[#0c0c11] p-4 shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)] md:p-5">
      <div className="rounded-[18px] bg-[#0b0b0e] p-4 md:p-5">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2 rounded-full bg-white/[0.03] p-1">
            {searchPathPaths.map((p, i) => {
              const activeTab = i === active;
              return (
                <button
                  key={p.tag}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-3 text-left transition-colors ${
                    activeTab ? "bg-[#1452ff]" : "bg-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="font-mono text-[9px] tracking-[0.22em] text-white/55">{p.tag}</div>
                  <div className="mt-1 text-[13px] font-semibold tracking-[-0.01em] text-white">
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[16px] bg-white/[0.02] p-5">
            <div className="mb-4 flex items-center justify-between pb-4 font-mono text-[10px] tracking-[0.18em] text-white/55">
              <span className="text-[#1452ff]">SEARCH PATH · {cur.en}</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1452ff] shadow-[0_0_8px_#1452ff]" />
                REAL-DATA SAMPLE
              </span>
            </div>

            <div className="space-y-4">
              {cur.nodes.map((node, index) => {
                const depthClass =
                  index === 0
                    ? "bg-black/20"
                    : index === 1
                      ? "bg-[#1452ff]/6"
                      : "bg-[#1452ff]/14";

                return (
                  <div key={node.kw}>
                    <div className={`rounded-[12px] p-4 md:p-[18px] ${depthClass}`}>
                      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-white/60">
                        <span className="text-[#1452ff]">STEP {String(index + 1).padStart(2, "0")}</span>
                        <span>DEPTH · L{index + 1}</span>
                      </div>
                      <div className="mt-3 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                        {node.kw}
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/55">USER PROMPT</span>
                        <div className="rounded-[10px] bg-white/[0.04] px-4 py-3 text-[14px] italic leading-[1.6] text-white/92">
                          <span className="font-mono not-italic text-[#1452ff]">&ldquo;</span>
                          {node.prompt}
                        </div>
                      </div>
                    </div>
                    {index < cur.nodes.length - 1 && (
                      <div className="flex flex-col items-center gap-1 py-3">
                        <span className="h-1 w-1 rounded-full bg-[#1452ff] opacity-50" />
                        <span className="h-1 w-1 rounded-full bg-[#1452ff] opacity-50" />
                        <span className="h-1 w-1 rounded-full bg-[#1452ff] opacity-50" />
                        <span className="font-mono text-[12px] leading-none text-[#1452ff]">↓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 font-mono text-[10px] tracking-[0.16em] text-white/55">
              <span>SEED · 電動自転車</span>
              <span>
                STEPS · <b className="font-sans text-[13px] font-semibold text-white">3</b>
              </span>
              <span>
                CLUSTER · <b className="font-sans text-[13px] font-semibold text-white">{cur.name}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
