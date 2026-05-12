import assert from 'node:assert/strict'
import { isBlockedEmailDomain } from '../src/lib/contact-blocking.ts'

const blockedDomains = ['sex.com', 'spam.com']

assert.equal(isBlockedEmailDomain('davidkim@sex.com', blockedDomains), true)
assert.equal(isBlockedEmailDomain('davidkim@sex.com ', blockedDomains), true)
assert.equal(isBlockedEmailDomain('DAVIDKIM@SEX.COM', blockedDomains), true)
assert.equal(isBlockedEmailDomain('davidkim@mail.sex.com', blockedDomains), true)
assert.equal(isBlockedEmailDomain('davidkim@example.com', blockedDomains), false)
