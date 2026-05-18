import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/app/why-ascent/page.tsx', import.meta.url), 'utf8')
const compactSource = source.replace(/\s+/g, ' ')

assert.ok(
  compactSource.includes(
    'style={{ background: "var(--hero-gradient)", minHeight: "var(--hero-height)", }}',
  ),
  'expected the Why Ascent hero section to use the shared hero gradient and fixed height',
)
