import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");

assert.ok(
  source.includes('<svg className="w-full h-40" viewBox="0 0 1200 160" preserveAspectRatio="none" style={{ display: "block", background: "#ffffff" }}>'),
  "expected the challenges section to keep a full-width divider svg with a white backdrop",
);

assert.ok(
  source.includes('<polygon points="0,0 1200,0 600,160" fill="#d4e8f7" />'),
  "expected the challenges section bottom divider to use a straight diagonal polygon",
);

assert.ok(
  source.includes('className="relative pt-24 pb-0 overflow-hidden"') && source.includes('relative z-10 pb-24'),
  "expected the spacing before the divider to live inside the content wrapper, not after the divider",
);

assert.match(
  source,
  /background: "linear-gradient\(180deg, #b8d9ef 0%, #d4e8f7 72%, #d4e8f7 100%\)"/,
  "expected the challenges section to use a darker-top blue gradient",
);

assert.ok(
  source.includes('s.label === "GEO Watcher" || s.label === "GEO診断レポート"') && source.includes('viewBox="0 0 24 120"') && source.includes('<polygon points="0,0 13,0 24,112 17,120" fill="#1688c5" />') && source.includes('<polygon points="11,0 24,0 7,120 0,112" fill="#1688c5" />'),
  "expected both solution copy blocks to have centered tapered blue side accents",
);
