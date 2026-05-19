import Link from "next/link";
import Image from "next/image";
import { getCalendarBookingHref, getCalendarBookingLinkProps } from "@/lib/calendar-booking";

export default function Footer() {
  return (
    <footer className="ui-footer-shell">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_2.5fr_2.5fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Go to home">
              <Image
                src="/ascent-geo-logo.png"
                alt="ASCENT/GEO"
                width={3317}
                height={552}
                className="h-[24px] w-auto"
              />
            </Link>
            <p className="mt-4 ui-body-copy">
              特許 × 実消費者インテント × Embedding。<br />
              根拠ある GEO で、AI 検索のリーダーへ。
            </p>
            <p className="mt-4 ui-body-copy-sm whitespace-pre-line">
              運営会社：株式会社 Ascent Networks{"\n"}
              東京都中央区晴海1-8-10 晴海トリトンスクエア オフィスタワーX棟 8階{"\n"}
              TEL: 03-3527-3963{"\n"}
              <a
                href="https://www.ascentnet.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-black/20 underline-offset-2 hover:decoration-black/50"
              >
                https://www.ascentnet.co.jp/
              </a>
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="ui-footer-heading mb-5">Sitemap</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Why Ascent", href: "/why-ascent" },
                { label: "Framework", href: "/framework" },
                { label: "Services", href: "/services" },
                { label: "GEO Lab", href: "/lab" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="ui-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="ui-footer-heading mb-5">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:geo@ascentnet.co.jp" className="ui-footer-link">
                  geo@ascentnet.co.jp
                </a>
              </li>
              <li>
                <Link href={getCalendarBookingHref()} className="ui-footer-link" {...getCalendarBookingLinkProps()}>
                  無料相談予約（Googleカレンダー）
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="ui-footer-link">
                  資料ダウンロード
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="ui-footer-meta">
            © 2026 ASCENT NETWORK
          </p>
          <Link href="/privacy" className="ui-footer-link">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
