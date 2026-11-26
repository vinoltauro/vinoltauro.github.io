import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { site } from '../content'
import { scrollToId } from '../lib/smooth'
import { Icon } from './Icon'

const jump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  scrollToId(id)
}

/** Entrance order for the CSS load animation (runs on first paint, before JS). */
const step = (i: number) => ({ '--i': i }) as CSSProperties

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const focus = (i: number | null) => setActive(i)

  // As you scroll away, the hero fades a little. Nothing moves or scales.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  const { greeting, contact } = site
  const first = site.chapters[0]

  return (
    <section className="hero" id="hero" ref={ref} aria-labelledby="hero-heading" tabIndex={-1}>
      <motion.div className="hero-inner" style={reduce ? undefined : { opacity }}>
        <p className="kicker enter" style={step(0)}>
          {site.kicker.role} <span className="caret" aria-hidden="true">▍</span> {site.kicker.place}
        </p>

        <h1 id="hero-heading">
          <span className="greeting enter" style={step(1)}>
            {greeting.before} <strong>{greeting.name}</strong>
            {greeting.after}
          </span>
          <span
            className={active === null ? 'words' : 'words has-active'}
            onMouseLeave={() => focus(null)}
          >
            {site.chapters.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={jump(c.id)}
                onMouseEnter={() => focus(i)}
                onFocus={() => focus(i)}
                onBlur={() => focus(null)}
                className={active === i ? 'word is-active' : 'word'}
              >
                <span className="word-text enter" style={step(2 + i * 0.7)}>
                  {c.word}
                </span>
                <span className="word-cap" aria-hidden="true">
                  <span className="cap-num">{c.num}</span>
                  <span className="cap-line" />
                  <span className="cap-label">{c.tag}</span>
                </span>
              </a>
            ))}
          </span>
        </h1>

        <p className="bio enter" style={step(4.4)}>
          {site.bio.map((part, i) => (typeof part === 'string' ? part : <em key={i}>{part.hl}</em>))}
        </p>

        <p className="hero-stack enter" style={step(4.8)} aria-label={`Core stack: ${site.heroStack.join(', ')}`}>
          {site.heroStack.map((t, i) => (
            <span key={t}>
              {t}
              {i < site.heroStack.length - 1 && (
                <span className="hero-stack-dot" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="hero-cta enter" style={step(5.2)}>
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            <Icon name="email" />
            Email me
          </a>
          {contact.cv && (
            <a className="btn" href={contact.cv} {...external}>
              <Icon name="cv" />
              CV
            </a>
          )}
          <a className="btn btn-ghost btn-icon-only-sm" href={contact.linkedin} {...external}>
            <Icon name="linkedin" />
            <span className="btn-label">LinkedIn</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="btn btn-ghost btn-icon-only-sm" href={contact.github} {...external}>
            <Icon name="github" />
            <span className="btn-label">GitHub</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </motion.div>

      <motion.div className="scroll-cue-wrap" style={reduce ? undefined : { opacity: cueOpacity }}>
        <a className="scroll-cue enter" style={step(6)} href={`#${first.id}`} onClick={jump(first.id)}>
          <Icon name="down" className="arrow" /> {site.scrollCue}
        </a>
      </motion.div>
    </section>
  )
}
