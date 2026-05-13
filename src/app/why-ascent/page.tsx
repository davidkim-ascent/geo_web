import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CTASection } from "@/components/layout/CTASection";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref, getCalendarBookingLinkProps } from "@/lib/calendar-booking";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";

export const metadata: Metadata = {
  title: "Why Ascent — GEO",
  description: "GEO は、推測ではなく設計の科学である。",
};


const patentItems = [
  {
    num: "01",
    title: "Passage Ranking",
    desc:
      "AI は文章全体ではなく、特定の Passage(文節)を引用する。 Passage 単位での最適化が引用獲得の核心。",
    src: "GOOGLE PATENT · US10810199B2",
  },
  {
    num: "02",
    title: "Intent Ranking",
    desc:
      "検索クエリの背後にある「意図」を分類し、生成回答に組み込む。 Intent との一致が引用条件。",
    src: "MICROSOFT PATENT · US11003660",
  },
  {
    num: "03",
    title: "Embedding Similarity",
    desc:
      "質問と Passage を高次元ベクトルで比較。 Semantic Similarity が一定閾値を超えた Passage が候補化。",
    src: "GOOGLE PATENT · US10324946",
  },
  {
    num: "04",
    title: "AI Retrieval Structure",
    desc:
      "Retrieval-Augmented Generation の検索フェーズで、Citation 候補が決まる。 Retrieval 段階の最適化が要。",
    src: "TECHNICAL · OPENAI / ANTHROPIC",
  },
];

const listeningBullets = [
  "消費者の質問フローを CDJ(Consumer Decision Journey) で構造化",
  "後続質問(Follow-up Question)から検索の文脈を読み解く",
  "CEP × Search Path で「答えるべき問い」を優先度付け",
  "引用獲得の確率が高い Passage 候補を抽出",
];

const searchBranches = [
  { lvl: "L1", q: "Galaxy AI 機能 一覧", vol: "14.2k / mo" },
  { lvl: "L2", q: "Galaxy AI バッテリー 持ち", vol: "6.8k / mo" },
  { lvl: "L3", q: "Galaxy AI 発熱 ゲーム", vol: "2.4k / mo" },
  { lvl: "L2", q: "Galaxy AI vs iPhone Apple Intelligence", vol: "9.1k / mo" },
  { lvl: "L3", q: "Galaxy AI 翻訳 精度 比較", vol: "3.6k / mo" },
];

const frameworkRows = [
  {
    num: "F·01",
    title: "Question Intelligence",
    meta: "CDJ · QUESTION CLUSTERING",
    desc:
      "消費者の購買意思決定ジャーニーから AI に問われる質問を構造化。 CEP に紐づくクラスタを生成し、コンテンツが答えるべき問いを定義します。",
    bullets: ["CDJ 質問生成", "CEP マッピング", "Question Cluster", "Search Volume 統合"],
    viz: "network",
  },
  {
    num: "F·02",
    title: "Semantic GAP 分析",
    meta: "12-POINT EVAL · SIMILARITY",
    desc:
      "質問と既存コンテンツのセマンティック距離を 12 項目で評価。「答えられていない問い」を特定し、優先度付きの改善ロードマップを提示します。",
    bullets: ["12点評価モデル", "GAP マトリクス", "Semantic Similarity", "改善優先度"],
    viz: "matrix",
  },
  {
    num: "F·03",
    title: "GEO コンテンツ エンジニアリング",
    meta: "PASSAGE · FAQ STRUCTURE",
    desc:
      "Passage 単位で AI に引用される構造を設計。 質問形ヘッダー、簡潔な定義、補強データ、FAQ・Schema までを統合した GEO Writing 指針で実装します。",
    bullets: ["Passage Optimization", "FAQ / Schema", "質問形ヘッダー", "GEO Writing"],
    viz: "doc",
  },
  {
    num: "F·04",
    title: "AI Visibility Monitoring",
    meta: "VISIBILITY · CITATION · TRAFFIC",
    desc:
      "ChatGPT / Gemini / Copilot / Perplexity をまたいで、ブランド露出と引用構造を継続計測。改善ループを回すための運用ダッシュボードを提供します。",
    bullets: ["Brand Visibility", "AI Traffic 分析", "Citation Tracking", "Monthly Report"],
    viz: "chart",
  },
] as const;

function SectionKicker({
  overline,
  label,
  dark = false,
}: {
  overline: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase ${dark ? "text-white/55" : "text-[#6b6b70]"}`}>
      <span>{overline}</span>
      <span className={dark ? "text-white" : "text-[#0b0b0e]"}>{label}</span>
    </div>
  );
}

function DiagramCard({ kind }: { kind: "network" | "matrix" | "doc" | "chart" }) {
  if (kind === "network") {
    return (
      <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 01</div>
        <div className="relative h-[170px] w-[170px] rounded-full border border-[#1452ff]">
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1452ff]" />
          <span className="absolute left-[16%] top-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff] shadow-[0_0_20px_rgba(20,82,255,0.35)]" />
          <span className="absolute right-[16%] top-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff] shadow-[0_0_20px_rgba(20,82,255,0.35)]" />
          <span className="absolute left-[9%] bottom-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff] shadow-[0_0_20px_rgba(20,82,255,0.35)]" />
          <span className="absolute right-[10%] bottom-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff] shadow-[0_0_20px_rgba(20,82,255,0.35)]" />
          <span className="absolute bottom-[4%] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff] shadow-[0_0_20px_rgba(20,82,255,0.35)]" />
          <span className="absolute left-1/2 top-[20%] h-px w-[60%] -translate-x-1/2 bg-[#1452ff]/60" />
          <span className="absolute left-1/2 top-[20%] h-[60%] w-px -translate-x-1/2 bg-[#1452ff]/60" />
          <span className="absolute left-[24%] top-[26%] h-px w-[32%] -rotate-[36deg] bg-[#1452ff]/60" />
          <span className="absolute right-[24%] top-[26%] h-px w-[32%] rotate-[36deg] bg-[#1452ff]/60" />
          <span className="absolute left-[24%] bottom-[28%] h-px w-[32%] rotate-[36deg] bg-[#1452ff]/60" />
          <span className="absolute right-[24%] bottom-[28%] h-px w-[32%] -rotate-[36deg] bg-[#1452ff]/60" />
        </div>
      </div>
    );
  }

  if (kind === "matrix") {
    return (
      <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 02</div>
        <div className="grid grid-cols-6 gap-1.5">
          {[
            [1, 2, 3, 4, 5, 0],
            [4, 5, 4, 5, 3, 0],
            [5, 4, 3, 2, 0, 2],
            [3, 2, 0, 1, 4, 5],
          ].flatMap((row, rowIdx) =>
            row.map((value, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="h-9 w-9"
                style={{
                  backgroundColor:
                    value === 0
                      ? "#efede5"
                      : `rgba(20,82,255,${0.15 + value * 0.12})`,
                }}
              />
            ))
          )}
        </div>
        <div className="absolute bottom-5 left-6 text-[9px] tracking-[0.32em] text-black/35">SCORE 0 → 12</div>
      </div>
    );
  }

  if (kind === "doc") {
    return (
      <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 03</div>
        <div className="w-[72%] space-y-3">
          <div className="h-3 w-[85%] bg-black" />
          <div className="h-1.5 w-[92%] bg-black/20" />
          <div className="h-1.5 w-[78%] bg-black/20" />
          <div className="h-1.5 w-[83%] bg-black/20" />
          <div className="h-1.5 w-[90%] bg-[#1452ff]" />
          <div className="h-3 w-[58%] bg-[#1452ff]" />
          <div className="h-1.5 w-[86%] bg-black/20" />
          <div className="rounded border border-dashed border-[#1452ff] px-2 py-1 text-[9px] tracking-[0.28em] text-[#1452ff]">
            PASSAGE · CITATION-READY
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
      <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 04</div>
      <div className="relative h-[180px] w-[250px]">
        <div className="absolute inset-x-0 bottom-8 h-px bg-black/10" />
        <div className="absolute inset-y-0 left-8 w-px bg-black/10" />
        <div className="absolute inset-y-0 left-[36%] w-px bg-black/5" />
        <div className="absolute inset-y-0 left-[64%] w-px bg-black/5" />
        <svg viewBox="0 0 250 180" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="why-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1452ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1452ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 20 142 C 72 136, 88 110, 115 92 C 145 71, 186 40, 228 24" fill="none" stroke="#1452ff" strokeWidth="2.5" />
          <path d="M 20 142 C 72 136, 88 110, 115 92 C 145 71, 186 40, 228 24 L 228 150 L 20 150 Z" fill="url(#why-chart-fill)" />
          <circle cx="228" cy="24" r="7" fill="#dbe4ff" stroke="#1452ff" strokeWidth="2" />
        </svg>
        <div className="absolute bottom-4 left-5 text-[9px] tracking-[0.3em] text-black/30">JAN · DEC · 2025</div>
      </div>
    </div>
  );
}

export default function WhyAscentPage() {
  return (
    <div className="bg-[#FAFAF7] text-[#0B0B0E]">
      <section className="relative overflow-hidden bg-[#0B0B0E] text-white pt-16 pb-12 md:pt-16 md:pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 78% 70% at 50% 40%, black 28%, transparent 80%)",
            opacity: 0.6,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 78% 24%, rgba(20,82,255,0.18), transparent 58%), radial-gradient(ellipse 46% 36% at 18% 86%, rgba(20,82,255,0.08), transparent 58%)",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="circle-spin absolute right-[-18%] top-[-10%] h-[980px] w-[980px] rounded-full border border-white/8 border-dashed" />
          <div className="circle-spin-r absolute right-[4%] top-[7%] h-[620px] w-[620px] rounded-full border border-[#1452ff]/20 border-dashed" />
          <div className="absolute right-[-2%] top-[17%] h-[320px] w-[320px] rounded-full border border-[#1452ff]/30 border-dashed" />
          <div className="absolute left-[-4%] bottom-[-10%] select-none text-[clamp(180px,22vw,320px)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]">
            GEO
          </div>
          <div className="absolute left-0 right-0 top-[44%] h-px bg-[#1452ff]/70 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
          <div className="absolute left-[12%] top-0 bottom-0 w-px bg-[#1452ff]/70 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
          <div className="absolute right-[14%] top-0 bottom-0 w-px bg-[#1452ff]/70 shadow-[0_0_18px_rgba(20,82,255,0.5)]" />
          <div className="absolute right-8 top-7 text-right text-[10px] tracking-[0.2em] text-white/40 font-mono">
            <div className="flex items-center justify-end gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1452ff] shadow-[0_0_8px_#1452ff]" />
              <span>VISIBILITY · LIVE</span>
            </div>
            <div className="mt-1">CITATIONS +34 / WK</div>
            <div className="mt-1">AI TRAFFIC +22%</div>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-2 text-[10px] tracking-[0.24em] text-[#1452ff] font-mono uppercase">
                <span className="pulse-dot" />
                Why Ascent
              </div>
              <h1
                className="max-w-[13ch] font-extrabold tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(50px, 5.5vw, 82px)", lineHeight: 0.96 }}
              >
                <span className="block">GEO は、</span>
                <span className="block">
                  <span className="text-blue-gradient">推測</span>ではなく
                </span>
                <span className="block">設計の科学である。</span>
              </h1>
              <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.75] text-white/68">
                AI はどこから、なぜ引用するのか。Ascent は特許・実消費者インテント・Embedding 評価という 4 本の柱で、その問いに定量で答える GEO を構築します。
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
                <CalendarBookingButton />
                <Button asChild variant="ctaOutline">
                  <Link href="/whitepaper">サービス資料をダウンロード</Link>
                </Button>
              </div>
            </div>

            <div className="relative z-10 lg:-mt-2">
              <div className="ml-auto max-w-[560px]">
                <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-4 text-[11px] tracking-[0.22em] text-white/35 font-mono">
                    <span className="h-px flex-1 bg-white/10" />
                    <span>OR</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      href={getCalendarBookingHref()}
                      {...getCalendarBookingLinkProps()}
                      className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-[#1452ff] hover:bg-[#1452ff]"
                    >
                      カレンダー予約（30分）
                    </Link>
                    <Link
                      href="/whitepaper"
                      className="inline-flex items-center justify-center rounded-full border border-white/14 px-5 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-[#1452ff] hover:bg-[#1452ff]"
                    >
                      サービス資料をダウンロード
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAF7] py-24 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionKicker overline="W/01 — Technical Foundation" label="特許ベースの GEO 解析" />
              <div className="mt-5 h-px bg-black/10" />
              <h2 className="mt-14 font-extrabold leading-[0.98] tracking-[-0.04em]">
                AI が「なぜ引用するか」は、
                <span className="text-blue-gradient">特許</span>
                に書かれている。
              </h2>
            </div>
            <p className="mt-16 max-w-[34ch] text-[18px] leading-[1.75] text-[#4e4e51] lg:justify-self-end">
              Google・Microsoft が公開する検索特許を解析し、Passage Ranking や Intent Ranking など 実装メカニズムから逆算した GEO を設計します。
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              {patentItems.map((item) => (
                <div key={item.num} className="grid grid-cols-[40px_1fr] gap-6 border-t border-black/10 py-10 first:border-t-0 first:pt-0">
                  <div className="font-mono text-[13px] tracking-[0.18em] text-[#1452ff]">{item.num}</div>
                  <div>
                    <h3 className="text-[20px] font-bold tracking-[-0.02em] md:text-[24px] whitespace-nowrap">{item.title}</h3>
                    <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.7] text-[#4e4e51] md:text-[17px]">
                      {item.desc}
                    </p>
                    <div className="mt-5 font-mono text-[11px] tracking-[0.18em] text-[#8e8e95]">
                      — {item.src}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:pt-2">
              <div className="sticky top-28 rounded-[20px] border border-black/10 bg-[#f3f0e8] p-6 md:p-8">
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-[#7b7b82] uppercase">
                  <span>Patent Logic</span>
                  <span>Flow</span>
                </div>
                <div className="mt-6 space-y-3">
                  {patentItems.map((item, index) => (
                    <div key={item.num}>
                      <div className={`rounded-xl border px-4 py-4 ${index === 2 ? "border-[#1452ff] bg-[#dee6ff]" : "border-black/10 bg-white/80"}`}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] tracking-[0.24em] text-[#1452ff]">{item.num}</span>
                          <span className="text-[14px] font-semibold text-[#0b0b0e]">{item.title}</span>
                        </div>
                        <div className="mt-2 text-[13px] leading-[1.6] text-[#4e4e51]">
                          {index === 0 && "Passage 単位で引用候補を絞る。"}
                          {index === 1 && "検索意図と回答構造の一致を評価する。"}
                          {index === 2 && "意味距離で候補 Passage を優先化する。"}
                          {index === 3 && "RAG の Retrieval 段階で候補を決める。"}
                        </div>
                      </div>
                      {index < patentItems.length - 1 ? <div className="mx-auto h-6 w-px bg-black/15" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B0B0E] py-24 text-white md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 28%, transparent 82%)",
            opacity: 0.45,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 20%, rgba(20,82,255,0.20), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(20,82,255,0.10), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionKicker overline="W/02 — Intent Intelligence" label="リスニングマインド" dark />
          <div className="mt-5 h-px bg-white/10" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="font-extrabold leading-[0.98] tracking-[-0.04em]">
                実消費者の質問データから、
                <br />
                GEO を逆算する。
              </h2>
              <p className="mt-8 max-w-[34ch] text-[18px] leading-[1.75] text-white/68">
                キーワードプランナーや SEO ツールでは見えない、「実際の消費者の問い」。リスニングマインドは数百万件の実検索ログ・SNS・コミュニティから消費者インテントを抽出します。
              </p>
              <p className="mt-6 max-w-[34ch] text-[18px] leading-[1.75] text-white/68">
                CEP(Category Entry Point) と Search Path に基づき、AI が答えるべき問いの構造を可視化。GEO コンテンツの設計図になります。
              </p>
              <ul className="mt-8 space-y-4">
                {listeningBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[17px] leading-[1.5] text-white">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[#1452ff]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-[#101014] p-6 md:p-8">
              <div className="font-mono text-[11px] tracking-[0.22em] text-white/45 uppercase">
                Search Path · Galaxy AI
              </div>
              <div className="mt-7 text-[15px] tracking-[0.24em] text-white/50">— Seed Query</div>
              <div className="mt-3 text-[clamp(22px,2vw,32px)] font-bold tracking-[-0.03em]">&quot;Galaxy AI とは&quot;</div>

              <div className="mt-8 space-y-4">
                {searchBranches.map((branch, index) => (
                  <div
                    key={`${branch.lvl}-${branch.q}`}
                    className={`rounded-xl border px-4 py-4 ${
                      index === 0 ? "border-white/10 bg-white/[0.03]" : "border-white/8 bg-white/[0.02]"
                    } ${index > 0 ? "ml-4" : ""} ${index > 2 ? "ml-8" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-[0.24em] text-[#1452ff]">{branch.lvl}</span>
                      <span className="flex-1 text-[15px] font-medium text-white">{branch.q}</span>
                      <span className="font-mono text-[11px] tracking-[0.14em] text-white/38">{branch.vol}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/8 pt-5 font-mono text-[10px] tracking-[0.2em] text-white/35">
                <div>NODES · 1,284</div>
                <div>DEPTH · 4 LEVELS</div>
                <div>UPDATED · 2026.05</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="framework" className="bg-[#FAFAF7] pt-24 pb-12 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionKicker overline="W/03 — Methodology Detail" label="GEO Framework — 4 本柱" />
          <div className="mt-5 h-px bg-black/10" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <h2 className="font-extrabold leading-[0.98] tracking-[-0.04em]">
              診断、分析、設計、計測。
              <br />
              <span className="text-blue-gradient">4本</span>
              を有機的に回す。
            </h2>
            <p className="max-w-[34ch] text-[18px] leading-[1.75] text-[#4e4e51] lg:justify-self-end">
              単発の施策では AI 検索に勝てない。 Question から Visibility まで一気通貫で回す 循環型フレームワークが Ascent の方法論です。
            </p>
          </div>

          <div className="mt-16 divide-y divide-black/10 border-t border-black/10">
            {frameworkRows.map((row) => (
              <div
                key={row.num}
                className="grid gap-8 py-8 lg:grid-cols-[72px_220px_1fr_280px] lg:gap-10"
              >
                <div className="font-mono text-[13px] tracking-[0.2em] text-[#1452ff]">{row.num}</div>
                <div>
                  <h3 className="max-w-[10ch] text-[24px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[28px]">
                    {row.title}
                  </h3>
                  <div className="mt-3 font-mono text-[12px] tracking-[0.14em] text-[#7b7b82] uppercase">
                    {row.meta}
                  </div>
                </div>
                <div>
                  <p className="max-w-[40ch] text-[17px] leading-[1.7] text-[#4e4e51]">{row.desc}</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {row.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-[16px] text-[#0b0b0e]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1452ff]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <DiagramCard kind={row.viz} />
              </div>
            ))}
          </div>
        </div>
      </section>

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
