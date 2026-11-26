import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { site } from '../content'
import { prefersReducedMotion } from '../lib/motion'
import { FeatureCard } from './FeatureCard'
import { Icon } from './Icon'
import { lqip } from '../lib/lqip'

/**
 * A full-width photo row that makes "there's more sideways" obvious:
 * - desktop: it drifts sideways by itself as you scroll down past it (scroll-linked, never pinned);
 *   the moment you drag, swipe, or press an arrow, you're in control and the drift stops;
 * - arrows sit on the row, with a fade at whichever edge has more to show;
 * - touch: native swipe with snap.
 */
export function DriftRow({ label, children }: { label: string; children: ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const manual = useRef(false)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [drifting, setDrifting] = useState(false)

  // Edge state for the fades and arrows.
  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const update = () =>
      setEdge({ start: row.scrollLeft < 8, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 8 })
    update()
    row.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      row.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Scroll-linked drift (desktop pointers, motion allowed). The page scroll sets a *target*;
  // each frame the row glides a fraction of the way there, so wheel steps become one smooth slide.
  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)')
    if (!mq.matches || prefersReducedMotion()) return
    setDrifting(true)

    let frame = 0
    let pos = row.scrollLeft
    const target = () => {
      const r = row.getBoundingClientRect()
      const vh = window.innerHeight
      // Row top at 85% of the screen -> start; row top at 10% -> fully slid across.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.75)))
      return p * (row.scrollWidth - row.clientWidth)
    }
    const tick = () => {
      frame = 0
      if (manual.current) return
      const goal = target()
      pos += (goal - pos) * 0.12 // ease toward the goal
      if (Math.abs(goal - pos) < 0.5) pos = goal
      row.scrollLeft = pos
      if (pos !== goal) frame = requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const take = () => {
      manual.current = true
      setDrifting(false)
    }
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) take()
    }
    row.addEventListener('pointerdown', take)
    row.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', kick, { passive: true })
    pos = target()
    row.scrollLeft = pos
    return () => {
      cancelAnimationFrame(frame)
      row.removeEventListener('pointerdown', take)
      row.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', kick)
    }
  }, [])

  const page = (dir: 1 | -1) => {
    const row = rowRef.current
    if (!row) return
    manual.current = true
    setDrifting(false)
    row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="film" data-start={edge.start || undefined} data-end={edge.end || undefined}>
      <div className="film-controls">
        <span className="film-hint" aria-hidden="true">
          {drifting ? 'Scroll to see more' : 'Drag, swipe or use the arrows'}
        </span>
        <div className="film-arrows">
          <button type="button" onClick={() => page(-1)} disabled={edge.start} aria-label={`Previous: ${label}`}>
            <Icon name="caret" className="arrow-prev" />
          </button>
          <button type="button" onClick={() => page(1)} disabled={edge.end} aria-label={`Next: ${label}`}>
            <Icon name="caret" className="arrow-next" />
          </button>
        </div>
      </div>
      <div className="film-viewport">
        <div
          ref={rowRef}
          className={drifting ? 'film-track film-scroll prints is-drifting' : 'film-track film-scroll prints'}
          tabIndex={0}
          aria-label={`${label}, scroll sideways`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/** Photography: a card, then a full-width row of straight prints that drifts as you scroll. */
export function Gallery() {
  const p = site.photography
  return (
    <div className="feature">
      <FeatureCard icon="camera" label="Photography" meta={`Dublin · ${p.photos.length} shots`} title={p.title} body={p.body} />
      <DriftRow label="Photos of Dublin">
        {p.photos.map((ph) => (
          <figure key={ph.src} className="print print-photo" style={{ '--ar': ph.width / ph.height } as CSSProperties}>
            <img className="lqip" style={lqip(ph.src)} src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" decoding="async" />
            <figcaption>
              <span className="print-label">{ph.label}</span>
            </figcaption>
          </figure>
        ))}
      </DriftRow>
    </div>
  )
}
