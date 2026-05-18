import fs from "node:fs";

const page = fs.readFileSync("src/app/contact/page.tsx", "utf8");

const expectations = [
  ["hero desc", page.includes("Brand VisibilityやBrand Positionなど具体的な数値。また改善余地をご共有します。所要 30 分のオンライン MTG から。")],
  ["faq q", page.includes('q: "効果はどう計測しますか？"')],
  ["faq a", page.includes("各モデルでのBrand VisibilityやBrand Position。またカスタムプロンプト（質問）ごとにも各モデルでの露出状況をトラッキングします。")],
  ["removed citation struct", !page.includes("Citation 構造")],
  ["removed looker", !page.includes("Looker Studio")],
  ["removed notion", !page.includes("Notion ダッシュボードで継続トラッキング")],
  ["removed share of answer", !page.includes("Share of Answer")],
  ["removed mention", !page.includes("Brand Mention")],
  ["removed passage", !page.includes("Passage 採用率")],
  ["removed ai traffic", !page.includes("AI 流入数")],
];

const failed = expectations.filter(([, ok]) => !ok).map(([name]) => name);

if (failed.length > 0) {
  throw new Error(`Contact copy expectations failed: ${failed.join(", ")}`);
}

console.log("Contact copy expectations passed.");
