import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

assert.match(source, /ChevronRight/, "expected hero CTA buttons to use a chevron icon");
assert.equal((source.match(/!max-w-\[320px\]/g) ?? []).length, 2, "expected both hero CTA buttons to share the same width");
assert.equal((source.match(/rounded-full border-2 border-white/g) ?? []).length, 2, "expected both hero CTA buttons to include a circular icon");
assert.match(source, /<span className="font-bold">GEO Watcherをもっと見る<\/span>/, "expected the left hero CTA text to be updated and bold");
assert.match(source, /<span className="font-bold">GEO診断レポートをもっと見る<\/span>/, "expected the right hero CTA text to be updated and bold");
assert.equal((source.match(/<span className="font-bold">GEO Watcherをもっと見る<\/span>|<span className="font-bold">GEO診断レポートをもっと見る<\/span>/g) ?? []).length, 2, "expected both hero CTA labels to be bold");
assert.equal((source.match(/!h-\[52px\] !min-h-\[52px\] !max-h-\[52px\]/g) ?? []).length, 2, "expected both hero CTA buttons to share the same fixed height");
assert.equal((source.match(/<Link href="\/(?:watcher|shindan)" className="flex h-full w-full items-center justify-center gap-0">/g) ?? []).length, 2, "expected both hero CTA links to center their contents with consistent spacing");
assert.doesNotMatch(source, /モニタリングツール GEO Watcherへ|診断レポートツール GEO 診断へ/, "expected old hero CTA text to be removed");
assert.match(source, /<span key=\{tag\} className="text-\[#4e4e51\] bg-black\/\[0\.04\] rounded-full px-3 py-1\.5" style=\{\{ fontSize: "var\(--fs-label-sm\)" \}\}>[\s\n]*\{tag\}[\s\n]*<\/span>/, "expected right hero tags to match the left tag font size");
assert.doesNotMatch(source, /text-\[13px\] text-\[#4e4e51\] bg-black\/\[0\.04\] rounded-full px-3 py-1\.5/, "expected right hero tags not to use a smaller fixed font size");
assert.equal((source.match(/<p[^>]*font-bold[^>]*fontSize: "var\(--fs-body\)"[^>]*>国内最大、7つの主要AIモデルをカバー<\/p>/g) ?? []).length, 1);
assert.equal((source.match(/<p[^>]*font-bold[^>]*fontSize: "var\(--fs-body\)"[^>]*>料金も、使える範囲も、最初から明確に<\/p>/g) ?? []).length, 1);
assert.match(source, /<p key=\{line\}[^>]*font-bold[^>]*fontSize: "var\(--fs-body\)"[^>]*>\{line\}<\/p>/);
assert.match(source, /<h3[^>]*text-\[#003393\][^>]*>.*AI対策ツール「GEO Watcher」.*<\/h3>/s);
assert.match(source, /<h3[^>]*fontSize: "var\(--fs-h3\)"[^>]*>.*AI対策ツール「GEO Watcher」.*<\/h3>/s);
assert.match(source, /<span className="text-marker-highlight-blue">AI対策ツール「GEO Watcher」<\/span>/);
assert.match(source, /<h3[^>]*text-\[#003393\][^>]*>.*法人営業向け「GEO診断レポート」.*<\/h3>/s);
assert.match(source, /<h3[^>]*fontSize: "var\(--fs-h3\)"[^>]*>.*法人営業向け「GEO診断レポート」.*<\/h3>/s);
assert.match(source, /<span className="text-marker-highlight-blue">法人営業向け「GEO診断レポート」<\/span>/);

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
assert.match(css, /\.text-marker-highlight-blue/, "expected a light blue marker highlight class");
assert.match(css, /#c7e8ff 48%, #c7e8ff 94%/, "expected the blue marker highlight to be soft but visible");
