"use client";

import { useEffect, useState } from "react";

const TOC = [
  { id: "s1", t: "一覧比較表" },
  { id: "s2", t: "GEO・LLMOとは" },
  { id: "s3", t: "SEOとの違い" },
  { id: "s4", t: "重要と言われる理由" },
  { id: "s5", t: "ツールの選び方" },
  { id: "s6", t: "15個を詳しく紹介" },
  { id: "s7", t: "選びで失敗するケース" },
  { id: "s8", t: "対策の具体的なプロセス" },
  { id: "s9", t: "よくある質問" },
  { id: "s10", t: "まとめ" },
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
