export const metadata = {
  title: '個人情報保護方針 — Ascent GEO',
}

const sections = [
  {
    article: '第1条',
    title: '個人情報の定義',
    body: '「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報を指します。',
  },
  {
    article: '第2条',
    title: '個人情報の取得方法',
    body: '当社は、本サービスにおいて、以下の場面でユーザーの個人情報を適法かつ公正な手段により取得いたします。\n・本サービス内の予約カレンダーを利用した無料相談の予約時\n・お問い合わせフォームまたは相談メールの送付時\n・サービス紹介資料、ホワイトペーパー等のダウンロード時',
  },
  {
    article: '第3条',
    title: '個人情報の利用目的',
    body: '当社は、取得した個人情報を以下の目的の範囲内で利用いたします。\n・無料相談の受付、日程調整、および相談の実施のため\n・ユーザーが希望したサービス資料や関連情報の提供のため\n・お問い合わせに対する回答、本人確認、および必要な連絡のため\n・本サービスの利用状況の分析、改善、および新機能の開発のため\n・当社の製品・サービスに関するご案内（電子メール等を含む）のため',
  },
  {
    article: '第4条',
    title: '安全管理措置',
    body: '当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。',
  },
  {
    article: '第5条',
    title: '個人情報の第三者提供',
    body: '当社は、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。',
  },
  {
    article: '第6条',
    title: '委託先の監督',
    body: '当社は、利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または一部を外部に委託することがあります。この場合、当社は委託先に対して必要かつ適切な監督を行います。',
  },
  {
    article: '第7条',
    title: '個人情報の開示・訂正・利用停止等',
    body: 'ユーザーは、当社に対し、当社の保有する自己の個人情報の開示、訂正、利用の停止等を請求することができます。開示等を希望される場合は、第9条の窓口までご連絡ください。',
  },
  {
    article: '第8条',
    title: '本ポリシーの変更',
    body: '本ポリシーの内容は、法令の改正や事業上の必要性に応じて変更することがあります。変更後のポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。',
  },
  {
    article: '第9条',
    title: 'お問い合わせ窓口',
    body: '本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。\n\n株式会社アセントネットワークス\n個人情報保護担当\nE-mail：privacy@ascentnet.co.jp',
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10">
        <p className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.2em] text-[#1452FF]">PRIVACY POLICY</p>
        <h1 className="mt-4 font-bold text-[#0B0B0E]" style={{ fontSize: "clamp(44px, 4.86vw, 65px)", lineHeight: "var(--lh-display)", letterSpacing: "-0.035em" }}>
          個人情報保護方針
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-[#4e4e51]">
          株式会社アセントネットワークスは、本サービス「Ascent GEO」の運営にあたり、ユーザーの個人情報の重要性を認識し、個人情報の保護に関する法律を遵守するとともに、以下の通りプライバシーポリシーを定め、その適切な管理・保護に努めます。
        </p>
      </div>

      <div className="grid gap-8">
        {sections.map((section) => (
          <section key={section.article}>
            <h2 className="text-[15px] font-semibold text-[#0B0B0E]">
              {section.article}　{section.title}
            </h2>
            <p className="mt-2 text-[16px] leading-[1.8] text-[#4e4e51] whitespace-pre-line">{section.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 text-[14px] text-[#4e4e51]">附則：2026年5月1日 制定・施行</p>
    </div>
  )
}
