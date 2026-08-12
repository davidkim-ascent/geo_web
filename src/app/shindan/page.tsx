// NOTE: 本ページのコンテンツは暫定版です。
// 正式な構成案がユーザーより提供され次第、内容を差し替えます（ルーティングのみ先行構築）。
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { SplitSection } from "@/components/layout/SplitSection";
import { WatcherFAQ } from "../watcher/WatcherFAQ";
import { Button } from "@/components/ui/button";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import voice1Image from "../../../Design/voice1.png";
import voice2Image from "../../../Design/voice2.png";
import voice3Image from "../../../Design/voice3.png";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO(LLMO)診断ツール | Ascent GEO",
  description:
    "自社と競合のAI検索上での露出状況を診断。GEO/LLMO対策の現在地を可視化し、改善の出発点を明らかにします。",
  path: "/shindan",
  noIndex: true,
});

export const dynamic = "force-static";

function HeroSection() {
  return (
    <SplitSection
      sectionClassName="hero-fixed relative py-12 lg:py-16"
      sectionStyle={{
        background: "var(--hero-gradient)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      containerClassName="relative max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-14 items-start"
      leftClassName="pt-8"
      left={
        <>
          <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#1452FF] mb-5 flex items-center gap-2">
            <span className="pulse-dot" />
            GEO(LLMO) 診断ツール
          </div>
          <h1
            className="text-[#FAFAF7] font-bold"
            style={{ fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
          >
            自社のAI検索上の<br />
            現在地を、<span className="text-blue-gradient">診断</span>する。
          </h1>
          <p className="mt-7 text-[17px] text-[#d3d3d8] leading-[1.6] max-w-[52ch]">
            自社ブランドと競合のAI検索上での露出・言及・引用状況を診断し、GEO/LLMO対策の出発点を明らかにします。
          </p>
        </>
      }
      right={
        <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      }
    />
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[#FAFAF7] py-12 lg:py-16">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-12 grid grid-cols-1 gap-6">
          {[
            {
              name: "EC運営担当者",
              role: "化粧品・自社EC",
              review: "GEO Watcherは、主要な計測機能をツール内で利用でき、苦手だったプロンプト設計だけを、1回単位で依頼できました。毎月の追加費用が発生しないため、社内でも説明しやすく、導入までスムーズに進められました。",
              image: voice1Image,
              rating: 5,
            },
            {
              name: "広報・マーケティング担当者",
              role: "地方製造業",
              review: "GEO Watcherは、検索データやビッグデータを長年扱ってきた企業が開発しているため、計測データの信頼性にも安心感がありました。複数のAIにおける自社と競合の変化を、継続的に確認できる点も、社内で導入を決める後押しになりました。",
              image: voice2Image,
              rating: 5,
            },
            {
              name: "マーケティングマネージャー",
              role: "BtoB SaaS企業",
              review: "GEO Watcherに切り替えてからは、毎日のデータで言及率や引用URLの変化を追えるため、施策後の反応を早い段階で確認できます。複数のAIの回答原文やグラフもまとめて共有でき、社内報告の根拠として使いやすくなりました。",
              image: voice3Image,
              rating: 5,
            },
          ].map((reviewer) => (
            <div key={reviewer.name} className="rounded-lg bg-white p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-[80px] w-[80px] rounded-full overflow-hidden bg-gray-200">
                  {reviewer.image && (
                    <Image
                      src={reviewer.image}
                      alt={reviewer.name}
                      width={80}
                      height={80}
                      className={`h-full w-full object-cover ${reviewer.name === "広報・マーケティング担当者" ? "scale-200 -translate-y-1" : ""}`}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-3 text-[14px] leading-[1.6] text-[#4e4e51]">
                  {reviewer.review}
                </p>
                <div className="border-t border-[#e0e0e0] pt-3">
                  <p className="font-bold text-[#0B0B0E]" style={{ fontSize: "var(--fs-body)" }}>
                    {reviewer.name}
                  </p>
                  <p className="text-[#999]" style={{ fontSize: "var(--fs-label-sm)" }}>
                    {reviewer.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      className="relative py-10 lg:py-14 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #e8f4fb 0%, #d4e8f7 50%, #c8dff5 100%)" }}
    >
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
        <div>
          <div className="font-mono tracking-[0.18em] uppercase text-[#003393] mb-5" style={{ fontSize: "var(--fs-label-xxs)" }}>
            GEO・LLMO対策を始めましょう
          </div>
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            あなたの現在地から、<br />対策を始める。
          </h2>
          <p className="mt-6 text-[16px] text-[#4e4e51] leading-[1.6] max-w-[52ch]">
            GEO診断レポートで自社の課題を把握し、GEO Watcherで継続的に改善を追跡。GEO・LLMO対策の出発点から、成果の確認まで一貫してサポートします。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-body-xsm)" }}
            >
              <Link href="/shindan">GEO診断レポートを見る →</Link>
            </Button>
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-body-xsm)" }}
            >
              <Link href="/watcher">GEO Watcherを見る →</Link>
            </Button>
          </div>
          <div className="mt-3">
            <CalendarBookingButton className="!w-full !min-w-0 !max-w-none !h-[52px] !justify-start text-left px-6 gap-2 !bg-transparent !border !border-[#003393] !text-[#003393] hover:!bg-[#003393] hover:!text-white hover:!border-[#003393]">
              <Calendar size={16} />
              無料相談予約（Googleカレンダー）
            </CalendarBookingButton>
          </div>
        </div>
        <div className="w-full max-w-[560px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      </div>
    </section>
  );
}

export default function ShindanPage() {
  return (
    <div>
      <HeroSection />
      <TestimonialsSection />
      <ContactSection />
      {/* TODO: WatcherFAQ の内容はGEO Watcher（モニタリングツール）向けのFAQ。
          診断ツール用の正式コンテンツに差し替える際は必ず内容も見直すこと。 */}
      <WatcherFAQ />
    </div>
  );
}
