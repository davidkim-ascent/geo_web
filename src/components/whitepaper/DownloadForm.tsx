'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

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

const schema = z
  .object({
    company:   z.string().min(1, '会社名を入力してください'),
    role:      z.string().min(1, '役職を入力してください'),
    name:      z.string().min(1, 'お名前を入力してください'),
    phone:     z.string().regex(PHONE_RE, '正しい電話番号を入力してください（例：03-0000-0000）'),
    email:     z.string().email('正しいメールアドレスを入力してください'),
    industry:  z.string().min(1, '業種を選択してください'),
    website:   z.string().optional(),
    noWebsite: z.boolean(),
    challenge: z.string().min(10, '10文字以上で入力してください'),
    human:     z.boolean().refine(v => v === true, 'チェックしてください'),
    agree:     z.boolean().refine(v => v === true, '個人情報保護方針への同意が必要です'),
  })
  .refine(
    data => {
      if (data.noWebsite) return true
      if (!data.website || data.website.trim() === '') return false
      try { new URL(data.website); return true } catch { return false }
    },
    { message: 'URLを入力するか「準備中」をチェックしてください（例：https://example.com）', path: ['website'] }
  )

type FormValues = z.infer<typeof schema>

type DownloadFormProps = {
  formName?: string
}

export function DownloadForm({ formName = 'downliad-form' }: DownloadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const isContactForm = formName === 'contact_form'

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '', role: '', name: '', phone: '', email: '',
      industry: '', website: '', noWebsite: false,
      challenge: '', human: false, agree: false,
    },
  })

  const noWebsite = useWatch({ control, name: 'noWebsite' })
  const noWebsiteField = register('noWebsite')

  async function onSubmit(values: FormValues) {
    setServerError(null)
    const supabase = createClient()
    const { error } = await supabase.from('whitepaper_downloads').insert({
      company:    values.company,
      role:       values.role,
      name:       values.name,
      phone:      values.phone,
      email:      values.email,
      industry:   values.industry,
      website:    values.noWebsite ? null : values.website,
      no_website: values.noWebsite,
      challenge:  values.challenge,
    })

    if (error) {
      setServerError('送信中にエラーが発生しました。しばらくしてから再度お試しください。')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="wp-form-card" data-form-name={formName} style={{ textAlign: 'center', padding: '64px 36px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ marginBottom: 8 }}>送信完了</h3>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>
          ご登録のメールアドレスにダウンロードリンクをお送りしました。
        </p>
      </div>
    )
  }

  return (
    <form className="wp-form-card" name={formName} data-form-name={formName} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>{isContactForm ? 'まずは、お気軽にご相談' : 'ダウンロードフォーム'}</h3>
      <p className="sub">
        {isContactForm ? (
          <>
            <span className="req">*</span> は必須です。
          </>
        ) : (
          <>
            <span className="req">*</span> は必須です。送信後、メールにダウンロードリンクをお送りします。
          </>
        )}
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
            <span>WebサイトURL <span className="req">*</span></span>
            <span className="no-website-label">
              <input
                type="checkbox"
                {...noWebsiteField}
                onChange={e => {
                  noWebsiteField.onChange(e)
                  setValue('noWebsite', e.target.checked)
                  if (e.target.checked) setValue('website', '')
                }}
                style={{ marginRight: 4 }}
              />
              準備中
            </span>
          </label>
          <input
            className="field"
            placeholder="https://example.co.jp"
            disabled={noWebsite}
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
            rows={isContactForm ? 2 : 4}
            placeholder="例：AI検索からの流入が減少しており、GEO対策をどこから始めればよいか分からない"
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
          <a href="/privacy" target="_blank" rel="noopener noreferrer">個人情報保護方針</a>に同意のうえ、ダウンロードします。
        </label>
      </div>
      {errors.agree && <p className="field-error" style={{ marginTop: -14, marginBottom: 10 }}>{errors.agree.message}</p>}

      {serverError && <p className="field-error" style={{ marginBottom: 8 }}>{serverError}</p>}

      <button type="submit" className="submit" disabled={isSubmitting}>
        <span>{isSubmitting ? '送信中...' : isContactForm ? '送信' : '↓ ダウンロード（48 ページ · 12.4 MB）'}</span>
      </button>
    </form>
  )
}
