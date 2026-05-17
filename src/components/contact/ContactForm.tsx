'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { getBlockedEmailDomainError } from '@/lib/contact-blocking'
import { WEBSITE_UNAVAILABLE_COPY, isValidWebsiteValue } from '@/lib/website-validation'
import { CONTACT_THANKS_COOKIE } from '@/lib/completion-access'
import { setCompletionAccessCookie } from '@/lib/completion-access.client'

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

type Props = {
  blockedEmailDomains: string[]
}

export function ContactForm({ blockedEmailDomains }: Props) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
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
  const emailValue = useWatch({ control, name: 'email' })

  useEffect(() => {
    const blockedEmailError = getBlockedEmailDomainError(emailValue ?? '', blockedEmailDomains)

    if (blockedEmailError) {
      setError('email', { type: 'validate', message: blockedEmailError })
      return
    }

    if (errors.email?.type === 'validate' && errors.email.message === '許可されていないメールドメインです。') {
      clearErrors('email')
    }
  }, [blockedEmailDomains, clearErrors, emailValue, errors.email?.message, errors.email?.type, setError])

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
        setError('email', { type: 'server', message: '許可されていないメールドメインです。' })
        return
      }
      setServerError('現在送信エラー状態です。しばらくしてから再度お試しいただくか、お電話ください：03-3527-3963')
      return
    }

    setCompletionAccessCookie(CONTACT_THANKS_COOKIE)
    router.push('/contact/thanks')
  }

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
            placeholder={`URLが未確定の場合は「${WEBSITE_UNAVAILABLE_COPY}」と入力してください。`}
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
