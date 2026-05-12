import assert from 'node:assert/strict'
import { isValidWebsiteValue } from '../src/lib/website-validation.ts'

assert.equal(isValidWebsiteValue('https://example.com'), true)
assert.equal(isValidWebsiteValue('example.com'), true)
assert.equal(isValidWebsiteValue('準備中'), true)
assert.equal(isValidWebsiteValue('ㅇㅇㅇ이ㅣㅣ'), false)
