"use client";

import { useState } from "react";

const SHINDAN_FAQS = [
  { q: "対応しているAIモデルは？", a: "Chat GPT、Gemini、Google AI モード、AI Overview、Perplexty、Copilot、6つに対応しています。" },
  { q: "競合他社のリストアップは必須ですか？", a: "対象のウェブサイトを入力していただくと、自動的に競合他社が生成されます。もちろん、競合他社を指定しての入力も可能です。" },
  { q: "診断レポートはどのように作成されますか？", a: "診断対象の企業名・ブランド名を入力いただくことで、指定した生成AI検索エンジンにおける言及状況、競合他社の露出状況、また各プロンプトの言及状況をレポート形式にして作成されます。" },
  { q: "診断レポートの作成にはどのくらい時間がかかりますか？", a: "通常、企業名を入力いただいてから数分程度でレポートが生成されます。" },
  { q: "診断対象企業に通知や許可は必要ですか？", a: "公開されている情報をもとに調査を行うため、診断対象企業への許可取得や通知は不要です。" },
  { q: "どのような企業・業種での活用が想定されていますか？", a: "SEO、Webマーケティング会社、コンサルティングファームなど、法人向けに提案営業を行う企業を主な想定利用者としています。" },
  { q: "最低契約期間はありますか？", a: "月払いには最低契約期間の縛りはなく、解約金もありません。" },
  { q: "導入にはどのくらいの期間がかかりますか？", a: "お支払い完了後、アカウントの発行が終わり次第、すぐにご利用いただけます。" },
  { q: "無料トライアル期間はありますか？", a: "現在、無料トライアルは行っておりません。" },
  { q: "解約はいつできますか？", a: "解約をご希望の場合は、お問い合わせフォームより申請をお願いいたします。解約は原契約の契約終了日の属する月の末日をもって解約となります。" },
];

export function ShindanFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-white pt-[80px] pb-[120px]">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-4 sm:px-6 lg:px-10">
        <h2 className="mb-14 max-w-[22ch] tracking-[-0.03em] leading-[1.05]">
          よくある質問。
        </h2>
        <div className="border-t border-[#E6E4DD]">
          {SHINDAN_FAQS.map((f, i) => (
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
