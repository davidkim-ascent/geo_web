import assert from 'node:assert/strict'
import fs from 'node:fs'

const route = fs.readFileSync('src/app/api/whitepaper/route.ts', 'utf8')
const downloadRoute = fs.readFileSync('src/app/api/whitepaper/download/route.ts', 'utf8')
const emailTemplate = fs.readFileSync('src/emails/WhitepaperConfirmEmail.tsx', 'utf8')
const deniedPage = fs.readFileSync('src/app/whitepaper/denied/page.tsx', 'utf8')

assert.match(route, /Resend/, 'expected a whitepaper API route to send email via Resend')
assert.match(route, /const FROM = process\.env\.RESEND_FROM_EMAIL\?\.trim\(\) \|\| 'no-reply@ascentnet\.co\.jp'/, 'expected the whitepaper email sender to default to no-reply@ascentnet.co.jp')
assert.match(route, /download_token:\s*downloadToken/, 'expected the whitepaper API route to persist a download token')
assert.match(route, /storage[\s\S]*from\(WHITEPAPER_STORAGE_BUCKET\)[\s\S]*upload/, 'expected the whitepaper API route to upload the PDF to Supabase Storage')
assert.match(downloadRoute, /download_token/, 'expected the download route to validate the token')
assert.match(downloadRoute, /createSignedUrl/, 'expected the download route to generate a private signed URL')
assert.match(downloadRoute, /\/whitepaper\/denied/, 'expected invalid whitepaper access to redirect to the denied page')
assert.match(deniedPage, /DeniedAccess/, 'expected the denied page to render the access denial component')
assert.match(emailTemplate, /Ascent GEO サービス紹介資料/, 'expected the email template to mention the GEO service guide')
assert.match(emailTemplate, /DOWNLOAD_ROUTE/, 'expected the email template button to keep a download fallback route')
