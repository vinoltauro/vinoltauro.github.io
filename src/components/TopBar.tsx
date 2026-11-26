import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState, type MouseEvent } from 'react'
import { site } from '../content'
import { scrollToId } from '../lib/smooth'
import { SkimToggle } from './SkimToggle'
import { ThemeToggle } from './ThemeToggle'

const jump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  scrollToId(id)
}

/**
 * Apple-style global bar. Transparent over the hero (the name is already huge there);
 * once the hero name has scrolled away it frosts over and the name + contact slide in.
 */
export function TopBar() {
  const { scrollY } = useScroll()
  const [docked, setDocked] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setDocked(v > window.innerHeight * 0.5))

  return (
    <header className={docked ? 'topbar is-docked' : 'topbar'}>
      <div className="topbar-inner">
        <a className="topbar-name" href="#hero" onClick={jump('hero')} tabIndex={docked ? 0 : -1}>
          {site.name}
        </a>
        <nav className="topbar-actions" aria-label="Site">
          <a
            className="topbar-contact"
            href={site.contact.cv}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={docked ? 0 : -1}
          >
            CV
          </a>
          <a className="topbar-contact" href="#contact" onClick={jump('contact')} tabIndex={docked ? 0 : -1}>
            Contact
          </a>
          <SkimToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
