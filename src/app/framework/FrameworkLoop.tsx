"use client";

const STEPS = [
  { ix: "01", name: "Question Intelligence", jp: "質問インテリジェンス" },
  { ix: "02", name: "Semantic GAP Analysis", jp: "セマンティックGAP分析" },
  { ix: "03", name: "GEO Content Engineering", jp: "GEOコンテンツ・エンジニアリング" },
  { ix: "04", name: "AI Visibility Monitoring", jp: "AIビジビリティ・モニタリング" },
  { ix: "05", name: "Optimization Loop", jp: "最適化ループ" },
];

const VB_Y0 = 4;
const VB_H = 84;
const CX = 50;
const CY = 50;
const R = 38;

export function FrameworkLoop() {
  const nodes = STEPS.map((s, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(angle) * R;
    const y = CY + Math.sin(angle) * R;
    return { ...s, x, y };
  });

  return (
    <div style={{ position: "relative", margin: "40px auto 0", maxWidth: 900 }}>
      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-ring {
          transform-origin: 50px 50px;
          animation: orbitSpin 120s linear infinite;
        }
        @keyframes ripple {
          0%   { r: 2;  opacity: 0.8; }
          100% { r: 34; opacity: 0; }
        }
        .ripple-1 { animation: ripple 8s ease-out infinite 0s; }
        .ripple-2 { animation: ripple 8s ease-out infinite 2.6s; }
        .ripple-3 { animation: ripple 8s ease-out infinite 5.2s; }
      `}</style>

      <svg
        viewBox={`0 ${VB_Y0} 100 ${VB_H}`}
        style={{ width: "100%", display: "block", pointerEvents: "none" }}
      >
        <defs>
          <filter id="edgeSoften" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Outer dashed orbit ring */}
        <circle
          className="orbit-ring"
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="#1e3a6e"
          strokeWidth="0.15"
          strokeDasharray="0.8 0.8"
          opacity="0.5"
        />

        {/* Pentagon — deep navy solid fill */}
        <polygon
          points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
          fill="#0d1b3e"
          stroke="#1e3a6e"
          strokeWidth="0.2"
        />

        {/* Pentagon edge lines */}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % 5];
          return (
            <line
              key={i}
              x1={n.x} y1={n.y}
              x2={next.x} y2={next.y}
              stroke="#2a5298"
              strokeWidth="0.18"
              opacity="0.6"
            />
          );
        })}

        {/* Ripple waves from core */}
        <circle className="ripple-1" cx={CX} cy={CY} r="4" fill="none" stroke="#4a90d9" strokeWidth="2.5" filter="url(#edgeSoften)" />
        <circle className="ripple-2" cx={CX} cy={CY} r="4" fill="none" stroke="#4a90d9" strokeWidth="2.5" filter="url(#edgeSoften)" />
        <circle className="ripple-3" cx={CX} cy={CY} r="4" fill="none" stroke="#4a90d9" strokeWidth="2.5" filter="url(#edgeSoften)" />

        {/* Core background circle — masks ripple lines behind text */}
        <circle cx={CX} cy={CY} r="12" fill="#0d1b3e" />

      </svg>

      {/* Center text overlay — positioned inside the r=16 circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${((CY - VB_Y0) / VB_H) * 100}%`,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          width: 160,
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: "-0.02em", color: "#e8f4ff", fontWeight: 700, marginBottom: 2 }}>
          Ascentの
        </div>
        <h3 style={{ fontSize: 18, letterSpacing: "-0.02em", margin: 0, color: "#e8f4ff", fontWeight: 700 }}>
          GEO Framework
        </h3>
        <p style={{ fontSize: 12, color: "#4a90d9", marginTop: 5, lineHeight: 1.55 }}>
          5 つのフェーズが連動し、<br />継続的に最適化を回す
        </p>
      </div>

      {/* Node cards — white on dark pentagon */}
      {nodes.map((n, i) => (
        <a
          key={i}
          href={`#step-${n.ix}`}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${((n.y - VB_Y0) / VB_H) * 100}%`,
            width: 200,
            transform: "translate(-50%, -50%)",
            background: "#ffffff",
            border: "2.5px solid #1a3a7a",
            borderRadius: 12,
            padding: "16px 18px",
            textAlign: "left",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            textDecoration: "none",
            display: "block",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#1a3a7a";
            el.style.borderColor = "#1a3a7a";
            el.style.boxShadow = "0 6px 24px rgba(26,58,122,0.35)";
            el.querySelectorAll("[data-phase]").forEach((c) => ((c as HTMLElement).style.color = "#7ab6ff"));
            el.querySelectorAll("[data-title]").forEach((c) => ((c as HTMLElement).style.color = "#ffffff"));
            el.querySelectorAll("[data-jp]").forEach((c) => ((c as HTMLElement).style.color = "#7ab6ff"));
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#ffffff";
            el.style.borderColor = "#1a3a7a";
            el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
            el.querySelectorAll("[data-phase]").forEach((c) => ((c as HTMLElement).style.color = "#1a3a7a"));
            el.querySelectorAll("[data-title]").forEach((c) => ((c as HTMLElement).style.color = "#0b0b0e"));
            el.querySelectorAll("[data-jp]").forEach((c) => ((c as HTMLElement).style.color = "#1a3a7a"));
          }}
        >
          <div data-phase style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "#1a3a7a",
            marginBottom: 6,
          }}>
            PHASE {n.ix}
          </div>
          <h4 data-title style={{
            fontSize: 15,
            lineHeight: 1.3,
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
            fontWeight: 700,
            color: "#0b0b0e",
          }}>
            {n.name}
          </h4>
          <p data-jp style={{ margin: 0, fontSize: 12, color: "#1a3a7a", lineHeight: 1.4 }}>
            {n.jp}
          </p>
        </a>
      ))}
    </div>
  );
}
