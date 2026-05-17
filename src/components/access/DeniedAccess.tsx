import Link from "next/link";

type Props = {
  backHref: string;
  backLabel: string;
};

export function DeniedAccess({ backHref, backLabel }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0E] px-6 py-16 text-[#FAFAF7]">
      <section className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-[#1452FF]/30 bg-[#1452FF]/10 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">
          ACCESS DENIED
        </div>
        <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.04em]">
          不正なアクセスです
        </h1>
        <p className="mt-4 text-[15px] leading-[1.8] text-white/65">
          このページは、正常な送信またはダウンロード完了の流れからのみ開くことができます。
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            {backLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
