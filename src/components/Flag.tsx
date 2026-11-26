/** The seven flags the site uses, copied as small SVG files into /public/flags (from country-flag-icons). */
export type FlagCode = 'IE' | 'ES' | 'NG' | 'SO' | 'CN' | 'MN' | 'JP'

/** Small rounded SVG flag (consistent on every OS, unlike emoji flags). Decorative: the name is beside it. */
export function Flag({ code }: { code: FlagCode }) {
  return (
    <span className="flag" aria-hidden="true">
      <img src={`/flags/${code}.svg`} alt="" width={18} height={12} loading="lazy" decoding="async" />
    </span>
  )
}
