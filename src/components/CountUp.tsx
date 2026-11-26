import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE } from '../lib/motion'

type Props = { to: number; decimals?: number; suffix?: string; className?: string }

const fmt = (v: number, decimals: number) => v.toFixed(decimals)

/**
 * Counts from 0 to `to` the first time it scrolls into view.
 * Server/no-JS render shows the final value; screen readers always get the final value.
 */
export function CountUp({ to, decimals = 0, suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotion()
  const final = fmt(to, decimals) + suffix

  // Park at zero until seen (only if motion is allowed and it's still off-screen).
  useEffect(() => {
    if (ref.current && !reduce && !inView) ref.current.textContent = fmt(0, decimals) + suffix
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = final
      return
    }
    const ctl = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => (el.textContent = fmt(v, decimals) + suffix),
    })
    return () => ctl.stop()
  }, [inView, reduce, to, decimals, suffix, final])

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      {/* Reserve the final width so the number never nudges its neighbours while counting. */}
      <span ref={ref} aria-hidden="true" className="count" style={{ minWidth: `${final.length}ch` }}>
        {final}
      </span>
    </span>
  )
}
