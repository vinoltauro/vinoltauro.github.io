import type { Logo } from '../content'

/**
 * Logo in its real brand colours. Where a brand colour would vanish on the dark theme, a lifted
 * variant swaps in (purely in CSS, following the theme toggle). Decorative: the name is in the text.
 */
export function LogoMark({ logo }: { logo: Logo }) {
  const w = Math.round(logo.height * logo.aspect)
  const props = { width: w, height: logo.height, alt: '', decoding: 'async' as const, loading: 'lazy' as const }
  return (
    <span className="logo" aria-hidden="true">
      <img {...props} src={logo.src} className={logo.dark ? 'logo-light' : undefined} />
      {logo.dark && <img {...props} src={logo.dark} className="logo-dark" />}
    </span>
  )
}
