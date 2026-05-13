export const CALENDAR_BOOKING_CONFIG = {
  label: '無料相談予約（Googleカレンダー）',
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
  return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL?.trim() || '/contact'
}

export function getCalendarBookingLinkProps() {
  return {
    target: '_blank' as const,
    rel: 'noopener noreferrer',
  }
}
