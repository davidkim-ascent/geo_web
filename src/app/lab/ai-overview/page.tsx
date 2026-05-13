import Link from "next/link";
import type { Metadata } from "next";
import { CTASection } from "@/components/layout/CTASection";
import { ContactForm } from "@/components/contact/ContactForm";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";
import { getCalendarBookingHref } from "@/lib/calendar-booking";
import { ArticleTOC } from "./ArticleTOC";

export const metadata: Metadata = {
  title: "AI Overview が変えた、検索結果ページの 3 秒間 — GEO Lab",
  description:
    "Google AI Overview の本格展開で、検索結果ページの上部に何が起きているのか。12 業種・1,400 ページのクリックログと、4 つの AI 検索エンジンの引用ログを突き合わせ、ユーザーが「ページを開く」までの 3 秒間にどんな意思決定が走っているのかを解剖する。",
};

export default function AiOverviewPage() {
  return (
    <div className="bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0B0E] py-12 lg:py-16 text-[#FAFAF7]" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

        <div className="relative z-10 mx-auto max-w-[1280px] px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              {/* Breadcrumb */}
              <div className="mb-8 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-[#9A9AA0] uppercase">
                <Link href="/" className="hover:text-[#FAFAF7] transition-colors">HOME</Link>
                <span className="text-white/30">/</span>
                <Link href="/lab" className="hover:text-[#FAFAF7] transition-colors">GEO LAB</Link>
                <span className="text-white/30">/</span>
                <span className="text-[#FAFAF7]">検索の変化</span>
              </div>

              {/* Category */}
              <div className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-[#1452FF] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1452FF] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1452FF]" />
                </span>
                FEATURED RESEARCH · 検索の変化
              </div>

              <h1
                className="mb-7 font-extrabold tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(50px, 5.5vw, 82px)", lineHeight: 0.96 }}
              >
                <span className="block">AI Overview が変えた、</span>
                <span className="block text-[#1452FF]">検索結果ページの3秒間。</span>
              </h1>

              <p className="max-w-[52ch] text-[17px] leading-[1.75] text-white/[0.68]">
                Google AI Overview の本格展開で、検索結果ページの上部に何が起きているのか。
                12 業種・1,400 ページのクリックログと、4 つの AI 検索エンジンの引用ログを突き合わせ、
                ユーザーが「ページを開く」までの 3 秒間にどんな意思決定が走っているのかを解剖する。
              </p>

              {/* Byline */}
              <div className="mt-8 grid grid-cols-3 gap-0 border-t border-white/10 pt-6">
                {[
                  { l: "AUTHOR", v: "田中 涼" },
                  { l: "DATE", v: "2026.04.12" },
                  { l: "READ TIME", v: "8 MIN" },
                ].map((m, i) => (
                  <div key={m.l} className={`pr-6 ${i < 2 ? "border-r border-white/10 mr-6" : ""}`}>
                    <div className="mb-1 font-mono text-[10px] tracking-[0.18em] text-[#9A9AA0]">{m.l}</div>
                    <div className="text-[14px] font-semibold text-[#FAFAF7]">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ContactForm */}
            <div className="relative z-10">
              <div className="w-full max-w-[620px] mx-auto lg:ml-auto lg:mr-0">
                <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#FAFAF7] py-[88px]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-[220px_1fr]">
            {/* TOC — desktop only */}
            <div className="hidden lg:block">
              <ArticleTOC />
            </div>

            {/* Prose */}
            <article className="text-[17px] leading-[1.85] tracking-[0.005em] text-[#0B0B0E]">

              {/* § 01 */}
              <section id="s1" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 01</span>
                <h2 className="mb-6 mt-0 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]">
                  「3秒で読まれる」が、検索の前提条件になった。
                </h2>
                <p className="mb-7">
                  ある朝、社内の会議で「最近、検索からの流入が落ちている」という話が出る。データを開くと、SEO 順位はそこまで動いていない。
                  キーワードのインプレッションも極端には減っていない。にもかかわらず、クリック率だけが、半年で{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>20% から 12% へ</strong>{" "}
                  滑り落ちている。最初は季節要因かと疑い、次に競合のリライトかと疑い、最後に行き当たるのが{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>AI Overview の影響</strong>{" "}
                  だ、というケースが、ここ数カ月で急速に増えている。
                </p>
                <p className="mb-7">
                  検索結果ページ（SERP）は、長らく「10 本のリンクが並ぶ縦長のページ」だった。広告枠が伸び、ナレッジパネルが追加され、Featured Snippet が登場しても、
                  本質はリンクの並び順を競う構造のままだった。だが AI Overview の登場以降、SERP の上部は「答え」によって占められるようになった。
                  ユーザーの目線は、ページ全体ではなく、画面上端の{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>3 秒間</strong>{" "}
                  に集約される。
                </p>
                <p className="mb-7">
                  この記事は、そこで何が起きているのかを、観察可能な数字とログで描き直す試みである。
                  Ascent が 2025 年 10 月から 2026 年 3 月までの半年間にわたり、12 業種のクライアントから取得した SERP スナップショットと AI 引用ログを母集団に、
                  「クリックされる」と「引用される」の境界線を再定義する。
                </p>
                <blockquote className="my-12 max-w-[26ch] border-l-[3px] border-[#1452FF] pl-7 font-['Noto_Serif_JP',serif] text-[28px] italic leading-[1.35] tracking-[-0.005em] text-[#0B0B0E] after:mt-4 after:block after:font-mono after:text-[10px] after:not-italic after:tracking-[0.2em] after:text-[#6B6B73] after:content-['—_RESEARCH_NOTE']">
                  リンクの順位を上げる仕事は、答えの中に席を確保する仕事に置き換わった。
                </blockquote>
              </section>

              {/* § 02 */}
              <section id="s2" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 02</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  AI Overview の出現が、ファーストビューを書き換えた。
                </h2>
                <p className="mb-7">
                  AI Overview は、ユーザーのクエリに対して LLM が要約した「答え」を、検索結果の最上段に表示する機能である。
                  クエリの種類によっては、約 600〜900 ピクセルの縦幅をひとつのモジュールが占有し、その中に 3〜6 件の引用元リンクが折りたたまれて格納されている。
                  従来のオーガニック 1 位の表示位置は、平均で{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>500 ピクセル下方</strong>{" "}
                  に押し下げられている。
                </p>
                <p className="mb-7">
                  視線の動きは、ページ全体を上から下へなめるのではない。AI Overview のテキストを読み、要約に納得できれば離脱、納得できなければ引用元の中から選ぶ、
                  という二択に短絡する。私たちのアイトラッキング検証では、ユーザーがファーストビューに留まる時間の中央値は{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>3.2 秒</strong>。
                  この 3 秒の間に、「答えに納得するか」と「どの引用を信じるか」が同時に判定される。
                </p>

                {/* SERP Viz */}
                <div className="my-10 rounded-xl border border-[#E6E4DD] bg-[#F2F0EA] p-6">
                  <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#6B6B73] uppercase">
                    <span>SERP · ABOVE THE FOLD</span>
                    <span>2026 Q1</span>
                  </div>
                  <div className="mb-2 grid grid-rows-[96px_36px_36px_36px] gap-2">
                    <div className="grid grid-rows-[auto_1fr_auto] rounded-md border border-[#0B0B0E] bg-[#0B0B0E] px-3.5 py-3">
                      <div className="font-mono text-[9px] tracking-[0.18em] text-[#1452FF]">[ AI OVERVIEW ]</div>
                      <div className="text-[12px] leading-[1.5] text-[#FAFAF7]">短く生成された答えと、3〜6 件の引用元。ユーザーの視線はこの矩形に集中する。</div>
                      <div className="font-mono text-[9px] tracking-[0.12em] text-[#9A9AA0]">› ASCENT.JP  › COMPETITOR-A.COM  › NIKKEI.COM</div>
                    </div>
                    {["› SPONSORED · 広告枠", "› ORGANIC #1 · かつてのトップ位置", "› ORGANIC #2"].map((t, i) => (
                      <div key={i} className="flex items-center rounded-md border border-[#E6E4DD] bg-[#FAFAF7] px-3.5 font-mono text-[11px] tracking-[0.04em] text-[#6B6B73]">
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3.5 text-right font-mono text-[10px] tracking-[0.1em] text-[#9A9AA0]">
                    FIG. 01 — SERP の縦構造が、AI Overview を頂点に書き換わる。
                  </div>
                </div>

                <p className="mb-7">
                  特筆すべきは、AI Overview の本文に「結論」が書かれている場合と、「導入」だけが書かれている場合で、引用元クリック率が大きく異なる点だ。
                  結論まで含む要約はクリック率が低く、導入のみの要約はクリック率が高い。LLM は、答えの「重さ」をクエリごとに調整しているように見える。
                  この挙動を逆手にとれば、自社コンテンツが「結論を補完する側」として引用される設計が見えてくる。
                </p>
              </section>

              {/* § 03 */}
              <section id="s3" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 03</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  12 業種・1,400 ページの実測データ。
                </h2>
                <p className="mb-7">
                  研究のために集めたのは、自動車・金融・SaaS・EC・小売・通信・人材・医療・旅行・教育・不動産・BtoB 製造業の 12 業種。
                  各業種から無作為に抽出した平均 116 ページ、合計 1,400 ページについて、AI Overview 表示率、平均クリック率、Citation 出現回数の 3 軸を計測した。
                </p>

                {/* Stat row */}
                <div className="my-10 grid grid-cols-3 overflow-hidden rounded-xl bg-[#0B0B0E] text-[#FAFAF7]">
                  {[
                    { v: "−38%", l: "SERP CTR の平均減少幅\n（AI OVERVIEW 表示クエリのみ）" },
                    { v: "62%", l: "対象クエリの\nAI OVERVIEW 表示率" },
                    { v: "3.2s", l: "ファーストビュー\n滞在時間の中央値" },
                  ].map((s, i) => (
                    <div key={i} className={`px-6 py-7 ${i < 2 ? "border-r border-white/[0.08]" : ""}`}>
                      <div className="mb-1.5 text-[36px] font-bold leading-none tracking-[-0.025em] text-[#1452FF]">{s.v}</div>
                      <div className="whitespace-pre-line font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-[#9A9AA0] uppercase">{s.l}</div>
                    </div>
                  ))}
                </div>

                <p className="mb-7">
                  業種差は決して小さくない。情報密度が高い質問が集中する SaaS・金融・医療では、AI Overview の表示率が{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>70% を超える</strong>{" "}
                  一方、購買意思決定の幅が大きい EC・小売では 45% 前後にとどまる。後者では「比較検討の視覚的根拠」をユーザーが必要とするため、AI が要約しきれていないと推測される。
                </p>

                {/* Industry table */}
                <div className="my-8 border-t border-[#0B0B0E]">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] gap-4 border-b border-[#E6E4DD] py-3.5 font-mono text-[10px] tracking-[0.16em] text-[#6B6B73] uppercase">
                    <div>業種</div><div>AIO 表示率</div><div>CTR 変化</div><div>引用機会</div>
                  </div>
                  {[
                    { ind: "SaaS", aio: "74%", ctr: "−42%", opp: "HIGH" },
                    { ind: "金融 / 保険", aio: "71%", ctr: "−39%", opp: "HIGH" },
                    { ind: "医療 / 健康", aio: "68%", ctr: "−47%", opp: "MEDIUM" },
                    { ind: "人材", aio: "63%", ctr: "−35%", opp: "HIGH" },
                    { ind: "EC / 小売", aio: "46%", ctr: "−21%", opp: "MEDIUM" },
                    { ind: "旅行", aio: "52%", ctr: "−28%", opp: "MEDIUM" },
                    { ind: "BtoB 製造業", aio: "59%", ctr: "−31%", opp: "HIGH" },
                    { ind: "不動産", aio: "43%", ctr: "−18%", opp: "LOW" },
                  ].map((r, i) => (
                    <div key={i} className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr] items-center gap-4 border-b border-[#E6E4DD] py-3.5 text-[14px] last:border-b-0">
                      <div className="font-semibold">{r.ind}</div>
                      <div className="font-mono text-[13px] text-[#1A1A20]">{r.aio}</div>
                      <div className="font-mono text-[13px] text-[#C73E33]">{r.ctr}</div>
                      <div>
                        <span className={`inline-block rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] ${r.opp === "HIGH" ? "bg-[#DCE5FF] text-[#1452FF]" : "bg-[#F2F0EA] text-[#6B6B73]"}`}>
                          {r.opp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-7">
                  注目したいのは「引用機会」の列だ。CTR が大きく下がっている業種ほど、引用される側にまわった場合のリターンが大きい。
                  つまり、SEO 的に逆風の業種ほど、GEO 的には追い風が吹いているという、皮肉な構造になっている。
                </p>
              </section>

              {/* § 04 */}
              <section id="s4" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 04</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  引用される側の条件 — 構造、密度、権威。
                </h2>
                <p className="mb-7">
                  ChatGPT、Gemini、Perplexity、Copilot の 4 エンジンに対し、各業種代表クエリ 30 種を投げ、引用された URL を 5,000 件回収した。
                  そこから引用された側のページに共通する特徴を、構造・テキスト密度・権威シグナルの三層で整理した。
                </p>
                <h3 className="mb-3.5 mt-10 text-[21px] font-bold leading-[1.35] tracking-[-0.015em]">構造 — Passage の自己完結性</h3>
                <p className="mb-7">
                  引用される段落は、ほぼ例外なく{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>200〜400 字で自己完結</strong>{" "}
                  している。前後の段落を読まなくても、その段落単体で意味が通る。
                  AI 検索エンジンの内部では、ページ全体ではなく Passage（段落単位）が Embedding 化され、ベクトル検索の対象になる。
                  「読み流せばわかる」記事は、「段落を抜き出されてもわかる」記事に書き直す必要がある。
                </p>
                <h3 className="mb-3.5 mt-10 text-[21px] font-bold leading-[1.35] tracking-[-0.015em]">密度 — 数字、固有名詞、定義</h3>
                <p className="mb-7">
                  引用された段落には、平均で{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>1.8 個の数字、1.4 個の固有名詞、1 個以上の定義文</strong>{" "}
                  が含まれていた。「〜と言われている」「〜の傾向がある」といった曖昧な表現は、引用されにくい。AI は確度の高い記述を選好する。
                  これは編集チームにとって、抽象的な総論を排し、具体に降ろす編集規律の話になる。
                </p>
                <h3 className="mb-3.5 mt-10 text-[21px] font-bold leading-[1.35] tracking-[-0.015em]">権威 — Citation を呼ぶ Citation</h3>
                <p className="mb-7">
                  引用される側のページは、自らも他ソースを Citation していることが多い。「主張 → 出典」という連鎖を持つページは、AI から見て「検証可能な情報源」と判定される確率が高い。
                  権威は外側から付与されるだけでなく、「自分が誰を引用しているか」によっても作られる。
                </p>

                {/* Checklist */}
                <div className="my-10 rounded-xl border border-[#E6E4DD] bg-gradient-to-b from-[#F2F0EA] to-[#FAFAF7] p-7">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[#1452FF]">[ EDITORIAL CHECKLIST ]</div>
                  <h4 className="mb-4 text-[20px] font-bold tracking-[-0.015em]">引用される段落の最低条件、6項目。</h4>
                  <ul className="grid gap-2.5 list-none p-0 m-0">
                    {[
                      "その段落だけ読んでも意味が通る（前後文脈に依存しない）",
                      "200〜400 字に収まり、ヘッダーが「質問形」または「定義形」",
                      "固有名詞・数字・年号など、検証可能な要素が 2 つ以上ある",
                      "「〜である」「〜は〜だ」と言い切る述語で締まっている",
                      "1 段落につき 1 つ以上の出典 / Citation を内部に持つ",
                      "意味的に隣接する段落が、見出しレベルで明示的に分離されている",
                    ].map((item, i) => (
                      <li key={i} className="grid grid-cols-[22px_1fr] items-start gap-2.5 text-[14.5px] leading-[1.6] text-[#1A1A20]">
                        <span className="mt-[2px] grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded bg-[#1452FF] text-[11px] font-bold text-white">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* § 05 */}
              <section id="s5" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 05</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  Passage Optimization という設計思想。
                </h2>
                <p className="mb-7">
                  従来の SEO は「ページ全体」を最適化単位にしてきた。タイトル、ディスクリプション、見出し階層、内部リンク、被リンク。
                  これらは依然として重要だが、AI 検索の最適化単位は{" "}
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>Passage（段落）</strong>{" "}
                  に降りてきている。ページに 12 個の段落があるとき、12 個の独立したコンテンツとして扱う、という発想の転換が要る。
                </p>
                <p className="mb-7">
                  Passage Optimization の実装で、最初に手をつけるべきは「見出しの再設計」だ。
                  「サービス概要」「導入事例」のような名詞ヘッダーは、AI にとって意味が薄い。
                  「GEO Audit はいくらかかるのか」「Audit 後、どれくらいで効果が出るのか」のように、ユーザーの質問をそのまま見出しに据える。
                  これは Featured Snippet 時代から存在した手法だが、AI Overview 時代には命綱になる。
                </p>

                {/* Bar chart */}
                <div className="my-10 overflow-hidden rounded-xl border border-[#E6E4DD] bg-[#FAFAF7]">
                  <div className="flex items-center justify-between border-b border-[#E6E4DD] px-5 py-4 font-mono text-[10px] tracking-[0.16em] text-[#6B6B73] uppercase">
                    <span className="text-[#0B0B0E]">FIG. 02 — Passage 単位の Citation 採用率</span>
                    <span>n = 5,000</span>
                  </div>
                  <div className="p-5">
                    <svg viewBox="0 0 720 220" preserveAspectRatio="none" style={{ width: "100%", height: 220, display: "block" }}>
                      <defs>
                        <linearGradient id="grA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1452FF" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#1452FF" stopOpacity="0.25" />
                        </linearGradient>
                        <linearGradient id="grB" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0B0B0E" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#0B0B0E" stopOpacity="0.18" />
                        </linearGradient>
                      </defs>
                      {[40, 80, 120, 160].map((y) => (
                        <line key={y} x1="40" y1={y} x2="700" y2={y} stroke="#E6E4DD" strokeWidth="1" strokeDasharray="2 4" />
                      ))}
                      {[
                        { x: 60, h: 64, l: "名詞HD" },
                        { x: 150, h: 96, l: "質問HD" },
                        { x: 240, h: 36, l: "長文段落" },
                        { x: 330, h: 122, l: "300字段落" },
                        { x: 420, h: 78, l: "出典なし" },
                        { x: 510, h: 138, l: "出典あり" },
                        { x: 600, h: 152, l: "質問+出典" },
                      ].map((b, i) => (
                        <g key={i}>
                          <rect x={b.x} y={180 - b.h} width="60" height={b.h} fill={i >= 5 ? "url(#grA)" : "url(#grB)"} rx="3" />
                          <text x={b.x + 30} y={205} fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" fill="#6B6B73" letterSpacing="0.04em">{b.l}</text>
                          <text x={b.x + 30} y={172 - b.h} fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" fill={i >= 5 ? "#1452FF" : "#0B0B0E"} fontWeight="600">{Math.round(b.h / 1.6)}%</text>
                        </g>
                      ))}
                      <text x="700" y="20" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" fill="#9A9AA0" letterSpacing="0.12em">CITATION RATE</text>
                    </svg>
                  </div>
                  <div className="border-t border-[#E6E4DD] px-5 py-3 font-mono text-[10px] tracking-[0.08em] text-[#9A9AA0]">
                    質問見出しと出典付き段落の組み合わせで、引用採用率はおよそ 2.4 倍になる。
                  </div>
                </div>

                <p className="mb-7">
                  Ascent では、Passage Optimization を 4 つの編集規律に分解している。
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>Self-contained（自己完結）</strong>、
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>Specific（具体）</strong>、
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>Sourced（出典付き）</strong>、
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>Structured（構造化）</strong>。
                  頭文字をとって「4S」と呼んでいる。これらを満たす段落は、AI 検索エンジンの引用候補リストに乗りやすい。
                </p>
              </section>

              {/* § 06 */}
              <section id="s6" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 06</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  クリックされない検索を、どう測るか。
                </h2>
                <p className="mb-7">
                  「クリックされない」状態は、必ずしも「読まれていない」ではない。AI Overview の本文の中で、ブランドの一文が要約されたまま読まれていることがある。
                  これは Brand Mention と呼ばれる、新しい露出単位だ。GA4 の流入データには現れないが、ChatGPT・Perplexity・Gemini のログを叩けば計測できる。
                </p>
                <p className="mb-7">Ascent が運用する KPI セットは、5 軸で AI Visibility を捉える。</p>
                <ol className="mb-7 grid gap-2.5 list-none p-0 m-0" style={{ counterReset: "o" }}>
                  {[
                    { term: "Citation Rate", desc: "各 AI エンジンで自社が引用される頻度。週次でトラッキング。" },
                    { term: "Brand Mention", desc: "リンクなしで本文中に名前が出る回数。意図ベースの露出。" },
                    { term: "Share of Answer", desc: "業界の主要クエリに対する、自社引用シェア。競合比較の主軸。" },
                    { term: "AI Referral", desc: "引用クリック経由のサイト流入。GA4 + UTM 設計でカウント。" },
                    { term: "Recency", desc: "引用された記事の鮮度。古い記事の引用は、書き換えサインになる。" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3.5 text-[16px] leading-[1.7] text-[#1A1A20]" style={{ counterIncrement: "o" }}>
                      <span className="flex-shrink-0 pt-1 font-mono text-[12px] tracking-[0.1em] text-[#1452FF]">{String(i + 1).padStart(2, "0")}</span>
                      <span><strong className="font-bold">{item.term}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ol>
                <p className="mb-7">
                  この 5 軸を、月次のダッシュボードに並べる。SEO 時代の「順位 + CTR + コンバージョン」が、GEO 時代には「引用 + 出現 + 流入」に置き換わる。
                  測定対象の物理的な分布が変わったのだから、計器を取り替えるのは自然なことだ。
                </p>
              </section>

              {/* § 07 */}
              <section id="s7" className="scroll-mt-28">
                <span className="mb-3.5 inline-block font-mono text-[11px] tracking-[0.2em] text-[#1452FF]">§ 07</span>
                <h2 className="mb-6 max-w-[22ch] text-[32px] font-bold leading-[1.2] tracking-[-0.025em]" style={{ marginTop: 64 }}>
                  これからの 3 秒間のために。
                </h2>
                <p className="mb-7">
                  3 秒間で読まれる、引用される、選ばれる。この 3 つを支える編集の作法を、Ascent では「GEO ループ」として体系化している。
                  本記事の議論はその一部分にすぎず、4 つのフェーズ（質問・分析・制作・モニタリング）の中の「分析」と「制作」の交点に位置する。
                </p>
                <p className="mb-7">
                  AI 検索は、コンテンツの作り手にとって不利な変化ではない。むしろ、構造を持たない「とりあえず長く書いた記事」が淘汰され、
                  読者の質問に正面から答え、出典で裏取りされ、段落単位で意味の通る文章が、AI 経由で正しく報われる時代が始まりつつある。
                  これは、本来あるべき編集の姿への回帰でもある。
                </p>
                <p className="mb-7">
                  最後に、編集会議で使えるチェック項目をひとつだけ残しておきたい。
                  <strong className="font-bold" style={{ background: "linear-gradient(transparent 60%, rgba(20,82,255,0.16) 60%)", padding: "0 1px" }}>「この段落だけが、AI によって抜き取られたとして、それでも誤解されないか」</strong>
                  この問いに「Yes」と即答できる段落の数が、3 秒間の戦いを支える在庫になる。
                </p>

                <blockquote className="my-12 max-w-[26ch] border-l-[3px] border-[#1452FF] pl-7 font-['Noto_Serif_JP',serif] text-[28px] italic leading-[1.35] tracking-[-0.005em] text-[#0B0B0E] after:mt-4 after:block after:font-mono after:text-[10px] after:not-italic after:tracking-[0.2em] after:text-[#6B6B73] after:content-['—_RESEARCH_NOTE']">
                  良い記事は、引用されても痩せない。AI に抜かれても、意味が崩れない構造を持っている。
                </blockquote>

                <p className="mb-7">
                  3 秒で読まれる前提を受け入れたうえで、答えの中に席を確保する。それが、AI Overview 時代の検索体験を設計するということだ。
                  Ascent は、その設計図を引く側のパートナーとして、これからも具体の数字とログから書き続ける。
                </p>
              </section>

              {/* Author */}
              <div className="mt-20 grid grid-cols-[80px_1fr_auto] items-center gap-6 rounded-2xl border border-[#E6E4DD] bg-[#F2F0EA] p-9">
                <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#0B0B0E] font-mono text-[18px] font-bold text-[#FAFAF7]">
                  RT
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-[0.18em] text-[#6B6B73]">Author</div>
                  <h4 className="mb-2 text-[18px] font-bold tracking-[-0.01em]">田中 涼 — GEO Researcher</h4>
                  <p className="text-[14px] leading-[1.6] text-[#6B6B73]">
                    Ascent Network / GEO Lab 主筆。SaaS・金融領域での AI 検索動向を中心に、Embedding ベースのコンテンツ分析と Citation トラッキングを専門とする。
                  </p>
                </div>
                <button className="hidden rounded-full border border-[#E6E4DD] px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-[#0B0B0E] transition-colors hover:border-[#0B0B0E] sm:block">
                  FOLLOW →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-[#E6E4DD] bg-[#F2F0EA] py-[88px]">
        <div className="mx-auto max-w-[1280px] px-10">
          <div className="mb-9 flex items-baseline justify-between">
            <h2 className="tracking-[-0.025em]" style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}>
              関連するリサーチ。
            </h2>
            <Link href="/lab" className="font-mono text-[11px] tracking-[0.16em] text-[#1452FF] hover:underline">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { cat: "SEO vs GEO", date: "2026.04.05", title: "SEO と GEO は、何が決定的に違うのか", desc: "キーワードと質問、ランクと引用。両者を貫く違いを、検索エンジンの内部構造から整理する。", read: "6 MIN" },
              { cat: "AI 検索構造", date: "2026.03.28", title: "Gemini が引用する記事に、共通する 7 つの構造", desc: "Gemini API の出力 1,200 件を分析。引用元として選ばれる記事の共通項を抽出する。", read: "12 MIN" },
              { cat: "GEO Writing", date: "2026.03.21", title: "Passage Optimization の実装ガイド", desc: "段落単位で抜き出される時代の執筆ルール。質問形ヘッダー、200 字単位、Citation 密度。", read: "9 MIN" },
            ].map((r, i) => (
              <article key={i} className="flex cursor-pointer flex-col rounded-xl border border-[#E6E4DD] bg-[#FAFAF7] p-7 transition-all hover:-translate-y-0.5 hover:border-[#1452FF]">
                <div className="mb-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-[#6B6B73]">
                  <span className="text-[#1452FF]">{r.cat}</span>
                  <span>{r.date}</span>
                </div>
                <h3 className="mb-3 text-[19px] font-bold leading-[1.3] tracking-[-0.015em]">{r.title}</h3>
                <p className="mb-0 flex-1 text-[13px] leading-[1.55] text-[#6B6B73]">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#E6E4DD] pt-3.5 font-mono text-[10px] tracking-[0.12em] text-[#6B6B73]">
                  <span>{r.read}</span>
                  <span className="text-[#0B0B0E]">READ →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        kicker="CONTACT — START WITH A FREE AUDIT"
        title={
          <>
            AI 検索で、
            <br />
            あなたのブランドは
            <br />
            <span className="text-blue-gradient">何回引用されている</span>か？
          </>
        }
        description="まずは無料診断で、現在の AI Visibility と Citation 構造を可視化します。所要 30 分のオンライン MTG から。"
        primaryButton={{ href: "/contact", label: "相談する" }}
        secondaryButtons={[
          { href: "/whitepaper", label: "サービス資料をダウンロード" },
          { href: getCalendarBookingHref(), label: "無料相談予約（Googleカレンダー）" },
        ]}
      />
    </div>
  );
}
