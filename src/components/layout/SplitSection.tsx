import type { CSSProperties, ReactNode } from 'react'

type SplitSectionProps = {
  background?: ReactNode
  containerClassName?: string
  left: ReactNode
  leftClassName?: string
  right: ReactNode
  rightClassName?: string
  sectionClassName?: string
  sectionStyle?: CSSProperties
}

export function SplitSection({
  background,
  containerClassName = 'relative max-w-[1280px] mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-start',
  left,
  leftClassName = '',
  right,
  rightClassName = '',
  sectionClassName = '',
  sectionStyle,
}: SplitSectionProps) {
  return (
    <section className={sectionClassName} style={sectionStyle}>
      {background ? <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">{background}</div> : null}
      <div className={containerClassName}>
        <div className={leftClassName}>{left}</div>
        <div className={rightClassName}>{right}</div>
      </div>
    </section>
  )
}
