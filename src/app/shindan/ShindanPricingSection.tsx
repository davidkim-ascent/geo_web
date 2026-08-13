const SHINDAN_APP_URL = "https://geo-shindan.ascentnet.co.jp";

const plans = [
  {
    name: "お試しプラン",
    planKey: "trial",
    tagline: "個人代理店・フリーランス向け",
    monthlyPrice: 19800,
    reports: "10",
    prompts: "10",
    perDay: "約0.5レポート",
    perReport: "1,980円",
    featured: false,
    desc: "まずは少数の見込み顧客への提案で、GEO・LLMO診断レポートの活用を試したい方に。",
  },
  {
    name: "STANDARD",
    planKey: "standard",
    tagline: "中小SEO会社・Web制作会社向け",
    monthlyPrice: 45000,
    reports: "50",
    prompts: "20",
    perDay: "約2.5レポート",
    perReport: "約900円",
    featured: true,
    desc: "見込み顧客への診断提案を継続的に行い、既存のSEO・Webマーケティング提案にGEO・LLMOの切り口を加えたい企業向けです。",
  },
  {
    name: "ENTERPRISE",
    planKey: "enterprise",
    tagline: "大手代理店・インサイドセールス組織向け",
    monthlyPrice: 80000,
    reports: "100",
    prompts: "30",
    perDay: "約5レポート",
    perReport: "約800円",
    featured: false,
    desc: "複数の営業担当者が見込み顧客ごとに診断レポートを作成し、継続的なアプローチや商談創出に活用したい企業向けです。",
  },
];

export function ShindanPricingSection() {
  return (
    <section id="pricing" className="bg-white pt-12 pb-12">
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mt-12 text-center">
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span> 料金プラン <span style={{ fontSize: "28px", color: "#7DD3FC" }}>✦</span>
          </h2>
          <p className="mt-4 text-[#4e4e51] max-w-[680px] mx-auto" style={{ fontSize: "var(--fs-body-xsm)" }}>
            見込み顧客へのアプローチ数や、診断レポートの利用頻度に合わせて選べる3つのプランをご用意しています。主要機能は共通で、月間のレポート生成数とプロンプト数に応じて選択できます。
          </p>

          <div className="mt-5 flex items-center justify-center text-center">
            <p className="text-[#4e4e51]" style={{ fontSize: "var(--fs-body-xsm)" }}>
              お支払いは<span className="font-bold" style={{ color: "#003393" }}>Stripe</span>の安全な決済システムを利用しています。<br />
              カード情報は当社サーバーに保存されず、Stripe上で暗号化して管理されます。<br />
              クレジットカード決済のほか、請求書払いなどのお支払い方法もご相談いただけます。<a href="#contact" className="font-bold underline hover:opacity-80" style={{ color: "#1452FF" }}>お問い合わせ</a>ください。
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-6 ${
                p.featured
                  ? "bg-[#0a1a3d] border border-[#1452FF]"
                  : "bg-white border border-black/[0.15]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#1452FF] px-3 py-1 text-[11px] font-bold tracking-[0.04em] text-white">
                  おすすめ
                </span>
              )}
              <h3 className={`font-bold mb-1 ${p.featured ? "text-white" : "text-[#0B0B0E]"}`} style={{ fontSize: "var(--fs-h4)" }}>
                {p.name}
              </h3>
              <p className={`mb-4 ${p.featured ? "text-white/60" : "text-[#6B6B73]"}`} style={{ fontSize: "var(--fs-label-sm)" }}>
                {p.tagline}
              </p>
              <p className={`mb-1 ${p.featured ? "text-white" : "text-[#0B0B0E]"}`}>
                <span className="font-bold" style={{ fontSize: "clamp(28px, 3.2vw, 36px)" }}>{p.monthlyPrice.toLocaleString()}</span>
                <span className="font-medium" style={{ fontSize: "var(--fs-label)" }}>円 / 月（税込）</span>
              </p>
              <div className="mb-4" />
              <ul className={`flex flex-1 flex-col gap-2.5 leading-[1.5] ${p.featured ? "text-white/80" : "text-[#4e4e51]"}`} style={{ fontSize: "var(--fs-label)" }}>
                {[
                  `レポート生成上限：月${p.reports}件`,
                  `プロンプト数：${p.prompts}件`,
                  `1営業日あたり：${p.perDay}`,
                  `1レポートあたり：${p.perReport}`,
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" stroke={p.featured ? "#7ab6ff" : "#1452FF"} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-4 ${p.featured ? "text-white/80" : "text-[#4e4e51]"}`} style={{ fontSize: "var(--fs-body-xsm)" }}>
                {p.desc}
              </p>
              <a
                href={`${SHINDAN_APP_URL}/signup?plan=${p.planKey}`}
                className="mt-6 block rounded-lg py-2.5 text-center font-bold tracking-[0.02em] text-white transition-colors hover:bg-[#1452FF]/90"
                style={{ backgroundColor: "#1452FF", fontSize: "var(--fs-label-sm)" }}
              >
                このプランで始める
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
