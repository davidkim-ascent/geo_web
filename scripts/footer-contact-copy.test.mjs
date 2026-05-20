import assert from "node:assert/strict";
import fs from "node:fs";

const footer = fs.readFileSync("src/components/layout/Footer.tsx", "utf8");

assert.ok(!footer.includes("geo@ascentnet.co.jp"), "expected the footer email address to be removed");
assert.ok(footer.includes("TEL: 03-3527-3963"), "expected the footer to include the phone number label");
