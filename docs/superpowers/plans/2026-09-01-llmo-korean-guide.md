# LLMO Korean Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a Korean `/lab/what-is-llmo` guide that explains LLMO and is discoverable from the Lab article grid.

**Architecture:** Add a dedicated server-rendered article route and a small client-side TOC component following existing Lab article conventions. The article reuses global article styles and the existing `abstract` thumbnail variant; a source-driven static test guards metadata, content anchors, and the Lab card link.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Node.js assertion scripts.

## Global Constraints

- Article language is Korean; the meta title and description match the approved copy exactly.
- Route slug is `/lab/what-is-llmo`; existing Featured cards and routes remain unchanged.
- Use only existing `article-*` CSS classes and `var(--fs-body)` text sizing for new body content.
- Apply `style={{ maxWidth: "none", whiteSpace: "normal" }}` to every long `article-h2`.
- Use div-based `article-table`, never HTML `table`.
- Do not commit or push.

---

### Task 1: Add a failing article contract test

**Files:**
- Create: `scripts/what-is-llmo-article.test.mjs`
- Test: `scripts/what-is-llmo-article.test.mjs`

**Interfaces:**
- Consumes: the route file at `src/app/lab/what-is-llmo/page.tsx`, TOC file at `src/app/lab/what-is-llmo/ArticleTOC.tsx`, and the `POSTS` source in `src/app/lab/LabArticles.tsx`.
- Produces: an executable Node assertion test that exits non-zero until every required route and card contract exists.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pagePath = new URL("../src/app/lab/what-is-llmo/page.tsx", import.meta.url);
const tocPath = new URL("../src/app/lab/what-is-llmo/ArticleTOC.tsx", import.meta.url);
const labPath = new URL("../src/app/lab/LabArticles.tsx", import.meta.url);

const page = readFileSync(pagePath, "utf8");
const toc = readFileSync(tocPath, "utf8");
const lab = readFileSync(labPath, "utf8");

assert.match(page, /title:\s*"LLMO란 무엇인가\? AI와 대규모 언어 모델을 위한 콘텐츠 최적화 가이드"/);
assert.match(page, /description:\s*"LLMO의 개념부터 SEO·AEO·GEO와의 차이, AI에 인용되는 콘텐츠의 5가지 조건, 성과 측정 방법, 실전 체크리스트까지 한 번에 정리합니다\."/);
assert.match(page, /id="s1"/);
assert.match(page, /id="s7"/);
assert.match(page, /article-table/);
assert.match(page, /ArticleThumbnail variant="abstract"/);
assert.match(toc, /id: "s1"/);
assert.match(toc, /id: "s7"/);
assert.match(lab, /href: "\/lab\/what-is-llmo"/);
console.log("What is LLMO article contract passed.");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node scripts/what-is-llmo-article.test.mjs`  
Expected: failure because the new article route and TOC do not exist yet.

### Task 2: Create the Korean article route and table of contents

**Files:**
- Create: `src/app/lab/what-is-llmo/page.tsx`
- Create: `src/app/lab/what-is-llmo/ArticleTOC.tsx`
- Test: `scripts/what-is-llmo-article.test.mjs`

**Interfaces:**
- Consumes: `ArticleThumbnail` from `@/components/lab/ArticleThumbnail` and the global `article-*` styles.
- Produces: a static route exporting `metadata: Metadata` and a TOC whose IDs match sections `s1` through `s7`.

- [ ] **Step 1: Create the TOC component**

```tsx
"use client";

import { useEffect, useState } from "react";

const TOC = [
  { id: "s1", t: "LLMO란 무엇인가" },
  { id: "s2", t: "SEO·AEO·GEO와의 차이" },
  { id: "s3", t: "LLMO의 5가지 핵심 축" },
  { id: "s4", t: "LLMO 성과 측정" },
  { id: "s5", t: "인컨텍스트 러닝" },
  { id: "s6", t: "실전 체크리스트" },
  { id: "s7", t: "마무리" },
];

export function ArticleTOC() {
  const [active, setActive] = useState("s1");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    TOC.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);
  return (
    <aside className="article-toc sticky top-[100px]">
      <div className="article-toc__label">[ CONTENTS ]</div>
      <ol className="article-toc__list">
        {TOC.map((item, index) => (
          <li key={item.id} className={`article-toc__item ${active === item.id ? "article-toc__item--active" : "text-[#6B6B73]"}`}>
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
```

- [ ] **Step 2: Implement the page with approved metadata and seven anchored sections**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleThumbnail } from "@/components/lab/ArticleThumbnail";
import { ArticleTOC } from "./ArticleTOC";

export const metadata: Metadata = {
  title: "LLMO란 무엇인가? AI와 대규모 언어 모델을 위한 콘텐츠 최적화 가이드",
  description: "LLMO의 개념부터 SEO·AEO·GEO와의 차이, AI에 인용되는 콘텐츠의 5가지 조건, 성과 측정 방법, 실전 체크리스트까지 한 번에 정리합니다.",
};

const comparisonRows = [
  ["SEO", "검색 순위", "자연 유입", "Google, Bing"],
  ["AEO", "AI 요약", "AI 요약 노출", "Google 검색"],
  ["GEO", "AI 답변 엔진", "AI 인용과 언급", "AI Mode, Perplexity"],
  ["LLMO", "대화형 AI", "브랜드 추천과 인용", "ChatGPT, Claude, Gemini"],
];
```

Use the existing `llmo-eeat/page.tsx` shell for the breadcrumb, dark hero, article grid, thumbnail figure, responsive TOC placement, and CTA. Populate the body from `GEO_contents/what-is-llmo-ko.md` without copying the source site's advertisements or navigation. Section `s3` must describe all five pillars; section `s4` must include all five KPIs; section `s6` must retain all 16 checklist items. Use the comparison data above in a four-column div-based `article-table`. Each long section heading receives the required wrapping style.

- [ ] **Step 3: Run the contract test to verify it passes**

Run: `node scripts/what-is-llmo-article.test.mjs`  
Expected: `What is LLMO article contract passed.`

### Task 3: Register the article in the Lab grid

**Files:**
- Modify: `src/app/lab/LabArticles.tsx`
- Test: `scripts/what-is-llmo-article.test.mjs`

**Interfaces:**
- Consumes: the new route `/lab/what-is-llmo` and existing `ArticleThumbnail` variant `abstract`.
- Produces: a dated, non-featured card that is included by the existing newest-first `gridPosts` sort.

- [ ] **Step 1: Add this POST entry after the three existing Featured entries**

```tsx
{
  cat: "LLMO GUIDE",
  date: "2026.09.01",
  read: "12 min",
  t: "LLMO란 무엇인가? AI와 대규모 언어 모델을 위한 콘텐츠 최적화 가이드",
  d: "LLMO의 정의와 SEO·AEO·GEO의 차이, AI에 인용되는 콘텐츠의 5가지 조건, 성과 측정과 실행 체크리스트를 한 번에 정리합니다.",
  href: "/lab/what-is-llmo",
  thumbVariant: "abstract" as const,
},
```

- [ ] **Step 2: Run the contract test to verify the card link passes**

Run: `node scripts/what-is-llmo-article.test.mjs`  
Expected: `What is LLMO article contract passed.`

### Task 4: Verify the rendered route and record work history

**Files:**
- Modify: `dev-log.md`
- Test: `scripts/what-is-llmo-article.test.mjs`, production build, local browser render.

**Interfaces:**
- Consumes: the completed route and Lab card.
- Produces: a locally verified article and a dated history entry; no git commit or push.

- [ ] **Step 1: Add a topmost `dev-log.md` entry**

```bash
date '+%Y-%m-%d %H:%M'
```

Use the command output as the heading timestamp and add this entry immediately below it:

```md
- 한국어 LLMO 가이드 아티클(`/lab/what-is-llmo`) 추가: SEO·AEO·GEO 비교, 5대 원칙, 성과 지표, 16개 실행 체크리스트 구성
```

- [ ] **Step 2: Run static and production verification**

Run:

```bash
node scripts/what-is-llmo-article.test.mjs
npm run lint
npm run build
git diff --check
```

Expected: the contract script prints its success message, lint/build exit with code 0, and `git diff --check` has no output.

- [ ] **Step 3: Run local visual verification**

Run: `npm run dev` and open `http://localhost:3000/lab/what-is-llmo`.

Check desktop and mobile widths for the Korean hero title, all seven TOC anchors, the comparison table, 16-item checklist, CTA, and the new Lab grid card. Confirm no horizontal overflow and no clipped `h2` text.

## Plan Self-Review

- Spec coverage: Tasks 2 and 3 cover the route, Korean content, TOC, card, metadata, typography, and existing Featured preservation. Task 4 covers local and automated verification plus `dev-log.md`.
- Placeholder scan: no unfinished requirements or unspecified files remain.
- Type consistency: `ArticleTOC` is a named export consumed by the route; the card uses the existing `abstract` thumbnail union member; all required anchors use `s1` through `s7`.
