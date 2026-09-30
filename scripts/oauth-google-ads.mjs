/**
 * Google Ads API OAuth 2.0 인증 플로우
 * 
 * 실행: node scripts/oauth-google-ads.mjs
 * 
 * 1. 브라우저에서 Google 로그인 페이지가 자동으로 열립니다
 * 2. Google 계정으로 로그인 & 권한 승인
 * 3. 콜백을 받아 refresh_token을 자동 발급합니다
 */

import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// .env.local에서 credentials 읽기
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");

function getEnv(key) {
  const regex = new RegExp(`^${key}[=:]\\s*"?([^"\\r\\n]+)"?`, "m");
  const match = envContent.match(regex);
  return match ? match[1].trim() : null;
}

const CLIENT_ID = getEnv("client_id");
const CLIENT_SECRET = getEnv("client_secret");
const REDIRECT_URI = "http://localhost:9876/callback";
const SCOPE = "https://www.googleapis.com/auth/adwords";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ client_id 또는 client_secret이 .env.local에 설정되어 있지 않습니다.");
  process.exit(1);
}

console.log("=== Google Ads OAuth 2.0 인증 플로우 ===\n");
console.log(`client_id: ${CLIENT_ID.substring(0, 20)}...`);
console.log(`redirect_uri: ${REDIRECT_URI}`);
console.log(`scope: ${SCOPE}\n`);

// ⚠️ 중요: Google Cloud Console에서 리디렉션 URI 등록 필요
console.log("⚠️  사전 준비:");
console.log(`   Google Cloud Console → API 및 서비스 → 사용자 인증 정보`);
console.log(`   → OAuth 2.0 클라이언트 ID 선택`);
console.log(`   → "승인된 리디렉션 URI"에 아래 URI가 등록되어 있는지 확인:`);
console.log(`   ${REDIRECT_URI}\n`);

// Step 1: 인증 URL 생성
const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent"); // refresh_token을 반드시 받기 위해

// Step 2: 로컬 콜백 서버 시작
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:9876`);

  if (reqUrl.pathname !== "/callback") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = reqUrl.searchParams.get("code");
  const error = reqUrl.searchParams.get("error");

  if (error) {
    console.error(`\n❌ 인증 거부됨: ${error}`);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>❌ 인증 실패</h1><p>${error}</p><p>터미널을 확인하세요.</p>`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400);
    res.end("Missing authorization code");
    return;
  }

  console.log("✅ Authorization code 수신 완료");
  console.log("   토큰 교환 중...\n");

  // Step 3: authorization code → tokens 교환
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      throw new Error(`${tokens.error}: ${tokens.error_description}`);
    }

    console.log("✅ 토큰 발급 성공!\n");
    console.log("=== 발급된 토큰 ===");
    console.log(`access_token:  ${tokens.access_token?.substring(0, 30)}...`);
    console.log(`refresh_token: ${tokens.refresh_token}`);
    console.log(`token_type:    ${tokens.token_type}`);
    console.log(`expires_in:    ${tokens.expires_in}초`);
    console.log(`scope:         ${tokens.scope}\n`);

    if (tokens.refresh_token) {
      // .env.local 자동 업데이트
      let updatedEnv = envContent;

      // refresh_token 업데이트 (= 또는 : 형식 모두 처리)
      updatedEnv = updatedEnv.replace(
        /^refresh_token[=:]\s*"?[^"\r\n]*"?/m,
        `refresh_token=${tokens.refresh_token}`
      );

      writeFileSync(envPath, updatedEnv, "utf-8");
      console.log("✅ .env.local에 refresh_token 자동 저장 완료!\n");
      console.log("📌 다음 단계:");
      console.log("   1. .env.local의 login_customer_id를 실제 Google Ads 계정 ID로 변경");
      console.log("   2. node scripts/test-google-ads.mjs 실행하여 API 접속 확인\n");
    } else {
      console.log("⚠️  refresh_token이 응답에 포함되지 않았습니다.");
      console.log("   이미 승인한 적이 있는 계정일 수 있습니다.");
      console.log("   → https://myaccount.google.com/permissions 에서 앱 액세스 삭제 후 재시도\n");
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h1>✅ 인증 완료!</h1>
        <p>refresh_token이 .env.local에 저장되었습니다.</p>
        <p>이 창을 닫아도 됩니다.</p>
      </body></html>
    `);
  } catch (err) {
    console.error(`\n❌ 토큰 교환 실패: ${err.message}`);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>❌ 토큰 교환 실패</h1><p>${err.message}</p>`);
  }

  server.close();
  setTimeout(() => process.exit(0), 1000);
});

server.listen(9876, () => {
  console.log("🌐 로컬 콜백 서버 시작: http://localhost:9876/callback");
  console.log("🔗 브라우저에서 인증 페이지를 엽니다...\n");

  // macOS에서 브라우저 자동 열기
  exec(`open "${authUrl.toString()}"`);
});

// 타임아웃 (5분)
setTimeout(() => {
  console.log("\n⏰ 타임아웃 (5분). 인증이 완료되지 않았습니다.");
  server.close();
  process.exit(1);
}, 5 * 60 * 1000);
