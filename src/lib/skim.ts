import { useSyncExternalStore } from 'react'

/**
 * Skim mode: a recruiter-friendly view that hides long-form detail (intros, extra screenshots,
 * breakdowns, coursework) so the page reads in a fraction of the scroll. It's just a data attribute
 * on <html>, so CSS does the hiding; index.html applies the saved choice before first paint.
 */
const KEY = 'vt-skim'
const listeners = new Set<() => void>()

const read = () => typeof document !== 'undefined' && document.documentElement.hasAttribute('data-skim')

export function setSkim(on: boolean) {
  const root = document.documentElement

  // Keep the reader's place: remember where the block under the top bar sits, restore it after.
  const probe = document.elementFromPoint(window.innerWidth / 2, 140)
  const anchor = probe?.closest('.role-item, main > section') as HTMLElement | null
  const before = anchor?.getBoundingClientRect().top

  if (on) root.setAttribute('data-skim', '')
  else root.removeAttribute('data-skim')

  if (anchor && before !== undefined) {
    const after = anchor.getBoundingClientRect().top
    window.scrollBy({ top: after - before, behavior: 'instant' as ScrollBehavior })
  }
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l())
}

export function useSkim() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    read,
    () => false,
  )
}
