import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/why-ascent/page.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");

assert.ok(
  source.includes('<div className="overflow-x-clip bg-[#FAFAF7] text-[#0B0B0E]">'),
  "expected Why Ascent to clip horizontal overflow at the page root",
);

assert.ok(
  source.includes('<section className="hero-fixed relative overflow-hidden text-white py-12 lg:py-16"'),
  "expected the Why Ascent hero to contain decorative overflow",
);

assert.ok(
  source.includes('circle-spin absolute right-[-18%] top-[-10%] hidden sm:block'),
  "expected the large hero rings to stay hidden on mobile",
);

assert.ok(
  source.includes('absolute right-8 top-7 hidden sm:block'),
  "expected the live stats badge to stay hidden on mobile",
);

