import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/lab/seo-geo/page.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");

assert.ok(
  source.includes("SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較"),
  "expected the new article page to keep the source title",
);

assert.ok(
  source.includes('var(--hero-gradient)'),
  "expected the new article hero to use the shared gradient",
);

assert.ok(
  source.includes('minHeight: "0"'),
  "expected the new article hero to use the compact article height",
);

assert.ok(
  source.includes('SEOとは？'),
  "expected the article body to include the SEO definition section",
);

assert.ok(
  source.includes('GEOに強い「質問設計」をするために'),
  "expected the article body to include the question-design section",
);
