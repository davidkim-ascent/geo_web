"use client";

import { useState } from "react";
import Image from "next/image";

type Slide = {
  image: string;
  title: string;
  body: string;
  tip: { top: string; left: string };
};

const SLIDES: Slide[] = [
  {
    image: "/shindan-demo/diag_v4_reports_full.png",
    title: "診断するブランド名とURLを入力",
    body: "ブランド名とWebサイトのURLを入力するだけで、診断を開始できます。プロンプトや競合企業は自動で生成されるため、複雑な事前設定は必要ありません。例えば、「ユニクロ」「UNIQLO」のように複数の表記がある場合は、それぞれ登録することで、より幅広い言及を検出できます。",
    tip: { top: "8%", left: "30%" },
  },
  {
    image: "/shindan-demo/diag_v4_branding_full.png",
    title: "ロゴを自社仕様にカスタマイズ",
    body: "レポートに表示するロゴを自社仕様に変更できます。自社が提供する診断レポートとして、そのまま見込み顧客への提案に活用できるようカスタマイズが可能です。",
    tip: { top: "10%", left: "62%" },
  },
  {
    image: "/shindan-demo/diag_v4_branding_full.png",
    title: "CTAを自社仕様にカスタマイズ",
    body: "レポート下部に表示される案内文とリンク先を設定できます。問い合わせ先やメールアドレス、担当者名を入れることで、自社からの提案としてそのまま提示できます。",
    tip: { top: "42%", left: "62%" },
  },
];

export function ShindanGuidedDemo() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(1);

  const slide = SLIDES[step - 1];

  function start() {
    setStep(1);
    setActive(true);
  }
  function next() {
    setStep((s) => (s >= SLIDES.length ? 1 : s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }
  function close() {
    setActive(false);
  }

  return (
    <div className="max-w-[980px] mx-auto mb-16">
      <div className="flex justify-end mb-4">
        <button
          onClick={start}
          className="text-white font-bold rounded-lg px-5 py-2.5"
          style={{ backgroundColor: "#003393", fontSize: "var(--fs-body-xsm)" }}
        >
          ▶ ガイド付きで見る
        </button>
      </div>
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: "2940 / 2464", background: "#F6F7FB", boxShadow: "0 2px 8px rgba(11,14,22,0.06)", border: "1px solid #E3E7F0" }}
      >
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt="GEO診断レポート 操作画面"
            fill
            className="object-cover object-top"
          />
        </div>
        {active && (
          <>
            <div
              className="absolute max-w-[300px] bg-white rounded-2xl p-6"
              style={{ top: slide.tip.top, left: slide.tip.left, maxHeight: "calc(100% - 32px)", overflowY: "auto", boxShadow: "0 24px 60px -16px rgba(0,0,0,0.4)", border: "1px solid #E3E7F0" }}
            >
              <div className="font-bold tracking-[0.06em] mb-2.5" style={{ fontSize: "11px", color: "#003393" }}>
                STEP {step} / {SLIDES.length}
              </div>
              <h4 className="font-bold text-[#0B0F1A] mb-2.5 leading-[1.5]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                {slide.title}
              </h4>
              <p className="text-[#0B0B0E] mb-4" style={{ fontSize: "var(--fs-label)" }}>
                {slide.body}
              </p>
              <div className="flex items-center gap-2.5">
                <button onClick={prev} className="text-[#5B647A] font-bold px-1 py-2" style={{ fontSize: "var(--fs-label)" }}>
                  ‹ 戻る
                </button>
                <button
                  onClick={next}
                  className="flex-1 bg-[#0B0F1A] text-white rounded-lg px-4 py-2.5 font-bold"
                  style={{ fontSize: "var(--fs-label)" }}
                >
                  {step >= SLIDES.length ? "完了" : "次へ"}
                </button>
              </div>
            </div>
            <button
              onClick={close}
              className="absolute top-4 right-4 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-[#0B0F1A] z-10"
              style={{ fontSize: "14px" }}
              aria-label="閉じる"
            >
              ✕
            </button>
          </>
        )}
      </div>

      <div className="mt-14">
        <h3 className="font-bold text-center mb-2" style={{ fontSize: "var(--fs-h4)", color: "#0B0F1A" }}>
          サンプル診断レポート
        </h3>
        <p className="text-center text-[#5B647A] mb-6" style={{ fontSize: "var(--fs-label)" }}>
          実際に生成される診断レポートのサンプルです。ロゴは自社仕様に変更可能です。スクロールしてご確認いただけます。
        </p>
        <div
          className="rounded-2xl overflow-y-auto"
          style={{ maxHeight: "640px", boxShadow: "0 2px 8px rgba(11,14,22,0.06)", border: "1px solid #E3E7F0" }}
        >
          <div className="relative">
            <Image
              src="/shindan-demo/diag_v4_sample_report.png"
              alt="サンプル診断レポート"
              width={1064}
              height={5773}
              className="w-full h-auto block"
            />
            <div
              className="absolute text-white font-bold rounded-lg whitespace-nowrap"
              style={{ top: "0.9%", left: "27%", background: "#003393", fontSize: "12px", padding: "8px 14px", boxShadow: "0 8px 20px -6px rgba(0,51,147,0.6)" }}
            >
              ロゴは自社仕様にカスタマイズ可能
            </div>
            <div
              className="absolute text-white font-bold rounded-lg whitespace-nowrap"
              style={{ top: "10.7%", left: "37%", background: "#003393", fontSize: "12px", padding: "8px 14px", boxShadow: "0 8px 20px -6px rgba(0,51,147,0.6)" }}
            >
              担当者からのコメントを記載できます
            </div>
            <div
              className="absolute text-white font-bold rounded-lg whitespace-nowrap"
              style={{ top: "94%", left: "29%", background: "#003393", fontSize: "12px", padding: "8px 14px", boxShadow: "0 8px 20px -6px rgba(0,51,147,0.6)" }}
            >
              CTAは自社仕様にカスタマイズ可能
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
