import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DeniedAccess } from "@/components/access/DeniedAccess";
import { CONTACT_THANKS_COOKIE, hasCompletionAccess } from "@/lib/completion-access";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "お問い合わせ完了 — Ascent GEO",
  description: "お問い合わせを受け付けました。GEO チームからの返信をお待ちください。",
  path: "/contact/thanks",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function ThanksPage() {
  const cookieStore = await cookies();
  const hasAccess = hasCompletionAccess(cookieStore.get(CONTACT_THANKS_COOKIE)?.value);

  if (!hasAccess) {
    return <DeniedAccess backHref="/contact" backLabel="お問い合わせへ戻る" />;
  }

  return (
    <section className="thx-hero" data-screen-label="Thanks Hero">
      <div className="thx-bg" />
      <div className="thx-grid-bg" />
      <div className="thx-scan" />

      <div className="thx-wrap">
        <div className="thx-stamp">
          <span className="pulse" />
          <span>RECEIVED · 48H 以内に返信</span>
        </div>

        <h1 className="thx-title">
          お問い合わせを<br />
          <em>受け付けました。</em>
        </h1>

        <p className="thx-lede">
          ご入力いただいた内容は、GEO チームのコンサルタントに直接届きます。
          一次返信は <strong>48 時間以内</strong> に、
          ご記入のメールアドレス宛にお送りします（土日祝の場合は翌営業日）。
        </p>

        <div className="thx-phone">
          <div className="thx-phone-left">
            <div className="lab">[ OR · CALL US DIRECTLY ]</div>
            <h3>電話でコンタクトする。</h3>
            <p>お急ぎのケースや、まずは話して見たいという方は、代表番号まで。平日 9:00〜18:00 に受付しています。</p>
          </div>
          <div className="thx-phone-right">
            <div className="thx-phone-num mono">03 3527 3963</div>
            <div className="thx-phone-meta">代表番号 · MON–FRI 9:00–18:00 JST</div>
          </div>
        </div>
      </div>
    </section>
  );
}
