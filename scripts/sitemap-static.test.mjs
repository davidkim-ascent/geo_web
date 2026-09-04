// Run with: node --import tsx scripts/sitemap-static.test.mjs
// (sitemap is now generated dynamically by src/app/sitemap.ts, which needs a TS loader)
import assert from 'node:assert/strict'

process.env.NEXT_PUBLIC_SITE_URL ??= 'https://geo.ascentnet.co.jp'

const { default: sitemap } = await import('../src/app/sitemap.ts')
const entries = sitemap()
const urls = entries.map((e) => e.url)

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
  'https://geo.ascentnet.co.jp/lab/what-is-llmo',
  'https://geo.ascentnet.co.jp/watcher',
  'https://geo.ascentnet.co.jp/whitepaper',
  'https://geo.ascentnet.co.jp/services',
  'https://geo.ascentnet.co.jp/shindan',
  'https://geo.ascentnet.co.jp/framework',
  'https://geo.ascentnet.co.jp/why-ascent',
]

for (const url of expectedUrls) {
  assert.ok(urls.includes(url), `expected sitemap to include ${url}`)
}

for (const excluded of [
  'https://geo.ascentnet.co.jp/privacy',
  'https://geo.ascentnet.co.jp/contact/thanks',
  'https://geo.ascentnet.co.jp/whitepaper/downloaded',
  'https://geo.ascentnet.co.jp/whitepaper/denied',
  'https://geo.ascentnet.co.jp/tokushoho',
  'https://geo.ascentnet.co.jp/shindan-terms',
  'https://geo.ascentnet.co.jp/watcher-terms',
]) {
  assert.ok(!urls.includes(excluded), `expected sitemap to exclude ${excluded}`)
}

assert.equal(new Set(urls).size, urls.length, 'expected no duplicate URLs in sitemap')

console.log(`sitemap-static.test.mjs passed (${urls.length} URLs)`)
