export const metadata = {
  title: '個人情報保護方針 — Ascent / GEO',
}

const sections = [
  {
    title: '個人情報の利用目的',
    body: 'お問い合わせ対応、資料ダウンロード、必要なご案内の送付、サービス品質向上のために利用します。',
  },
  {
    title: '第三者提供',
    body: '法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。',
  },
  {
    title: '安全管理',
    body: '取得した個人情報は、漏えい・滅失・毀損を防ぐために適切な安全管理措置を講じて管理します。',
  },
  {
    title: 'お問い合わせ',
    body: '本方針に関するお問い合わせは、whitepaper@ascentgeo.jp までご連絡ください。',
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10">
        <p className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.2em] text-[#1452FF]">PRIVACY POLICY</p>
        <h1 className="mt-4 text-[32px] font-bold tracking-[-0.03em] text-[#0B0B0E] leading-[1.1]">
          個人情報保護方針
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-[#4e4e51]">
          Ascent / GEO で取得する個人情報の取り扱いについての概要です。
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-black/[0.07] bg-white p-6">
            <p className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.18em] text-[#1452FF]">{section.title.toUpperCase()}</p>
            <p className="mt-3 text-[17px] leading-[1.6] text-[#323235]">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
