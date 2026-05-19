import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/app/why-ascent/page.tsx', import.meta.url), 'utf8')

assert.match(
  source,
  /<div className="relative z-10 w-full max-w-\[620px\] mx-auto lg:ml-auto lg:mr-0">/,
  'expected the hero contact form wrapper to center on mobile and stay right-aligned on desktop',
)
