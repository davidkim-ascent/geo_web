"use client";

const STEPS = [
  { ix: "01", name: "質問分析", jp: "質問分析" },
  { ix: "02", name: "GAP分析", jp: "10点評価モデル" },
  { ix: "03", name: "GEOに特化したコンテンツ対策", jp: "GEOに特化したコンテンツ対策" },
  { ix: "04", name: "モニタリング", jp: "モニタリング" },
  { ix: "05", name: "Optimization Loop", jp: "最適化ループ" },
];

// viewBox coordinate space: 0-100 x, 0-100 y
// Pentagon nodes on circle r=38 centered at (50,50)
// Top node y = 50-38 = 12, bottom nodes y = 50+38*sin(54°) ≈ 80.8
// Clip viewBox vertically: from y=4 to y=88 → height=84
// So aspect ratio = 100 / 84 ≈ 1.19 : 1

const VB_Y0 = 4;
const VB_H = 84;

export function FrameworkLoop() {
  const nodes = STEPS.map((s, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const r = 38;
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    return { ...s, x, y };
  });

  return (
    <div style={{ position: "relative", margin: "40px auto 0", maxWidth: 900 }}>
      {/* SVG drives the container height via viewBox aspect ratio */}
      <svg
        viewBox={`0 ${VB_Y0} 100 ${VB_H}`}
        style={{ width: "100%", display: "block", pointerEvents: "none" }}
      >
        <circle cx="50" cy="50" r="38" fill="none" stroke="#E6E4DD" strokeWidth="0.2" strokeDasharray="0.8 0.8" />
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % 5];
          return (
            <line
              key={i}
              x1={n.x} y1={n.y}
              x2={next.x} y2={next.y}
              stroke="#1452FF"
              strokeWidth="0.15"
              opacity="0.4"
            />
          );
        })}
      </svg>

      {/* Center overlay */}
      <div
        style={{
          position: "absolute",
          // map SVG coord (50, 50) into % of clipped viewBox
          left: "50%",
          top: `${((50 - VB_Y0) / VB_H) * 100}%`,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "1px dashed #E6E4DD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            background: "radial-gradient(circle, #DCE5FF, transparent 70%)",
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#1452FF" }}>
            CORE
          </span>
        </div>
        <h3 style={{ fontSize: 22, letterSpacing: "-0.02em", margin: 0 }}>GEO Framework</h3>
        <p style={{ fontSize: 14, color: "#6B6B73", marginTop: 4, maxWidth: "28ch", lineHeight: 1.6 }}>
          5 つのフェーズが連動し、<br />継続的に最適化を回す
        </p>
      </div>

      {/* Node cards */}
      {nodes.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            // map SVG coords into % of clipped viewBox
            left: `${n.x}%`,
            top: `${((n.y - VB_Y0) / VB_H) * 100}%`,
            width: 200,
            transform: "translate(-50%, -50%)",
            background: "#FAFAF7",
            border: "1px solid #E6E4DD",
            borderRadius: 12,
            padding: "18px 20px",
            textAlign: "left",
            transition: "border-color 0.2s, box-shadow 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#1452FF";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(20,82,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#E6E4DD";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.16em", color: "#1452FF" }}>
            PHASE {n.ix}
          </div>
          <h4 style={{ fontSize: 16, lineHeight: 1.25, margin: "6px 0 4px", letterSpacing: "-0.01em", fontWeight: 700 }}>
            {n.name}
          </h4>
          <p style={{ margin: 0, fontSize: 13, color: "#6B6B73", lineHeight: 1.4 }}>{n.jp}</p>
        </div>
      ))}
    </div>
  );
}
