import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { HeroLogoMark } from "@/components/layout/HeroLogoMark";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref, getCalendarBookingLinkProps } from "@/lib/calendar-booking";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "GEO・AIO・LLMO 無料相談 | 株式会社 Ascent Networks",
  description:
    "GEO・AIO・LLMO戦略やAI検索最適化に関するご相談はこちら。サービス内容や導入方法、GEO Watcherについてもお気軽にお問い合わせください。",
  path: "/contact",
});

export const dynamic = "force-static";

/* ─── FAQ data ─── */
const FAQS = [
  {
    q: "相談だけでも問い合わせできますか？",
    a: "はい、もちろんです。無料相談予約（Googleカレンダー）よりご都合の良い日時にご予約いただけます。",
  },
  {
    q: "BtoB / BtoC どちらに対応していますか？",
    a: "両方に対応しています。BtoC（EC・小売・自動車・通信・金融）、BtoB（SaaS・コンサル・製造）など、業種を問わずご支援実績があります。",
  },
  {
    q: "既存の SEO 施策とは並行できますか？",
    a: "はい。GEO は既存の SEO オーガニック施策と競合しません。AI 検索への露出を新たなレイヤーとして積み上げるアプローチです。",
  },
  {
    q: "対象となる AI 検索エンジンは？",
    a: "ChatGPT・Perplexity・Google AI Overviews・Google AI Mode・Gemini・Copilotを標準対象とします。Claude はオプションで対応可能です。",
  },
  {
    q: "効果はどう計測しますか？",
    a: "Brand Visibility（各種AIエンジンの全回答パターンのうち自社ブランドが引用された割合）、Citations（AIに引用された絶対数）、AI Traffic（ChatGPT・Perplexity・Copilotなど主要AIエンジンからのサイト流入比率）、Brand Position（AIの回答内で自社が何番目に紹介されているかの平均順位）の4指標で効果を測定し、月次レポートにてご報告します。",
  },
  {
    q: "社内の制作チームと連携できますか？",
    a: "Slackまたはメールベースでのコラボレーションに対応しています。ガイドライン・レビュー・テンプレートを提供し、内製チームの GEO 対応をサポートします。",
  },
  {
    q: "相談から契約までの流れを教えてください。",
    a: "無料相談申し込み後、オンラインにて1時間程度の現状ヒアリングを実施します。各ツールの使用は、オンラインで即決済後、即座にご利用が可能です。銀行振込やカスタム要件がある場合は、別途ご案内させていただきます。",
  },
  {
    q: "デモ利用は可能ですか？",
    a: "GEO Watcher、GEO診断レポート各ページで、ソリューションの詳細機能をご確認いただけます。デモが必要な場合は、別途お問い合わせフォームからご連絡ください。対応させていただきます。",
  },
];

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  return (
    <details className="ct-faq-item">
      <summary className="ct-faq-q">
        <span className="ct-faq-idx">{String(idx).padStart(2, "0")}</span>
        <span className="ct-faq-qtext">{q}</span>
        <span className="ct-faq-toggle">+</span>
      </summary>
      <div className="ct-faq-a">{a}</div>
    </details>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="ct-hero">
        <div className="ct-hero-grid-bg" />
        <div className="ct-hero-ambient" />
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scan 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scan 8s ease-in-out -2s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.95, animation: "scanV 9s ease-in-out -3.5s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 11s ease-in-out -1s infinite" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent, rgba(20,82,255,0.95), transparent)", boxShadow: "0 0 18px rgba(20,82,255,0.55)", opacity: 0.6, animation: "scanV 13s ease-in-out -5s infinite" }} />

        <div className="ct-hero-wrap">
          {/* Left */}
          <div className="pt-8">
            <div className="ct-hero-kicker">
              <span className="pulse-dot" />
              CONTACT — ASCENT GEO
            </div>
            <h1 className="ct-hero-title">
              まずは<em>無料相談</em>から<br />
              始めましょう。
            </h1>
            <p className="ct-hero-desc">
              自社ブランドの変化を継続的に捉えるなら、GEO Watcher。見込み顧客への提案を具体化するなら、GEO診断レポート。<br /><br />
              診断する。変化を追う。課題を次の改善へつなげる。目的に合った方法で、GEO・LLMO対策を始めましょう。
            </p>

            {/* Channel cards */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/shindan" className="flex-1 px-6 h-[52px] rounded-full bg-[#003393] text-white font-bold flex items-center justify-center hover:bg-[#0f3de0] text-center" style={{ fontSize: "var(--fs-body-xsm)" }}>
                  GEO診断レポートを見る →
                </Link>
                <Link href="/watcher" className="flex-1 px-6 h-[52px] rounded-full bg-[#003393] text-white font-bold flex items-center justify-center hover:bg-[#0f3de0] text-center" style={{ fontSize: "var(--fs-body-xsm)" }}>
                  GEO Watcherを見る →
                </Link>
              </div>
              <a href={getCalendarBookingHref()} className="px-6 h-[52px] rounded-full border-2 border-[#003393] text-[#003393] font-bold flex items-center justify-center gap-2 hover:bg-[#003393] hover:text-white text-center" {...getCalendarBookingLinkProps()} style={{ fontSize: "var(--fs-body-xsm)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                無料相談予約（Googleカレンダー）
              </a>
            </div>

            <HeroLogoMark />
          </div>

          {/* Right — Contact Form */}
          <div>
            <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
              <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ct-faq">
        <div className="ct-faq-wrap">
          <div className="ct-faq-header">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-[6px] h-[6px] rounded-full bg-[#1452FF] flex-shrink-0" />
              <span className="ui-section-label-title">FAQ</span>
            </div>
            <hr className="border-black/[0.07] mb-8" />
            <h2 className="ct-faq-title">よくあるご質問</h2>
          </div>
          <div className="ct-faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} idx={i + 1} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
