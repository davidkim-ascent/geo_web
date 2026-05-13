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
