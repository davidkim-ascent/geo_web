import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Button,
  Section,
} from '@react-email/components'

type Props = {
  name: string
  company: string
  challenge: string
}

export function ContactConfirmEmail({ name, company, challenge }: Props) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', padding: '32px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 8, maxWidth: 560, overflow: 'hidden' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#0B0B0E', padding: '28px 32px' }}>
            <Text style={{ margin: 0, color: '#ffffff', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
              ASCENT/GEO
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '40px 32px 32px' }}>
            <Text style={{ fontSize: 22, fontWeight: 700, color: '#0B0B0E', margin: '0 0 8px', lineHeight: 1.4 }}>
              お問い合わせを<br />受け付けました。
            </Text>
            <Text style={{ fontSize: 15, color: '#4e4e51', margin: '16px 0 0', lineHeight: 1.7 }}>
              {name} 様<br />
              この度はお問い合わせいただき、ありがとうございます。<br />
              内容を確認のうえ、<strong>24時間以内</strong>（土日祝は翌営業日）にご連絡いたします。
            </Text>

            <Hr style={{ borderColor: '#e4e4e7', margin: '28px 0' }} />

            <Text style={{ fontSize: 13, color: '#71717a', margin: '0 0 12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              受付内容
            </Text>

            {(
              [
                ['会社名', company],
                ['ご相談内容', challenge],
              ] as [string, string][]
            ).map(([label, value]) => (
              <Section key={label} style={{ marginBottom: 12 }}>
                <Text style={{ margin: 0, fontSize: 12, color: '#71717a' }}>{label}</Text>
                <Text style={{ margin: '2px 0 0', fontSize: 14, color: '#0B0B0E' }}>{value}</Text>
              </Section>
            ))}

            <Hr style={{ borderColor: '#e4e4e7', margin: '28px 0' }} />

            <Text style={{ fontSize: 14, color: '#4e4e51', margin: '0 0 20px' }}>
              お急ぎの場合は、お電話でもお受けしています。
            </Text>

            <Button
              href="tel:0335273963"
              style={{
                backgroundColor: '#1452FF',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              03-3527-3963 に電話する
            </Button>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#f4f4f5', padding: '20px 32px', borderTop: '1px solid #e4e4e7' }}>
            <Text style={{ margin: 0, fontSize: 12, color: '#71717a' }}>
              ASCENT NETWORK · このメールは自動送信です。返信はお受けできません。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactConfirmEmail
