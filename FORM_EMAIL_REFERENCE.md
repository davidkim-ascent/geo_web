# Form & Email Reference

이 문서는 현재 프로젝트의 폼 검증과 메일 전송 흐름을 다른 프로젝트에서 참고할 수 있도록 정리한 메모다.

## 1. 전체 구조

현재 구현은 크게 두 갈래다.

- **Contact form**
  - 클라이언트에서 입력 검증
  - 서버 API에서 추가 검증
  - Supabase 저장
  - Resend로 사용자 확인 메일 + 관리자 알림 메일 발송
  - 완료 페이지로 이동

- **Whitepaper download form**
  - 클라이언트에서 입력 검증
  - Supabase 저장
  - 완료 페이지로 이동
  - 현재는 별도의 메일 발송은 없음

## 2. 관련 파일

### Contact

- [src/components/contact/ContactForm.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/contact/ContactForm.tsx)
- [src/app/api/contact/route.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/app/api/contact/route.ts)
- [src/lib/contact-blocking.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/contact-blocking.ts)
- [src/emails/ContactConfirmEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactConfirmEmail.tsx)
- [src/emails/ContactAdminEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactAdminEmail.tsx)

### Whitepaper

- [src/components/whitepaper/DownloadForm.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/whitepaper/DownloadForm.tsx)

### 완료 페이지 접근 제어

- [src/lib/completion-access.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/completion-access.ts)
- [src/lib/completion-access.client.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/completion-access.client.ts)
- [src/components/access/DeniedAccess.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/access/DeniedAccess.tsx)

## 3. Contact 폼 검증

`ContactForm`은 `react-hook-form + zodResolver + zod` 조합으로 검증한다.

검증 규칙:

- `company`: 필수
- `role`: 필수
- `name`: 필수
- `phone`: 정규식 검사
  - `/^[\d\-\+\(\)\s]{10,15}$/`
  - 예시 에러 메시지: `正しい電話番号を入力してください（例：03-0000-0000）`
- `email`: 이메일 형식
- `industry`: 필수 select
- `website`: `website-validation` 헬퍼로 검사
  - URL 또는 `準備中` 허용
- `challenge`: 최소 10자
- `human`: 체크박스 필수
- `agree`: 체크박스 필수

추가로 이메일은 클라이언트에서 `blockedEmailDomains`와 비교해 즉시 경고한다.

핵심 구현:

- `useWatch`로 이메일 값 감시
- `getBlockedEmailDomainError()`로 도메인 차단 여부 계산
- 차단 시 `setError('email', ...)`
- 허용 도메인으로 바뀌면 `clearErrors('email')`

참고 파일:

- [src/components/contact/ContactForm.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/contact/ContactForm.tsx)
- [src/lib/contact-blocking.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/contact-blocking.ts)

## 4. Whitepaper 폼 검증

`DownloadForm`도 같은 패턴이다.

검증 규칙은 Contact와 거의 동일하다.

- `company`, `role`, `name`, `phone`, `email`, `industry`, `website`, `challenge`: 필수 또는 형식 검사
- `human`, `agree`: 체크박스 필수
- 이메일 차단 도메인 체크도 동일

차이점:

- 제출 후 이동 경로가 `/whitepaper/downloaded`
- 버튼 문구가 `↓ ダウンロード（48 ページ · 12.4 MB）`
- 현재는 메일을 보내지 않고 Supabase에만 저장한다

참고 파일:

- [src/components/whitepaper/DownloadForm.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/whitepaper/DownloadForm.tsx)

## 5. 서버 API 검증과 메일 발송

Contact는 서버에서 한 번 더 검증한다.

### 서버 검증 순서

1. JSON body 파싱
2. 이메일 도메인 차단 검사
3. 관리자 이메일 설정 확인
4. Supabase에 `contact_submissions` 저장
5. 사용자 확인 메일 발송
6. 관리자 알림 메일 발송
7. 완료 쿠키 세팅 후 `{ ok: true }` 반환

### 환경 변수

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_ADMIN_EMAIL`
- `BLOCKED_EMAIL_DOMAINS`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 실패 처리

- JSON 파싱 실패: `400 invalid_request`
- 차단 도메인: `400 blocked_domain`
- 관리자 이메일 미설정: `500 server_config_error`
- Supabase insert 실패: `500 db_error`
- 확인 메일 실패:
  - 관리자에게 fallback 메일을 추가 발송
  - 최종 응답 자체는 정상 완료 흐름 유지
- 관리자 메일 실패:
  - 로그만 남기고 흐름은 유지

참고 파일:

- [src/app/api/contact/route.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/app/api/contact/route.ts)
- [src/emails/ContactConfirmEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactConfirmEmail.tsx)
- [src/emails/ContactAdminEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactAdminEmail.tsx)

## 6. 차단 도메인 로직

차단 로직은 단순하고 재사용하기 쉽게 분리돼 있다.

### 파일

- [src/lib/contact-blocking.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/contact-blocking.ts)

### 동작

- 이메일 주소에서 `@` 뒤 도메인을 추출
- 소문자화
- 뒤쪽 점 제거
- 차단 목록과 정확히 일치하거나 하위 도메인이면 차단

예:

- `spam.com` 차단
- `mail.spam.com`도 차단

차단 메시지:

- `許可されていないメールドメインです。`

## 7. Email 템플릿

Resend는 React Email 템플릿으로 보낸다.

### 관리자 메일

- `ContactAdminEmail`
- 내용:
  - 회사명
  - 역할
  - 이름
  - 전화번호
  - 이메일
  - 업종
  - 웹사이트
  - 현재 과제
  - 접수 시각
- `isFallback: true`일 때는 사용자 확인 메일 실패 경고를 추가 표시

### 사용자 확인 메일

- `ContactConfirmEmail`
- 내용:
  - 접수 완료 안내
  - 입력값 요약
  - 전화 문의 버튼

참고 파일:

- [src/emails/ContactAdminEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactAdminEmail.tsx)
- [src/emails/ContactConfirmEmail.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/emails/ContactConfirmEmail.tsx)

## 8. 완료 페이지 접근 제어

현재 완료 페이지는 직접 URL 접근을 막고, 정상 플로우에서만 열리도록 쿠키 기반으로 제어한다.

- Contact 완료 페이지:
  - `/contact/thanks`
- Whitepaper 완료 페이지:
  - `/whitepaper/downloaded`

### 동작

- 폼 성공 시 쿠키를 세팅
- 완료 페이지 서버 컴포넌트가 쿠키를 확인
- 쿠키가 없으면 일본어 차단 화면 표시
- 쿠키가 있으면 정상 완료 화면 표시

### 쿠키 이름

- `ascent_contact_thanks`
- `ascent_whitepaper_downloaded`

참고 파일:

- [src/lib/completion-access.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/completion-access.ts)
- [src/lib/completion-access.client.ts](/Users/jkim/Desktop/Antigravity/geo-web/src/lib/completion-access.client.ts)
- [src/components/access/DeniedAccess.tsx](/Users/jkim/Desktop/Antigravity/geo-web/src/components/access/DeniedAccess.tsx)

## 9. 다른 프로젝트로 옮길 때의 권장 분리

이 구조를 재사용하려면 다음처럼 분리하면 좋다.

- `form schema`
  - zod schema
  - 클라이언트 검증
- `email policy`
  - blocked domains
  - domain normalization
- `server submit handler`
  - insert
  - email send
  - fallback handling
- `email templates`
  - admin template
  - confirmation template
- `completion guard`
  - success cookie
  - direct access deny page

## 10. 참고 메모

- Contact는 **메일 발송이 있는 완전한 제출 흐름**이다.
- Whitepaper는 **검증 + DB 저장 + 완료 페이지 전환** 흐름이다.
- 현재 whitepaper 쪽은 메일 발송 로직이 없다. 다른 프로젝트에 옮길 때 메일이 필요하면 별도 서버 핸들러를 추가해야 한다.
