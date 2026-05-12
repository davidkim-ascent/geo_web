// Shared nav + footer for sub-pages
window.SharedNav = function SharedNav({ active }) {
  const items = [
    { h: 'Why Ascent.html', l: 'Why Ascent', k: 'why' },
    { h: 'Framework.html', l: 'Framework', k: 'framework' },
    { h: 'Services.html', l: 'Services', k: 'services' },
    { h: 'GEO Lab.html', l: 'GEO Lab', k: 'lab' },
    { h: 'Contact.html', l: 'Contact', k: 'contact' },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-mark"></span>
          <span><a href="index.html">ASCENT<span style={{ color: 'var(--accent)' }}>/</span>GEO</a></span>
        </div>
        <nav className="nav-menu">
          {items.map((i) => (
            <a key={i.k} href={i.h} style={active === i.k ? { color: 'var(--accent)' } : {}}>{i.l}</a>
          ))}
        </nav>
        <a className="nav-cta" href="Contact.html">相談する <span>→</span></a>
      </div>
    </header>
  );
};

window.SharedFooter = function SharedFooter() {
  return (
    <footer style={{ background: 'var(--paper)', borderTop: '1px solid var(--hairline)', padding: '64px 0 32px' }}>
      <div className="wrap">
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 56, paddingBottom: 40, borderBottom: '1px solid var(--hairline)' }}>
          <div className="foot-col">
            <div className="foot-mark" style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 16 }}>ASCENT<span style={{ color: 'var(--accent)' }}>/</span>GEO</div>
            <p className="foot-tagline" style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24 }}>特許 × 実消費者インテント × Embedding。<br />根拠ある GEO で、AI 検索のリーダーへ。</p>
            <div className="foot-locale" style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}><span>東京都中央区晴海 1-8-10 トリトンスクエアタワーX 8階</span></div>
          </div>
          <div className="foot-col"><h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 16px', fontWeight: 600 }}>SITEMAP</h5><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            <li><a href="index.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>Home</a></li>
            <li><a href="Why Ascent.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>Why Ascent</a></li>
            <li><a href="Framework.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>Framework</a></li>
            <li><a href="Services.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>Services</a></li>
            <li><a href="GEO Lab.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>GEO Lab</a></li>
          </ul></div>
          <div className="foot-col"><h5 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', margin: '0 0 16px', fontWeight: 600 }}>CONTACT</h5><ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            <li><a href="Contact.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>geo@ascentnet.co.jp</a></li>
            <li><a href="Contact.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>カレンダー予約（30分）</a></li>
            <li><a href="whitepaper.html" style={{ fontSize: 14, color: 'var(--ink-2)' }}>資料ダウンロード</a></li>
          </ul></div>
        </div>
        <div className="foot-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginTop: 24, paddingTop: 0, borderTop: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted-2)' }}>
          <span>© 2026 ASCENT NETWORK</span>
          <a href="Privacy.html" style={{ color: 'inherit' }}>プライバシーポリシー</a>
        </div>
      </div>
    </footer>
  );
};

// Shared hero contact form — used in Index hero & all sub-page heroes
window.HeroContactForm = function HeroContactForm() {
  return (
    <div className="hero-card">
      <h3>まずは、お気軽にご相談</h3>
      <div className="small">CONTACT · 24h 以内に返信</div>
      <input className="field" placeholder="会社名" />
      <input className="field" placeholder="担当者名" />
      <input className="field" placeholder="メールアドレス" type="email" />
      <textarea className="field area" placeholder="ご相談内容（任意）"></textarea>
      <button className="btn primary submit">送信</button>
      <div className="or">OR</div>
      <div className="alt-row">
        <a className="btn ghost" href="Contact.html">カレンダー予約（30分）</a>
        <a className="btn ghost" href="whitepaper.html">サービス資料をダウンロード</a>
      </div>
    </div>
  );
};

window.SubHero = function SubHero({ eyebrow, title, accentTitle, lede, kicker, withForm }) {
  return (
    <section className="why-hero" data-screen-label="Hero">
      <div className="hero-bg"></div>
      <div className="ambient"></div>
      <div className="hero-deco" aria-hidden="true">
        <div className="arc a1"></div>
        <div className="arc a2"></div>
        <div className="arc a3"></div>
        <div className="echo">GEO</div>
        <div className="ticker">
          <div className="row"><span className="dot"></span><span>VISIBILITY · LIVE</span></div>
          <div className="row"><span>CITATIONS +34 / WK</span></div>
          <div className="row"><span>AI TRAFFIC +22%</span></div>
        </div>
        <div className="scan"></div>
        <div className="scan-v"></div>
        <div className="scan-v delay"></div>
      </div>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className={withForm ? 'sub-hero-grid' : ''}>
          <div>
            <div className="breadcrumb">
              <a href="index.html" style={{ color: 'var(--muted-2)' }}>HOME</a>
              <span className="sep">/</span>
              <span style={{ color: 'var(--paper)' }}>{eyebrow}</span>
            </div>
            <h1>{title}<br /><span className="accent">{accentTitle}</span></h1>
            <p className="lede">{lede}</p>
            {kicker}
          </div>
          {withForm && <HeroContactForm />}
        </div>
      </div>
    </section>
  );
};
