// NOTE: 本ページのコンテンツは暫定版です。
// 正式な構成案がユーザーより提供され次第、内容を差し替えます（ルーティングのみ先行構築）。
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { buildPageMetadata } from "@/lib/seo";
import { SplitSection } from "@/components/layout/SplitSection";
import { WatcherFAQ } from "../watcher/WatcherFAQ";

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
            style={{ fontSize: "clamp(32px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}
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

export default function ShindanPage() {
  return (
    <div>
      <HeroSection />
      {/* TODO: WatcherFAQ の内容はGEO Watcher（モニタリングツール）向けのFAQ。
          診断ツール用の正式コンテンツに差し替える際は必ず内容も見直すこと。 */}
      <WatcherFAQ />
    </div>
  );
}
