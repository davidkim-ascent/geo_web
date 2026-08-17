import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: '特定商取引法に基づく表記 - 株式会社 Ascent Networks',
  description: 'Ascent GEO の特定商取引法に基づく表記です。',
  path: '/tokushoho',
})

export const dynamic = 'force-static'

const rows: { label: string; value: string }[] = [
  {
    label: '販売事業者',
    value: '株式会社 Ascent Networks',
  },
  {
    label: '運営統括責任者',
    value: '代表取締役　金 志勲',
  },
  {
    label: '所在地',
    value: '東京都中央区晴海1-8-10晴海アイランドトリトンスクエア オフィスタワーX棟8階',
  },
  {
    label: '電話番号',
    value: '03-3527-3963\n※お問合せへの正確な対応および記録保持のため、原則として下記メールアドレスまたはお問い合わせフォームよりご連絡をお願いしております。',
  },
  {
    label: 'メールアドレス',
    value: 'geo@ascentnet.co.jp',
  },
  {
    label: '問い合わせフォーム',
    value: 'https://www.ascentnet.co.jp/contact/',
  },
  {
    label: '販売価格',
    value: '【GEO Watcher】\nライトプラン：月額 29,800円\nスタンダードプラン：月額 39,800円\nアドバンスプラン：月額 79,800円\n\n【GEO 診断】\nお試しプラン：月額 19,800円\nSTANDARD：月額 45,000円\nENTERPRISE：月額 80,000円',
  },
  {
    label: '商品代金以外の必要料金',
    value: 'インターネット接続料金および通信料（お客様のご負担となります）',
  },
  {
    label: 'お支払方法',
    value: 'クレジットカード決済（VISA / MasterCard / JCB / American Express）\n※決済処理はStripe, Inc.の決済システムを利用しております。',
  },
  {
    label: '代金の支払時期',
    value: '【初回】 お申し込み時（即時決済）\n【継続（自動更新）】 契約プランに応じた更新日（毎月/毎年）に自動決済',
  },
  {
    label: '商品の引渡時期',
    value: 'クレジットカード決済完了後、直ちにご利用いただけます（アカウント発行・権限付与）。',
  },
  {
    label: '返品・交換・返金',
    value: 'デジタルサービスの特性上、決済完了後のお客様都合によるキャンセル・返品・返金、および日割計算による精算には一切応じられません。',
  },
  {
    label: '解約（サブスクリプションの中止）',
    value: '会員用マイページまたは当社所定の解約フォームより、いつでも解約申請が可能です。\n解約手続完了後も、すでに支払済みの契約期間満了日までは引き続きサービスをご利用いただけます。\n※次回更新日の前日（または契約内容に応じた指定期限）までに解約手続を行わない場合、自動的に契約が更新されます。',
  },
  {
    label: '動作環境',
    value: 'インターネットに接続されたPCおよび推奨Webブラウザ（Google Chrome 最新版等）',
  },
]

export default function TokushohoPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10">
        <p className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.2em] text-[#1452FF]">LEGAL NOTICE</p>
        <h2 className="mt-4 font-bold text-[#0B0B0E]" style={{ letterSpacing: "-0.035em" }}>
          特定商取引法に基づく表記
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-t border-black/10">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-black/10 align-top">
                <th
                  scope="row"
                  className="w-[240px] whitespace-nowrap py-5 pr-6 text-left text-[15px] font-semibold text-[#0B0B0E]"
                >
                  {row.label}
                </th>
                <td className="py-5 text-[16px] leading-[1.8] text-[#4e4e51] whitespace-pre-line">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
