import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTASection } from "@/components/layout/CTASection";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { ServicesFAQ } from "./ServicesFAQ";

export const metadata: Metadata = {
  title: "Services — Ascent GEO",
  description: "診断・分析・制作・モニタリング。Ascent の GEO サービスは、4 つのフェーズで切り出すこともできれば、ループとしてフルパッケージで運用することもできる。",
};

function AuditVis() {
  const stages = [
    { k: "初期探索", q: "電動自転車とは？", v: 202333 },
    { k: "情報探索", q: "PAS With vs アルベルトe？", v: 19303 },
    { k: "経験探索", q: "実際の試乗レビュー", v: 8283 },
    { k: "購買確定", q: "どこで買えば安い？", v: 4120 },
    { k: "購買以後", q: "バッテリー交換は？", v: 2104 },
  ];

  return (
    <div className="rounded-[14px] border border-[#E6E4DD] bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#E6E4DD] pb-4 font-mono text-[11px] tracking-[0.14em] text-[#6B6B73]">
        <span>QUESTION.CLUSTER / CDJ-MINING</span>
        <span className="flex items-center gap-1.5 text-[#1452FF]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
          </span>
          5-STAGE
        </span>
      </div>
      <div className="relative mb-5 grid grid-cols-5 gap-2">
        <div className="absolute left-[8%] right-[8%] top-[14px] h-px bg-[#E6E4DD]" />
        {["CDJ 分類", "検索量", "核心質問", "文脈結合", "最終 Cluster"].map(
          (s, i) => (
            <div key={i} className="relative z-10 text-center">
              <div
                className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] font-semibold text-[#1452FF] ${i === 4 ? "border-[#1452FF] bg-[#1452FF] text-white" : "border-[#E6E4DD] bg-[#F2F0EA]"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-mono text-[10px] tracking-[0.06em] text-[#1A1A20]">
                {s}
              </div>
            </div>
          )
        )}
      </div>
      <div className="mb-3.5 grid gap-1.5 rounded-lg border border-[#E6E4DD] bg-[#F2F0EA] px-3.5 py-3.5">
        {stages.map((s, i) => (
          <div
            key={i}
            className={`grid grid-cols-[80px_1fr_70px] items-center gap-2.5 border-t border-dashed border-[#E6E4DD] py-1.5 font-mono text-[11px] first:border-t-0`}
          >
            <span className="font-semibold tracking-[0.04em] text-[#1452FF]">
              {s.k}
            </span>
            <span className="italic text-[#1A1A20]">"{s.q}"</span>
            <span className="text-right text-[#6B6B73]">
              {s.v.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-[#1452FF] bg-[rgba(20,82,255,0.04)] p-3.5">
        <div className="mb-2 font-mono text-[10px] font-semibold tracking-[0.14em] text-[#1452FF]">
          FINAL CLUSTER · 初期探索
        </div>
        <p className="mb-2.5 text-[13px] leading-[1.55] text-[#0B0B0E]">
          "免許なしで乗れる電動自転車で、上り坂の多い通勤用、補助金対象モデルのおすすめは？"
        </p>
        <div className="flex gap-3 font-mono text-[10px] text-[#1452FF]">
          <span>✓ 状況文脈</span>
          <span>✓ データ基盤</span>
          <span>✓ 優先度反映</span>
        </div>
      </div>
    </div>
  );
}

function GapVis() {
  const rows = [
    { l: "Coverage", v: 9, w: false },
    { l: "Specificity", v: 7, w: false },
    { l: "Authority", v: 11, w: false },
    { l: "Recency", v: 4, w: true },
    { l: "Schema", v: 3, w: true },
    { l: "Passage Fit", v: 8, w: false },
    { l: "Entity Match", v: 6, w: false },
    { l: "Citation Density", v: 5, w: true },
    { l: "Q-Form Header", v: 9, w: false },
    { l: "Intent Match", v: 7, w: false },
    { l: "Semantic Sim.", v: 8, w: false },
    { l: "AI Readability", v: 10, w: false },
  ];

  return (
    <div className="rounded-[14px] border border-[#E6E4DD] bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#E6E4DD] pb-4 font-mono text-[11px] tracking-[0.14em] text-[#6B6B73]">
        <span>GAP.MATRIX / 12-POINT MODEL</span>
        <span>SCORE 7.3 / 12</span>
      </div>
      <div className="grid gap-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[110px_1fr_44px] items-center gap-3">
            <span className="font-mono text-[11px] text-[#1A1A20]">{r.l}</span>
            <div className="h-2 overflow-hidden rounded-full bg-[#F2F0EA]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(r.v / 12) * 100}%`,
                  background: r.w ? "rgba(199,62,62,0.7)" : "#1452FF",
                }}
              />
            </div>
            <span className="text-right font-mono text-[11px] text-[#1A1A20]">
              {r.v}/12
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4.5 grid grid-cols-3 gap-3 border-t border-[#E6E4DD] pt-4">
        {[
          { l: "STRONG", v: "7" },
          { l: "WEAK", v: "3" },
          { l: "PRIORITY", v: <>3 <small className="text-[12px] text-[#6B6B73]">項目</small></> },
        ].map((s, i) => (
          <div key={i} className="rounded-md bg-[#F2F0EA] p-2.5">
            <div className="font-mono text-[10px] tracking-[0.12em] text-[#6B6B73]">
              {s.l}
            </div>
            <div className="mt-1 text-[22px] font-bold tracking-[-0.01em]">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentVis() {
  return (
    <div className="rounded-[14px] border border-[#E6E4DD] bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#E6E4DD] pb-4 font-mono text-[11px] tracking-[0.14em] text-[#6B6B73]">
        <span>STRUCTURE COMPARE</span>
        <span>BEFORE → AFTER</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <div className="relative rounded-lg border border-[rgba(199,62,62,0.3)] bg-[#F2F0EA] p-4">
          <span className="absolute -top-2.5 left-3 rounded bg-[#C73E3E] px-2 py-[3px] font-mono text-[10px] tracking-[0.14em] text-white">
            BAD
          </span>
          <h6 className="mb-2.5 mt-2 font-mono text-[11px] tracking-[0.12em] text-[#6B6B73]">
            SEO 時代の構造
          </h6>
          <div className="font-mono text-[11px] leading-[1.7] text-[#6B6B73]">
            <span className="block text-[#C73E3E]">## 商品紹介</span>
            このカメラは高画質で多機能。
            <br />
            様々なシーンに対応します。
            <br />
            <span className="block mt-2 text-[#C73E3E]">## 特徴</span>
            ・高画質
            <br />
            ・防水
            <br />
            ・軽量
          </div>
        </div>
        <div className="relative rounded-lg border border-[rgba(20,82,255,0.3)] bg-[#F2F0EA] p-4">
          <span className="absolute -top-2.5 left-3 rounded bg-[#1452FF] px-2 py-[3px] font-mono text-[10px] tracking-[0.14em] text-white">
            GOOD
          </span>
          <h6 className="mb-2.5 mt-2 font-mono text-[11px] tracking-[0.12em] text-[#6B6B73]">
            GEO 構造（質問形）
          </h6>
          <div className="font-mono text-[11px] leading-[1.7] text-[#6B6B73]">
            <span className="block text-[#1452FF]">## 雨の中でも撮れる？</span>
            IPX8 防水。30 分水没耐性。
            <br />
            <span className="block mt-2 text-[#1452FF]">## 暗所での画質は？</span>
            f/1.4 + AI ノイズ低減。
            <br />
            <span className="block mt-2 text-[#1452FF]">## FAQ Schema</span>
            実装済 / @type: Question
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-[#F2F0EA] p-3 font-mono text-[11px] text-[#6B6B73]">
        Citation 確率{" "}
        <span className="text-[#C73E3E]">11%</span> →{" "}
        <span className="text-[#1452FF]">47%</span>（同条件）
      </div>
    </div>
  );
}

function MonitorVis() {
  return (
    <div className="rounded-[14px] border border-[#E6E4DD] bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#E6E4DD] pb-4 font-mono text-[11px] tracking-[0.14em] text-[#6B6B73]">
        <span>VISIBILITY DASHBOARD / 30D</span>
        <span className="flex items-center gap-1.5 text-[#1452FF]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
          </span>
          LIVE
        </span>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        {[
          { l: "BRAND VISIBILITY", v: "42.7%", s: "+8.4" },
          { l: "AI TRAFFIC", v: "12.4K", s: "+22%" },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg border border-[#E6E4DD] bg-[#F2F0EA] p-3.5">
            <div className="font-mono text-[10px] tracking-[0.14em] text-[#6B6B73]">
              {stat.l}
            </div>
            <div className="mt-1 text-[24px] font-bold tracking-[-0.02em]">
              {stat.v}
              <small className="ml-1.5 text-[12px] text-[#1452FF]">{stat.s}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2 font-mono text-[10px] tracking-[0.14em] text-[#6B6B73]">
        SHARE OF VOICE · CATEGORY
      </div>
      <div className="grid gap-1.5">
        {[
          { label: "YOUR BRAND", w: "42%", v: "42.7", us: true },
          { label: "COMP A", w: "28%", v: "28.1", us: false },
          { label: "COMP B", w: "17%", v: "17.3", us: false },
          { label: "COMP C", w: "11%", v: "11.9", us: false },
        ].map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[80px_1fr_36px] items-center gap-3 font-mono text-[11px]"
          >
            <span>{row.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#F2F0EA]">
              <div
                className="h-full rounded-full"
                style={{
                  width: row.w,
                  background: row.us ? "#0B0B0E" : "#1452FF",
                }}
              />
            </div>
            <span className="text-right text-[#6B6B73]">{row.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-3.5 rounded-lg bg-[#F2F0EA] p-3 font-mono text-[11px] text-[#6B6B73]">
        月次レポート / Slack 連携 / 改善アラート
      </div>
    </div>
  );
}

const services = [
  {
    ix: "01",
    tag: "QUESTION CLUSTER MINING",
    title: "データ基盤で、",
    accent: "質問クラスターを抽出。",
    lede: "一つのトピックから派生する数百〜数千の質問の中から、ユーザーの核心的な意図（Primary Intent）を中心に、AI が後続質問として高い確率で展開する質問群を、データに基づいてグループ化する。ブランドが応答すべき質問候補を体系的に特定する 5 ステップ。",
    feat: [
      "CDJ 5 段階分類（初期探索〜購買以後）",
      "CDJ 段階別トピック検索量の優先順位化",
      "Primary Intent 抽出と質問形変換",
      "cluster・path データ結合による文脈化",
      "CDJ 段階別 5 質問前後の最終クラスター納品",
    ],
    meta: [
      { l: "期間", v: "2 週間〜" },
      { l: "CDJ 段階", v: "5 段階" },
      { l: "納品", v: "クラスター + 解説" },
    ],
    Vis: AuditVis,
    alt: false,
    flip: false,
  },
  {
    ix: "02",
    tag: "GAP ANALYSIS",
    title: "質問とコンテンツの距離を、",
    accent: "12点で。",
    lede: "Embedding ベースの Semantic Similarity を、Coverage / Specificity / Authority など 12 軸で定量化。どの質問に対し、どのコンテンツが、なぜ引用されないのかを、数字とロジックで明らかにする。",
    feat: [
      "12 点モデルによる Semantic 評価",
      "質問×ページ マッピング",
      "弱点項目の自動抽出",
      "改善優先度のスコア化",
      "Embedding ベースの類似度測定",
    ],
    meta: [
      { l: "期間", v: "3〜4 週間" },
      { l: "対象質問", v: "〜500件" },
      { l: "評価軸", v: "12 ポイント" },
    ],
    Vis: GapVis,
    alt: true,
    flip: true,
  },
  {
    ix: "03",
    tag: "GEO CONTENT",
    title: "AI に引用される",
    accent: "構造で書く。",
    lede: "質問形ヘッダー、Passage Optimization、FAQ Schema、Authority Signal。AI Answer Engine が抜き出しやすい単位で、コンテンツを設計・執筆。検索結果ページではなく、AI の回答に入る記事を。",
    feat: [
      "Passage 単位のコンテンツ設計",
      "質問形 H2 / H3 構造化",
      "FAQ Schema / Structured Data",
      "Authority リンクの最適化",
      "既存記事のリライトも対応",
    ],
    meta: [
      { l: "期間", v: "4 週間〜" },
      { l: "本数", v: "5〜30 / 月" },
      { l: "形式", v: "記事 / FAQ / Schema" },
    ],
    Vis: ContentVis,
    alt: false,
    flip: false,
  },
  {
    ix: "04",
    tag: "GEO MONITORING",
    title: "引用され続けることを、",
    accent: "運用に。",
    lede: "月次の Visibility / Citation / AI Traffic レポートを Slack 連携で配信。下落アラート、競合動向、改善提案までを一気通貫で。GEO は施策ではなく、運用である。",
    feat: [
      "月次 Visibility / Citation レポート",
      "競合ベンチマーク自動更新",
      "下落アラート（Slack / Email）",
      "AI Traffic 計測（GA4 連携）",
      "四半期改善提案ミーティング",
    ],
    meta: [
      { l: "サイクル", v: "月次運用" },
      { l: "AI Engine", v: "4 サービス" },
      { l: "通知", v: "Slack 連携" },
    ],
    Vis: MonitorVis,
    alt: true,
    flip: true,
  },
];

const packages = [
  {
    ix: "PKG 01",
    name: "SPOT",
    desc: "まず現在地を把握したい。",
    items: [
      "GEO Audit（4 AI Engine）",
      "競合 3 社比較",
      "レポート + 解説 1 回",
    ],
    price: "期間 2 週間 / お問い合わせ",
    featured: false,
  },
  {
    ix: "PKG 02",
    name: "FULL LOOP",
    desc: "運用まで一気通貫で。",
    items: [
      "4 サービスフルパッケージ",
      "月次 Monitoring 運用",
      "四半期戦略レビュー",
      "Slack 連携",
    ],
    price: "年次契約 / お問い合わせ",
    featured: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0B0E] py-12 lg:py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Background — matches index hero */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#1452FF]/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="arc-spin" style={{ position: "absolute", width: 1100, height: 1100, right: -480, top: -260, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: 720, height: 720, right: -200, top: 40, border: "1px solid rgba(20,82,255,0.18)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: 360, height: 360, right: 40, top: 200, border: "1px dashed rgba(20,82,255,0.32)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: -40, bottom: -40, fontFamily: "'Pretendard JP Variable', 'Pretendard JP', Pretendard, sans-serif", fontWeight: 800, fontSize: "clamp(180px, 22vw, 320px)", letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)", lineHeight: 0.85, userSelect: "none", whiteSpace: "nowrap" }}>GEO.</div>
          <div style={{ position: "absolute", right: 32, top: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.42)", display: "grid", gap: 4, textAlign: "right" }}>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#1452FF", boxShadow: "0 0 8px #1452FF", alignSelf: "center" }} />
              <span>LIVE · AI VISIBILITY INDEX</span>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><span>ChatGPT</span><span style={{ color: "rgba(255,255,255,0.7)" }}>78%</span></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><span>Gemini</span><span style={{ color: "rgba(255,255,255,0.7)" }}>64%</span></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><span>Perplexity</span><span style={{ color: "rgba(255,255,255,0.7)" }}>51%</span></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><span>Copilot</span><span style={{ color: "rgba(255,255,255,0.7)" }}>42%</span></div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                Services
              </div>
              <h1
                className="font-extrabold tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(50px, 5.5vw, 82px)", lineHeight: 0.96 }}
              >
                <span className="block">データ基盤の、</span>
                <span className="block text-[#1452FF]">フルスペック GEO</span>
                <span className="block">サービス。</span>
              </h1>
              <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.75] text-white/[0.68]">
                診断・分析・制作・モニタリング。Ascent の GEO サービスは、4
                つのフェーズで切り出すこともできれば、ループとしてフルパッケージで運用することもできる。
              </p>

              <div className="mt-10 border-t border-white/10 pt-7">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                  {[
                    { ix: "01", label: "質問クラスター\nデータ基盤抽出" },
                    { ix: "02", label: "12点 GAP 分析\n定量評価" },
                    { ix: "03", label: "GEO 制作\n引用される構造" },
                    { ix: "04", label: "モニタリング\nVisibility 計測" },
                  ].map((p) => (
                    <div
                      key={p.ix}
                      className="border-t border-white/10 pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0 xl:first:border-l-0 xl:first:pl-0"
                    >
                      <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[#1452FF]">
                        {p.ix}
                      </div>
                      <div className="text-[15px] font-semibold leading-[1.35] text-white whitespace-pre-line">
                        {p.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
                <CalendarBookingButton />
                <Button asChild variant="ctaOutline">
                  <Link href="/whitepaper">サービス資料をダウンロード</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
                <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quad overview */}
      <section className="border-b border-[#E6E4DD] bg-[#FAFAF7] py-16">
        <div className="mx-auto max-w-[1280px] px-10">
          <div className="grid grid-cols-2 gap-0 border-t border-[#E6E4DD] pt-8 md:grid-cols-4">
            {[
              { ix: "01 / CLUSTER", title: "質問クラスター\nデータ基盤抽出" },
              { ix: "02 / GAP", title: "12点 GAP 分析\n定量評価" },
              { ix: "03 / CONTENT", title: "GEO 制作\n引用される構造" },
              { ix: "04 / MONITOR", title: "モニタリング\nVisibility 計測" },
            ].map((q, i) => (
              <div
                key={i}
                className="border-b border-[#E6E4DD] py-4 pr-6 pl-1 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="mb-3 font-mono text-[11px] tracking-[0.18em] text-[#1452FF]">
                  {q.ix}
                </div>
                <h4 className="text-[17px] font-bold leading-[1.3] whitespace-pre-line">
                  {q.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((svc) => (
        <section
          key={svc.ix}
          className={`border-b border-[#E6E4DD] py-[120px] ${svc.alt ? "bg-[#F2F0EA]" : "bg-[#FAFAF7]"}`}
        >
          <div className="mx-auto max-w-[1280px] px-10">
            <div className="mb-4 font-mono text-[12px] tracking-[0.18em] text-[#1452FF]">
              [ {svc.ix} ] {svc.tag}
            </div>
            <div
              className={`grid items-start gap-20 lg:grid-cols-2 ${svc.flip ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <h2 className="mb-4 tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}>
                  {svc.title}{" "}
                  <em className="text-[#1452FF] not-italic">{svc.accent}</em>
                </h2>
                <p className="mb-7 max-w-[50ch] text-[18px] leading-[1.6] text-[#6B6B73]">
                  {svc.lede}
                </p>
                <ul className="mb-8 grid gap-2.5 list-none p-0">
                  {svc.feat.map((f, i) => (
                    <li key={i} className="grid grid-cols-[14px_1fr] items-start gap-3 text-[16px] text-[#1A1A20]">
                      <span className="mt-0.5 text-[12px] text-[#1452FF]">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-0 border-y border-[#E6E4DD] py-5">
                  {svc.meta.map((m, i) => (
                    <div
                      key={i}
                      className="border-r border-[#E6E4DD] pl-1 pr-4 last:border-r-0 first:pl-0"
                    >
                      <div className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B73] mb-1.5">
                        {m.l}
                      </div>
                      <div className="text-[15px] font-semibold">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <svc.Vis />
            </div>
          </div>
        </section>
      ))}

      {/* Packages */}
      <section className="bg-[#0B0B0E] py-[100px]">
        <div className="mx-auto max-w-[1280px] px-10">
          <div className="mb-6 font-mono text-[12px] tracking-[0.18em] text-[#9A9AA0]">
            [ PACKAGES ]
          </div>
          <h2
            className="mb-4 max-w-[24ch] tracking-[-0.03em] leading-[1.05] text-[#FAFAF7]"
            style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}
          >
            単発でも、<em className="text-[#1452FF] not-italic">フルループ</em>でも。
          </h2>
          <p className="mb-10 max-w-[56ch] text-[18px] leading-[1.6] text-[#9A9AA0]">
            事業規模・フェーズに合わせて、4 サービスを組み合わせる。最小は Audit のみのスポット、最大は GEO ループの完全運用まで。
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {packages.map((pkg) => (
              <div
                key={pkg.ix}
                className={`rounded-xl p-7 ${pkg.featured ? "border border-[#1452FF] bg-[rgba(20,82,255,0.06)]" : "border border-white/[0.12] bg-white/[0.02]"}`}
              >
                <div className="mb-2 font-mono text-[11px] tracking-[0.18em] text-[#1452FF]">
                  {pkg.ix}
                </div>
                <h4 className="mb-2 text-[24px] font-bold tracking-[-0.02em] text-[#FAFAF7]">
                  {pkg.name}
                </h4>
                <p className="mb-4 min-h-[44px] text-[14px] leading-[1.5] text-white/70">
                  {pkg.desc}
                </p>
                <ul className="mb-6 grid gap-2.5 list-none p-0">
                  {pkg.items.map((item, i) => (
                    <li
                      key={i}
                      className="relative pl-5 text-[14px] leading-[1.4] text-white/85"
                    >
                      <span className="absolute left-0 text-[#1452FF]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/[0.08] pt-4 font-mono text-[11px] text-[#9A9AA0]">
                  {pkg.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServicesFAQ />

      {/* CTA */}
      <CTASection
        kicker="CONTACT — START WITH A FREE AUDIT"
        title={
          <>
            AI 検索で、
            <br />
            あなたのブランドは
            <br />
            <span className="text-blue-gradient">何回引用されている</span>か？
          </>
        }
        description="まずは無料診断で、現在の AI Visibility と Citation 構造を可視化します。所要 30 分のオンライン MTG から。"
        primaryButton={{ href: "/contact", label: "相談する" }}
        secondaryButtons={[
          { href: "/whitepaper", label: "サービス資料をダウンロード" },
          { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）" },
        ]}
      />
    </div>
  );
}
