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
    q: "海外マーケットにも対応していますか？",
    a: "英語・韓国語市場への対応が可能です。各言語の AI 検索行動分析と GEO 設計を行います。",
  },
  {
    q: "対象となる AI 検索エンジンは？",
    a: "ChatGPT・Perplexity・Google AI Overviews・Gemini を標準対象とします。Claude・Copilot はオプションで対応可能です。",
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
    a: "無料相談申し込み後、オンラインにて1時間程度の現状ヒアリングを実施します。ヒアリングMTG実施日より2営業日以内にお見積もりをメールにてお送りし、内容をご確認いただいた上でご契約（約1日）となります。まずはお気軽に無料相談からお申し込みください。",
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
              AI 検索における現在の露出状況を診断し、Brand VisibilityやBrand Positionなど具体的な数値。また改善余地をご共有します。所要 30 分のオンライン MTG から。
            </p>

            {/* Channel cards */}
            <div className="ct-hero-channels">
              <a href={getCalendarBookingHref()} className="ct-channel-card" {...getCalendarBookingLinkProps()}>
                <div className="ct-channel-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="ct-channel-body">
                  <div className="ct-channel-title">無料相談予約（Googleカレンダー）</div>
                  <div className="ct-channel-desc">30 分の無料相談 · Google Meet</div>
                </div>
                <span className="ct-channel-arrow">→</span>
              </a>

              <Link href="/whitepaper" className="ct-channel-card">
                <div className="ct-channel-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <div className="ct-channel-body">
                  <div className="ct-channel-title">サービス資料をダウンロード</div>
                  <div className="ct-channel-desc">GEO フレームワーク解説 PDF · 無料</div>
                </div>
                <span className="ct-channel-arrow">→</span>
              </Link>

              <HeroLogoMark />
            </div>
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
