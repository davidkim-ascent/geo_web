# 17 — Stripe 결제 연동 구현계획

> 목적: `16-Stripe결제연동.md` 명세를 기반으로 한 상세 구현계획(implementation plan). Task 단위 체크박스로 진행 상황을 추적한다.
> 작성일: 2026-07-23
> 작업 위치: `.claude/worktrees/stripe-billing`(worktree, 브랜치 `worktree-stripe-billing`) — 16번 명세 15.1절에 따라 별도 격리 후 완전히 검증된 뒤에만 `main`에 merge한다.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `16-Stripe결제연동.md` 명세대로 LIGHT/STANDARD/ADVANCED 구독제 결제를 `@better-auth/stripe` 플러그인으로 연동한다. 기존 관리자 수동(계좌이체) 온보딩은 100% 그대로 두고, Stripe 결제 organization만 새 경로로 추가한다.

**Architecture:** `organization_profile`에 `billingType`('stripe'|'manual', 기본 'manual') 컬럼을 추가해 두 경로를 나눈다. plan/구독 상태는 better-auth stripe 플러그인이 관리하는 `subscription` 테이블(`referenceId = organization.id`)을 유일한 진실 원천으로 조회하고, `organization_profile`에 별도 캐시하지 않는다. Webhook은 플러그인이 서명검증/기본 이벤트 처리를 하고, 우리 도메인 로직(brand 초기화, paywall, 이메일)은 `onEvent` 콜백 안에서 `processed_webhook_events` 테이블로 직접 멱등성을 보장하며 실행한다. Add-on(브랜드/프롬프트/모델/Claude 초과분)은 플러그인이 지원하지 않으므로 원시 Stripe SDK로 별도 subscription item을 추가/제거한다.

**Tech Stack:** TanStack Start, Drizzle ORM, better-auth v1.6.12 + `@better-auth/stripe`, Stripe Node SDK, Resend(이메일), Vitest.

**전제 조건 (사람이 사전에 준비):**
- Stripe 테스트 모드 계정, `STRIPE_SECRET_KEY`(sk_test_...), `STRIPE_WEBHOOK_SECRET`(whsec_...)를 로컬 `.env`에 설정.
- Stripe Dashboard(테스트 모드)에 Product+Price를 미리 등록: `light_monthly`, `light_annual`, `standard_monthly`, `standard_annual`, `advanced_monthly`, `advanced_annual`, `addon_brand`, `addon_prompts`, `addon_models`, `addon_claude` — 각 Price ID를 메모해 Task 3에서 코드에 넣는다. 금액은 16번 명세 5장/7장 참고(정확한 금액이 아직 없으면 테스트 모드용 임의 금액으로 등록해도 무방 — 실제 판매가는 별도 확정 예정).
- Stripe CLI 설치, `stripe login` 완료.

---

### Task 1: `billingType` 컬럼 추가 (안전한 기반작업 — 우선 merge 후보)

이 Task는 기존 organization을 전부 `manual`로 채울 뿐이고, 기존 코드 경로에 조건 분기를 추가하지 않는다. 나머지 Task 없이 이 Task만 단독으로 merge/배포해도 안전하다.

**Files:**
- Modify: `packages/lib/src/db/schema.ts`
- Create: `packages/lib/src/db/migrations/0035_billing_type.sql` (파일명은 `drizzle-kit generate` 실행 결과에 따라 달라질 수 있음 — Step 2에서 실제 생성된 파일명을 사용)
- Test: `packages/lib/src/db/schema.test.ts` (신규 생성)

- [ ] **Step 1: schema.ts에 billingType 컬럼 추가**

`packages/lib/src/db/schema.ts`의 `organizationProfile` 정의(15-38행에서 본 `brands` 바로 아래, 80행 부근)를 다음과 같이 수정한다:

```ts
export const billingTypeEnum = pgEnum("billing_type", ["stripe", "manual"]);

export const organizationProfile = pgTable(
	"organization_profile",
	{
		organizationId: text("organization_id")
			.primaryKey()
			.references(() => organization.id, { onDelete: "cascade" })
			.notNull(),
		contactName: text("contact_name").notNull().default(""),
		company: text("company").notNull(),
		phone: text("phone"),
		primaryEmail: text("primary_email").notNull(),
		secondaryEmails: text("secondary_emails").array().notNull().default([]),
		status: customerStatusEnum().notNull().default("active"),
		billingType: billingTypeEnum().notNull().default("manual"),
		signupCompletedAt: timestamp("signup_completed_at", { withTimezone: true }),
		delayOverrideHours: integer("delay_override_hours"),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => ({
		primaryEmailUidx: uniqueIndex("org_profile_primary_email_uidx").on(table.primaryEmail),
		statusIdx: index("org_profile_status_idx").on(table.status),
		billingTypeIdx: index("org_profile_billing_type_idx").on(table.billingType),
	}),
).enableRLS();
```

`pgEnum` import는 이미 1행에 있으므로 추가 import 불필요.

- [ ] **Step 2: 마이그레이션 생성**

```bash
cd packages/lib && npx drizzle-kit generate
```

Expected: `packages/lib/src/db/migrations/00XX_<random-slug>.sql`가 생성되고 `meta/_journal.json`에 새 항목이 추가됨. 생성된 SQL이 다음과 유사한지 확인한다(정확한 컬럼/기본값이 일치하면 OK, 표현 방식은 drizzle-kit이 자동 생성):

```sql
CREATE TYPE "public"."billing_type" AS ENUM('stripe', 'manual');--> statement-breakpoint
ALTER TABLE "organization_profile" ADD COLUMN "billing_type" "billing_type" DEFAULT 'manual' NOT NULL;--> statement-breakpoint
CREATE INDEX "org_profile_billing_type_idx" ON "organization_profile" USING btree ("billing_type");
```

- [ ] **Step 3: 로컬 DB에 마이그레이션 적용**

```bash
cd packages/lib && npx drizzle-kit migrate
```

Expected: 에러 없이 종료. `psql`로 확인:

```bash
psql "$DATABASE_URL" -c "\d organization_profile" | grep billing_type
```

Expected: `billing_type | billing_type | not null | default 'manual'::billing_type` 형태의 출력.

- [ ] **Step 4: 기존 row가 전부 manual인지 확인하는 테스트 작성**

`packages/lib/src/db/schema.test.ts` 신규 생성:

```ts
import { describe, it, expect } from "vitest";
import { organizationProfile } from "./schema";

describe("organizationProfile.billingType", () => {
	it("デフォルト値が manual である", () => {
		const column = organizationProfile.billingType;
		// drizzle의 컬럼 정의 객체에서 기본값 확인
		expect(column.default).toBe("manual");
	});

	it("stripe/manual 이외의 값을 허용하지 않는 enum이다", () => {
		const column = organizationProfile.billingType;
		expect(column.enumValues).toEqual(["stripe", "manual"]);
	});
});
```

- [ ] **Step 5: 테스트 실행**

```bash
cd packages/lib && npx vitest run src/db/schema.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 6: 커밋**

```bash
git add packages/lib/src/db/schema.ts packages/lib/src/db/migrations/ packages/lib/src/db/schema.test.ts
git commit -m "feat(billing): add organization_profile.billingType column (default manual)"
```

---

### Task 2: `processed_webhook_events` 테이블 (멱등성 기반작업)

`@better-auth/stripe` 플러그인은 `event.id`를 추적하지 않으므로(16번 명세 8장, 14장 확인 완료), 커스텀 `onEvent` 로직을 위한 자체 멱등성 테이블을 만든다.

**Files:**
- Modify: `packages/lib/src/db/schema.ts`
- Create: `packages/lib/src/db/migrations/00XX_processed_webhook_events.sql`
- Test: `packages/lib/src/billing/webhook-idempotency.test.ts`
- Create: `packages/lib/src/billing/webhook-idempotency.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/lib/src/billing/webhook-idempotency.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { insertMock } = vi.hoisted(() => ({ insertMock: vi.fn() }));

vi.mock("../db/db", () => ({
	db: {
		insert: insertMock,
	},
}));

import { markWebhookEventProcessed } from "./webhook-idempotency";

describe("markWebhookEventProcessed", () => {
	beforeEach(() => {
		insertMock.mockReset();
	});

	it("初回は true (未処理) を返す", async () => {
		insertMock.mockReturnValue({
			values: () => ({
				onConflictDoNothing: () => ({
					returning: async () => [{ eventId: "evt_1" }],
				}),
			}),
		});

		const result = await markWebhookEventProcessed("evt_1");
		expect(result).toBe(true);
	});

	it("重複 event.id は false (処理済み) を返す", async () => {
		insertMock.mockReturnValue({
			values: () => ({
				onConflictDoNothing: () => ({
					returning: async () => [], // unique制約違反でinsertされなかった
				}),
			}),
		});

		const result = await markWebhookEventProcessed("evt_1");
		expect(result).toBe(false);
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd packages/lib && npx vitest run src/billing/webhook-idempotency.test.ts
```

Expected: FAIL — `Cannot find module './webhook-idempotency'`.

- [ ] **Step 3: schema.ts에 테이블 추가**

`packages/lib/src/db/schema.ts`의 `alertNotifications` 정의(259행) 바로 위에 추가:

```ts
/**
 * Stripe webhook の `event.id` 単位の冪等性ガード。
 * @better-auth/stripe プラグイン自体は event.id を追跡しないため
 * (重複配信のたびに onEvent が再実行される)、カスタムドメインロジック
 * (brand 初期化・メール送信) 側でこのテーブルを使って重複実行を防ぐ。
 */
export const processedWebhookEvents = pgTable("processed_webhook_events", {
	eventId: text("event_id").primaryKey(),
	processedAt: timestamp("processed_at", { withTimezone: true }).defaultNow().notNull(),
}).enableRLS();
```

- [ ] **Step 4: マイグレーション生成・適用**

```bash
cd packages/lib && npx drizzle-kit generate && npx drizzle-kit migrate
```

Expected: `CREATE TABLE "processed_webhook_events" (...)` を含む新規マイグレーションファイルが作成され、エラーなく適用される。

- [ ] **Step 5: 実装**

`packages/lib/src/billing/webhook-idempotency.ts` 新規作成:

```ts
import { db } from "../db/db";
import { processedWebhookEvents } from "../db/schema";

/**
 * Stripe event.id を processed_webhook_events に記録しようと試みる。
 * 既に記録済み(unique制約)なら false を返し、呼び出し側は onEvent の
 * ドメインロジックをスキップする。
 */
export async function markWebhookEventProcessed(eventId: string): Promise<boolean> {
	const inserted = await db
		.insert(processedWebhookEvents)
		.values({ eventId })
		.onConflictDoNothing()
		.returning({ eventId: processedWebhookEvents.eventId });

	return inserted.length > 0;
}
```

- [ ] **Step 6: テスト実行**

```bash
cd packages/lib && npx vitest run src/billing/webhook-idempotency.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 7: `packages/lib/package.json`에 export 추가**

`exports` 맵(24-46행 부근)에 다음을 추가:

```json
    "./billing/webhook-idempotency": "./src/billing/webhook-idempotency.ts",
```

- [ ] **Step 8: コミット**

```bash
git add packages/lib/src/db/schema.ts packages/lib/src/db/migrations/ packages/lib/src/billing/webhook-idempotency.ts packages/lib/src/billing/webhook-idempotency.test.ts packages/lib/package.json
git commit -m "feat(billing): add processed_webhook_events table for onEvent idempotency"
```

---

### Task 3: Plan/Add-on 상수 정의

16번 명세 5장/7장에서 확정된 값을 코드 상수로 옮긴다. `<TBD>` Price ID는 사전 준비 단계(문서 상단)에서 Stripe Dashboard에 등록한 실제 테스트 Price ID로 교체한다.

**Files:**
- Create: `packages/lib/src/billing/plans.ts`
- Test: `packages/lib/src/billing/plans.test.ts`

- [ ] **Step 1: 実装 (テストより先に定数を定義 — 純粋なデータ定義のため TDD のテストは"形状"の検証のみ)**

`packages/lib/src/billing/plans.ts` 新規作成:

```ts
export type PlanName = "light" | "standard" | "advanced";

export interface StripePlanDefinition {
	name: PlanName;
	priceId: string;
	annualDiscountPriceId: string;
	maxPrompts: number;
	maxModels: number;
	maxBrands: number;
	/** 決済成功直後、enabledModels を1回だけ初期化する際に使う既定モデル一覧。 */
	defaultModels: string[];
}

export const REQUIRED_MODELS = [
	"chatgpt",
	"gemini",
	"google-ai-overview",
	"perplexity",
	"copilot",
	"google-ai-mode",
] as const;

export const STRIPE_PLANS: StripePlanDefinition[] = [
	{
		name: "light",
		priceId: process.env.STRIPE_PRICE_LIGHT_MONTHLY ?? "",
		annualDiscountPriceId: process.env.STRIPE_PRICE_LIGHT_ANNUAL ?? "",
		maxPrompts: 20,
		maxModels: 4,
		maxBrands: 1,
		defaultModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity"],
	},
	{
		name: "standard",
		priceId: process.env.STRIPE_PRICE_STANDARD_MONTHLY ?? "",
		annualDiscountPriceId: process.env.STRIPE_PRICE_STANDARD_ANNUAL ?? "",
		maxPrompts: 50,
		maxModels: 5,
		maxBrands: 1,
		defaultModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity", "copilot"],
	},
	{
		name: "advanced",
		priceId: process.env.STRIPE_PRICE_ADVANCED_MONTHLY ?? "",
		annualDiscountPriceId: process.env.STRIPE_PRICE_ADVANCED_ANNUAL ?? "",
		maxPrompts: 100,
		maxModels: 6,
		maxBrands: 2,
		defaultModels: [...REQUIRED_MODELS],
	},
];

export function getPlanByName(name: string): StripePlanDefinition | undefined {
	return STRIPE_PLANS.find((p) => p.name === name);
}

export type AddonKey = "brand" | "prompts" | "models" | "claude";

export interface AddonDefinition {
	key: AddonKey;
	priceId: string;
	/** brand/models/claude は 1単位ごとに +1 grant。prompts は 1単位ごとに +unitSize grant。 */
	unitSize: number;
}

export const STRIPE_ADDONS: AddonDefinition[] = [
	{ key: "brand", priceId: process.env.STRIPE_PRICE_ADDON_BRAND ?? "", unitSize: 1 },
	{ key: "prompts", priceId: process.env.STRIPE_PRICE_ADDON_PROMPTS ?? "", unitSize: 10 },
	{ key: "models", priceId: process.env.STRIPE_PRICE_ADDON_MODELS ?? "", unitSize: 1 },
	{ key: "claude", priceId: process.env.STRIPE_PRICE_ADDON_CLAUDE ?? "", unitSize: 1 },
];

export function getAddonByKey(key: string): AddonDefinition | undefined {
	return STRIPE_ADDONS.find((a) => a.key === key);
}

export function getAddonByPriceId(priceId: string): AddonDefinition | undefined {
	return STRIPE_ADDONS.find((a) => a.priceId === priceId);
}
```

- [ ] **Step 2: 実装を確認するテストを作成**

`packages/lib/src/billing/plans.test.ts` 新規作成:

```ts
import { describe, it, expect } from "vitest";
import { STRIPE_PLANS, STRIPE_ADDONS, getPlanByName, getAddonByKey, REQUIRED_MODELS } from "./plans";

describe("STRIPE_PLANS", () => {
	it("light/standard/advanced の3プランが存在する", () => {
		expect(STRIPE_PLANS.map((p) => p.name)).toEqual(["light", "standard", "advanced"]);
	});

	it("maxPrompts が明細通り 20/50/100 である", () => {
		expect(STRIPE_PLANS.map((p) => p.maxPrompts)).toEqual([20, 50, 100]);
	});

	it("maxBrands が明細通り 1/1/2 である", () => {
		expect(STRIPE_PLANS.map((p) => p.maxBrands)).toEqual([1, 1, 2]);
	});

	it("maxModels が明細通り 4/5/6 である", () => {
		expect(STRIPE_PLANS.map((p) => p.maxModels)).toEqual([4, 5, 6]);
	});

	it("各プランの defaultModels の件数が maxModels と一致する", () => {
		for (const plan of STRIPE_PLANS) {
			expect(plan.defaultModels.length).toBe(plan.maxModels);
		}
	});

	it("advanced の defaultModels は必須6モデル全てを含む", () => {
		const advanced = getPlanByName("advanced")!;
		expect(new Set(advanced.defaultModels)).toEqual(new Set(REQUIRED_MODELS));
	});

	it("standard の defaultModels は light の4つ + copilot", () => {
		const light = getPlanByName("light")!;
		const standard = getPlanByName("standard")!;
		expect(new Set(standard.defaultModels)).toEqual(new Set([...light.defaultModels, "copilot"]));
	});

	it("getPlanByName は存在しない名前で undefined を返す", () => {
		expect(getPlanByName("nonexistent")).toBeUndefined();
	});
});

describe("STRIPE_ADDONS", () => {
	it("brand/prompts/models/claude の4種類が存在する", () => {
		expect(STRIPE_ADDONS.map((a) => a.key).sort()).toEqual(["brand", "claude", "models", "prompts"].sort());
	});

	it("claude add-on の unitSize は 1 (on/off スイッチ型)", () => {
		expect(getAddonByKey("claude")!.unitSize).toBe(1);
	});

	it("getAddonByKey は存在しないキーで undefined を返す", () => {
		expect(getAddonByKey("nonexistent")).toBeUndefined();
	});
});
```

- [ ] **Step 3: テスト実行**

```bash
cd packages/lib && npx vitest run src/billing/plans.test.ts
```

Expected: PASS (11 tests). 이 테스트들은 16번 명세 5장/7장의 값이 코드에 정확히 반영됐는지 검증하는 역할이다.

- [ ] **Step 4: `packages/lib/package.json`에 export 추가**

```json
    "./billing/plans": "./src/billing/plans.ts",
```

- [ ] **Step 5: `.env.example`(존재하면) 또는 README에 필요한 환경변수 목록 추가**

`apps/web/.env`가 프로젝트 루트에 있는 것으로 확인되었으므로, 별도 문서화 없이 다음 환경변수가 필요하다는 것만 Task 11(검증)에서 사람이 채워 넣도록 남겨둔다:
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_LIGHT_MONTHLY`, `STRIPE_PRICE_LIGHT_ANNUAL`, `STRIPE_PRICE_STANDARD_MONTHLY`, `STRIPE_PRICE_STANDARD_ANNUAL`, `STRIPE_PRICE_ADVANCED_MONTHLY`, `STRIPE_PRICE_ADVANCED_ANNUAL`, `STRIPE_PRICE_ADDON_BRAND`, `STRIPE_PRICE_ADDON_PROMPTS`, `STRIPE_PRICE_ADDON_MODELS`, `STRIPE_PRICE_ADDON_CLAUDE`.

- [ ] **Step 6: コミット**

```bash
git add packages/lib/src/billing/plans.ts packages/lib/src/billing/plans.test.ts packages/lib/package.json
git commit -m "feat(billing): define plan and add-on constants per spec 16"
```

---

### Task 4: `@better-auth/stripe` 플러그인 설치 및 연결

**Files:**
- Modify: `packages/lib/package.json`
- Modify: `packages/lib/src/auth/server.ts`
- Test: `packages/lib/src/auth/server.test.ts` (신규 — 플러그인이 등록되는지만 확인)

- [ ] **Step 1: 依存追加**

```bash
cd packages/lib && pnpm add @better-auth/stripe@^1.6.12 stripe@^18
```

Expected: `package.json`의 `dependencies`에 두 패키지가 추가됨.

- [ ] **Step 2: 失敗するテストを書く**

`packages/lib/src/auth/server.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("../db/db", () => ({ db: {} }));

process.env.APP_URL = "http://localhost:3000";
process.env.BETTER_AUTH_SECRET = "test-secret";
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_dummy";
process.env.STRIPE_PRICE_LIGHT_MONTHLY = "price_light_m";
process.env.STRIPE_PRICE_LIGHT_ANNUAL = "price_light_a";
process.env.STRIPE_PRICE_STANDARD_MONTHLY = "price_standard_m";
process.env.STRIPE_PRICE_STANDARD_ANNUAL = "price_standard_a";
process.env.STRIPE_PRICE_ADVANCED_MONTHLY = "price_advanced_m";
process.env.STRIPE_PRICE_ADVANCED_ANNUAL = "price_advanced_a";

import { createAuth } from "./server";

describe("createAuth — stripe plugin", () => {
	it("stripe プラグインが options に登録されている", () => {
		const authInstance = createAuth();
		const pluginIds = (authInstance.options.plugins ?? []).map((p: { id: string }) => p.id);
		expect(pluginIds).toContain("stripe");
	});
});
```

- [ ] **Step 3: テスト失敗を確認**

```bash
cd packages/lib && npx vitest run src/auth/server.test.ts
```

Expected: FAIL(まだ plugins に stripe が無いため `pluginIds` に含まれない)。

- [ ] **Step 4: `packages/lib/src/auth/server.ts` を修正**

Import 追加(9-14行 부근):

```ts
import { type SSOOptions, sso } from "@better-auth/sso";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { hashPassword as _hashPassword } from "better-auth/crypto";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, customSession, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
```

`CreateAuthOptions`에 옵션 추가(21-36행):

```ts
export interface CreateAuthOptions {
	databaseHooks?: BetterAuthOptions["databaseHooks"];
	sso?: SSOOptions;
	trustedOrigins?: string[];
	emailAndPasswordEnabled?: boolean;
	minPasswordLength?: number;
	disableSignUp?: boolean;
	/** Stripe onEvent フック。billingType更新・brand初期化・冪等性チェック等のドメインロジックはここに集約する。 */
	stripeOnEvent?: (event: Stripe.Event) => Promise<void>;
}
```

`plugins` 배열(106-128행)에 stripe 플러그인 추가:

```ts
		plugins: [
			organization(),
			admin({
				ac,
				roles: {
					admin: adminRole,
					user: userRole,
				},
			}),
			sso(options?.sso),
			stripe({
				stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY ?? ""),
				stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
				createCustomerOnSignUp: false,
				organization: { enabled: true },
				subscription: {
					enabled: true,
					plans: STRIPE_PLANS.map((p) => ({
						name: p.name,
						priceId: p.priceId,
						annualDiscountPriceId: p.annualDiscountPriceId,
					})),
				},
				onEvent: options?.stripeOnEvent,
			}),
			customSession(async ({ user, session }) => {
				const u = user as Record<string, unknown>;
				return {
					user: {
						...user,
						role: (u.role as string) ?? "user",
						hasReportGeneratorAccess: u.hasReportGeneratorAccess === true,
					},
					session,
				};
			}),
			tanstackStartCookies(),
		],
```

`STRIPE_PLANS` import 추가(17-19행 부근):

```ts
import { db } from "../db/db";
import * as schema from "../db/schema";
import { ac, adminRole, userRole } from "./permissions";
import { STRIPE_PLANS } from "../billing/plans";
```

- [ ] **Step 5: テスト再実行**

```bash
cd packages/lib && npx vitest run src/auth/server.test.ts
```

Expected: PASS.

- [ ] **Step 6: 기존 auth 관련 테스트가 깨지지 않았는지 전체 확인**

```bash
cd packages/lib && npx vitest run
```

Expected: 全テスト PASS(新規追加分含む)。既存の better-auth まわりのテストが stripe プラグイン追加で壊れていないことを確認する。

- [ ] **Step 7: `apps/web/src/lib/auth/server.ts`에 stripe onEvent 연결 (Task 5에서 만들 handler를 임시 no-op으로 연결)**

`apps/web/src/lib/auth/server.ts`의 `getDeploymentAuthOptions` 또는 최상위 옵션 병합 지점(정확한 위치는 파일을 열어 확인 — 기존 코드에서 `getLocalAuthOptions()`/`getDeploymentAuthOptions()`가 반환하는 `CreateAuthOptions`에 병합)에 다음을 추가한다. Task 5에서 실제 `handleStripeWebhookEvent`로 교체할 예정이므로 지금은 아래처럼 인용만 해둔다:

```ts
import { handleStripeWebhookEvent } from "./stripe-webhook-handler";
// ...
// createAuth() 호출부의 옵션 객체에 추가:
stripeOnEvent: handleStripeWebhookEvent,
```

이 Step은 Task 5에서 `stripe-webhook-handler.ts`를 만든 뒤에 완성되므로, 지금은 이 파일이 아직 없어 타입에러가 난다는 것만 확인하고 다음 Task로 넘어간다(Task 5 Step 마지막에 재검증).

- [ ] **Step 8: コミット**

```bash
git add packages/lib/package.json packages/lib/src/auth/server.ts packages/lib/src/auth/server.test.ts pnpm-lock.yaml
git commit -m "feat(billing): wire up @better-auth/stripe plugin with org-scoped subscriptions"
```

---

### Task 5: Webhook `onEvent` 도메인 로직 (billingType 세팅, brand 초기화, 멱등성)

**Files:**
- Create: `apps/web/src/lib/auth/stripe-webhook-handler.ts`
- Create: `apps/web/src/lib/auth/stripe-webhook-handler.test.ts`
- Modify: `apps/web/src/lib/auth/server.ts` (Task 4 Step 7에서 미완성으로 남긴 import 완성)

- [ ] **Step 1: 失敗するテストを書く**

`apps/web/src/lib/auth/stripe-webhook-handler.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import type Stripe from "stripe";

const { markProcessedMock, updateBrandsMock, setBillingTypeMock, sendEmailMock, dbUpdateMock } = vi.hoisted(() => ({
	markProcessedMock: vi.fn(),
	updateBrandsMock: vi.fn(),
	setBillingTypeMock: vi.fn(),
	sendEmailMock: vi.fn(),
	dbUpdateMock: vi.fn(),
}));

vi.mock("@workspace/lib/billing/webhook-idempotency", () => ({
	markWebhookEventProcessed: markProcessedMock,
}));

vi.mock("@workspace/lib/billing/onboarding", () => ({
	initializeBrandsForNewSubscription: updateBrandsMock,
	setOrganizationBillingType: setBillingTypeMock,
}));

vi.mock("@workspace/lib/email", () => ({
	sendPaymentFailedEmail: sendEmailMock,
}));

import { handleStripeWebhookEvent } from "./stripe-webhook-handler";

function makeEvent(type: string, data: Record<string, unknown>): Stripe.Event {
	return {
		id: "evt_test_1",
		type,
		data: { object: data },
	} as unknown as Stripe.Event;
}

describe("handleStripeWebhookEvent", () => {
	beforeEach(() => {
		markProcessedMock.mockReset().mockResolvedValue(true);
		updateBrandsMock.mockReset().mockResolvedValue(undefined);
		setBillingTypeMock.mockReset().mockResolvedValue(undefined);
		sendEmailMock.mockReset().mockResolvedValue(true);
	});

	it("checkout.session.completed で billingType を stripe に設定し、brand を初期化する", async () => {
		const event = makeEvent("checkout.session.completed", {
			id: "cs_1",
			metadata: { referenceId: "org_123" },
		});

		await handleStripeWebhookEvent(event);

		expect(setBillingTypeMock).toHaveBeenCalledWith("org_123", "stripe");
		expect(updateBrandsMock).toHaveBeenCalledWith("org_123");
	});

	it("invoice.payment_failed でメール送信する", async () => {
		const event = makeEvent("invoice.payment_failed", {
			id: "in_1",
			customer: "cus_123",
			subscription: "sub_123",
		});

		await handleStripeWebhookEvent(event);

		expect(sendEmailMock).toHaveBeenCalled();
	});

	it("同じ event.id が二重配信された場合、二回目はドメインロジックを実行しない", async () => {
		markProcessedMock.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
		const event = makeEvent("checkout.session.completed", {
			id: "cs_1",
			metadata: { referenceId: "org_123" },
		});

		await handleStripeWebhookEvent(event);
		await handleStripeWebhookEvent(event);

		expect(setBillingTypeMock).toHaveBeenCalledTimes(1);
		expect(updateBrandsMock).toHaveBeenCalledTimes(1);
	});

	it("認識しないイベントタイプは何もしない", async () => {
		const event = makeEvent("customer.updated", {});
		await handleStripeWebhookEvent(event);

		expect(setBillingTypeMock).not.toHaveBeenCalled();
		expect(updateBrandsMock).not.toHaveBeenCalled();
		expect(sendEmailMock).not.toHaveBeenCalled();
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd apps/web && npx vitest run src/lib/auth/stripe-webhook-handler.test.ts
```

Expected: FAIL — `Cannot find module './stripe-webhook-handler'`.

- [ ] **Step 3: `packages/lib/src/billing/onboarding.ts` 実装 (先に依存先を作る)**

```ts
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { brands, organizationProfile } from "../db/schema";
import { getPlanByName } from "./plans";

export async function setOrganizationBillingType(organizationId: string, billingType: "stripe" | "manual"): Promise<void> {
	await db
		.update(organizationProfile)
		.set({ billingType, updatedAt: new Date() })
		.where(eq(organizationProfile.organizationId, organizationId));
}

/**
 * 決済成功直後、organization 傘下の brand の maxPrompts/enabledModels を
 * plan の初期値で1回だけ初期化する(16番仕様 6.1節)。
 */
export async function initializeBrandsForNewSubscription(organizationId: string, planName: string): Promise<void> {
	const plan = getPlanByName(planName);
	if (!plan) return;

	await db
		.update(brands)
		.set({
			maxPrompts: plan.maxPrompts,
			enabledModels: plan.defaultModels,
			updatedAt: new Date(),
		})
		.where(eq(brands.organizationId, organizationId));
}
```

- [ ] **Step 4: `packages/lib/src/billing/onboarding.test.ts` 作成**

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { updateMock, setMock, whereMock } = vi.hoisted(() => ({
	updateMock: vi.fn(),
	setMock: vi.fn(),
	whereMock: vi.fn(),
}));

vi.mock("../db/db", () => ({
	db: { update: updateMock },
}));

import { setOrganizationBillingType, initializeBrandsForNewSubscription } from "./onboarding";

describe("onboarding", () => {
	beforeEach(() => {
		whereMock.mockReset().mockResolvedValue(undefined);
		setMock.mockReset().mockReturnValue({ where: whereMock });
		updateMock.mockReset().mockReturnValue({ set: setMock });
	});

	it("setOrganizationBillingType は billingType を更新する", async () => {
		await setOrganizationBillingType("org_1", "stripe");
		expect(setMock).toHaveBeenCalledWith(expect.objectContaining({ billingType: "stripe" }));
	});

	it("initializeBrandsForNewSubscription は light プランの初期値を設定する", async () => {
		await initializeBrandsForNewSubscription("org_1", "light");
		expect(setMock).toHaveBeenCalledWith(
			expect.objectContaining({
				maxPrompts: 20,
				enabledModels: ["chatgpt", "gemini", "google-ai-overview", "perplexity"],
			}),
		);
	});

	it("存在しないプラン名では何もしない", async () => {
		await initializeBrandsForNewSubscription("org_1", "nonexistent");
		expect(updateMock).not.toHaveBeenCalled();
	});
});
```

```bash
cd packages/lib && npx vitest run src/billing/onboarding.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: `packages/lib/src/email.ts`에 결제실패 메일 함수 추가**

`packages/lib/src/email.ts` 파일 끝(309행)에 추가:

```ts
export interface PaymentFailedEmailParams {
	to: string;
	organizationName: string;
	billingPortalUrl: string;
}

export function buildPaymentFailedEmail(params: PaymentFailedEmailParams): { subject: string; html: string } {
	return {
		subject: "[GEO Watcher] お支払いに問題が発生しました — サービスが一時停止されました",
		html: `<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 40px auto; color: #1a1a1a; line-height: 1.7;">
  <h2 style="color: #dc2626;">お支払いに問題が発生しました</h2>
  <p>${params.organizationName} 様のお支払いを確認できなかったため、サービスへのアクセスを一時停止いたしました。</p>
  <p>お手数ですが、下記より お支払い方法をご確認ください。</p>
  <p><a href="${params.billingPortalUrl}" style="background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">お支払い方法を確認する</a></p>
  <p>ご不明な点がございましたら、サポートまでご連絡ください。</p>
</body>
</html>`,
	};
}

export async function sendPaymentFailedEmail(params: PaymentFailedEmailParams): Promise<boolean> {
	const apiKey = getResendApiKey();
	if (!apiKey) {
		console.warn("[email] RESEND API key not set, skipping payment failed email");
		return false;
	}

	const resend = new Resend(apiKey);
	const message = buildPaymentFailedEmail(params);
	const { error } = await resend.emails.send({
		from: `GEO Watcher <${getMailFromAddress()}>`,
		to: params.to,
		subject: message.subject,
		html: message.html,
	});

	if (error) {
		console.error("[email] Failed to send payment failed email:", error);
		return false;
	}

	return true;
}
```

`getResendApiKey`/`getMailFromAddress`는 이미 같은 파일(109-115행)에 있으므로 추가 import 불필요.

- [ ] **Step 6: email.ts 테스트 파일이 있다면 확인, 없으면 신설하지 않고 다음으로 진행 (기존 email.ts에 테스트 파일 없음 확인됨 — 이 함수는 Step 8 handler 테스트에서 mock으로 간접 검증)**

- [ ] **Step 7: `apps/web/src/lib/auth/stripe-webhook-handler.ts` 実装**

```ts
import type Stripe from "stripe";
import { markWebhookEventProcessed } from "@workspace/lib/billing/webhook-idempotency";
import { initializeBrandsForNewSubscription, setOrganizationBillingType } from "@workspace/lib/billing/onboarding";
import { sendPaymentFailedEmail } from "@workspace/lib/email";
import { db } from "@workspace/lib/db/db";
import { organizationProfile } from "@workspace/lib/db/schema";
import { eq } from "drizzle-orm";

async function getOrgBillingContactEmail(organizationId: string): Promise<string | null> {
	const [row] = await db
		.select({ primaryEmail: organizationProfile.primaryEmail })
		.from(organizationProfile)
		.where(eq(organizationProfile.organizationId, organizationId))
		.limit(1);
	return row?.primaryEmail ?? null;
}

/**
 * @better-auth/stripe プラグインの onEvent フック。
 * プラグイン自身が event.id を追跡しないため(重複配信のたびに再実行される)、
 * 冒頭で必ず markWebhookEventProcessed をチェックし、既処理ならここで打ち切る。
 */
export async function handleStripeWebhookEvent(event: Stripe.Event): Promise<void> {
	const shouldProcess = await markWebhookEventProcessed(event.id);
	if (!shouldProcess) {
		return;
	}

	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object as Stripe.Checkout.Session;
			const organizationId = session.metadata?.referenceId;
			const planName = session.metadata?.plan;
			if (!organizationId) break;

			await setOrganizationBillingType(organizationId, "stripe");
			if (planName) {
				await initializeBrandsForNewSubscription(organizationId, planName);
			}
			break;
		}

		case "invoice.payment_failed": {
			const invoice = event.data.object as Stripe.Invoice;
			const organizationId = (invoice as unknown as { subscription_details?: { metadata?: { referenceId?: string } } })
				.subscription_details?.metadata?.referenceId;
			if (!organizationId) break;

			const email = await getOrgBillingContactEmail(organizationId);
			if (email) {
				await sendPaymentFailedEmail({
					to: email,
					organizationName: organizationId,
					billingPortalUrl: `${process.env.APP_URL}/app/settings/billing`,
				});
			}
			break;
		}

		default:
			break;
	}
}
```

**注意:** `checkout.session.completed` の `metadata.referenceId`/`metadata.plan` は、Task 7 で client 側 `authClient.subscription.upgrade({ referenceId, plan, metadata })` 呼び出し時に明示的に埋める必要がある(better-auth 側が自動で `metadata.plan` を埋めるわけではない — Task 7 で `getCheckoutSessionParams` フックか、upgrade 呼び出し時の `metadata` 引数で明示的に渡す)。`invoice.payment_failed` の organizationId 取得方法(`subscription_details.metadata`)は Stripe API バージョンによりフィールド名が異なる場合があるため、Task 8 の実機検証で実際のペイロードを確認し必要なら調整する。

- [ ] **Step 8: テスト再実行**

```bash
cd apps/web && npx vitest run src/lib/auth/stripe-webhook-handler.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 9: Task 4 Step 7で保留した import を完成させる**

`apps/web/src/lib/auth/server.ts`에서 `stripeOnEvent: handleStripeWebhookEvent`가 실제로 타입 체크를 통과하는지 확인:

```bash
cd apps/web && npx tsc --noEmit
```

Expected: エラーなし。

- [ ] **Step 10: コミット**

```bash
git add apps/web/src/lib/auth/stripe-webhook-handler.ts apps/web/src/lib/auth/stripe-webhook-handler.test.ts apps/web/src/lib/auth/server.ts packages/lib/src/billing/onboarding.ts packages/lib/src/billing/onboarding.test.ts packages/lib/src/email.ts packages/lib/package.json
git commit -m "feat(billing): implement onEvent domain logic with idempotency guard"
```

---

### Task 6: Add-on 실효 한도 계산 및 Stripe subscription item 조작

**Files:**
- Create: `packages/lib/src/billing/subscription.ts`
- Create: `packages/lib/src/billing/subscription.test.ts`

- [ ] **Step 1: 失敗するテストを書く**

`packages/lib/src/billing/subscription.test.ts` 신규 생성:

```ts
import { describe, it, expect } from "vitest";
import { calculateEffectiveLimits } from "./subscription";

describe("calculateEffectiveLimits", () => {
	it("add-on 数量ゼロなら plan の基本値のまま", () => {
		const result = calculateEffectiveLimits(
			{ name: "light", maxPrompts: 20, maxModels: 4, maxBrands: 1 } as never,
			{ brand: 0, prompts: 0, models: 0, claude: 0 },
		);
		expect(result).toEqual({
			effectiveMaxBrands: 1,
			effectiveMaxPrompts: 20,
			effectiveMaxModels: 4,
			claudeEnabled: false,
		});
	});

	it("brand add-on 数量1で effectiveMaxBrands が +1 される", () => {
		const result = calculateEffectiveLimits(
			{ name: "advanced", maxPrompts: 100, maxModels: 6, maxBrands: 2 } as never,
			{ brand: 1, prompts: 0, models: 0, claude: 0 },
		);
		expect(result.effectiveMaxBrands).toBe(3);
	});

	it("prompts add-on はunitSize(10)単位で加算される", () => {
		const result = calculateEffectiveLimits(
			{ name: "light", maxPrompts: 20, maxModels: 4, maxBrands: 1 } as never,
			{ brand: 0, prompts: 2, models: 0, claude: 0 },
		);
		expect(result.effectiveMaxPrompts).toBe(40);
	});

	it("claude add-on 数量1以上で claudeEnabled が true になる", () => {
		const result = calculateEffectiveLimits(
			{ name: "light", maxPrompts: 20, maxModels: 4, maxBrands: 1 } as never,
			{ brand: 0, prompts: 0, models: 0, claude: 1 },
		);
		expect(result.claudeEnabled).toBe(true);
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd packages/lib && npx vitest run src/billing/subscription.test.ts
```

Expected: FAIL — `Cannot find module './subscription'`.

- [ ] **Step 3: 実装**

`packages/lib/src/billing/subscription.ts` 신규 생성:

```ts
import Stripe from "stripe";
import type { StripePlanDefinition } from "./plans";
import { getAddonByKey, getAddonByPriceId } from "./plans";

export interface AddonQuantities {
	brand: number;
	prompts: number;
	models: number;
	claude: number;
}

export interface EffectiveLimits {
	effectiveMaxBrands: number;
	effectiveMaxPrompts: number;
	effectiveMaxModels: number;
	claudeEnabled: boolean;
}

export function calculateEffectiveLimits(plan: StripePlanDefinition, addons: AddonQuantities): EffectiveLimits {
	const promptsAddon = getAddonByKey("prompts");
	return {
		effectiveMaxBrands: plan.maxBrands + addons.brand,
		effectiveMaxPrompts: plan.maxPrompts + addons.prompts * (promptsAddon?.unitSize ?? 1),
		effectiveMaxModels: plan.maxModels + addons.models,
		claudeEnabled: addons.claude >= 1,
	};
}

function getStripeClient(): Stripe {
	return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

/**
 * Stripe subscription から add-on ごとの現在数量を読み取る。
 * plugin管理下の base plan price は無視し、STRIPE_ADDONS に登録された
 * priceId に一致する line item だけを合算する。
 */
export async function readAddonQuantities(stripeSubscriptionId: string): Promise<AddonQuantities> {
	const stripe = getStripeClient();
	const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId, {
		expand: ["items.data.price"],
	});

	const quantities: AddonQuantities = { brand: 0, prompts: 0, models: 0, claude: 0 };
	for (const item of subscription.items.data) {
		const addon = getAddonByPriceId(item.price.id);
		if (!addon) continue;
		quantities[addon.key] += item.quantity ?? 0;
	}
	return quantities;
}

/**
 * 管理者が承認した add-on 数量を Stripe subscription に反映する。
 * 既存の line item があれば数量更新、なければ新規追加、0にする場合は削除する。
 * プラグインが管理する base plan の line item には触れない
 * (別 priceId のため resolvePlanItem に一致せず、プラグインの upgrade 処理と衝突しない)。
 */
export async function setAddonQuantity(stripeSubscriptionId: string, addonKey: AddonQuantities extends infer T ? keyof T : never, quantity: number): Promise<void> {
	const addon = getAddonByKey(addonKey as string);
	if (!addon) throw new Error(`Unknown add-on: ${String(addonKey)}`);

	const stripe = getStripeClient();
	const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId, {
		expand: ["items.data.price"],
	});

	const existingItem = subscription.items.data.find((item) => item.price.id === addon.priceId);

	if (quantity <= 0) {
		if (existingItem) {
			await stripe.subscriptionItems.del(existingItem.id);
		}
		return;
	}

	if (existingItem) {
		await stripe.subscriptionItems.update(existingItem.id, { quantity });
	} else {
		await stripe.subscriptionItems.create({
			subscription: stripeSubscriptionId,
			price: addon.priceId,
			quantity,
		});
	}
}
```

- [ ] **Step 4: テスト再実行**

```bash
cd packages/lib && npx vitest run src/billing/subscription.test.ts
```

Expected: PASS (4 tests — `calculateEffectiveLimits`만 순수함수라 테스트 대상. `readAddonQuantities`/`setAddonQuantity`는 실제 Stripe API를 호출하므로 단위테스트 대상에서 제외하고 Task 11의 수동 검증에서 확인).

- [ ] **Step 5: `packages/lib/package.json`에 export 추가**

```json
    "./billing/subscription": "./src/billing/subscription.ts",
```

- [ ] **Step 6: コミット**

```bash
git add packages/lib/src/billing/subscription.ts packages/lib/src/billing/subscription.test.ts packages/lib/package.json
git commit -m "feat(billing): compute effective limits and manage Stripe add-on line items"
```

---

### Task 7: Paywall 판정 (접근 차단)

**Files:**
- Modify: `apps/web/src/lib/auth/helpers.ts`
- Test: `apps/web/src/lib/auth/helpers.test.ts` (기존 파일이 없으면 신규 생성 — Explore로 먼저 확인 필요, 없다고 가정하고 신규 작성 지침 제공)

- [ ] **Step 1: 既存テストの有無を確認**

```bash
ls apps/web/src/lib/auth/*.test.ts 2>/dev/null
```

파일이 있으면 그 파일에 추가, 없으면 Step 2에서 신규 생성한다.

- [ ] **Step 2: 失敗するテストを書く**

`apps/web/src/lib/auth/helpers.test.ts`(신규 또는 기존 파일에 추가):

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { selectMock, fromMock, leftJoinMock, whereMock, limitMock } = vi.hoisted(() => ({
	selectMock: vi.fn(),
	fromMock: vi.fn(),
	leftJoinMock: vi.fn(),
	whereMock: vi.fn(),
	limitMock: vi.fn(),
}));

vi.mock("@workspace/lib/db/db", () => ({
	db: { select: selectMock },
}));

import { checkOrgAccess } from "./helpers";

describe("checkOrgAccess — billing 状態チェック", () => {
	beforeEach(() => {
		limitMock.mockReset();
		whereMock.mockReset().mockReturnValue({ limit: limitMock });
		leftJoinMock.mockReset().mockReturnValue({ where: whereMock });
		fromMock.mockReset().mockReturnValue({ leftJoin: leftJoinMock });
		selectMock.mockReset().mockReturnValue({ from: fromMock });
	});

	it("billingType が manual の場合、status が active なら true", async () => {
		limitMock.mockResolvedValue([{ id: "m1", status: "active", billingType: "manual", subscriptionStatus: null }]);
		const result = await checkOrgAccess("user_1", "org_1");
		expect(result).toBe(true);
	});

	it("billingType が stripe で subscriptionStatus が active なら true", async () => {
		limitMock.mockResolvedValue([{ id: "m1", status: "active", billingType: "stripe", subscriptionStatus: "active" }]);
		const result = await checkOrgAccess("user_1", "org_1");
		expect(result).toBe(true);
	});

	it("billingType が stripe で subscriptionStatus が past_due なら false", async () => {
		limitMock.mockResolvedValue([{ id: "m1", status: "active", billingType: "stripe", subscriptionStatus: "past_due" }]);
		const result = await checkOrgAccess("user_1", "org_1");
		expect(result).toBe(false);
	});

	it("billingType が stripe で subscriptionStatus が trialing なら true", async () => {
		limitMock.mockResolvedValue([{ id: "m1", status: "active", billingType: "stripe", subscriptionStatus: "trialing" }]);
		const result = await checkOrgAccess("user_1", "org_1");
		expect(result).toBe(true);
	});
});
```

- [ ] **Step 3: テスト失敗を確認**

```bash
cd apps/web && npx vitest run src/lib/auth/helpers.test.ts
```

Expected: FAIL — 現状の `checkOrgAccess` は `billingType`/`subscriptionStatus` を見ていないため、stripe+past_due のケースで `true` を返してしまいテストが落ちる。

- [ ] **Step 4: `checkOrgAccess` を修正**

`apps/web/src/lib/auth/helpers.ts`의 45-57행을 다음으로 교체:

```ts
export async function checkOrgAccess(userId: string, orgId: string): Promise<boolean> {
	const [row] = await db
		.select({
			id: member.id,
			status: organizationProfile.status,
			billingType: organizationProfile.billingType,
		})
		.from(member)
		.leftJoin(organizationProfile, eq(organizationProfile.organizationId, member.organizationId))
		.where(and(eq(member.userId, userId), eq(member.organizationId, orgId)))
		.limit(1);
	if (!row) return false;
	// Allow-list, not deny-list: grant access only when the profile exists and
	// is explicitly "active". A missing profile (NULL status) fails closed
	// rather than open (every customer org gets a profile at creation).
	if (row.status !== "active") return false;

	// Stripe 決済組織は、さらに Stripe subscription の状態を確認する
	// (16番仕様13章)。manual 組織はこのチェックを完全にスキップする。
	if (row.billingType === "stripe") {
		const subscriptionStatus = await getSubscriptionStatus(orgId);
		return subscriptionStatus === "active" || subscriptionStatus === "trialing";
	}

	return true;
}

async function getSubscriptionStatus(organizationId: string): Promise<string | null> {
	const [row] = await db
		.select({ status: subscription.status })
		.from(subscription)
		.where(eq(subscription.referenceId, organizationId))
		.orderBy(desc(subscription.periodStart))
		.limit(1);
	return row?.status ?? null;
}
```

Import 문(4-8행)에 다음을 추가:

```ts
import { getRequestHeaders } from "@tanstack/react-start/server";
import { db } from "@workspace/lib/db/db";
import { member, organization, brands, organizationProfile, subscription } from "@workspace/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "./server";
```

**주의:** `subscription` 테이블은 `@better-auth/stripe` 플러그인이 `packages/lib/src/db/schema-auth.ts`에 자동 생성하므로(Task 4에서 플러그인 등록 후 `pnpm run generate:auth-schema` 재실행 필요 — Step 4.5 참고), 이 Task 착수 전 Task 4 완료 후 반드시 스키마 재생성을 먼저 실행한다.

- [ ] **Step 4.5: auth 스키마 재생성 (Task 4에서 누락되었을 경우 여기서 확인)**

```bash
cd packages/lib && pnpm run generate:auth-schema
git diff src/db/schema-auth.ts
```

Expected: `subscription` 테이블이 `schema-auth.ts`에 새로 추가됨(컬럼: `id`, `plan`, `referenceId`, `stripeCustomerId`, `stripeSubscriptionId`, `status`, `periodStart`, `periodEnd`, `cancelAtPeriodEnd`, `seats`, `trialStart`, `trialEnd`, `billingInterval` 등). 변경분에 대해 Task 4의 Step 4에서 이미 마이그레이션을 생성/적용하지 않았다면 여기서:

```bash
cd packages/lib && npx drizzle-kit generate && npx drizzle-kit migrate
```

- [ ] **Step 5: テスト再実行**

```bash
cd apps/web && npx vitest run src/lib/auth/helpers.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 6: 기존 helpers 관련 테스트가 깨지지 않았는지 전체 확인**

```bash
cd apps/web && npx vitest run
```

Expected: 全テスト PASS。

- [ ] **Step 7: コミット**

```bash
git add apps/web/src/lib/auth/helpers.ts apps/web/src/lib/auth/helpers.test.ts packages/lib/src/db/schema-auth.ts packages/lib/src/db/migrations/
git commit -m "feat(billing): enforce paywall for stripe orgs via subscription.status"
```

---

### Task 8: 회원가입 → 플랜 선택 → Checkout UI

**Files:**
- Create: `apps/web/src/server/billing.ts`
- Create: `apps/web/src/server/billing.test.ts`
- Create: `apps/web/src/routes/_authed/app_.billing.select-plan.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`apps/web/src/server/billing.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { requireAuthSessionMock, upgradeMock } = vi.hoisted(() => ({
	requireAuthSessionMock: vi.fn(),
	upgradeMock: vi.fn(),
}));

vi.mock("@/lib/auth/helpers", () => ({
	requireAuthSession: requireAuthSessionMock,
}));

vi.mock("@/lib/auth/server", () => ({
	auth: { api: { upgradeSubscription: upgradeMock } },
}));

vi.mock("@tanstack/react-start", () => ({
	createServerFn: () => ({
		inputValidator: () => ({
			handler: (fn: (args: { data: unknown }) => unknown) => fn,
		}),
	}),
}));

import { startCheckoutFn } from "./billing";

describe("startCheckoutFn", () => {
	beforeEach(() => {
		requireAuthSessionMock.mockReset().mockResolvedValue({
			user: { id: "user_1" },
			session: { activeOrganizationId: "org_1" },
		});
		upgradeMock.mockReset().mockResolvedValue({ url: "https://checkout.stripe.com/xyz" });
	});

	it("有効な plan で Checkout URL を返す", async () => {
		const result = await startCheckoutFn({ data: { plan: "light", annual: false } });
		expect(result).toEqual({ url: "https://checkout.stripe.com/xyz" });
	});

	it("不正な plan 名は拒否する", async () => {
		await expect(startCheckoutFn({ data: { plan: "invalid", annual: false } })).rejects.toThrow();
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd apps/web && npx vitest run src/server/billing.test.ts
```

Expected: FAIL — `Cannot find module './billing'`.

- [ ] **Step 3: 実装**

`apps/web/src/server/billing.ts` 신규 생성:

```ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthSession } from "@/lib/auth/helpers";
import { auth } from "@/lib/auth/server";
import { getPlanByName } from "@workspace/lib/billing/plans";

const startCheckoutInputSchema = z.object({
	plan: z.enum(["light", "standard", "advanced"]),
	annual: z.boolean(),
});

export const startCheckoutFn = createServerFn({ method: "POST" })
	.inputValidator(startCheckoutInputSchema)
	.handler(async ({ data }) => {
		const session = await requireAuthSession();
		const orgId = (session.session as { activeOrganizationId?: string }).activeOrganizationId;
		if (!orgId) throw new Error("組織が選択されていません");

		const plan = getPlanByName(data.plan);
		if (!plan) throw new Error("無効なプランです");

		const result = await auth.api.upgradeSubscription({
			body: {
				plan: data.plan,
				annual: data.annual,
				referenceId: orgId,
				customerType: "organization",
				metadata: { referenceId: orgId, plan: data.plan },
				successUrl: `${process.env.APP_URL}/app/billing/success`,
				cancelUrl: `${process.env.APP_URL}/app/billing/select-plan`,
			},
		});

		return { url: (result as { url: string }).url };
	});

export const openBillingPortalFn = createServerFn({ method: "POST" }).handler(async () => {
	const session = await requireAuthSession();
	const orgId = (session.session as { activeOrganizationId?: string }).activeOrganizationId;
	if (!orgId) throw new Error("組織が選択されていません");

	const result = await auth.api.createBillingPortal({
		body: {
			referenceId: orgId,
			customerType: "organization",
			returnUrl: `${process.env.APP_URL}/app/settings/billing`,
		},
	});

	return { url: (result as { url: string }).url };
});
```

- [ ] **Step 4: テスト再実行**

```bash
cd apps/web && npx vitest run src/server/billing.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 5: プラン選択画面 実装**

`apps/web/src/routes/_authed/app_.billing.select-plan.tsx` 신규 생성:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { STRIPE_PLANS } from "@workspace/lib/billing/plans";
import { startCheckoutFn } from "@/server/billing";

export const Route = createFileRoute("/_authed/app_/billing/select-plan")({
	component: SelectPlanPage,
});

const PLAN_LABELS: Record<string, { title: string; monthlyPrice: string; annualPrice: string }> = {
	light: { title: "LIGHT", monthlyPrice: "¥29,800", annualPrice: "¥298,000" },
	standard: { title: "STANDARD", monthlyPrice: "¥39,800", annualPrice: "¥398,000" },
	advanced: { title: "ADVANCED", monthlyPrice: "¥79,800", annualPrice: "¥798,000" },
};

function SelectPlanPage() {
	const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
	const [annual, setAnnual] = useState(false);

	async function handleSelect(planName: string) {
		setLoadingPlan(planName);
		try {
			const { url } = await startCheckoutFn({ data: { plan: planName as "light" | "standard" | "advanced", annual } });
			window.location.href = url;
		} finally {
			setLoadingPlan(null);
		}
	}

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-6 text-2xl font-bold">プランを選択してください</h1>
			<label className="mb-6 flex items-center gap-2">
				<input type="checkbox" checked={annual} onChange={(e) => setAnnual(e.target.checked)} />
				年払い(2ヶ月分お得)
			</label>
			<div className="grid grid-cols-3 gap-4">
				{STRIPE_PLANS.map((plan) => {
					const label = PLAN_LABELS[plan.name];
					return (
						<div key={plan.name} className="rounded-lg border p-6">
							<h2 className="text-lg font-semibold">{label.title}</h2>
							<p className="my-2 text-2xl">{annual ? label.annualPrice : label.monthlyPrice}</p>
							<p className="text-sm text-gray-500">プロンプト上限 {plan.maxPrompts}件 / モデル{plan.maxModels}個</p>
							<button
								type="button"
								disabled={loadingPlan !== null}
								onClick={() => handleSelect(plan.name)}
								className="mt-4 w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
							>
								{loadingPlan === plan.name ? "処理中..." : "このプランで開始"}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
```

- [ ] **Step 6: コミット**

```bash
git add apps/web/src/server/billing.ts apps/web/src/server/billing.test.ts apps/web/src/routes/_authed/app_.billing.select-plan.tsx
git commit -m "feat(billing): add plan selection page and checkout/portal server functions"
```

---

### Task 9: Admin — add-on 조정 UI

기존 admin 고객관리 화면(`apps/web/src/components/admin/customer-management.tsx`)에 결제/구독 정보 조회와 add-on 조정 섹션을 추가한다. 브랜드 생성/`maxPrompts`/`enabledModels` 편집/정지·삭제는 기존 기능을 그대로 사용하며 이 Task에서 변경하지 않는다(16번 명세 12장).

**Files:**
- Create: `apps/web/src/server/billing-admin.ts`
- Create: `apps/web/src/server/billing-admin.test.ts`
- Modify: `apps/web/src/components/admin/customer-management.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`apps/web/src/server/billing-admin.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { requireAdminMock, selectMock, fromMock, whereMock, limitMock, setAddonMock } = vi.hoisted(() => ({
	requireAdminMock: vi.fn(),
	selectMock: vi.fn(),
	fromMock: vi.fn(),
	whereMock: vi.fn(),
	limitMock: vi.fn(),
	setAddonMock: vi.fn(),
}));

vi.mock("@/lib/auth/helpers", () => ({ requireAdmin: requireAdminMock }));
vi.mock("@workspace/lib/db/db", () => ({ db: { select: selectMock } }));
vi.mock("@workspace/lib/billing/subscription", () => ({ setAddonQuantity: setAddonMock }));
vi.mock("@tanstack/react-start", () => ({
	createServerFn: () => ({
		inputValidator: () => ({
			handler: (fn: (args: { data: unknown }) => unknown) => fn,
		}),
	}),
}));

import { updateOrgAddonQuantityFn } from "./billing-admin";

describe("updateOrgAddonQuantityFn", () => {
	beforeEach(() => {
		requireAdminMock.mockReset().mockResolvedValue({ user: { id: "admin_1", role: "admin" } });
		limitMock.mockReset().mockResolvedValue([{ stripeSubscriptionId: "sub_123" }]);
		whereMock.mockReset().mockReturnValue({ limit: limitMock });
		fromMock.mockReset().mockReturnValue({ where: whereMock });
		selectMock.mockReset().mockReturnValue({ from: fromMock });
		setAddonMock.mockReset().mockResolvedValue(undefined);
	});

	it("管理者が add-on 数量を更新できる", async () => {
		await updateOrgAddonQuantityFn({ data: { organizationId: "org_1", addonKey: "brand", quantity: 1 } });
		expect(setAddonMock).toHaveBeenCalledWith("sub_123", "brand", 1);
	});

	it("subscription が存在しない組織はエラーになる", async () => {
		limitMock.mockResolvedValue([]);
		await expect(
			updateOrgAddonQuantityFn({ data: { organizationId: "org_1", addonKey: "brand", quantity: 1 } }),
		).rejects.toThrow();
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd apps/web && npx vitest run src/server/billing-admin.test.ts
```

Expected: FAIL — `Cannot find module './billing-admin'`.

- [ ] **Step 3: 実装**

`apps/web/src/server/billing-admin.ts` 신규 생성:

```ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/helpers";
import { db } from "@workspace/lib/db/db";
import { subscription } from "@workspace/lib/db/schema";
import { setAddonQuantity } from "@workspace/lib/billing/subscription";

const updateAddonInputSchema = z.object({
	organizationId: z.string(),
	addonKey: z.enum(["brand", "prompts", "models", "claude"]),
	quantity: z.number().int().min(0),
});

export const updateOrgAddonQuantityFn = createServerFn({ method: "POST" })
	.inputValidator(updateAddonInputSchema)
	.handler(async ({ data }) => {
		await requireAdmin();

		const [row] = await db
			.select({ stripeSubscriptionId: subscription.stripeSubscriptionId })
			.from(subscription)
			.where(eq(subscription.referenceId, data.organizationId))
			.limit(1);

		if (!row?.stripeSubscriptionId) {
			throw new Error("この組織の Stripe subscription が見つかりません");
		}

		await setAddonQuantity(row.stripeSubscriptionId, data.addonKey, data.quantity);

		return { success: true };
	});
```

- [ ] **Step 4: テスト再実行**

```bash
cd apps/web && npx vitest run src/server/billing-admin.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 5: admin 画面に add-on 調整セクションを追加**

`apps/web/src/components/admin/customer-management.tsx`의 organization 확장 패널(12장에서 확인된 "停止/再開"/"顧客削除" 버튼이 있는 영역, 1222-1227행 부근)에 다음 섹션을 추가한다. 정확한 JSX 삽입 위치는 파일을 열어 해당 패널의 닫는 태그 바로 앞을 찾아 삽입한다:

```tsx
function AddonQuantityControl({ organizationId, addonKey, label, currentQuantity }: {
	organizationId: string;
	addonKey: "brand" | "prompts" | "models" | "claude";
	label: string;
	currentQuantity: number;
}) {
	const [quantity, setQuantity] = useState(currentQuantity);
	const [saving, setSaving] = useState(false);

	async function handleSave() {
		setSaving(true);
		try {
			await updateOrgAddonQuantityFn({ data: { organizationId, addonKey, quantity } });
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="flex items-center gap-2">
			<span className="w-24 text-sm">{label}</span>
			<input
				type="number"
				min={0}
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
				className="w-20 rounded border px-2 py-1"
			/>
			<button type="button" disabled={saving} onClick={handleSave} className="rounded bg-blue-600 px-3 py-1 text-white text-sm disabled:opacity-50">
				保存
			</button>
		</div>
	);
}
```

이 컴포넌트를 organization 확장 패널 안에서 `billingType === "stripe"`인 경우에만 렌더링하도록 조건부로 배치하고, `import { updateOrgAddonQuantityFn } from "@/server/billing-admin";`와 `import { useState } from "react";`(이미 있을 가능성 높음 — 중복 import 방지 위해 파일 상단 확인 후 추가)를 파일 상단에 추가한다.

- [ ] **Step 6: コミット**

```bash
git add apps/web/src/server/billing-admin.ts apps/web/src/server/billing-admin.test.ts apps/web/src/components/admin/customer-management.tsx
git commit -m "feat(billing): add admin add-on quantity adjustment UI"
```

---

### Task 10: 한도 강제 (quota enforcement) — 기존 서버함수에 검증 추가

16번 명세 6.2절: Stripe 조직에 한해 브랜드 추가/`maxPrompts`/`enabledModels` 수정 시 `effectiveMax*`를 초과하면 거부한다. manual 조직은 완전 무제한을 유지한다. 새 화면/새 서버함수를 만들지 않고, 기존 `createAdditionalBrandFn`/`updateBrandSettingsForCustomerFn`(Task 9에서 확인된 12장 재사용 대상) 내부에 검증만 추가한다.

**Files:**
- Create: `packages/lib/src/billing/quota-check.ts`
- Create: `packages/lib/src/billing/quota-check.test.ts`
- Modify: `apps/web/src/server/customer-brands.ts`
- Modify: `apps/web/src/server/customer-brands.test.ts` (기존 테스트 파일에 케이스 추가)

- [ ] **Step 1: 失敗するテストを書く**

`packages/lib/src/billing/quota-check.test.ts` 신규 생성:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const { selectMock, fromMock, leftJoinMock, whereMock, limitMock, readAddonMock } = vi.hoisted(() => ({
	selectMock: vi.fn(),
	fromMock: vi.fn(),
	leftJoinMock: vi.fn(),
	whereMock: vi.fn(),
	limitMock: vi.fn(),
	readAddonMock: vi.fn(),
}));

vi.mock("../db/db", () => ({ db: { select: selectMock } }));
vi.mock("./subscription", () => ({
	readAddonQuantities: readAddonMock,
	calculateEffectiveLimits: (plan: { maxBrands: number; maxPrompts: number; maxModels: number }, addons: { brand: number; prompts: number; models: number; claude: number }) => ({
		effectiveMaxBrands: plan.maxBrands + addons.brand,
		effectiveMaxPrompts: plan.maxPrompts + addons.prompts * 10,
		effectiveMaxModels: plan.maxModels + addons.models,
		claudeEnabled: addons.claude >= 1,
	}),
}));

import { getOrganizationBillingLimits } from "./quota-check";

describe("getOrganizationBillingLimits", () => {
	beforeEach(() => {
		limitMock.mockReset();
		whereMock.mockReset().mockReturnValue({ limit: limitMock });
		leftJoinMock.mockReset().mockReturnValue({ where: whereMock });
		fromMock.mockReset().mockReturnValue({ leftJoin: leftJoinMock });
		selectMock.mockReset().mockReturnValue({ from: fromMock });
		readAddonMock.mockReset().mockResolvedValue({ brand: 0, prompts: 0, models: 0, claude: 0 });
	});

	it("manual 組織は null (無制限) を返す", async () => {
		limitMock.mockResolvedValue([{ billingType: "manual", plan: null, stripeSubscriptionId: null }]);
		const result = await getOrganizationBillingLimits("org_1");
		expect(result).toBeNull();
	});

	it("stripe 組織 (add-on なし) は plan の基本値をそのまま返す", async () => {
		limitMock.mockResolvedValue([{ billingType: "stripe", plan: "light", stripeSubscriptionId: "sub_1" }]);
		const result = await getOrganizationBillingLimits("org_1");
		expect(result).toEqual({
			effectiveMaxBrands: 1,
			effectiveMaxPrompts: 20,
			effectiveMaxModels: 4,
			claudeEnabled: false,
		});
	});

	it("stripe 組織 (brand add-on 1) は effectiveMaxBrands が +1 される", async () => {
		limitMock.mockResolvedValue([{ billingType: "stripe", plan: "advanced", stripeSubscriptionId: "sub_1" }]);
		readAddonMock.mockResolvedValue({ brand: 1, prompts: 0, models: 0, claude: 0 });
		const result = await getOrganizationBillingLimits("org_1");
		expect(result!.effectiveMaxBrands).toBe(3);
	});
});
```

- [ ] **Step 2: テスト失敗を確認**

```bash
cd packages/lib && npx vitest run src/billing/quota-check.test.ts
```

Expected: FAIL — `Cannot find module './quota-check'`.

- [ ] **Step 3: 実装**

`packages/lib/src/billing/quota-check.ts` 신규 생성:

```ts
import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { organizationProfile, subscription } from "../db/schema";
import { getPlanByName } from "./plans";
import { calculateEffectiveLimits, readAddonQuantities, type EffectiveLimits } from "./subscription";

/**
 * organization の課金上限を返す。manual 組織は null(無制限)を返し、
 * 呼び出し側はこれを「チェックしない」の合図として扱う。
 */
export async function getOrganizationBillingLimits(organizationId: string): Promise<EffectiveLimits | null> {
	const [profileRow] = await db
		.select({ billingType: organizationProfile.billingType })
		.from(organizationProfile)
		.where(eq(organizationProfile.organizationId, organizationId))
		.limit(1);

	if (!profileRow || profileRow.billingType === "manual") {
		return null;
	}

	const [subRow] = await db
		.select({ plan: subscription.plan, stripeSubscriptionId: subscription.stripeSubscriptionId })
		.from(subscription)
		.where(eq(subscription.referenceId, organizationId))
		.limit(1);

	if (!subRow?.plan || !subRow.stripeSubscriptionId) {
		return null;
	}

	const plan = getPlanByName(subRow.plan);
	if (!plan) return null;

	const addons = await readAddonQuantities(subRow.stripeSubscriptionId);
	return calculateEffectiveLimits(plan, addons);
}
```

- [ ] **Step 4: テスト再実行**

```bash
cd packages/lib && npx vitest run src/billing/quota-check.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: `packages/lib/package.json`에 export 추가**

```json
    "./billing/quota-check": "./src/billing/quota-check.ts",
```

- [ ] **Step 6: `createAdditionalBrandFn`에 브랜드 개수 검증 추가**

`apps/web/src/server/customer-brands.ts`의 `createAdditionalBrandFn`(52-90행)을 수정한다. 기존 `targetOrg` 조회 직후(62행 이후)에 삽입:

```ts
export const createAdditionalBrandFn = createServerFn({ method: "POST" })
	.inputValidator(createAdditionalBrandInputSchema)
	.handler(async ({ data }) => {
		await requireAdmin();

		const targetOrg = await db.query.organization.findFirst({
			where: eq(organization.id, data.organizationId),
		});
		if (!targetOrg) {
			throw new Error("顧客が見つかりません");
		}

		const limits = await getOrganizationBillingLimits(data.organizationId);
		if (limits) {
			const currentBrandCount = await countEnabledBrandsInOrganization(data.organizationId);
			if (currentBrandCount >= limits.effectiveMaxBrands) {
				throw new Error(
					`このプランで作成できるブランド数の上限(${limits.effectiveMaxBrands}件)に達しています。追加が必要な場合は管理画面から add-on を調整してください。`,
				);
			}
		}

		const urlValidation = validateWebsiteUrl(data.website);
		// ... (以下既存のまま)
```

파일 상단 import(1-10행)에 추가:

```ts
import { getOrganizationBillingLimits } from "@workspace/lib/billing/quota-check";
```

- [ ] **Step 7: `updateBrandSettingsForCustomerFn`에 프롬프트/모델 상한 검증 추가**

같은 파일의 `updateBrandSettingsForCustomerFn`(110-144행)의 기존 `maxPrompts` 초과 검증(120-132행) 바로 앞에 다음을 삽입:

```ts
export const updateBrandSettingsForCustomerFn = createServerFn({ method: "POST" })
	.inputValidator(updateBrandSettingsInputSchema)
	.handler(async ({ data }) => {
		await requireAdmin();

		const brand = await getBrandRow(data.brandId);
		if (!brand) {
			throw new Error("ブランドが見つかりません");
		}

		if (brand.organizationId) {
			const limits = await getOrganizationBillingLimits(brand.organizationId);
			if (limits) {
				if (data.maxPrompts !== undefined && data.maxPrompts > limits.effectiveMaxPrompts) {
					throw new Error(
						`このプランで設定できるプロンプト上限(${limits.effectiveMaxPrompts}件)を超えています。`,
					);
				}
				if (data.enabledModels !== undefined) {
					const requestedModels = data.enabledModels.filter((m) => m !== "claude");
					if (requestedModels.length > limits.effectiveMaxModels) {
						throw new Error(
							`このプランで有効化できるモデル数の上限(${limits.effectiveMaxModels}個)を超えています。`,
						);
					}
					if (data.enabledModels.includes("claude") && !limits.claudeEnabled) {
						throw new Error("Claude を有効化するには add-on の承認が必要です。");
					}
				}
			}
		}

		if (data.maxPrompts !== undefined) {
			// ... (以下既存のまま)
```

- [ ] **Step 8: 기존 테스트 파일에 케이스 추가**

`apps/web/src/server/customer-brands.test.ts`에 다음 테스트를 추가한다(기존 `vi.mock` 패턴을 따라 `getOrganizationBillingLimits`를 mock):

```ts
vi.mock("@workspace/lib/billing/quota-check", () => ({
	getOrganizationBillingLimits: vi.fn(),
}));
```

기존 파일 상단의 다른 `vi.mock` 선언들과 나란히 배치하고, 다음 테스트 케이스를 `describe("createAdditionalBrandFn"` 블록(기존 파일에서 실제 위치 확인 후) 안에 추가:

```ts
it("stripe組織でプラン上限に達している場合はブランド作成を拒否する", async () => {
	const { getOrganizationBillingLimits } = await import("@workspace/lib/billing/quota-check");
	vi.mocked(getOrganizationBillingLimits).mockResolvedValue({
		effectiveMaxBrands: 1,
		effectiveMaxPrompts: 20,
		effectiveMaxModels: 4,
		claudeEnabled: false,
	});
	// 既存の brands モック設定を使い、countEnabledBrandsInOrganization が 1 を返すようにした上で:
	await expect(createAdditionalBrandFn({ data: { organizationId: "org_1", name: "test", website: "https://example.com", maxPrompts: 20, enabledModels: ["chatgpt"] } })).rejects.toThrow(
		"上限",
	);
});

it("manual組織はブランド数無制限のまま作成できる", async () => {
	const { getOrganizationBillingLimits } = await import("@workspace/lib/billing/quota-check");
	vi.mocked(getOrganizationBillingLimits).mockResolvedValue(null);
	// 既存のモック設定のまま呼び出し、エラーにならないことを確認
});
```

**注意:** 기존 `customer-brands.test.ts`의 정확한 mock 헬퍼 구조(brands 카운트를 어떻게 세팅하는지)에 맞춰 위 스니펫의 setup 부분을 조정해야 한다 — 이 Task를 실행하는 엔지니어는 먼저 기존 파일 전체를 읽고 기존 `countEnabledBrandsInOrganization`을 어떻게 mock하는지 파악한 뒤 위 테스트를 기존 패턴에 맞게 작성한다.

- [ ] **Step 9: テスト実行**

```bash
cd apps/web && npx vitest run src/server/customer-brands.test.ts
cd packages/lib && npx vitest run src/billing/quota-check.test.ts
```

Expected: 全テスト PASS。

- [ ] **Step 10: 기존 테스트 스위트 전체 확認**

```bash
pnpm --filter web test && pnpm --filter @workspace/lib test
```

Expected: 全テスト PASS — manual組織の既存動作(無制限)が壊れていないことを含む。

- [ ] **Step 11: コミット**

```bash
git add packages/lib/src/billing/quota-check.ts packages/lib/src/billing/quota-check.test.ts packages/lib/package.json apps/web/src/server/customer-brands.ts apps/web/src/server/customer-brands.test.ts
git commit -m "feat(billing): enforce effective plan+addon limits on brand creation and settings"
```

---

### Task 11: 로컬 + Stripe CLI 검증 (16번 명세 15.2절)

**이 Task는 자동화된 테스트가 아니라 사람이 직접 수행하는 수동 검증 절차다.** 완료 후에만 Task 12(merge)로 진행한다.

- [ ] **Step 1: 환경변수 설정 확인**

`apps/web/.env`(로컬)에 Task 3 Step 5에서 나열한 모든 `STRIPE_*` 환경변수가 실제 테스트 키/Price ID로 채워져 있는지 확인.

- [ ] **Step 2: 로컬 서버 기동**

```bash
pnpm --filter web dev
```

Expected: `http://localhost:3000`에서 앱이 뜬다.

- [ ] **Step 3: Stripe CLI로 webhook 포워딩**

```bash
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```

Expected: `Ready! Your webhook signing secret is whsec_...`가 출력됨 — 이 값이 `.env`의 `STRIPE_WEBHOOK_SECRET`과 일치하는지 확인(다르면 `.env` 갱신 후 서버 재시작).

- [ ] **Step 4: 회원가입 → 플랜 선택 → Checkout 전 과정 실행**

브라우저에서 신규 organization으로 회원가입 → `/app/billing/select-plan`에서 LIGHT 선택 → Stripe 테스트 카드(`4242 4242 4242 4242`, 임의 만료일/CVC)로 결제 완료.

Expected:
- `stripe listen` 터미널에 `checkout.session.completed` 이벤트 로그가 찍힘.
- `psql`로 확인: `SELECT billing_type FROM organization_profile WHERE organization_id = '<org_id>';` → `stripe`.
- 해당 organization의 brand `maxPrompts`가 20, `enabled_models`가 `{chatgpt,gemini,google-ai-overview,perplexity}`로 갱신됨.
- `processed_webhook_events`에 해당 `event.id`가 기록됨.

- [ ] **Step 5: 결제실패 이벤트 인위 발생**

```bash
stripe trigger invoice.payment_failed
```

Expected: 로컬 로그에 `sendPaymentFailedEmail` 관련 로그(또는 Resend API 키 미설정 시 warn 로그) 출력. Resend 테스트 키가 설정되어 있다면 실제 수신 메일함에서 확인.

- [ ] **Step 6: paywall 동작 확인**

Step 4의 organization에 대해 DB에서 수동으로 `subscription.status`를 `past_due`로 바꾸고, 해당 유저로 로그인해 `/app` 접근 시 차단되는지 확인:

```bash
psql "$DATABASE_URL" -c "UPDATE subscription SET status = 'past_due' WHERE reference_id = '<org_id>';"
```

Expected: 로그인 후 앱 접근 시 Forbidden 에러(`checkOrgAccess`가 false 반환).

```bash
psql "$DATABASE_URL" -c "UPDATE subscription SET status = 'active' WHERE reference_id = '<org_id>';"
```

원복 후 정상 접근 확인.

- [ ] **Step 7: manual 조직 무변화 확인**

기존에 이미 있던(또는 새로 admin에서 수동 생성한) manual organization으로 로그인해, Stripe 관련 코드가 전혀 없어도 정상 동작하는지 확인. `billing_type`이 `manual`인 채로 `checkOrgAccess`가 `subscription` 테이블을 조회하지 않고 바로 `status === 'active'`만으로 통과하는지 확인(코드 리뷰로도 확인 가능 — Task 7 Step 4 참고).

- [ ] **Step 8: Customer Portal 확인**

`/app/settings/billing`(또는 배치한 경로)에서 `openBillingPortalFn` 호출 → Stripe Customer Portal로 리다이렉트되는지 확인.

- [ ] **Step 9: Admin add-on 조정 및 한도 강제 확인**

Step 4의 LIGHT organization(`effectiveMaxBrands = 1`)에서 admin으로 브랜드를 하나 더 추가 시도 → Task 10에서 추가한 검증에 의해 거부되는지 확인(에러 메시지에 "上限" 포함). 이어서 admin 화면에서 브랜드 add-on 수량을 1로 설정 → `stripe listen` 로그 또는 Stripe Dashboard(테스트 모드)에서 해당 subscription에 `addon_brand` line item이 수량 1로 추가됐는지 확인 → 다시 브랜드 추가를 시도하면 이번엔 성공하는지 확인(`effectiveMaxBrands`가 1+1=2로 올라갔으므로).

- [ ] **Step 10: 전체 자동 테스트 재실행**

```bash
pnpm --filter web test && pnpm --filter @workspace/lib test
```

Expected: 全テスト PASS。

---

### Task 12: Worktree → main merge

Task 11의 수동 검증이 전부 통과한 뒤에만 진행한다.

- [ ] **Step 1: worktree에서 전체 diff 재확인**

```bash
git log --oneline main..HEAD
git diff main...HEAD --stat
```

- [ ] **Step 2: main 브랜치 상태 확인 (충돌 가능성 점검)**

```bash
git fetch origin main
git log --oneline HEAD..origin/main
```

Expected: worktree 작업 중 main에 별도 변경이 없는지, 있다면 rebase 필요 여부 확인.

- [ ] **Step 3: 사용자에게 merge 승인 요청**

이 Task는 자동으로 진행하지 않는다 — 16번 명세 15.1절에 따라 "완전히 검증된 뒤에만 main에 merge"가 원칙이므로, Task 11의 검증 결과를 사용자에게 보고하고 명시적 승인을 받은 뒤에만 merge를 진행한다.

- [ ] **Step 4: (승인 후) merge 실행**

```bash
git checkout main
git merge --no-ff worktree-stripe-billing -m "merge: Stripe billing integration (spec 16)"
```

- [ ] **Step 5: 배포 후 체크리스트 (16번 명세 15.2절 — 로컬 검증으로 커버되지 않는 항목)**

- [ ] Render(또는 실제 배포 환경)에 모든 `STRIPE_*` 환경변수를 프로덕션 값으로 설정.
- [ ] Stripe Dashboard에서 프로덕션 도메인의 webhook 엔드포인트(`https://<prod-domain>/api/auth/stripe/webhook`)를 신규 등록하고, 그 `whsec_...`를 프로덕션 `STRIPE_WEBHOOK_SECRET`으로 설정.
- [ ] 프로덕션 DB에 이번 작업의 마이그레이션(`billing_type`, `processed_webhook_events`, `subscription` 등)을 수동 적용 (기존 memory `project_prod_migration_manual` 절차 참고 — 배포로 자동 적용되지 않으므로 psql 직접 실행 + `__drizzle_migrations` 수동 INSERT 필요).
- [ ] Stripe Dashboard의 실제 모드(테스트 아님)에서 Product/Price를 별도로 등록하고 Price ID를 프로덕션 환경변수에 반영.
- [ ] Stripe Tax 설정(사업자 등록번호, 세율 구분) — 16번 명세 10장, 이 계획에서 다루지 않은 별도 Dashboard 작업이므로 여기서 별도로 진행.
