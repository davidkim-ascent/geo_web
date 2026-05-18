import Link from "next/link";
import type { Metadata } from "next";
import { Backpack, Dumbbell, Flame } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { SeoGeoCTASection } from "@/components/layout/SeoGeoCTASection";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { SearchPathPanel } from "@/components/why-ascent/SearchPathPanel";

export const metadata: Metadata = {
  title: "Why Ascent — GEO",
  description: "GEO は、推測ではなく設計の科学である。",
};

export const dynamic = "force-static";

const patentItems = [
  {
    num: "01",
    title: "Passage Ranking",
    desc: "AI は文章全体ではなく、特定の Passage(文節)を引用する。 Passage 単位での最適化が引用獲得の核心。",
    src: "GOOGLE PATENT · US10810199B2",
  },
  {
    num: "02",
    title: "Intent Ranking",
    desc: "検索クエリの背後にある「意図」を分類し、生成回答に組み込む。 Intent との一致が引用条件。",
    src: "MICROSOFT PATENT · US11003660",
  },
  {
    num: "03",
    title: "Embedding Similarity",
    desc: "質問の「意味」と文章の「意味」を数値で比較し、引用候補を絞り込む技術。Semantic Similarity（意味的類似度）が一定閾値を超えたPassage(文節)が候補化。",
    src: "GOOGLE PATENT · US10324946",
  },
];

const intentNodes = [
  {
    id: "01",
    label: "入門者・Beginner",
    desc: "概念を調べ始めたばかり。ガイド・用語解説を求める。",
    pct: "42",
  },
  {
    id: "02",
    label: "実務者・Practitioner",
    desc: "社内で自ら実行する。チェックリストや実行ノウハウを探す。",
    pct: "33",
  },
  {
    id: "03",
    label: "発注検討者・Decision-maker",
    desc: "外部代理店を比較検討中。成果と料金を見る。",
    pct: "25",
  },
];

const cepCards = [
  {
    id: "CEP 01",
    icon: Dumbbell,
    accent: "#1452ff",
    tint: "rgba(20, 82, 255, 0.10)",
    scenario: "ジムを始めたばかりの初心者で、何を摂ればいいか分からず、初めて製品を選ぶ場面",
    factor: "目的に合うタンパク源の選定 / 水溶性 / 初心者向け糖質・脂質バランス",
    vol: "971",
  },
  {
    id: "CEP 02",
    icon: Flame,
    accent: "#db2777",
    tint: "rgba(219, 39, 119, 0.10)",
    scenario: "運動後に空腹だが食事がすぐ取れない時、近場で「とりあえずタンパク質」が欲しい場面",
    factor: "すぐ飲める RTD ドリンク / 1回分小分けパッケージ / 低糖質ブレンド",
    vol: "868",
  },
  {
    id: "CEP 03",
    icon: Backpack,
    accent: "#9333ea",
    tint: "rgba(147, 51, 234, 0.10)",
    scenario: "ジム → 会社 → 家の移動が多く、持ち歩きながら「取り出してすぐ」飲みたい日",
    factor: "蓋付きカップ / 個別パウチ / バッグに入る軽量・コンパクト設計",
    vol: "606",
  },
];

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

export default async function WhyAscentPage() {
  return (
    <div className="bg-[#FAFAF7] text-[#0B0B0E]">
      <section
        className="hero-fixed relative text-white py-12 lg:py-16"
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
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scan 8s ease-in-out -2s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 11s ease-in-out -1s infinite" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 13s ease-in-out -5s infinite" }} />
          <div className="absolute right-8 top-7 text-right text-[10px] tracking-[0.2em] text-white/40 font-mono">
            <div className="flex items-center justify-end gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1452ff] shadow-[0_0_8px_#1452ff]" />
              <span>VISIBILITY · LIVE</span>
            </div>
            <div className="mt-1">CITATIONS +34 / WK</div>
            <div className="mt-1">AI TRAFFIC +22%</div>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.18fr_1fr] lg:gap-16">
            <div className="relative z-10 pt-8">
              <div className="mb-5 flex items-center gap-2 text-[10px] tracking-[0.24em] text-[#1452ff] font-mono uppercase">
                <span className="pulse-dot" />
                Why Ascent
              </div>
              <h1
                className="max-w-[13ch] font-bold text-white"
                style={{ fontSize: "clamp(44px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em", wordBreak: "keep-all" }}
              >
                <span className="block">GEO は、</span>
                <span className="block">
                  <span className="text-blue-gradient">推測</span>ではなく
                </span>
                <span className="block">設計の科学である。</span>
              </h1>
              <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.75] text-white/68">
                AI は「どこから、なぜ」引用するのか。Ascent は特許ベースGEO施策・消費者インテント(本音)・スコアリングという 3本の柱で、データを解明しAIに選ばれるブランドをつくります。
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px]">
                <CalendarBookingButton />
                <Button asChild variant="ctaOutline">
                  <Link href="/whitepaper">サービス資料をダウンロード</Link>
                </Button>
              </div>
              <HeroLogoMark />
            </div>

            <div className="relative z-10 w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
              <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
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
              <h2 className="mt-14 font-extrabold leading-[0.98] tracking-[-0.04em] text-[clamp(32px,4vw,48px)]">
                AI が「なぜ引用するか」は、
                <span className="text-blue-gradient">特許</span>
                に書かれている。
              </h2>
            </div>
            <p className="mt-16 max-w-[34ch] text-[18px] leading-[1.75] text-[#4e4e51] lg:justify-self-end">
              Google・Microsoft が公開する検索特許を解析し、Passage Ranking や Intent Ranking など 実装メカニズムから逆算した <Link href="/framework" className="underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors text-[#0b0b0e]">GEO を設計</Link>します。
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

      {/* Section 2: W/02·A — SEARCH INTENT */}
      <section className="relative overflow-hidden bg-[#0B0B0E] pt-24 pb-24 text-white md:pt-28 md:pb-28">
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
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionKicker overline="W/02·A — INTENT INTELLIGENCE" label="意図 — SEARCH INTENT" dark />
          <div className="mt-5 h-px bg-white/10" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="font-extrabold leading-[1.2] tracking-[-0.04em] text-[clamp(32px,3vw,44px)]">
                キーワードの背後にいる
                <br />
                <span className="text-[#1452ff] pr-1">「真の顧客」</span>を見つめる。
              </h2>
              <div className="mt-16">
                <h3 className="text-[22px] md:text-[26px] font-bold leading-[1.3] tracking-[-0.02em]">
                  同じ質問の中に、
                  <br />
                  複数の顧客が混在している。
                </h3>
                <p className="mt-6 text-[16px] md:text-[18px] leading-[1.75] text-white/68">
                  Ascentが開発した「<Link href="/services" className="underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors text-white">リスニングマインド</Link>」ソリューションを活用し、キーワードの背後に隠れた潜在顧客を自動で分類します。例えば「SEO対策」というキーワードの中には、概念を調べ始めた <strong className="text-white font-medium">入門者</strong>、社内で実行する <strong className="text-white font-medium">実務者</strong>、外部に発注を検討する <strong className="text-white font-medium">発注検討者</strong> が混在しています。
                </p>
                <p className="mt-5 text-[16px] md:text-[18px] leading-[1.75] text-white/68">
                  つまり、単にキーワードをターゲットにするのではなく、ユーザーの <strong className="text-white font-medium">Search Intent（検索意図）</strong> を正確に把握した上で、最適な <Link href="/framework" className="underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors text-white">GEO 設計</Link>を行います。
                </p>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-[#101014] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <span className="rounded-full border border-[#1452ff]/30 text-[#1452ff] bg-[#1452ff]/10 px-3 py-1 text-[10px] tracking-[0.15em]">
                  REAL-DATA SAMPLE
                </span>
              </div>
              <div className="font-mono text-[11px] tracking-[0.22em] text-white/45 uppercase">
                SINGLE KEYWORD · 3 INTENTS
              </div>

              <div className="mt-12 flex items-center h-full relative z-10 pb-6 md:pb-0">
                {/* Left side Keyword */}
                <div className="w-[120px] md:w-[140px] shrink-0">
                  <div className="text-[10px] font-mono tracking-[0.1em] text-white/40 mb-2">MONTHLY AVG.</div>
                  <div className="text-[20px] font-bold tracking-[-0.02em] mb-1">「SEO対策」</div>
                  <div className="text-[28px] md:text-[32px] font-bold text-[#1452ff] tracking-tight leading-none mb-2">27,466</div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-white/30">SEARCHES / MO</div>
                </div>

                {/* Connecting lines - SVG */}
                <div className="absolute left-[110px] md:left-[130px] right-[200px] md:right-[240px] top-0 bottom-0 pointer-events-none hidden sm:block z-0">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,50 C50,50 50,15 100,15" fill="none" stroke="#1452ff" strokeWidth="1.5" className="opacity-80" />
                    <path d="M0,50 L100,50" fill="none" stroke="#1452ff" strokeWidth="1.5" className="opacity-80" />
                    <path d="M0,50 C50,50 50,85 100,85" fill="none" stroke="#1452ff" strokeWidth="1.5" className="opacity-80" />
                    <circle cx="0" cy="50" r="2" fill="#1452ff" />
                    <circle cx="100" cy="15" r="2" fill="#1452ff" />
                    <circle cx="100" cy="50" r="2" fill="#1452ff" />
                    <circle cx="100" cy="85" r="2" fill="#1452ff" />
                  </svg>
                </div>

                {/* Right side Nodes */}
                <div className="flex-1 flex flex-col gap-4 pl-4 sm:pl-16 md:pl-20 relative z-10">
                  {intentNodes.map((node) => (
                    <div key={node.id} className="rounded-xl border border-white/10 bg-[#16161a] p-4 flex gap-3 md:gap-4 items-center">
                      <div className="w-6 h-6 rounded-full border border-[#1452ff] flex items-center justify-center shrink-0">
                        <span className="text-[9px] text-[#1452ff] font-mono">{node.id}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[13px] md:text-[14px] leading-tight mb-1">{node.label}</div>
                        <div className="text-[11px] text-white/50 leading-snug">{node.desc}</div>
                      </div>
                      <div className="text-[20px] md:text-[22px] font-bold text-white shrink-0">
                        {node.pct}<span className="text-[12px] font-normal text-white/50 ml-0.5">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: W/02·C — CEP × GEO */}
      <section className="bg-[#FAFAF7] py-24 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionKicker overline="W/02·C — INTENT INTELLIGENCE" label="文脈 — CEP × GEO" />
          <div className="mt-5 h-px bg-black/10" />

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <h2 className="font-extrabold leading-[1.2] tracking-[-0.04em] text-[clamp(32px,3vw,44px)]">
              人がAIに問うのは、
              <br />
              キーワードではなく
              <span className="text-[#1452ff] mx-1">CEP</span>
              である。
            </h2>
            <p className="max-w-[34ch] text-[16px] md:text-[18px] leading-[1.75] text-[#4e4e51] lg:justify-self-end pt-4">
              AI Overview も生成型検索も、質問の背景に応じて回答を組み立てる。文脈のないコンテンツは、もはや引用も推奨もされません。
            </p>
          </div>

          <div className="mt-10">
            <div className="max-w-[800px]">
              <h3 className="text-[22px] md:text-[26px] font-bold leading-[1.3] tracking-[-0.02em]">
                消費者の「生活文脈(CEP)」に
                <br />
                基づくGEO施策が可能。
              </h3>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#4e4e51]">
                消費者の「<Link href="/lab/brand-cep" className="font-semibold text-black underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors">CEP(Category Entry Point)</Link>」に
                <br />
                基づくGEO施策が可能。CEPとは、消費者がブランドを思い浮かべる<strong className="font-semibold text-black">状況・悩み・購買判断要素</strong>を指します。リスニングマインドはここまで掘り下げて、AI に引用される条件を構造化します。
              </p>
              <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[#4e4e51]">
                シチュエーション・心理状態・購買タイミングを整理し、AIが「状況」に応じて推奨できる<Link href="/services" className="font-semibold text-black underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors">CEPベースの質問と対応コンテンツ</Link>を設計します。GEO の観点で極めて有利な施策が可能です。
              </p>
            </div>

            <div className="mt-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cepCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#101014] p-6 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.65)] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ background: card.accent }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute right-[-24px] top-[-24px] h-32 w-32 rounded-full blur-2xl opacity-70"
                      style={{ background: card.tint }}
                    />
                    <div>
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div
                          className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
                          style={{
                            borderColor: `${card.accent}55`,
                            backgroundColor: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent }} />
                          <span className="text-[10px] font-mono tracking-[0.15em]" style={{ color: card.accent }}>
                            {card.id}
                          </span>
                        </div>
                        <div
                          className="grid h-12 w-12 place-items-center rounded-2xl border shadow-[0_10px_24px_-12px_rgba(0,0,0,0.75)]"
                          style={{
                            backgroundColor: card.tint,
                            borderColor: card.accent,
                            color: card.accent,
                          }}
                        >
                          <card.icon size={22} strokeWidth={2.2} />
                        </div>
                      </div>
                      <p className="mt-5 text-[14px] md:text-[15px] leading-[1.6] font-medium text-white/92">
                        {card.scenario}
                      </p>
                      <div
                        className="mt-6 rounded-xl border p-4"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                          borderColor: `${card.accent}33`,
                        }}
                      >
                        <div className="text-[9px] font-mono tracking-[0.15em] mb-2 uppercase" style={{ color: card.accent }}>
                          KEY BUYING FACTOR
                        </div>
                        <div className="text-[13px] leading-[1.5] text-white/68">
                          {card.factor}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-4">
                      <span className="text-[10px] font-mono tracking-[0.15em] text-white/45">関連 KW 検索量</span>
                      <span className="text-[20px] font-bold leading-none" style={{ color: card.accent }}>
                        {card.vol}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: W/02·B — SEARCH PATH */}
      <section className="relative overflow-hidden bg-[#0B0B0E] pt-24 pb-8 text-white md:pt-28 md:pb-10">
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
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <SectionKicker overline="W/02·B — INTENT INTELLIGENCE" label="経路 — SEARCH PATH" dark />
          <div className="mt-5 h-px bg-white/10" />

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="max-w-[840px]">
              <h2 className="font-extrabold leading-[1.2] tracking-[-0.04em] text-[clamp(32px,3vw,44px)]">
                検索経路に基づき、GEOに極めて有利な連続的質問クラスターを設計
              </h2>
              <div className="mt-8 space-y-5">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/70">
                Ascentはユーザーがそのキーワードに到達する前後で、どのような検索行動を続けているか検索経路（Search Path）を分析します。例えば、「電動自転車」の検索経路には、「電動自転車 → 電動自転車 おすすめ → 電動自転車 おすすめ 通勤」のように通勤目的で深掘りしていく流れもあれば、「電動自転車 → 電動自転車 安い → 電動自転車 安い 型落ち」のように価格重視で遷移する流れもあります。また、「電動自転車 → 電動自転車 補助金 → 電動自転車 補助金 東京都 2025」のように、購入前に公的支援情報を確認する経路も存在します。
                </p>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/70">
                  GEO施策において重要なポイントは、「<Link href="/services" className="underline underline-offset-2 decoration-[#1452ff]/50 hover:decoration-[#1452ff] transition-colors text-white/70">質問クラスター</Link>」、つまり単一の質問ではなく、連続するユーザーの質問をあらかじめ予測し、コンテンツで対応できているかどうかです。Ascentは検索経路に基づき、GEOに極めて有利な連続的質問クラスターを設計します。
                </p>
              </div>
            </div>

            <div className="lg:-mt-10 xl:-mt-12">
              <SearchPathPanel />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 md:mt-14">
        <SeoGeoCTASection />
      </div>
    </div>
  );
}
