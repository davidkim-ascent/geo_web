import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
} from '@react-email/components'

export type WhitepaperDownloadData = {
  company: string
  role: string
  name: string
  phone: string
  email: string
  industry: string
  website: string
  challenge: string
  receivedAt: string
}

type Props = {
  data: WhitepaperDownloadData
}

export function WhitepaperAdminEmail({ data }: Props) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', padding: '32px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: '32px', maxWidth: 560 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, color: '#0B0B0E', margin: '0 0 24px' }}>
            【GEO】資料ダウンロードがありました
          </Text>

          <Hr style={{ borderColor: '#e4e4e7', margin: '0 0 24px' }} />

          {(
            [
              ['会社名', data.company],
              ['役職', data.role],
              ['お名前', data.name],
              ['電話番号', data.phone],
              ['メールアドレス', data.email],
              ['業種', data.industry],
              ['Webサイト', data.website || '未入力'],
            ] as [string, string][]
          ).map(([label, value]) => (
            <Section key={label} style={{ marginBottom: 12 }}>
              <Text style={{ margin: 0, fontSize: 12, color: '#71717a' }}>{label}</Text>
              <Text style={{ margin: '2px 0 0', fontSize: 15, color: '#0B0B0E' }}>{value}</Text>
            </Section>
          ))}

          <Section style={{ marginBottom: 12 }}>
            <Text style={{ margin: 0, fontSize: 12, color: '#71717a' }}>現在の課題</Text>
            <Text style={{ margin: '2px 0 0', fontSize: 15, color: '#0B0B0E', whiteSpace: 'pre-wrap' }}>{data.challenge}</Text>
          </Section>

          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0 12px' }} />

          <Text style={{ margin: 0, fontSize: 12, color: '#71717a' }}>受付日時</Text>
          <Text style={{ margin: '2px 0 0', fontSize: 14, color: '#0B0B0E' }}>{data.receivedAt}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WhitepaperAdminEmail
