export default function ThanksPage() {
  return (
    <section className="bg-[#0B0B0E] flex-1 py-20 lg:py-28 relative overflow-hidden">
      {/* Blue radial glow behind heading */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(20,82,255,0.18) 0%, rgba(20,82,255,0.06) 45%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div className="max-w-[1280px] mx-auto px-10 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.15em] text-white/40 mb-10">
          <span>HOME</span>
          <span>›</span>
          <span>CONTACT</span>
          <span>›</span>
          <span className="text-[#1452FF]">お問い合わせ完了</span>
        </div>

        {/* Ticket ID */}
        <div className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] text-white/40 mb-8">
          TICKET-ID · GEO-JP20-0558
        </div>

        {/* Heading */}
        <h1
          className="font-bold text-white mb-8"
          style={{ fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: '-0.04em' }}
        >
          お問い合わせを<br />
          <span
            className="italic"
            style={{
              color: '#1452FF',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            受け付けました。
          </span>
        </h1>

        {/* Body text */}
        <p className="text-[17px] text-white/60 leading-[1.7] mb-20 max-w-[52ch]">
          ご入力いただいた内容は、GEOチームのリードコンサルタントに直接届きます。<br />
          一次返信は<strong className="text-white/80 font-semibold">24時間以内</strong>に、ご記入のメールアドレス宛にお送りします（土日祝の場合は翌営業日）。
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
          {[
            {
              step: 'STEP 01',
              title: '受付完了',
              desc: 'ご入力の内容を共有し、担当者へのメール転送も済みました。',
              active: false,
              done: true,
            },
            {
              step: 'STEP 02',
              title: '一次返信',
              desc: 'GEOコンサルタントが、ご相談内容に即したアウトラインをご連絡します。',
              active: true,
              done: false,
            },
            {
              step: 'STEP 03',
              title: '30分の無料相談',
              desc: 'Google特許分析とAI検索計測を活用したGEO戦略の可能性をご提案します。',
              active: false,
              done: false,
            },
          ].map(({ step, title, desc, active, done }) => (
            <div key={step} className="bg-[#0B0B0E] p-8">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={
                    active
                      ? { borderColor: '#1452FF', backgroundColor: '#1452FF', color: '#fff' }
                      : done
                      ? { borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }
                      : { borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.2)' }
                  }
                >
                  {done ? '✓' : '○'}
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] text-white/40">
                  {step}
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2">{title}</h3>
              <p className="text-[13px] text-white/50 leading-[1.65]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Phone CTA */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.15em] text-[#1452FF] mb-3">
              OR · CALL US DIRECTLY
            </div>
            <h3 className="text-[19px] font-bold text-white mb-2">電話でコンタクトする。</h3>
            <p className="text-[13px] text-white/50 leading-[1.65]">
              急ぎのご案件や、まずは聞いてみたいという方は、代表番号まで。<br />
              平日 9:00〜18:00 で対応しています。
            </p>
          </div>
          <a
            href="tel:0335273963"
            className="flex-shrink-0 font-['JetBrains_Mono',monospace] font-bold text-white hover:text-[#1452FF] transition-colors whitespace-nowrap"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '0.06em' }}
          >
            03 3527 3963
          </a>
        </div>

      </div>
    </section>
  )
}
