import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const llmsPath = path.join(process.cwd(), 'public', 'llms.txt')
const llms = fs.readFileSync(llmsPath, 'utf8')

assert.match(llms, /^#\s+Ascent GEO/m, 'expected llms.txt to start with the site name')
assert.match(llms, />\s+Ascent GEO is the GEO\/LLMO site for Ascent Networks\./, 'expected llms.txt to include a short summary')
assert.match(llms, /##\s+Core Pages/, 'expected llms.txt to include a core pages section')
assert.match(llms, /\[Home\]\(https:\/\/geo\.ascentnet\.co\.jp\/\)/, 'expected llms.txt to link to the home page')
assert.match(llms, /\[Sitemap\]\(https:\/\/geo\.ascentnet\.co\.jp\/sitemap\.xml\)/, 'expected llms.txt to link to the sitemap')
assert.ok(!llms.includes('/privacy'), 'expected llms.txt to omit privacy page')
assert.ok(!llms.includes('/contact/thanks'), 'expected llms.txt to omit thanks page')
