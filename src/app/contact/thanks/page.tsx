export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0E] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-[640px] w-full text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.15em] text-white/40 mb-12">
            <span>HOME</span>
            <span>›</span>
            <span>CONTACT</span>
            <span>›</span>
            <span className="text-[#1452FF]">お問い合わせ完了</span>
          </div>

          {/* Ticket ID */}
          <div className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] text-white/40 mb-6">
            TICKET-ID · {Date.now().toString(36).toUpperCase()}
          </div>

          {/* Heading */}
          <h1
            className="font-bold text-white mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.035em' }}
          >
            お問い合わせを<br />
            <span style={{ color: '#1452FF' }}>受け付けました。</span>
          </h1>

          <p className="text-[16px] text-white/60 leading-[1.7] mb-16 max-w-[44ch] mx-auto">
            ご入力いただいた内容は、GEOチームのリードコンサルタントに直接届きます。<br />
            一次返信は<strong className="text-white/80">24時間以内</strong>に、ご記入のメールアドレス宛にお送りします（土日祝の場合は翌営業日）。
          </p>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
            {[
              { step: 'STEP 01', title: '受付完了', desc: 'ご入力の内容を共有し、担当者へのメール転送も済みました。' },
              { step: 'STEP 02', title: '一次返信', desc: 'GEOコンサルタントが、ご相談内容に即したアウトラインをご連絡します。', active: true },
              { step: 'STEP 03', title: '30分の無料相談', desc: 'Google特許分析とAI検索計測を活用したGEO戦略の可能性をご提案します。' },
            ].map(({ step, title, desc, active }) => (
              <div
                key={step}
                className="bg-[#0B0B0E] p-6 text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold"
                    style={active
                      ? { borderColor: '#1452FF', backgroundColor: '#1452FF', color: '#fff' }
                      : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.3)' }
                    }
                  >
                    {active ? '●' : '○'}
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] text-white/40">{step}</span>
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
                <p className="text-[13px] text-white/50 leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Phone CTA */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.15em] text-[#1452FF] mb-2">
                OR · CALL US DIRECTLY
              </div>
              <h3 className="text-[18px] font-bold text-white mb-1">電話でコンタクトする。</h3>
              <p className="text-[13px] text-white/50">
                急ぎのご案件や、まずは聞いてみたいという方は、代表番号まで。<br />
                平日 9:00〜18:00 で対応しています。
              </p>
            </div>
            <a
              href="tel:0335273963"
              className="flex-shrink-0 font-['JetBrains_Mono',monospace] font-bold text-white hover:text-[#1452FF] transition-colors"
              style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '0.04em' }}
            >
              03 3527 3963
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
