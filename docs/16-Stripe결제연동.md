# 16 — Stripe 결제 연동 명세

> 목적: 구독제 SaaS 요금제(LIGHT/STANDARD/ADVANCED)를 Stripe로 결제 처리하기 위한 설계를 정의한다.
> 작성일: 2026-07-23
> 전제: Stripe 테스트 모드(샌드박스)에서 충분히 검증한 뒤 실제 결제로 전환한다. 이 문서는 브레인스토밍 단계 산출물이며, 다음 단계는 이 문서를 기반으로 한 구현계획(implementation plan) 작성이다.

---

## 1. 배경

현재 이 앱에는 결제/구독 개념이 전혀 없다. `organization`에는 plan이나 tier 필드가 없고, 관리자가 admin 화면에서 organization과 brand를 만들고 `brands.maxPrompts`, `brands.enabledModels` 값을 직접 손으로 입력하는 완전 수동 온보딩 방식이다.

`09-pricing.md`에는 원가 시뮬레이션 목적의 3단계 서비스 플랜(라이트/스탠다드/어드밴스)이 문서로만 정의되어 있었으나, 실제 판매가와 상세 제한값은 이번 브레인스토밍에서 다음과 같이 확정되었다(09-pricing.md의 25/50/100 프롬프트 max와는 LIGHT 프롬프트 상한이 20으로 다름 — 아래 표가 실판매 기준).

또한 일본 시장 특성상 **계좌이체(은행 입금)로 결제하는 고객이 계속 존재**하므로, Stripe 결제 고객과 관리자 수동 관리 고객이 하나의 시스템 안에서 공존해야 한다.

---

## 2. 목표

### 2.1 기능 목표

1. 신규 고객이 회원가입 직후 플랜(LIGHT/STANDARD/ADVANCED, 월/연)을 선택하고 Stripe Checkout으로 결제해 즉시 서비스를 시작할 수 있다.
2. 결제된 organization은 결제 상태에 따라 자동으로 plan 값과 사용 한도(프롬프트 수/모델 수/브랜드 수)가 반영된다.
3. 기존 관리자 수동 온보딩(계좌이체 고객)은 Stripe와 완전히 무관하게, 현재 방식 그대로 계속 동작한다.
4. 결제 실패/구독 해지 시 Stripe 고객은 유예기간 없이 즉시 서비스 접근이 차단되고, 이메일로 통지된다.
5. 고객이 플랜 기본 한도를 초과해 브랜드/프롬프트/모델을 더 쓰거나 Claude 모델을 추가로 쓰고 싶을 때, 관리자가 승인하면 add-on 과금이 자동으로 다음 청구에 반영된다.
6. 고객은 Stripe Customer Portal에서 카드 변경/구독 취소/플랜 변경을 직접 할 수 있다.
7. 일본 인보이스 제도(적격청구서 등 보존방식)에 대응하는 영수증을 발행한다.
8. 관리자는 admin 화면에서 Stripe 구독 organization을 조회하고, 강제 취소/플랜 변경/add-on 수량 조정을 할 수 있다.

### 2.2 비목표 (이번 스코프에서 제외)

- 사용량 기반 청구(run 횟수/API 호출량에 따른 후불 청구)는 다루지 않는다.
- 일회성 결제(리포트 단건 구매 등)는 다루지 않는다.

---

## 3. 조직(organization) 이원화

Stripe 도입 이후에도 organization은 두 갈래로 공존한다.

| 구분 | billingType | 결제 방식 | plan/한도 관리 | 접근 차단 정책 |
|---|---|---|---|---|
| Stripe 결제 조직 | `stripe` | Stripe Checkout 자동 정기결제 | webhook이 자동 반영, 관리자가 admin에서 재조정 가능 | 결제 실패/해지 시 유예 없이 즉시 차단 + 이메일 통지 |
| 수동(계좌이체) 조직 | `manual` (기본값) | 은행 계좌 직접 입금, Stripe 무관 | 관리자가 admin에서 완전 수동 설정 (기존 방식 그대로) | 입금 미확인 시 관리자가 기존 관리 기능(중지/삭제)으로 수동 조작 |

`organization` 테이블에 컬럼을 하나만 추가한다.

```
organization.billingType: text  -- 'stripe' | 'manual', 기본값 'manual'
```

기존에 이미 존재하는 모든 organization은 마이그레이션 시 `billingType = 'manual'`로 채워지며, 동작에 변화가 없다.

plan/구독 상태(어떤 plan을 쓰는지, active/past_due/canceled 등)는 `organization`에 별도로 캐시하지 않는다. `@better-auth/stripe` 플러그인이 자체 관리하는 `subscription` 테이블(`referenceId = organization.id`)을 단일 진실 원천(single source of truth)으로 삼아 조회한다. 이는 캐시 컬럼을 추가로 두면 webhook 처리 누락 시 실제 결제 상태와 화면 표시가 어긋나는 위험이 있기 때문이다.

---

## 4. 구현 방식: `@better-auth/stripe` 플러그인

인증에 이미 better-auth(v1.6.12) organization 플러그인을 사용 중이므로, 자체 Stripe SDK 연동을 새로 짜는 대신 공식 `@better-auth/stripe` 플러그인을 사용한다.

**채택 근거:**

- `customerType: "organization"` + `referenceId: organizationId` 설정으로 organization 단위 구독을 정식 지원한다 (개인 사용자 단위가 아니라 우리 구조에 정확히 맞음).
- Checkout Session 생성, webhook 처리(`checkout.session.completed`, `customer.subscription.created/updated/deleted`), Customer Portal 연동을 모두 내장 제공한다.
- plan마다 `priceId`(월)와 `annualDiscountPriceId`(연)를 따로 지정할 수 있어 월/연 이중가격 구조를 그대로 지원한다.
- `subscription` 테이블 필드/테이블명은 커스터마이즈 가능해 우리 스키마 관례와 충돌하지 않는다.
- 직접 구현 대비 webhook 서명 검증, 멱등성, Checkout 리다이렉트와 webhook 도착 순서 경쟁 조건 등 버그 위험이 큰 부분을 이미 검증된 코드로 대체한다.

**알려진 제약 (설계에 반영):**

- 하나의 `referenceId`(organization)당 활성 구독은 1개만 허용된다. → 우리 구조(organization당 plan 1개)와 정확히 일치하므로 문제 없음.
- 한 Checkout Session에 서로 다른 결제주기(월/연) 라인아이템을 섞을 수 없다. → plan 선택 시 월 또는 연 하나만 고른다는 전제와 일치.
- 최신 patch 버전(과거 organization 오귀속 버그 수정版) 사용을 확인한다.

---

## 5. 플랜 정의

| 플랜 | 월 결제액 | 연 결제액 (월액×10, 2개월 무료) | 프롬프트 상한 | 모델 수 상한 | 기본 제공 모델 | 브랜드(프로젝트) 상한 |
|---|---:|---:|---:|---:|---|---:|
| LIGHT | ¥29,800 | ¥298,000 | 20 | 4개 | ChatGPT, Gemini, Perplexity, Google AI Overviews | 1 |
| STANDARD | ¥39,800 | ¥398,000 | 50 | 6개 (필수 6개 모델 전체) | ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode, Copilot | 1 |
| ADVANCED | ¥79,800 | ¥798,000 | 100 | 6개 (필수 6개 모델 전체) | ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode, Copilot | 2 |

> STANDARD도 ADVANCED와 동일하게 필수 6개 모델 전체를 기본 제공하도록 변경(2026-07-28). ADVANCED와의 차이는 프롬프트 상한(50 vs 100)과 브랜드 상한(1 vs 2)뿐이다.

`maxModels`는 "몇 개까지 켤 수 있는가"라는 **개수 상한**일 뿐, "어떤 모델인지"를 plan이 영구적으로 고정하지 않는다. 관리자가 기존 `enabledModels` 체크박스 UI(6장)에서 필수 6개 모델(google ai overview, gemini, google ai mode, chatgpt, perplexity, copilot) 중 `maxModels`개 이하로 언제든 자유롭게 재선택할 수 있다 — 6.1절의 "plan 값은 강제 상한이 아니라 최초 기본값" 원칙과 동일하다. 다만 결제 직후 최초 1회는 무언가로 초기화해야 하므로, plan마다 `defaultModels`(초기 지정 모델 목록, 개수는 `maxModels`와 일치)를 별도로 둔다. Claude는 이 6개에 포함되지 않으며, 7장에서 정의하는 유료 add-on(on/off 스위치형)으로 별도 처리한다.

plan 정의는 DB가 아니라 코드 상수로 관리한다.

```
plans: [
  { name: "light",    priceId: <월 ¥29,800>, annualDiscountPriceId: <연 ¥298,000>,
    maxPrompts: 20,  maxModels: 4, maxBrands: 1,
    defaultModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity"] },
  { name: "standard", priceId: <월 ¥39,800>, annualDiscountPriceId: <연 ¥398,000>,
    maxPrompts: 50,  maxModels: 6, maxBrands: 1,
    defaultModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity", "copilot", "google-ai-mode"] },
  { name: "advanced", priceId: <월 ¥79,800>, annualDiscountPriceId: <연 ¥798,000>,
    maxPrompts: 100, maxModels: 6, maxBrands: 2,
    defaultModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity", "copilot", "google-ai-mode"] },
]
```

---

## 6. 한도 반영 대상 필드 (기존 필드 재사용)

플랜/add-on이 실제로 제어하는 값은 새 개념이 아니라 이미 존재하는 필드들이다.

- `brands.maxPrompts` (기존 필드, admin이 브랜드마다 수동 입력하던 값)
- `brands.enabledModels` (기존 필드, admin이 브랜드마다 체크박스로 편집하던 값) — plan 기본 모델 목록의 개수 상한(`maxModels`)뿐 아니라, Claude add-on on/off도 이 배열에 `claude` 항목을 추가/제거하는 방식으로 반영된다.
- organization당 brand 개수 — 현재 **완전 무제한**(어떤 제약도 없음)이며, 이번에 처음으로 상한 개념(`maxBrands`)을 도입한다.

### 6.1 결제 성공 시(신규 구독 시작)

organization 산하 brand(들)의 `maxPrompts`는 plan의 `maxPrompts` 값으로 **1회성 초기화**한다. `enabledModels`도 plan마다 정해둔 **초기 지정 모델 목록**(`defaultModels`, 개수는 `maxModels`와 일치 — 예: LIGHT는 4개)으로 초기화한다(Claude add-on을 결제와 함께 시작한 경우 `enabledModels`에 `claude`도 포함). `defaultModels`는 "몇 개까지 켤 수 있는가"(`maxModels`, 5장)와 별개로 "결제 직후 기본으로 어떤 모델을 켤 것인가"를 정하는 값이며, 이후 관리자는 기존 admin UI에서 필수 6개 중 원하는 조합으로, `maxModels` 이내에서 자유롭게 재조정할 수 있다 — plan 값은 강제 상한이 아니라 최초 기본값이다.

### 6.2 한도 강제(quota enforcement)

Stripe 조직에 한해, 다음 시점에 `effectiveMax*` 값을 초과하는 조작을 막는다.

- 브랜드 추가(`createAdditionalBrandFn`) 시 → 조직의 현재 brand 개수가 `effectiveMaxBrands` 이상이면 거부.
- brand의 `maxPrompts`/`enabledModels` 수정 시 → `effectiveMaxPrompts`/`effectiveMaxModels`를 초과하면 거부. `claude`는 add-on 폐지(7장)로 승인 체크 없이 자유롭게 추가 가능하며, 모델 수 상한(`effectiveMaxModels`) 카운트에서도 제외된다.

manual 조직은 지금처럼 완전 무제한을 유지한다(기존 동작 변화 없음).

> **2026-07-29 재정: 利用枠調整은 DB 값만 변경, Stripe 청구와 완전히 분리.** 관리자가 `/admin/subscriptions`의 利用枠調整에서 `maxPrompts`/`enabledModels`를 바꾸면, 위 한도 검증(`effectiveMax*` 초과 거부)은 그대로 적용되지만 **그 값을 Stripe add-on 수량으로 환산해 청구에 반영하는 동작은 하지 않는다.** 즉 관리자가 조정한 값은 고객의 실사용에 즉시 그대로 반영되지만(예: `maxPrompts`를 늘리면 그 브랜드는 즉시 그 개수만큼 프롬프트를 등록할 수 있음), Stripe 구독 금액은 바뀌지 않는다. prompts add-on의 Stripe 반영은 오직 고객이 플랜 선택/변경 화면에서 스스로 선택하는 경로(7.1절)로만 이루어진다. 이 값 조정으로 추가 청구가 필요하다고 판단되면 관리자가 Stripe 콘솔에서 수동으로 처리한다.

---

## 7. Add-on (플랜 기본 한도 초과분 과금)

> **2026-07-28 재정, 2026-07-29 흐름 재조정.** 표준 add-on은 prompts(프롬프트 수)만 남긴다. brand/models/claude add-on은 모두 폐지했다.
> - **models**: standard/advanced가 이미 필수 6개 모델 전체를 기본 제공하므로(5장) "모델 수를 추가로 구매"할 필요 자체가 없어짐.
> - **brand, claude**: 원가가 고객마다(브랜드 수, 프롬프트 수, 수집 주기 등에 따라) 크게 달라져 고정 단가×수량 방식이 맞지 않음. 필요할 때마다 영업/관리자가 **개별 협의로 금액을 정하고, Stripe 콘솔에서 수동으로** 구독에 반영한다(코드가 관여하지 않음).
> - `maxModels`/`maxBrands`(플랜 자체의 상한)는 그대로 유지되며, add-on으로 늘리는 표준 경로만 제거되었다.

### 7.1 prompts add-on의 진입점은 고객 셀프서비스로 한정(2026-07-29 재조정)

**변경 배경:** 처음에는 관리자의 利用枠調整이 초과분을 자동으로 Stripe add-on에 반영하는 구조였다. 이를 재검토해 **利用枠調整은 Stripe 청구와 완전히 분리**하고, prompts add-on의 Stripe 반영은 **고객이 플랜 선택/변경 화면에서 스스로 선택할 때만** 발생하도록 재조정한다.

**신규 흐름 (고객 셀프서비스):**
1. 고객이 `/app/billing/select-plan`(신규 가입) 또는 청구 관리 화면(`/app/settings/billing`, 11.1절)의 플랜 변경 UI에서 플랜을 고르면서, "追加プロンプト 10件" 옵션을 원하는 수량만큼 선택할 수 있다.
2. 화면에 표시되는 합계 금액(플랜 요금 + add-on 요금 × 수량)이 선택에 따라 즉시 갱신된다.
3. Checkout/플랜변경 API 호출 시 이 add-on 수량이 함께 Stripe 구독 라인아이템으로 반영된다.

**利用枠調整(관리자, 6.2절 재정의 참고)과의 관계:** 관리자가 利用枠調整에서 `maxPrompts`/`enabledModels`를 바꾸는 것은 **DB의 브랜드 값만 즉시 변경**한다 — Stripe 구독의 add-on 수량에는 더 이상 아무 영향을 주지 않는다. 관리자가 조정한 값에 대해 추가 청구가 필요하면 Stripe 콘솔에서 수동으로 처리한다(brand/claude add-on과 동일한 방식).

**Stripe 측 사전 준비:** prompts add-on을 Stripe Dashboard(콘솔)에서 Product + 수량 기반(quantity) Price로 등록한다. 가격 자체의 설정/변경은 Stripe 콘솔에서 이루어지며, 생성된 Price ID만 코드 상수에 입력한다.

```
addons: [
  { key: "prompts", priceId: <실제Price ID>, unitGrants: { maxPrompts: 10 } },  // ¥3,000/월 (10건 단위, 2026-07-28 확정)
]
```

**실효 한도 계산 (매번 조회, 캐시 없음):**

```
effectiveMaxBrands   = plan.maxBrands   // add-on 없음。브랜드 추가가 필요하면 개별 협의 + Stripe 콘솔 수동 처리
effectiveMaxPrompts  = plan.maxPrompts + (구독의 addon_prompts 라인아이템 수량 × 10)
effectiveMaxModels   = plan.maxModels   // add-on 없음。claude 활성화는 enabledModels 설정만으로 가능(개별 협의 후 관리자가 자유롭게 켬)
```

> 참고: `effectiveMaxPrompts`는 여전히 "브랜드에 실제로 설정 가능한 프롬프트 상한"의 검증 기준으로 쓰인다(利用枠調整으로 이 값을 초과하는 설정은 여전히 거부됨, 6.2절). 다만 이 상한을 늘리는 수단(add-on 수량)은 이제 고객의 셀프서비스 선택으로만 늘어난다.

---

## 8. Webhook 처리 흐름

`@better-auth/stripe` 플러그인이 webhook 서명 검증과 `subscription` 테이블 갱신(구독 생성/갱신/삭제 감지)을 자동 처리한다. 우리가 작성할 코드는 플러그인이 제공하는 `onEvent` 콜백 하나에 도메인 로직을 추가하는 것뿐이며, 별도 webhook 라우트를 새로 만들 필요는 없다.

```
Stripe Webhook 수신
        │
        ▼
better-auth stripe 플러그인이 subscription 테이블 자동 갱신 (서명검증/멱등성 포함)
        │
        ▼
   onEvent(event) 훅 — 우리 도메인 로직만 여기 작성
        │
   ├─ checkout.session.completed (최초 구독 시작)
   │    ├─ organization.billingType = 'stripe' 세팅
   │    └─ 산하 brand(들)의 maxPrompts/enabledModels를 plan 기본값으로 1회 세팅
   │
   ├─ invoice.payment_failed (결제 실패)
   │    └─ 이메일 발송: 결제실패+차단 통지 (직접 구현, 아래 9장)
   │        ※ 접근 차단 자체는 요청 시점에 subscription.status를 조회해 판정 —
   │          별도 DB 플래그 갱신 불필요
   │
   └─ customer.subscription.deleted (해지)
        └─ (선택) 해지 확인 통지
```

**멱등성 (확정):** `@better-auth/stripe` 플러그인 소스코드(`packages/stripe/src/routes.ts`)를 확인한 결과, 플러그인은 `event.id`를 전혀 추적하지 않으며 Stripe가 동일 이벤트를 중복 전송(재시도 등)하면 매번 다시 처리한다. 플러그인 자체의 `subscription` 테이블 갱신은 "Stripe 최신 값으로 덮어쓰기" 방식이라 중복 수신에 크게 영향받지 않지만, 우리가 `onEvent`에 추가하는 커스텀 로직(brand 초기화, 이메일 발송)은 실행할 때마다 그대로 반복 실행되어 **중복 이메일 발송, brand 설정 재초기화 같은 버그로 직결된다.**

따라서 `processed_webhook_events` 테이블(컬럼: `eventId` unique, `processedAt`)을 새로 추가하고, `onEvent` 콜백 진입 시 다음을 반드시 거친다: `eventId`로 insert 시도 → unique 제약 위반(이미 처리된 이벤트)이면 즉시 반환 → 아니면 커스텀 로직(6.1절 brand 초기화, 9장 이메일 발송 등) 실행. 이 멱등성 체크는 옵션이 아니라 필수 구현 항목이다.

---

## 9. 이메일 알림

Stripe 기본 기능과 역할을 분담해 구현 범위를 최소화한다.

| 이메일 | 발송 주체 |
|---|---|
| 결제 성공 / 구독 시작 확인 | **Stripe 기본 발송** (Dashboard 설정에서 활성화) |
| 정기 갱신 자동 영수증 | **Stripe 기본 발송** |
| 카드 거절 / 결제 재시도 안내 | **Stripe 기본 발송** (Smart Retries 등 Dashboard 설정으로 충분) |
| 서비스 접근 차단 통지 | **우리가 직접 구현** (기존 메일 인프라 재사용, `onEvent`의 `invoice.payment_failed`에서 트리거) |

Stripe 기본 알림은 "결제가 실패했다/카드를 확인해달라"는 결제 자체에 대한 안내다. "그래서 서비스 이용이 막혔다"는 사실은 우리 앱의 paywall 판정(13장)에서만 결정되는 정보라 Stripe가 대신 보낼 수 없다 — 이 통지만 우리가 직접 만든다.

---

## 10. Stripe Tax / 일본 인보이스 대응

일본 인보이스 제도(적격청구서 등 보존방식) 대응을 이번 스코프에 포함한다.

- Stripe에 사업자 등록번호(적격청구서발행사업자 등록번호, "T"로 시작)를 등록한다.
- 세율(8%/10%) 구분이 영수증/청구서에 표시되도록 Stripe Tax 설정을 진행한다.
- 이는 better-auth stripe 플러그인과 무관한 순수 Stripe Dashboard/Tax 설정 작업이며, 플러그인 동작과 충돌하지 않는다.

---

## 11. Customer Portal

Stripe가 제공하는 Customer Portal을 카드 변경/구독 취소용으로 그대로 연동한다. 플러그인이 제공하는 포털 세션 생성 헬퍼를 이용해, 고객용 앱 내 청구 관리 화면(`/app/settings/billing`)에 포털로 이동하는 링크(버튼)를 배치한다.

### 11.1 플랜 변경은 자체 UI로 구현(2026-07-29 재정)

당초 방침("자체 UI로 플랜변경 화면을 만들지 않는다")을 변경한다. 플랜 변경은 Stripe Portal로 위임하지 않고, `/app/settings/billing`에 **자체 플랜 변경 UI**를 만든다.

**동작:**
- 고객이 플랜을 선택하면 **즉시 적용**된다(Stripe Portal의 기본 동작인 "다음 결제일부터 적용"이 아님).
- Stripe API 호출 시 `proration_behavior: "create_prorations"`을 사용한다 — 변경 시점에 별도 청구/결제는 발생하지 않고, 차액(구 플랜 미사용분 크레딧 + 신 플랜 사용분 청구)이 **다음 정기 청구일의 인보이스에 합산**되어 나간다.
  - 예: 7/28 계약 시작(월 주기) → 7/30에 LIGHT→STANDARD로 변경 → 8/28 청구서에 STANDARD 정기요금 + 프로레이션 차액(구간별 일할 계산)이 함께 청구된다. 7/30 시점에는 카드 결제가 발생하지 않는다.
- 이 화면에서 신규 가입 시(7.1절)와 동일하게 "追加プロンプト 10件" add-on 수량도 함께 선택/변경할 수 있다.
- **다운그레이드 제한**: 하위 플랜으로 변경 시, 조직 내 브랜드의 현재 사용량(`maxPrompts`/모델 수)이 새 플랜의 기본값을 초과하면 변경을 거부한다(기존 4번 시나리오의 `getOrgBrandUsage` 검증을 고객 경로에도 동일 적용). 고객은 먼저 사용량을 낮추라는 안내를 받는다.

---

## 12. Admin 기능

기존 `apps/web/src/components/admin/customer-management.tsx`(고객 설정 화면)에는 이미 브랜드 추가, `maxPrompts`/`enabledModels` 편집, 브랜드/조직 정지·삭제 기능이 organization/brand 단위로 모두 구현되어 있다. Stripe 연동으로 이 화면에 **새로 추가되는 것은 결제/구독 관련 정보뿐**이다.

**신설:**

1. **조회만**: plan, 구독 상태(active/past_due/canceled 등), 다음 결제일, add-on 현황(prompts 수량 포함) — 지금까지 이 화면에 없던 정보.
2. **강제 취소**: 관리자가 구독을 강제로 취소.

> **2026-07-29 재정: 관리자에 의한 플랜 변경 기능은 제거한다.** 플랜 변경은 고객이 청구 관리 화면(11.1절)에서 직접 하는 것으로 일원화되며, 관리자 화면(`/admin/subscriptions`)에서는 현재 플랜(+add-on 수량)을 **조회만** 할 수 있다. 기존에 있던 관리자용 플랜 드롭다운/변경 버튼(`changeOrgPlanFn`)은 제거한다.

**기존 유지 (Stripe 청구와 분리):** 브랜드 추가, `maxPrompts`/`enabledModels` 편집(利用枠調整)은 계속 이 화면에서 관리자가 수행한다. 다만 6.2절에서 정한 대로, 이 조작은 이제 **DB 값만 즉시 변경**하고 Stripe 구독 금액에는 영향을 주지 않는다 — Claude 활성화도 승인 절차 없이 자유롭게 가능하다(7장). 추가 청구가 필요하면 관리자가 Stripe 콘솔에서 수동 처리한다.

**기존 재사용 (변경 없음):** 브랜드 생성(`createAdditionalBrandFn`), `maxPrompts`/`enabledModels` 편집(`updateBrandSettingsForCustomerFn`), 브랜드/조직 정지·삭제(`suspendOrganizationCustomerFn` 등)는 이미 있는 버튼/폼/서버함수를 그대로 사용한다. manual 조직은 이 화면을 지금과 완전히 동일하게 사용하며 변화가 없다.

---

## 13. 접근 차단(paywall) 판정

Stripe 조직에 한해, 요청 시점에 `subscription` 테이블에서 해당 organization의 최신 status를 조회한다. `active` 또는 `trialing`이 아니면(예: `past_due`, `canceled`, `unpaid`) 즉시 접근을 차단한다. 유예기간을 두지 않는다.

기존 `requireOrgAccess` 계열 정책 함수에 `billingType === 'stripe'`일 때만 이 판정 조건을 추가한다. manual 조직은 이 로직을 완전히 건너뛴다.

---

## 14. 열린 질문 (TBD)

**구현계획 착수를 막지 않는 TBD** — 코드/스키마 구조는 먼저 만들고 값만 나중에 채우면 된다:

1. 브랜드/Claude add-on의 단위 수량과 판매가(prompts add-on은 2026-07-28 확정 — 아래 참고). add-on 라인아이템 구조(7장)를 먼저 구현하고, 실제 가격은 Stripe Dashboard에서 Price를 등록할 때 정한다.

> ~~LIGHT/STANDARD/ADVANCED `defaultModels`, `maxBrands`, `maxModels`~~ — 5장에서 전부 확정 완료 (LIGHT: chatgpt/gemini/google-ai-overview/perplexity; STANDARD/ADVANCED: 필수 6개 전체(2026-07-28, STANDARD도 ADVANCED와 동일 구성으로 변경). `maxBrands`는 LIGHT/STANDARD 모두 1, ADVANCED 2. `maxModels`는 4/6/6).
>
> ~~models(모델 수) add-on~~ — 2026-07-28 폐지 확정. standard/advanced가 이미 필수 6개 모델을 기본 제공하므로 add-on으로 모델 수를 늘릴 필요가 없어짐(7장 참고).
>
> ~~prompts add-on 판매가~~ — 2026-07-28 확정. 10건 추가당 월 ¥3,000(원가 대비 마진 약 70~77%, 플랜별 활성 모델 수에 따라 다름).
>
> ~~brand/claude add-on~~ — 2026-07-28 폐지 확정. 원가가 고객마다 크게 달라 고정 단가×수량 방식이 부적합, 개별 협의 + Stripe 콘솔 수동 처리로 일원화(7장 참고). 표준 add-on은 prompts 하나만 남는다.
>
> ~~webhook 멱등성 보장 여부~~ — 8장에서 확정 완료. 플러그인은 자체 보장하지 않음이 소스코드로 확인되어, `processed_webhook_events` 테이블 추가가 필수 구현 항목으로 확정되었다.
>
> ~~prompts add-on의 진입점~~ — 2026-07-29 확정. 관리자 利用枠調整이 아니라, 고객이 플랜 선택/변경 화면에서 스스로 선택할 때만 Stripe에 반영(7.1절). 利用枠調整은 DB 값만 바꾸는 기능으로 분리(6.2절).
>
> ~~관리자에 의한 플랜 변경~~ — 2026-07-29 폐지 확정. 플랜 변경은 고객이 청구 관리 화면에서 직접 수행(11.1절), 관리자는 조회만 가능(12장).
>
> ~~고객 플랜 변경 시 청구 방식~~ — 2026-07-29 확정. `proration_behavior: "create_prorations"` — 변경은 즉시 적용, 차액은 다음 정기 청구일에 합산(11.1절). 다운그레이드는 사용량이 새 플랜 기준 이내여야 허용(기존 4번 시나리오 검증을 고객 경로에도 적용).
>
> ~~고객 셀프서비스 플랜변경 + prompts add-on 선택 UI~~ — 2026-07-29 구현 완료(브랜치 `worktree-stripe-billing`). `/app/billing/select-plan`(신규가입)과 `/app/settings/billing`(변경)에서 고객이 직접 add-on 수량을 선택 → `startCheckoutFn`/`changePlanImmediatelyFn`이 각각 Checkout metadata·`setAddonQuantity`로 Stripe에 반영. 관리자 플랜변경 기능(`changeOrgPlanFn`)은 완전히 제거, `/admin/subscriptions`는 현재 플랜·add-on 수량 조회만 가능. 利用枠調整(`updateOrgUsageAndAddonsFn`)은 Stripe API를 전혀 호출하지 않는 순수 DB 갱신 함수로 축소.

---

## 15. 다음 단계

이 문서를 기반으로 `writing-plans` 스킬을 통해 구현계획(implementation plan)을 작성한다. 구현은 Stripe 테스트 모드(샌드박스) 키로 전 과정을 검증한 뒤 실제 키로 전환하는 것을 전제로 한다.

### 15.1 릴리스 전략: Stripe 지연이 서비스 오픈을 막지 않도록

계좌이체(manual) 온보딩은 **이미 지금 이 순간에도 완전히 준비되어 동작 중인 기존 기능**이다(관리자가 admin 화면에서 organization/brand를 만드는 기존 방식, 12장) — 이번 Stripe 작업의 일부로 새로 만들거나 먼저 merge해야 할 대상이 아니다. 따라서 서비스 오픈은 Stripe 연동 완료 여부와 애초에 무관하며, Stripe 작업이 지연되어도 오픈 일정에 전혀 영향을 주지 않는다. 이 전제를 지키기 위해 다음 원칙으로 작업한다.

1. **격리**: Stripe 연동 전체 작업(3장의 `billingType` 컬럼 추가부터 webhook, add-on, Customer Portal까지)은 별도 feature 브랜치에서 진행하고, 완전히 검증된 뒤에만 `main`에 merge한다. 미완성 Stripe 코드가 `main`(배포 대상)에 걸쳐 있는 상태를 만들지 않는다.
2. **기존 경로 불변 확인**: `billingType` 컬럼은 기존 organization을 전부 `manual`로 채우고, manual 조직의 동작 경로에는 이번 작업으로 어떤 조건 분기도 추가되지 않는다(3장, 13장) — merge 이전과 이후에 계좌이체 온보딩 동작이 100% 동일함을 구현계획의 검증 단계에서 명시적으로 확인한다.
3. **Stripe 본체는 통째로 하나의 배포 단위**: 코드 안전성을 위해 Task를 여러 개로 쪼개더라도, `main`에 merge하는 시점은 Stripe 연동 전체(플러그인 연동, webhook, add-on, Customer Portal, Stripe Tax)가 테스트 모드에서 충분히 검증된 이후 한 번으로 묶는다. 이 시점이 언제가 되든 계좌이체 온보딩 서비스 오픈과는 무관하게 진행된다.

### 15.2 검증 환경 구성

로컬 개발 환경 + [Stripe CLI](https://stripe.com/docs/stripe-cli)의 `stripe listen`으로 webhook을 로컬로 포워딩해 검증한다. 별도 스테이징 배포(Render 등)는 만들지 않는다.

```
로컬 머신
  apps/web 로컬 실행 (localhost:3000)
  apps/worker 로컬 실행
  로컬/개발용 Postgres — feature 브랜치 마이그레이션(billingType, processed_webhook_events)을 여기서만 적용

Stripe CLI
  stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
  (실제 webhook 서명 검증을 포함해 정말로 Stripe가 보내는 이벤트로 검증됨)

Stripe 테스트 모드
  테스트 키 + 콘솔에 등록한 테스트용 Product/Price(plan 3종 + add-on 4종)
  테스트 카드 번호로 Checkout 전 과정 실행
```

**이 구성으로 검증되는 것**: 회원가입→plan 선택→Checkout→webhook 수신→`onEvent` 도메인 로직(billingType 세팅, brand 초기화, 멱등성 체크)→접근 차단 판정→Customer Portal 이동까지 전체 플로우를 실제 Stripe 테스트 이벤트로 오간다. `stripe trigger`로 결제실패/해지 이벤트를 인위적으로 발생시켜 9장의 이메일 발송과 13장의 paywall도 검증한다.

**이 구성으로 검증되지 않는 것 (구현계획의 별도 확인 단계 필요)**: 실제 배포 환경(Render)의 환경변수 설정, 프로덕션 도메인으로의 webhook 엔드포인트 등록, 프로덕션 DB에 대한 마이그레이션 적용 자체는 로컬 검증 범위 밖이다. "로컬에서 통과했다"가 "배포 환경에서도 그대로 동작한다"를 보장하지 않으므로, `main` merge 및 실배포 직후에는 테스트 키 → 실제 키 전환과 webhook 엔드포인트 재등록을 별도 체크리스트로 확인해야 한다(구현계획에 명시).
