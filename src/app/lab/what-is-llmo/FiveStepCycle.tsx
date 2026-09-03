type Step = { number: string; title: string; description: string; detail: string };

const STEPS: Step[] = [
  {
    number: "1",
    title: "測る",
    description: "まず、AI検索上の現在地を把握",
    detail: "ブランド名やWebサイトを登録すると、AI検索上での言及や引用の計測を開始できます。プロンプトは自動で生成されるため、専門的な設定をしなくても始められます。",
  },
  {
    number: "2",
    title: "知る",
    description: "自社と競合の違いを把握",
    detail: "AIごとの言及率、回答内容、引用URLを確認し、自社がどのように扱われているかを把握します。競合と比較することで、強みと弱みが見えてきます。",
  },
  {
    number: "3",
    title: "設計する",
    description: "次に取り組むべきテーマを明確に",
    detail: "競合は表示されているのに、自社は表示されていない質問を確認します。優先して改善すべきテーマやコンテンツを絞り込めます。",
  },
  {
    number: "4",
    title: "確かめる",
    description: "施策後の変化を毎日追う",
    detail: "改善後に、言及率や引用状況がどう変わったかを確認します。施策前後を比較しながら、次の改善につなげます。",
  },
  {
    number: "5",
    title: "改善する",
    description: "サイトやコンテンツを見直す",
    detail: "引用されている競合ページや情報源を参考に、自社サイトやコンテンツを改善します。何を直すべきか迷う場合は、コンテンツ改善のスポットサポートも利用できます。",
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-4 py-3.5" style={{ border: "1px solid #4472C4", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#0B2A6B", fontSize: "12px" }}>
          {step.number}
        </div>
        <h3 className="font-bold text-[#0B0B0E]" style={{ fontSize: "17px", letterSpacing: "-0.02em" }}>{step.title}</h3>
      </div>
      <p className="font-bold text-[#0B0B0E] mb-1.5" style={{ fontSize: "13px" }}>{step.description}</p>
      <p className="text-[#4e4e51] leading-[1.5]" style={{ fontSize: "12px" }}>{step.detail}</p>
    </div>
  );
}

function ArrowH({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: "40px" }}>
      <svg width="32" height="12" viewBox="0 0 60 16" style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
        <line x1="0" y1="8" x2="48" y2="8" stroke="#4472C4" strokeWidth="2.5" />
        <polygon points="48,2 60,8 48,14" fill="#4472C4" />
      </svg>
    </div>
  );
}

function ArrowV({ direction = "down" }: { direction?: "down" | "up" }) {
  return (
    <svg width="12" height="52" viewBox="0 0 16 76" style={{ transform: direction === "up" ? "scaleY(-1)" : undefined }}>
      <line x1="8" y1="0" x2="8" y2="64" stroke="#4472C4" strokeWidth="2.5" />
      <polygon points="2,64 14,64 8,76" fill="#4472C4" />
    </svg>
  );
}

export function FiveStepCycle() {
  return (
    <div className="my-8 rounded-2xl px-6 py-8" style={{ background: "#F2F0EA" }}>
      {/* Desktop cycle layout */}
      <div className="hidden sm:block w-full">
        <div className="flex items-stretch">
          <StepCard step={STEPS[0]} />
          <ArrowH />
          <StepCard step={STEPS[1]} />
          <ArrowH />
          <StepCard step={STEPS[2]} />
        </div>

        <div className="flex items-center" style={{ height: "60px" }}>
          <div style={{ flex: "1 1 0" }} className="flex justify-center">
            <ArrowV direction="up" />
          </div>
          <div style={{ flex: "1 1 0" }} />
          <div style={{ flex: "1 1 0" }} className="flex justify-center">
            <ArrowV direction="down" />
          </div>
        </div>

        <div className="flex items-stretch" style={{ paddingLeft: "8%", paddingRight: "8%" }}>
          <StepCard step={STEPS[4]} />
          <ArrowH direction="left" />
          <StepCard step={STEPS[3]} />
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="flex flex-col gap-4 sm:hidden">
        {STEPS.map((step) => (
          <div key={step.number} className="bg-white rounded-2xl border border-black/[0.08] p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#0B2A6B", fontSize: "12px" }}>
                {step.number}
              </div>
              <h3 className="font-bold text-[#0B0B0E]" style={{ fontSize: "17px" }}>{step.title}</h3>
            </div>
            <p className="font-bold text-[#0B0B0E] mb-1.5" style={{ fontSize: "13px" }}>{step.description}</p>
            <p className="text-[#4e4e51] leading-[1.5]" style={{ fontSize: "12px" }}>{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
