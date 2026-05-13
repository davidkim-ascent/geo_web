import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TicketId } from "./TicketId";

export const metadata: Metadata = {
  title: "ダウンロード完了 — Ascent GEO",
  description: "AI 検索時代の、企業マーケティング白書 2026 のダウンロードを開始しました。",
};

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

      <div className="relative z-10 mx-auto max-w-[1080px] px-10 py-20 pb-24">
        {/* Status stamp */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(20,82,255,0.4)] bg-[rgba(20,82,255,0.08)] px-4 py-2 font-mono text-[11px] tracking-[0.22em] text-[#1452FF]">
          <span
            className="h-2 w-2 rounded-full bg-[#1452FF]"
            style={{ animation: "wpdPulse 2s ease-out infinite" }}
          />
          DOWNLOADING · PDF READY
        </div>

        {/* Request ID */}
        <div className="mb-6 font-mono text-[11px] tracking-[0.18em] text-white/50">
          REQUEST ID ·{" "}
          <TicketId />
          {" "}· WP-2026-01
        </div>

        {/* Title */}
        <h1
          className="mb-7 font-bold tracking-[-0.035em] leading-[1.06]"
          style={{ fontSize: "clamp(38px, 5.4vw, 72px)", maxWidth: "18ch" }}
        >
          ダウンロードを
          <br />
          <em className="text-[#1452FF] not-italic">開始しました。</em>
        </h1>

        {/* Lede */}
        <p className="mb-14 max-w-[56ch] text-[17px] leading-[1.7] text-white/72">
          『AI 検索時代の、企業マーケティング白書 2026』のダウンロードを開始しました。
          ご記入のメールアドレスにも、ダウンロードリンクと領収書を送付しています。
          ダウンロードが自動的に始まらない場合は、下記の代替リンクからお進みください。
        </p>

        {/* Download panel */}
        <div className="mb-16 grid items-center gap-9 rounded-2xl border border-white/[0.14] bg-white/[0.03] p-8 lg:grid-cols-[auto_1fr_auto]">
          {/* Mini cover */}
          <div
            className="relative h-[156px] w-[120px] flex-shrink-0 overflow-hidden rounded-[4px] p-3.5"
            style={{
              background: "linear-gradient(135deg, #0B0B0E 0%, #1A2752 60%, #1452FF 100%)",
              boxShadow: "0 12px 28px -8px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute right-0 top-0 h-[50px] w-[50px]" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.18) 50%)" }} />
            <div className="flex h-full flex-col justify-between">
              <div className="font-mono text-[9px] leading-[1.4] tracking-[0.2em] text-white/55">
                ASCENT<br />GEO<br />WHITE<br />PAPER
              </div>
              <div className="text-[13px] font-bold leading-[1.2] tracking-[-0.01em] text-white">
                AI 検索時代の企業マーケティング
              </div>
              <div className="border-t border-white/18 pt-2 font-mono text-[9px] tracking-[0.18em] text-[#DCE5FF]">
                2026 · PDF
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[#1452FF]">
              [ WHITEPAPER ]
            </div>
            <h3 className="mb-3 text-[22px] font-bold leading-[1.2] tracking-[-0.015em] text-[#FAFAF7]">
              AI 検索時代の、企業マーケティング白書 2026
            </h3>
            <div className="flex gap-6 font-mono text-[11px] tracking-[0.14em] text-white/55">
              <span>PDF <span className="text-[#FAFAF7]">48 PAGES</span></span>
              <span>SIZE <span className="text-[#FAFAF7]">4.2 MB</span></span>
              <span>LANG <span className="text-[#FAFAF7]">日本語</span></span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col items-end gap-2">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/50">PREPARING</div>
            <div className="h-1 w-[220px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#1452FF]"
                style={{ width: 0, animation: "wpdFill 1.6s ease-out forwards 0.4s" }}
              />
            </div>
            <div className="font-mono text-[14px] font-semibold text-[#FAFAF7]">100%</div>
          </div>
        </div>

        {/* Fallback link */}
        <div className="mb-14 flex items-center gap-4 rounded-xl border border-dashed border-white/[0.18] px-5 py-4 text-[13px] text-white/65">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/40">ALT</div>
          <span>
            ダウンロードが始まらない場合は
            <Link href="/whitepaper" className="ml-1 border-b border-[#1452FF] pb-px text-[#1452FF]">
              こちらのリンク
            </Link>
            からもう一度お試しください。
          </span>
        </div>

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
      </div>
    </div>
  );
}
