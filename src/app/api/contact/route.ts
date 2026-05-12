import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { ContactConfirmEmail } from '@/emails/ContactConfirmEmail'
import { ContactAdminEmail, type ContactFormData } from '@/emails/ContactAdminEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL ?? ''

function getBlockedDomains(): string[] {
  return (process.env.BLOCKED_EMAIL_DOMAINS ?? '').split(',').map(d => d.trim()).filter(Boolean)
}

export async function POST(req: NextRequest) {
  if (!ADMIN_EMAIL) {
    console.error('[contact] CONTACT_ADMIN_EMAIL is not configured')
    return NextResponse.json({ error: 'server_config_error' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }
  const { company, role, name, phone, email, industry, website, challenge } = body as Record<string, string>

  // 차단 도메인 체크
  const domain = email?.split('@')[1] ?? ''
  if (getBlockedDomains().includes(domain)) {
    return NextResponse.json({ error: 'blocked_domain' }, { status: 400 })
  }

  // Supabase INSERT
  const supabase = await createClient()
  const { error: dbError } = await supabase.from('whitepaper_downloads').insert({
    company, role, name, phone, email, industry, website, challenge,
  })

  if (dbError) {
    console.error('[contact] supabase insert error:', dbError)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }

  const receivedAt = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

  const formData: ContactFormData = { company, role, name, phone, email, industry, website, challenge, receivedAt }

  // 사용자 확인 메일
  const { error: confirmError } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: '【ASCENT/GEO】お問い合わせを受け付けました',
    react: ContactConfirmEmail({ name, company, challenge }),
  })

  if (confirmError) {
    console.error('[contact] confirm email error:', confirmError)
    // 사용자 메일 실패 → 어드민에게 전체 데이터 포함 발송 실패 알림
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `【送信失敗】ユーザー確認メール未送信 - ${company} / ${name}`,
      react: ContactAdminEmail({ data: formData, isFallback: true }),
    })
  }

  // 어드민 알림 메일
  const { error: adminError } = await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `【新規お問い合わせ】${company} / ${name}`,
    react: ContactAdminEmail({ data: formData }),
  })

  if (adminError) {
    console.error('[contact] admin email error:', adminError)
    // 어드민 메일 실패는 로그만 기록
  }

  return NextResponse.json({ ok: true })
}
