import assert from 'node:assert/strict'
import fs from 'node:fs'

const route = fs.readFileSync('src/app/api/contact/route.ts', 'utf8')

assert.match(route, /const FROM = process\.env\.RESEND_FROM_EMAIL\?\.trim\(\) \|\| 'geo@ascentnet\.co\.jp'/, 'expected the contact email sender to default to geo@ascentnet.co.jp')
assert.match(route, /const ADMIN_EMAIL = process\.env\.CONTACT_ADMIN_EMAIL\?\.trim\(\) \|\| 'geo@ascentnet\.co\.jp'/, 'expected the admin contact email to default to geo@ascentnet.co.jp')
