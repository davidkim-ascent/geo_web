import fs from "node:fs";

const targets = [
  "src/app/page.tsx",
  "src/app/why-ascent/page.tsx",
  "src/app/framework/page.tsx",
  "src/app/services/page.tsx",
  "src/app/lab/page.tsx",
  "src/app/contact/page.tsx",
];

const component = fs.readFileSync("src/components/layout/HeroLogoMark.tsx", "utf8");

if (!component.includes('src="/ascent-geo-logo-split.png"')) {
  throw new Error("Hero logo component does not reference the split logo asset.");
}

for (const file of targets) {
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes("<HeroLogoMark />")) {
    throw new Error(`Missing hero logo mark in ${file}`);
  }
}

console.log("Hero logo mark expectation passed.");
