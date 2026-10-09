"use client";

import { useEffect, useState } from "react";

const TOC = [
  { id: "s1", t: "AEOとは" },
  { id: "s2", t: "AEOとSEOの違い" },
  { id: "s3", t: "GEO・LLMO・AIOとの違い" },
  { id: "s4", t: "注目される理由と背景" },
  { id: "s5", t: "AEOの仕組み" },
  { id: "s6", t: "AEO対策の9つの施策" },
  { id: "s7", t: "効果測定" },
  { id: "s8", t: "引用されやすいコンテンツの型" },
  { id: "s9", t: "注意点とリスク" },
  { id: "s10", t: "よくある質問" },
  { id: "s11", t: "まとめ" },
];

export function ArticleTOC() {
  const [active, setActive] = useState("s1");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <aside className="article-toc sticky top-[100px]">
      <div className="article-toc__label">[ CONTENTS ]</div>
      <ol className="article-toc__list">
        {TOC.map((item, index) => (
          <li
            key={item.id}
            className={`article-toc__item ${active === item.id ? "article-toc__item--active" : "text-[#6B6B73]"}`}
          >
            <a href={`#${item.id}`} className="article-toc__link hover:text-[#0B0B0E]">
              <span className="article-toc__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="article-toc__title">{item.t}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
