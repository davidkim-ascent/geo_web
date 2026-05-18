import fs from "node:fs";

const page = fs.readFileSync("src/app/page.tsx", "utf8");
const heroLogo = fs.readFileSync("src/components/layout/HeroLogoMark.tsx", "utf8");

if (!page.includes("<HeroLogoMark />") || !page.includes("サービス資料をダウンロード") || !heroLogo.includes('src="/ascent-geo-logo-split.png"')) {
  throw new Error("Index hero logo expectation failed.");
}

console.log("Index hero logo expectation passed.");
