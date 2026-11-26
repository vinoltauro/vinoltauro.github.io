import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  id: string
  num: string
  eyebrow: string
  title: string
  className?: string
  children: ReactNode
}

export function Section({ id, num, eyebrow, title, className, children }: Props) {
  const headingId = `${id}-heading`
  return (
    <section id={id} className={className} aria-labelledby={headingId} tabIndex={-1}>
      <Reveal className="eyebrow">
        <span className="eyebrow-num">{num}</span>
        <span className="eyebrow-sep" aria-hidden="true">/</span>
        <span>{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title">
        <span id={headingId}>{title}</span>
      </Reveal>
      {children}
    </section>
  )
}
