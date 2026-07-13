import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')
const sitemap = fs.readFileSync(sitemapPath, 'utf8')

const expectedUrls = [
  'https://geo.ascentnet.co.jp/',
  'https://geo.ascentnet.co.jp/contact',
  'https://geo.ascentnet.co.jp/lab',
  'https://geo.ascentnet.co.jp/lab/adobe-ai-traffic',
  'https://geo.ascentnet.co.jp/lab/ai-agent-site',
  'https://geo.ascentnet.co.jp/lab/ai-shopping-agent',
  'https://geo.ascentnet.co.jp/lab/brand-cep',
  'https://geo.ascentnet.co.jp/lab/geo-llmo-company',
  'https://geo.ascentnet.co.jp/lab/seo-geo',
  'https://geo.ascentnet.co.jp/watcher',
  'https://geo.ascentnet.co.jp/whitepaper',
]

for (const url of expectedUrls) {
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `expected sitemap to include ${url}`)
}

for (const excluded of [
  'https://geo.ascentnet.co.jp/privacy',
  'https://geo.ascentnet.co.jp/contact/thanks',
  'https://geo.ascentnet.co.jp/whitepaper/downloaded',
  'https://geo.ascentnet.co.jp/whitepaper/denied',
  'https://geo.ascentnet.co.jp/shindan',
]) {
  assert.ok(!sitemap.includes(`<loc>${excluded}</loc>`), `expected sitemap to exclude ${excluded}`)
}

assert.match(sitemap, /<urlset\b/, 'expected a sitemap urlset root element')
assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/, 'expected sitemap namespace')
