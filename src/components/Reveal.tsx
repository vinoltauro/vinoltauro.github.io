import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '../lib/motion'

const tags = {
  div: motion.div,
  p: motion.p,
  li: motion.li,
  article: motion.article,
  h2: motion.h2,
}

const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }

type Props = {
  as?: keyof typeof tags
  className?: string
  /** Stagger, in ms, for elements that enter together. */
  delay?: number
  /** Gentle spring lift on hover (cards). */
  lift?: boolean
  children: ReactNode
}

/**
 * Blur-to-focus reveal, once, as the element scrolls in. Markup is identical on server and client;
 * reduced motion just makes the transition instant. If JS never runs, a <noscript>/failsafe style
 * in index.html shows the resting state.
 */
export function Reveal({ as = 'div', className, delay = 0, lift, children }: Props) {
  const reduce = useReducedMotion()
  const Tag = tags[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      // Reduced motion: show at rest immediately rather than waiting for the viewport.
      animate={reduce ? shown : undefined}
      whileInView={reduce ? undefined : shown}
      whileHover={lift && !reduce ? { y: -4, transition: { type: 'spring', stiffness: 380, damping: 28 } } : undefined}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  )
}
