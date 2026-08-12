# 18 — Admin 구독관리 메뉴 분리 설계

> 목적: `17-Stripe결제연동_구현계획.md` Task 9(Admin add-on 조정 UI)에서 발견된 문제를 계기로, admin의 Stripe 관련 기능을 별도 메뉴로 분리하는 설계.
> 작성일: 2026-07-27
> 전제: 이 문서는 브레인스토밍 단계 산출물이며, 다음 단계는 `writing-plans` 스킬로 구현계획을 작성하는 것이다.

---

## 1. 배경

`17-Stripe결제연동_구현계획.md`의 Task 9는 기존 admin 고객관리 화면(`apps/web/src/components/admin/customer-management.tsx`)의 `ExpandedPanel`에 `billingType === "stripe"`일 때만 보이는 "Add-on 数量調整" 섹션을 추가했다. 이 Task는 이미 구현·커밋되어 있다.

2026-07-27, 로컬에서 Stripe 셀프서비스 가입 → 결제 테스트 중 실제 Stripe 대시보드에서 해당 고객을 환付(refund)했을 때, DB의 `organization_profile.billing_type`과 `subscription.status`가 전혀 갱신되지 않는 것을 확인했다(`handleStripeWebhookEvent`가 `checkout.session.completed`와 `invoice.payment_failed`만 처리하고 그 외 이벤트는 무시하기 때문). 이를 계기로 admin의 Stripe 관련 기능을 점검한 결과 다음이 드러났다:

1. Task 9가 구현한 `AddonQuantityControl`은 `currentQuantity={0}`이 하드코딩되어 있다(계획서 Step 5의 예시 코드 자체가 그렇게 작성되어 있었다) — 실제 Stripe subscription item 수량을 조회하지 않고 항상 0으로 표시한다.
2. Add-on 수량 조정(`updateOrgAddonQuantityFn` → `setAddonQuantity`)은 Stripe subscription item만 갱신하고, `brands.maxPrompts`/`brands.enabledModels`(실제 시스템이 적용하는 제한값)는 전혀 건드리지 않는다. 즉 관리者가 Add-on으로 "프롬프트 추가 5개"를 저장해도 청구만 늘고 고객이 실제로 쓸 수 있는 프롬프트 수는 늘지 않는다 — 별도로 브랜드 설정에서 손으로 맞춰야 한다.
3. 고객관리 목록 테이블에는 Stripe 관련 정보(plan, 구독 상태, 다음 결제일)가 전혀 표시되지 않는다. `billingType`은 데이터로는 있지만 화면에 뱃지 등으로 드러나지 않는다.
4. `handleStripeWebhookEvent`(`apps/web/src/lib/auth/stripe-webhook-handler.ts`)는 `checkout.session.completed`/`invoice.payment_failed`만 처리하며, `customer.subscription.updated`/`customer.subscription.deleted`/`charge.refunded` 등은 `default: break`로 조용히 무시된다 — DB의 `subscription.status`가 Stripe 대시보드의 실제 상태와 어긋날 수 있다.

---

## 2. 목표

### 2.1 기능 목표

1. 기존 고객관리 화面(`/admin/customers`)은 manual(계좌이체) 고객 전용으로 남기고, 지금의 기능·레이아웃을 그대로 유지한다 — Stripe 관련 UI(Add-on 섹션 등)는 이 화면에서 제거한다.
2. 신규 "구독관리" 메뉴(고객관리 메뉴 아래)를 추가하고, Stripe 고객(`billingType === "stripe"`)만 이 화面에 표시한다.
3. 구독관리 화면에서 관리자는 각 Stripe 고객의 plan, 구독 상태(active/past_due/canceled 등), 다음 결제일(또는 종료일), 해지 예약 여부를 조회할 수 있다.
4. 관리자는 구독관리 화면에서 플랜을 변경하거나 구독을 강제 취소할 수 있다.
5. 관리자는 구독관리 화면에서 Add-on(브랜드/프롬프트/모델 추가, Claude 유효화)을 조정할 수 있으며, 저장 시 Stripe 청구와 `brands.maxPrompts`/`enabledModels`가 함께 갱신되어 청구-실제반영 불일치가 구조적으로 발생하지 않는다.
6. `subscription.status`가 Stripe의 실제 상태와 어긋나지 않도록, webhook이 `customer.subscription.updated`/`customer.subscription.deleted`를 처리해 DB를 최신으로 유지한다.

### 2.2 비목표 (이번 스코프에서 제외)

- Manual ↔ Stripe 간 고객 전환(마이그레이션) 기능은 다루지 않는다. 한 조직은 `billingType` 값에 따라 두 메뉴 중 한쪽에만 나타나며, 전환이 필요해지면 별도로 설계한다.
- Refund/dispute 등 결제 이벤트의 상세 이력(타임라인) 기록은 다루지 않는다. 이번 스코프는 "현재 상태를 정확히 보여주는 것"에 한정하고, 이력 기록은 후속 과제로 남긴다.
- `subscription` 테이블에 별도 캐시 컬럼을 추가하지 않는다(16번 명세 3장의 원칙 유지 — `subscription` 테이블을 단일 진실 원천으로 유지).

---

## 3. 메뉴/화면 분리

| 메뉴 | 대상 | 위치 | 비고 |
|---|---|---|---|
| 顧客管理 (기존) | `billingType === "manual"` | 기존 그대로 | Stripe 관련 UI 제거, 그 외 변경 없음 |
| 購読管理 (신설) | `billingType === "stripe"` | 顧客管理 바로 아래 | 이번 설계의 신규 화면 |

두 메뉴는 서로 배타적이다 — 한 조직은 `billingType` 값에 따라 정확히 한쪽 메뉴에만 나타난다.

`getOrganizationCustomersFn`(고객관리가 쓰는 조회 함수)에 `billingType = 'manual'` 필터를 추가하고, 구독관리 전용으로 `billingType = 'stripe'`만 조회하는 새 서버함수(`getSubscriptionCustomersFn` 등, 3장 이후 상세 설계)를 신설한다.

---

## 4. 顧客管理 (기존, manual 전용) — 변경 사항

**제거:**
- `ExpandedPanel`의 "Add-on 数量調整" 섹션(`{customer.billingType === "stripe" && (...)}`) 전체를 제거한다 — 구독관리로 이전.

**유지 (변경 없음):**
- 목록 테이블 컬럼(会社名/ブランド/担当者名/メールアドレス/サインアップ/状態/設定)
- `ExpandedPanel`의 基本情報/収集頻度/ブランド接続/ブランド設定/停止・削除

이 화면은 이제 `billingType === "manual"` 고객만 조회하므로, `billingType` 관련 조건분기 자체가 코드에서 사라진다.

---

## 5. 購読管理 (신설, stripe 전용)

### 5.1 목록 테이블

| 컬럼 | 내용 | 데이터 소스 |
|---|---|---|
| 会社名 | 顧客管理와 동일 | `organizationProfile.company` |
| プラン | light/standard/advanced | `subscription.plan` |
| 状態 | active/past_due/canceled 등 뱃지 | `subscription.status` |
| 次回請求日 | `periodEnd`(해지 예약이 없을 때) 또는 "解約予定"(cancelAtPeriodEnd) | `subscription.periodEnd`, `cancelAtPeriodEnd` |
| メールアドレス | 顧客管理와 동일 | `organizationProfile.primaryEmail` |
| 設定 | 펼치기 버튼 | — |

### 5.2 ExpandedPanel

| 섹션 | 내용 | 비고 |
|---|---|---|
| 基本情報 | 担当者名/会社名/メールアドレス | 顧客管理와 동일 컴포넌트 재사用 |
| ブランド接続・設定 | 顧客管理와 동일 | 재사용 — maxModels/maxPrompts는 6.2절 한도 검증 유지 |
| **サブスクリプション詳細** *(신설)* | plan, status, period(시작~다음결제일), 解約予定 여부 | 표시 전용 |
| **プラン変更** *(신설)* | plan select + 저장 | 관리자가 대신 업/다운그레이드 |
| **強制解約** *(신설)* | 解約ボタン(confirm) | Stripe subscription 취소 |
| **利用枠調整** *(Add-on을 대체, 통합)* | プロンプト数(프리셋+수동입력, 顧客管理의 ブランド設定과 동일 인터페이스), AIモデル(체크박스) — 저장 시 plan 기본값 초과분을 자동으로 Stripe add-on 수량에 반영 | 5.3절 참고 |
| 停止/削除 | 顧客管理와 동일 | 재사용 |

### 5.3 利用枠調整 — Add-on과 브랜드 설定 통합

기존 설계(Add-on 수량 입력 UI가 브랜드 설정과 별개로 존재)를 폐기하고, 관리자가 만지는 입力을 하나로 합친다.

- 관리자는 顧客管理의 ブランド設定과 동일한 인터페이스(プロンプト数 프리셋 버튼 + 수동입력, AIモデル 체크박스)로 값을 입력한다.
- 저장 시 서버가 다음을 한 번에 처理한다:
  1. `brands.maxPrompts`/`enabledModels`를 입력값으로 갱신 (기존 `updateBrandSettingsForCustomerFn` 로직 재사용)
  2. `plan.maxPrompts`/`plan.maxModels`(코드 상수) 대비 초과분을 계산해 `setAddonQuantity`로 Stripe subscription item 수량을 자동 동기화
  3. AIモデル 체크박스에서 `claude`가 체크되면 `claude` add-on quantity를 1로, 해제되면 0으로 자동 반영
- 관리자가 신경 쓸 대상은 "실제로 몇 개 쓰게 할 것인가" 하나뿐이며, Stripe 청구는 그 값에서 자동으로 파생된다 — 청구와 실제 반영이 어긋나는 이전 문제가 구조적으로 사라진다.
- ブランド追加枠(`maxBrands`)은 프롬프트/모델과 달리 브랜드 설정 화면에 대응하는 입력이 없으므로, 이 항목만 기존처럼 별도 수량 입력(추가 브랜드 개수)으로 남긴다.

---

## 6. Webhook 처리 확장

`apps/web/src/lib/auth/stripe-webhook-handler.ts`의 `handleStripeWebhookEvent`에 케이스를 추가한다.

```
case "customer.subscription.updated":
case "customer.subscription.deleted":
    // better-auth stripe プラグインが subscription テーブル自体は既に最新化している
    // (プラグインの内部処理)。ここでは admin 通知等、追加のドメインロジックが
    // 必要になった時点で実装する。現時点では webhook を受信して 200 を返す
    // だけで、5.1節の「状態」表示は自動的に最新になる。
    break;
```

better-auth stripe 플러그인 자체가 `subscription` 테이블 갱신은 이미 내부적으로 처리하는지, 아니면 우리가 `onEvent`에서 직접 갱신해야 하는지는 구현계획 단계에서 플러그인 소스코드로 재확인이 필요하다(16번 명세 8장에서 `checkout.session.completed`/`invoice.payment_failed`에 대해서는 "플러그인이 자동 갱신"이라고 이미 확인된 바 있음 — 나머지 이벤트도 동일 패턴일 가능성이 높다).

`charge.refunded`, `charge.dispute.created` 등은 이번 스코프(현재 상태 표시)에 직접 필요하지 않으므로 처리하지 않는다(2.2절 비목표).

---

## 7. 열린 질문 (TBD)

1. `customer.subscription.updated`/`deleted`에 대해 better-auth stripe 플러그인이 `subscription` 테이블을 자동 갱신하는지 여부 — 구현계획 착수 시 플러그인 소스코드(`node_modules/.pnpm/@better-auth+stripe@.../dist/index.mjs`)로 확인 필요.
2. Add-on 자동 동기화(5.3절) 시, plan 변경(업/다운그레이드) 직후 초과분 재계산 타이밍 — plan 변경과 利用枠調整 저장이 동시에 이루어질 때의 순서 보장 필요 여부는 구현계획에서 결정.

---

## 8. 다음 단계

이 문서를 기반으로 `writing-plans` 스킬을 통해 구현계획을 작성한다. 작업 위치는 기존 `.worktrees/stripe-billing`(브랜치 `worktree-stripe-billing`)을 그대로 이어서 사용한다.
