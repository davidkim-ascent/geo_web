import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ダウンロード完了 — Ascent GEO",
  description: "AI 検索時代の、企業マーケティング白書 2026 のダウンロードを開始しました。",
  openGraph: {
    title: "ダウンロード完了 — Ascent GEO",
    description: "AI 検索時代の、企業マーケティング白書 2026 のダウンロードを開始しました。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ダウンロード完了 — Ascent GEO",
    description: "AI 検索時代の、企業マーケティング白書 2026 のダウンロードを開始しました。",
  },
};

export const dynamic = "force-static";

export default function WhitepaperDownloadedPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0E] text-[#FAFAF7]">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 25%, rgba(20,82,255,0.32), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(20,82,255,0.18), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(20,82,255,0.7), transparent)",
          boxShadow: "0 0 18px rgba(20,82,255,0.5)",
          animation: "wpdScan 7s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes wpdScan {
          0%   { top: 12%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 88%; opacity: 0; }
        }
        @keyframes wpdFill {
          to { width: 100%; }
        }
        @keyframes wpdPulse {
          0%   { box-shadow: 0 0 0 0 rgba(20,82,255,0.5); }
          100% { box-shadow: 0 0 0 12px rgba(20,82,255,0); }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-[1080px] px-10 py-20 pb-3">
        {/* Status stamp */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(20,82,255,0.4)] bg-[rgba(20,82,255,0.08)] px-4 py-2 font-mono text-[11px] tracking-[0.22em] text-[#1452FF]">
          <span
            className="h-2 w-2 rounded-full bg-[#1452FF]"
            style={{ animation: "wpdPulse 2s ease-out infinite" }}
          />
          DOWNLOADING · PDF READY
        </div>

        {/* Title */}
        <h1
          className="mb-7 font-bold tracking-[-0.035em] leading-[1.06]"
          style={{ fontSize: "clamp(38px, 5.4vw, 72px)", maxWidth: "18ch" }}
        >
          メールボックスを
          <br />
          <em className="text-[#1452FF] not-italic">ご確認ください。</em>
        </h1>

        {/* Lede */}
        <p className="mb-14 max-w-[56ch] text-[17px] leading-[1.7] text-white/72">
          ご入力いただいたメールアドレス宛に、「Ascent GEOサービス紹介資料 PDF」のダウンロードリンクをお送りいたしました。
          しばらく経ってもメールが届かない場合は、メールアドレスに誤りがないか、または迷惑メールフォルダに振り分けられていないかご確認をお願いいたします。
        </p>

        {/* Phone contact */}
        <div className="grid items-center gap-12 rounded-2xl border border-white/[0.14] bg-white/[0.03] px-10 py-9 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-3 font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">
              [ CALL US DIRECTLY ]
            </div>
            <h3 className="mb-2 text-[24px] font-bold tracking-[-0.015em] text-[#FAFAF7]">
              本書の内容について、直接質問する。
            </h3>
            <p className="max-w-[48ch] text-[14px] leading-[1.6] text-white/60">
              本書を踏まえた個別のご相談は、お電話または 30 分の無料相談でも承っています。
            </p>
          </div>
          <div>
            <div className="text-right font-mono text-[36px] font-semibold leading-none tracking-tight text-[#FAFAF7]">
              03 3527 3963
            </div>
            <div className="mt-2 text-right font-mono text-[10px] tracking-[0.18em] text-white/50">
              代表番号 · MON–FRI 9:00–18:00 JST
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-7 py-3 font-mono text-[12px] tracking-[0.18em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
