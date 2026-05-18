import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const files = [
  ['../src/app/framework/page.tsx', 'Framework hero'],
  ['../src/app/services/page.tsx', 'Services hero'],
  ['../src/app/lab/page.tsx', 'GEO Lab hero'],
]

for (const [file, label] of files) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8').replace(/\s+/g, ' ')
  assert.ok(
    source.includes('var(--hero-gradient)'),
    `${label} should use the shared hero gradient`,
  )
  assert.ok(
    source.includes('var(--hero-height)'),
    `${label} should use the shared hero minimum height`,
  )
}

const globals = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8')
assert.ok(globals.includes('--hero-gradient:'))
assert.ok(globals.includes('radial-gradient(ellipse 58% 46% at 18% 22%, rgba(72, 125, 255, 0.38) 0%, rgba(72, 125, 255, 0) 56%)'))
assert.ok(globals.includes('radial-gradient(ellipse 40% 38% at 82% 26%, rgba(181, 62, 122, 0.26) 0%, rgba(181, 62, 122, 0) 56%)'))
assert.ok(globals.includes('linear-gradient(135deg, #042A4E 0%, #58052F 100%)'))
assert.ok(globals.includes('--hero-height: 760px;'))
assert.ok(globals.includes('background: var(--hero-gradient);'))
assert.ok(globals.includes('min-height: var(--hero-height);'))
assert.ok(globals.includes('.ct-hero {'))
