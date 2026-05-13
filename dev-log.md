## 2026-05-14 — 모바일 뷰 잘림 버그 목록 (수정 예정)

### 페이지별 이슈
- **인덱스**: 히어로 h1 잘림, 햄버거 메뉴 화면 벗어남, GEO Framework 5개 요소 가로 잘림, GEO Lab h2 잘림
- **why-ascent**: 문제 없음
- **framework**: 히어로 h1 크게 잘림, 햄버거 메뉴 안 보임, 5페이즈 히토츠 카피 잘림, 5각형 다이어그램 → 모바일에서 숨김 처리 필요
- **services**: 문제 없음
- **geo lab**: 문제 없음
- **개별 블로그 페이지**: 목차(TOC)가 본문을 덮음 (Design 폴더 스크린샷 참조)
- **contact / thanks / whitepaper / downloaded**: 문제 없음

## 2026-05-14 — 모바일 레이아웃 버그 수정
- CTASection 모바일 패딩 중첩 수정: `px-10 p-12` → `px-4 sm:px-6 lg:px-10` / `p-6 sm:p-8 lg:p-12`
- ct-hero-wrap breakpoint 통일: 900px 이하에서 `padding: 0 20px` 적용 (기존 768px만 처리하여 900~768px 구간 오버플로우 발생)
- 768px 중복 padding 선언 제거

## 2026-05-13 23:59 — ⭐ 레이아웃 디자인 완료 버전
- **롤백 기준점** commit: `4449d8c`
- 완료 범위: 전 페이지 히로 섹션 통일(배경 애니메이션, h1 타이포, 상단 여백), 네비 링크 정상화, whitepaper downloaded 페이지, ai-overview 페이지, services/lab/why-ascent/framework 신규 제작
- 롤백 명령: `git checkout 4449d8c` (확인용) 또는 `git revert`

## 2026-05-13 20:30
- `/whitepaper/downloaded` 페이지 신규 제작: 다운로드 완료 화면. 다크 배경(radial gradient + grid + scan line 애니메이션), 상태 스탬프, TicketId(client 랜덤 ID), 진행바 100% 애니메이션, 대체 링크, 전화 컨택 블록.
- `DownloadForm.tsx` 리다이렉트 연결: 제출 성공 시 `setSubmitted(true)` 인라인 성공 표시 → `router.push('/whitepaper/downloaded')`로 교체.

## 2026-05-13 18:10
- Services 페이지 신규 제작: `/services` 라우트 추가. SubHero(다크 배경 + ContactForm), 4서비스 개요 quad, 4개 서비스 섹션(AuditVis/GapVis/ContentVis/MonitorVis 시각화 컴포넌트 포함), Packages(2 플랜), FAQ(아코디언), CTA까지 완성. `Services.html` 원본 구조 기준.

## 2026-05-13 16:44
- Framework `fw-loop` 원본 재보정: `fw-loop` 컨테이너를 원본 HTML 좌표/크기로 되돌리고 중앙 링과 텍스트를 인라인 스타일로 정리해 서버 빌드 호환성을 유지함

## 2026-05-13 16:39
- Framework 원본 재정렬: 공통 ContactForm을 외곽 프레임 없이 직접 사용하고, 5フェーズ 루프를 원본 좌표형 다이어그램으로 되돌리며, 단계별 브레이크다운 카드를 원본형 시각 블록으로 재구성함

## 2026-05-13 16:32
- Framework 독립 페이지 추가: `Framework.html` 원본 흐름을 바탕으로 히어로, 5단계 루프, 단계별 브레이크다운, FAQ, 공통 CTA를 구현하고 상단/푸터의 Framework 링크를 `/framework`로 연결함

## 2026-05-13 16:25
- Why Ascent 히로 정리: breadcrumb(Home / Why Ascent) 삭제하고 상단 여백을 더 줄여 첫 화면 진입 높이를 압축함

## 2026-05-13 16:22
- Why Ascent 세부 조정: 히로의 24H 리플레이 텍스트 제거 및 높이 축소, GEO Framework 하단 라인/여백 축소, CTA를 홈의 공통 CTASection으로 교체함

## 2026-05-13 16:30
- 캘린더 예약 링크 프로덕션 미반영 수정: NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL 환경변수를 Vercel 프로덕션에 등록 후 재배포

## 2026-05-13 16:15
- Why Ascent 원본 재정렬: 실제 HTML 원본 구조에 맞춰 독립 페이지를 히어로, 특허, Listening Mind, 4본柱, CTA 순으로 재구성하고 공통 ContactForm은 그대로 재사용함

## 2026-05-13 16:04
- Why Ascent 독립 페이지 추가: 상단/하단 공통 메뉴의 Why Ascent 링크를 `/why-ascent`로 연결하고, index의 공통 ContactForm을 그대로 재사용한 히어로 페이지를 구현함

## 2026-05-13 16:10
- 프라이버시 폴리시 전면 개정: 제1조~제9조 정식 방침으로 교체, 박스 레이아웃 → 바디 텍스트 레이아웃 변경, 연락처 privacy@ascentnet.co.jp 반영, 프로덕션 배포 완료

## 2026-05-13 14:32
- 예약 CTA 문구를 일본어로 통일: `無料相談予約（Googleカレンダー）`로 홈/컨택트/푸터/스펙 문서 전체 반영

## 2026-05-13 14:28
- Google Calendar 예약 CTA를 새 탭으로 열도록 변경: 공통 링크 속성 헬퍼 추가 후 홈/컨택트/푸터 예약 진입점에 적용

## 2026-05-13 14:27
- Google Calendar 예약 흐름 단순화: `/calendar-booking` 중간 페이지 삭제, CTA를 Google 예약 URL 직접 연결로 전환

## 2026-05-13 14:23
- /contact 예약 카드 설명에서 잔여 `Zoom` 문구 제거, Google Calendar 예약 흐름과 카피 일치시킴

## 2026-05-13 13:50
- Google Calendar 예약 URL 환경변수 연결 완료: `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` 반영 후 `/calendar-booking` 리다이렉트 경로 빌드 검증 완료

## 2026-05-13 13:45
- `/calendar-booking` 페이지 보강: 예약 요약 카드(시간/점심/주말/공휴일/Meet) 추가, booking config 요약 헬퍼 분리, 버튼/링크 흐름 재검증

## 2026-05-13 13:35
- Google Calendar 예약 링크 구조 조정: footer를 텍스트 링크로 롤백하고, 예약 CTA는 `/calendar-booking` 내부 경로로 고정해 실제 Google URL 리다이렉트가 가능하도록 변경

## 2026-05-13 13:35
- Google Calendar 예약 연동 요건정의 문서 추가: 무료 버전 기준, JST 시간대, 주말/점심시간/공휴일 제외, Meet 자동 생성, 메일 발송 검토 항목 정리

## 2026-05-13 13:35
- Google Calendar 예약 연동 1차 구현: 예약 설정 상수/공통 버튼 모듈 추가, 홈/푸터/컨택트 CTA를 예약 링크로 연결, 예약 설정 테스트 추가

## 2026-05-13 13:23
- /contact 전화 상담 번호/시간 줄을 왼쪽 정렬로 조정해 카드 본문과 정렬 통일

## 2026-05-13 13:22
- /contact 3개 채널 텍스트 폰트 크기 공통 +2px 조정

## 2026-05-13 13:22
- /contact 전화번호를 텍스트로 변경해 링크 제거

## 2026-05-13 13:21
- /contact 전화 상담 아이콘을 카드 아이콘 톤에 맞춰 통일, 블루 강조 제거

## 2026-05-13 13:21
- /contact 전화 상담 영역 디자인 보강: 전화기 아이콘 추가 및 텍스트 블록 카드화

## 2026-05-13 13:20
- /contact 레이아웃 조정: 전화 상담을 카드에서 텍스트로 분리하고, 캘린더/자료다운로드 아래로 이동

## 2026-05-13 13:17
- 개발 서버 실행: `npm run dev`로 Next.js dev 서버 기동, `http://localhost:3000` 200 응답 확인

## 2026-05-12 (작업)
- Contact 전용 페이지 `/contact/page.tsx` 신규 생성
  - 다크 Hero 섹션 (전화/캘린더/자료 채널 카드 + 공통 ContactForm 삽입)
  - FAQ accordion 섹션 (10개 항목)
  - globals.css에 `.ct-hero`, `.ct-faq` 등 Contact 전용 CSS 추가
- Header Nav 및 CTA 버튼 링크: `#contact` → `/contact` 로 변경
- 홈 page.tsx Hero/CTA 버튼 링크도 `/contact` 로 변경
