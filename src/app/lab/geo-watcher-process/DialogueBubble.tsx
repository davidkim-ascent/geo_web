import Image from "next/image";

type AEmotion = "thinking" | "curious" | "understanding" | "impressed";
type SEmotion = "explaining" | "proposing" | "guiding" | "closing";

type DialogueBubbleProps =
  | { speaker: "A"; emotion: AEmotion; children: React.ReactNode }
  | { speaker: "S"; emotion: SEmotion; children: React.ReactNode };

const SPEAKER_META = {
  A: { label: "質問者", side: "left" },
  S: { label: "島田", side: "right" },
} as const;

const AVATAR_SRC: Record<AEmotion | SEmotion, string> = {
  thinking: "/design-assets/avatars/avatar-a-thinking.png",
  curious: "/design-assets/avatars/avatar-a-curious.png",
  understanding: "/design-assets/avatars/avatar-a-understanding.png",
  impressed: "/design-assets/avatars/avatar-a-impressed.png",
  explaining: "/design-assets/avatars/avatar-s-explaining.png",
  proposing: "/design-assets/avatars/avatar-s-proposing.png",
  guiding: "/design-assets/avatars/avatar-s-guiding.png",
  closing: "/design-assets/avatars/avatar-s-closing.png",
};

export function DialogueBubble({ speaker, emotion, children }: DialogueBubbleProps) {
  const meta = SPEAKER_META[speaker];
  const isRight = meta.side === "right";
  const avatarSrc = AVATAR_SRC[emotion];

  return (
    <div className={`article-dialogue ${isRight ? "article-dialogue--right" : ""}`}>
      <div className="article-dialogue__avatar article-dialogue__avatar--photo">
        <Image src={avatarSrc} alt={meta.label} width={78} height={78} className="h-full w-full object-cover" />
      </div>
      <div className={`article-dialogue__bubble ${isRight ? "article-dialogue__bubble--right" : ""}`}>
        <span className="article-dialogue__label">{meta.label}</span>
        <p className="article-dialogue__text">{children}</p>
      </div>
    </div>
  );
}
