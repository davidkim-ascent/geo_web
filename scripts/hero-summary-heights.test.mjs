import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 1600 } });

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const heights = await page
  .locator('div.relative.flex.flex-col.items-center.gap-6.rounded-2xl.border.border-\\[\\#003393\\]\\/30.p-8.pt-9 > div.flex.flex-col')
  .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));

assert.equal(heights.length >= 2, true, "expected both hero summary blocks to exist");
assert.equal(Math.abs(heights[0] - heights[1]) <= 8, true, `expected hero summary blocks to be nearly equal, got ${heights[0]} and ${heights[1]}`);

await browser.close();
