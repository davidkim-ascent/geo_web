import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

assert.match(source, /--fs-body:\s*18px;/, "expected the global body font token to be 18px");
assert.match(source, /--fs-h3:\s*26px;/, "expected the global h3 font token to decrease by 5px");
assert.match(source, /font-size:\s*var\(--fs-body\);/, "expected body text to use the global body font token");

const pageSource = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
assert.match(pageSource, /text-marker-highlight/, "expected solution titles to use the marker highlight");
assert.match(pageSource, /s\.label === "GEO Watcher" \|\| s\.label === "GEO診断レポート"/, "expected both solution titles to share the highlighted title treatment");
assert.match(pageSource, /<span className="text-marker-highlight">モニタリングツール「GEO Watcher」<\/span>/, "expected the full hero GEO Watcher phrase to use the marker highlight");
assert.match(pageSource, /<span className="text-marker-highlight">営業提案につなげたい企業には「GEO診断レポート」<\/span>/, "expected the hero GEO diagnosis phrase to use the marker highlight");
assert.match(pageSource, /fontSize: "var\(--fs-body\)"[^>]*>国内最大、7つの主要AIモデルをカバー<\/p>/);
assert.match(pageSource, /fontSize: "var\(--fs-body\)"[^>]*>料金も、使える範囲も、最初から明確に<\/p>/);
