import { useInView, useReducedMotion } from 'motion/react'
import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

/*
 * Two tiny flat-2D cartoons for the Outside of work tiles. Characters are rigged: every limb is a
 * group that rotates about its joint (set with --o, the joint in SVG user units), so the motion is
 * smooth rather than a swap of drawings. Each plays once when scrolled into view and replays on
 * hover; with reduced motion (or no JS) it's a still frame with the caption shown.
 * Canvas: 240 x 80 user units, ground near y = 72.
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

/** Joint pivot for a rigged part, in SVG user units. */
const at = (x: number, y: number) => ({ '--o': `${x}px ${y}px` }) as CSSProperties

/**
 * Sisyphus, side-on. The rig is drawn in "slope space": x runs along the hill, y = 0 is the
 * ground. The whole scene is then laid onto the hill (it rises 50 over 190, about 14.7 deg).
 */
export function Sisyphus({ caption }: { caption: string }) {
  const leg = (cls: string) => (
    <g className={`sk-leg ${cls}`} style={at(0, -17)}>
      <path className="sk-limb" d="M0 -17 L0 -8.6" />
      <g className="sk-shin" style={at(0, -8.6)}>
        <path className="sk-limb" d="M0 -8.6 L0 -0.8" />
        <path className="sk-foot" d="M-0.6 -0.6 L3.8 -0.6" />
      </g>
    </g>
  )
  return (
    <Sketch scene="sisyphus" label="Sisyphus pushing a boulder uphill." caption={caption}>
      <path className="sk-ground" d="M4 73.6 L200 22 L236 22" />
      <g transform="translate(10 72) rotate(-14.75)">
        {/* the boulder: r = 11, sitting on the hill */}
        <g className="sk-boulder-track">
          <g className="sk-boulder">
            <circle className="sk-rock" cx="34" cy="-11" r="11" />
            <path className="sk-rock-line" d="M28 -15 q4 2 3 7 M37.5 -18 l2 4 M33 -3.5 q3 -1.4 5 0.6" />
          </g>
        </g>
        {/* the man */}
        <g className="sk-runner">
          <g className="sk-body">
            {leg('sk-leg-back')}
            {leg('sk-leg-front')}
            {/* torso leans into the push, pivoting at the hip */}
            <g className="sk-torso-g" style={at(0, -17)}>
              <rect className="sk-fill" x="-3.6" y="-31" width="7.2" height="15.6" rx="3.6" transform="rotate(42 0 -17)" />
            </g>
            <circle className="sk-fill" cx="13.6" cy="-30.6" r="4.6" />
            {/* arms: pushing, then arms up: at the top, and again once it's rolled back down (happy anyway) */}
            <g className="sk-arms sk-arms-push">
              <path className="sk-limb" d="M8.6 -26 L18 -16.6" />
              <path className="sk-limb sk-limb-thin" d="M8 -24.6 L18.4 -19.6" />
              <circle className="sk-fill" cx="18.6" cy="-16.4" r="1.9" />
            </g>
            <g className="sk-arms sk-arms-cheer">
              <path className="sk-limb" d="M8.6 -26 L5.4 -37.2" />
              <path className="sk-limb" d="M8.6 -26 L14.8 -36.4" />
            </g>
          </g>
        </g>
      </g>
    </Sketch>
  )
}

/** Guitarist, facing you on a stool, left foot up on a footstool like a classical player. */
export function Guitarist({ caption }: { caption: string }) {
  return (
    <Sketch scene="guitar" label="A person on a stool tuning a classical guitar." caption={caption}>
      <path className="sk-ground" d="M4 72 L236 72" />
      {/* footstool + stool */}
      <rect className="sk-prop" x="38" y="66.4" width="12" height="5.6" rx="1.2" />
      <path className="sk-prop-line" d="M54 55.6 L74 55.6 M57 56 L55 72 M71 56 L73 72" />

      {/* legs (front view): left foot up on the footstool */}
      <path className="sk-limb" d="M58 55 L50 59.6 L45.6 66.2" />
      <path className="sk-limb" d="M68 55 L71.4 63 L71.6 71.4" />
      <path className="sk-foot" d="M42.6 66.2 L47.6 66.2 M69 71.6 L74.4 71.6" />

      {/* torso + head (head tilts to listen) */}
      <rect className="sk-fill" x="55.4" y="33.6" width="15.2" height="22.8" rx="6" />
      <g className="sk-head-g" style={at(63, 33)}>
        <circle className="sk-fill" cx="63" cy="27.4" r="5.6" />
      </g>

      {/* the guitar: figure-8 body across the lap, neck up to the left */}
      <g className="sk-guitar">
        <path className="sk-neck" d="M60 46.4 L36.4 32.2" />
        <rect className="sk-headstock" x="30.6" y="28.4" width="7.4" height="4.8" rx="1.2" transform="rotate(31 34.3 30.8)" />
        <g className="sk-peg">
          <circle className="sk-peg-c" cx="31.8" cy="27.6" r="1.7" />
        </g>
        <g transform="rotate(31 66 50)">
          <circle className="sk-gbody" cx="60.4" cy="50" r="5.4" />
          <circle className="sk-gbody" cx="70.4" cy="50" r="7" />
          <rect className="sk-gbody" x="60" y="45.6" width="11" height="8.8" />
          <circle className="sk-hole" cx="64.8" cy="50" r="2" />
        </g>
      </g>

      {/* arms: the fretting hand goes to the tuning peg, then back to the neck */}
      <g className="sk-arms sk-arms-tune">
        <path className="sk-limb" d="M57 37.4 L45.2 37.6 L34.2 29.8" />
        <circle className="sk-fill" cx="33.6" cy="29.4" r="2" />
      </g>
      <g className="sk-arms sk-arms-play">
        <path className="sk-limb" d="M57 37.4 L47 43 L45.4 38" />
        <circle className="sk-fill" cx="45.2" cy="37.6" r="2" />
      </g>
      {/* strumming arm, pivoting at the elbow */}
      <path className="sk-limb" d="M69 37.4 L75.6 45" />
      <g className="sk-strum" style={at(75.6, 45)}>
        <path className="sk-limb" d="M75.6 45 L67.8 50.2" />
        <circle className="sk-fill" cx="67.4" cy="50.4" r="2" />
      </g>

      {/* "is it in tune?" pings, then the notes */}
      <path className="sk-wave sk-w1" d="M27.4 24.8 q-2.6 2.8 0 5.6" />
      <path className="sk-wave sk-w2" d="M24 22.8 q-4 4.8 0 9.6" />
      <g className="sk-notes">
        <path className="sk-note sk-n1" d="M80 44 L80 36 L84 35 M80 44 m-2.2 0 a2.2 1.7 0 1 0 4.4 0 a2.2 1.7 0 1 0 -4.4 0" />
        <path className="sk-note sk-n2" d="M80 44 L80 36 M80 44 m-2.2 0 a2.2 1.7 0 1 0 4.4 0 a2.2 1.7 0 1 0 -4.4 0" />
        <path className="sk-note sk-n3" d="M80 44 L80 36 L84 35 L84 42 M80 44 m-2.2 0 a2.2 1.7 0 1 0 4.4 0 a2.2 1.7 0 1 0 -4.4 0" />
      </g>
    </Sketch>
  )
}
