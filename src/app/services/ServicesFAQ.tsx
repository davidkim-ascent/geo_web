"use client";

import { useState } from "react";

const SVC_FAQS = [
  {
    q: "GEO Audit だけを単発で依頼できますか？",
    a: "はい、可能です。現在地を定量で把握したいフェーズでの単発ご依頼も多く、報告書と提案までを含んだ 4 週間パッケージでご提供しています。",
  },
  {
    q: "提供は何を起点に始まりますか？",
    a: "30 分の無料診断からスタートします。現状の AI 可視性、課題仮説、ゴール、予算感をヒアリングした上で、最適なプランをご提案します。",
  },
  {
    q: "社内チームとの連携はどうなりますか？",
    a: "マーケティング / コンテンツ / SEO チームと週次 / 隔週で連携します。Slack / Notion / GitHub Issues に伴走する形で、意思決定スピードを落としません。",
  },
  {
    q: "多言語展開には対応していますか？",
    a: "日本語・英語・中国語・韓国語を中心に対応。各市場の検索・引用パターンを個別に診断し、ローカライズした Question Cluster を設計します。",
  },
  {
    q: "効果測定の KPI は何ですか？",
    a: "Brand Visibility（露出率）、Citation 数、Share of Voice、AI Traffic、質問カバレッジの 5 つをコア KPI とし、ダッシュボードで週次・月次で可視化します。",
  },
  {
    q: "最低契約期間はありますか？",
    a: "Continuous プランは 6 ヶ月から、Enterprise プランは 12 ヶ月からとなります。Audit と Monitoring は単発も可能です。",
  },
];

export function ServicesFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="border-t border-[#E6E4DD] bg-[#FAFAF7] py-[120px]">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="mb-6 font-mono text-[12px] tracking-[0.18em] text-[#9A9AA0] uppercase">
          [ FREQUENTLY ASKED ]
        </div>
        <h2 className="mb-14 max-w-[22ch] tracking-[-0.03em] leading-[1.05]">
          よくある質問。
        </h2>
        <div className="border-t border-[#E6E4DD]">
          {SVC_FAQS.map((f, i) => (
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
