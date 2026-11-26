import { Icon } from './Icon'

const KEY = 'vt-theme'

function currentTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Defaults to the system theme; an explicit choice is saved and wins from then on.
 * Icons cross-fade/rotate purely in CSS, so server and client markup always match.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    root.classList.add('theme-anim')
    root.setAttribute('data-theme', next)
    window.setTimeout(() => root.classList.remove('theme-anim'), 500)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage unavailable: choice lasts for this visit only */
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light or dark theme">
      <Icon name="sun" size={17} className="ico ico-sun" />
      <Icon name="moon" size={17} className="ico ico-moon" />
    </button>
  )
}
