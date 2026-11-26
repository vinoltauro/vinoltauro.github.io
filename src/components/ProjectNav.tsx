import { useEffect, useState } from 'react'
import { projectAnchor, projectShortNames, type Project } from '../content'
import { scrollToElement } from '../lib/smooth'
import { Icon } from './Icon'

/**
 * Where-am-I pill for Projects on phones and tablets: "‹ EliteCode · 2 / 5 ›", sticky under the
 * top bar while Projects is on screen. Wide screens hide it (the left contents list covers it).
 */
export function ProjectNav({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = projects.map((p) => document.getElementById(projectAnchor(p.name)))
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let idx = 0
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [projects])

  const go = (i: number) => {
    const p = projects[i]
    const el = p && document.getElementById(projectAnchor(p.name))
    if (el) scrollToElement(el, -120)
  }

  const current = projects[active]
  return (
    <nav className="project-pill" aria-label="Projects">
      <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project">
        <Icon name="caret" className="arrow-prev" />
      </button>
      <span className="project-pill-label" aria-live="polite">
        <Icon name={current.kind.icon} />
        <strong>{projectShortNames[current.name] ?? current.name}</strong>
        <span className="project-pill-count">
          {active + 1} / {projects.length}
        </span>
      </span>
      <button
        type="button"
        onClick={() => go(active + 1)}
        disabled={active === projects.length - 1}
        aria-label="Next project"
      >
        <Icon name="caret" className="arrow-next" />
      </button>
    </nav>
  )
}
