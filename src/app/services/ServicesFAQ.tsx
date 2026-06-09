"use client";

import { useState } from "react";

const SVC_FAQS = [
  {
    q: "GEO(LLMO)とSEOは何が違うのですか？",
    a: "GEO(LLMO)はSEOの「次バージョン」ではなく、評価軸そのものが異なる別領域です。SEOが検索結果ページの上位表示を目指すのに対し、GEO(LLMO)はChatGPT・Gemini・Perplexityなど生成AIの回答文そのものに引用される状態を目指します。最適化の対象・ゴール・評価単位がすべて異なるため、既存のSEO手法をそのまま流用しても効果は出ません。両者は対立ではなく補完関係です。",
  },
  {
    q: "他社のGEO(LLMO)サービスと何が違うのですか？",
    a: "GEO(LLMO)に好まれる質問を分析してコンテンツ対策を行う会社は増えていますが、Ascentは「どんな質問がされているのか」をデータで見て、質問の意図に合わせてコンテンツ対策を行える点が大きな差別化です。競合他社の多くはGAP分析・コンテンツ対策・モニタリングのみの対応ですが、Ascentはその前段となる質問クラスター分析（Question Cluster Mining）から一貫して対応しています。",
  },
  {
    q: "既存コンテンツがあっても対応できますか？",
    a: "はい、むしろ既存コンテンツを最大限に活用することを前提にしています。GAP分析では自社の既存コンテンツをエンベディング（意味的類似度）でマッチ度を判定し、スコアに応じて「既存ページの改修」か「新規ページの作成」かの優先順位を決定します。ゼロから作り直す必要はありません。",
  },
  {
    q: "効果はどのように測定しますか？",
    a: "Brand Visibility（各種AIエンジンの全回答パターンのうち自社ブランドが引用された割合）、Citations（AIに引用された絶対数）、AI Traffic（ChatGPT・Perplexity・Copilotなど主要AIエンジンからのサイト流入比率）、Brand Position（AIの回答内で自社が何番目に紹介されているかの平均順位）の4指標で効果を測定し、月次レポートにてご報告します。",
  },
  {
    q: "相談から契約までの流れを教えてください。",
    a: "無料相談申し込み後、オンラインにて1時間程度の現状ヒアリングを実施します。ヒアリングMTG実施日より2営業日以内にお見積もりをメールにてお送りし、内容をご確認いただいた上でご契約（約1日）となります。まずはお気軽に無料相談からお申し込みください。",
  },
];

export function ServicesFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="border-t border-[#E6E4DD] bg-[#FAFAF7] py-[120px]">
      <div className="mx-auto max-w-[var(--ui-content-width)] px-10">
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
