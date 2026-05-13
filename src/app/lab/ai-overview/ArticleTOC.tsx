"use client";

import { useState, useEffect } from "react";

const TOC = [
  { id: "s1", t: "3秒で読まれる、が前提に" },
  { id: "s2", t: "AI Overview の出現とは" },
  { id: "s3", t: "12業種・1,400ページの実測" },
  { id: "s4", t: "引用される側の条件" },
  { id: "s5", t: "Passage Optimization" },
  { id: "s6", t: "クリックされない検索の測定" },
  { id: "s7", t: "これからの3秒間のために" },
];

export function ArticleTOC() {
  const [active, setActive] = useState("s1");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <aside className="sticky top-[100px] font-mono">
      <div className="mb-4 text-[10px] tracking-[0.2em] text-[#9A9AA0] uppercase">
        [ CONTENTS ]
      </div>
      <ol className="grid gap-1.5 list-none p-0 m-0" style={{ counterReset: "t" }}>
        {TOC.map((t) => (
          <li
            key={t.id}
            className={`border-l pl-3 py-1.5 text-[11px] leading-[1.55] tracking-[0.04em] transition-all ${
              active === t.id
                ? "border-[#1452FF] text-[#0B0B0E] bg-gradient-to-r from-[rgba(20,82,255,0.08)] to-transparent"
                : "border-[#E6E4DD] text-[#6B6B73]"
            }`}
            style={{ counterIncrement: "t" }}
          >
            <a href={"#" + t.id} className="hover:text-[#0B0B0E] transition-colors" style={{ color: "inherit" }}>
              <span className="mr-1.5 text-[#1452FF] font-semibold">§{String(TOC.indexOf(t) + 1).padStart(2, "0")} </span>
              {t.t}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
