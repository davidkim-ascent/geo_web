import { CTASection } from "@/components/layout/CTASection";
import { getCalendarBookingHref } from "@/lib/calendar-booking";

export function SeoGeoCTASection() {
  return (
    <div className="article-cta">
      <CTASection
        kicker="GEO対策、まずは無料相談から"
        title={
          <>
            GEO対策、
            <br />
            まずは無料相談から
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
          { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）" },
        ]}
      />
    </div>
  );
}
