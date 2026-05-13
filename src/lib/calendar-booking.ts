export const CALENDAR_BOOKING_CONFIG = {
  label: 'カレンダー予約（30分）',
  path: '/calendar-booking',
  title: 'Ascent GEO オンライン相談予約',
  description: 'Ascent GEO のオンライン相談予約ページです。',
  location: 'オンライン',
  timezone: 'Asia/Tokyo',
  durationMinutes: 30,
  availability: {
    start: '10:00',
    end: '17:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    weekdaysOnly: true,
    excludeWeekends: true,
    excludeJapaneseHolidays: true,
  },
  conferencing: {
    googleMeet: true,
  },
} as const

export function getCalendarBookingHref() {
  return CALENDAR_BOOKING_CONFIG.path
}

export function getExternalCalendarBookingUrl() {
  return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL?.trim() || ''
}

export function getCalendarBookingSummaryItems() {
  return [
    { label: '가능 시간', value: '10:00 - 17:00 (JST)' },
    { label: '점심시간', value: '12:00 - 13:00 제외' },
    { label: '주말', value: '토요일 / 일요일 제외' },
    { label: '공휴일', value: '일본 공휴일 제외' },
    { label: '회의 방식', value: 'Google Meet 자동 생성' },
  ] as const
}
