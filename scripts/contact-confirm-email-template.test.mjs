import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const templatePath = path.join(__dirname, '..', 'src', 'emails', 'ContactConfirmEmail.tsx')
const source = fs.readFileSync(templatePath, 'utf8')

assert.match(source, /48時間/, 'expected user email to mention 48 hours')
assert.match(source, /company/, 'expected user email to include company field')
assert.match(source, /role/, 'expected user email to include role field')
assert.match(source, /name/, 'expected user email to include name field')
assert.match(source, /phone/, 'expected user email to include phone field')
assert.match(source, /email/, 'expected user email to include email field')
assert.match(source, /industry/, 'expected user email to include industry field')
assert.match(source, /website/, 'expected user email to include website field')
assert.match(source, /challenge/, 'expected user email to include challenge field')
