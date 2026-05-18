# SEO GEO Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new GEO Lab article page that keeps the attached SEO/GEO source text intact while presenting it in the same editorial layout language as `lab-ai-overview`.

**Architecture:** Create a dedicated article route under `src/app/lab/seo-geo/` with its own TOC component and a dark hero summary panel. Keep the article body as structured sections, tables, and callouts derived from the source text without rewriting the prose. Update the lab landing page and article index so the new article is discoverable from existing GEO Lab entry points.

**Tech Stack:** Next.js App Router, React server components, Tailwind CSS utility classes, existing GEO Lab typography and article patterns, Node smoke tests in `scripts/`.

---

### Task 1: Add a route smoke test for the new article

**Files:**
- Create: `scripts/seo-geo-article.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/app/lab/seo-geo/page.tsx', import.meta.url), 'utf8').replace(/\s+/g, ' ')

assert.ok(source.includes('SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較'))
assert.ok(source.includes('var(--hero-gradient)'))
assert.ok(source.includes('var(--hero-height)'))
assert.ok(source.includes('GEOに強い「質問設計」をするために'))
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/seo-geo-article.test.mjs`
Expected: FAIL because `src/app/lab/seo-geo/page.tsx` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create the page and TOC files, then make the page source contain the title and shared hero tokens required by the test.

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/seo-geo-article.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/seo-geo-article.test.mjs src/app/lab/seo-geo
git commit -m "feat: add seo geo lab article"
```

### Task 2: Build the new article route and TOC

**Files:**
- Create: `src/app/lab/seo-geo/page.tsx`
- Create: `src/app/lab/seo-geo/ArticleTOC.tsx`

- [ ] **Step 1: Implement the page shell**

Use the same article structure language as `lab-ai-overview`: breadcrumb, dark hero, author/date/read meta, desktop TOC, and a two-column body layout.

- [ ] **Step 2: Map the source text into sections**

Create sections for:
`SEOとは？`, `GEOとは？`, comparison table, reasons GEO is growing, seven principles, question design, FAQ, summary.

- [ ] **Step 3: Preserve the source wording**

Do not paraphrase the attached prose. Keep headings, definitions, bullet points, table rows, CTA lines, and FAQ answers in the original Japanese wording.

- [ ] **Step 4: Run a local build/lint check**

Run: `npm run lint`
Expected: pass with no new ESLint errors in the article files.

### Task 3: Surface the article from GEO Lab entry points

**Files:**
- Modify: `src/app/lab/page.tsx`
- Modify: `src/app/lab/LabArticles.tsx`

- [ ] **Step 1: Add the new article card**

Add a featured/list card pointing to `/lab/seo-geo` with the source title and a short summary pulled from the attached text.

- [ ] **Step 2: Keep existing article data intact**

Only insert the new article; do not remove or retitle the existing GEO Lab cards.

- [ ] **Step 3: Re-run the smoke test and lint**

Run:
`node scripts/seo-geo-article.test.mjs`
`npm run lint`
Expected: both pass.

### Task 4: Record the work

**Files:**
- Modify: `dev-log.md`

- [ ] **Step 1: Add a newest-first log entry**

Record the article addition with the current date and time, summarizing that the SEO/GEO article was turned into a GEO Lab-style page while preserving the source text.

- [ ] **Step 2: Verify the log entry order**

Confirm the new entry is at the top of `dev-log.md`.
