import Link from 'next/link'
import { DownloadForm } from '@/components/whitepaper/DownloadForm'
import { SplitSection } from '@/components/layout/SplitSection'

export const metadata = {
  title: 'AI 検索時代の、企業マーケティング白書 2026 — Ascent / GEO',
}

const CHAPTERS = [
  { n: '01', pg: 8, t: 'AI 検索の現在地 · 4 エンジン比較', d: 'Google AI Overview / ChatGPT Search / Perplexity / Copilot · それぞれの引用ロジックと利用ボリュームを整理し、企業として何を最初に攻めるべきかを判断するためのマップを提示する。', sub: ['市場規模', 'エンジン別の引用挙動', 'ユーザー層'] },
  { n: '02', pg: 14, t: '検索結果ページの 3 秒間 · クリックは何で決まるか', d: '12 業種・1,400 ページのクリックログから、ユーザーが「ページを開く」までの 3 秒間にどんな意思決定が走っているかを解剖。CTR 平均 −38% の内訳を可視化する。', sub: ['CTR 変動の構造', '視線移動分析', 'AI Overview 出現率'] },
  { n: '03', pg: 6, t: 'GEO の定義 · SEO とは何が違うのか', d: 'キーワードと質問、ランクと引用、SERP と Answer Surface。両者を貫く違いを整理し、GEO 戦略を組み立てるうえでの 5 つの軸を定義する。', sub: ['SEO vs GEO 対照表', '5 軸 AI Visibility', '組織への影響'] },
  { n: '04', pg: 12, t: '引用される条件 · 構造・密度・権威の三層', d: 'AI が引用元として選ぶ記事に共通する文章構造、情報密度、E-E-A-T シグナル。Embedding ベースの分析と実コンテンツ事例を併載する。', sub: ['構造の 12 ルール', '情報密度の閾値', '著者性シグナル'] },
  { n: '05', pg: 6, t: 'GEO 計測フレーム · 5 軸 AI Visibility スコア', d: 'Citation 採用率、Mention 質、回答シェア、Brand Lift、Conversion Path の 5 軸で AI 検索可視性を定量化するフレームワーク。Excel テンプレ付。', sub: ['5 軸の定義', 'スコアリング基準', '計測ツール紹介'] },
  { n: '06', pg: 1, t: '90 日ロードマップ · 着手から成果までの実装手順', d: '何から始めるか分からない担当者向けの、現状診断 → 設計 → 実装 → 計測の 90 日ロードマップ。週次タスクとマイルストーンで構成。', sub: ['Week 1-2 診断', 'Week 3-8 実装', 'Week 9-12 検証'] },
  { n: '07', pg: 1, t: '事例 · BtoB SaaS が Citation 採用率 22 倍まで伸ばした 6 ヶ月', d: '従業員 80 名の BtoB SaaS 企業が、Ascent と組んで AI 検索からの流入を 22 倍にした実装ログ。月次 KPI と施策をすべて公開する。', sub: ['初期診断 (M0)', '改善ロードマップ (M1-M3)', '実績推移 (M4-M6)'] },
]

export default function WhitepaperPage() {
  return (
    <div className="wp-page">
      <SplitSection
        sectionClassName="wp-hero"
        background={
          <>
            <div className="wp-hero__bg" />
            <div className="wp-hero__grid-bg" />
          </>
        }
        containerClassName="wp-wrap wp-grid"
        leftClassName=""
        rightClassName="wp-side"
        left={
          <>
            <div className="wp-bc">
              <Link href="/">HOME</Link>
              <span className="sep">/</span>
              <Link href="/#download">DOWNLOADS</Link>
              <span className="sep">/</span>
              <span className="here">WP-2026-01</span>
            </div>
            <div className="wp-book">
              <div className="badge">NEW · 2026.04</div>
              <div className="obj">
                <div className="spine" />
                <div className="pages" />
                <div className="face">
                  <div className="meta-top">
                    <span>WHITEPAPER · <span className="v">WP-2026-01</span></span>
                    <br />
                    ASCENT / GEO LAB
                  </div>
                  <h2>AI 検索時代の<em>マーケティング白書</em></h2>
                  <div className="meta-bot">
                    <span>2026 EDITION</span>
                    <span>48 PAGES</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        right={
          <>
            <div className="ix">[ WHITEPAPER · WP-2026-01 ]</div>
            <h1>
              AI 検索時代の、<em>企業マーケティング白書 2026。</em>
            </h1>
            <p className="lede">
              Google AI Overview、ChatGPT Search、Perplexity が普及した世界で、企業ブランドはどう「発見」されるのか。
              12 業種・1,400 ページのクリックログと、4 つの AI 検索エンジンの引用ログ 8,000 件を突き合わせ、
              引用され続けるための条件を 7 章にわたって構造化する。マーケティング責任者・経営層向けの戦略白書。
            </p>

            <div className="specs">
              <div className="s">
                <div className="l">PAGES</div>
                <div className="v">48</div>
              </div>
              <div className="s">
                <div className="l">FORMAT</div>
                <div className="v">PDF</div>
              </div>
              <div className="s">
                <div className="l">SIZE</div>
                <div className="v">12.4 MB</div>
              </div>
              <div className="s">
                <div className="l">UPDATED</div>
                <div className="v">2026.04</div>
              </div>
            </div>
          </>
        }
      />

      <section className="wp-body">
          <div className="wp-body-grid">
            <div>
            <div className="lead">{'// TABLE OF CONTENTS'}</div>
            <h2>
              本書の<em>構成。</em>
            </h2>
            <p className="head-note">
              7 章 · 48 ページ。各章の冒頭に 200 字のサマリ、章末にチェックリストを掲載しています。
              社内提案や戦略ディスカッションにそのまま使える構成です。
            </p>
          </div>

          <div className="wp-toc">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.n} className="chap">
                <div className="n">{chapter.n}</div>
                <div>
                  <div className="chap-head">
                    <h3>{chapter.t}</h3>
                    <div className="pg">{chapter.pg} p</div>
                  </div>
                  <p>{chapter.d}</p>
                  <div className="sub">
                    {chapter.sub.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wp-form-sec" id="download">
        <div className="wp-form-grid">
          <div className="wp-form-left">
            <div className="lead">{'// GET THE FULL PDF'}</div>
            <h2>
              必要事項を入力して、<em>すぐにダウンロード。</em>
            </h2>
            <p>
              入力後、ご記入のメールアドレスにダウンロードリンクをお送りします。
              いただいた情報は、本書のアップデート通知と関連リサーチのご案内にのみ使用します。
            </p>
            <ul>
              <li>48 ページの PDF（高解像度・印刷可）</li>
              <li>章末チェックリスト × 7（Excel 添付）</li>
              <li>更新時のメール通知（四半期）</li>
              <li>本書を踏まえた 30 分の無料相談（任意）</li>
            </ul>
          </div>

          <DownloadForm formName="downliad-form" />
        </div>
      </section>
    </div>
  )
}
