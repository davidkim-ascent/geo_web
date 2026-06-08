# Whitepaper Page Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `/whitepaper` so it reflects the Ascent GEO service PDF while keeping the existing layout and download flow intact.

**Architecture:** Keep the current hero, overview, and form sections, but replace the long-form whitepaper copy with concise service-guide messaging pulled from the PDF. Update the download confirmation page so the wording matches the same asset name. Preserve the current styling and component boundaries so the page still feels like the same design system.

**Tech Stack:** Next.js App Router, React, TypeScript, existing whitepaper CSS in `src/app/globals.css`, existing `DownloadForm`.

---

### Task 1: Rewrite whitepaper page copy

**Files:**
- Modify: `src/app/whitepaper/page.tsx`

- [ ] **Step 1: Write the failing test**

```ts
// No dedicated whitepaper test exists yet.
// Verify via targeted inspection that the page still renders the same layout
// while the hero, body, and form copy match the PDF summary.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run lint`
Expected: pass before and after the text rewrite; use it as a guardrail for JSX correctness.

- [ ] **Step 3: Write minimal implementation**

```tsx
// Replace the current 7-chapter whitepaper narrative with concise PDF-aligned
// sections: GEO overview, GEO vs SEO, market impact, service strengths,
// workflow, plans, and a short download CTA.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run lint`
Expected: no lint errors.

### Task 2: Align download confirmation copy

**Files:**
- Modify: `src/app/whitepaper/downloaded/page.tsx`
- Modify: `src/components/whitepaper/DownloadForm.tsx`

- [ ] **Step 1: Write the failing test**

```ts
// No dedicated test file exists.
// Confirm the confirmation page and submit button use the service-guide wording.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run lint`
Expected: pass before and after the copy update.

- [ ] **Step 3: Write minimal implementation**

```tsx
// Update the confirmation text and form submit label to reference the GEO
// service introduction PDF instead of the old generic whitepaper title.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run lint`
Expected: no lint errors.

### Task 3: Record the change

**Files:**
- Modify: `dev-log.md`

- [ ] **Step 1: Write the failing test**

```md
// Ensure the latest work entry appears at the top with a timestamp.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `test -f dev-log.md && sed -n '1,8p' dev-log.md`
Expected: no existing entry for this rewrite at the top.

- [ ] **Step 3: Write minimal implementation**

```md
## 2026-05-22 16:59
- /whitepaper を GEO サービス紹介資料 PDF ベースに再構成し、デザインは維持したまま文言を全面更新
```

- [ ] **Step 4: Run test to verify it passes**

Run: `sed -n '1,8p' dev-log.md`
Expected: new entry appears first.
