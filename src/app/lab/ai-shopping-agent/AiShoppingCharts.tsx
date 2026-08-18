"use client";

/* ─────────────────────────────────────────────
   AIショッピングエージェント — Infographic Components
   Pure CSS/SVG, no external chart library
───────────────────────────────────────────── */

/* ── 1. 自動化6段階ステッパー ── */
export function AutomationLevelsChart() {
  const levels = [
    {
      lv: "Lv.0",
      name: "Programmed Convenience",
      nameJa: "プログラム自動購買",
      desc: "定期配送・サブスク・リピート注文のようにルール通りに購買。コーヒー・洗剤・おむつなど消費サイクルが予測可能なものが対象。",
      dotColor: "#9A9AA0",
      labelColor: "#6B6B73",
    },
    {
      lv: "Lv.1",
      name: "Assist",
      nameJa: "情報収集・比較の補助",
      desc: "AIが情報を収集・要約するが購買は実行しない。ヘッドフォン比較など検索と比較はAIが担い、カートへの追加・決済は人間が行う。",
      dotColor: "#6B8FFF",
      labelColor: "#3B6FFF",
    },
    {
      lv: "Lv.2",
      name: "Assemble",
      nameJa: "購入可能なカートの構成",
      desc: "在庫・配送・プロモーション・代替品を考慮した上で、承認するだけの状態のカートを組み立てて提案する。",
      dotColor: "#4B6FEF",
      labelColor: "#1452FF",
    },
    {
      lv: "Lv.3",
      name: "Authorize",
      nameJa: "条件付きの購買実行",
      desc: "予算・時間・販売者などの条件をあらかじめ設定し、AIがその範囲内で購買を実行。限定的な決済権限・購買記録・キャンセル仕組みが不可欠。",
      dotColor: "#2B52DF",
      labelColor: "#1040E0",
    },
    {
      lv: "Lv.4",
      name: "Autonomize",
      nameJa: "継続的な目標管理",
      desc: "日々の在庫状況を監視しながら必要なタイミングで自動的に注文し続ける。消費者は例外的な状況が発生したときのみ関与。",
      dotColor: "#1A42CC",
      labelColor: "#0D30C0",
    },
    {
      lv: "Lv.5",
      name: "Networked Autonomy",
      nameJa: "マルチエージェント自律交渉",
      desc: "消費者・販売者・物流・決済・ロイヤリティなど複数のエージェントが相互に交渉・調整しながら購買を完結させる。",
      dotColor: "#0B30B0",
      labelColor: "#061EA0",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">McKinsey · Agentic Commerce Framework</div>
      <h3 className="mb-8 text-[18px] font-bold tracking-[-0.02em]">AIショッピング自動化の6段階</h3>

      <div className="relative">
        <div className="absolute left-[19px] top-10 bottom-4 w-[2px]"
          style={{ background: "linear-gradient(to bottom, #E6E4DD 0%, #1452FF 40%, #061EA0 100%)" }} />

        <div className="space-y-0">
          {levels.map((l, i) => (
            <div key={l.lv} className="relative flex gap-5 pb-7 last:pb-0">
              {/* Dot + Lv badge */}
              <div className="relative z-10 flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                  style={{ backgroundColor: l.dotColor }}
                >
                  <span className="font-mono text-[9px] font-bold text-white leading-none">{l.lv}</span>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 pt-2">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                  <span className="font-bold text-[15px] text-[#0B0B0E]">{l.name}</span>
                  <span className="font-mono text-[11px]" style={{ color: l.labelColor }}>{l.nameJa}</span>
                </div>
                <p className="text-[13px] leading-[1.65] text-[#6B6B73]">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[11px] text-[#9A9AA0]">※ McKinsey「Agentic commerce: From browsing to buying, AI is reshaping retail」より構成</p>
    </div>
  );
}

/* ── 2. 3取引モデル図 ── */
export function TransactionModelsChart() {
  const models = [
    {
      tag: "Model A",
      name: "Agent-to-Site",
      desc: "個人エージェントが販売者のウェブサイトに直接アクセスして商品を探し、購買を補助する",
      nodes: ["Consumer\nAgent", "Merchant\nSite"],
      arrow: "→",
      color: "#1452FF",
    },
    {
      tag: "Model B",
      name: "Agent-to-Agent",
      desc: "消費者エージェントがリテーラーのエージェントと直接やり取りし、価格・在庫・配送条件を交渉する",
      nodes: ["Consumer\nAgent", "Merchant\nAgent"],
      arrow: "⇄",
      color: "#0D30C0",
    },
    {
      tag: "Model C",
      name: "Brokered\nAgent-to-Site",
      desc: "中介エージェントやプラットフォームが消費者エージェントと販売者システムの間で取引を調整する",
      nodes: ["Consumer\nAgent", "Broker", "Merchant\nSite"],
      arrow: "→",
      color: "#061EA0",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Agentic Commerce · Transaction Models</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">3つの取引モデル</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {models.map((m) => (
          <div key={m.name} className="rounded-xl border border-[#E6E4DD] p-5">
            <div className="mb-3 font-mono text-[10px] tracking-[0.18em]" style={{ color: m.color }}>{m.tag}</div>
            <div className="mb-3 font-bold text-[14px] leading-[1.3] whitespace-pre-line text-[#0B0B0E]">{m.name}</div>
            {/* Flow nodes */}
            <div className="mb-4 flex items-center justify-center gap-1.5 flex-wrap">
              {m.nodes.map((node, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div
                    className="rounded-lg px-2.5 py-1.5 text-center"
                    style={{ background: `${m.color}12`, border: `1px solid ${m.color}30` }}
                  >
                    <span className="font-mono text-[9px] font-bold leading-tight whitespace-pre-line" style={{ color: m.color }}>{node}</span>
                  </div>
                  {idx < m.nodes.length - 1 && (
                    <span className="font-mono text-[14px] font-bold" style={{ color: m.color }}>{m.arrow}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[12px] leading-[1.65] text-[#6B6B73]">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3. ACP購買フロー（ChatGPT Instant Checkout）── */
export function AgentFlowChart() {
  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">OpenAI + Stripe · ACP Flow</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">ACP購買フロー（Instant Checkout）</h3>

      {/* Flow diagram */}
      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          {/* Step labels */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {["① 商品発見", "② 注文伝達", "③ 履行・返金"].map((s, i) => (
              <div key={i} className="text-center font-mono text-[10px] tracking-[0.12em] text-[#9A9AA0]">{s}</div>
            ))}
          </div>
          {/* Main nodes */}
          <div className="grid grid-cols-3 gap-3 items-center">
            {/* Consumer / ChatGPT */}
            <div className="rounded-xl bg-[#0B0B0E] p-4 text-center">
              <div className="mb-1 font-mono text-[9px] tracking-[0.18em] text-[#9A9AA0] uppercase">Consumer</div>
              <div className="font-bold text-[14px] text-white">ChatGPT</div>
              <div className="mt-1 font-mono text-[9px] text-[#1452FF]">AI Agent Interface</div>
            </div>

            {/* Arrow + token note */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex w-full items-center">
                <div className="flex-1 h-[1.5px] bg-[#1452FF]" />
                <div className="mx-1 font-bold text-[#1452FF]">→</div>
                <div className="flex-1 h-[1.5px] bg-[#1452FF]" />
              </div>
              <div className="rounded-full border border-[#1452FF]/30 bg-[#EEF2FF] px-2.5 py-1 text-center">
                <div className="font-mono text-[9px] text-[#1452FF]">注文情報 + 決済トークン</div>
              </div>
              <div className="flex w-full items-center">
                <div className="flex-1 h-[1.5px] bg-[#E6E4DD]" />
                <div className="mx-1 font-bold text-[#9A9AA0]">←</div>
                <div className="flex-1 h-[1.5px] bg-[#E6E4DD]" />
              </div>
              <div className="rounded-full border border-[#E6E4DD] bg-[#F2F0EA] px-2.5 py-1 text-center">
                <div className="font-mono text-[9px] text-[#9A9AA0]">注文確認</div>
              </div>
            </div>

            {/* Merchant */}
            <div className="rounded-xl border border-[#E6E4DD] bg-[#FDFDFB] p-4 text-center">
              <div className="mb-1 font-mono text-[9px] tracking-[0.18em] text-[#9A9AA0] uppercase">Merchant of Record</div>
              <div className="font-bold text-[14px] text-[#0B0B0E]">販売者</div>
              <div className="mt-2 space-y-1">
                {["決済承認", "配送", "返品対応"].map((item) => (
                  <div key={item} className="rounded px-2 py-0.5 bg-[#E6E4DD] font-mono text-[9px] text-[#6B6B73]">{item}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-4 rounded-lg bg-[#EEF2FF] border border-[#1452FF]/20 p-3">
            <p className="text-center font-mono text-[11px] text-[#1452FF]">
              AIエージェントは消費者の決済情報を直接持たず、トークンのみを販売者に伝達 — 販売者は既存システムを変更せずに参加可能
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 4. プロトコル競争比較カード ── */
export function ProtocolRaceChart() {
  const protocols = [
    {
      badge: "OpenAI + Stripe",
      name: "ACP",
      full: "Agentic Commerce Protocol",
      color: "#10A37F",
      features: [
        "ChatGPT Instant Checkoutを実装",
        "販売者がMerchant of Recordとして責任保持",
        "決済トークンで安全な取引を実現",
        "既存バックエンドへの変更不要",
      ],
      scope: "意図受取り + チェックアウト",
    },
    {
      badge: "Google + Shopify",
      name: "UCP / AP2",
      full: "Universal Commerce Protocol",
      color: "#4285F4",
      features: [
        "/.well-known/ucpで機能を動的公開",
        "REST・JSON-RPC・MCP多方式対応",
        "AP2が決済の信頼を暗号的に保証",
        "エージェント・販売者・決済の三者標準化",
      ],
      scope: "商品発見〜決済信頼レイヤー全体",
    },
    {
      badge: "Shopify",
      name: "Catalog / Checkout MCP",
      full: "Model Context Protocol",
      color: "#96BF48",
      features: [
        "Catalog MCP：商品検索・価格・在庫取得",
        "Checkout MCP：カート→決済セッション管理",
        "create / update / complete / cancel対応",
        "UCPのcheckout capabilityを実装",
      ],
      scope: "販売者側実行レイヤー",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Protocol Competition · 2026</div>
      <h3 className="mb-6 text-[18px] font-bold tracking-[-0.02em]">ショッピングエージェントプロトコル比較</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {protocols.map((p) => (
          <div key={p.name} className="flex flex-col rounded-xl border border-[#E6E4DD] overflow-hidden">
            <div className="px-5 py-4" style={{ background: `${p.color}12`, borderBottom: `2px solid ${p.color}` }}>
              <div className="mb-1 font-mono text-[9px] tracking-[0.18em]" style={{ color: p.color }}>{p.badge}</div>
              <div className="font-bold text-[20px] text-[#0B0B0E]">{p.name}</div>
              <div className="text-[11px] text-[#6B6B73]">{p.full}</div>
            </div>
            <div className="flex-1 p-5">
              <div className="mb-3 font-mono text-[10px] tracking-[0.12em] text-[#9A9AA0] uppercase">カバー範囲</div>
              <div className="mb-4 rounded-lg px-3 py-2 font-bold text-[12px]" style={{ background: `${p.color}10`, color: p.color }}>
                {p.scope}
              </div>
              <div className="mb-2 font-mono text-[10px] tracking-[0.12em] text-[#9A9AA0] uppercase">主な特徴</div>
              <ul className="space-y-2">
                {p.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-[12px] leading-[1.55] text-[#3A3A42]">
                    <span className="mt-0.5 flex-shrink-0 text-[10px]" style={{ color: p.color }}>▸</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 5. カテゴリー別自動化速度マトリクス ── */
export function CategoryAutomationChart() {
  const categories = [
    {
      speed: "速い",
      speedEn: "FAST",
      level: 3,
      color: "#1452FF",
      bg: "#EEF2FF",
      border: "#1452FF30",
      items: ["食料品・日用品", "消耗品・洗剤", "おむつ・シャンプー"],
      reason: "繰り返し購入が多く、失敗コストが低い。消費者は「期日通りに届いて予算内に収まること」を優先。",
      aiRole: "実行者（Executor）",
      autoLevel: "Lv.3〜4",
    },
    {
      speed: "中程度",
      speedEn: "SEMI",
      level: 2,
      color: "#7B61FF",
      bg: "#F3F0FF",
      border: "#7B61FF30",
      items: ["旅行・宿泊", "電子機器・PC", "ホームオフィス"],
      reason: "比較要素が多く複雑な商品。AIがカートを組み立てるが最終判断は人間に提示し直す設計が必要。",
      aiRole: "アナリスト（Analyst）",
      autoLevel: "Lv.2〜3",
    },
    {
      speed: "遅い",
      speedEn: "SLOW",
      level: 1,
      color: "#9A9AA0",
      bg: "#F2F0EA",
      border: "#9A9AA040",
      items: ["ラグジュアリー品", "高額家電・自動車", "家具・不動産"],
      reason: "自分らしさや感情が絡む商品。選択を誤った時の後悔リスクが大きく、最終決済は人間が行う。",
      aiRole: "キュレーター（Curator）",
      autoLevel: "Lv.1〜2",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 sm:p-8">
      <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">McKinsey · Category Automation Speed</div>
      <h3 className="mb-2 text-[18px] font-bold tracking-[-0.02em]">カテゴリー別 自動化速度の違い</h3>
      <p className="mb-6 text-[13px] text-[#6B6B73]">AIによる購買自動化の速度は商品カテゴリーによって大きく異なる</p>

      {/* Speed bar */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[11px] text-[#1452FF] font-bold">FAST</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden">
          <div className="h-full w-full" style={{ background: "linear-gradient(to right, #1452FF, #7B61FF, #D4D4D8)" }} />
        </div>
        <span className="font-mono text-[11px] text-[#9A9AA0] font-bold">SLOW</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((c) => (
          <div key={c.speed} className="rounded-xl border overflow-hidden" style={{ borderColor: c.border }}>
            {/* Header */}
            <div className="px-4 py-3" style={{ background: c.bg }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: c.color }}>{c.speedEn}</span>
                <span className="font-bold text-[13px] text-[#0B0B0E]">{c.speed}</span>
              </div>
              {/* Level dots */}
              <div className="flex gap-1">
                {[1, 2, 3].map((dot) => (
                  <div key={dot} className="h-1.5 flex-1 rounded-full" style={{ background: dot <= c.level ? c.color : "#E6E4DD" }} />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                {c.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-[13px] font-medium text-[#0B0B0E]">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] leading-[1.6] text-[#6B6B73]">{c.reason}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E6E4DD]">
                <span className="font-mono text-[10px] text-[#9A9AA0]">AIの役割</span>
                <span className="font-bold text-[11px]" style={{ color: c.color }}>{c.aiRole}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#9A9AA0]">想定自動化Lv.</span>
                <span className="font-mono font-bold text-[11px] text-[#0B0B0E]">{c.autoLevel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 6. エコシステム14領域マップ ── */
export function EcosystemMapChart() {
  const core = [
    { num: "①", name: "AIエージェント\nプラットフォーム", ex: "ChatGPT, Gemini,\nPerplexity, Rufus", color: "#1452FF" },
    { num: "②", name: "決済・\n取引インフラ", ex: "Stripe, Visa,\nMastercard, AP2", color: "#1040E0" },
    { num: "③", name: "AIオーケストレーション\nワークフロー自動化", ex: "Shopify MCP,\nElastic Path", color: "#0D30C0" },
    { num: "④", name: "ECプラットフォーム", ex: "Shopify, BigCommerce,\nSalesforce Commerce", color: "#0B24A8" },
  ];

  const adapters = [
    { num: "⑤", name: "PIM / PXM /\nCatalog Intelligence", ex: "Akeneo, Salsify,\nEKOM AI" },
    { num: "⑥", name: "検索・商品発見", ex: "Algolia, Constructor,\nSyntheum AI" },
    { num: "⑦", name: "評価・レビュー\nプラットフォーム", ex: "Bazaarvoice, Yotpo,\nTrustpilot" },
    { num: "⑧", name: "不正防止・\nセキュリティ", ex: "Forter, Signifyd,\nHUMAN Security" },
    { num: "⑨", name: "供給網・\n在庫管理", ex: "Manhattan Associates,\nBlue Yonder, SAP" },
    { num: "⑩", name: "顧客エンゲージメント\nCRM", ex: "Salesforce, Braze,\nKlaviyo, Sierra" },
    { num: "⑪", name: "データ・\n分析事業者", ex: "Semrush, Profound,\nAthenaHQ, Peec AI" },
    { num: "⑫", name: "個人化・\n動的UX", ex: "Dynamic Yield,\nAdobe Target" },
    { num: "⑬", name: "オフライン\n店舗インフラ", ex: "NVIDIA Omniverse,\nRetailTwin AI" },
    { num: "⑭", name: "AEO / AI\n可視性分析", ex: "AI引用分析・ブランド\n露出・AEOツール群" },
  ];

  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white overflow-hidden">
      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
        <div className="mb-1 font-mono text-[10px] tracking-[0.2em] text-[#1452FF] uppercase">Agentic Commerce Ecosystem · 14 Sectors</div>
        <h3 className="text-[18px] font-bold tracking-[-0.02em]">エコシステム全体像</h3>
      </div>

      {/* Core Layer */}
      <div className="px-6 sm:px-8 pb-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E6E4DD]" />
          <span className="font-mono text-[10px] tracking-[0.18em] font-bold text-[#1452FF] uppercase">Core Layer</span>
          <div className="h-px flex-1 bg-[#E6E4DD]" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {core.map((item) => (
            <div
              key={item.num}
              className="rounded-xl p-4"
              style={{ background: `${item.color}10`, border: `1.5px solid ${item.color}30` }}
            >
              <div className="font-mono text-[11px] font-bold mb-2" style={{ color: item.color }}>{item.num}</div>
              <div className="font-bold text-[12px] leading-[1.35] text-[#0B0B0E] whitespace-pre-line mb-2">{item.name}</div>
              <div className="font-mono text-[10px] leading-[1.5] text-[#6B6B73] whitespace-pre-line">{item.ex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Adapters & Enablers */}
      <div className="border-t border-[#E6E4DD] bg-[#FDFDFB] px-6 sm:px-8 py-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E6E4DD]" />
          <span className="font-mono text-[10px] tracking-[0.18em] font-bold text-[#6B6B73] uppercase">Adapters &amp; Enablers</span>
          <div className="h-px flex-1 bg-[#E6E4DD]" />
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {adapters.map((item) => (
            <div key={item.num} className="rounded-lg border border-[#E6E4DD] bg-white p-3.5">
              <div className="font-mono text-[10px] font-bold text-[#9A9AA0] mb-1.5">{item.num}</div>
              <div className="font-bold text-[11px] leading-[1.35] text-[#0B0B0E] whitespace-pre-line mb-1.5">{item.name}</div>
              <div className="font-mono text-[9px] leading-[1.5] text-[#9A9AA0] whitespace-pre-line">{item.ex}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-[#9A9AA0]">
          フロンティアモデルはあくまでも出発点に過ぎず、実際にお金が動く市場を作るのはこれら周辺インフラ
        </p>
      </div>
    </div>
  );
}
