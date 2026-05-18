import fs from "node:fs";

const page = fs.readFileSync("src/app/services/page.tsx", "utf8");
const faq = fs.readFileSync("src/app/services/ServicesFAQ.tsx", "utf8");

const expectations = [
  ["hero label", page.includes('label: "10点GAP分析\\n　定量評価"')],
  ["quad label", page.includes('title: "10点GAP分析\\n　定量評価"')],
  ["gap title", page.includes('title: "質問とコンテンツの距離を、"')],
  ["gap accent", page.includes('accent: "10点で。"')],
  ["gap lede", page.includes("引用最適化4項目、10点満点でスコアリング。どの質問に対し、どのコンテンツが、なぜ引用されないのかを、点数とロジックで明らかにする。")],
  ["gap metric", page.includes("10点モデルによる評価")],
  ["gap axis", page.includes('l: "評価軸", v: "10 ポイント"')],
  ["content lede", page.includes("質問形ヘッダー、Passage Optimization、FAQ Schema を中心に、AI Answer Engine が抜き出しやすい単位でコンテンツを設計・執筆。")],
  ["monitor lede", page.includes("Visibility / Citation / AI Traffic レポートを月次で提出。改善提案までを一貫してサポート。GEO は施策ではなく、運用である。")],
  ["monitor note", page.includes("月次提出 / 改善提案 / 運用更新")],
  ["package title", page.includes("単発でも、") && page.includes("継続") && page.includes("でも対応可能")],
  ["package support", page.includes("事業規模・フェーズに合わせてプランをお選びいただけます。")],
  ["package name", page.includes("GEO診断（4 AI Engine）") && page.includes("FULL SUPPORT")],
  ["package item", page.includes("月次レポート共有")],
  ["faq", faq.includes("GEO診断だけを単発で依頼できますか？")],
  ["removed slack", !page.includes("Slack 連携 / 改善アラート") && !page.includes("下落アラート（Slack / Email）") && !page.includes("Slack 連携")],
  ["removed authority", !page.includes("Authority Signal") && !page.includes("Authority リンクの最適化")],
  ["removed twelve", !page.includes("12点 GAP 分析") && !page.includes("12 点モデル") && !page.includes("12 ポイント")],
];

const failed = expectations.filter(([, ok]) => !ok).map(([name]) => name);

if (failed.length > 0) {
  throw new Error(`Services copy expectations failed: ${failed.join(", ")}`);
}

console.log("Services copy expectations passed.");
