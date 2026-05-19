"use client";

/* ─────────────────────────────────────────────
   Adobe AI Traffic Report — Chart Components
   Pure SVG / CSS, no external chart library
───────────────────────────────────────────── */

/* ── 1. 業界別AI訪問増加率（横棒グラフ） ── */
export function IndustryGrowthChart() {
  const data = [
    { label: "リテール", value: 393, color: "#1452FF" },
    { label: "旅行", value: 233, color: "#3B6FFF" },
    { label: "金融サービス", value: 158, color: "#5B8CFF" },
    { label: "メディア／エンタメ", value: 84, color: "#7BA8FF" },
    { label: "テクノロジー／SW", value: 63, color: "#9BC4FF" },
  ];
  const max = 450;

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Adobe Digital Insights · 2026 Q1</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">業界別 AI訪問増加率（前年比）</h3>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-4">
            <div className="w-[120px] shrink-0 text-right text-[13px] font-medium text-[#3A3A42]">{d.label}</div>
            <div className="relative flex-1 h-8 bg-[#F2F0EA] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(d.value / max) * 100}%`,
                  background: `linear-gradient(90deg, ${d.color}, ${d.color}cc)`,
                }}
              />
            </div>
            <div className="w-[56px] shrink-0 font-mono text-[15px] font-bold text-[#0B0B0E]">+{d.value}%</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] text-[#9A9AA0]">※ 2026年第1四半期、前年同期比</p>
    </div>
  );
}

/* ── 2. リテール：AI訪問者 vs 通常訪問者（比較バー） ── */
export function RetailEngagementChart() {
  const metrics = [
    { label: "コンバージョン率", ai: 142, normal: 100, unit: "" },
    { label: "滞在時間", ai: 148, normal: 100, unit: "" },
    { label: "閲覧ページ数", ai: 113, normal: 100, unit: "" },
    { label: "1訪問あたり売上", ai: 137, normal: 100, unit: "" },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Retail · 2026.03</div>
      <h3 className="mb-2 text-[18px] font-bold tracking-[-0.02em]">AI訪問者 vs 通常訪問者（リテール）</h3>
      <p className="mb-6 text-[13px] text-[#6B6B73]">通常訪問者 = 100 として指数化</p>
      <div className="space-y-5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="mb-1.5 flex items-center justify-between text-[13px]">
              <span className="font-medium text-[#3A3A42]">{m.label}</span>
              <span className="font-mono text-[12px] text-[#1452FF] font-bold">AI +{m.ai - 100}%</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-16 text-right text-[11px] text-[#9A9AA0]">AI訪問</span>
                <div className="relative flex-1 h-5 bg-[#F2F0EA] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(m.ai / 160) * 100}%`, background: "linear-gradient(90deg, #1452FF, #3B6FFF)" }}
                  />
                </div>
                <span className="w-8 font-mono text-[12px] font-bold text-[#0B0B0E]">{m.ai}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-right text-[11px] text-[#9A9AA0]">通常</span>
                <div className="relative flex-1 h-5 bg-[#F2F0EA] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(100 / 160) * 100}%`, background: "#D0CEC6" }}
                  />
                </div>
                <span className="w-8 font-mono text-[12px] text-[#9A9AA0]">100</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3. 旅行：コンバージョン率差の縮小トレンド（折れ線風） ── */
export function TravelConversionChart() {
  const points = [
    { label: "2024.10", gap: 86 },
    { label: "2025.01", gap: 72 },
    { label: "2025.04", gap: 58 },
    { label: "2025.07", gap: 44 },
    { label: "2025.10", gap: 36 },
    { label: "2026.02", gap: 24 },
    { label: "2026.03", gap: 14 },
  ];

  const W = 480;
  const H = 180;
  const padL = 16;
  const padR = 16;
  const padT = 20;
  const padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 100;

  const toX = (i: number) => padL + (i / (points.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.gap)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${toX(points.length - 1)} ${padT + chartH} L ${toX(0)} ${padT + chartH} Z`;

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Travel · Conversion Gap</div>
      <h3 className="mb-1 text-[18px] font-bold tracking-[-0.02em]">旅行：AI訪問 vs 通常訪問のCVR差</h3>
      <p className="mb-4 text-[13px] text-[#6B6B73]">差が86%→14%まで急速に縮小</p>
      <div className="overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 180 }}>
          <defs>
            <linearGradient id="travelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1452FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1452FF" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((v) => (
            <line
              key={v}
              x1={padL} y1={toY(v)}
              x2={padL + chartW} y2={toY(v)}
              stroke="#E6E4DD" strokeWidth="1"
            />
          ))}
          {/* Area */}
          <path d={areaD} fill="url(#travelGrad)" />
          {/* Line */}
          <path d={pathD} fill="none" stroke="#1452FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={toX(i)} cy={toY(p.gap)} r="4" fill="white" stroke="#1452FF" strokeWidth="2" />
          ))}
          {/* First & last labels */}
          <text x={toX(0)} y={toY(points[0].gap) - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B0B0E">
            86%
          </text>
          <text x={toX(points.length - 1)} y={toY(points[points.length - 1].gap) - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1452FF">
            14%
          </text>
          {/* X-axis labels */}
          {points.map((p, i) => (
            <text key={i} x={toX(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#9A9AA0">
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── 4. 業界別エンゲージメント・直帰率改善（グループ比較） ── */
export function IndustryEngagementChart() {
  const data = [
    { label: "テクノロジー", engagement: 30, bounce: 40 },
    { label: "旅行", engagement: 17, bounce: 41 },
    { label: "リテール", engagement: 12, bounce: 32 },
    { label: "メディア", engagement: 14, bounce: 17 },
    { label: "金融", engagement: 7, bounce: 17 },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">All Industries · 2026.03</div>
      <h3 className="mb-2 text-[18px] font-bold tracking-[-0.02em]">業界別 エンゲージメント向上 · 直帰率低下</h3>
      <div className="mb-5 flex items-center gap-5 text-[12px]">
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#1452FF" }} />エンゲージメント向上率</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#7BA8FF" }} />直帰率低下率</span>
        <span className="text-[#9A9AA0]">（AI訪問 vs 通常訪問の差）</span>
      </div>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.label}>
            <div className="mb-1.5 text-[13px] font-medium text-[#3A3A42]">{d.label}</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 h-6 bg-[#F2F0EA] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(d.engagement / 45) * 100}%`, background: "linear-gradient(90deg, #1452FF, #3B6FFF)" }}
                  />
                </div>
                <span className="w-10 font-mono text-[12px] font-bold text-[#1452FF]">+{d.engagement}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 h-6 bg-[#F2F0EA] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(d.bounce / 45) * 100}%`, background: "linear-gradient(90deg, #7BA8FF, #9BC4FF)" }}
                  />
                </div>
                <span className="w-10 font-mono text-[12px] font-bold text-[#5B8CFF]">-{d.bounce}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 5. 世代別オンラインショッピングAI利用率（ドーナツ/バー） ── */
export function GenerationAIUsageChart() {
  const data = [
    { gen: "Gen Z", pct: 53, color: "#1452FF" },
    { gen: "ミレニアル", pct: 48, color: "#3B6FFF" },
    { gen: "Gen X", pct: 34, color: "#7BA8FF" },
    { gen: "ベビーブーム", pct: 34, color: "#B8CEFF" },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Consumer Survey · 2026.03 · n=5,000+</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">世代別：オンラインショッピングでのAI利用率</h3>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {data.map((d) => {
          const r = 36;
          const circ = 2 * Math.PI * r;
          const dash = (d.pct / 100) * circ;
          return (
            <div key={d.gen} className="flex flex-col items-center gap-3">
              <svg width="96" height="96" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r={r} fill="none" stroke="#F2F0EA" strokeWidth="8" />
                <circle
                  cx="48" cy="48" r={r}
                  fill="none"
                  stroke={d.color}
                  strokeWidth="8"
                  strokeDasharray={`${dash} ${circ}`}
                  strokeDashoffset={circ * 0.25}
                  strokeLinecap="round"
                />
                <text x="48" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0B0B0E">{d.pct}%</text>
                <text x="48" y="58" textAnchor="middle" fontSize="9" fill="#9A9AA0">利用あり</text>
              </svg>
              <span className="text-center text-[12px] font-medium text-[#3A3A42]">{d.gen}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 6. テクノロジー分野：AI購入カテゴリ（横棒） ── */
export function TechPurchaseCategoryChart() {
  const data = [
    { label: "電子製品", value: 32, color: "#1452FF" },
    { label: "IT・クラウドSW", value: 16, color: "#3B6FFF" },
    { label: "ハードウェア", value: 15, color: "#5B8CFF" },
    { label: "消費者向けSW", value: 11, color: "#7BA8FF" },
    { label: "分析ツール", value: 10, color: "#9BC4FF" },
    { label: "サイバーセキュリティ", value: 9, color: "#B8CEFF" },
    { label: "インフラツール", value: 7, color: "#D0E0FF" },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Technology / Software · 2026.03</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">AIを使って購入した技術製品カテゴリ</h3>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-[130px] shrink-0 text-right text-[12px] font-medium text-[#3A3A42]">{d.label}</div>
            <div className="relative flex-1 h-6 bg-[#F2F0EA] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(d.value / 35) * 100}%`, background: `linear-gradient(90deg, ${d.color}, ${d.color}99)` }}
              />
            </div>
            <div className="w-10 shrink-0 font-mono text-[13px] font-bold text-[#0B0B0E]">{d.value}%</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-[#9A9AA0]">AIの助けを受けて技術・ソフトウェア製品を購入したと答えた消費者（21%）の内訳</p>
    </div>
  );
}
