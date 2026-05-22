import Link from 'next/link'
import { DownloadForm } from '@/components/whitepaper/DownloadForm'
import { SplitSection } from '@/components/layout/SplitSection'
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from '@/lib/contact-blocking'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'GEOサービス紹介資料 - 株式会社 Ascent Networks',
  description:
    'Ascent の GEO サービス紹介資料をダウンロードできるページです。GEO の考え方、SEO との違い、施策の進め方を簡潔にまとめています。',
  path: '/whitepaper',
})

export const dynamic = 'force-static'

const CHAPTERS = [
  {
    n: '01',
    pg: '要点',
    t: 'GEOとは何か',
    d: 'AI検索エンジンに自社が引用される状態をつくるための最適化施策を、SEOとの違いが分かる形で整理しています。',
    sub: ['AI回答への引用', 'ブランド露出', '新しい成果指標'],
  },
  {
    n: '02',
    pg: '要点',
    t: 'GEOとSEOの違い',
    d: '対象、評価軸、ユーザー行動がどう違うのかを比較し、同じやり方では成果が出ない理由を明確にしています。',
    sub: ['対象の違い', '評価単位の違い', '補完関係'],
  },
  {
    n: '03',
    pg: '要点',
    t: '市場の変化',
    d: '生成AIの普及が進み、検索だけでなく比較・検討の場面でもAIが使われる前提を示しています。',
    sub: ['利用者の増加', '業界別の流入変化', '意思決定への影響'],
  },
  {
    n: '04',
    pg: '要点',
    t: 'AICASと購買行動',
    d: 'AskからShareまでの流れに合わせて、AIに選ばれるための施策を各フェーズに対応づけています。',
    sub: ['Ask', 'Check', 'Action'],
  },
  {
    n: '05',
    pg: '要点',
    t: 'Ascentの強み',
    d: '特許ベースの考え方、検索経路の可視化、質問データの活用など、推測に頼らない進め方をまとめています。',
    sub: ['特許ベース', '質問クラスター', 'GAP分析'],
  },
  {
    n: '06',
    pg: '要点',
    t: '進め方とプラン',
    d: '現状分析からコンテンツ対策、モニタリングまでの流れと、単一ブランド向け・複数ブランド向けのプランを紹介しています。',
    sub: ['分析', '改善', 'モニタリング'],
  },
  {
    n: '07',
    pg: '要点',
    t: '申し込みの流れ',
    d: '無料相談から見積もり、契約、実行までのシンプルな導線を案内しています。',
    sub: ['無料相談', '見積もり', '契約'],
  },
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
              <div className="badge">PDF · 2026.05</div>
              <div className="obj">
                <div className="spine" />
                <div className="pages" />
                <div className="face">
                  <div className="meta-top">
                    <span>SERVICE GUIDE · <span className="v">WP-2026-01</span></span>
                    <br />
                    ASCENT / GEO LAB
                  </div>
                  <h2><em>GEOサービス紹介資料</em></h2>
                  <div className="meta-bot">
                    <span>2026 EDITION</span>
                    <span>PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        right={
          <>
            <div className="ix">[ GEO SERVICE GUIDE · WP-2026-01 ]</div>
            <h1>
              GEOサービス紹介資料。
            </h1>
            <p className="lede">
              GEO の基本、SEO との違い、AI に引用されるための考え方を、Ascent のサービス内容に沿ってまとめた資料です。
              推測ではなく、データと特許ベースの考え方で進める GEO の全体像を、短く分かりやすく整理しています。
            </p>

            <div className="specs">
              <div className="s">
                <div className="l">TOPIC</div>
                <div className="v">GEO</div>
              </div>
              <div className="s">
                <div className="l">FORMAT</div>
                <div className="v">PDF</div>
              </div>
              <div className="s">
                <div className="l">FOCUS</div>
                <div className="v">Strategy</div>
              </div>
              <div className="s">
                <div className="l">UPDATED</div>
                <div className="v">2026.05</div>
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
              資料の<em>要点。</em>
            </h2>
            <p className="head-note">
              GEO の概念から実行までを、7 つの短いテーマで整理しています。詳細版はダウンロード後にご確認ください。
            </p>
          </div>

          <div className="wp-toc">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.n} className="chap">
                <div className="n">{chapter.n}</div>
                <div>
                  <div className="chap-head">
                    <h3>{chapter.t}</h3>
                    <div className="pg">{chapter.pg}</div>
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
              必要事項を入力して、<em>資料をダウンロード。</em>
            </h2>
            <p>
              入力後、ご記入のメールアドレスに Ascent GEO サービス紹介資料のダウンロードリンクをお送りします。
              いただいた情報は、資料送付と関連情報のご案内にのみ使用します。
            </p>
            <ul>
              <li>GEO の基本と SEO との違いを整理</li>
              <li>Ascent の強みと進め方を短く把握</li>
              <li>導入検討に使えるサービス概要</li>
              <li>必要に応じて無料相談へ接続</li>
            </ul>
          </div>

          <DownloadForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      </section>
    </div>
  )
}
