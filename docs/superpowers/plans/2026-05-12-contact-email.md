# Contact Form Email System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 컨택폼 서밋 시 Supabase INSERT + 사용자 확인 메일 + 어드민 알림 메일을 발송하고, `/contact/thanks` 페이지로 이동시킨다.

**Architecture:** ContactForm은 클라이언트에서 `/api/contact` Route Handler로 POST 요청을 보낸다. Route Handler가 도메인 차단 체크 → Supabase INSERT → Resend 메일 발송을 순서대로 처리한다. 메일 실패는 thanks 페이지 이동을 막지 않는다.

**Tech Stack:** Next.js 16 App Router, Resend SDK, react-email, Supabase JS, Zod

---

## File Map

| 파일 | 역할 |
|------|------|
| `src/app/api/contact/route.ts` | 신규: Route Handler — 도메인 차단, Supabase INSERT, Resend 발송 |
| `src/app/contact/thanks/page.tsx` | 신규: Thanks 정적 페이지 |
| `src/emails/ContactConfirmEmail.tsx` | 신규: 사용자용 브랜디드 이메일 템플릿 |
| `src/emails/ContactAdminEmail.tsx` | 신규: 어드민용 심플 이메일 템플릿 |
| `src/components/contact/ContactForm.tsx` | 수정: Supabase 직접 호출 → fetch('/api/contact') + router.push |
| `.env.local` | 수정: RESEND_API_KEY, RESEND_FROM_EMAIL 추가 확인 |

---

## Task 1: 패키지 설치 및 환경변수 설정

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: resend, react-email 패키지 설치**

```bash
cd /Users/jkim/Desktop/Antigravity/geo-web
npm install resend @react-email/components
```

Expected output: 패키지 설치 완료, `package.json`에 `resend`, `@react-email/components` 추가됨

- [ ] **Step 2: .env.local에 환경변수 추가 확인**

`.env.local`을 열어 아래 변수들이 있는지 확인. 없으면 추가:

```env
RESEND_API_KEY=re_Ajggpp4S_KZ7mtJ7QkFpZQa4AocVbafAc
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_ADMIN_EMAIL=geo-ascent@ascentnet.co.jp
BLOCKED_EMAIL_DOMAINS=sex.com,spam.com
```

> **Note:** `RESEND_FROM_EMAIL`은 개발 중 임시값. 도메인 확정 후 `no-reply@ascentnet.co.jp`으로 교체.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install resend and react-email packages"
```

---

## Task 2: 어드민 이메일 템플릿 (`ContactAdminEmail.tsx`)

**Files:**
- Create: `src/emails/ContactAdminEmail.tsx`

- [ ] **Step 1: 어드민 템플릿 파일 생성**

`src/emails/ContactAdminEmail.tsx` 파일을 생성:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/emails/ContactAdminEmail.tsx
git commit -m "feat: add admin email template"
```

---

## Task 3: 사용자 확인 이메일 템플릿 (`ContactConfirmEmail.tsx`)

**Files:**
- Create: `src/emails/ContactConfirmEmail.tsx`

- [ ] **Step 1: 사용자 확인 템플릿 파일 생성**

`src/emails/ContactConfirmEmail.tsx` 파일을 생성:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/emails/ContactConfirmEmail.tsx
git commit -m "feat: add user confirmation email template"
```

---

## Task 4: Route Handler (`/api/contact/route.ts`)

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Route Handler 파일 생성**

`src/app/api/contact/route.ts` 파일을 생성:

```ts
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
  const body = await req.json()
  const { company, role, name, phone, email, industry, website, challenge } = body

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
```

- [ ] **Step 2: supabase/server.ts 확인**

`src/lib/supabase/server.ts`를 열어 `createClient`가 `async` 함수로 export되는지 확인. 만약 동기 함수라면 `await` 없이 호출:

```ts
// 동기 버전인 경우
const supabase = createClient()
// async 버전인 경우
const supabase = await createClient()
```

실제 파일 내용에 맞게 route.ts의 `await createClient()` 호출 방식을 조정.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add /api/contact route handler with domain check, supabase insert, resend emails"
```

---

## Task 5: Thanks 페이지 (`/contact/thanks`)

**Files:**
- Create: `src/app/contact/thanks/page.tsx`

- [ ] **Step 1: Thanks 페이지 생성**

`Design/thanks.png` 디자인 참고. `src/app/contact/thanks/page.tsx` 파일을 생성:

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0E] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-[640px] w-full text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.15em] text-white/40 mb-12">
            <span>HOME</span>
            <span>›</span>
            <span>CONTACT</span>
            <span>›</span>
            <span className="text-[#1452FF]">お問い合わせ完了</span>
          </div>

          {/* Ticket ID */}
          <div className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] text-white/40 mb-6">
            TICKET-ID · {Date.now().toString(36).toUpperCase()}
          </div>

          {/* Heading */}
          <h1
            className="font-bold text-white mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.035em' }}
          >
            お問い合わせを<br />
            <span style={{ color: '#1452FF' }}>受け付けました。</span>
          </h1>

          <p className="text-[16px] text-white/60 leading-[1.7] mb-16 max-w-[44ch] mx-auto">
            ご入力いただいた内容は、GEOチームのリードコンサルタントに直接届きます。<br />
            一次返信は<strong className="text-white/80">24時間以内</strong>に、ご記入のメールアドレス宛にお送りします（土日祝の場合は翌営業日）。
          </p>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden mb-16">
            {[
              { step: 'STEP 01', title: '受付完了', desc: 'ご入力の内容を共有し、担当者へのメール転送も済みました。' },
              { step: 'STEP 02', title: '一次返信', desc: 'GEOコンサルタントが、ご相談内容に即したアウトラインをご連絡します。', active: true },
              { step: 'STEP 03', title: '30分の無料相談', desc: 'Google特許分析とAI検索計測を活用したGEO戦略の可能性をご提案します。' },
            ].map(({ step, title, desc, active }) => (
              <div
                key={step}
                className="bg-[#0B0B0E] p-6 text-left"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold"
                    style={active
                      ? { borderColor: '#1452FF', backgroundColor: '#1452FF', color: '#fff' }
                      : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.3)' }
                    }
                  >
                    {active ? '●' : '○'}
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] text-white/40">{step}</span>
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
                <p className="text-[13px] text-white/50 leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Phone CTA */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.15em] text-[#1452FF] mb-2">
                OR · CALL US DIRECTLY
              </div>
              <h3 className="text-[18px] font-bold text-white mb-1">電話でコンタクトする。</h3>
              <p className="text-[13px] text-white/50">
                急ぎのご案件や、まずは聞いてみたいという方は、代表番号まで。<br />
                平日 9:00〜18:00 で対応しています。
              </p>
            </div>
            <a
              href="tel:0335273963"
              className="flex-shrink-0 font-['JetBrains_Mono',monospace] font-bold text-white hover:text-[#1452FF] transition-colors"
              style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '0.04em' }}
            >
              03 3527 3963
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/thanks/page.tsx
git commit -m "feat: add /contact/thanks page"
```

---

## Task 6: ContactForm 수정

**Files:**
- Modify: `src/components/contact/ContactForm.tsx`

현재 ContactForm은 클라이언트에서 직접 Supabase를 호출하고 `submitted` state로 성공 메시지를 표시한다. 이를 `/api/contact`로 POST하고 `/contact/thanks`로 이동하도록 변경한다.

- [ ] **Step 1: ContactForm.tsx 수정**

파일 상단 import에 `useRouter` 추가, `onSubmit` 함수 교체:

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const INDUSTRIES = [
  '製造業',
  'IT・SaaS',
  '小売・EC',
  '金融・保険',
  '不動産',
  '医療・ヘルスケア',
  'コンサルティング',
  'メディア・広告',
  '教育',
  'その他',
]

const PHONE_RE = /^[\d\-\+\(\)\s]{10,15}$/
const WEBSITE_UNAVAILABLE_TEXT = '準備中'

function isValidWebsiteValue(value: string) {
  const trimmed = value.trim()
  if (trimmed.includes(WEBSITE_UNAVAILABLE_TEXT)) return true
  try {
    const url = new URL(trimmed)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const schema = z.object({
  company: z.string().min(1, '会社名を入力してください'),
  role: z.string().min(1, '役職を入力してください'),
  name: z.string().min(1, 'お名前を入力してください'),
  phone: z.string().regex(PHONE_RE, '正しい電話番号を入力してください（例：03-0000-0000）'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  industry: z.string().min(1, '業種を選択してください'),
  website: z.string().refine(isValidWebsiteValue, {
    message: 'WebサイトURL または「準備中」を入力してください。',
  }),
  challenge: z.string().min(10, '10文字以上で入力してください'),
  human: z.boolean().refine(v => v === true, 'チェックしてください'),
  agree: z.boolean().refine(v => v === true, '個人情報保護方針への同意が必要です'),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '',
      role: '',
      name: '',
      phone: '',
      email: '',
      industry: '',
      website: '',
      challenge: '',
      human: false,
      agree: false,
    },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: values.company,
        role: values.role,
        name: values.name,
        phone: values.phone,
        email: values.email,
        industry: values.industry,
        website: values.website,
        challenge: values.challenge,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      if (data.error === 'blocked_domain') {
        setServerError('許可されていないメールドメインです。')
        return
      }
      setServerError('現在送信エラー状態です。しばらくしてから再度お試しいただくか、お電話ください：03-3527-3963')
      return
    }

    router.push('/contact/thanks')
  }

  // JSX는 기존과 동일 — submitted 상태 블록 제거, serverError 표시 유지
  return (
    <form className="wp-form-card" name="contact_form" data-form-name="contact_form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>まずは、お気軽にご相談</h3>
      <p className="sub">
        <span className="req">*</span> は必須です。
      </p>

      <div className="field-row two">
        <div>
          <label>会社名 <span className="req">*</span></label>
          <input className="field" placeholder="株式会社○○" {...register('company')} />
          {errors.company && <p className="field-error">{errors.company.message}</p>}
        </div>
        <div>
          <label>役職 <span className="req">*</span></label>
          <input className="field" placeholder="マーケティング部 部長" {...register('role')} />
          {errors.role && <p className="field-error">{errors.role.message}</p>}
        </div>
      </div>

      <div className="field-row two">
        <div>
          <label>お名前 <span className="req">*</span></label>
          <input className="field" placeholder="山田 太郎" {...register('name')} />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>
        <div>
          <label>電話番号 <span className="req">*</span></label>
          <input className="field" placeholder="03-0000-0000" {...register('phone')} />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="field-row two">
        <div>
          <label>メールアドレス <span className="req">*</span></label>
          <input className="field" type="email" placeholder="name@company.co.jp" {...register('email')} />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
        <div>
          <label>業種 <span className="req">*</span></label>
          <select className="field" {...register('industry')}>
            <option value="">業種を選択</option>
            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {errors.industry && <p className="field-error">{errors.industry.message}</p>}
        </div>
      </div>

      <div className="field-row">
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>Webサイト情報 <span className="req">*</span></span>
          </label>
          <input
            className="field"
            placeholder='URLが未確定の場合は「準備中」と入力してください。'
            {...register('website')}
          />
          {errors.website && <p className="field-error">{errors.website.message}</p>}
        </div>
      </div>

      <div className="field-row">
        <div>
          <label>現在の課題 <span className="req">*</span></label>
          <textarea
            className="field"
            rows={2}
            placeholder="10文字以上で入力してください / 例：AI検索からの流入が減少しており、GEO対策をどこから始めればよいか分からない"
            {...register('challenge')}
          />
          {errors.challenge && <p className="field-error">{errors.challenge.message}</p>}
        </div>
      </div>

      <div className="check">
        <input type="checkbox" id="human" {...register('human')} />
        <label htmlFor="human">私はロボットではありません</label>
      </div>
      {errors.human && <p className="field-error" style={{ marginTop: -14, marginBottom: 10 }}>{errors.human.message}</p>}

      <div className="check" style={{ marginTop: 0 }}>
        <input type="checkbox" id="agree" {...register('agree')} />
        <label htmlFor="agree">
          <a href="/privacy" target="_blank" rel="noopener noreferrer">個人情報保護方針</a>に同意のうえ、送信します。
        </label>
      </div>
      {errors.agree && <p className="field-error" style={{ marginTop: -14, marginBottom: 10 }}>{errors.agree.message}</p>}

      {serverError && <p className="field-error" style={{ marginBottom: 8 }}>{serverError}</p>}

      <Button type="submit" variant="submit" disabled={isSubmitting}>
        <span>{isSubmitting ? '送信中...' : '送信'}</span>
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: 개발 서버 실행 및 수동 테스트**

```bash
npm run dev
```

1. 브라우저에서 `http://localhost:3000` 열기
2. 폼에 테스트 데이터 입력 (이메일: 본인 이메일)
3. 제출 후 `/contact/thanks`로 이동 확인
4. Resend 대시보드(`resend.com/emails`)에서 메일 발송 확인
5. 차단 도메인 테스트: 이메일에 `sex.com` 입력 → "許可されていないメールドメインです。" 에러 확인

- [ ] **Step 3: TypeScript 빌드 확인**

```bash
npm run build
```

Expected: 빌드 에러 없음. 타입 에러가 있으면 수정.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "feat: update ContactForm to POST /api/contact and redirect to /contact/thanks"
```

---

## Task 7: Vercel 환경변수 등록

로컬 `.env.local`의 값들은 Vercel 배포 시 자동 반영되지 않는다. 별도로 등록해야 한다.

- [ ] **Step 1: Vercel 환경변수 등록**

```bash
# Vercel CLI 사용
vercel env add RESEND_API_KEY
# 값 입력: re_Ajggpp4S_KZ7mtJ7QkFpZQa4AocVbafAc
# 환경: Production, Preview, Development 모두 선택

vercel env add RESEND_FROM_EMAIL
# 값: onboarding@resend.dev

vercel env add CONTACT_ADMIN_EMAIL
# 값: geo-ascent@ascentnet.co.jp

vercel env add BLOCKED_EMAIL_DOMAINS
# 값: sex.com,spam.com
```

또는 Vercel 대시보드 → Project Settings → Environment Variables에서 직접 추가.

- [ ] **Step 2: 배포 확인**

```bash
vercel --prod
```

배포 완료 후 프로덕션 URL에서 폼 테스트.

---

## 도메인 확정 후 할 일 (별도 태스크)

아래는 도메인이 확정되면 진행:

1. Resend 대시보드 → Domains → `ascentnet.co.jp` (또는 서브도메인) 추가
2. DNS에 SPF, DKIM 레코드 추가 후 Verified 확인
3. `.env.local` 및 Vercel 환경변수 `RESEND_FROM_EMAIL` 업데이트
4. 재배포
