# 19. Stripe 연동 테스트

관련 문서: [16-Stripe결제연동.md](16-Stripe결제연동.md) · [17-Stripe결제연동_구현계획.md](17-Stripe결제연동_구현계획.md) · [18-Admin_구독관리_메뉴분리.md](18-Admin_구독관리_메뉴분리.md)

이 문서는 顧客管理/購読管理 화면 분리(18번 설계) 이후, Stripe 결제 연동 전반에 대한 **로컬 검증 시나리오**를 계속 누적 기록하는 문서다. 각 시나리오 항목 안에 해당 검증 중 발견된 이슈/버그/수정 내역을 함께 적는다 — 이슈를 별도 섹션으로 모으지 않는다. 새로운 이슈가 기존 어느 시나리오에도 속하지 않으면, 그 이슈를 검증하기 위한 시나리오 항목을 새로 추가한다.

작업 브랜치: `worktree-stripe-billing` (워크트리: `.worktrees/stripe-billing`)

---

## 1. 로컬 검증 환경 기동

```bash
cd apps/web
npm run dev
# 별도 터미널
stripe listen --forward-to http://localhost:3000/api/auth/stripe/webhook --skip-verify
```

- dev 서버: `http://localhost:3000`
- DB 조회: `DATABASE_URL=postgres://geo-watcher:geo-watcher@localhost:5432/geo-watcher` (로컬, `apps/web/.env.local` 참고 — 루트 `.env`의 DB 값은 플레이스홀더이므로 사용하지 않음)
- Stripe 이벤트 확인: `stripe events list`, `stripe events retrieve <id>`
- Stripe 리소스 직접 조회: `stripe subscriptions retrieve <id>`, `stripe subscription_schedules retrieve <id>`, `stripe billing_portal configurations list`

---

## 2. 테스트 시나리오

### 시나리오 1: 顧客管理가 manual 고객만 표시

**절차**:
1. `http://localhost:3000/admin/customers` 접속
2. Stripe 고객이 목록에 안 보이는지 확인
3. Add-on 관련 UI가 화면에 전혀 없는지 확인

**결과**: 통과. 발견된 이슈 없음.

---

### 시나리오 2: 購読管理가 Stripe 고객만 표시

**절차**:
1. 사이드바 「購読管理」 클릭 (`/admin/subscriptions`)
2. Stripe 고객만 보이는지, プラン/状態/次回請求日이 올바른지 확인

**결과**: 통과. 발견된 이슈 없음.

---

### 시나리오 3: 利用枠調整(사용량 조정)

**절차**:
1. 브랜드가 연결된 고객(예: `Test Company Inc 2`, org_id `d1b0a3e2-0347-41dd-8e9d-f7cf1b8906ed`)을 펼쳐서 "利用枠調整"에서 プロンプト数/AIモデル 변경 후 저장
2. `updateOrgUsageAndAddonsFn` 200 성공 확인
3. `psql`로 `brands.max_prompts`/`enabled_models` 갱신 확인
4. Stripe add-on quantity 동기화 확인
5. 저장 성공/실패 시 화면에 안내 메시지가 뜨는지 확인

**결과**: 통과.

**발견된 이슈**:

- **브랜드 카드-利用枠調整 UI 중복**: 고객을 펼치면 브랜드 목록 카드 안의 "プロンプト数/AIモデル" 편집 UI와, 하단 "利用枠調整" 섹션이 동시에 노출되어 서로 다른 값을 보여줌 (예: 카드는 20/ChatGPT+GoogleAIMode, 利用枠調整은 50/Claude). 원인: `ExpandedPanel`을 顧客管理와 100% 재사용하면서, 顧客管理 전용이던 브랜드 카드 내 편집 UI(`onUpdateBrandSettings`)를 購読管理에서 숨기지 않은 채 "利用枠調整"을 children으로 추가만 함. 18번 설계 문서 5.3절은 "利用枠調整이 ブランド設定을 대체"하는 것이 원래 의도였음. 수정: `ExpandedPanel`/`BrandConnectionsSection`에 `hideUsageControls` prop 추가, 購読管理에서만 `true`로 넘겨 브랜드 카드 내 편집 UI를 숨김(顧客管理는 기존 유지). 커밋 `5ff4da1`.

- **저장 버튼이 계속 disabled로 보임(오인)**: 고객 `dddd`에서 利用枠調整 저장 버튼이 항상 비활성. 조사 결과 코드 버그 아님 — 저장 버튼은 `disabled={savingUsage || !firstBrand}` 조건이며 `dddd`는 연결된 브랜드가 0개라 `firstBrand`가 없어 정상적으로 비활성화된 것. 테스트 데이터 문제로 결론, 브랜드가 연결된 고객(`Test Company Inc 2` 등)으로 재검증 완료.
- **저장 실패 시 에러가 조용히 사라짐(unhandled rejection)**: 저장 버튼이 `try { await onSaveUsage() } finally { ... }` 형태로 `catch` 없이 구현되어, 실패 시 아무 피드백 없이 로딩 상태만 풀림. 수정: `catch` 추가, `usageMessage` state에 에러 메시지 표시. 커밋 `4e43321`.
- **저장 성공 시 안내 메시지 없음**: 실패 시에만 메시지가 뜨고 성공해도 무반응. 수정: 저장 성공 시 `usageMessage`에 "保存しました" 표시(利用枠調整은 항상 그 자리에서 즉시 완료되므로 성공 시 항상 표시). 커밋 `7434b96`.

**Stripe add-on quantity 동기화 확인** (고객 `dddd`, org_id `87e41cf7-9652-4b52-b0f4-0e3038f57de9`, STANDARD 플랜/기본 프롬프트 50개):
- 브라우저에서 プロンプト数를 100으로 변경 후 저장 → `psql`로 `brands.max_prompts = 100` 반영 확인
- `stripe subscriptions retrieve sub_1TxjYaRzSpEgFymk3NtPmOf1`로 조회한 결과, prompts add-on(`price_1TwIjRRzSpEgFymk1LduPknk`)의 quantity가 **5**로 반영됨 — 초과분 50건 ÷ unitSize(10) = 5, 기대값과 정확히 일치
- `stripe listen` 로그에 `customer.subscription.updated`(add-on 아이템 수량 변경) → `subscription_schedule.updated`(이 subscription에 걸려있던 예약도 함께 갱신) → `invoiceitem.created`(이번 청구 주기에 add-on 요금 청구 항목 생성) 순으로 이벤트 수신, 전부 200 응답 확인
- 결론: `updateOrgUsageAndAddonsFn`은 `setAddonQuantity`(→ `stripe.subscriptionItems.update`)를 통해 **즉시** 반영되며(플랜 변경과 달리 스케줄을 타지 않음), 관련 webhook도 정상 처리됨

> **주의(2026-07-28 재검증 필요)**: 위 실측은 이번 세션의 add-on 재정 이전(models add-on 존재, STANDARD가 5모델이던 시점) 기록이다. 시나리오 12에서 다룬 변경(models/brand/claude add-on 폐지, STANDARD 6모델화) 이후에는 `setAddonMock`이 `"models"`/`"claude"` 키로 호출되지 않는 것과, prompts 초과분 계산 시 `billing.plan.maxModels`가 6으로 바뀐 영향(모델 수 상한 검증에만 영향, prompts quantity 계산 자체에는 영향 없음)을 함께 재확인해야 한다.

---

### 시나리오 4: 플랜 다운그레이드 제한

**절차**:
1. 利用枠調整으로 사용량을 새 플랜 기준 이상으로 올려놓은 상태에서, 관리자/고객 양쪽에서 다운그레이드 시도
2. 사용량이 초과 상태면 변경 거부 + 안내 메시지 확인
3. 사용량을 새 플랜 기준 이내로 낮춘 뒤 재시도하면 정상 진행 확인

**결과**: 통과.

**발견된 이슈**:

- **다운그레이드 시 사용량 초과분 미검증(Add-on/실사용량 불일치 재발 경로)**: 利用枠調整으로 이미 상위 플랜 기준치를 넘겨 쓰고 있는 상태에서 하위 플랜으로 다운그레이드하면, `brands.maxPrompts`/`enabledModels`가 그대로 남고 Stripe add-on 수량도 재계산되지 않아 실사용량과 청구 기준이 어긋남 — 18번 설계에서 애초에 해결하려던 문제가 플랜 변경 경로에서 재발하는 것을 사용자 질문("하향 조정 시 이미 높은 리밋을 쓰고 있으면?")으로 발견. 수정: `subscription-admin-logic.ts`에 `getOrgBrandUsage(organizationId)` 추가(조직 내 전 브랜드의 maxPrompts/모델수 최대값 계산). `changeOrgPlanFn`(관리자, `subscription-actions.ts`)과 `startCheckoutFn`(고객, `billing.ts`) 양쪽에 동일한 검증 적용 — 새 플랜의 기본값을 사용 중인 값이 초과하면 변경 자체를 거부하고 "먼저 이용 한도를 낮춰달라"는 안내 메시지 반환. 관리자/고객 두 경로가 항상 같은 정책을 쓰도록 `getOrgBrandUsage`를 공유. 커밋 `4686d6c`(관리자), `06aa54e`(고객).

---

### 시나리오 5: 플랜 변경(관리자, Stripe Billing Portal 경유)

**절차**:
1. 購読管理에서 대상 고객의 플랜 드롭다운 변경 → 저장
2. Stripe Billing Portal 플랜 갱신 확인 화면으로 리다이렉트 확인
3. 승인 → 고객 온보딩(리턴 URL) 화면으로 복귀 확인
4. 관리 화면에서 플랜 반영 확인 (즉시 반영이 아니라 예약 반영일 수 있음 — 아래 이슈 참고)
5. 저장 성공/실패 시 화면에 안내 메시지가 뜨는지 확인

**결과**: 통과.

**발견된 이슈**:

- **"subscription update feature ... disabled" 에러**: 플랜 변경 저장 시 Stripe 에러 발생. 조사 결과 코드 문제 아님 — Stripe 테스트 계정의 Billing Portal 설정(Customer Portal Configuration)에서 "Update subscriptions" 기능이 꺼져 있었음. Stripe 대시보드 설정에서 활성화 필요(앱 코드 수정 없음).
- **저장 실패 시 에러가 조용히 사라짐(unhandled rejection)**: 저장/解約 버튼이 `try { await onAction() } finally { ... }` 형태로 `catch` 없이 구현되어, 실패 시 아무 피드백 없이 로딩 상태만 풀림. 수정: 각 버튼에 `catch` 추가, `planError`/`cancelError` state에 에러 메시지 표시. 커밋 `ffb2255`.
- **プラン変更 저장 후 관리 화면에 플랜이 즉시 반영되지 않음**: 관리자가 STANDARD → LIGHT로 변경하고 Stripe Portal에서 승인까지 완료했는데도, 購読管理 화면과 DB의 `subscription.plan`이 계속 STANDARD로 남음. 조사: Stripe API로 직접 확인한 결과 — 구독 아이템은 아직 STANDARD 가격 그대로였고, 대신 `Subscription Schedule`이 생성되어 다음 결제일(`period_end`, 예: 2026-08-27)부터 LIGHT로 전환되도록 예약되어 있었음. `stripe billing_portal configurations list`로 확인한 결과 Portal 설정의 `subscription_update.proration_behavior`가 `"none"`으로 되어 있어, Stripe가 즉시 반영 대신 표준적으로 "다음 청구 주기부터 적용"하는 스케줄 방식을 자동으로 사용하고 있었음. 결론: 애플리케이션 버그 아님 — 이미 결제한 기간을 환불하지 않고 다음 결제부터 전환하는 일반적인 SaaS 다운그레이드 정책. DB의 `subscription.plan`도 실제 구독 아이템이 바뀌는 시점(`customer.subscription.updated` webhook 수신 시)에 맞춰 자동 갱신되는 것이 정상. 개선(UX): `subscription.stripeScheduleId`의 존재 여부로 `hasPendingPlanChange`를 계산해 `getSubscriptionCustomersFn`이 반환하도록 추가, 購読管理 테이블 행의 플랜 컬럼에 "(変更予約あり)" 배지 표시, 펼친 패널의 プラン変更 섹션에 "変更が予約されています。{次回請求日}の請求分から新しいプランが適用されます" 안내 문구 표시. 커밋 `3b69bf5`.
- **ExpandedPanel 내 "サブスクリプション" 섹션이 테이블 행과 중복**: 펼친 패널 "プラン変更" 위에 "サブスクリプション"(プラン: X / 状態: Y) 요약이 있었는데, 이미 테이블 행에 동일 정보(プラン/状態/次回請求日 컬럼)가 표시되고 있어 완전 중복. 수정: 해당 섹션 삭제(`formatPeriodEnd`가 `cancelAtPeriodEnd`도 이미 반영하고 있어 정보 손실 없음 확인 후 제거). 커밋 `4e163d1`.
- **저장 성공 시 안내 메시지 없음**: 실패 시에만 에러 메시지가 뜨고, 성공해도 아무 표시가 없어 저장이 됐는지 알 수 없음. 수정: `onChangePlan`이 Stripe로 리다이렉트가 발생했는지 여부(`boolean`)를 반환하도록 변경 — 리다이렉트가 없을 때만(그 자리에서 즉시 완료된 경우만) "保存しました" 표시(리다이렉트되는 경우 화면을 바로 떠나 표시 의미 없음). 커밋 `7434b96`.

---

### 시나리오 6: 解約手続き(해지)

**절차**:
1. 대상 고객에서 「解約手続きへ進む」 클릭 → 확인 다이얼로그 확정
2. Stripe Billing Portal 해지 확인 화면으로 이동 확인 (이 시점까지 해지 미완료)
3. Portal에서 해지 확정
4. Stripe 대시보드(테스트 모드)에서 subscription 상태 `canceled` 확인
5. `psql`로 `subscription.status`가 webhook을 통해 자동으로 `canceled`로 반영되는지 확인
6. 해지 확정 후에도 관리 화면에서 "언제까지 이용 가능한지"가 빨간색으로 명확히 보이는지 확인

**결과**: 통과. 고객 `dddd`(org_id `87e41cf7-9652-4b52-b0f4-0e3038f57de9`)로 실제 해지 확정까지 완료.

**해지 확정 후 DB 상태** (`psql`):
```
status: active | period_end: 2026-08-27 08:06:38 | cancel_at_period_end: t
cancel_at: 2026-08-27 08:06:38 | canceled_at: 2026-07-28 03:07:45
```
`status`는 아직 `active` — 청구 기간이 끝나지 않았으므로 정상(즉시 해지 아님). `cancel_at`/`cancel_at_period_end`가 정확히 반영됨.

**Stripe listen 로그**: `subscription_schedule.released` → `customer.subscription.updated`(×2) → `subscription_schedule.updated` → `customer.subscription.updated` 순으로 수신, 전부 200.

**발견된 이슈**:

- **해지 버튼 자체의 unhandled rejection**: 시나리오 5의 "저장 실패 시 에러가 조용히 사라짐" 항목에서 함께 수정됨(커밋 `ffb2255`).
- **해지 확정 시 기존 플랜변경 예약(schedule)이 자동 해제됨**: 이 고객에게는 이전에 "다음 결제일부터 LIGHT로 전환" 예약(`sub_sched_...`, 시나리오 5 참고)이 걸려 있었는데, 해지를 확정하자 `subscription_schedule.released` 이벤트가 발생하며 해당 스케줄이 자동으로 `released` 상태가 됨(`stripe subscription_schedules retrieve`로 확인). 버그 아님 — 구독 자체가 종료될 예정이므로 플랜 전환 예약이 의미 없어져 Stripe가 자동 정리하는 것이 합리적인 동작. 별도 코드 대응 불필요.
- **해지 시점 정책 확인**: 사용자 질문("해지 시점은 해지 이후, 빌링된 마지막 날짜까지 유지되나?")으로 확인. `@better-auth/stripe`의 `cancelSubscription`은 Stripe Billing Portal의 `subscription_cancel` flow로 리다이렉트만 시키며, 실제 해지 정책은 Stripe Portal 설정이 결정한다. `stripe billing_portal configurations list`로 확인한 결과 `features.subscription_cancel.mode`가 `"at_period_end"`로 설정되어 있어, 해지를 확정해도 **즉시 이용 중단이 아니라 이미 결제한 마지막 청구 기간(`period_end`)까지는 정상 이용 가능**하고 그 시점에 Stripe가 자동으로 구독을 종료함(`customer.subscription.deleted` webhook을 better-auth 플러그인이 받아 DB `status`를 자동 갱신, 별도 코드 불필요).
- **해지 예정 상태가 화면에서 눈에 띄지 않음(UX)**: 기존에는 次回請求日 컬럼에 "解約予定"이라는 문자만 표시되고, 실제 최종 이용 가능일이나 시각적 강조가 없어 관리자가 놓치기 쉬움. 수정: `formatPeriodEnd`를 `formatDate`(순수 포맷)와 `PeriodEndCell`(해지 예약 시 빨간색 강조) 컴포넌트로 분리 — 테이블 행의 次回請求日 컬럼에 "{날짜}まで利用可能"을 `text-destructive`로 표시, 펼친 패널의 解約 섹션 상단에도 동일하게 "{날짜}まで利用可能（解約手続き済み）"를 빨간색으로 표시. 관리자 화면(購読管理)에만 적용, 고객 화면은 애초에 구독 상태를 보여주는 화면 자체가 없어 별도 작업으로 보류. 커밋 `5601c46`.

---

### 시나리오 7: 임시 비밀번호 발급

**절차**:
1. 購読管理에서 고객의 메인/서브 이메일 각각 「仮パスワード発行」 클릭
2. 다이얼로그에 로그인 URL/이메일/임시 비밀번호 표시 확인
3. `RESEND_API_KEY` 설정 시 실제 메일 도착 확인 (미설정 시 서버 로그 경고만, UI는 정상)

**결과**: 통과. `dddd`(`kim.jihoon@hotmail.com`)로 임시 비밀번호 발급 → 시나리오 8의 로그인 차단 검증에 그대로 활용.

**발견된 이슈**: 없음.

---

### 시나리오 8: Stripe 해지 후 고객의 로그인/접근 차단

사용자 질문("스트라이프 해약과 실제 어드민 정지/고객 삭제는 별개 프로세스. 해지된 고객이 다시 로그인하면? 어드민이 정지/삭제하지 않는 한 정상 로그인되나?")으로 시작된 검증.

**절차**:
1. `checkOrgAccess`(`apps/web/src/lib/auth/helpers.ts`)가 로그인/화면 접근에 실제로 어떻게 관여하는지 코드로 확인
2. `dddd`의 subscription을 해지 확정한 뒤(시나리오 6), 실제 고객 계정(임시 비밀번호 발급, 시나리오 7)으로 로그인 재시도
3. "このアカウントは現在停止中です。"로 로그인 자체가 차단되는지 확인

**결과**: 통과(코드 수정 후). `dddd` 실계정으로 로그인 시도 시 정확히 "このアカウントは現在停止中です。" 메시지로 차단됨을 확인.

**발견된 이슈**:

- **사용자의 가정과 실제 코드가 처음엔 불일치**: 사용자는 "어드민이 정지/삭제하지 않는 한 정상 로그인된다"고 가정했으나, 조사 결과 `checkOrgAccess`(`helpers.ts:45`)는 `organizationProfile.status`(어드민 정지 여부)뿐 아니라, `billingType === "stripe"`인 조직에 대해 **Stripe subscription의 status**(`active`/`trialing`이 아니면 거부)까지 이미 확인하고 있었음 — 즉 설계상으로는 어드민 조치 없이도 Stripe 해지만으로 자동 차단되는 것이 원래 의도였음.
- **버그: 로그인 시점 체크 누락**: 그런데 `/auth/login`의 `checkUserOrgStatusFn`은 `organizationProfile.status === "suspended"`만 확인하고 Stripe subscription 상태는 전혀 보지 않았음. 그 결과 subscription이 `canceled`가 되어도 **로그인 자체는 성공**하고, 그 다음 `/app` 진입 시(`resolveActiveBrandFn` → `requireOrgAccess`)에야 비로소 거부됨. 이때 `errorComponent`가 어디에도 정의되어 있지 않아, 고객은 "Forbidden: No access to this organization"이라는 **처리되지 않은 에러 화면**을 보게 됨(친절한 안내 없음).
- **수정**: `helpers.ts`에 `areAllUserOrgsInaccessible(userId)`를 신설 — 사용자가 소속된 모든 조직에 대해 기존 `checkOrgAccess`(정지 여부 + Stripe subscription 상태를 이미 함께 봄)를 호출해, 전부 접근 불가면 `true`를 반환. `/auth/login`의 `checkUserOrgStatusFn`이 이 헬퍼를 쓰도록 교체 — 관리자 정지든 Stripe subscription 만료든 **원인을 구분하지 않고** 로그인 시점에 동일하게 "このアカウントは現在停止中です。"로 차단(사용자 지시: "매뉴얼 고객과 동일하게 처리하면 될듯"). 커밋 `583a422`.
- **참고**: 어드민이 顧客管理/購読管理에서 고객 화면을 미리보기(`/app?org=<id>`)할 때는 `requireOrgAccess`가 admin 바이패스를 타므로 subscription 상태와 무관하게 항상 접근 가능(의도된 동작, 이번 수정과 무관) — 검증 중 이 경로와 실제 고객 로그인 경로를 혼동해 "온보딩 화면이 뜬다"는 관찰이 있었으나, 이는 어드민 미리보기 바이패스 때문이며 별개 브랜드가 `setup_completed: false`였을 뿐 버그 아님.
- **부수 발견**: 購読管理의 회사명 컬럼에 顧客管理와 달리 `/app?org=<id>` 새 탭 링크(고객 화면 미리보기)가 없었음. 顧客管理와 동일하게 `primaryBrandId`가 있으면 링크를 추가. 커밋 `e970362`.

**검증에 사용한 재현 방법**: `dddd`의 실제 subscription은 아직 청구 기간이 안 끝나 `status=active`였으므로, `psql`로 일시적으로 `status='canceled'`로 변경해 로그인 차단을 재현 → 확인 후 다시 `active`로 되돌림(아래 "남은 작업" 참고).

---

### 시나리오 9: 어드민 정지/고객삭제와 Stripe 해지의 상호 독립성

사용자 질문("어드민의 중지, 고객 삭제와 스트라이프 해지 — 이건 단순 병렬인가? 서로 간섭은 없는가?")으로 시작된 검증. 시나리오 8의 로그인 차단 로직을 만든 직후, "그럼 반대 방향(어드민 조치가 Stripe에 영향을 주는지/안 주는지)도 확인이 필요하다"는 문제의식에서 진행.

**절차**: `suspendOrganizationCustomerFn`/`deleteOrganizationCustomerFn`(`apps/web/src/server/customers.ts`)이 Stripe API를 호출하는지 코드로 확인.

**결과**: 통과(코드 수정 후) — 어드민 정지는 원래도 문제 없었고, 어드민 삭제에서 중대한 결함을 발견해 수정.

**발견된 이슈**:

- **어드민 정지 ↔ Stripe: 독립적이나 안전함**: `suspendOrganizationCustomerFn`은 `organizationProfile.status`만 변경하고 Stripe에는 전혀 관여하지 않음(코드 주석에도 명시: "Org suspension gates login/app access only"). Stripe subscription은 정지와 무관하게 그대로 유지되고 청구도 계속됨 — 이건 의도된 설계로 보임(정지는 "일시 접근 차단"이지 "해지"가 아니므로). 접근 제어(`checkOrgAccess`) 단계에서는 정지 여부와 Stripe 상태가 OR 조건으로 합쳐져 어느 하나만 문제여도 차단되므로, 데이터는 독립적이어도 사용자 경험상 문제는 없음.
- **버그(심각): 어드민 삭제가 Stripe subscription을 전혀 정리하지 않음**: `deleteOrganizationCustomerFn`을 끝까지 읽은 결과, DB의 조직/브랜드/멤버/사용자 레코드와 Auth0 계정은 정리하지만(583~588행), **Stripe subscription을 취소하는 코드가 전혀 없었음**. 즉 관리자가 顧客管理/購読管理에서 Stripe 결제 고객을 "삭제"하면, DB상으로는 고객이 완전히 사라지지만 **Stripe 쪽 구독은 그대로 살아있어 매 결제 주기마다 계속 청구가 발생**하는 심각한 결함이었음.
- **수정**: `deleteOrganizationCustomerFn`이 삭제 전에 `organizationProfile.billingType === "stripe"`인 경우 `subscription.status`를 조회하도록 추가. `active`/`trialing`이면 삭제 자체를 거부하고 "Stripeの解約手続きを先に行ってください"라고 안내. `canceled` 등 이미 해지된 상태면 종전대로 삭제 가능. manual 고객은 이 체크를 스킵(billingType이 stripe가 아니므로 자연히 스킵됨). 커밋 `e77a809`.
- **정리**: 어드민 정지/삭제와 Stripe 해지는 데이터상 완전히 독립된 두 시스템이며, **자동으로 서로를 정리해주지 않는다**. 정지는 접근 제어 단계에서 병합되어 문제가 없었지만, 삭제는 "Stripe 해지 확인 없이 진행하면 좀비 구독이 남는" 실질적 위험이 있었고 이번에 삭제 전 차단 가드를 추가해 막았다. 앞으로 "고객 삭제 = Stripe 해지까지 자동 처리"가 아니라 "Stripe 해지가 먼저 확인되어야 삭제 가능"이라는 순서가 강제된다.
- **부수 발견(UI): 확인 다이얼로그 실패 시 에러가 페이지 최상단에만 뜸**: 브라우저 검증 중 "Stripeの解約手続きを先に行ってください" 에러가 페이지 맨 위(PageHeader 아래)에만 표시되고, 정작 삭제 버튼을 누른 확인 다이얼로그 자체는 조용히 닫혀버려 사용자가 놓치기 쉬웠음(`handleConfirm`이 실패 시에도 `setConfirmOpen(false)`로 다이얼로그를 닫아버렸기 때문). 顧客管理/購読管理 공통 패턴. 수정: `confirmError` state를 추가해 실패 시 다이얼로그를 닫지 않고 그 자리(제목/설명 아래, 버튼 위)에 에러를 표시하도록 변경. 다이얼로그를 열거나 취소할 때 `confirmError`를 초기화. 커밋 `edd232d`. 수정 후 브라우저 재검증 완료 — 다이얼로그 안에 에러가 정상 노출됨을 확인.

---

### 시나리오 10: 고객 앱 결제 화면(/app/settings/billing)

18번 설계([18-Stripe_화면_추가.md](18-Stripe_화면_추가.md)) 및 구현(브랜치 `worktree-stripe-billing`, 최종 커밋 `3463ff7`)으로 신설된, 고객이 직접 자신의 구독 상태를 확인하고 Stripe Portal로 이동하는 화면의 로컬 검증 시나리오. 시나리오 8 검증 당시 없던 화면(3.남은 작업 참고)이 이번에 추가됨.

**절차**:
1. Stripe 고객(`billingType === "stripe"`)으로 로그인 → 사이드바 설정에서 `LLM` 바로 아래 「請求・お支払い」 메뉴 확인

2. `/app/settings/billing` 진입 → 現在のプラン/状態/月額 or 年額/次回請求日이 올바르게 표시되는지 확인

3. 「管理画面へ移動」 클릭 → `openBillingPortalFn` 호출 후 Stripe Billing Portal이 **새 탭**으로 열리는지 확인(기존 탭은 유지)
4. manual 고객 계정으로 동일 메뉴/URL 직접 접근 시 차단되는지 확인
5. 해지 예약(`cancelAtPeriodEnd: true`) 고객으로 「○年○月○日まで利用可能」가 빨간색으로 표시되는지 확인
6. 플랜 변경 예약(`stripeScheduleId` 존재) 고객으로 「変更予約あり」와 적용 예정일 안내가 표시되는지 확인
7. subscription `status = past_due`인 고객으로 로그인 → 결제 화면 외 `/app` 접근은 차단되고, 결제 화면에는 「お支払いを確認できませんでした」 경고와 Portal 버튼이 뜨는지 확인(로그인 자체는 차단되지 않아야 함 — 시나리오 8의 전체 차단과 구분)
8. `status`가 `canceled`/`unpaid`/`incomplete`인 고객, 어드민 정지 고객은 기존과 동일하게 로그인 자체가 차단되는지 확인(billing_recovery 예외 대상이 아님)
9. 어드민이 해당 고객 화면을 미리보기(`/app?org=<id>`)할 때도 고객과 동일한 메뉴·화면·「管理画面へ移動」 버튼이 그대로 보이는지 확인(관리자용 별도 예외 없음 — 설계 단계에서 명시적으로 단순화하기로 결정)

**결과**: 구현 완료, 로컬 브라우저 검증 대기.

**참고(구현 중 확인된 회귀 위험, 코드 리뷰로 사전 차단)**:
- 신규 가입 직후 최초 Stripe Checkout 시점에는 아직 subscription row가 없어, 접근 정책 resolver를 그대로 적용하면 가입 결제 자체가 막힐 수 있었음 — 최초 Checkout 경로는 별도 처리로 유지, 테스트로 고정.
- 어드민이 해당 고객 조직의 실제 멤버인 경우, 그 조직이 `canceled`/`manual`이어도 어드민 미리보기는 허용되어야 함 — 테스트로 고정.

---

### 시나리오 11: 플랜별 기본값(maxPrompts/enabledModels) 초기 세팅

`packages/lib/src/billing/plans.ts`의 `STRIPE_PLANS`에 플랜별 기본값(light: 20건/4종, standard: 50건/5종, advanced: 100건/6종, `defaultModels`)이 정의되어 있고, 이 값이 실제로 브랜드에 반영되는 두 지점을 검증한다.

**대상 코드**:
- `packages/lib/src/billing/onboarding.ts`의 `initializeBrandsForNewSubscription(organizationId, planName)` — 신규 결제 완료(`checkout.session.completed` webhook) 직후, 조직 산하 **모든 브랜드**의 `maxPrompts`/`enabledModels`를 플랜 기본값으로 1회 초기화(`stripe-webhook-handler.ts:52-57`).
- `packages/lib/src/billing/onboarding.ts`의 `getBillingOnboardingDefaults(organizationId)` — 온보딩 마법사의 브랜드 생성(`createBrandFn`)이 이 함수를 호출해, Stripe 고객의 **첫 브랜드 생성 시점**에 manual 고객용 하드코딩 기본값(15건/`["chatgpt"]`) 대신 플랜 기본값을 사용.

**절차**:
1. 신규 조직으로 Stripe Checkout 결제 완료(예: standard 플랜) → webhook 처리 후 `psql`로 해당 org의 `brands.max_prompts = 50`, `brands.enabled_models`가 `defaultModels`(5종)와 일치하는지 확인
2. 이미 브랜드가 있는 상태에서 결제가 재실행되는 경로가 없는지 확인(1회성 초기화 의도 — 이후 사용자가 利用枠調整으로 바꾼 값을 결제 관련 이벤트가 덮어쓰지 않아야 함)
3. Stripe 고객이 온보딩 마법사에서 **첫 브랜드**를 생성할 때 `getBillingOnboardingDefaults`가 반환한 플랜 기본값이 적용되는지 확인 — subscription row가 아직 없는 최초 Checkout 이전 시점에는 `null`을 반환해 manual 기본값(15건/`["chatgpt"]`)으로 정상 fallback되는지도 함께 확인
4. light/standard/advanced 세 플랜 각각에 대해 위 1, 3번을 반복해 값이 플랜별로 다르게 세팅되는지 확인

**결과**: 코드 구현은 완료(주석에 "16번仕様 6.1節" 참조, 관련 유닛 테스트는 `onboarding.test.ts`에 존재), **로컬 브라우저/webhook 시나리오로의 실제 검증은 아직 미진행**.

---

### 시나리오 12: Add-on 재정 — STANDARD 6모델화 및 models/brand/claude add-on 폐지

2026-07-28 세션에서 확정된 사용자 결정 사항. 13번 원가 문서와 16번 설계 문서를 이번 결정에 맞춰 갱신했고, 코드/Stripe 테스트 모드도 함께 반영했다.

**결정 내역**:
1. STANDARD 플랜의 모델 구성을 5종 → **6종(필수 모델 전체, ADVANCED와 동일)** 으로 변경. `maxModels: 5→6`, `defaultModels`에 `google-ai-mode` 추가.
2. **models(모델 수) add-on 폐지** — STANDARD도 이미 6모델 전체를 기본 제공하므로 "모델 수 추가 구매" 자체가 불필요해짐.
3. **brand add-on 폐지** — 브랜드 추가 과금은 원가가 고객마다(사용량에 따라) 크게 달라 고정 단가가 부적합. 필요 시 관리자가 Stripe 콘솔에서 개별 협의로 수동 처리.
4. **claude add-on 폐지** — 같은 이유(원가가 프롬프트 수·수집 주기에 따라 light 월 ¥196~advanced 월 ¥982 이상까지 벌어짐, `docs/geo_cost_calculator_4.html`의 `CLAUDE_RUN_JPY=9.82` 공식 기준). 관리자가 브랜드 설정에서 `enabledModels`에 `claude`를 넣는 것은 코드 게이트 없이 자유롭게 허용(개별 협의가 끝났다는 전제).
5. **prompts add-on만 표준 자동 add-on으로 유지**, 가격은 기존 ¥3,000/10건·월 그대로 확정(원가 대비 마진 약 70~77%).
6. (2026-07-29 정책 변경으로 뒤집힘 — 시나리오 17 참고) 이 시점에는 고객이 스스로 add-on을 조작하는 경로가 없었고, 관리자의 利用枠調整이 초과분을 자동으로 Stripe에 반영하는 구조였다.

**코드 변경**:
- `packages/lib/src/billing/plans.ts`: `AddonKey`를 `"prompts"`만 남김, `STRIPE_ADDONS`에서 brand/models/claude 제거, STANDARD `maxModels`/`defaultModels` 갱신
- `packages/lib/src/billing/subscription.ts`: `AddonQuantities`/`EffectiveLimits`에서 `brand`/`claude` 필드 제거(`effectiveMaxBrands`는 항상 plan 기본값)
- `apps/web/src/server/subscription-admin.ts`(`updateOrgUsageAndAddonsFn`): claude add-on 자동 계산 제거(prompts만 계산)
- `apps/web/src/server/customer-brands.ts`(`updateBrandSettingsForCustomerFn`): `enabledModels`에 `claude` 포함 시 add-on 승인 여부를 확인하던 게이트 제거 — 이제 모델 수 상한 계산에서만 claude를 제외(카운트 대상 외)하고, 활성화 자체는 무조건 허용

**Stripe 테스트 모드 반영**:
- brand add-on Price(`price_1TwIjQRzSpEgFymkYY2zzBAL`) → archive
- models add-on Price(`price_1TwIjSRzSpEgFymkn39Vb9r7`) → archive
- claude add-on Price(`price_1TwIjSRzSpEgFymkFTPmslMP`) → archive
- prompts add-on Price(`price_1TwIjRRzSpEgFymk1LduPknk`, ¥3,000/10건)는 그대로 유지(active)
- (과정 중 실수로 ¥1,000짜리 신규 Price `price_1Ty4GiRzSpEgFymkcP1R0MWe`를 만들었다가 즉시 archive 처리함 — 사용되지 않는 잔재이나 문제 없음)

**절차(로컬 검증, 미진행)**:
1. ~~`updateOrgUsageAndAddonsFn`으로 STANDARD 고객의 `maxPrompts`를 초과 설정 후 저장 → `stripe subscriptions retrieve`로 prompts add-on만 반영되고 models/claude line item은 생성되지 않는지 확인~~ — 2026-07-29 정책 변경으로 이 절차 자체가 무의미해짐. 利用枠調整은 이제 Stripe를 전혀 호출하지 않는다(시나리오 17 참고). 검증 대상은 "저장 후 Stripe에 아무 반영도 없는지"로 바뀜.
2. `enabledModels`에 `claude`를 포함해 저장 → 이전에는 "Claude を有効化するには add-on の承認が必要です" 에러였던 경로가 이제는 정상 저장되는지 확인
3. STANDARD 신규 가입 시 `checkout.session.completed` webhook 이후 브랜드가 6모델로 초기화되는지 확인(시나리오 11과 함께 재검증)
4. `/admin/subscriptions`의 利用枠調整 UI에 브랜드/모델/Claude add-on 관련 입력이 남아있지 않은지(모델 수 입력은 여전히 `enabledModels` 체크박스로 존재하지만 add-on 승인 문구는 없어야 함) 확인

**결과**: 코드/문서/Stripe 반영 완료, 로컬 브라우저 검증은 아직 미진행. (이후 시나리오 17에서 利用枠調整의 Stripe 연동 자체가 완전히 제거됨에 따라 이 시나리오의 일부 전제가 바뀌었다.)

---

### 시나리오 14: 신규 가입 화면(select-plan)에서 prompts add-on 선택

2026-07-29 세션에서 확정된 결정. `docs/superpowers/plans/2026-07-29-self-service-plan-change.md`(워크트리 전용, Task 1·6) 구현.

**결정 내역**: `/app/billing/select-plan`에 프롬프트 10건 단위 추가 옵션(0~5단위)을 추가. 선택하면 각 플랜 카드의 합계 금액(`calculatePlanTotal`)이 즉시 갱신되고, Checkout 시작 시 `startCheckoutFn`의 metadata에 `promptAddonUnits`가 실려 Stripe Checkout Session에 반영됨. Checkout이 실제 완료된 후(`checkout.session.completed` webhook)에야 `setAddonQuantity`로 add-on이 Stripe 구독에 얹힌다 — Checkout Session 생성 자체에는 add-on 라인아이템을 직접 넣을 수 없다는 `@better-auth/stripe` 플러그인의 제약 때문(대안으로 metadata 경유 + webhook 후처리를 택함).

**코드 변경**:
- `packages/lib/src/billing/plan-selection.ts`(신규): `calculatePlanTotal`/`PROMPTS_ADDON_UNIT_JPY`(¥3,000/10건) — 플랜+add-on 합계 계산 공유 함수
- `apps/web/src/server/billing.ts`(`startCheckoutFn`): `promptAddonUnits` 입력 추가, Checkout metadata에 문자열로 실어보냄
- `apps/web/src/lib/auth/stripe-webhook-handler.ts`: `checkout.session.completed`에서 metadata의 `promptAddonUnits`를 읽어 `setAddonQuantity` 호출(실패해도 try/catch로 격리, 이후 이메일 발송 등 나머지 처리는 계속됨 — 리뷰에서 발견해 수정)
- `apps/web/src/routes/_authed/app_.billing.select-plan.tsx`: add-on 선택 `<select>`, 합계 표시
- `apps/web/src/components/billing/prompt-addon-select.tsx`(신규): 이 화면과 시나리오 16 화면이 공유하는 add-on 선택 컴포넌트(중복 제거)

**절차(로컬 검증, 미진행)**:
1. `/app/billing/select-plan`에서 add-on 수량(예: 2단위)을 선택 → 각 플랜 카드 합계 금액이 즉시 (플랜가 + 6,000)으로 바뀌는지 확인
2. 그 상태로 Checkout 시작 → Stripe Checkout 화면 결제 완료 → `stripe events list`로 `checkout.session.completed` 수신 확인
3. `stripe subscriptions retrieve <sub_id>`로 prompts add-on(`price_1TwIjRRzSpEgFymk1LduPknk`)의 quantity가 선택한 단위 수와 일치하는지 확인
4. add-on 수량 0(추가 없음)으로 가입한 경우, `setAddonQuantity`가 호출되지 않고(또는 quantity 0으로 아무 line item도 생기지 않고) 정상 가입되는지 확인

**결과**: 코드 구현·리뷰·회귀 테스트 완료. 로컬 브라우저 검증 미진행.

---

### 시나리오 15: 관리자 구독관리에서 플랜 변경 기능 제거(조회 전용화)

2026-07-29 세션에서 확정된 결정. Task 7 구현.

**결정 내역**: `/admin/subscriptions`에서 관리자가 직접 고객의 플랜을 바꾸던 기능(`changeOrgPlanFn`, 플랜 드롭다운+保存 버튼)을 완전히 제거. 플랜 변경은 이제 고객이 청구 관리 화면에서 직접 하는 것으로 일원화(시나리오 16). 관리자 화면은 현재 플랜명과 add-on 수량(프롬프트 추가 건수)을 **읽기 전용**으로만 표시.

**코드 변경**:
- `apps/web/src/server/subscription-actions.ts`: `changeOrgPlanFn`과 그 입력 스키마 완전 삭제(`cancelOrgSubscriptionFn`만 남음, 変更 없음)
- `apps/web/src/components/admin/subscription-management.tsx`: "プラン変更" 섹션의 `<select>`+保存 버튼을 제거, "プラン情報"(현재 플랜, 追加プロンプト件数) 읽기 전용 표시로 교체. 기존 "変更が予約されています" 안내 문구는 그대로 유지.
- `apps/web/src/routes/_authed/admin/subscriptions.tsx`: `changeOrgPlanFn` import 및 `onChangePlan` prop 제거

**절차(로컬 검증, 미진행)**:
1. `/admin/subscriptions`에서 고객 행을 펼쳤을 때 플랜 관련 `<select>`/변경 버튼이 전혀 없는지 확인
2. "現在のプラン: STANDARD" 같은 읽기 전용 텍스트와 "追加プロンプト: N件"이 정확히 표시되는지 확인
3. 変更予約あり(스케줄 존재) 고객으로 기존 안내 문구("変更が予約されています。{날짜}の請求分から...")가 그대로 뜨는지 확인(문구 자체는 이번 변경으로 손대지 않았음)
4. 브랜드 추가/利用枠調整/정지/삭제/임시비밀번호 발급 등 나머지 관리자 기능은 기존과 동일하게 동작하는지 확인(플랜 변경만 제거됨, 회귀 없음을 확인)

**결과**: 코드 구현·리뷰·회귀 테스트 완료. 로컬 브라우저 검증 미진행.

---

### 시나리오 16: 고객의 청구 관리 화면에서 즉시 플랜 변경

2026-07-29 세션에서 확정된 결정. Task 2~5 구현. 사용자 질문("7월 28일 계약 개시 → 7월 30일 플랜 변경 → 8월 28일 청구금액은?")으로 시작된 Stripe 프로레이션 방식 조사가 이 기능의 설계 기준이 됨.

**아키텍처 핵심 발견**: `@better-auth/stripe@1.6.23`의 `upgradeSubscription`은 이 repo의 플랜 설정(`lineItems`/`seatPriceId` 미설정)에서는 base plan 변경 시 항상 Stripe Billing Portal 리다이렉트로 빠지고, Portal의 `proration_behavior`가 Dashboard에서 `"none"`으로 설정되어 있어(시나리오 5에서 이미 확인) 다음 청구일에야 반영되는 스케줄 방식이 된다. "즉시 변경 + `create_prorations`"를 위해서는 플러그인을 우회해야 함 — `setAddonQuantity`(add-on, 기존)와 동일한 패턴으로 `changeBasePlanImmediately`(base plan, 신규)가 Stripe SDK(`stripe.subscriptionItems.update`)를 직접 호출.

**Stripe 프로레이션 계산 방식(조사 결과)**: `create_prorations`는 변경 즉시 별도 청구가 발생하지 않고, 이미 결제한 이번 주기 요금 중 "미사용분을 크레딧"하고 "새 플랜 요금을 남은 기간만큼 재청구"하는 방식으로 차액이 계산되어 **다음 정기 청구서에 합산**된다. 예: 7/28 계약 시작(월 주기, light ¥29,800) → 7/30 standard(¥39,800)로 변경 → 8/28 청구서 = standard 정기요금(¥39,800) + 프로레이션 차액(약 ¥9,359, light 29일분 미사용 크레딧 − standard 29일분 재청구) ≈ ¥49,159. 7/30 시점엔 카드 결제가 발생하지 않음.

**결정 내역**:
1. 고객이 `/app/settings/billing`에서 플랜을 선택하면 **즉시** Stripe에 반영(대기 없음)
2. 동시에 prompts add-on 수량도 선택 가능, `setAddonQuantity`로 함께 반영
3. 다운그레이드 시 조직 내 사용중인 프롬프트/모델 수가 새 플랜 기준을 초과하면 거부(기존 4번 시나리오와 동일한 `getOrgBrandUsage` 검증을 고객 경로에도 적용)
4. Stripe 호출 성공 후 로컬 `subscription.plan` DB 행도 즉시 갱신(webhook을 기다리지 않고 화면에 바로 반영되도록)

**코드 변경**:
- `packages/lib/src/billing/subscription.ts`: `changeBasePlanImmediately`(신규) — 현재 plan의 line item을 찾아 `proration_behavior: "create_prorations"`로 새 price로 갱신
- `apps/web/src/server/billing.ts`: `changePlanImmediatelyFn`(신규) — 접근 판정 → 다운그레이드 검증 → `changeBasePlanImmediately` → `setAddonQuantity` → DB 갱신 순으로 처리
- `apps/web/src/components/billing/customer-billing-view.tsx`: "プラン変更" 카드(플랜 선택+add-on 선택+합계 표시+변경 버튼) 신설

**절차(로컬 검증, 미진행)**:
1. `/app/settings/billing`에서 플랜을 다른 것으로 선택하고 "プランを変更する" 클릭 → 화면이 바로 새 플랜 정보로 갱신되는지(리다이렉트 없이) 확인
2. `stripe subscriptions retrieve <sub_id>`로 base plan의 price가 즉시 바뀌어 있는지 확인
3. `stripe invoices create-preview`(또는 다음 인보이스 미리보기 API)로 다음 청구서에 프로레이션 항목(크레딧+재청구)이 포함되는지 확인, 위에서 계산한 예상 금액과 실측이 일치하는지 확인
4. 조직 사용량이 새 플랜 기준을 초과하는 상태에서 다운그레이드 시도 → 거부 메시지 확인
5. add-on 수량을 함께 바꿔 저장 → prompts add-on quantity가 정확히 반영되는지 확인

**결과**: 코드 구현·리뷰·회귀 테스트 완료. 로컬 브라우저 검증 미진행.

---

### 시나리오 17: 利用枠調整의 Stripe 청구 완전 분리

2026-07-29 세션에서 확정된 결정. Task 8 구현. 시나리오 3의 기존 실측(利用枠調整 저장 시 Stripe add-on quantity가 즉시 반영됨)을 정책적으로 뒤집는 변경.

**결정 내역**: 관리자가 `/admin/subscriptions`의 利用枠調整에서 `maxPrompts`/`enabledModels`를 바꾸는 것은 이제 **DB 값만 변경**하고 Stripe API를 전혀 호출하지 않는다. prompts add-on의 Stripe 반영은 이제 오직 고객의 셀프서비스 경로(시나리오 14, 16)를 통해서만 발생한다. 이 조작으로 추가 청구가 필요하다고 판단되면 관리자가 Stripe 콘솔에서 수동으로 처리한다.

**코드 변경**:
- `apps/web/src/server/subscription-admin.ts`(`updateOrgUsageAndAddonsFn`): `setAddonQuantity`/`getOrgBillingContext`/Stripe subscription 존재 확인 로직 전부 제거. `requireAdmin()` → `getBrandRow` → `updateBrandRow`만 남는 순수 DB 갱신 함수로 축소.
- `apps/web/src/server/subscription-admin.test.ts`: 소스 파일 텍스트를 직접 읽어 `@workspace/lib/billing/subscription`/`setAddonQuantity`/`getAddonByKey`/`getOrgBillingContext` 참조가 전혀 없음을 정적으로 검증하는 테스트 추가(리뷰에서 "Stripe mock이 애초에 호출될 길이 없어 검증이 공허하다"는 지적을 받고 수정) — 코드가 다시 Stripe를 호출하도록 되돌아가면 이 테스트가 실패함

**절차(로컬 검증, 미진행)**:
1. `/admin/subscriptions`에서 브랜드가 연결된 Stripe 고객의 利用枠調整으로 `maxPrompts`를 플랜 기준 초과로 설정하고 저장
2. `psql`로 `brands.max_prompts`가 갱신됐는지 확인(이건 계속 동작해야 함)
3. `stripe events list`로 이 저장 시점에 **아무 Stripe 이벤트도 발생하지 않는지** 확인(기존엔 `customer.subscription.updated`/`invoiceitem.created`가 있었으나 이제는 전혀 없어야 함)
4. `enabledModels`에 `claude`를 포함해 저장 → 과거엔 "Claude を有効化するには add-on の承認が必要です" 에러였던 경로가 이제는 정상 저장되는지 확인(claude add-on 자체는 시나리오 12에서 이미 폐지됨)

**결과**: 코드 구현·리뷰·회귀 테스트 완료(정적 소스 검사 테스트로 재발 방지 고정). 로컬 브라우저 검증 미진행.

---

## 3. 남은 작업 / 다음에 확인할 것

- [x] 시나리오 6(解約手続き) 끝까지 진행 — 확인 완료. 단, `status`는 청구 기간 종료 시점(`period_end`, 2026-08-27)에 가서야 `canceled`로 바뀌는 것이 정상이므로, 그 시점 도달 후 `customer.subscription.deleted` webhook으로 실제 `status=canceled` 반영까지는 아직 확인 안 함(로컬 테스트로는 시간을 앞당길 수 없어 추가 검증 보류)
- [x] 시나리오 7(임시 비밀번호 발급) 진행 — 확인 완료(`dddd`, 시나리오 8 검증에 활용). `RESEND_API_KEY` 미설정 상태라 실제 메일 발송 자체는 미확인.
- [x] 시나리오 3: `updateOrgUsageAndAddonsFn` 저장 시 Stripe add-on quantity가 실제로 변경되는지 Stripe CLI 로그로 명시 확인 — 확인 완료(즉시 반영, `customer.subscription.updated`/`invoiceitem.created` 이벤트 정상 수신). **주의**: 2026-07-29 정책 변경으로 이 실측은 더 이상 현재 동작과 다르다 — `updateOrgUsageAndAddonsFn`은 이제 Stripe를 전혀 호출하지 않는다(시나리오 17).
- [x] 고객이 직접 자신의 구독 상태를 볼 수 있는 화면이 없던 문제 — `/app/settings/billing` 신설로 해결(18번 설계, 시나리오 10). 로컬 브라우저 검증은 아직 미진행.
- [ ] 시나리오 11: 플랜별 기본값(maxPrompts/enabledModels)이 결제 완료/첫 브랜드 생성 시점에 실제로 세팅되는지 로컬 검증 필요 — 코드는 구현되어 있으나 브라우저/webhook으로 확인 안 됨
- [ ] 시나리오 12: STANDARD 6모델화 및 models/brand/claude add-on 폐지 — claude 활성화가 게이트 없이 통과하는지 로컬 검증 필요(利用枠調整의 Stripe 반영 여부는 시나리오 17로 대체됨 — "아무 반영도 없어야 함"이 새 기대값)
- [ ] 시나리오 14: 신규 가입 화면(select-plan)에서 prompts add-on 선택 → Checkout → webhook 반영 로컬 검증 필요
- [ ] 시나리오 15: 관리자 구독관리 플랜변경 UI 제거·읽기 전용화 로컬 검증 필요
- [ ] 시나리오 16: 고객 청구화면 즉시 플랜변경 + 프로레이션 청구 실측 로컬 검증 필요
- [ ] 시나리오 17: 利用枠調整 저장 시 Stripe 이벤트가 전혀 발생하지 않는지 로컬 검증 필요
- [ ] `RESEND_API_KEY` 설정 시 임시 비밀번호 메일이 실제로 발송되는지 확인
- [x] `dddd`의 `subscription.status`를 시나리오 8 재현을 위해 `psql`로 임시로 `canceled`로 바꿨던 것을 검증 완료 후 `active`로 원상복구함 (실제 Stripe 상태와 일치)
- [x] 삭제 거부 가드(시나리오 9)를 브라우저에서 실제로 재현 — 확인 완료. 대상을 `Test Corp`/`test4@sample.com`(org_id `141ef67d-e72b-4a18-875d-30027db2cd51`, 브랜드 0개, 동명 조직이 여러 개라 이메일로 특정)으로 삭제 시도 → "Stripeの解約手続きを先に行ってください"가 확인 다이얼로그 안에 정확히 표시되고 DB에도 조직이 그대로 남는 것을 확인. (도중 `Test Company Inc 2`로 먼저 시도했을 때 서버 로그의 `[customers] Auth0 delete skipped`로 혼선이 있었으나, 이는 브랜드가 남아있어 애초에 삭제 불가능한 별개 조직에 대한 것이었을 뿐 Stripe 가드 자체의 결함은 아니었음.) 남은 것: 해지 확정 후 동일 고객으로 삭제를 재시도해 정상 삭제되는지는 아직 미진행.
