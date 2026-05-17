import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { CTASection } from "@/components/layout/CTASection";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { FrameworkLoop } from "./FrameworkLoop";

export const metadata: Metadata = {
  title: "Framework — GEO",
  description: "質問から最適化までを、ひと続きの設計に。",
};

export const dynamic = "force-static";

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
      </div>
    );
  }

  if (kind === "matrix") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 02</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%]">
            <div className="mb-5 flex items-center justify-between text-[9px] tracking-[0.28em] text-black/30">
              <span>SEMANTIC SIMILARITY</span>
              <span>0—12</span>
            </div>
            <div className="space-y-3">
              {[
                { n: "Coverage", v: 9, weak: false },
                { n: "Specificity", v: 7, weak: false },
                { n: "Authority", v: 11, weak: false },
                { n: "Recency", v: 4, weak: true },
                { n: "Schema", v: 3, weak: true },
                { n: "Passage Fit", v: 8, weak: false },
              ].map((r) => (
                <div key={r.n} className="flex items-center gap-3 text-[11px]">
                  <span className="w-[72px] text-black/55">{r.n}</span>
                  <div className="h-2.5 flex-1 rounded-full bg-black/[0.05]">
                    <div
                      className={`h-2.5 rounded-full ${r.weak ? "bg-[#E7A8A0]" : "bg-[#1452FF]"}`}
                      style={{ width: `${(r.v / 12) * 100}%` }}
                    />
                  </div>
                  <span className="w-[34px] text-right text-black/50">{r.v}/12</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "document") {
    return (
      <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
        <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 03</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[72%] text-[11px] leading-[1.45]">
            <div className="mb-3 flex items-center justify-between text-[9px] tracking-[0.28em] text-black/35">
              <span>PASSAGE.MD</span>
              <span>OPTIMIZED</span>
            </div>
            <div className="space-y-2 text-[#1452FF]">
              <div>## バッテリーは何時間持つか？</div>
              <div className="text-[#0B0B0E]">5,000mAh 搭載、通常使用で 約 28 時間。</div>
              <div className="pt-1 text-[#1452FF]">### 発熱はどう抑えるか？</div>
              <div className="text-[#0B0B0E]">ベイパーチャンバー＋ AI 制御で 表面温度 -8℃。</div>
              <div className="pt-1 text-[#1452FF]">### FAQ Schema</div>
              <div className="text-[#0B0B0E]">@type: Question / acceptedAnswer</div>
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%]">
            <div className="mb-4 flex items-center justify-between text-[9px] tracking-[0.28em] text-black/35">
              <span>VISIBILITY · 30D</span>
              <span>LIVE</span>
            </div>
            <div className="space-y-3">
              {[
                ["BRAND VISIBILITY", "42.7%", "+8.4"],
                ["CITATIONS / WK", "187", "+34"],
                ["AI TRAFFIC", "12.4K", "+22%"],
                ["SHARE OF VOICE", "31.2%", "+5.1"],
              ].map(([label, value, delta]) => (
                <div key={label} className="flex items-end justify-between border-b border-black/5 pb-2">
                  <span className="text-[10px] tracking-[0.12em] text-black/50">{label}</span>
                  <span className="text-[28px] leading-none font-semibold text-[#0B0B0E]">
                    {value}
                    <small className="ml-1 text-[11px] font-normal text-[#1452FF]">{delta}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-[18px] border border-black/10 bg-[#f3f0e8]">
      <div className="absolute left-4 top-4 text-[10px] tracking-[0.24em] text-black/30">F · 05</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%]">
          <div className="mb-4 flex items-center justify-between text-[9px] tracking-[0.28em] text-black/35">
            <span>RECOMMENDATIONS</span>
            <span>AUTO</span>
          </div>
          <div className="space-y-3">
            {[
              ["PRIORITY 01", "「急速充電 vs 競合」記事の追加"],
              ["PRIORITY 02", "FAQ Schema の再構造化（4 ページ）"],
              ["PRIORITY 03", "Authority リンクの増強"],
              ["PRIORITY 04", "新規質問クラスタの執筆計画"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[12px] border border-black/8 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.03)]">
                <div className="mb-1 text-[9px] tracking-[0.28em] text-black/35">{title}</div>
                <div className="text-[12px] leading-[1.5] text-[#0B0B0E]">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkHero() {
  return (
    <section
      className="hero-fixed relative overflow-hidden text-white py-12 lg:py-16"
      style={{
        background: "var(--hero-gradient)",
      }}
    >
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
      <div className="absolute right-[10%] top-[20%] w-[500px] h-[500px] bg-[#1452FF]/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="arc-spin"
          style={{ position: "absolute", width: 1100, height: 1100, right: -480, top: -260, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "50%" }}
        />
        <div style={{ position: "absolute", width: 720, height: 720, right: -200, top: 40, border: "1px solid rgba(20,82,255,0.18)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: 360, height: 360, right: 40, top: 200, border: "1px dashed rgba(20,82,255,0.32)", borderRadius: "50%" }} />
        <div
          style={{
            position: "absolute", left: -40, bottom: -40,
            fontWeight: 800, fontSize: "clamp(180px, 22vw, 320px)",
            letterSpacing: "-0.06em", color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            lineHeight: 0.85, userSelect: "none", whiteSpace: "nowrap",
          }}
        >
          GEO.
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scan 8s ease-in-out -2s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 11s ease-in-out -1s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 13s ease-in-out -5s infinite" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-4 sm:px-6 lg:px-10 lg:grid-cols-[1.18fr_1fr] lg:items-start">
        <div className="pt-8">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-[#1452FF]">
            <span className="h-2 w-2 rounded-full bg-[#1452FF]" />
            GEO FRAMEWORK
          </div>
          <h1 className="font-bold text-[#FAFAF7]" style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}>
            質問から最適化までを
            <br />
            <span className="text-[#6fa0ff]">ひと続きの設計</span>
            に。
          </h1>
          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.7] text-[#d3d3d8]">
            Question Intelligence、Semantic GAP、GEO Content、AI Visibility、Optimization Loop。
            5つのフェーズを連動させ、AI 検索時代に「引用され続ける」状態をつくるための Ascent の設計です。
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
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

        <div>
          <div className="w-full max-w-[620px] mx-auto lg:ml-auto">
            <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkOverview() {
  return (
    <section className="bg-[#FAFAF7] py-[100px]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="font-mono text-[12px] tracking-[0.18em] text-[#6B6B73] uppercase mb-6">
          [ 01 ] FRAMEWORK · LOOP
        </div>
        <h2 className="font-bold leading-[1.05] tracking-[-0.03em] mb-6 text-[clamp(28px,3.2vw,48px)]">
          5フェーズが、ひとつのループとして回る。
        </h2>
        <p className="text-[19px] text-[#6B6B73] max-w-[60ch] leading-[1.6] mb-16">
          単発のSEO施策ではなく、データを起点に質問→分析→制作→計測→改善を継続的に循環させる。AI 検索時代に「持続的に引用される」状態をつくるための設計。
        </p>
        <div className="hidden lg:block">
          <FrameworkLoop />
        </div>
      </div>
    </section>
  );
}

function FrameworkSteps() {
  return (
    <section className="bg-[#FAFAF7] pb-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <SectionLabel title="Phase Breakdown" />
        <h2 className="mt-4 font-bold leading-[1.08] tracking-[-0.03em] text-[#0B0B0E] text-[clamp(32px,3.2vw,48px)]">
          各フェーズで、何が起きるか。
        </h2>

        <div className="mt-12 space-y-8">
          {frameworkSteps.map((step) => (
            <article
              key={step.id}
              className="grid grid-cols-1 gap-6 border-t border-black/10 pt-8 lg:grid-cols-[3fr_2fr] lg:gap-10"
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
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <SectionLabel title="Frequently Asked" />
        <h2 className="mt-4 font-bold tracking-[-0.03em] text-[#0B0B0E] text-[clamp(32px,3.2vw,48px)]">
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
