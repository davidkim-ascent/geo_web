const { useState, useEffect, useMemo } = React;

// ── Glyph icons (line-style, original) ──────────────────────────────────────
const HeroContactForm = window.HeroContactForm;
const SharedFooter = window.SharedFooter;

const Glyph = {
  Patent: () =>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="18" height="20" rx="2" />
      <path d="M9 9h10M9 13h10M9 17h6" />
      <circle cx="20" cy="19" r="2.4" />
      <path d="M21.6 20.6 23.4 22.4" />
    </svg>,

  Listen: () =>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 14a9 9 0 0 1 18 0v4a3 3 0 0 1-3 3h-1v-7h4" />
      <path d="M5 14v4a3 3 0 0 0 3 3h1v-7H5" />
    </svg>,

  Path: () =>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="22" cy="14" r="2" />
      <circle cx="6" cy="22" r="2" />
      <path d="M8 6h6a4 4 0 0 1 4 4v0M20 14h-6a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h0" />
    </svg>,

  Semantic: () =>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="4" />
      <circle cx="19" cy="9" r="4" />
      <circle cx="14" cy="19" r="4" />
      <path d="M11.8 11.5 12.4 16.5M16.2 11.5 15.6 16.5M12 9h4" />
    </svg>

};

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-mark"></span>
          <span>ASCENT<span style={{ color: 'var(--accent)' }}>/</span>GEO</span>
        </div>
        <nav className="nav-menu">
          <a href="Why Ascent.html">Why Ascent</a>
          <a href="Framework.html">Framework</a>
          <a href="Services.html">Services</a>
          <a href="GEO Lab.html">GEO Lab</a>
          <a href="Contact.html">Contact</a>
        </nav>
        <a className="nav-cta" href="Contact.html">相談する <span>→</span></a>
      </div>
    </header>);

}

// ── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero dark" data-screen-label="01 Hero">
      <div className="hero-bg"></div>
      <div className="hero-deco" aria-hidden="true">
        <div className="arc a1"></div>
        <div className="arc a2"></div>
        <div className="arc a3"></div>
        <div className="echo">GEO.</div>
        <div className="ticker">
          <div className="row"><span className="dot"></span><span>LIVE · AI VISIBILITY INDEX</span></div>
          <div className="row"><span>ChatGPT · 78%</span></div>
          <div className="row"><span>Gemini · 64%</span></div>
          <div className="row"><span>Copilot · 51%</span></div>
          <div className="row"><span>Perplexity · 42%</span></div>
        </div>
        <div className="scan"></div>
        <div className="scan-v"></div>
        <div className="scan-v delay"></div>
      </div>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow"><span className="pulse"></span>GENERATIVE ENGINE OPTIMIZATION</div>
            <h1>
              推測ではなく、<br />
              <span className="strike">データと特許</span>に基づく<br />
              <span className="accent">AI検索時代</span>のブランド戦略。
            </h1>
            <p className="hero-sub">
              Google・Microsoft の特許分析、リスニングマインドの実消費者インテント、Embeddingベースのセマンティック評価。<br />
              GEO は推測ゲームではない。Ascent は根拠のあるフレームワークで設計する。
            </p>
            <div className="hero-meta" style={{ marginTop: 36 }}>
              <div className="stat">
                <div className="num">2,400<span style={{ color: 'var(--muted)', fontWeight: 500 }}>＋</span></div>
                <div className="lab">Citation 解析数</div>
              </div>
              <div className="stat">
                <div className="num">12<span style={{ color: 'var(--muted)', fontWeight: 500 }}>点</span></div>
                <div className="lab">Semantic 評価モデル</div>
              </div>
              <div className="stat">
                <div className="num">47<span style={{ color: 'var(--muted)', fontWeight: 500 }}>%</span></div>
                <div className="lab">平均 Visibility 改善</div>
              </div>
              <div className="stat">
                <div className="num">04</div>
                <div className="lab">主要 AI Engine 対応</div>
              </div>
            </div>
          </div>

          <HeroContactForm />
        </div>
      </div>
    </section>);

}

// ── ERA TIMELINE ────────────────────────────────────────────────────────────
function EraSection() {
  return (
    <section className="section" id="era" data-screen-label="02 Era">
      <div className="wrap">
        <div className="section-head">
          <span className="section-id"><span className="dot"></span>S/01 — SEARCH SHIFT</span>
          <span className="section-title">AI 検索の地殻変動</span>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 42, lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.03em' }}>
            リンクから「答え」へ。検索のレイヤーが根本から書き換わる。
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '60ch' }}>
            検索の主戦場は SERP から AI Answer Engine へ。Citation がブランド露出の新しい単位になる。
          </p>
        </div>

        <div className="era-row">
          <div className="era">
            <div className="yr">— 2018</div>
            <h4>SEO Era</h4>
            <p className="desc">リンクとキーワードを軸に、SERPの上位を競った時代。</p>
            <div className="tags">
              <span className="tag">LINK GRAPH</span>
              <span className="tag">KEYWORD</span>
            </div>
            <div className="era-arrow">→</div>
          </div>
          <div className="era now">
            <div className="yr">2024 —</div>
            <h4>AI Answer Era</h4>
            <p className="desc">回答エンジンが直接回答する。Citationこそが露出。</p>
            <div className="tags">
              <span className="tag accent">CITATION</span>
              <span className="tag">PASSAGE</span>
              <span className="tag">AI COMMERCE</span>
            </div>
          </div>
        </div>

        <div className="graph-row">
          <div className="graph-card down">
            <div className="graph-head">
              <div>
                <div className="label">FIG.01 — Click Through Rate</div>
                <h5>SERP クリック率の継続的減少</h5>
              </div>
              <div className="delta">−38%</div>
            </div>
            <svg viewBox="0 0 400 140" style={{ width: '100%', height: 140 }}>
              <defs>
                <linearGradient id="downGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E04A3F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#E04A3F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 50, 80, 110].map((y) =>
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 4" />
              )}
              <path d="M0 36 L60 42 L120 58 L180 70 L240 86 L300 102 L360 116 L400 120" fill="none" stroke="#E04A3F" strokeWidth="2" />
              <path d="M0 36 L60 42 L120 58 L180 70 L240 86 L300 102 L360 116 L400 120 L400 140 L0 140 Z" fill="url(#downGrad)" />
              <text x="6" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)">2020</text>
              <text x="370" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)">2026</text>
            </svg>
          </div>
          <div className="graph-card dark">
            <div className="graph-head">
              <div>
                <div className="label">FIG.02 — AI Answer Usage</div>
                <h5>AI 回答エンジン利用の指数的成長</h5>
              </div>
              <div className="delta">+412%</div>
            </div>
            <svg viewBox="0 0 400 140" style={{ width: '100%', height: 140 }}>
              <defs>
                <linearGradient id="upGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B8FFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6B8FFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 50, 80, 110].map((y) =>
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 4" />
              )}
              <path d="M0 124 Q80 122 120 116 T240 80 T320 38 T400 12" fill="none" stroke="#6B8FFF" strokeWidth="2.4" />
              <path d="M0 124 Q80 122 120 116 T240 80 T320 38 T400 12 L400 140 L0 140 Z" fill="url(#upGrad)" />
              <circle cx="400" cy="12" r="4" fill="#6B8FFF" />
              <text x="6" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.5)">2023</text>
              <text x="370" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.5)">2026</text>
            </svg>
          </div>
        </div>
      </div>
    </section>);

}

// ── WHY ASCENT ──────────────────────────────────────────────────────────────
function WhySection() {
  const cards = [
  { num: '01 / 04', glyph: <Glyph.Patent />, title: '特許ベースの GEO 分析', desc: 'Google / Microsoft の検索特許を解析し、Passage Ranking や Intent Ranking など内部メカニズムから GEO を逆算します。' },
  { num: '02 / 04', glyph: <Glyph.Listen />, title: 'リスニングマインド消費者インテント', desc: '実消費者の検索質問データを基盤に、想定ではなく「実際に問われている問い」から戦略を組み立てます。' },
  { num: '03 / 04', glyph: <Glyph.Path />, title: 'Search Path Intelligence', desc: '一次検索だけでなく、後続質問の連鎖を可視化。CDJ ベースで購買経路上の AI 露出をデザインします。' },
  { num: '04 / 04', glyph: <Glyph.Semantic />, title: 'Semantic GEO Framework', desc: 'Embedding による意味的類似度で、質問とコンテンツの GAP を 12 点モデルで定量評価します。' }];

  return (
    <section className="section" id="why" data-screen-label="03 Why Ascent">
      <div className="wrap">
        <div className="section-head">
          <span className="section-id"><span className="dot"></span>S/02 — DIFFERENTIATION</span>
          <span className="section-title">Why Ascent</span>
        </div>

        <div style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'end' }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            なぜ Ascent の<br />
            GEO は<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 600 }}>違うのか</span>。
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '40ch', justifySelf: 'end' }}>
            4 本の柱が、AI 検索の中で「なぜ引用されるのか」を定量で説明します。
          </p>
        </div>

        <div className="why-grid">
          {cards.map((c) =>
          <div className="why-card" key={c.num}>
              <span className="num">{c.num}</span>
              <div className="glyph">{c.glyph}</div>
              <h4>{c.title}</h4>
              <p className="why-desc">{c.desc}</p>
              <div className="arrow-link">
                詳しく見る
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── FRAMEWORK RING ──────────────────────────────────────────────────────────
function FrameworkRing({ active, onHover }) {
  const cx = 270,cy = 270,R = 200;
  const steps = [
  { id: 0, label: 'Question\nIntelligence' },
  { id: 1, label: 'Semantic\nGAP' },
  { id: 2, label: 'GEO\nContent' },
  { id: 3, label: 'AI\nVisibility' },
  { id: 4, label: 'Optimization\nLoop' }];

  return (
    <svg className="fw-ring" viewBox="0 0 540 540">
      <defs>
        <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--muted-2)" />
        </marker>
      </defs>
      {/* outer dotted ring */}
      <circle cx={cx} cy={cy} r={R + 24} fill="none" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r={R - 60} fill="none" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 4" />

      {/* connector arcs */}
      {steps.map((_, i) => {
        const a1 = i / steps.length * Math.PI * 2 - Math.PI / 2;
        const a2 = (i + 1) / steps.length * Math.PI * 2 - Math.PI / 2;
        const offset = 0.18;
        const sx = cx + Math.cos(a1 + offset) * R;
        const sy = cy + Math.sin(a1 + offset) * R;
        const ex = cx + Math.cos(a2 - offset) * R;
        const ey = cy + Math.sin(a2 - offset) * R;
        return (
          <path key={i}
          d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`}
          fill="none" stroke="var(--muted-2)" strokeWidth="1.2"
          markerEnd="url(#ar)" />);

      })}

      {steps.map((s, i) => {
        const ang = i / steps.length * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(ang) * R;
        const y = cy + Math.sin(ang) * R;
        const isActive = active === i;
        return (
          <g key={i} className="node"
          onMouseEnter={() => onHover(i)}
          style={{ cursor: 'pointer' }}>
            <circle cx={x} cy={y} r="54" fill={isActive ? 'var(--accent)' : 'var(--paper)'} stroke={isActive ? 'var(--accent)' : 'var(--ink)'} strokeWidth="1.5" />
            <text x={x} y={y - 6} textAnchor="middle"
            fill={isActive ? 'white' : 'var(--ink)'}
            fontFamily="Pretendard Variable" fontWeight="600" fontSize="13"
            style={{ transformBox: 'fill-box' }}>
              {s.label.split('\n').map((t, j) =>
              <tspan key={j} x={x} dy={j === 0 ? 0 : 14}>{t}</tspan>
              )}
            </text>
            <text x={x} y={y + 36} textAnchor="middle"
            fill={isActive ? 'rgba(255,255,255,0.7)' : 'var(--muted)'}
            fontFamily="JetBrains Mono" fontSize="9"
            letterSpacing="2">0{i + 1}</text>
          </g>);

      })}
    </svg>);

}

function FrameworkSection() {
  const [active, setActive] = useState(0);
  const steps = [
  { n: '01', name: 'Question Intelligence', desc: 'CDJベースの質問生成 / Question Cluster' },
  { n: '02', name: 'Semantic GAP 分析', desc: '12点評価モデル / Semantic Similarity' },
  { n: '03', name: 'GEO コンテンツエンジニアリング', desc: 'Passage Optimization / FAQ 構造' },
  { n: '04', name: 'AI Visibility', desc: 'Visibility / Citation / AI Traffic' },
  { n: '05', name: 'Optimization Loop', desc: '継続的な改善サイクル' }];

  return (
    <section className="section dark" id="framework" data-screen-label="04 Framework">
      <div className="wrap">
        <div className="section-head">
          <span className="section-id"><span className="dot"></span>F/01 — METHODOLOGY</span>
          <span className="section-title">GEO Framework</span>
        </div>

        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: '20ch' }}>
            5 ステップで回す、<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 600 }}>循環型</span> GEO 設計。
          </h2>
        </div>

        <div className="fw-grid">
          <div className="fw-ring-wrap">
            <FrameworkRing active={active} onHover={setActive} />
            <div className="fw-center">
              <div className="lab">GEO FRAMEWORK</div>
              <div className="ttl">5 Phase<br /><span className="accent">Loop</span></div>
            </div>
          </div>

          <div className="fw-list">
            {steps.map((s, i) =>
            <div className={`fw-step ${active === i ? 'active' : ''}`} key={s.n}
            onMouseEnter={() => setActive(i)}>
                <span className="n">{s.n}</span>
                <div>
                  <h5>{s.name}</h5>
                  <div className="meta">{s.desc}</div>
                </div>
                <span className="more">→</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ── SERVICES ────────────────────────────────────────────────────────────────
function ServicesSection() {
  const svcs = [
  {
    ix: 'S/01', name: '質問クラスター抽出',
    desc: 'CDJ 5 段階 × 検索量 × 文脈データから、ブランドが応答すべき質問群をデータ基盤で導出。',
    items: ['CDJ 5 段階分類', '検索量による優先度化', 'cluster・path 文脈結合'],
    vis: <ClusterMock />
  },
  {
    ix: 'S/02', name: 'GAP Analysis',
    desc: '質問とコンテンツの間にある意味的ギャップを発見。',
    items: ['質問 ↔ コンテンツ GAP', '12 点 Semantic Score', 'Cluster Mapping'],
    vis: <ScoreMock />
  },
  {
    ix: 'S/03', name: 'GEO コンテンツ制作',
    desc: 'AI に「引用される」構造を設計するライティング。',
    items: ['Passage 最適化', 'FAQ / Schema 設計', 'GEO Writing'],
    vis: <PassageMock />
  },
  {
    ix: 'S/04', name: 'GEO モニタリング',
    desc: '可視性・引用・トラフィックを継続トラッキング。',
    items: ['Brand Visibility', 'Citation Tracking', 'AI Traffic 分析'],
    vis: <MonitorMock />
  }];

  return (
    <section className="section" id="services" data-screen-label="05 Services">
      <div className="wrap">
        <div className="section-head">
          <span className="section-id"><span className="dot"></span>S/03 — OFFERING</span>
          <span className="section-title">Services</span>
        </div>

        <div style={{ marginBottom: 56, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'end' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}>
            質問 → 分析 → 制作 → モニタリング。<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 600, marginLeft: '0.4em' }}>フルスタック</span>で提供。
          </h2>
        </div>

        <div className="svc-grid">
          {svcs.map((s) =>
          <div className="svc-card" key={s.ix}>
              <div>
                <div className="ix">{s.ix}</div>
                <h3>{s.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16, marginTop: 0 }}>{s.desc}</p>
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <div className="actions">
                  <button className="btn" style={{ padding: '10px 16px', fontSize: 13 }}>詳しく見る</button>
                </div>
              </div>
              <div className="vis">{s.vis}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ── Service mocks ───────────────────────────────────────────────────────────
function ClusterMock() {
  const stages = [
  { k: '初期探索', v: 202333, w: 100 },
  { k: '情報探索', v: 19303, w: 42 },
  { k: '経験探索', v: 8283, w: 28 },
  { k: '購買確定', v: 4120, w: 18 },
  { k: '購買以後', v: 2104, w: 10 }];

  return (
    <>
      <div className="vis-lab">QUESTION CLUSTER · CDJ 5</div>
      <div style={{ display: 'grid', gap: 6, marginBottom: 10 }}>
        {stages.map((s) =>
        <div key={s.k}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted-2)', marginBottom: 3 }}>
              <span>{s.k}</span><span>{s.v.toLocaleString()}</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${s.w}%`, height: '100%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 8, padding: '10px 12px', border: '1px solid rgba(20,82,255,0.4)', borderRadius: 6, background: 'rgba(20,82,255,0.08)' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 4 }}>FINAL CLUSTER</div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--paper)' }}>"免許なしで上り坂通勤に使える補助金対象の電動自転車は？"</div>
      </div>
    </>);

}

function DashboardMock() {
  return (
    <>
      <div className="vis-lab">VISIBILITY · 4 ENGINES</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {[
        { e: 'ChatGPT', v: 78 },
        { e: 'Gemini', v: 64 },
        { e: 'Copilot', v: 51 },
        { e: 'Perplexity', v: 42 }].
        map((r) =>
        <div key={r.e}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted-2)', marginBottom: 4 }}>
              <span>{r.e}</span><span>{r.v}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${r.v}%`, height: '100%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        )}
      </div>
    </>);

}
function ScoreMock() {
  return (
    <>
      <div className="vis-lab">SEMANTIC SCORE · 12 PT</div>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative' }}>
        <svg viewBox="0 0 120 120" style={{ width: 130, height: 130 }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--accent)" strokeWidth="6"
          strokeDasharray="314" strokeDashoffset="80" strokeLinecap="round"
          transform="rotate(-90 60 60)" />
          <text x="60" y="58" textAnchor="middle" fontFamily="Pretendard Variable" fontWeight="700" fontSize="28" fill="white">8.4</text>
          <text x="60" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--muted-2)" letterSpacing="2">/ 12.0</text>
        </svg>
      </div>
    </>);

}
function PassageMock() {
  return (
    <>
      <div className="vis-lab">PASSAGE STRUCTURE</div>
      <div style={{ display: 'grid', gap: 6, marginTop: 4 }}>
        <div style={{ height: 8, width: '90%', background: 'var(--accent)', borderRadius: 2 }}></div>
        <div style={{ height: 4, width: '60%', background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}></div>
        <div style={{ height: 4, width: '78%', background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}></div>
        <div style={{ height: 4, width: '52%', background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}></div>
        <div style={{ height: 8, width: '70%', background: 'var(--accent)', borderRadius: 2, marginTop: 8 }}></div>
        <div style={{ height: 4, width: '85%', background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}></div>
        <div style={{ height: 4, width: '64%', background: 'rgba(255,255,255,0.18)', borderRadius: 2 }}></div>
      </div>
    </>);

}
function MonitorMock() {
  return (
    <>
      <div className="vis-lab">CITATION TREND · 90D</div>
      <div className="mini-bar">
        {[20, 35, 28, 48, 42, 60, 55, 72, 68, 80, 76, 92].map((h, i) =>
        <div key={i} className={i >= 8 ? 'hi' : ''} style={{ height: `${h}%` }}></div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--muted-2)', marginTop: 8 }}>
        <span>JAN</span><span>FEB</span><span>MAR</span>
      </div>
    </>);

}

// ── LAB ─────────────────────────────────────────────────────────────────────
function LabSection() {
  const items = [
  { tag: 'TREND', num: '03', title: '検索はどう変わっているのか — 2026 AI 検索レポート', date: '04.18', read: '8 MIN', featured: true,
    desc: 'クリック率・回答出現率・引用率の最新データ。検索行動の根本的な変化を読み解く。' },
  { tag: 'COMPARE', num: '02', title: 'SEO と GEO は何が違うのか', date: '04.04', read: '6 MIN' },
  { tag: 'INSIGHT', num: '01', title: 'AI はどんなコンテンツを引用するのか', date: '03.22', read: '10 MIN' }];

  return (
    <section className="section" id="lab" data-screen-label="06 Lab">
      <div className="wrap">
        <div className="section-head">
          <span className="section-id"><span className="dot"></span>L/01 — RESEARCH HUB</span>
          <span className="section-title">GEO Lab</span>
        </div>

        <div style={{ marginBottom: 56, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'end' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}>
            AI 検索時代の<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 600, marginLeft: '0.4em' }}>リサーチハブ</span>。
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '40ch', justifySelf: 'end' }}>
            特許分析・実データ検証・引用構造の研究。GEO Lab は実務に効くリサーチを発信します。
          </p>
        </div>

        <div className="lab-grid">
          {items.map((it, i) =>
          <div className={`lab-card ${it.featured ? 'featured' : ''}`} key={it.title}>
              <div className="thumb">
                <div className="thumb-pat"></div>
                <span className="thumb-lab">{it.tag}</span>
                <span className="thumb-num">{it.num}</span>
              </div>
              <div className="body">
                <h4>{it.title}</h4>
                {it.desc && <p>{it.desc}</p>}
                <div className="meta">
                  <span>{it.date}</span>
                  <span>{it.read} READ</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lab-foot">
          <div className="filters">
            <button className="chip active">All</button>
            <button className="chip">検索の変化</button>
            <button className="chip">SEO vs GEO</button>
            <button className="chip">AI構造分析</button>
            <button className="chip">Writing Guide</button>
            <button className="chip">KPI Guide</button>
          </div>
          <button className="btn ghost">すべての記事 → </button>
        </div>
      </div>
    </section>);

}

// ── CTA STRIP ───────────────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <div className="wrap" id="contact" data-screen-label="07 CTA">
      <div className="cta-strip">
        <div className="bg-arc"></div>
        <div className="bg-arc b2"></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.18em', marginBottom: 24 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: '#6B8FFF', borderRadius: '50%', marginRight: 8 }}></span>
            CONTACT — START WITH A FREE AUDIT
          </div>
          <h2>
            AI 検索で、<br />
            あなたのブランドは<br />
            <span className="accent">何回引用されている</span>か？
          </h2>
          <p className="cta-sub">
            まずは無料診断で、現在の AI Visibility と Citation 構造を可視化します。所要 30 分のオンライン MTG から。
          </p>
        </div>
        <div className="actions" style={{ position: 'relative', zIndex: 1 }}>
          <a className="btn primary" href="Contact.html">相談する <span className="arr">→</span></a>
          <a className="btn ghost" href="whitepaper.html">サービス資料をダウンロード</a>
          <a className="btn ghost" href="Contact.html">カレンダー予約（30分）</a>
        </div>
      </div>
    </div>);

}

// ── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return <SharedFooter />;
}

// ── TWEAKS ──────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#1452FF",
  "density": "normal",
  "rotateRing": true
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  useEffect(() => {
    document.body.classList.toggle('theme-dark', t.theme === 'dark');
    document.body.setAttribute('data-density', t.density);
    document.body.classList.toggle('tweak-norotate', !t.rotateRing);
    document.documentElement.style.setProperty('--accent', t.accent);
    // soft accent variant
    const hex = t.accent;
    document.documentElement.style.setProperty('--accent-soft',
    hex === '#1452FF' ? '#DCE5FF' :
    hex === '#0F8A5B' ? '#D9F0E5' :
    hex === '#E04A3F' ? '#FBDDDB' :
    hex === '#7A5AE0' ? '#E5DFFB' :
    '#DCE5FF');
  }, [t.theme, t.density, t.rotateRing, t.accent]);

  const Panel = window.TweaksPanel;
  const Section = window.TweakSection;
  const Radio = window.TweakRadio;
  const Toggle = window.TweakToggle;
  const Color = window.TweakColor;

  return (
    <>
      <Nav />
      <Hero />
      <EraSection />
      <WhySection />
      <FrameworkSection />
      <ServicesSection />
      <LabSection />
      <CTAStrip />
      <Footer />

      {Panel &&
      <Panel title="Tweaks">
          <Section label="Theme">
            <Radio label="モード" value={t.theme}
          options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          onChange={(v) => setTweak('theme', v)} />
            <Color label="Accent" value={t.accent}
          options={['#1452FF', '#0F8A5B', '#E04A3F', '#7A5AE0']}
          onChange={(v) => setTweak('accent', v)} />
            <Radio label="密度" value={t.density}
          options={[{ value: 'compact', label: 'Compact' }, { value: 'normal', label: 'Normal' }, { value: 'airy', label: 'Airy' }]}
          onChange={(v) => setTweak('density', v)} />
            <Toggle label="Ring 回転" value={t.rotateRing}
          onChange={(v) => setTweak('rotateRing', v)} />
          </Section>
        </Panel>
      }
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);