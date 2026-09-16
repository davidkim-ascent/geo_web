import assert from 'node:assert/strict'
import { isSpamSubmission, MIN_SUBMISSION_SECONDS } from '../src/lib/spam-protection.ts'

const now = Date.now()

// honeypot filled -> spam
assert.equal(
  isSpamSubmission({ honeypot: 'anything', formRenderedAt: now - 10_000 }, now),
  true
)

// submitted too fast -> spam
assert.equal(
  isSpamSubmission({ honeypot: '', formRenderedAt: now - 1_000 }, now),
  true
)

// exactly at the boundary -> not spam
assert.equal(
  isSpamSubmission({ honeypot: '', formRenderedAt: now - MIN_SUBMISSION_SECONDS * 1000 }, now),
  false
)

// normal human timing, empty honeypot -> not spam
assert.equal(
  isSpamSubmission({ honeypot: '', formRenderedAt: now - 15_000 }, now),
  false
)

// missing/invalid formRenderedAt -> treated as spam (can't verify timing)
assert.equal(
  isSpamSubmission({ honeypot: '', formRenderedAt: NaN }, now),
  true
)

// formRenderedAt in the future -> spam (tampered)
assert.equal(
  isSpamSubmission({ honeypot: '', formRenderedAt: now + 5_000 }, now),
  true
)
