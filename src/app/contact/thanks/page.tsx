import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ完了 — Ascent GEO",
  description: "お問い合わせを受け付けました。GEO チームからの返信をお待ちください。",
  openGraph: {
    title: "お問い合わせ完了 — Ascent GEO",
    description: "お問い合わせを受け付けました。GEO チームからの返信をお待ちください。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "お問い合わせ完了 — Ascent GEO",
    description: "お問い合わせを受け付けました。GEO チームからの返信をお待ちください。",
  },
};

export const dynamic = "force-static";

export default function ThanksPage() {
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
          ご入力いただいた内容は、GEO チームのリードコンサルタントに直接届きます。
          一次返信は <strong>48 時間以内</strong> に、
          ご記入のメールアドレス宛にお送りします（土日祝の場合は翌営業日）。
        </p>

        <div className="thx-flow">
          <div className="thx-step is-done">
            <div className="ix done">STEP 01</div>
            <h4>受付完了</h4>
            <p>ご入力内容を担当チームに共有しました。確認メールを送付済みです。</p>
            <div className="when">JUST NOW</div>
            <div className="check">✓</div>
          </div>

          <div className="thx-step">
            <div className="ix">STEP 02</div>
            <h4>一次返信</h4>
            <p>担当コンサルタントが、ご相談内容に応じた次のアクションをご提案します。</p>
            <div className="when">WITHIN 48H</div>
            <div className="check" />
          </div>

          <div className="thx-step">
            <div className="ix">STEP 03</div>
            <h4>30 分の無料相談</h4>
            <p>御社の AI 検索可視性をその場で計測。Citation 採用率と改善余地を共有します。</p>
            <div className="when">WITHIN 1 WEEK</div>
            <div className="check" />
          </div>
        </div>

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
