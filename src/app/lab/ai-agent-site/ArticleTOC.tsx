"use client";

import { useEffect, useState } from "react";

const TOC = [
  { id: "s1", t: "AIエージェントが見る3つの方法" },
  { id: "s2", t: "画面を写真のように見る" },
  { id: "s3", t: "ウェブサイトの構造を読む" },
  { id: "s4", t: "画面と構造を一緒に見る" },
  { id: "s5", t: "ラベルはAI向けの案内図" },
  { id: "s6", t: "意味のあるHTMLが最重要" },
  { id: "s7", t: "入力欄には説明を付ける" },
  { id: "s8", t: "見出しと領域の整理" },
  { id: "s9", t: "重要な内容は最初から見える" },
  { id: "s10", t: "AIで使えるかテストする方法" },
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
