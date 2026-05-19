import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/app/why-ascent/page.tsx', import.meta.url), 'utf8')
const compactSource = source.replace(/\s+/g, ' ')

assert.ok(
  compactSource.includes('className="hero-fixed relative overflow-hidden text-white py-12 lg:py-16"'),
  'expected the Why Ascent hero section to use the shared hero height wrapper and clip decorative overflow',
)
