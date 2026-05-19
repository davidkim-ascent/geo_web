"use client";

const COMPANIES = [
  { name: "SEOジャパン",      x: 28, y: 22, r: 32, color: "#C0666A", type: "seo" },
  { name: "ジオコード",        x: 18, y: 31, r: 32, color: "#8B5A9E", type: "seo" },
  { name: "東京SEOメーカー",   x: 36, y: 40, r: 32, color: "#D4813A", type: "geo" },
  { name: "メディアグロース",  x: 22, y: 48, r: 32, color: "#3A9E7A", type: "geo" },
  { name: "Ascent\nGEO", x: 78, y: 26, r: 32, color: "#2563EB", type: "demand", highlight: true },
  { name: "ミエルカ",          x: 24, y: 75, r: 32, color: "#E0A030", type: "tool" },
  { name: "ニュートラルワークス", x: 38, y: 72, r: 32, color: "#4A9BB5", type: "tool" },
];

// Each bubble gets a unique float animation offset so they move independently
const FLOAT_OFFSETS = [
  { dx: 6, dy: 5, dur: 5.2 },
  { dx: 5, dy: 7, dur: 6.1 },
  { dx: 7, dy: 4, dur: 4.8 },
  { dx: 4, dy: 6, dur: 5.7 },
  { dx: 8, dy: 6, dur: 5.0 },
  { dx: 5, dy: 5, dur: 6.4 },
  { dx: 6, dy: 7, dur: 5.5 },
];

export function PositioningMap() {
  return (
    <div className="relative w-full" style={{ background: "transparent" }}>
      {/* Title */}
      <div className="text-center mb-3">
        <p className="text-[16px] font-semibold text-[#0B0B0E] tracking-tight">
          GEO/LLMO 対策会社 ポジショニングマップ
        </p>
        <p className="text-[12px] text-[#6B6B73] mt-1">対策の起点(X軸) × サービスの主軸(Y軸)</p>
        <p className="text-[13px] font-semibold text-[#0B0B0E] mt-1.5">戦略コンサルティング 主軸</p>
      </div>

      {/* Chart area */}
      <div className="relative mx-auto" style={{ maxWidth: 900 }}>
        {/* Quadrant labels */}
        <div className="absolute top-2 left-4 text-[9px] text-[#6B6B73] font-mono">【左上】競合密集ゾーン</div>
        <div className="absolute top-2 right-4 text-[9px] text-[#6B6B73] font-mono text-right">【右上】競合不在の独占ポジション</div>

        {/* Ascent badge */}
        <div
          className="absolute z-20 rounded-md border border-[#1452FF] bg-[#0B0B0E] px-2 py-1 text-center"
          style={{ right: "8%", top: "6%" }}
        >
          <div className="text-[8px] font-mono text-[#6B6B73] tracking-widest">需要起点型・独占</div>
          <div className="text-[10px] font-semibold text-white">Ascent GEO</div>
        </div>

        {/* SVG map */}
        <svg
          viewBox="0 0 600 420"
          className="w-full h-auto"
          style={{ overflow: "visible" }}
        >
          {/* Quadrant background fills */}
          <rect x="0" y="0" width="300" height="210" fill="#F5F5F0" opacity="0.6" />
          <rect x="300" y="0" width="300" height="210" fill="#EEF2FF" opacity="0.6" />
          <rect x="0" y="210" width="300" height="210" fill="#F9F9F7" opacity="0.4" />
          <rect x="300" y="210" width="300" height="210" fill="#F5F5F0" opacity="0.4" />

          {/* Axes */}
          <line x1="0" y1="210" x2="600" y2="210" stroke="#D1D0C9" strokeWidth="1.5" />
          <line x1="300" y1="0" x2="300" y2="420" stroke="#D1D0C9" strokeWidth="1.5" />

          {/* Axis arrows */}
          <polygon points="600,210 592,205 592,215" fill="#D1D0C9" />
          <polygon points="300,0 295,8 305,8" fill="#D1D0C9" />
          <polygon points="0,210 8,205 8,215" fill="#D1D0C9" />
          <polygon points="300,420 295,412 305,412" fill="#D1D0C9" />

          {/* Axis labels */}
          <text x="8" y="204" fontSize="13" fill="#6B6B73" textAnchor="start" fontFamily="monospace">サイト中心</text>
          <text x="8" y="220" fontSize="11" fill="#9A9AA0" textAnchor="start" fontFamily="monospace">（供給側起点）</text>
          <text x="592" y="204" fontSize="13" fill="#1452FF" textAnchor="end" fontFamily="monospace">ユーザー中心</text>
          <text x="592" y="220" fontSize="11" fill="#1452FF" textAnchor="end" fontFamily="monospace">（需要側起点）</text>

          {/* Bottom axis labels */}
          <text x="300" y="412" fontSize="13" fill="#6B6B73" textAnchor="middle" fontFamily="monospace">ツール / プラットフォーム 主軸</text>

          {/* Bubbles */}
          {COMPANIES.map((c, i) => {
            const cx = (c.x / 100) * 600;
            const cy = (c.y / 100) * 420;
            const { dx, dy, dur } = FLOAT_OFFSETS[i];
            const animId = `float-${i}`;
            const lines = c.name.split("\n");

            return (
              <g key={c.name}>
                {/* Animated circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={c.r}
                  fill={c.highlight ? "#2563EB" : c.color}
                  opacity={c.highlight ? 0.92 : 0.82}
                  filter={c.highlight ? "url(#glow-blue)" : undefined}
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`0,0; ${dx},${-dy}; ${-dx / 2},${dy}; 0,0`}
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
                  />
                </circle>

                {/* Label outside the bubble */}
                <text
                  x={cx + c.r + 6}
                  y={cy + 4}
                  fontSize={c.highlight ? 12 : 11}
                  fill={c.highlight ? "#1452FF" : "#2D2D35"}
                  fontFamily="sans-serif"
                  fontWeight={c.highlight ? "600" : "400"}
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`0,0; ${dx},${-dy}; ${-dx / 2},${dy}; 0,0`}
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
                  />
                  {lines.map((line, li) => (
                    <tspan key={li} x={cx + c.r + 6} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* Glow filter for Ascent */}
          <defs>
            <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Bottom axis label row */}
        <div className="text-center -mt-1">
          <p className="text-[10px] font-semibold text-[#0B0B0E]">ツール / プラットフォーム 主軸</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-3">
          {[
            { color: "#C0666A", label: "SEOジャパン" },
            { color: "#8B5A9E", label: "ジオコード" },
            { color: "#D4813A", label: "東京SEOメーカー" },
            { color: "#3A9E7A", label: "メディアグロース" },
            { color: "#2563EB", label: "Ascent GEO" },
            { color: "#E0A030", label: "ミエルカ" },
            { color: "#4A9BB5", label: "ニュートラルワークス" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] text-[#4B4B55]">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-[9px] text-[#9A9AA0] mt-2">
          © Ascent Networks　/ 2026年5月時点　/ 競合分析レポートより
        </p>
      </div>
    </div>
  );
}
