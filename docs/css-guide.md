# CSS Guide

이 프로젝트의 전역 스타일 기준 문서입니다.  
새 페이지를 만들거나 기존 페이지를 수정할 때는 아래 규칙을 우선 따릅니다.

## 1. Typography

전역 토큰은 `src/app/globals.css`의 `:root` 값을 사용합니다.

- Display: `--fs-display`
- Section title: `--fs-section-title`
- H3: `--fs-h3`
- H4: `--fs-h4`
- Body: `--fs-body`
- Body small: `--fs-body-sm`
- Label: `--fs-label`
- Label small: `--fs-label-sm`

권장 공통 클래스:

- `ui-section-title`
- `ui-section-title-dark`
- `ui-section-kicker`
- `ui-section-kicker-dark`
- `ui-section-label-title`
- `ui-section-label-title-dark`
- `ui-body-copy`
- `ui-body-copy-dark`
- `ui-body-copy-sm`
- `ui-mono`

### 색상 기준

- 밝은 배경 본문: `--fg`
- 어두운 배경 본문: `--fg-light` 또는 `--paper`
- 보조 텍스트: `--muted`
- 어두운 배경 보조 텍스트: `--muted-2`
- 강조색: `--accent`

## 2. Hover Rules

전역 hover 규칙은 단순하게 유지합니다.

- 밝은 배경 카드: 살짝 올라가고 그림자가 생기는 hover
- 밝은 배경 버튼: 파란색 배경 + 흰 글자
- 어두운 배경 버튼: 파란색 배경 + 흰 글자
- 링크형 요소: 색상 변화 또는 간격 변화만 허용

권장 공통 클래스:

- `card-hover`
- `card-hover-dark`
- `link-arrow`
- `ui-button-base`
- `ui-button-outline`
- `ui-cta-button`
- `ui-cta-button-outline`

### 금지

- 페이지마다 다른 hover 색상을 임의 추가하지 않기
- 같은 버튼에 중복 hover 규칙을 여러 군데에서 덮어쓰지 않기
- 밝은 배경과 어두운 배경에서 hover 기준을 따로 만들지 않기

## 3. Header / Footer

상단 메뉴와 하단 푸터는 같은 전역 레이어를 사용합니다.

### Header

사용 클래스:

- `ui-header-shell`
- `ui-header-brand`
- `ui-header-nav-link`
- `ui-header-cta`
- `ui-header-cta-arrow`

### Footer

사용 클래스:

- `ui-footer-shell`
- `ui-footer-brand`
- `ui-footer-heading`
- `ui-footer-link`
- `ui-footer-meta`

### 기준

- 헤더와 푸터의 텍스트 크기와 색상은 각 컴포넌트에서 직접 지정하지 말고 전역 클래스를 사용합니다.
- 링크 hover 색상은 전역 규칙을 유지합니다.
- 다른 페이지에서 동일한 구조를 쓰는 경우, 같은 클래스를 재사용합니다.

## 4. CTA Strip

하단 CTA 영역은 전역 그리드와 버튼 규칙을 사용합니다.

### Grid

- 기본 구조: `ui-cta-grid`
- 데스크톱 비율: `6:4` 성격의 2컬럼
- 모바일: 1컬럼 스택

전역 토큰:

- `--ui-cta-left`
- `--ui-cta-right`
- `--ui-cta-gap`

### Buttons

공통 버튼 클래스:

- `ui-cta-actions`
- `ui-cta-button`
- `ui-cta-button-outline`

권장 기준:

- 버튼 폭: 부모 열에 맞춰 `width: 100%`
- 버튼 라운드: 더 부드러운 라운드 사용
- 버튼 패딩: 전역 토큰 기준
- 버튼 hover: 파란색 배경 + 흰 글자

### 금지

- 버튼 폭을 개별 페이지에서 임의로 `160%` 같은 값으로 키우지 않기
- `width`, `min-width`, `max-width`를 페이지마다 따로 조합하지 않기
- CTA 내부 버튼을 인라인 스타일로 다시 정의하지 않기

## 5. Button Components

공통 버튼은 `src/components/ui/button.tsx`의 `Button`을 우선 사용합니다.

사용 가능한 전역 스타일:

- `ui-button-base`
- `ui-button-outline`

### 기준

- 기본 버튼은 검정 배경, 흰 글자, 파란 hover를 사용합니다.
- outline 버튼은 투명 배경, 기본 텍스트색, 파란 hover를 사용합니다.
- 새 버튼 variant를 만들기 전에, 기존 전역 버튼으로 해결 가능한지 먼저 확인합니다.

## 6. Spacing / Radius

전역 토큰 기준으로 통일합니다.

- 카드 라운드: `--ui-radius-card`
- 필드 라운드: `--ui-radius-field`
- pill 라운드: `--ui-radius-pill`
- CTA 라운드: `--ui-cta-button-radius`

### 권장

- 섹션 내부 간격은 먼저 전역 토큰이나 기존 페이지 패턴을 확인합니다.
- 카드, 버튼, 입력창은 비슷한 라운드 체계를 유지합니다.

## 7. Implementation Rule

새 페이지 작업 시 순서는 아래처럼 합니다.

1. 전역 토큰을 먼저 확인한다.
2. 공통 클래스로 해결 가능한지 본다.
3. 페이지 전용 스타일은 정말 필요한 경우에만 최소한으로 추가한다.
4. hover, 색상, 라운드는 같은 패턴을 반복하지 않도록 통합한다.

## 8. Current Source of Truth

- 토큰과 공통 클래스: `src/app/globals.css`
- Header: `src/components/layout/Header.tsx`
- Footer: `src/components/layout/Footer.tsx`
- Page-level CTA usage: `src/app/page.tsx`
- Shared Button: `src/components/ui/button.tsx`

