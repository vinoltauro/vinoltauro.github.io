import type { CSSProperties } from 'react'
import previews from '../lqip.json'

const map = previews as Record<string, string>

/** Style for an <img>: its blurred preview as a background, painted over when the real image loads. */
export function lqip(src: string): CSSProperties | undefined {
  const data = map[src]
  return data ? { backgroundImage: `url(${data})` } : undefined
}
