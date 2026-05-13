import assert from 'node:assert/strict'
import { CALENDAR_BOOKING_CONFIG, getCalendarBookingSummaryItems } from '../src/lib/calendar-booking.ts'

assert.equal(CALENDAR_BOOKING_CONFIG.label, 'カレンダー予約（30分）')
assert.equal(CALENDAR_BOOKING_CONFIG.path, '/calendar-booking')
assert.equal(CALENDAR_BOOKING_CONFIG.title, 'Ascent GEO オンライン相談予約')
assert.equal(CALENDAR_BOOKING_CONFIG.location, 'オンライン')
assert.equal(CALENDAR_BOOKING_CONFIG.timezone, 'Asia/Tokyo')
assert.equal(CALENDAR_BOOKING_CONFIG.durationMinutes, 30)

const summaryItems = getCalendarBookingSummaryItems()
assert.equal(summaryItems.length, 5)
assert.deepEqual(summaryItems[0], { label: '가능 시간', value: '10:00 - 17:00 (JST)' })
assert.deepEqual(summaryItems[1], { label: '점심시간', value: '12:00 - 13:00 제외' })
assert.deepEqual(summaryItems[2], { label: '주말', value: '토요일 / 일요일 제외' })
assert.deepEqual(summaryItems[3], { label: '공휴일', value: '일본 공휴일 제외' })
assert.deepEqual(summaryItems[4], { label: '회의 방식', value: 'Google Meet 자동 생성' })
