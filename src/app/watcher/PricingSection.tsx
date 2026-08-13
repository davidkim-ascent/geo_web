"use client";

import { useState } from "react";
import Image from "next/image";

const WATCHER_APP_URL = "https://geo-watcher.ascentnet.co.jp";

const plans = [
  {
    name: "ライトプラン",
    planKey: "light",
    monthlyPrice: 29800,
    annualPrice: 298000,
    prompts: "20",
    models: "4つ",
    projects: "1",
    featured: false,
    tagline: "まずは小さく始めたいチームに",
  },
  {
    name: "スタンダードプラン",
    planKey: "standard",
    monthlyPrice: 39800,
    annualPrice: 398000,
    prompts: "50",
    models: "6つ",
    projects: "1",
    featured: true,
    tagline: "本格的にGEO対策を進めるチームに",
  },
  {
    name: "アドバンスプラン",
    planKey: "advanced",
    monthlyPrice: 79800,
    annualPrice: 798000,
    prompts: "100",
    models: "6つ",
    projects: "2",
    featured: false,
    tagline: "複数ブランド・広範囲を追うチームに",
  },
];

const customPlan = {
  name: "カスタマイズプラン",
  tagline: "規模に合わせて柔軟に設計",
  conditions: [
    "登録プロンプト数：50個以上から",
    "AIモデル：6モデル＋Claude追加も可能",
    "プロジェクト数：3個以上",
  ],
  note: "上記のような条件が必要な場合は、カスタマイズプランをご利用いただけます。お問い合わせフォームよりお申し込みください。担当者よりご連絡いたします。",
};

const ALL_MODELS = [
  { key: "aio", label: "AI Overviews", logo: "/ai-model-logos/google.svg" },
  { key: "gemini", label: "Gemini", logo: "/ai-model-logos/gemini.webp" },
  { key: "aimode", label: "AI Mode", logo: "/ai-model-logos/google.svg" },
  { key: "chatgpt", label: "ChatGPT", logo: "/ai-model-logos/chatgpt.png" },
  { key: "perplexity", label: "Perplexity", logo: "/ai-model-logos/perplexity.png" },
  { key: "copilot", label: "Microsoft Copilot", logo: "/ai-model-logos/copilot.png" },
  { key: "claude", label: "Claude（オプション）", logo: "/ai-model-logos/claude.png" },
];

const planModelKeys = [
  ["aio", "gemini", "chatgpt", "perplexity"],
  ["aio", "gemini", "aimode", "chatgpt", "perplexity", "copilot"],
  ["aio", "gemini", "aimode", "chatgpt", "perplexity", "copilot"],
];

const comparisonRows = [
  { label: "登録プロンプト数", values: ["20", "50", "100"] },
  { label: "競合登録", values: ["20個", "20個", "20個"] },
  { label: "データ保存期間", values: ["1年間", "1年間", "1年間"] },
  { label: "更新頻度", values: ["毎日", "毎日", "毎日"] },
  { label: "エクスポート機能", values: ["csv", "csv", "csv"] },
  { label: "プロジェクト数", values: ["1", "1", "2"] },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {[
              "プランを選択",
              "「このプランで始める」をクリック",
              "会員登録",
              "お支払い情報を入力",
              "利用開始",
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className="rounded-full px-4 py-2 font-bold whitespace-nowrap"
                  style={{ fontSize: "var(--fs-label)", backgroundColor: "#F6F7FB", color: "#003393" }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-[#9A9AA0]" style={{ fontSize: "var(--fs-label)" }}>→</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center text-center">
            <p className="text-[#4e4e51]" style={{ fontSize: "var(--fs-body-xsm)" }}>
              お支払いは<span className="font-bold" style={{ color: "#003393" }}>Stripe</span>の安全な決済システムを利用しています。<br />
              カード情報は当社サーバーに保存されず、Stripe上で暗号化して管理されます。<br />
              クレジットカード決済のほか、請求書払いなどのお支払い方法もご相談いただけます。<a href="#contact" className="font-bold underline hover:opacity-80" style={{ color: "#1452FF" }}>お問い合わせ</a>ください。
            </p>
          </div>

          {/* 月額/年払い切り替え */}
          <div className="mt-8 inline-flex items-center rounded-full p-1" style={{ backgroundColor: "#F6F7FB" }}>
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className="rounded-full px-5 py-2 font-bold transition-colors flex items-center gap-1.5"
              style={{
                fontSize: "var(--fs-label)",
                backgroundColor: !annual ? "#003393" : "transparent",
                color: !annual ? "#fff" : "#6B6B73",
              }}
            >
              月払い
              <span style={{ fontSize: "var(--fs-label)", opacity: 0.85 }}>（税込）</span>
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className="rounded-full px-5 py-2 font-bold transition-colors flex items-center gap-1.5"
              style={{
                fontSize: "var(--fs-label)",
                backgroundColor: annual ? "#003393" : "transparent",
                color: annual ? "#fff" : "#6B6B73",
              }}
            >
              年払い
              <span style={{ fontSize: "var(--fs-label)", opacity: 0.85 }}>（税込）</span>
              <span
                className="rounded-full px-2 py-0.5 font-bold"
                style={{
                  fontSize: "var(--fs-caption)",
                  backgroundColor: "#fff176",
                  color: "#0B0B0E",
                }}
              >
                2ヶ月分お得
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-4 items-stretch">
          <div className="hidden md:block" />
          {plans.map((p) => {
            const totalPrice = annual ? p.annualPrice : p.monthlyPrice;
            return (
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
                  <span className="font-bold" style={{ fontSize: "clamp(28px, 3.2vw, 36px)" }}>{totalPrice.toLocaleString()}</span>
                  <span className="font-medium" style={{ fontSize: "var(--fs-label)" }}>円 / {annual ? "年" : "月"}</span>
                </p>
                <div className="mb-4" />
                <ul className={`flex flex-1 flex-col gap-2.5 leading-[1.5] ${p.featured ? "text-white/80" : "text-[#4e4e51]"}`} style={{ fontSize: "var(--fs-label)" }}>
                  {[
                    `登録プロンプト数：${p.prompts}`,
                    "競合登録：20個",
                    `AIモデル：${p.models}`,
                    "データ保存期間：1年間",
                    "更新頻度：毎日",
                    "エクスポート機能：csv",
                    `プロジェクト数：${p.projects}`,
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" stroke={p.featured ? "#7ab6ff" : "#1452FF"} strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${WATCHER_APP_URL}/signup?plan=${p.planKey}&annual=${annual}`}
                  className="mt-6 block rounded-lg py-2.5 text-center font-bold tracking-[0.02em] text-white transition-colors hover:bg-[#1452FF]/90"
                  style={{ backgroundColor: "#1452FF", fontSize: "var(--fs-label-sm)" }}
                >
                  このプランで始める
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-0 border-b border-black/[0.15] pb-3">
            <span className="hidden md:flex items-center font-bold text-[#6B6B73]" style={{ fontSize: "var(--fs-body-xsm)" }}>項目</span>
            {plans.map((p) => (
              <span key={p.name} className="font-bold text-[#0B0B0E] text-center px-2 md:border-l border-black/[0.15]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                {p.name}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-0 border-b border-black/[0.15] py-4">
            <span className="hidden md:flex items-start pt-1 text-[#0B0B0E]" style={{ fontSize: "var(--fs-body-xsm)" }}>AIモデル</span>
            {planModelKeys.map((keys, i) => (
              <div key={i} className="flex flex-col items-center justify-start gap-1.5 px-2 md:border-l border-black/[0.15]">
                {keys.map((key) => {
                  const model = ALL_MODELS.find((m) => m.key === key)!;
                  return (
                    <div key={key} className="flex items-center gap-1.5">
                      <Image
                        src={model.logo}
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0 rounded-sm object-contain"
                      />
                      <span className="text-[#0B0B0E] whitespace-nowrap" style={{ fontSize: "var(--fs-body-xsm)" }}>{model.label}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {comparisonRows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-0 border-b border-black/[0.15] py-3">
              <span className="hidden md:flex items-center text-[#0B0B0E]" style={{ fontSize: "var(--fs-body-xsm)" }}>{row.label}</span>
              {row.values.map((v, i) => (
                <span key={`${row.label}-${i}`} className="text-[#0B0B0E] text-center px-2 md:border-l border-black/[0.15]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[#6B6B73]" style={{ fontSize: "var(--fs-label)" }}>
          ※ プロジェクト数：プロジェクトとはブランドを意味します。例えば、ユニクロとGUのように独立した2つのブランドを運用する場合は、アドバンスプランをお選びください。
        </p>

        <div className="mt-8 rounded-2xl border border-black/[0.07] bg-[#F6F7FB] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <h3 className="font-bold text-[#0B0B0E] mb-1" style={{ fontSize: "var(--fs-h4)" }}>
              {customPlan.name}
            </h3>
            <p className="text-[#6B6B73] mb-3" style={{ fontSize: "var(--fs-label-sm)" }}>
              {customPlan.tagline}
            </p>
            <p className="text-[#4e4e51] mb-3" style={{ fontSize: "var(--fs-body-xsm)" }}>
              カスタマイズプランは、<span style={{ backgroundImage: "linear-gradient(transparent 55%, #fff176 55%, #fff176 92%, transparent 92%)", paddingBottom: "2px" }}>スタンダードプラン以上の要件が必要なお客様向けのオーダーメイドプラン</span>です。
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#4e4e51] mb-3" style={{ fontSize: "var(--fs-body-xsm)" }}>
              {customPlan.conditions.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[#9A9AA0]">/</span>}
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[#4e4e51]" style={{ fontSize: "var(--fs-body-xsm)" }}>
              {customPlan.note}
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 rounded-lg text-white px-6 py-3 text-center font-bold tracking-[0.02em] transition-colors hover:bg-[#1452FF]/90"
            style={{ backgroundColor: "#1452FF", fontSize: "var(--fs-label-sm)" }}
          >
            お問い合わせ
          </a>
        </div>
      </div>
    </section>
  );
}
