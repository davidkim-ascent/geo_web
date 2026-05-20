import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pages = [
  "../src/app/page.tsx",
  "../src/app/why-ascent/page.tsx",
  "../src/app/framework/page.tsx",
  "../src/app/services/page.tsx",
  "../src/app/lab/page.tsx",
  "../src/app/lab/geo-llmo-company/page.tsx",
  "../src/app/lab/seo-geo/page.tsx",
  "../src/app/lab/brand-cep/page.tsx",
  "../src/app/lab/ai-agent-site/page.tsx",
  "../src/app/lab/adobe-ai-traffic/page.tsx",
];

for (const file of pages) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8").replace(/\s+/g, " ");
  assert.ok(source.includes("SeoGeoCTASection"), `${file} should import SeoGeoCTASection`);
  assert.ok(source.includes("<SeoGeoCTASection"), `${file} should render SeoGeoCTASection`);
  assert.ok(!source.includes("<CTASection"), `${file} should no longer render CTASection`);
}

const sharedSource = readFileSync(new URL("../src/components/layout/SeoGeoCTASection.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");
assert.ok(sharedSource.includes("GEO対策、専門コンサルタントにご相談ください"), "shared CTA should use the global GEO copy");
