import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Button,
  Section,
  Img,
} from '@react-email/components'

type Props = {
  company: string
  name: string
  downloadUrl?: string
}

const DOWNLOAD_ROUTE = '/api/whitepaper/download'

export function WhitepaperConfirmEmail({ company, name, downloadUrl }: Props) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', padding: '32px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 8, maxWidth: 560, overflow: 'hidden' }}>
          <Section style={{ backgroundColor: '#0B0B0E', padding: '28px 32px' }}>
            <Img
              src="https://geo.ascentnet.co.jp/ascent-geo-logo-white.png"
              alt="ASCENT/GEO"
              width="160"
              style={{ display: 'block' }}
            />
          </Section>

          <Section style={{ padding: '40px 32px 32px' }}>
            <Text style={{ fontSize: 22, fontWeight: 700, color: '#0B0B0E', margin: '0 0 8px', lineHeight: 1.4 }}>
              ダウンロードリンクを
              <br />
              お送りしました。
            </Text>
            <Text style={{ fontSize: 15, color: '#4e4e51', margin: '16px 0 0', lineHeight: 1.7 }}>
              {company || 'お客様'} {name ? ` ${name}` : ''} 様
              <br />
              Ascent GEO サービス紹介資料のダウンロードリンクをお送りします。
              下のボタンを押すと、PDF がそのままダウンロードされます。
            </Text>

            <Hr style={{ borderColor: '#e4e4e7', margin: '28px 0' }} />

            <Button
              href={downloadUrl ?? DOWNLOAD_ROUTE}
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
              PDF をダウンロード
            </Button>
          </Section>

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

export default WhitepaperConfirmEmail
