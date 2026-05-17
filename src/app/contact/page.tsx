import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref, getCalendarBookingLinkProps } from "@/lib/calendar-booking";

export const metadata: Metadata = {
  title: "Contact — Ascent GEO",
  description:
    "無料相談、サービス資料、電話でのご相談。Ascent GEO へのお問い合わせはこちらから。",
  openGraph: {
    title: "Contact — Ascent GEO",
    description:
      "無料相談、サービス資料、電話でのご相談。Ascent GEO へのお問い合わせはこちらから。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact — Ascent GEO",
    description:
      "無料相談、サービス資料、電話でのご相談。Ascent GEO へのお問い合わせはこちらから。",
  },
};

export const dynamic = "force-static";

/* ─── FAQ data ─── */
const FAQS = [
  {
    q: "相談だけでも問い合わせできますか？",
    a: "もちろんです。まずは 30 分の無料相談から、現在の AI 検索環境とブランドの露出状況をご一緒に確認します。費用・契約の義務は一切ありません。",
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
    a: "英語・韓国語・中国語市場への対応が可能です。各言語の AI 検索行動分析と GEO 設計を行います。",
  },
  {
    q: "最低契約期間は？",
    a: "Audit は約 2 週間、Strategic プランは 3 ヶ月、Full Loop は 12 ヶ月が標準です。まずは Audit から始めるケースが多いです。",
  },
  {
    q: "対象となる AI 検索エンジンは？",
    a: "ChatGPT・Perplexity・Google AI Overviews・Gemini を標準対象とします。Claude・Copilot はオプションで対応可能です。",
  },
  {
    q: "効果はどのくらいで出ますか？",
    a: "Embedding・Citation の改善は 4〜8 週間で初期変化が確認できます。指標の安定には 3 ヶ月を目安とします。",
  },
  {
    q: "効果はどう計測しますか？",
    a: "Citation 数・Share of Answer・Brand Mention・Passage 採用率・AI 流入数を Looker Studio または Notion ダッシュボードで継続トラッキングします。",
  },
  {
    q: "社内の制作チームと連携できますか？",
    a: "Slack / Notion / GitHub Issues でのコラボレーションに対応しています。ガイドライン・レビュー・テンプレートを提供し、内製チームの GEO 対応をサポートします。",
  },
  {
    q: "個人情報・機密情報の扱いは？",
    a: "NDA 締結後に業務開始します。Embedding 分析には公開コンテンツと匿名化クエリのみを使用し、社内機密データを分析モデルに入力することはありません。",
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
              AI 検索における現在の露出状況を診断し、Citation 構造と改善余地をご共有します。所要 30 分のオンライン MTG から。
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

              <div className="ct-channel-text">
                <div className="ct-channel-text-head">
                  <span className="ct-channel-phone-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.07-6.07 19.8 19.8 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.12.93.34 1.84.66 2.71a2 2 0 0 1-.45 2.11L8.1 9.73a16 16 0 0 0 6.17 6.17l1.19-1.19a2 2 0 0 1 2.11-.45c.87.32 1.78.54 2.71.66A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <span className="ct-channel-text-label">電話で相談する</span>
                </div>
                <div className="ct-channel-text-line">
                  <span className="ct-channel-phone-number">03-3527-3963</span>
                  <span className="ct-channel-text-meta">平日 9:00〜18:00 JST</span>
                </div>
              </div>
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
