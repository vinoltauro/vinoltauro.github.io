import { prefersReducedMotion } from './motion'

/* Native scrolling only: no scroll-jacking or inertia libraries. */
const behavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth')

/** Scroll to a section by id and reflect it in the URL. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: behavior(), block: 'start' })
  history.replaceState(null, '', `#${id}`)
  // Move keyboard/screen-reader focus to the section too (sections carry tabIndex=-1).
  el.focus({ preventScroll: true })
}

/** Scroll an element into view with an offset (e.g. to clear the sticky top bar). */
export function scrollToElement(el: HTMLElement, offset = -80) {
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: behavior() })
}
