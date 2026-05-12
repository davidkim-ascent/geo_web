import assert from 'node:assert/strict'
import { getBlockedEmailDomainError } from '../src/lib/contact-blocking.ts'

const blockedDomains = ['sex.com', 'spam.com']

assert.equal(getBlockedEmailDomainError('davidkim@sex.com', blockedDomains), '許可されていないメールドメインです。')
assert.equal(getBlockedEmailDomainError('davidkim@example.com', blockedDomains), null)
assert.equal(getBlockedEmailDomainError('', blockedDomains), null)
