import { useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, type CSSProperties } from 'react'
import type { Interest } from '../content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { lqip } from '../lib/lqip'

/**
 * Photos as a hand of cards. Scrolled into view, they're dealt from a stack into a fan; hovering
 * the hand spreads it, hovering a card lifts it to the front. Tap toggles the spread on touch.
 */
export function DealtHand({ photos }: { photos: NonNullable<Interest['photos']> }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const dealt = useInView(ref, { once: true, amount: 0.4 })
  const [open, setOpen] = useState(false)
  const mid = (photos.length - 1) / 2

  const cls = ['hand', dealt || reduce ? 'is-dealt' : '', open ? 'is-open' : ''].filter(Boolean).join(' ')
  return (
    <div
      ref={ref}
      className={cls}
      onClick={() => setOpen((o) => !o)}
      role="group"
      aria-label="Dishes I’ve cooked"
    >
      {photos.map((ph, n) => {
        const i = n - mid // -1, 0, 1 for three cards
        return (
          <figure key={ph.src} className="hand-card" style={{ '--i': i, '--n': n, '--ai': Math.abs(i) } as CSSProperties}>
            <img className="lqip" style={lqip(ph.src)} src={ph.src} alt={ph.alt} width={640} height={800} loading="lazy" decoding="async" />
            <figcaption>{ph.label}</figcaption>
          </figure>
        )
      })}
    </div>
  )
}

/** The small interest tiles (anything without photos). */
export function Life({ items }: { items: Interest[] }) {
  return (
    <ul className="life-grid">
      {items
        .filter((it) => !it.photos)
        .map((it, i) => (
          <Reveal as="li" key={it.title} delay={i * 80} className="life-tile">
            <span className="icon-tile life-icon">
              <Icon name={it.icon} size={19} />
            </span>
            <h3 className="life-title">{it.title}</h3>
            <p className="life-body">{it.body}</p>
            {it.quote && (
              <blockquote className="life-quote">
                <p>“{it.quote.text}”</p>
                <cite>{it.quote.by}</cite>
              </blockquote>
            )}
          </Reveal>
        ))}
    </ul>
  )
}
