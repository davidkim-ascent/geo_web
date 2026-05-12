import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
} from '@react-email/components'

export type ContactFormData = {
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
  data: ContactFormData
  isFallback?: boolean
}

export function ContactAdminEmail({ data, isFallback = false }: Props) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', padding: '32px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: '32px', maxWidth: 560 }}>
          {isFallback && (
            <Section style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '12px 16px', marginBottom: 24 }}>
              <Text style={{ margin: 0, color: '#dc2626', fontWeight: 700, fontSize: 14 }}>
                ⚠️ ユーザー確認メールの送信に失敗しました。手動で連絡が必要です。
              </Text>
            </Section>
          )}

          <Text style={{ fontSize: 18, fontWeight: 700, color: '#0B0B0E', margin: '0 0 24px' }}>
            {isFallback ? '【送信失敗】ユーザー確認メール未送信' : '【新規お問い合わせ】'}
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
              ['Webサイト', data.website],
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

export default ContactAdminEmail
