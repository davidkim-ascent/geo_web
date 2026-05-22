import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const robotsPath = path.join(process.cwd(), 'public', 'robots.txt')
const robots = fs.readFileSync(robotsPath, 'utf8')

assert.match(robots, /User-agent:\s*\*/, 'expected robots.txt to target all crawlers')
assert.match(robots, /Allow:\s*\/\s*$/m, 'expected robots.txt to allow crawling of the site')
assert.match(robots, /Sitemap:\s*https:\/\/geo\.ascentnet\.co\.jp\/sitemap\.xml/, 'expected robots.txt to reference the sitemap')
assert.ok(!/Disallow:\s*\//.test(robots), 'expected robots.txt not to block the site')
