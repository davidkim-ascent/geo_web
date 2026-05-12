# Contact Form Email System — Design Spec
Date: 2026-05-12

## Overview

컨택폼 서밋 시 사용자에게 확인 메일, 어드민에게 알림 메일을 발송하는 시스템.
메일 서비스는 Resend + react-email 사용. 서밋 완료 후 `/contact/thanks` 페이지로 이동.

---

## 1. 전체 흐름

```
사용자 폼 서밋
    │
    ▼
ContactForm.onSubmit()
    └── POST /api/contact
            ├── 차단 도메인 체크 → 해당 시 400 반환
            ├── Supabase INSERT
            ├── Resend: 사용자 확인 메일 (브랜디드 HTML)
            │   └── 실패 시 → 어드민에게 발송 실패 알림 메일
            └── Resend: 어드민 알림 메일 (심플 텍스트)
                └── 실패 시 → 로그만 기록

서밋 성공 → router.push('/contact/thanks')
```

**원칙:**
- DB 저장 = 문의 접수 완료. 메일은 부가 기능
- 메일 발송 실패가 사용자 경험(thanks 페이지 이동)을 막지 않음
- 단, Supabase INSERT 실패 시에는 thanks 페이지 이동 안 함

---

## 2. 파일 구조

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              ← 신규: Route Handler (서버 전용)
│   └── contact/
│       └── thanks/
│           └── page.tsx              ← 신규: Thanks 페이지
├── components/
│   └── contact/
│       └── ContactForm.tsx           ← 수정: fetch('/api/contact')로 변경
└── emails/
    ├── ContactConfirmEmail.tsx       ← 신규: 사용자용 브랜디드 템플릿
    └── ContactAdminEmail.tsx         ← 신규: 어드민용 심플 템플릿
```

---

## 3. 환경변수

```env
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=onboarding@resend.dev        # 개발 중 임시. 도메인 확정 후 변경
CONTACT_ADMIN_EMAIL=geo-ascent@ascentnet.co.jp
BLOCKED_EMAIL_DOMAINS=sex.com,spam.com         # 쉼표 구분, 필요 시 추가
```

**도메인 확정 후 변경:**
- `RESEND_FROM_EMAIL` → `no-reply@ascentnet.co.jp` (또는 확정된 서브도메인)
- Resend 대시보드에서 도메인 SPF/DKIM 인증 필요

---

## 4. 메일 템플릿

### 사용자 확인 메일 (브랜디드 HTML)
- **발신:** `RESEND_FROM_EMAIL`
- **수신:** 사용자 입력 이메일
- **제목:** `【ASCENT/GEO】お問い合わせを受け付けました`
- **내용:**
  - 로고 (ASCENT/GEO)
  - "お問い合わせを受け付けました" 헤더
  - 접수 내용 요약 (회사명, 이름, 문의 내용)
  - "24時間以内にご連絡いたします" 메시지
  - CTA 버튼 (전화: 03-3527-3963)
  - 심플 푸터 (회사명)

### 어드민 알림 메일 (심플 텍스트)
- **발신:** `RESEND_FROM_EMAIL`
- **수신:** `CONTACT_ADMIN_EMAIL`
- **제목:** `【新規お問い合わせ】{회사명} / {이름}`
- **내용:** 전체 폼 데이터 + 접수 시각

### 어드민 발송 실패 알림 메일
- **발신:** `RESEND_FROM_EMAIL`
- **수신:** `CONTACT_ADMIN_EMAIL`
- **제목:** `【送信失敗】ユーザー確認メール未送信 - {회사명} / {이름}`
- **내용:**
  - ⚠️ 사용자 확인 메일 발송 실패 안내
  - 전체 폼 데이터 (회사, 역할, 이름, 전화, 이메일, 업종, 웹사이트, 현재 과제)
  - 접수 시각
  - 수동 연락 필요 안내

---

## 5. 에러 처리

| 상황 | 처리 |
|------|------|
| 차단 도메인 이메일 입력 | 400 반환 → 폼에 `「許可されていないメールドメインです。」` |
| Supabase INSERT 실패 | 500 반환 → 폼에 `「現在送信エラー状態です。しばらくしてから再度お試しいただくか、お電話ください：03-3527-3963」`, thanks 페이지 이동 안 함 |
| 사용자 확인 메일 발송 실패 | thanks 페이지 정상 이동 + 어드민에게 전체 폼 데이터 포함 발송 실패 알림 |
| 어드민 알림 메일 발송 실패 | 로그만 기록 |
| 네트워크 오류 | 폼에 동일 500 에러 메시지 표시 |

---

## 6. 도메인 차단 리스트

`BLOCKED_EMAIL_DOMAINS` 환경변수로 관리. 쉼표로 구분.

```ts
// route.ts
const blocked = process.env.BLOCKED_EMAIL_DOMAINS?.split(',') ?? []
const domain = email.split('@')[1]
if (blocked.includes(domain)) {
  return Response.json({ error: 'blocked_domain' }, { status: 400 })
}
```

---

## 7. Resend 설정 체크리스트 (구현 전 준비)

- [ ] resend.com 회원가입
- [ ] API Key 발급 → Vercel 환경변수 `RESEND_API_KEY` 등록
- [ ] (도메인 확정 후) Domains → SPF/DKIM DNS 레코드 추가 및 인증
- [ ] `RESEND_FROM_EMAIL` 환경변수 업데이트

---

## 8. Thanks 페이지

- **URL:** `/contact/thanks`
- **디자인:** `Design/thanks.png` 참고
- **내용:** 접수 완료 메시지, 다음 단계 안내 (受付完了 → 一次返信 → 30分無料相談), 전화 CTA
- **직접 URL 접근:** 폼 서밋 없이 접근 가능 (정적 페이지)
