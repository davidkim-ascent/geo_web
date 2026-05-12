'use client'

import Link from 'next/link'
import { SplitSection } from '@/components/layout/SplitSection'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

type CTAButton = {
  href: string
  label: ReactNode
  variant?: 'primary' | 'outline'
}

type CTASectionProps = {
  sectionId?: string
  kicker: ReactNode
  title: ReactNode
  description: ReactNode
  primaryButton: CTAButton
  secondaryButtons: CTAButton[]
}

export function CTASection({
  sectionId = 'contact',
  kicker,
  title,
  description,
  primaryButton,
  secondaryButtons,
}: CTASectionProps) {
  return (
    <section id={sectionId} className="bg-[#FAFAF7] pb-24">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="bg-[#0B0B0E] rounded-2xl p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <SplitSection
            sectionClassName="relative"
            containerClassName="ui-cta-grid relative"
            left={
              <div>
                <div className="flex items-center gap-2 ui-mono ui-section-kicker ui-section-kicker-dark mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1452FF]" />
                  {kicker}
                </div>
                <h2
                  className="ui-section-title ui-section-title-dark"
                  style={{ fontSize: 'clamp(32px, 3.2vw, 48px)' }}
                >
                  {title}
                </h2>
                <p className="mt-6 ui-body-copy ui-body-copy-dark max-w-[38ch]">
                  {description}
                </p>
              </div>
            }
            right={
              <div className="ui-cta-actions">
                <Button asChild variant="cta">
                  <Link href={primaryButton.href}>
                    {primaryButton.label}
                    <span>→</span>
                  </Link>
                </Button>
                {secondaryButtons.map((button) => (
                  <Button key={`${button.href}-${String(button.label)}`} asChild variant="ctaOutline">
                    <Link href={button.href}>
                      {button.label}
                    </Link>
                  </Button>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
