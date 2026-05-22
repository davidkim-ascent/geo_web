import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { isBlockedEmailDomain } from '@/lib/contact-blocking'
import { WhitepaperConfirmEmail } from '@/emails/WhitepaperConfirmEmail'
import {
  WHITEPAPER_STORAGE_BUCKET,
  WHITEPAPER_STORAGE_OBJECT_PATH,
  WHITEPAPER_DOWNLOAD_TOKEN_PARAM,
  getWhitepaperPdfPath,
} from '@/lib/whitepaper-download'
import { createAdminClient } from '@/lib/supabase/admin'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL?.trim() || 'no-reply@ascentnet.co.jp'
const BLOCKED_DOMAINS = (process.env.BLOCKED_EMAIL_DOMAINS ?? '').split(',').map((d) => d.trim()).filter(Boolean)

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { company, role, name, phone, email, industry, website, challenge } = body as Record<string, string>

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

  const pdfBytes = await readFile(getWhitepaperPdfPath())
  const { error: uploadError } = await supabase.storage
    .from(WHITEPAPER_STORAGE_BUCKET)
    .upload(WHITEPAPER_STORAGE_OBJECT_PATH, pdfBytes, {
      upsert: true,
      contentType: 'application/pdf',
    })

  if (uploadError) {
    console.error('[whitepaper] storage upload error:', uploadError)
    return NextResponse.json({ error: 'storage_upload_error' }, { status: 500 })
  }

  const downloadUrl = new URL('/api/whitepaper/download', req.url)
  downloadUrl.searchParams.set(WHITEPAPER_DOWNLOAD_TOKEN_PARAM, downloadToken)

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

  return NextResponse.json({ ok: true })
}
