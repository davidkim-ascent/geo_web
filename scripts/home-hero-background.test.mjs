import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8')
const compactSource = source.replace(/\s+/g, ' ')

assert.ok(
  compactSource.includes(
    'sectionStyle={{ background: "var(--hero-gradient)", minHeight: "var(--hero-height)", borderBottom: "1px solid rgba(255,255,255,0.06)", }}',
  ),
  'expected the home hero section to use the shared hero gradient and fixed height',
)
