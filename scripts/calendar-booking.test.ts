import assert from 'node:assert/strict'
process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.app.google/test-booking'

const {
  CALENDAR_BOOKING_CONFIG,
  getCalendarBookingHref,
  getCalendarBookingLinkProps,
} = await import('../src/lib/calendar-booking.ts')

assert.equal(CALENDAR_BOOKING_CONFIG.label, '無料相談予約（Googleカレンダー）')
assert.equal(CALENDAR_BOOKING_CONFIG.title, 'Ascent GEO オンライン相談予約')
assert.equal(CALENDAR_BOOKING_CONFIG.location, 'オンライン')
assert.equal(CALENDAR_BOOKING_CONFIG.timezone, 'Asia/Tokyo')
assert.equal(CALENDAR_BOOKING_CONFIG.durationMinutes, 30)
assert.equal(getCalendarBookingHref(), 'https://calendar.app.google/test-booking')
assert.deepEqual(getCalendarBookingLinkProps(), {
  target: '_blank',
  rel: 'noopener noreferrer',
})
