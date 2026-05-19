import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cases = [
  {
    file: "src/app/page.tsx",
    title: "Ascent GEO・LLMO（アセント GEO・LLMO）- 株式会社 Ascent Networks",
    description:
      "推測ではなく、データと特許に基づくGEO戦略。特許分析と実消費者インテントに基づくGEO戦略を、Ascentが設計します。",
  },
  {
    file: "src/app/why-ascent/page.tsx",
    title: "Ascent GEO・LLMOの強み - 株式会社 Ascent Networks",
    description:
      "AI は「どこから、なぜ」引用するのか。Ascentは特許ベースGEO施策・消費者インテント・スコアリングという3本の柱で、データを解明します。",
  },
  {
    file: "src/app/framework/page.tsx",
    title: "Ascent GEO・LLMO Framework | 5つの循環設計 - 株式会社 Ascent Networks",
    description:
      "質問分析・GAP分析・コンテンツ対策・モニタリング・最適化ループ。5フェーズで、AIに引用され続ける状態を設計するAscentのGEOフレームワーク。",
  },
  {
    file: "src/app/services/page.tsx",
    title: "Ascent GEO・LLMOのサービス詳細 - 株式会社Ascent Networks",
    description:
      "サイト診断からモニタリングまで一貫してサポート。単発でも継続運用でも対応。AIに引用されるブランドをフルスペックで支援します。",
  },
  {
    file: "src/app/lab/page.tsx",
    title: "Ascent GEO Lab | AI検索リサーチハブ - 株式会社 Ascent Networks",
    description:
      "AI検索時代に引用されるための知識を、実データと実務から発信。特許・消費者インテント・GEO設計まで、Ascent GEO Labで体系的に学べます。",
  },
  {
    file: "src/app/contact/page.tsx",
    title: "Ascent GEO・LLMO 無料相談",
    description: "GEO・LLMOのお問い合わせはこちらから。",
  },
  {
    file: "src/app/lab/seo-geo/page.tsx",
      titleParts: [
      'const PAGE_TITLE = "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較";',
      'title: `${PAGE_TITLE} - 株式会社 Ascent Networks`',
    ],
    description:
      "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策です。違いと実践方法を比較表を用いてわかりやすく解説します。",
  },
  {
    file: "src/app/lab/brand-cep/page.tsx",
    titleParts: [
      'const PAGE_TITLE = "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ";',
      'title: `${PAGE_TITLE} - 株式会社 Ascent Networks`',
    ],
    description:
      "消費者がAIに状況を話しかける時代、ブランドは「キーワード競争」から「CEP（カテゴリーエントリーポイント）の占有」へ戦略を転換する必要があります。GEO視点でCEP設計を解説します。",
  },
];

for (const { file, title, titleParts, description } of cases) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8").replace(/\s+/g, " ");
  if (title) {
    assert.ok(source.includes(title), `${file} should include the SEO title`);
  }
  if (titleParts) {
    for (const part of titleParts) {
      assert.ok(source.includes(part), `${file} should include the SEO title part: ${part}`);
    }
  }
  assert.ok(source.includes(description), `${file} should include the meta description`);
}

console.log("Page SEO metadata expectations passed.");
