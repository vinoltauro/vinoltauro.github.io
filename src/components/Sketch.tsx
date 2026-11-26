import { useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, type ReactNode } from 'react'

/*
 * Tiny line-drawing jokes for the Outside of work tiles. Each plays once when it scrolls into
 * view, replays on hover, never loops; with reduced motion (or no JS) it's a still drawing with
 * the caption shown. Coordinates are SVG user units in a 240x80 box; the ground sits near y=72.
 */
function Sketch({ scene, label, caption, children }: { scene: string; label: string; caption: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const seen = useInView(ref, { once: true, amount: 0.8 })
  const [take, setTake] = useState(0) // bump to remount the drawing and replay
  const playing = seen && !reduce
  return (
    <div
      ref={ref}
      className={`sketch sketch-${scene}${playing ? ' is-playing' : ''}`}
      onMouseEnter={() => playing && setTake((t) => t + 1)}
    >
      <svg key={take} viewBox="0 0 240 80" role="img" aria-label={`${label} ${caption}`}>
        {children}
      </svg>
      <p className="sketch-caption">{caption}</p>
    </div>
  )
}

/** Sisyphus: pushes the boulder almost to the top; it rolls back; he shrugs. */
export function Sisyphus({ caption }: { caption: string }) {
  return (
    <Sketch scene="sisyphus" label="Sisyphus pushing a boulder uphill." caption={caption}>
      <path className="sk-ground" d="M4 73.6 L200 22 L236 22" />
      <g className="sk-boulder">
        <circle cx="47.7" cy="52.8" r="9" />
        <path className="sk-crack" d="M43.5 49.5 q3 2 2 5.5 M50 47.5 l1.5 3" />
      </g>
      <g className="sk-man">
        <circle className="sk-head" cx="37.6" cy="44.4" r="3.7" />
        <path className="sk-torso" d="M27 58 L35 49" />
        <path d="M27 58 L22.6 63.8 L18.6 69.6 M27 58 L31.4 61.6 L30.2 66.8" />
        <path className="sk-arms-work" d="M35 49 L37.4 52.8 L39.4 52.4 M35.6 48.4 L38.4 50.8 L40.2 49.6" />
        <path className="sk-arms-shrug" d="M35 49 L31.2 47.8 L30.4 43.8 M35.4 48.6 L39 46.6 L39.8 42.8" />
      </g>
    </Sketch>
  )
}

/** Builder: stacks blocks into a tower; the top one topples off; he shrugs. */
export function Builder({ caption }: { caption: string }) {
  return (
    <Sketch scene="builder" label="A person stacking blocks into a tower." caption={caption}>
      <path className="sk-ground" d="M4 72 L236 72" />
      <rect className="sk-block sk-b1" x="92" y="61" width="18" height="11" rx="1.5" />
      <rect className="sk-block sk-b2" x="94" y="50" width="18" height="11" rx="1.5" />
      <rect className="sk-block sk-b3" x="93" y="39" width="18" height="11" rx="1.5" />
      <g className="sk-man">
        <circle className="sk-head" cx="62" cy="43.6" r="3.7" />
        <path className="sk-torso" d="M61 59.5 L62 48.6" />
        <path d="M61 59.5 L58.8 65.6 L57.4 72 M61 59.5 L63.6 65.4 L65 72" />
        <path className="sk-arms-work" d="M62 49.4 L67.4 52.6 L72.6 50.4 M62 49.4 L58.6 54.6 L59.4 58.6" />
        <path className="sk-arms-shrug" d="M62 49.4 L57.6 48 L56.8 44 M62 49.4 L66.4 48 L67.2 44" />
      </g>
    </Sketch>
  )
}
