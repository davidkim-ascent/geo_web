# Dev Log

## 2026-05-12

### 컨택폼 이메일 시스템 구현

폼 이름의 의미를 분리해서 기록합니다.

- `contact_form`: 서비스 문의 / 상담 요청용 폼
- `download_form`: 화이트페이퍼 다운로드 요청용 폼

컨택폼과 화이트페이퍼 다운로드 폼은 완전 분리. 각각 독립된 Supabase 테이블에 저장.

---

#### 구현 내용

**메일 서비스: Resend + react-email**
- 스팸 방지: 도메인 확정 후 SPF/DKIM 인증 예정 (현재 `onboarding@resend.dev` 임시 발신)
- 차단 도메인 리스트: `BLOCKED_EMAIL_DOMAINS` 환경변수로 관리 (쉼표 구분)

**폼 서밋 흐름**
```
ContactForm → POST /api/contact
  ├── 차단 도메인 체크 (400)
  ├── Supabase INSERT → contact_submissions 테이블
  ├── Resend: 사용자 확인 메일 (브랜디드 HTML)
  │   └── 실패 시 → 어드민에게 발송 실패 알림 (전체 폼 데이터 포함)
  └── Resend: 어드민 알림 메일
→ router.push('/contact/thanks')
```

**신규 파일**
- `src/app/api/contact/route.ts` — Route Handler (서버 전용)
- `src/app/contact/thanks/page.tsx` — 접수 완료 페이지
- `src/emails/ContactConfirmEmail.tsx` — 사용자용 브랜디드 템플릿
- `src/emails/ContactAdminEmail.tsx` — 어드민용 심플 템플릿
- `supabase/migrations/002_contact_submissions.sql` — 컨택폼 전용 테이블

**수정 파일**
- `src/components/contact/ContactForm.tsx` — Supabase 직접 호출 제거, `/api/contact` POST로 변경, thanks 페이지 리다이렉트

**환경변수 (Vercel Production/Development 등록 완료)**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — 현재 `onboarding@resend.dev`, 도메인 확정 후 교체
- `CONTACT_ADMIN_EMAIL` — `geo-ascent@ascentnet.co.jp`
- `BLOCKED_EMAIL_DOMAINS`

---

#### 트러블슈팅 기록

| 문제 | 원인 | 해결 |
|------|------|------|
| Supabase INSERT 에러 `{}` | cookie 기반 `createClient()` Route Handler에서 동작 안 함 | `@supabase/supabase-js` 직접 import로 교체 |
| Supabase INSERT 에러 `PGRST205` | `whitepaper_downloads` 테이블 미존재 (마이그레이션 미적용) | `supabase db push`로 마이그레이션 적용 |
| 메일 렌더링 에러 `Failed to render React component` | `@react-email/render` 패키지 누락 | `npm install @react-email/render` |
| URL 검증 실패 | `www.domain.co.jp` 형식 불통과 | `https://` prefix 자동 보완 로직 추가 |

---

#### 도메인 확정 후 할 일

1. Resend 대시보드 → Domains → `ascentnet.co.jp` SPF/DKIM 인증
2. `RESEND_FROM_EMAIL` 환경변수 → `no-reply@ascentnet.co.jp` 으로 변경
3. Vercel 재배포
