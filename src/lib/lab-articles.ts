export type ArticleThumbnailVariant =
  | "seo-geo"
  | "brand-cep"
  | "geo-llmo-company"
  | "adobe-ai-traffic"
  | "ai-agent-site"
  | "ai-shopping-agent"
  | "llmo-eeat"
  | "entity"
  | "ai-cited-article"
  | "geo-watcher-process"
  | "chatgpt-vs-google-seo"
  | "ai-citation-comparison"
  | "ecommerce-aeo-geo"
  | "geo-llmo-tools"
  | "self-check"
  | "query-fan-out"
  | "what-is-llmo"
  | "abstract";

export type LabArticle = {
  cat: string;
  date: string;
  read: string;
  t: string;
  d: string;
  href: string;
  thumbVariant: ArticleThumbnailVariant;
};

export const LAB_ARTICLES: LabArticle[] = [
  { cat: "HOW TO / GEO Watcher", date: "2026.08.18", read: "9 min", t: "自社でできる！GEO Watcherを使った具体的なGEO・LLMO対策プロセスを解説", d: "GEO Watcherを使ったGEO・LLMO対策の実践プロセスを紹介。現状分析、モニタリング、プロンプト設計、コンテンツ改善の進め方を解説します。", href: "/lab/geo-watcher-process", thumbVariant: "geo-watcher-process" },
  { cat: "GEO / LLMO", date: "2026.05.19", read: "8 min", t: "GEO/LLMO対策におすすめの会社7選を徹底比較", d: "GEO対策会社7社を4つの型で比較し、費用相場・選び方・FAQまで整理した比較記事。", href: "/lab/geo-llmo-company", thumbVariant: "geo-llmo-company" },
  { cat: "SEO vs GEO", date: "2026.05.13", read: "8 min", t: "SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較", d: "SEOは検索エンジンの上位表示を狙う施策、GEOは生成AIに引用されるための施策。違いと実践方法を比較表でわかりやすく整理する。", href: "/lab/seo-geo", thumbVariant: "seo-geo" },
  { cat: "SELF CHECK", date: "2026.08.28", read: "6 min", t: "自社サイトはAIにどれだけ引用されている？セルフチェック方法", d: "ChatGPT・Gemini・Perplexity・Copilotなどの主要AIモデルに自社サイトはどれだけ引用されるかのセルフチェック方法を分かりやすく解説します。", href: "/lab/ai-citation-self-check", thumbVariant: "self-check" },
  { cat: "GEO / LLMO TOOLS", date: "2026.08.26", read: "10 min", t: "GEO・LLMO対策ツール15選！料金や機能などを徹底比較", d: "GEO・LLMO対策ツール15個を料金プラン・対応AIモデル数・機能などの観点から徹底比較。失敗しない選び方から具体的な対策プロセスまで解説。", href: "/lab/geo-llmo-tools", thumbVariant: "geo-llmo-tools" },
  { cat: "COMPARE", date: "2026.08.20", read: "5 min", t: "ChatGPT最適化とGoogle SEOは何が違うのか", d: "Google SEOとChatGPT最適化（AEO/GEO）は、ユーザー行動も施策の単位も異なる。両者の違いと、両立させるための統合戦略を解説する。", href: "/lab/chatgpt-vs-google-seo", thumbVariant: "chatgpt-vs-google-seo" },
  { cat: "GEO / LLMO", date: "2026.08.20", read: "7 min", t: "ChatGPT・Perplexity・Geminiはブランドをどう違って引用・推薦するのか", d: "同じ質問を投げても推薦されるブランドはAIごとに異なる。モデル別の引用方式の違いと、GEO Watcherを使った追跡方法を解説する。", href: "/lab/ai-citation-comparison", thumbVariant: "ai-citation-comparison" },
  { cat: "EC / RETAIL", date: "2026.08.20", read: "6 min", t: "ECサイトのためのAEO・GEO最適化", d: "ユーザーがAIにショップや商品のおすすめを尋ねたとき、自社ブランドが回答に言及される可能性を高める取り組み。実務の優先順位まで解説する。", href: "/lab/ecommerce-aeo-geo", thumbVariant: "ecommerce-aeo-geo" },
  { cat: "ブランド戦略", date: "2026.05.18", read: "10 min", t: "AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ", d: "消費者がAIに状況を話しかける時代、ブランド競争の本質はキーワード順位からCEP（カテゴリーエントリーポイント）の占有へ移行している。GEO戦略の核心を解説する。", href: "/lab/brand-cep", thumbVariant: "brand-cep" },
  { cat: "LLMO / E-E-A-T", date: "2026.06.22", read: "9 min", t: "LLMOにおけるE-E-A-Tの重要性", d: "LLMOではE-E-A-TがAIに引用・推薦されるための信頼シグナルになる。Experience、Expertise、Authoritativeness、Trustworthinessを実務でどう設計するかを整理する。", href: "/lab/llmo-eeat", thumbVariant: "llmo-eeat" },
  { cat: "INDUSTRY REPORT", date: "2026.05.19", read: "8 min", t: "業界別AIトラフィックレポート 2026 Q1 — Adobeレポート", d: "1兆件超の訪問データが示す変化。リテール+393%、旅行+233%など業界別AI訪問増加率と、コンバージョン・エンゲージメントへの影響をグラフで報告。", href: "/lab/adobe-ai-traffic", thumbVariant: "adobe-ai-traffic" },
  { cat: "TECHNICAL GEO", date: "2026.05.19", read: "7 min", t: "AIエージェントはウェブサイトをどう見るのか — 3つの方法とセマンティックHTMLの重要性", d: "画面画像・構造読み取り・組み合わせの3方式を解説。セマンティックHTML・ラベル設計・SSRの実装ポイントまで、AI対応サイト設計の基本を整理します。", href: "/lab/ai-agent-site", thumbVariant: "ai-agent-site" },
  { cat: "AGENTIC COMMERCE", date: "2026.05.21", read: "10 min", t: "AIショッピングの登場とエージェンティックコマース", d: "AIが購買を代行する時代の全体像。自動化6段階・OpenAI/Google/Shopifyのプロトコル競争・エコシステム14領域まで体系的に解説。", href: "/lab/ai-shopping-agent", thumbVariant: "ai-shopping-agent" },
  { cat: "エンティティ / GEO・LLMO", date: "2026.06.24", read: "8 min", t: "エンティティとは？LLMOやGEOなどAI検索の重要性について解説", d: "エンティティを基礎知識から解説。AI検索に引用されるための仕組みやEEATとの関係、自社で可能な対策まで網羅。独自調査：5つのAIエンジンでブランド認識がどれだけ揃うかを検証。", href: "/lab/entity", thumbVariant: "entity" },
  { cat: "GEO / LLMO", date: "2026.07.01", read: "8 min", t: "AIに引用される記事の特徴とは？押さえるべき7つの特徴", d: "AIに引用されやすいコンテンツの特徴や設計ポイントを独自調査データ（52件の引用分析）を交えながら7つのポイントに絞って解説。", href: "/lab/ai-cited-article", thumbVariant: "ai-cited-article" },
  { cat: "GEO / LLMO", date: "2026.09.02", read: "7 min", t: "クエリファンアウトとは？GEO・LLMO対策への活用方法も解説！", d: "クエリファンアウトとは、AIが検索クエリを複数のサブクエリに分解し統合して回答を生成する技術です。GEO・LLMO対策への活用方法も紹介します。", href: "/lab/query-fan-out", thumbVariant: "query-fan-out" },
  { cat: "LLMO", date: "2026.09.03", read: "16 min", t: "LLMOとは？意味・SEOとの違いから対策方法まで完全ガイド", d: "LLMO（大規模言語モデル最適化）の意味、SEO・AIO・AEO・GEOとの違い、具体的な対策5ステップ、KPI測定方法までを完全解説。", href: "/lab/what-is-llmo", thumbVariant: "what-is-llmo" },
];
