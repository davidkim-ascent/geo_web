import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pages = [
  "../src/app/page.tsx",
  "../src/app/why-ascent/page.tsx",
  "../src/app/framework/page.tsx",
  "../src/app/services/page.tsx",
  "../src/app/lab/page.tsx",
];

for (const file of pages) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8").replace(/\s+/g, " ");
  assert.ok(source.includes("SeoGeoCTASection"), `${file} should import SeoGeoCTASection`);
  assert.ok(source.includes("<SeoGeoCTASection"), `${file} should render SeoGeoCTASection`);
  assert.ok(!source.includes("<CTASection"), `${file} should no longer render CTASection`);
}

const seoGeoSource = readFileSync(new URL("../src/app/lab/seo-geo/page.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");
assert.ok(seoGeoSource.includes("GEO対策、まずは無料相談から"), "/lab/seo-geo should keep the article CTA copy");
