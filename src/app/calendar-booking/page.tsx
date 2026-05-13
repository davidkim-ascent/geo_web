import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  CALENDAR_BOOKING_CONFIG,
  getCalendarBookingSummaryItems,
  getExternalCalendarBookingUrl,
} from '@/lib/calendar-booking'

export default function CalendarBookingPage() {
  const externalUrl = getExternalCalendarBookingUrl()

  if (externalUrl) {
    redirect(externalUrl)
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6">
      <section className="max-w-[720px] w-full bg-white border border-black/10 rounded-2xl p-8 md:p-12">
        <p className="text-[12px] tracking-[0.2em] uppercase text-[#1452FF] mb-4">Calendar Booking</p>
        <h1 className="text-[28px] md:text-[36px] font-bold text-[#0B0B0E] leading-tight">
          {CALENDAR_BOOKING_CONFIG.title}
        </h1>
        <p className="mt-4 text-[16px] text-[#4e4e51] leading-[1.7]">
          `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` 환경변수를 설정하면 이 페이지가 Google Calendar 예약 페이지로 자동 이동합니다.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {getCalendarBookingSummaryItems().map((item) => (
            <div key={item.label} className="rounded-xl border border-black/10 bg-[#FAFAF7] p-4">
              <p className="text-[12px] tracking-[0.12em] uppercase text-[#71717a]">{item.label}</p>
              <p className="mt-2 text-[15px] font-medium text-[#0B0B0E]">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="ui-footer-link">
            문의 페이지로 돌아가기
          </Link>
          <span className="text-[13px] text-[#71717a]">
            위치: {CALENDAR_BOOKING_CONFIG.location} · 시간대: {CALENDAR_BOOKING_CONFIG.timezone}
          </span>
        </div>
      </section>
    </main>
  )
}
