import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { beatLabels, beats, projectAnchor, projectShortNames, site } from '../content'
import { scrollToElement, scrollToId } from '../lib/smooth'

/** A section is "active" once its top passes this fraction of the viewport. */
const ACTIVE_LINE = 0.4

/**
 * "On this page": a fixed contents list on the left. Wide screens show every section name;
 * while you're in Projects, the projects expand underneath so you can jump straight to one.
 * Narrower laptops get dots with hover labels; phones hide it (the top bar covers them).
 */
export function Spine() {
  const [active, setActive] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [covered, setCovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * ACTIVE_LINE
      let idx = 0
      beats.forEach((id, i) => {
        const el = document.getElementById(id)
        // Hidden sections (e.g. in skim mode) don't count.
        if (el && el.offsetParent !== null && el.getBoundingClientRect().top <= line) idx = i
      })
      // Short final sections may never cross the line: the bottom of the page lights the last.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = beats.length - 1
      setActive(idx)

      // How far through the current section you are (0..1), for the hairline under its name.
      const cur = document.getElementById(beats[idx])
      if (cur) {
        const r = cur.getBoundingClientRect()
        setProgress(Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height))))
      }

      let p = 0
      site.projects.forEach((proj, i) => {
        const el = document.getElementById(projectAnchor(proj.name))
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) p = i
      })
      setActiveProject(p)

      // Full-width photo rows pass under the list: step aside while one overlaps it.
      const nav = navRef.current?.getBoundingClientRect()
      if (nav) {
        const hit = [...document.querySelectorAll('.film')].some((f) => {
          const r = f.getBoundingClientRect()
          return r.bottom > nav.top && r.top < nav.bottom
        })
        setCovered(hit)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const jumpToProject = (name: string) => {
    const el = document.getElementById(projectAnchor(name))
    if (el) scrollToElement(el, -132)
  }

  return (
    <nav
      ref={navRef}
      className={['toc', covered && 'is-covered', active === 0 && 'is-hero'].filter(Boolean).join(' ')}
      aria-label="On this page"
    >
      <ol>
        {beats.map((id, i) => {
          const meta = beatLabels[id]
          const state = i === active ? 'current' : i < active ? 'passed' : 'ahead'
          return (
            <li
              key={id}
              className="toc-li"
              data-state={state}
              data-id={id}
              style={i === active ? ({ '--p': progress } as CSSProperties) : undefined}
            >
              <button
                type="button"
                className="toc-item"
                aria-current={i === active ? 'location' : undefined}
                onClick={() => scrollToId(id)}
              >
                <span className="toc-dot" aria-hidden="true" />
                <span className="toc-text">
                  <span className="toc-num">{meta?.num}</span>
                  {meta?.label ?? id}
                </span>
              </button>

              {id === 'projects' && i === active && (
                <ol className="toc-sub">
                  {site.projects.map((proj, j) => (
                    <li key={proj.name}>
                      <button
                        type="button"
                        className={j === activeProject ? 'toc-subitem is-current' : 'toc-subitem'}
                        aria-current={j === activeProject ? 'true' : undefined}
                        onClick={() => jumpToProject(proj.name)}
                      >
                        {projectShortNames[proj.name] ?? proj.name}
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
