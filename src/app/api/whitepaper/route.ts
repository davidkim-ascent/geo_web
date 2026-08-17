import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { randomUUID } from 'node:crypto'
import { isBlockedEmailDomain } from '@/lib/contact-blocking'
import { WhitepaperConfirmEmail } from '@/emails/WhitepaperConfirmEmail'
import { WhitepaperAdminEmail } from '@/emails/WhitepaperAdminEmail'
import {
  WHITEPAPER_DOWNLOAD_TOKEN_PARAM,
} from '@/lib/whitepaper-download'
import { createAdminClient } from '@/lib/supabase/admin'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL?.trim() || 'geo@ascentnet.co.jp'
const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL?.trim() || 'geo@ascentnet.co.jp'
const BLOCKED_DOMAINS = (process.env.BLOCKED_EMAIL_DOMAINS ?? '').split(',').map((d) => d.trim()).filter(Boolean)

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { company, role, name, phone, email, industry, website, challenge } = body as Record<string, string>

  // 필수 필드 검증
  if (!company || !role || !name || !phone || !email || !industry || !challenge) {
    return NextResponse.json({ error: 'missing_required_fields' }, { status: 400 })
  }

  if (isBlockedEmailDomain(email ?? '', BLOCKED_DOMAINS)) {
    return NextResponse.json({ error: 'blocked_domain' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const downloadToken = randomUUID()

  const { error: dbError } = await supabase.from('whitepaper_downloads').insert({
    company,
    role,
    name,
    phone,
    email,
    industry,
    website,
    challenge,
    download_token: downloadToken,
  })

  if (dbError) {
    console.error('[whitepaper] supabase insert error:', JSON.stringify(dbError, null, 2))
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }

  const downloadUrl = new URL('/api/whitepaper/download', req.url)
  downloadUrl.searchParams.set(WHITEPAPER_DOWNLOAD_TOKEN_PARAM, downloadToken)

  const receivedAt = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

  // 사용자 확인 메일 (다운로드 링크)
  const { error: emailError } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: '【ASCENT/GEO】GEOサービス紹介資料のダウンロードリンク',
    react: WhitepaperConfirmEmail({
      company: company ?? '',
      name: name ?? '',
      downloadUrl: downloadUrl.toString(),
    }),
  })

  if (emailError) {
    console.error('[whitepaper] confirm email error:', emailError)
    return NextResponse.json({ error: 'email_error' }, { status: 500 })
  }

  // 어드민 알림 메일
  const { error: adminError } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `【GEO】資料ダウンロードがありました — ${company} / ${name}`,
    react: WhitepaperAdminEmail({
      data: { company: company ?? '', role: role ?? '', name: name ?? '', phone: phone ?? '', email: email ?? '', industry: industry ?? '', website: website ?? '', challenge: challenge ?? '', receivedAt },
    }),
  })

  if (adminError) {
    console.error('[whitepaper] admin email error:', adminError)
  }

  return NextResponse.json({ ok: true })
}
