import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref, getCalendarBookingLinkProps } from "@/lib/calendar-booking";

export function SeoGeoCTASection() {
  return (
    <div className="article-cta">
      <CTASection
        kicker="GEO対策、専門コンサルタントにご相談ください"
        title={
          <>
            GEO対策、
            <br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <svg viewBox="0 0 260 28" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-12px", left: 0, width: "100%", height: "28px", overflow: "visible", zIndex: 0 }}>
                <defs>
                  <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7ab6ff" />
                    <stop offset="100%" stopColor="#0070f3" />
                  </linearGradient>
                  <filter id="brush" x="-5%" y="-80%" width="110%" height="260%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65 0.4" numOctaves="4" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                    <feComposite in="displaced" in2="SourceGraphic" operator="over" />
                  </filter>
                  <filter id="brushEdge" x="-5%" y="-80%" width="110%" height="260%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9 0.6" numOctaves="3" seed="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                {/* 번짐 레이어 */}
                <path d="M2,14 C20,10 45,16 75,12 C105,8 130,15 158,12 C186,9 210,15 240,11 C250,9 256,13 259,12" fill="none" stroke="url(#underlineGrad)" strokeWidth="28" strokeLinecap="butt" opacity="0.08" filter="url(#brush)" />
                {/* 메인 브러시 */}
                <path d="M1,13 C18,10 42,16 68,12 C98,8 122,15 150,12 C178,9 205,15 232,11 C245,9 254,13 259,11" fill="none" stroke="url(#underlineGrad)" strokeWidth="16" strokeLinecap="butt" opacity="0.45" filter="url(#brush)" />
                {/* 가장자리 결 */}
                <path d="M4,10 C30,8 60,13 90,10 C120,7 148,13 175,10 C200,7 228,12 256,9" fill="none" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.2" filter="url(#brushEdge)" />
              </svg>
              <span style={{ position: "relative", zIndex: 1, color: "#ffffff" }}>専門コンサルタント</span>
            </span>にご相談ください
          </>
        }
        description={
          <>
            「自社コンテンツはGEOに対応できているか？」「どの質問からGEO対策を始めるべきか？」
            そのような疑問・課題をお持ちの方に向けて、弊社では無料の初回相談を受け付けています。
            <br />
            <br />
            GEO戦略の立案から、リスニングマインドを活用した質問クラスター設計、コンテンツ改善の優先順位付けまで、
            御社の状況に合わせた具体的なアドバイスをご提供します。お問い合わせから24時間以内にご返信いたします。
          </>
        }
        primaryButton={{ href: "/contact", label: "相談する" }}
        secondaryButtons={[
          { href: "/whitepaper", label: "サービス資料をダウンロード" },
          { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）", ...getCalendarBookingLinkProps() },
        ]}
      />
    </div>
  );
}
