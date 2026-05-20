import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/app/lab/geo-llmo-company/page.tsx", import.meta.url), "utf8").replace(/\s+/g, " ");

assert.ok(
  !source.includes("Samsung Japanをはじめとする企業のAI Visibility改善を支援。"),
  "expected the geo-llmo-company article to omit the removed support statement",
);
