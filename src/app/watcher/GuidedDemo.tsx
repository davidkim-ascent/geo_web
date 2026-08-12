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
    image: "/watcher-demo/demo_overview_v3.png",
    title: "ダッシュボード概要",
    body: "ログイン直後の画面で、AI可視性とシェア・オブ・ボイスなどのデータをひと目で確認できます。",
    tip: { top: "10%", left: "30%" },
  },
  {
    image: "/watcher-demo/demo_visibility_v3.png",
    title: "AI可視性：複数のAIで、自社の露出状況をひと目で確認",
    body: "主要なAIエンジンの回答内で、自社や競合がどれだけ言及されているかを一覧で確認できます。AIモデル別、タグ別に絞り込めるため、どのAIで露出が多く、どこで不足しているのかを正確に把握できます。",
    tip: { top: "42%", left: "1%" },
  },
  {
    image: "/watcher-demo/demo_prompt_v3.png",
    title: "プロンプトモニタリング：注目したい質問の変化を、継続的に追跡",
    body: "登録したプロンプトごとに、ブランドの言及率、引用URL、実際のAI回答文を継続的に記録します。「以前は自社が表示されていたのに、今は競合が表示されている」といった変化にも、いち早く気づけます。",
    tip: { top: "45%", left: "1%" },
  },
  {
    image: "/watcher-demo/demo_sov_v3.png",
    title: "シェア・オブ・ボイス：競合と比べて、自社がどれだけ言及されているかを比較",
    body: "各AIエンジンにおいて、自社と競合がどのくらいの割合で言及されているかを比較できます。ブランドごとの言及率などを確認することで、業界内での現在地が分かります。",
    tip: { top: "42%", left: "1%" },
  },
  {
    image: "/watcher-demo/demo_citation_v3.png",
    title: "引用URL分析：AIが、どのページを根拠にしているかを特定",
    body: "AIが回答を生成する際に参照・引用したURLやドメインを確認できます。自社サイトのどのページが引用されているか、競合のどのコンテンツが選ばれているかを把握できます。また、どのチャンネルの情報源が引用されやすいかも確認できます。",
    tip: { top: "38%", left: "1%" },
  },
];

export function GuidedDemo() {
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
    <div className="max-w-[1274px] mx-auto mb-6">
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
        className="relative rounded-2xl"
        style={{ aspectRatio: "2940 / 1602", background: "#F6F7FB" }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={slide.image}
            alt="GEO Watcher 操作画面"
            fill
            className="object-cover object-top"
          />
        </div>
        {active && (
          <>
            <div
              className="absolute max-w-[320px] bg-white rounded-2xl p-6"
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
                  {step >= SLIDES.length ? "最初に戻る" : "次へ"}
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
    </div>
  );
}
