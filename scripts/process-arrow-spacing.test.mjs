import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

assert.match(source, /<div className="flex justify-center pt-2 pb-0">/);
assert.match(source, /<div className="grid grid-cols-1 gap-1">/);
