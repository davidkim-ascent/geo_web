import Link from 'next/link'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  CALENDAR_BOOKING_CONFIG,
  getCalendarBookingHref,
  getCalendarBookingLinkProps,
} from '@/lib/calendar-booking'

type Props = {
  children?: ReactNode
  className?: string
}

export function CalendarBookingButton({ children, className }: Props) {
  const href = getCalendarBookingHref()

  return (
    <Button asChild variant="ctaOutline" className={className}>
      <Link href={href} {...getCalendarBookingLinkProps()}>
        {children ?? CALENDAR_BOOKING_CONFIG.label}
      </Link>
    </Button>
  )
}
