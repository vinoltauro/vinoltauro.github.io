/** Apple-style easing: quick departure, long soft settle. Shared by every animation. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
