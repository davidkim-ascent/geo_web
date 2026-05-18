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
    <aside className="article-toc sticky top-[100px]">
      <div className="article-toc__label">
        [ CONTENTS ]
      </div>
      <ol className="article-toc__list" style={{ counterReset: "t" }}>
        {TOC.map((t) => (
          <li
            key={t.id}
            className={`article-toc__item ${
              active === t.id ? "article-toc__item--active" : "text-[#6B6B73]"
            }`}
            style={{ counterIncrement: "t" }}
          >
            <a href={"#" + t.id} className="article-toc__link hover:text-[#0B0B0E]" style={{ color: "inherit" }}>
              <span className="article-toc__index">{String(TOC.indexOf(t) + 1).padStart(2, "0")} </span>
              <span className="article-toc__title">{t.t}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
