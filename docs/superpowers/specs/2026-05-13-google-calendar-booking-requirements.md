# Google Calendar Booking Integration — Requirements
Date: 2026-05-13 13:35

## 1. Goal

`カレンダー予約` 클릭 시 사용자를 Google Calendar의 예약 페이지로 이동시켜,
ASCENT GEO 온라인 상담 예약을 30분 단위로 받는다.

## 2. Scope

### In scope
- 사이트의 `カレンダー予約` CTA를 Google Calendar booking page로 연결
- 예약 제목, 설명, 위치, 시간 정책 설정
- Google Meet 링크 자동 생성
- 일본 시간대 기준 예약 운영
- 예약된 시간은 자동으로 불가 처리
- 사용자 메일 및 관리자 메일 발송 가능성 검토
- 기존 예약 버튼 UI를 공통 모듈로 분리해 다른 페이지에서도 재사용

### Out of scope
- 자체 예약 엔진 구현
- 결제 연동
- 다중 예약 타입 운영
- 관리자용 예약 관리 대시보드

## 3. Confirmed Requirements

### Booking entry
- 사용자가 사이트에서 `カレンダー予約`를 클릭하면 Google Calendar 예약 페이지로 이동한다.

### Calendar account
- 예약을 받을 Google 계정: `davidkim@ascentnet.co.jp`

### Booking metadata
- 제목: `Ascent GEO オンライン相談予約`
- 설명: 온라인 상담 안내 문구
- 위치: `オンライン`
- 회의 방식: Google Meet 자동 생성

### Availability rules
- 예약 단위: 30분
- 예약 가능 시간: 10:00 - 17:00
- 점심시간: 12:00 - 13:00 제외
- 토요일 제외
- 일요일 제외
- 일본 공휴일 제외
- 시간대: Japan Standard Time (`Asia/Tokyo`)
- 이미 예약이 들어간 시간은 자동으로 예약 불가로 표시

### Email behavior
- 예약 후 사용자에게 확인 메일이 가는지 확인한다.
- 예약 후 관리자에게 알림 메일이 가는지 확인한다.
- 커스텀 메일 문구가 가능한지 확인한다.

## 4. Free Plan Assumptions

Google Calendar 무료 버전 기준으로 시작한다.

무료 버전에서 기대하는 동작:
- 단일 예약 페이지 운영
- booking page 공유 또는 사이트 링크 연결
- 예약된 시간 자동 차단
- Google Meet 링크 자동 생성 가능 여부 확인

무료 버전에서 주의가 필요한 동작:
- 이메일 리마인더
- 여러 예약 타입 운영
- 여러 캘린더를 가로지르는 정교한 가용성 체크
- 일본 공휴일 자동 제외

## 5. UX / UI Requirements

- 예약 버튼은 이미 구현되어 있으므로 공통 모듈로 전환한다.
- 공통 모듈은 다른 페이지에서도 같은 라벨/동작으로 재사용 가능해야 한다.
- 버튼 클릭 시 새 탭 또는 동일 탭 이동 정책은 기존 사이트 UX와 맞춘다.
- 예약 진입 전에 사용자가 상담 시간, 시간대, 언어를 혼동하지 않도록 간단한 안내 문구를 표시한다.

## 6. Email Requirement Decision

Google Calendar 기본 기능만으로 가능한 부분과, 서비스 로직으로 보완해야 하는 부분을 분리한다.

### 기본 Google Calendar 알림으로 가능한 것
- 예약 완료 확인
- 캘린더 이벤트 생성

### 별도 구현이 필요할 수 있는 것
- 사용자용 커스텀 메일
- 관리자용 커스텀 메일
- 우리 서비스 브랜드에 맞는 메일 문구
- 예약 이벤트 후 내부 CRM/Slack 연동

결론:
- 기본 알림은 Google Calendar 기능을 우선 검토한다.
- 커스텀 메일이 필요하면 기존 `Resend` 패턴을 재사용하는 별도 서버 로직을 붙인다.

## 7. Holiday Handling Requirement

- 일본 공휴일은 예약 불가해야 한다.
- 이 요구는 단순 주말 제외보다 우선순위가 높다.
- Google Calendar 무료 기능만으로 공휴일 제외가 불충분하면, 별도 공휴일 캘린더 또는 보조 검증 로직이 필요하다.

## 8. Implementation Order

1. 예약 버튼 공통 모듈화
2. Google Calendar booking page 생성
3. 사이트 CTA를 booking page로 연결
4. 시간대/주말/점심시간/Meet 설정 검증
5. 일본 공휴일 제외 방식 확정
6. 메일 발송 방식 결정
7. 실제 예약 플로우 테스트

## 9. Open Questions

- Google Calendar 무료 버전에서 일본 공휴일 제외를 어디까지 보장할 수 있는가
- 기본 Google 알림으로 충분한가, 아니면 커스텀 메일이 필수인가
- 예약 버튼은 현재 CTA를 완전 교체할지, 아니면 보조 채널로 둘지
- 예약 페이지를 사이트 내 임베드할지, 외부 링크 이동으로 할지
