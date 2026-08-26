import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LabArticleCTASection } from "@/components/layout/LabArticleCTASection";
import { ArticleTOC } from "./ArticleTOC";
import { buildPageMetadata } from "@/lib/seo";
import shimadaImage from "./shimada.png";
import heroCollage from "./hero-collage.png";
import geoWatcherShot from "./tool-shots/geo-watcher.png";
import aisearchmapShot from "./tool-shots/aisearchmap.png";
import semrushShot from "./tool-shots/semrush.png";
import mierukaGeoShot from "./tool-shots/mieruka-geo.png";
import tactSeoShot from "./tool-shots/tact-seo.png";
import geoSignalsShot from "./tool-shots/geo-signals.png";
import akarumiShot from "./tool-shots/akarumi.png";
import dolphinxAioShot from "./tool-shots/dolphinx-aio.png";
import llmoCompassShot from "./tool-shots/llmo-compass.png";
import hubspotAeoShot from "./tool-shots/hubspot-aeo.png";
import llmoinsightShot from "./tool-shots/llmoinsight.png";
import geoHackSuiteShot from "./tool-shots/geo-hack-suite.png";
import superActShot from "./tool-shots/super-act.png";
import ahrefsBrandRadarShot from "./tool-shots/ahrefs-brand-radar.png";

const PAGE_TITLE = "GEO・LLMO対策ツール15選！料金や機能などを徹底比較";
const PAGE_DESCRIPTION =
  "GEO・LLMO対策ツール15個を料金プラン・対応AIモデル数・機能などの観点から徹底比較。失敗しない選び方から具体的な対策プロセスまで解説。";

const _base = buildPageMetadata({
  title: `${PAGE_TITLE} - Ascent GEO`,
  description: PAGE_DESCRIPTION,
  path: "/lab/geo-llmo-tools",
  keywords: ["GEO対策", "LLMO対策", "AIO対策", "AEO対策", "GEO対策ツール", "LLMO対策ツール", "AI検索対策"],
});

export const metadata: Metadata = {
  ..._base,
  openGraph: {
    ..._base.openGraph,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
  },
  twitter: {
    ..._base.twitter,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export const dynamic = "force-static";

const COMPARISON_TABLE = [
  ["GEO Watcher", "29,800円〜/月", "20〜100", "6（Claudeはオプション）", "毎日"],
  ["AIsearchmap", "無料（フリープラン）", "25", "最大5", "非公開"],
  ["Semrush", "16,335円〜/月", "25〜200", "最大3", "毎日（上位プラン）"],
  ["ミエルカGEO", "54,780円〜", "100〜", "最大6", "一部日次"],
  ["TACT SEO（TACT AIOクローリング）", "要問い合わせ", "非公開", "1", "週1回〜月次"],
  ["GEO Signals", "10,780円〜/月", "10〜30", "2〜3", "週2回"],
  ["AKARUMI", "個別見積", "50〜200", "最大5", "毎日"],
  ["DolphinX AIO", "33,000円〜/6か月", "20〜80", "4", "毎日"],
  ["LLMOコンパス（Bring Ritera）", "0円〜（年払い）", "1〜3,500", "最大6", "実行時"],
  ["HubSpot AEO", "6,000円〜/月", "25", "3", "毎日"],
  ["LLMOinsight", "0円〜", "6〜20", "5", "非公開"],
  ["GEO Hack Suite", "14,800円〜/年払い", "30〜1,000", "最大5", "毎日"],
  ["AIタナドリ", "0円（無料診断）", "非公開", "1〜4", "都度実行"],
  ["SUPER ACT", "15,000円〜", "10〜", "6", "非公開"],
  ["Ahrefs Brand Radar", "107,800円〜", "2,500", "6", "非公開"],
];

const SEO_VS_GEO_ROWS = [
  ["対象", "ChatGPT・Gemini・Perplexity・AI Overviewsなどの生成AIモデル", "Google・Yahoo!などの検索エンジン"],
  ["ゴール", "AI回答文への引用・推薦", "検索結果ページでの上位表示"],
  ["最適化フォーカス", "エンベディング類似度・構造化データ・引用価値", "キーワード・被リンク・トピックモデリング"],
  ["ユーザー行動", "AI回答で完結、または引用元として遷移", "検索結果をクリックして訪問"],
  ["成果指標", "引用率・Brand Visibility・シェア・オブ・ボイス", "検索順位・流入数・CTR"],
];

const SELECTION_POINTS = [
  { title: "目的に合うツールを探す", desc: "「モニタリング特化型」か「施策提案まで対応する型」かを整理し、現状把握・改善アクションのどちらを求めているかを明確にする。" },
  { title: "データの信頼性", desc: "更新頻度が毎日か週次か、実際の検索データに基づいているかなど、データの取得方法を確認する。" },
  { title: "改善施策の提示があるか", desc: "数値の可視化だけでなく、どのコンテンツをどう改善すべきかまで提案してくれるかを確認する。" },
  { title: "運営会社のサポート体制", desc: "プロンプト設計やコンテンツ改善についてスポットで相談できる体制があるかを確認する。" },
];

const TOOLS = [
  {
    name: "GEO Watcher",
    url: "https://geo.ascentnet.co.jp/",
    image: geoWatcherShot,
    lede:
      "株式会社Ascent Networksが提供するGEO・LLMO対策のモニタリングツール。ChatGPT、Gemini、Perplexity、Google AI Overviews、AI Mode、Microsoft Copilotの主要6AIに標準対応し（Claudeはオプション）、自社・競合ブランドの言及や引用状況を毎日自動で計測する。ブランド名とURLを登録するだけでプロンプトや競合他社が自動生成されるため、専門知識がなくてもすぐに運用を開始できる。月額プランに加えて、プロンプト設計やコンテンツ改善診断を単発で依頼できる「スポットサポート」も用意されている。",
    rows: [
      ["運営会社", "株式会社Ascent Networks"],
      ["料金プラン", "ライト29,800円/月、スタンダード39,800円/月、アドバンス79,800円/月（年払いは2か月分お得）"],
      ["プロンプト数", "20〜100（オプションで10個ずつ追加可能）"],
      ["対応AIモデル", "ChatGPT・Gemini・Perplexity・Google AI Overviews・AI Mode・Copilotの6AI標準対応（Claudeはオプション）"],
      ["更新頻度", "毎日"],
      ["データ保存期間", "過去365日分"],
      ["特徴", "最大20社の競合比較、CSVエクスポート、プロンプト設計・コンテンツ改善診断のスポットサポートあり"],
    ],
  },
  {
    name: "AIsearchmap",
    url: "https://aisearchmap.jp/",
    image: aisearchmapShot,
    lede:
      "株式会社CINCが提供するAI検索最適化（GEO/LLMO）の現在地を分析・モニタリングするツール。AIモデル別のブランド露出シェアや言及の時系列グラフ、引用URLドメインの可視化などができる。無料のフリープランに加え、プロンプト数・対応AIモデル・分析対象ブランド数を柔軟にカスタマイズできるエンタープライズプラン（月額5万円〜）が用意されており、代理店やマーケティング支援会社が顧客向けレポートに活用することも可能。",
    rows: [
      ["運営会社", "株式会社CINC"],
      ["料金プラン", "フリー0円/月、エンタープライズ5万円〜/月（個別見積）"],
      ["プロンプト数", "25"],
      ["対応AIモデル", "フリープランはChatGPTのみ。エンタープライズプランはChatGPT・Gemini・Perplexity・Google AI Mode・Google AI Overviewsの中から個別に選択可能（最大5モデル）"],
      ["更新頻度", "非公開"],
      ["特徴", "プロンプト自動生成機能（プロンプトジェネレーター）、SEO国内認知度の高いKeywordmapの運営会社（CINC）が提供。法人向けサービスで、エンタープライズプランは請求書払いにも対応"],
    ],
  },
  {
    name: "Semrush",
    url: "https://semrush.jp/enterprise/",
    image: semrushShot,
    lede:
      "世界1,000万ユーザーが利用するSEO・広告・SNS分析を含むオールインワン型の競合分析ツール。日本では株式会社オロが正規代理店として提供しており、AIモデル別のブランド言及分析やポジネガ判定、引用サイトのコンテンツ分析まで一括で行える。",
    rows: [
      ["運営会社", "株式会社オロ（正規代理店）"],
      ["料金プラン", "Starter 32,835円/月、Pro 49,335円/月、ADVANCED 90,585円/月、AI Visibility 16,335円/月"],
      ["プロンプト数", "50〜200"],
      ["対応AIモデル", "ChatGPT・Gemini・Google AI Overviewなど最大3モデル"],
      ["更新頻度", "毎日（ADVANCED以上のプラン）"],
      ["特徴", "ポジネガ判定・改善策提示あり、GA4連携、SEOツールとしての実績が豊富"],
    ],
  },
  {
    name: "ミエルカGEO",
    url: "https://mieru-ca.com/geo/",
    image: mierukaGeoShot,
    lede:
      "株式会社Faber Companyが提供するGEO（AI検索・LLMO・AIO）対策・診断ツール。累計1,900社以上のSEO支援実績をもとに、AI検索時代に必要な機能を厳選して提供している。AIOに生成されたテキスト内容の計測や、クエリファンアウト分析（関連検索クエリの分析）が特徴。",
    rows: [
      ["運営会社", "株式会社Faber Company"],
      ["料金プラン", "単一サイト54,780円、複数サイト109,780円、AI検索シェアモニタリングは基本料金＋50,000円〜/月"],
      ["プロンプト数", "100〜"],
      ["対応AIモデル", "ChatGPT・Gemini・Google AI Overviews・Perplexity・Microsoft Copilot・Google AIモードなど最大6モデル"],
      ["更新頻度", "一部日次"],
      ["特徴", "AI検索流入レポート（GA4連携）、AIO詳細レポート、GEOコンサルオプションあり"],
    ],
  },
  {
    name: "TACT SEO（TACT AIOクローリング）",
    url: "https://tact-seo.com/",
    image: tactSeoShot,
    lede:
      "株式会社ウィルゲートが提供するAIO（AI Overviews）モニタリングサービス。週次でのAIO出現数やキーワード引用状況、競合比較をモニタリングできるほか、GA4と連携することでAI経由の流入をグラフ化できる点が特徴。",
    rows: [
      ["運営会社", "株式会社ウィルゲート"],
      ["料金プラン", "基本契約は要問い合わせ（参考：週1回更新プランで50,000円）"],
      ["プロンプト数", "プロンプト登録型ではない"],
      ["対応AIモデル", "Google AI Overviews"],
      ["更新頻度", "週1回〜月次"],
      ["特徴", "GA4連携による生成AI流入レポート、競合登録は最大5社まで"],
    ],
  },
  {
    name: "GEO Signals",
    url: "https://geo-signals.com/",
    image: geoSignalsShot,
    lede:
      "株式会社コーボーが提供するAI回答の言及・引用を定点観測するSaaS。海外製の多機能・エンタープライズ向けツールが多いなか、必要な機能を絞り込むことで金額面のコストパフォーマンスを重視した設計になっている。",
    rows: [
      ["運営会社", "株式会社コーボー"],
      ["料金プラン", "Standard 10,780円/月、Pro 21,780円/月"],
      ["プロンプト数", "10〜30"],
      ["対応AIモデル", "ChatGPT・Gemini・Google AI Overviewsなど2〜3モデル"],
      ["更新頻度", "週2回"],
      ["データ保存期間", "3〜12か月"],
      ["特徴", "プロンプトクラスタ分類、TikTok・Reddit調査機能"],
    ],
  },
  {
    name: "AKARUMI",
    url: "https://akarumi.jp/",
    image: akarumiShot,
    lede:
      "株式会社ipeが提供するLLM時代のブランド「AI認識」を可視化する戦略プラットフォーム。ブランド言及順位や自社URL引用状況に加え、AIクローラーのアクセスログ分析やチームアカウント管理機能まで備えている。",
    rows: [
      ["運営会社", "株式会社ipe"],
      ["料金プラン", "ライト・スタンダード・エキスパートの3プラン（いずれも個別見積）"],
      ["プロンプト数", "50〜200"],
      ["対応AIモデル", "ChatGPT・Gemini・AIO・Perplexity・Claudeなど最大5モデル"],
      ["更新頻度", "毎日"],
      ["特徴", "AIボットのアクセスログ分析、オンボーディング時の自動プロンプト分析"],
    ],
  },
  {
    name: "DolphinX AIO",
    url: "https://dolphinx.jp/aio",
    image: dolphinxAioShot,
    lede:
      "国産のAI支援型SEO・AIO（LLMO）対策プラットフォーム。データをAIが読み解き、優先順位付きで施策を提案してくれる点が特徴で、FAQ記事などのAI記事自動生成機能も備えている。6か月契約（年払い）でライト・プロ・ビジネスの3プランを用意。",
    rows: [
      ["料金プラン", "ライト33,000円、プロ55,000円、ビジネス110,000円（いずれも6か月契約・年払い）"],
      ["プロンプト数", "20〜80"],
      ["対応AIモデル", "Google AI Mode・ChatGPT・Gemini・Copilotの4モデル"],
      ["更新頻度", "毎日"],
      ["特徴", "AI記事自動生成（8ステップで記事を作成）、AIチャット機能"],
    ],
  },
  {
    name: "LLMOコンパス（Bring Ritera）",
    url: "https://ritera.bring-flower.com/llmo-compass",
    image: llmoCompassShot,
    lede:
      "AIツールグランプリ2024で最優秀賞を獲得したLLMO対策分析ツール。自社・競合ブランドの言及順位やAIモデル別の参照URL、ブランドクエリの検索ボリューム（GA4連携）などを分析できる。フリープランから始められる料金体系も特徴。",
    rows: [
      ["運営会社", "Bring Ritera"],
      ["料金プラン", "フリー0円、スタンダード3,000円/月（年払い）、プロ9,000円/月（年払い）、エンタープライズ30,000円/月（年払い）"],
      ["プロンプト数", "1〜3,500"],
      ["対応AIモデル", "AI Overviews・AI Mode・ChatGPT・Gemini・Claude・Perplexityなど最大6モデル"],
      ["更新頻度", "実行時"],
      ["特徴", "ブランドクエリ検索量のGA4連携、AIライティングのオプション機能"],
    ],
  },
  {
    name: "HubSpot AEO",
    url: "https://www.hubspot.jp/products/aeo",
    image: hubspotAeoShot,
    lede:
      "HubSpotが提供するAIプレゼンス追跡機能。自社・競合ブランドの言及に加え、言及内容のセンチメント（好意・中立・否定）分類や、ページ作成・技術的修正・動画制作といった具体的な推奨アクションの提示まで対応している。",
    rows: [
      ["運営会社", "HubSpot"],
      ["料金プラン", "6,000円/月（年払い、1ブランドにつき）"],
      ["プロンプト数", "25"],
      ["対応AIモデル", "ChatGPT・Perplexity・Geminiの3モデル"],
      ["更新頻度", "毎日"],
      ["特徴", "センチメント分類、改善アクションの推奨提示。データ保持期間はHubSpotの設定に準拠"],
    ],
  },
  {
    name: "LLMOinsight",
    url: "https://llmo-insight.jp/",
    image: llmoinsightShot,
    lede:
      "AI回答におけるブランド露出・推薦順位・引用元・競合比較を計測し、「なぜ選ばれているのか」まで可視化するLLMO/GEO分析プラットフォーム。改善提案をスコア化してカード形式で提示する機能や、月数本のコンテンツ生成機能も備えている。",
    rows: [
      ["料金プラン", "Free 0円、Standard 9,800円、Business 29,800円"],
      ["プロンプト数", "6〜20"],
      ["対応AIモデル", "ChatGPT・Gemini・Claude・Perplexity・Google AI Overviewsの5モデル"],
      ["更新頻度", "非公開（Freeプランは初回分析のみ）"],
      ["データ保存期間", "6か月〜2年（プランによる）"],
      ["特徴", "改善提案のカードビュー表示、月2〜8本のコンテンツ生成機能"],
    ],
  },
  {
    name: "GEO Hack Suite",
    url: "https://jinrai.co.jp/geo-hack-suite/",
    image: geoHackSuiteShot,
    lede:
      "ChatGPT・Perplexity・Gemini・Google AI概要での自社引用を毎日自動計測し、診断からリライト優先度の判定、記事制作、効果測定までを一気通貫で行えるフルスタックGEOプラットフォーム。APIキー持ち込みによる割安プランも用意されている。",
    rows: [
      ["料金プラン", "ライト14,800円、スタンダード39,800円、プロ89,800円（いずれも年払い）。APIキー持ち込みプランは9,800円〜も選択可"],
      ["プロンプト数", "30〜1,000"],
      ["対応AIモデル", "ChatGPT・Perplexity・Gemini・Google AI Overviews・Claudeなど最大5モデル"],
      ["更新頻度", "毎日"],
      ["特徴", "サイト診断（robots.txt・llms.txt）、Search Console連携によるコンテンツ改善提案、AI記事自動生成"],
    ],
  },
  {
    name: "AIタナドリ",
    url: "https://retailer.orosy.com/",
    lede:
      "B2B卸・D2Cブランドに特化したLLMOツール。ChatGPTやGeminiに「小ロットで仕入れられる〇〇」といったバイヤー視点の質問を投げかけ、AIが推薦するブランドを分析できる。無料診断から始められ、4AI横断のフルレポートは買い切り課金で利用できる。",
    rows: [
      ["料金プラン", "無料診断0円、4AI横断レポート550円/回（買い切り・期間限定価格）"],
      ["プロンプト数", "非公開"],
      ["対応AIモデル", "ChatGPT（無料診断）、ChatGPT・Gemini・Perplexity・Claudeの4モデル（横断レポート）"],
      ["更新頻度", "診断・レポート実行時"],
      ["特徴", "都度課金型、センチメント分析にも対応"],
    ],
  },
  {
    name: "SUPER ACT",
    url: "https://superact.ai/",
    image: superActShot,
    lede:
      "ChatGPT・Gemini・Claude・Grok・Perplexityなど幅広いAIモデルにおけるメンション率・センチメントの分析から、LLMO・AIO施策の管理までをワンストップで支援するツール。プロンプトやブランドはオプションで追加できる。",
    rows: [
      ["料金プラン", "Standardプラン15,000円、カスタマイズプランは要相談"],
      ["プロンプト数", "10（追加オプションあり：6,800円で10プロンプト＋2ブランド追加）"],
      ["対応AIモデル", "ChatGPT・Gemini・Google AI Mode・Perplexity・Claude・Grokの6モデル"],
      ["更新頻度", "非公開"],
      ["特徴", "プロンプト・ブランド単位でのレポート機能"],
    ],
  },
  {
    name: "Ahrefs Brand Radar",
    url: "https://ahrefs.com/brand-radar",
    image: ahrefsBrandRadarShot,
    lede:
      "世界的なSEOツールAhrefsが提供するAI可視性分析機能。Ahrefsが保有する膨大なデータセットから月あたり411Mものプロンプトを追跡しており、AI回答内でのブランド言及トラッキングやAIに引用されやすいソースの発見に強みがある。YouTube・TikTok・Redditの横断調査ができる点も特徴。",
    rows: [
      ["運営会社", "Ahrefs Japan合同会社"],
      ["料金プラン", "107,800円〜"],
      ["プロンプト数", "2,500"],
      ["対応AIモデル", "6モデル対応"],
      ["更新頻度", "非公開"],
      ["特徴", "GA4連携、YouTube/TikTokのVideo visibility計測、Reddit調査機能"],
    ],
  },
];

const FAILURE_CASES = [
  { title: "更新頻度が低く効果がわからない", desc: "ツールによっては更新頻度が週1〜2回程度にとどまるものもあり、コンテンツ改善の効果がいつAIの回答に反映されたのかを判断しづらいケースがある。施策の効果をスピーディーに検証したい場合は、毎日更新に対応したツールを選ぶことが重要。" },
  { title: "オプションを追加すると想定より高い料金になる", desc: "基本プランの料金は安く見えても、AIモデルの追加やプロンプト数の拡張、ブランド追加などをオプションとして積み重ねると、想定より高額になるケースがある。契約前に、自社が必要とするAIモデル数・プロンプト数を満たすために実際いくらかかるのかを確認しておく。" },
  { title: "対応AI・日本語対応の確認不足", desc: "海外ツールにありがちな失敗として、対応しているAIモデルが英語圏中心で、日本語での回答分析や日本語UIに対応していないケースがある。国内向けにビジネスを展開している場合は、日本語での分析精度や日本語UIでの操作性も事前に確認しておく。" },
];

const PROCESS_STEPS = [
  { step: "STEP 1", title: "測る", desc: "まずはブランド名やWebサイトを登録し、AI検索上での言及・引用状況を計測する。プロンプトは自動生成されるツールも多く、専門的な設定をしなくても現状把握を始められる。" },
  { step: "STEP 2", title: "知る", desc: "AIモデルごとの言及率や回答内容、引用URLを確認し、自社がAI検索上でどのように扱われているかを把握する。競合ブランドと比較することで、自社の強み・弱みが具体的に見えてくる。" },
  { step: "STEP 3", title: "設計する", desc: "競合は表示されているのに自社は表示されていないプロンプトを洗い出し、優先して改善すべきテーマやコンテンツを絞り込む。" },
  { step: "STEP 4", title: "改善する", desc: "引用されている競合ページや情報源を参考に、自社サイトやコンテンツを見直す。質問形式のタイトル、冒頭での回答提示、FAQへの構造化データ適用など、AIに引用されやすい構成に沿ってリライト・新規作成を行う。" },
  { step: "STEP 5", title: "確かめる", desc: "コンテンツの改修・新規作成後は、言及率や引用状況がどう変化したかを継続的にモニタリングする。施策の前後を比較しながら、次の改善につなげる。" },
];

const FAQ = [
  {
    q: "無料のチェックツールと有料の専業ツールでは、分析の精度・深さにどのくらい差がありますか？",
    a: "精度の面では、無料ツールは1回の検索・少数のプロンプトでのスポット確認にとどまるのに対し、有料ツールは多数のプロンプトパターンを複数回実行して平均値を出すため、ブレの少ない結果が得られます。深さの面では、無料ツールが「引用されたかどうか」程度の表面情報にとどまるのに対し、有料ツールは引用元サイトの傾向分析、競合との出現比較、時系列での変化追跡まで見られる点が大きな違いです。",
  },
  {
    q: "GEO・LLMOツールで「AI回答に自社が引用されていない」と分かった場合、次に何をすればいいですか？",
    a: "まずはコンテンツ自体がないのか、あっても引用されにくい形式なのか、競合に構造や網羅性で負けているのかを見極めます。その上で、独自データや具体的数値を盛り込んで一次情報化し、FAQ形式や結論ファーストな構成でAIが抜き出しやすい形に整え、著者情報や出典を明記して信頼性を補強する、という改善を行います。ツールは可視化までで、改善はコンテンツと情報設計の見直しでしか進みません。",
  },
  {
    q: "GEO・LLMOツールの数値は、どのくらいの頻度でチェックし直すのが妥当ですか？",
    a: "施策の効果測定が目的なら最低週2回が目安です。AIの回答は同じプロンプトでも変動するため、週1回ではブレなのか傾向なのか判断がつきません。本格的に改善サイクルを回すなら毎日が推奨されます。",
  },
  {
    q: "GEO・LLMOツールはどんな企業に向いていますか？",
    a: "比較検討期間が長いBtoBやSaaS、高額商材など、購買前にAIへ相談されやすい業界に向いています。加えて、指名検索以外の流入チャネルを増やしたい企業や、ツールで課題が見えた後にコンテンツ改善へ回せる体制がある企業ほど効果を感じやすいです。",
  },
  {
    q: "GEO・LLMOツールの選定で最も重視すべきポイントは何ですか？",
    a: "価格よりも「見たい指標を分析できるか」「社内で継続して使える体制があるか」を優先して比較するのが失敗しないコツです。",
  },
];

export default function GeoLlmoToolsPage() {
  return (
    <div className="article-page">
      <section className="hero-fixed article-hero relative" style={{ background: "var(--hero-gradient)", minHeight: "0" }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute right-[8%] top-[18%] h-[460px] w-[460px] rounded-full bg-[#1452FF]/[0.08] blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
          <div className="article-hero__grid pt-8 pb-4">
            <div>
              <div className="mb-8 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-[#9A9AA0] uppercase">
                <Link href="/" className="transition-colors hover:text-[#FDFDFB]">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="transition-colors hover:text-[#FDFDFB]">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FDFDFB]">GEO・LLMO対策ツール15選</span>
              </div>

              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                GEO / LLMO TOOLS
              </div>

              <h1 className="article-hero__title mb-7">
                <span className="block">GEO・LLMO対策ツール15選</span>
                <span className="block text-[#1452FF]">料金や機能などを徹底比較</span>
              </h1>

              <p className="article-hero__lede">
                GEO・LLMO対策ツールは、料金プランや対応AIモデル数、更新頻度、改善提案の有無などによって特徴が大きく異なります。15個のツールを比較し、失敗しない選び方から具体的な対策プロセスまで解説します。
              </p>

              <div className="article-meta">
                {[
                  { l: "DATE", v: "2026.08.26" },
                  { l: "LENGTH", v: "約6,500文字" },
                  { l: "FORMAT", v: "COMPARISON GUIDE" },
                ].map((meta, index) => (
                  <div key={meta.l} className={`article-meta__item ${index < 2 ? "pr-6" : ""}`}>
                    <div className="article-meta__label">{meta.l}</div>
                    <div className="article-meta__value">{meta.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-shell">
        <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
          <div className="article-shell__grid lg:grid-cols-[220px_1fr]">
            <div className="hidden lg:block">
              <ArticleTOC />
            </div>

            <article className="article-body">
              <figure className="relative mb-10 h-[260px] w-full overflow-hidden rounded-2xl border border-[#E6E4DD] shadow-[0_18px_40px_-24px_rgba(11,11,14,0.28)]">
                <Image
                  src={heroCollage}
                  alt="GEO・LLMO対策ツール15選のスクリーンショットコラージュ"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-white/72 uppercase backdrop-blur-[2px]">
                  GEO / LLMO TOOLS
                </div>
              </figure>

              {/* Section 1: 結論 + 一覧比較表 */}
              <section id="s1" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>01 一覧比較表</span>
                <h2 className="article-h2">GEO・LLMO対策ツールの一覧比較表</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    「GEO・LLMO対策を始めたいが、どのツールを選べばいいか分からない」という担当者は多い。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  GEO・LLMO対策ツールは、料金プランや対応AIモデル数、更新頻度、改善提案の有無などによって特徴が大きく異なります。15個のツールの特徴を、料金・プロンプト数・対応AIモデル数・更新頻度の軸で一覧にまとめました。自社の目的に近いツールを探す際の参考にしてください。
                </p>

                <h3 className="article-h3" style={{ color: "#1452FF" }}>GEO・LLMO対策ツールの一覧比較表</h3>
                <div className="my-6 overflow-x-auto">
                  <table className="w-full border-collapse text-[14px]" style={{ borderColor: "#0B0B0E" }}>
                    <thead>
                      <tr>
                        {["サービス名", "最小プラン料金", "プロンプト数", "対応AIモデル数", "更新頻度"].map((h) => (
                          <th
                            key={h}
                            className="border px-4 py-3 text-left font-bold"
                            style={{
                              borderColor: "#0B0B0E",
                              background: "linear-gradient(180deg, #0B0B0E 0%, #15151A 100%)",
                              color: "#FDFDFB",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_TABLE.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (
                            <td
                              key={i}
                              className={`border px-4 py-3 align-top ${i === 0 ? "font-bold" : ""}`}
                              style={{ borderColor: "#0B0B0E", color: "#0B0B0E" }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 2: GEO・LLMOとは */}
              <section id="s2" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>02 GEO・LLMOとは</span>
                <h2 className="article-h2">GEO・LLMOとは？違いはある？</h2>
                <h3 className="article-h3">GEO・LLMOとはAIに引用される最適化施策のこと</h3>
                <p className="article-prose">
                  GEO（Generative Engine Optimization）とLLMO（Large Language Model Optimization）は、いずれもChatGPTやGemini、Perplexity、Google AI OverviewsなどのAI検索エンジンに対して、自社のブランドや製品が競合よりも多く引用・推薦されるよう、コンテンツや情報構造を最適化する施策を指します。呼び方は異なりますが目指すゴールは同じで、「AIの回答文の中で自社が名指しで紹介される状態」をつくることです。検索結果ページの上位表示を狙う従来のSEOに対し、GEO・LLMOはAIの回答そのものに引用される状態を目指す点が特徴です。
                </p>
              </section>

              {/* Section 3: SEOとの違い */}
              <section id="s3" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>03 SEOとの違い</span>
                <h2 className="article-h2">SEOとの違い</h2>
                <p className="article-prose">
                  GEO・LLMOとSEOは、最適化の対象と評価軸が根本的に異なります。SEOがGoogleやYahoo!といった検索エンジンでの上位表示を目指すのに対し、GEO・LLMOはChatGPTやGemini、Perplexityなどの生成AIモデルに引用・推薦されることを目指します。両者の違いを整理すると、以下のようになります。
                </p>

                <div className="article-table">
                  <div className="article-table__head">
                    <div>比較軸</div>
                    <div>GEO・LLMO</div>
                    <div>SEO</div>
                  </div>
                  {SEO_VS_GEO_ROWS.map((row) => (
                    <div key={row[0]} className="article-table__row">
                      <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                      <div className="article-table__cell article-table__cell--accent">{row[1]}</div>
                      <div className="article-table__cell">{row[2]}</div>
                    </div>
                  ))}
                </div>

                <p className="article-prose">
                  GEO・LLMOはSEOの「次バージョン」ではなく、評価軸そのものが異なる別領域です。同じ手法をそのまま流用しても成果にはつながりにくいため、両者は対立ではなく補完関係として捉え、それぞれに適した対策を行う必要があります。
                </p>
                <p className="article-prose">
                  <Link href="/lab/seo-geo" className="text-[#1452FF] hover:underline">
                    関連記事：SEOとGEOは何が違うのか？検索最適化と生成AI最適化を比較
                  </Link>
                </p>
              </section>

              {/* Section 4: 重要な理由 */}
              <section id="s4" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>04 重要と言われる理由</span>
                <h2 className="article-h2">GEO・LLMOが今後重要と言われる理由</h2>
                <p className="article-prose">
                  生成AIは世代を超えて急速に普及しており、AIチャットボットのユーザー数は2026年時点で世界の約8〜9億人にのぼるとされています。特にZ世代の70%が「AIツールを積極的に使用している」と回答するなど、AIは日常的な情報収集・意思決定の手段として定着しつつあります。業界別に見ても、リテール（小売）業界ではAI経由のトラフィックが前年比393%増加するなど、AI検索からの流入は急速に拡大しています。
                </p>
                <p className="article-prose">
                  一方で、従来の検索トラフィックは減少傾向にあります。2026年までに従来のSEO経由のトラフィックは25%減少すると予測されているほか、Google検索の約60%はサイトへ遷移しない「ゼロクリック検索」になっているというデータもあります。AI Overviewsが表示されると、従来のオーガニック検索1位の表示位置はファーストビューの外に押し下げられてしまうため、検索順位で1位を獲得しても、以前ほどの流入が見込めなくなっているのが実情です。
                </p>
                <p className="article-prose">
                  つまり、AIの回答内で紹介されなければ、そもそもユーザーの選択肢に入れない時代になりつつあります。GEO・LLMO対策の有無が、採用・ブランド認知・売上に直接影響する事業機会の差につながるため、多くの企業にとって重要性が高まっているのです。
                </p>
              </section>

              {/* Section 5: 選び方 */}
              <section id="s5" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>05 ツールの選び方</span>
                <h2 className="article-h2">GEO・LLMO対策ツールの選び方</h2>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {SELECTION_POINTS.map((p, i, arr) => (
                    <div
                      key={p.title}
                      className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}
                    >
                      <svg
                        className="mt-1 h-6 w-6 flex-none"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" fill="#16A34A" />
                        <path
                          d="M7 12.5L10.2 15.7L17 8.5"
                          stroke="#FFFFFF"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <div className="mb-1 font-bold text-[18px] text-[#0B0B0E]">{p.title}</div>
                        <div className="text-[18px] text-[#6B6B73]">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6: 15個を詳しく紹介 */}
              <section id="s6" className="article-section" style={{ marginTop: "56px" }}>
                <span className="article-kicker" style={{ fontSize: "14px" }}>06 15個を詳しく紹介</span>
                <h2 className="article-h2">GEO・LLMO対策ツール15個を詳しく紹介</h2>
                <p className="article-prose">
                  ここからは、GEO・LLMO対策に活用できる15個のツールを、料金プランや対応AIモデル、機能などの観点から詳しく紹介します。
                </p>

                {TOOLS.map((tool) => (
                  <div key={tool.name} className="mt-10">
                    <h3 className="article-h3">{tool.name}</h3>
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mb-4 flex w-fit items-center gap-1 text-[14px] text-[#1452FF] hover:underline"
                      >
                        公式サイトを見る
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {tool.image && (
                      <figure className="mb-6 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#F2F0EA]">
                        <Image
                          src={tool.image}
                          alt={`${tool.name}の公式サイト画面`}
                          className="h-auto w-full"
                        />
                      </figure>
                    )}
                    <p className="article-prose">{tool.lede}</p>
                    <div className="article-table article-table--2col">
                      <div className="article-table__head">
                        <div>項目</div>
                        <div>内容</div>
                      </div>
                      {tool.rows.map((row) => (
                        <div key={row[0]} className="article-table__row">
                          <div className="article-table__cell article-table__cell--label">{row[0]}</div>
                          <div className="article-table__cell">{row[1]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Section 7: 失敗するケース */}
              <section id="s7" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>07 選びで失敗するケース</span>
                <h2 className="article-h2">GEO・LLMOツール選びで失敗するケース</h2>
                <p className="article-prose">
                  GEO・LLMO対策ツールの導入では、以下のようなポイントで失敗するケースが多く見られます。導入前に確認しておきましょう。
                </p>
                {FAILURE_CASES.map((c) => (
                  <div key={c.title}>
                    <h3 className="article-h3">{c.title}</h3>
                    <p className="article-prose">{c.desc}</p>
                  </div>
                ))}
              </section>

              {/* Section 8: 具体的なプロセス */}
              <section id="s8" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>08 対策の具体的なプロセス</span>
                <h2 className="article-h2">GEO・LLMO対策の具体的なプロセス</h2>
                <p className="article-prose">
                  GEO・LLMO対策は、ツールを導入して終わりではありません。以下の5つのステップを繰り返すことで、AIに引用され続ける状態を継続的に構築できます。
                </p>

                <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">実践ステップ</p>
                <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
                  {PROCESS_STEPS.map((s, i, arr) => (
                    <div key={s.step} className={`flex items-center gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-[#E6E4DD]" : ""}`}>
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#1452FF] font-mono text-[16px] text-white">{i + 1}</span>
                      <div>
                        <div className="font-bold text-[18px]">{s.title}</div>
                        <div className="text-[18px] text-[#6B6B73]">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="article-prose" style={{ marginTop: "40px" }}>
                  GEO Watcherを活用して自社ブランド・競合ブランド・質問を登録し、日次・週次・月次でSOVと可視性を確認しながらPDCAを回すことで、自社ブランドや商品の可視性を高め、回答内での優先順位を上げていく取り組みを地道に続けていくとよいでしょう。
                </p>
              </section>

              {/* Section 9: FAQ */}
              <section id="s9" className="article-section">
                <span className="article-kicker" style={{ fontSize: "14px" }}>09 よくある質問</span>
                <h2 className="article-h2">GEO・LLMOツールに関する質問</h2>
                <div className="article-faq">
                  {FAQ.map((item) => (
                    <div key={item.q} className="article-faq__item">
                      <div className="article-faq__q">
                        <span className="article-faq__q-label">Q</span>
                        <h4 className="article-h4">{item.q}</h4>
                      </div>
                      <div className="article-faq__a">
                        <span className="article-faq__a-label">A</span>
                        <p className="article-faq__answer">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 10: まとめ */}
              <section id="s10" className="article-section" style={{ marginTop: "56px" }}>
                <span className="article-kicker" style={{ fontSize: "14px" }}>10 まとめ</span>
                <h2 className="article-h2">まとめ：GEO・LLMO対策におすすめのツール15選</h2>
                <blockquote className="article-quote article-quote--wide">
                  <p className="article-quote__text">
                    価格よりも「見たい指標を分析できるか」「社内で継続して使える体制があるか」を優先して比較するのが失敗しないコツ。
                  </p>
                  <span className="article-quote__note">RESEARCH NOTE</span>
                </blockquote>
                <p className="article-prose">
                  GEO・LLMO対策ツールは、料金プランや対応AIモデル数、更新頻度、改善提案の有無などによって特徴が大きく異なります。まずは自社の目的（現状把握なのか、改善施策の実行なのか）を明確にしたうえで、無料プランやトライアルで使用感を確認しながら、自社に合ったツールを選びましょう。ツール選びに迷った際は、この記事で紹介した比較表や選び方のポイントを参考にしてみてください。
                </p>

                <div className="article-note-panel">
                  <div className="article-note-panel__grid">
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">監修</div>
                      <div className="flex items-start gap-4">
                        <Image
                          src={shimadaImage}
                          alt="嶋田誠一"
                          width={77}
                          height={77}
                          className="h-[77px] w-[77px] flex-none rounded-full object-cover"
                        />
                        <p className="article-note-panel__text" style={{ fontSize: "14px" }}>
                          <strong>嶋田誠一</strong>
                          <br />
                          株式会社アセントネットワークス SEO担当者。新規事業として比較系メディアを立ち上げ、SEO戦略のみで月間80万PVまで成長させた実績を武器に、SEOコンサルタントへ転身。現在は海外大手メーカーのSEOを担当し、2026年からはGEO・LLMO領域の実務にもいち早く着手。検索エンジンとAI検索を理解した戦略設計を強みとしています。
                        </p>
                      </div>
                    </div>
                    <div className="article-note-panel__section">
                      <div className="article-note-panel__label">出典・参考</div>
                      <p className="article-note-panel__text article-note-panel__text--muted">
                        各社サービスページ、公開資料（2026年8月時点）。本記事の情報は2026年8月26日時点の最新情報に基づいて作成しました。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>

      <LabArticleCTASection />
    </div>
  );
}
