import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cases = [
  {
    file: "src/app/page.tsx",
    title: "Ascent GEO（アセント GEO） - 株式会社 Ascent Networks",
    description:
      "推測ではなく、データと特許に基づくGEO戦略。特許分析と実消費者インテントに基づくGEO戦略を、Ascentが設計します。",
  },
  {
    file: "src/app/why-ascent/page.tsx",
    title: "Why Ascent | Ascent GEOの強み - 株式会社 Ascent Networks",
    description:
      "AI はどこから、なぜ引用するのか。Ascentは特許ベースGEO施策・消費者インテント・スコアリングという3本の柱で、データを解明します。",
  },
  {
    file: "src/app/framework/page.tsx",
    title: "GEO Framework | 5つの循環設計 - 株式会社 Ascent Networks",
    description:
      "質問分析・GAP分析・コンテンツ対策・モニタリング・最適化ループ。5フェーズで、AIに引用される状態を設計するAscent GEOのフレームワーク。",
  },
  {
    file: "src/app/services/page.tsx",
    title: "Services | Ascent GEOのサービス詳細 - 株式会社 Ascent Networks",
    description:
      "サイト診断からモニタリングまで一気通貫でサポート。単発でも継続運用でも対応。AIに引用されるブランドの可視化、設計、改善を支援します。",
  },
  {
    file: "src/app/lab/page.tsx",
    title: "GEO Lab | AI検索リサーチハブ - 株式会社 Ascent Networks",
    description:
      "AI検索時代に引用される知識を、実データに基づき分析。特許・消費者インテント・GEO戦略など、Ascent GEO Labで体系的に学べます。",
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
