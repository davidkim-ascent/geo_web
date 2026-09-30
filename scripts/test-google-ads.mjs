/**
 * Google Ads API 접속 테스트 스크립트
 * 실행: node scripts/test-google-ads.mjs
 */

import { GoogleAdsApi } from "google-ads-api";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// .env.local 파일에서 직접 읽기
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");

function getEnv(key) {
  // key=value 또는 key: value 형식 모두 지원
  const regex = new RegExp(`^${key}[=:]\\s*"?([^"\\r\\n]+)"?`, "m");
  const match = envContent.match(regex);
  return match ? match[1].trim() : null;
}

const developer_token = getEnv("developer_token");
const client_id = getEnv("client_id");
const client_secret = getEnv("client_secret");
const refresh_token = getEnv("refresh_token");
const login_customer_id = getEnv("login_customer_id");
const customer_id = getEnv("customer_id");

console.log("=== Google Ads API 접속 테스트 ===\n");
console.log("1. 환경변수 확인:");
console.log(`   developer_token: ${developer_token ? "✅ 설정됨 (" + developer_token.substring(0, 8) + "...)" : "❌ 미설정"}`);
console.log(`   client_id:       ${client_id ? "✅ 설정됨" : "❌ 미설정"}`);
console.log(`   client_secret:   ${client_secret ? "✅ 설정됨" : "❌ 미설정"}`);
console.log(`   refresh_token:   ${refresh_token && refresh_token !== "YOUR_REFRESH_TOKEN" ? "✅ 설정됨" : "❌ 미설정 (플레이스홀더)"}`);
console.log(`   login_customer_id (MCC): ${login_customer_id && login_customer_id !== "1234567890" ? "✅ " + login_customer_id : "⚠️  플레이스홀더 상태"}`);
console.log(`   customer_id (광고계정):  ${customer_id ? "✅ " + customer_id : "⚠️  미설정"}`);

// refresh_token이 없으면 API 호출 불가
if (!refresh_token || refresh_token === "YOUR_REFRESH_TOKEN") {
  console.log("\n❌ refresh_token이 설정되지 않아 API 접속 테스트를 수행할 수 없습니다.");
  process.exit(1);
}

// API 접속 시도
console.log("\n2. API 접속 시도...");
try {
  const client = new GoogleAdsApi({
    client_id,
    client_secret,
    developer_token,
  });

  const customer = client.Customer({
    customer_id: customer_id || login_customer_id?.replace(/-/g, "") || "",
    refresh_token,
    login_customer_id: login_customer_id?.replace(/-/g, ""),
  });

  // 간단한 쿼리로 접속 확인 (계정 정보 조회)
  const results = await customer.query(`
    SELECT
      customer.id,
      customer.descriptive_name,
      customer.currency_code,
      customer.time_zone
    FROM customer
    LIMIT 1
  `);

  console.log("✅ API 접속 성공!\n");
  console.log("3. 계정 정보:");
  for (const row of results) {
    console.log(`   계정 ID: ${row.customer.id}`);
    console.log(`   계정명:  ${row.customer.descriptive_name}`);
    console.log(`   통화:    ${row.customer.currency_code}`);
    console.log(`   시간대:  ${row.customer.time_zone}`);
  }
} catch (error) {
  console.log("❌ API 접속 실패\n");
  console.log("에러 상세:");
  if (error.errors) {
    for (const err of error.errors) {
      console.log(`   코드: ${err.error_code}`);
      console.log(`   메시지: ${err.message}`);
    }
  } else {
    console.log(`   ${error.message}`);
  }

  // 일반적인 에러 원인 안내
  if (error.message?.includes("UNAUTHENTICATED")) {
    console.log("\n💡 인증 실패 — refresh_token이 만료되었거나 잘못되었을 수 있습니다.");
  } else if (error.message?.includes("DEVELOPER_TOKEN")) {
    console.log("\n💡 개발자 토큰 문제 — Google Ads API Center에서 토큰 상태를 확인하세요.");
  } else if (error.message?.includes("CUSTOMER_NOT_FOUND")) {
    console.log("\n💡 고객 ID 오류 — login_customer_id를 확인하세요.");
  }
}
