import { useInView } from 'motion/react'
import { useEffect, useRef } from 'react'
import dotsData from '../globe-dots.json'
import { prefersReducedMotion } from '../lib/motion'

/*
 * A dotted globe: land as tiny dots, the cuisine countries in cobalt. It turns once to Dublin when
 * it scrolls into view, glides to a country when its chip is hovered/focused/tapped (drawing an arc
 * from Dublin), and can be dragged. It never spins on its own. Canvas + a hand-written orthographic
 * projection, so no map library ships. Dots come from scripts/build-globe.mjs.
 */

type Dot = [lon: number, lat: number, country: number]
const DOTS = dotsData as Dot[]
const RAD = Math.PI / 180
const DUBLIN: [number, number] = [-6.26, 53.35]
const TILT = 22 // degrees the view looks down onto the northern hemisphere at rest

export type Place = { lon: number; lat: number }

type View = { lon: number; lat: number }

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180

function css(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/** Great-circle point at fraction t between a and b (lon/lat degrees). */
function slerp(a: [number, number], b: [number, number], t: number): [number, number] {
  const [l1, p1] = [a[0] * RAD, a[1] * RAD]
  const [l2, p2] = [b[0] * RAD, b[1] * RAD]
  const v1 = [Math.cos(p1) * Math.cos(l1), Math.cos(p1) * Math.sin(l1), Math.sin(p1)]
  const v2 = [Math.cos(p2) * Math.cos(l2), Math.cos(p2) * Math.sin(l2), Math.sin(p2)]
  const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]))
  const w = Math.acos(dot)
  if (w < 1e-6) return a
  const s1 = Math.sin((1 - t) * w) / Math.sin(w)
  const s2 = Math.sin(t * w) / Math.sin(w)
  const v = v1.map((x, i) => s1 * x + s2 * v2[i])
  return [Math.atan2(v[1], v[0]) / RAD, Math.asin(v[2]) / RAD]
}

export function Globe({ places, active, label }: { places: Place[]; active: number | null; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const seen = useInView(wrapRef, { once: true, amount: 0.5 })
  const state = useRef({
    view: { lon: DUBLIN[0] + 90, lat: TILT } as View, // starts turned away; the intro turns it to Dublin
    anim: null as null | { from: View; to: View; start: number; dur: number },
    arc: 0, // 0..1 drawn fraction of the Dublin -> country arc
    arcTo: null as number | null,
    frame: 0,
    dragging: false,
  })
  const drawRef = useRef<() => void>(() => {})

  // ----- drawing -----
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const st = state.current

    const draw = () => {
      const size = canvas.clientWidth
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      if (canvas.width !== Math.round(size * dpr)) {
        canvas.width = Math.round(size * dpr)
        canvas.height = Math.round(size * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, size, size)
      const R = size / 2 - 3
      const cx = size / 2
      const cy = size / 2
      const faint = css('--faint')
      const accent = css('--accent')
      const line = css('--line')

      const l0 = st.view.lon * RAD
      const p0 = st.view.lat * RAD
      const sp0 = Math.sin(p0)
      const cp0 = Math.cos(p0)
      const project = (lon: number, lat: number, lift = 1) => {
        const l = lon * RAD - l0
        const p = lat * RAD
        const cosc = sp0 * Math.sin(p) + cp0 * Math.cos(p) * Math.cos(l)
        const x = cx + R * lift * Math.cos(p) * Math.sin(l)
        const y = cy - R * lift * (cp0 * Math.sin(p) - sp0 * Math.cos(p) * Math.cos(l))
        return { x, y, cosc }
      }

      // sphere rim
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = line
      ctx.lineWidth = 1
      ctx.stroke()

      // land dots: dimmer toward the rim, cuisine countries in cobalt, the active one brightest
      const dotR = Math.max(0.8, R / 120)
      for (const [lon, lat, c] of DOTS) {
        const { x, y, cosc } = project(lon, lat)
        if (cosc <= 0) continue
        const isCountry = c >= 0
        const isActive = c === active
        ctx.globalAlpha = (isCountry ? 0.55 : 0.22) + cosc * (isCountry ? 0.45 : 0.5)
        ctx.fillStyle = isCountry ? accent : faint
        ctx.beginPath()
        ctx.arc(x, y, isActive ? dotR * 1.7 : isCountry ? dotR * 1.25 : dotR, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // arc from Dublin, lifted off the surface, drawn progressively
      if (st.arcTo !== null && st.arc > 0) {
        const to: [number, number] = [places[st.arcTo].lon, places[st.arcTo].lat]
        ctx.beginPath()
        let pen = false
        const N = 48
        for (let i = 0; i <= Math.round(N * st.arc); i++) {
          const t = i / N
          const [lon, lat] = slerp(DUBLIN, to, t)
          const pt = project(lon, lat, 1 + 0.16 * Math.sin(Math.PI * t))
          if (pt.cosc > -0.12) {
            if (pen) ctx.lineTo(pt.x, pt.y)
            else ctx.moveTo(pt.x, pt.y)
            pen = true
          } else pen = false
        }
        ctx.strokeStyle = accent
        ctx.lineWidth = 1.6
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Dublin: a small ring, home
      const d = project(DUBLIN[0], DUBLIN[1])
      if (d.cosc > 0) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, dotR * 3.2, 0, Math.PI * 2)
        ctx.strokeStyle = accent
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }
    drawRef.current = draw

    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    // redraw when the theme flips (system or toggle)
    const mo = new MutationObserver(draw)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', draw)
    draw()
    return () => {
      ro.disconnect()
      mo.disconnect()
      mq.removeEventListener('change', draw)
      // Cancel and clear, or the next animation thinks a frame is still pending and never starts.
      cancelAnimationFrame(st.frame)
      st.frame = 0
    }
  }, [places, active])

  // ----- motion -----
  const tick = (now: number) => {
    const st = state.current
    st.frame = 0
    let more = false
    if (st.anim) {
      const t = Math.min(1, (now - st.anim.start) / st.anim.dur)
      const k = ease(t)
      st.view = {
        lon: st.anim.from.lon + wrap(st.anim.to.lon - st.anim.from.lon) * k,
        lat: st.anim.from.lat + (st.anim.to.lat - st.anim.from.lat) * k,
      }
      // the arc draws in step with the turn, so it always finishes when the turn does
      if (st.arcTo !== null) st.arc = Math.max(st.arc, k)
      if (t < 1) more = true
      else st.anim = null
    } else if (st.arcTo !== null) st.arc = 1
    drawRef.current()
    if (more) st.frame = requestAnimationFrame(tick)
    // One extra paint after the motion settles, so the final frame (full arc) is never lost.
    else requestAnimationFrame(() => drawRef.current())
  }
  const kick = () => {
    if (!state.current.frame) state.current.frame = requestAnimationFrame(tick)
  }
  const goTo = (to: View, dur: number) => {
    const st = state.current
    if (prefersReducedMotion()) {
      st.view = to
      st.anim = null
      st.arc = 1
      drawRef.current()
      return
    }
    st.anim = { from: { ...st.view }, to, start: performance.now(), dur }
    kick()
  }

  // intro: turn once to Dublin
  useEffect(() => {
    if (!seen) return
    goTo({ lon: DUBLIN[0] + 10, lat: TILT }, 1800)
  }, [seen])

  // follow the hovered / selected country, with an arc from Dublin
  useEffect(() => {
    const st = state.current
    if (active === null) {
      st.arcTo = null
      st.arc = 0
      if (seen) goTo({ lon: DUBLIN[0] + 10, lat: TILT }, 900)
      return
    }
    const p = places[active]
    // centre between Dublin and the target, so the whole arc is in view
    const [mlon, mlat] = slerp(DUBLIN, [p.lon, p.lat], 0.55)
    st.arcTo = active
    st.arc = 0
    goTo({ lon: mlon, lat: Math.max(-10, Math.min(45, mlat)) }, 1000)
  }, [active])

  // drag to spin (horizontal on touch, so vertical page scrolling still works)
  useEffect(() => {
    const canvas = canvasRef.current!
    let last: { x: number; y: number } | null = null
    const down = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY }
      state.current.anim = null
      canvas.setPointerCapture(e.pointerId)
      canvas.classList.add('is-dragging')
    }
    const move = (e: PointerEvent) => {
      if (!last) return
      const st = state.current
      const k = 180 / canvas.clientWidth
      st.view = {
        lon: st.view.lon - (e.clientX - last.x) * k,
        lat: Math.max(-60, Math.min(70, st.view.lat + (e.clientY - last.y) * k * (e.pointerType === 'touch' ? 0 : 1))),
      }
      last = { x: e.clientX, y: e.clientY }
      kick()
    }
    const up = () => {
      last = null
      canvas.classList.remove('is-dragging')
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)
    return () => {
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <div ref={wrapRef} className="globe">
      <canvas ref={canvasRef} role="img" aria-label={label} />
    </div>
  )
}
