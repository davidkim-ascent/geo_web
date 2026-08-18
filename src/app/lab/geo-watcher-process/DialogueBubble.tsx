type DialogueBubbleProps = {
  speaker: "A" | "S";
  children: React.ReactNode;
};

const SPEAKER_STYLE = {
  A: { bg: "#FDECEC", ring: "#F3B4B4", text: "#C0392B", label: "質問者" },
  S: { bg: "#E8F0FE", ring: "#B4CDF8", text: "#1452FF", label: "Ascent担当" },
} as const;

export function DialogueBubble({ speaker, children }: DialogueBubbleProps) {
  const style = SPEAKER_STYLE[speaker];
  return (
    <div className="article-dialogue">
      <div className="article-dialogue__avatar" style={{ background: style.bg, border: `2px solid ${style.ring}` }}>
        <span style={{ color: style.text }}>{speaker}</span>
      </div>
      <div className="article-dialogue__bubble">
        <span className="article-dialogue__label" style={{ color: style.text }}>{style.label}</span>
        <p className="article-dialogue__text">{children}</p>
      </div>
    </div>
  );
}
