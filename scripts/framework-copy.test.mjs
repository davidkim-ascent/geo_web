import fs from "node:fs";

const page = fs.readFileSync("src/app/framework/page.tsx", "utf8");
const loop = fs.readFileSync("src/app/framework/FrameworkLoop.tsx", "utf8");

const expectations = [
  ["page hero", page.includes("質問から最適化までが") && page.includes("一貫した設計")],
  ["page metadata", page.includes('description: "質問から最適化までが、一貫した設計。"')],
  ["phase 01 title", page.includes('title: "質問分析"')],
  ["phase 02 subtitle", page.includes('subtitle: "10点評価モデル"')],
  ["phase 03 title", page.includes('title: "GEOに特化したコンテンツ対策"')],
  ["phase 04 title", page.includes('title: "モニタリング"')],
  ["loop phase 01", loop.includes('{ ix: "01", name: "質問分析", jp: "質問分析" }')],
  ["loop phase 02", loop.includes('{ ix: "02", name: "GAP分析", jp: "10点評価モデル" }')],
  ["loop phase 03", loop.includes('{ ix: "03", name: "GEOに特化したコンテンツ対策", jp: "GEOに特化したコンテンツ対策" }')],
  ["loop phase 04", loop.includes('{ ix: "04", name: "モニタリング", jp: "モニタリング" }')],
];

const failed = expectations.filter(([, ok]) => !ok).map(([name]) => name);

if (failed.length > 0) {
  throw new Error(`Framework copy expectations failed: ${failed.join(", ")}`);
}

console.log("Framework copy expectations passed.");
