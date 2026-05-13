import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref } from "@/lib/calendar-booking";

export const metadata: Metadata = {
  title: "Framework — GEO",
  description: "質問から最適化までを、ひと続きの設計に。",
};

const frameworkSteps = [
  {
    id: "01",
    title: "Question Intelligence",
    subtitle: "CDJ ベースの質問生成",
    description:
      "検索クエリだけでなく、実消費者の意思決定プロセスから質問群を抽出し、GEO が答えるべき問いを定義します。",
    bullets: ["CDJ 質問生成", "Question Cluster", "CEP マッピング", "検索ボリューム統合"],
    visual: "network",
  },
  {
    id: "02",
    title: "Semantic GAP Analysis",
    subtitle: "12点評価モデル",
    description:
      "質問と既存コンテンツの意味的な距離を見える化し、何が足りないかを定量化。改善順序を決める土台を作ります。",
    bullets: ["12点評価", "Semantic Similarity", "GAP 可視化", "優先順位設計"],
    visual: "matrix",
  },
  {
    id: "03",
    title: "GEO Content Engineering",
    subtitle: "Passage / FAQ / Schema",
    description:
      "AI に引用されやすい Passage 単位で構成を設計。見出し、定義、FAQ、Schema をひとつの流れで組み立てます。",
    bullets: ["Passage Optimization", "FAQ 構造", "Schema 設計", "引用前提のライティング"],
    visual: "document",
  },
  {
    id: "04",
    title: "AI Visibility Monitoring",
    subtitle: "Citation / Visibility / Traffic",
    description:
      "ChatGPT、Gemini、Copilot、Perplexity など複数エンジンで露出状況を観測し、改善のための現在地を把握します。",
    bullets: ["Brand Visibility", "Citation Tracking", "AI Traffic", "月次レポート"],
    visual: "chart",
  },
  {
    id: "05",
    title: "Optimization Loop",
    subtitle: "継続改善サイクル",
    description:
      "計測結果を次の質問設計とコンテンツ改善へ戻し、単発施策ではなく継続的に引用される状態へ近づけます。",
    bullets: ["改善ループ", "再評価", "再設計", "継続運用"],
    visual: "loop",
  },
] as const;

const faqItems = [
  {
    q: "GEO と SEO は何が違いますか？",
    a: "SEO は順位の最適化、GEO は AI に引用される情報構造の最適化です。質問の意味、Passage の切り方、回答の根拠設計が中心になります。",
  },
  {
    q: "どれくらいの期間で変化が見えますか？",
    a: "既存資産の状態にもよりますが、まずは 4〜6 週で引用の兆候が見え始めるケースがあります。改善の蓄積で 3 か月単位の差が出やすくなります。",
  },
  {
    q: "既存の SEO 施策と併用できますか？",
    a: "はい。むしろ既存コンテンツを GEO 仕様へ再構成することで、コストを抑えつつ AI 検索に対応しやすくなります。",
  },
  {
    q: "質問データはどこから作りますか？",
    a: "CDJ、検索ログ、AI 経由のクエリ、既存の問い合わせ傾向などを組み合わせます。推測だけではなく、実データから質問群を組み立てます。",
  },
] as const;

function SectionLabel({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase ${dark ? "text-white/60" : "text-[#6f6f74]"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
      <span>{title}</span>
    </div>
  );
}

function VisualCard({ kind }: { kind: (typeof frameworkSteps)[number]["visual"] }) {
  if (kind === "network") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 01</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[174px] w-[174px] rounded-full border border-[#1452ff]/55">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1452ff]" />
            <span className="absolute left-[16%] top-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
            <span className="absolute right-[16%] top-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
            <span className="absolute left-[10%] bottom-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
            <span className="absolute right-[10%] bottom-[18%] h-4 w-4 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
            <span className="absolute bottom-[4%] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
            <span className="absolute left-1/2 top-[20%] h-px w-[60%] -translate-x-1/2 bg-[#1452ff]/55" />
            <span className="absolute left-1/2 top-[20%] h-[60%] w-px -translate-x-1/2 bg-[#1452ff]/55" />
            <span className="absolute left-[24%] top-[26%] h-px w-[32%] -rotate-[36deg] bg-[#1452ff]/55" />
            <span className="absolute right-[24%] top-[26%] h-px w-[32%] rotate-[36deg] bg-[#1452ff]/55" />
            <span className="absolute left-[24%] bottom-[28%] h-px w-[32%] rotate-[36deg] bg-[#1452ff]/55" />
            <span className="absolute right-[24%] bottom-[28%] h-px w-[32%] -rotate-[36deg] bg-[#1452ff]/55" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "matrix") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 02</div>
        <div className="absolute inset-0 flex items-center justify-center">
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
                      value === 0 ? "#efede5" : `rgba(20,82,255,${0.15 + value * 0.12})`,
                  }}
                />
              ))
            )}
          </div>
        </div>
        <div className="absolute bottom-5 left-6 text-[9px] tracking-[0.32em] text-black/35">SCORE 0 → 12</div>
      </div>
    );
  }

  if (kind === "document") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 03</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[72%] space-y-3">
            <div className="h-3 w-[85%] bg-black" />
            <div className="h-1.5 w-[92%] bg-black/20" />
            <div className="h-1.5 w-[78%] bg-black/20" />
            <div className="h-1.5 w-[83%] bg-black/20" />
            <div className="h-1.5 w-[90%] bg-[#1452ff]" />
            <div className="h-3 w-[58%] bg-[#1452ff]" />
            <div className="h-1.5 w-[86%] bg-black/20" />
            <div className="rounded border border-dashed border-[#1452ff] px-2 py-1 text-[9px] tracking-[0.28em] text-[#1452ff]">
              PASSAGE · CITATION READY
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "chart") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 04</div>
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 bottom-8 h-px bg-black/10" />
          <div className="absolute inset-y-0 left-8 w-px bg-black/10" />
          <div className="absolute inset-y-0 left-[36%] w-px bg-black/5" />
          <div className="absolute inset-y-0 left-[64%] w-px bg-black/5" />
          <svg viewBox="0 0 250 180" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="framework-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1452ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1452ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 20 142 C 72 136, 88 110, 115 92 C 145 71, 186 40, 228 24" fill="none" stroke="#1452ff" strokeWidth="2.5" />
            <path d="M 20 142 C 72 136, 88 110, 115 92 C 145 71, 186 40, 228 24 L 228 150 L 20 150 Z" fill="url(#framework-chart-fill)" />
            <circle cx="228" cy="24" r="7" fill="#dbe4ff" stroke="#1452ff" strokeWidth="2" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
      <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 05</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[170px] w-[170px] rounded-full border border-[#1452ff]/60">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#1452ff]/25" />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1452ff] text-[10px] font-semibold tracking-[0.24em] text-white">
            LOOP
          </div>
          <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
          <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
          <span className="absolute bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
          <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[#1452ff] bg-[#dbe4ff]" />
        </div>
      </div>
    </div>
  );
}

function FrameworkHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0E] text-white pt-16 pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 80% 22%, rgba(20,82,255,0.2), transparent 58%), radial-gradient(ellipse 45% 36% at 18% 86%, rgba(20,82,255,0.1), transparent 58%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-16%] top-[-8%] h-[960px] w-[960px] rounded-full border border-white/8 border-dashed" />
        <div className="absolute right-[4%] top-[8%] h-[620px] w-[620px] rounded-full border border-[#1452ff]/20 border-dashed" />
        <div className="absolute right-[-1%] top-[18%] h-[320px] w-[320px] rounded-full border border-[#1452ff]/30 border-dashed" />
        <div className="absolute left-[-6%] bottom-[-12%] select-none text-[clamp(180px,22vw,320px)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]">
          GEO
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-10 lg:grid-cols-[1.18fr_1fr] lg:items-start">
        <div className="pt-8">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-[#1452FF]">
            <span className="h-2 w-2 rounded-full bg-[#1452FF]" />
            GEO FRAMEWORK
          </div>
          <h1 className="max-w-[11ch] text-[clamp(46px,4.9vw,68px)] font-bold leading-[1.04] tracking-[-0.04em]">
            質問から最適化までを
            <br />
            <span className="text-[#6fa0ff]">ひと続きの設計</span>
            に。
          </h1>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.7] text-[#d3d3d8]">
            Question Intelligence、Semantic GAP、GEO Content、AI Visibility、Optimization Loop。
            5つのフェーズを連動させ、AI 検索時代に「引用され続ける」状態をつくるための Ascent の設計です。
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CalendarBookingButton />
            <Button asChild variant="ctaOutline">
              <Link href="/whitepaper">サービス資料をダウンロード</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              "Question",
              "Semantic",
              "Content",
              "Visibility",
              "Loop",
            ].map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-[11px] tracking-[0.22em] text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-6">
          <div className="rounded-[24px] border border-white/10 bg-[#f8f6f1] p-4 text-[#0B0B0E] shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkOverview() {
  return (
    <section className="bg-[#FAFAF7] py-24">
      <div className="mx-auto max-w-[1280px] px-10">
        <SectionLabel title="Framework · Loop" />
        <div className="mt-4 h-px bg-black/10" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.02fr] lg:items-center">
          <div>
            <h2 className="max-w-[12ch] text-[clamp(34px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0B0B0E]">
              5フェーズが、ひとつのループとして回る。
            </h2>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.72] text-[#4e4e51]">
              単発の施策ではなく、質問 → 分析 → 制作 → 計測 → 改善を継続的に循環させる。
              そのサイクルを、ブランドごとに設計し直すのが Ascent の GEO Framework です。
            </p>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
            <div className="absolute left-6 top-6 text-[10px] tracking-[0.24em] text-black/30">FRAMEWORK LOOP</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[360px] w-[360px]">
                <div className="absolute inset-0 rounded-full border border-[#1452ff]/20" />
                <div className="absolute inset-[46px] rounded-full border border-dashed border-[#1452ff]/18" />
                <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B0B0E] text-[10px] font-semibold tracking-[0.3em] text-white">
                  CORE
                </div>
                {[
                  { top: 8, left: 50, label: "Question" },
                  { top: 27, left: 82, label: "Semantic" },
                  { top: 61, left: 73, label: "Content" },
                  { top: 78, left: 19, label: "Visibility" },
                  { top: 27, left: 15, label: "Loop" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="absolute flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1452ff] bg-[#dbe4ff] text-center text-[10px] font-semibold tracking-[0.12em] text-[#0B0B0E]"
                    style={{ top: `${node.top}%`, left: `${node.left}%` }}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkSteps() {
  return (
    <section className="bg-[#FAFAF7] pb-20">
      <div className="mx-auto max-w-[1280px] px-10">
        <SectionLabel title="Phase Breakdown" />
        <h2 className="mt-4 text-[clamp(34px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0B0B0E]">
          各フェーズで、何が起きるか。
        </h2>

        <div className="mt-12 space-y-8">
          {frameworkSteps.map((step) => (
            <article
              key={step.id}
              className="grid grid-cols-1 gap-6 border-t border-black/10 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10"
            >
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="pt-1">
                  <div className="text-[11px] tracking-[0.24em] text-[#1452FF]">{step.id}</div>
                </div>
                <div>
                  <h3 className="text-[clamp(26px,2.4vw,34px)] font-bold leading-[1.12] tracking-[-0.03em] text-[#0B0B0E]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] tracking-[0.18em] text-[#6b6b70]">{step.subtitle}</p>
                  <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.72] text-[#4e4e51]">
                    {step.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {step.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px] leading-[1.45] text-[#0B0B0E]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <VisualCard kind={step.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FrameworkFAQ() {
  return (
    <section className="bg-[#FAFAF7] py-10">
      <div className="mx-auto max-w-[1280px] px-10">
        <SectionLabel title="Frequently Asked" />
        <h2 className="mt-4 text-[clamp(32px,3vw,44px)] font-bold tracking-[-0.03em] text-[#0B0B0E]">
          よくある質問。
        </h2>

        <div className="mt-10 divide-y divide-black/10 border-t border-black/10">
          {faqItems.map((item, index) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <div className="max-w-[56ch]">
                  <div className="text-[11px] tracking-[0.24em] text-[#1452FF]">Q.0{index + 1}</div>
                  <h3 className="mt-2 text-[20px] font-semibold leading-[1.4] text-[#0B0B0E]">{item.q}</h3>
                </div>
                <span className="mt-1 text-[22px] leading-none text-[#1452FF] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[68ch] pl-0 text-[16px] leading-[1.75] text-[#4e4e51]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FrameworkPage() {
  return (
    <div className="bg-[#FAFAF7] text-[#0B0B0E]">
      <FrameworkHero />
      <FrameworkOverview />
      <FrameworkSteps />
      <FrameworkFAQ />
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
