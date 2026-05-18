import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8").replace(/\s+/g, " ");

assert.ok(
  source.includes(".article-page {") && source.includes("overflow-x: clip;"),
  "expected article pages to clip accidental horizontal overflow",
);

assert.ok(
  source.includes(".article-body img, .article-body picture, .article-body video, .article-body svg"),
  "expected article media to stay within the content width",
);

assert.ok(
  source.includes(".article-h2 {") && source.includes("white-space: normal;") && source.includes("overflow-wrap: anywhere;"),
  "expected article section headings to wrap on small screens",
);

assert.ok(
  source.includes("@media (max-width: 640px)"),
  "expected mobile-specific article responsive overrides",
);
