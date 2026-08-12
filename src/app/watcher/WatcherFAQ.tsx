"use client";

import { useState } from "react";

const WATCHER_FAQS = [
  { q: "対応しているAIモデルは？", a: "Chat GPT、Gemini、Google AI モード、AI Overview、Perplexty、Compilot、Claudeの7つに対応しています。Claudeを選択する場合はオプションとなります。" },
  { q: "競合ブランドは何社と比較できますか？", a: "最大20社まで比較可能です。自社ブランドと同じ項目で比較できます。競合ブランド登録数は全プラン共通して最大20社となっております。" },
  { q: "データはどのくらいの期間保存されますか？", a: "過去1年分のデータが保存されます。" },
  { q: "プロンプトの更新頻度はどれくらいですか？", a: "全プラン共通して毎日更新されます。更新日時も各プロンプトごとに確認可能です。" },
  { q: "プロンプトの内容は変更できますか？", a: "プロンプトの内容はいつでも自由に変更が可能です。" },
  { q: "最低契約期間はありますか？", a: "プランにより異なります。詳細はお問い合わせください。" },
  { q: "導入にはどのくらいの期間がかかりますか？", a: "お支払い完了後、アカウントの発行が終わり次第、すぐにご利用いただけます。" },
  { q: "無料トライアル期間はありますか？", a: "現在、無料トライアルは行っておりません。" },
  { q: "解約はいつできますか？", a: "解約をご希望の場合は、お問い合わせフォームより申請をお願いいたします。解約は原契約の契約終了日の属する月の末日をもって解約となります。" },
  { q: "プロンプトの更新頻度は調整できますか？", a: "現在、更新頻度を調整する機能はございません。どのプランであっても毎日更新となります。" },
];

export function WatcherFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-white py-[120px]">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
        <div className="mb-6 font-mono text-[12px] tracking-[0.18em] text-[#9A9AA0] uppercase">
          [ FREQUENTLY ASKED ]
        </div>
        <h2 className="mb-14 max-w-[22ch] tracking-[-0.03em] leading-[1.05]">
          よくある質問。
        </h2>
        <div className="border-t border-[#E6E4DD]">
          {WATCHER_FAQS.map((f, i) => (
            <div
              key={i}
              className={`cursor-pointer border-b border-[#E6E4DD] transition-colors ${open === i ? "" : "hover:bg-[#F2F0EA]"}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="grid grid-cols-[64px_1fr_32px] items-center gap-5 px-6 py-7">
                <span className="font-mono text-[12px] tracking-[0.16em] text-[#1452FF]">
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[19px] font-semibold leading-[1.35] tracking-[-0.01em]">
                  {f.q}
                </h4>
                <span
                  className={`text-center text-[22px] leading-none text-[#6B6B73] transition-transform duration-[250ms] ${open === i ? "rotate-45 text-[#1452FF]" : ""}`}
                >
                  +
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-[400px] pb-7" : "max-h-0"}`}
              >
                <p className="px-6 pb-0 pl-[108px] text-[16px] leading-[1.7] text-[#6B6B73]">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
