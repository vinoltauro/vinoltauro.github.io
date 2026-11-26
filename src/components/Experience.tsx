import { motion, useInView, useReducedMotion, useScroll, useSpring, type Variants } from 'motion/react'
import { useId, useRef, useState, type CSSProperties } from 'react'
import { projectAnchor, type Education, type Logo, type Metric, type Project, type Role } from '../content'
import { EASE } from '../lib/motion'
import { scrollToElement } from '../lib/smooth'
import { CountUp } from './CountUp'
import { Icon, type IconName } from './Icon'
import { Reveal } from './Reveal'
import { Lightbox } from './Lightbox'
import { LogoMark } from './LogoMark'
import { lqip } from '../lib/lqip'

/* --------------------------------------------------------------------------
   One card design, shared by Companies and Education.
   -------------------------------------------------------------------------- */

type Chip = { label: string; icon: IconName; accent?: boolean }

type CardLink = { label: string; href: string; icon: IconName }

type CardData = {
  key: string
  /** Optional anchor id so the card can be linked/jumped to. */
  anchor?: string
  /** Header mark: a company/school logo, or a badge describing the kind of work. */
  logo?: Logo
  badge?: { icon: IconName; label: string }
  links?: CardLink[]
  title: string
  subtitle: string
  chips: Chip[]
  context?: string
  intro?: string
  /** Show the intro on the card even when there's a breakdown (companies). */
  introOutside?: boolean
  metrics?: Metric[]
  media?: Project['media']
  mediaLayout?: Project['mediaLayout']
  /** Always-visible list (e.g. coursework). */
  list?: { label: string; items: string[] }
  /** Expandable breakdown. */
  detailsLabel?: string
  details?: Array<{ icon: IconName; heading: string; body: string }>
  tags?: string[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Sep 2022" → "Jun 2025" ⇒ "2 yrs 9 mos". */
function tenure(start: string, end: string) {
  const parse = (s: string) => {
    const [m, y] = s.split(' ')
    return Number(y) * 12 + MONTHS.indexOf(m)
  }
  const total = parse(end) - parse(start)
  const part = (n: number, unit: string) => (n ? `${n} ${unit}${n > 1 ? 's' : ''}` : '')
  return [part(Math.floor(total / 12), 'yr'), part(total % 12, 'mo')].filter(Boolean).join(' ')
}

const fromRole = (r: Role): CardData => ({
  key: r.company,
  logo: r.logo,
  links: [{ label: r.urlLabel, href: r.url, icon: 'external' }],
  title: r.title,
  subtitle: r.company,
  chips: [
    { label: `${r.start} – ${r.end}`, icon: 'calendar', accent: true },
    { label: tenure(r.start, r.end), icon: 'duration' },
    { label: r.location, icon: 'location' },
  ],
  context: r.context,
  intro: r.intro,
  introOutside: true,
  metrics: r.metrics,
  details: r.details,
  tags: r.tags,
})

const fromEducation = (e: Education): CardData => ({
  key: e.school,
  logo: e.logo,
  links: [{ label: e.urlLabel, href: e.url, icon: 'external' }],
  title: e.degree,
  subtitle: e.school,
  chips: [
    { label: `${e.start} – ${e.end}`, icon: 'calendar', accent: true },
    ...e.highlights.map((h) => ({ label: h, icon: 'award' as const, accent: true })),
    { label: e.location, icon: 'location' },
  ],
  intro: e.intro,
  list: { label: 'Relevant coursework', items: e.coursework },
})

const fromProject = (p: Project): CardData => ({
  key: p.name,
  anchor: projectAnchor(p.name),
  badge: p.kind,
  links: p.links?.filter((l) => !l.pending),
  title: p.name,
  subtitle: p.subtitle,
  chips: p.chips,
  context: p.hook,
  intro: p.intro,
  metrics: p.metrics,
  media: p.media,
  mediaLayout: p.mediaLayout,
  detailsLabel: p.detailsLabel,
  details: p.details,
  tags: p.tags,
})

function MetricValue({ metric }: { metric: Metric }) {
  if ('text' in metric) return <>{metric.text}</>
  const { to, decimals, suffix } = metric.count
  return <CountUp to={to} decimals={decimals} suffix={suffix} />
}

/* Panel opens to its natural height; its tiles then rise in one after another. */
const panel: Variants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.05, delayChildren: 0.12 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.55, ease: EASE } },
}
const tile: Variants = {
  open: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
  closed: { opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.2 } },
}
const instant: Variants = {
  open: { height: 'auto', opacity: 1, transition: { duration: 0 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0 } },
}

function Card({ data, index, node }: { data: CardData; index: number; node: boolean }) {
  const [open, setOpen] = useState(false)
  const [viewing, setViewing] = useState<number | null>(null)
  const reduce = useReducedMotion()
  const panelId = useId()
  const cardRef = useRef<HTMLDivElement>(null)
  const lit = useInView(cardRef, { once: true, margin: '0px 0px -35% 0px' })
  const tileVariants = reduce ? undefined : tile

  const collapseFromBottom = () => {
    setOpen(false)
    // The panel shrinks above the reader, so glide back to the card's top.
    if (cardRef.current) scrollToElement(cardRef.current)
  }

  return (
    <Reveal as="li" delay={index * 90} className="role-item">
      {node && <span className={lit ? 'role-node is-lit' : 'role-node'} aria-hidden="true" />}

      <div className="role-card" ref={cardRef} id={data.anchor}>
        <div className="logo-slot role-head">
          {data.logo ? (
            <LogoMark logo={data.logo} />
          ) : (
            data.badge && (
              <span className="kind-badge">
                <span className="icon-tile">
                  <Icon name={data.badge.icon} size={17} />
                </span>
                {data.badge.label}
              </span>
            )
          )}
          {data.links && (
            <span className="role-links">
              {data.links.map((l) => (
                <a
                  key={l.href}
                  className={l.icon !== 'external' ? 'role-link has-icon' : 'role-link'}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.icon !== 'external' && <Icon name={l.icon} />}
                  <span className="role-link-text">{l.label}</span>
                  <Icon name="external" className="link-ext" />
                  <span className="sr-only"> {data.title} (opens in a new tab)</span>
                </a>
              ))}
            </span>
          )}
        </div>

        <h3 className="role-title">{data.title}</h3>
        <p className="role-company">{data.subtitle}</p>

        <ul className="role-chips" aria-label="Details">
          {data.chips.map((c) => (
            <li key={c.label} className={c.accent ? 'chip chip-accent' : 'chip'}>
              <Icon name={c.icon} />
              {c.label}
            </li>
          ))}
        </ul>

        {data.context && <p className="role-context">{data.context}</p>}
        {/* With a breakdown, the long intro lives inside it so the card stays short. */}
        {data.intro && (!data.details || data.introOutside) && (
          <p className={data.context ? 'role-intro' : 'role-intro role-intro-solo'}>{data.intro}</p>
        )}

        {data.media && (
          <div
            className="card-media"
            data-count={data.media.length}
            data-layout={data.mediaLayout ?? 'grid'}
            // Grid: every frame takes the first image's shape so shots line up. Stack: each keeps its own.
            style={{ '--ar': `${data.media[0].width} / ${data.media[0].height}` } as CSSProperties}
          >
            {data.media.map((m, mi) => (
              <figure
                key={m.src}
                className={m.kind === 'chart' ? 'is-chart' : undefined}
                style={
                  data.mediaLayout === 'stack' || data.media!.length === 1
                    ? ({ '--ar': `${m.width} / ${m.height}` } as CSSProperties)
                    : undefined
                }
              >
                <button type="button" className="media-frame media-open" onClick={() => setViewing(mi)} aria-label={`View larger: ${m.alt}`}>
                  <img className="lqip" style={lqip(m.src)} src={m.src} alt="" width={m.width} height={m.height} loading="lazy" decoding="async" />
                  <span className="media-zoom" aria-hidden="true">
                    <Icon name="expand" />
                  </span>
                </button>
                {m.caption && <figcaption>{m.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {data.media && (
          <Lightbox
            shots={data.media.map((m) => ({ ...m, chart: m.kind === 'chart' }))}
            index={viewing}
            onIndex={setViewing}
          />
        )}

        {data.metrics && (
          <ul className="metric-tiles" aria-label="Impact" data-count={data.metrics.length}>
            {data.metrics.map((m) => (
              <li key={m.label}>
                <span className="metric-value">
                  <MetricValue metric={m} />
                </span>
                <span className="metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        {data.list && (
          <div className="card-list">
            <p className="card-list-label">{data.list.label}</p>
            <ul className="course-list">
              {data.list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {data.details && (
          <>
            <button
              type="button"
              className="role-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Hide details' : (data.detailsLabel ?? 'What I built')}</span>
              <span className="role-toggle-count">{data.details.length}</span>
              <Icon name="caret" className="chev" />
            </button>

            <motion.div
              id={panelId}
              className="role-details"
              initial={false}
              animate={open ? 'open' : 'closed'}
              variants={reduce ? instant : panel}
              inert={!open}
            >
              {data.intro && !data.introOutside && (
                <motion.p className="detail-intro" variants={tileVariants}>
                  {data.intro}
                </motion.p>
              )}
              <dl className="detail-tiles">
                {data.details.map((d) => (
                  <motion.div key={d.heading} className="detail-tile" variants={tileVariants}>
                    <dt>
                      <span className="icon-tile">
                        <Icon name={d.icon} size={17} />
                      </span>
                      {d.heading}
                    </dt>
                    <dd>{d.body}</dd>
                  </motion.div>
                ))}
              </dl>
              {data.tags && (
                <motion.ul className="tags role-tags" aria-label="Skills used" variants={tileVariants}>
                  {data.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </motion.ul>
              )}
              <motion.div variants={tileVariants}>
                <button type="button" className="role-toggle role-toggle-end" onClick={collapseFromBottom}>
                  <span>Hide details</span>
                  <Icon name="caret" className="chev up" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </Reveal>
  )
}

/** Cards on a rail that fills as you read down (or a plain stack, for non-chronological lists). */
function CardTimeline({ items, rail = true }: { items: CardData[]; rail?: boolean }) {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <div className={rail ? 'experience' : 'experience no-rail'}>
      {rail && (
        <div className="exp-rail" aria-hidden="true">
          <motion.div className="exp-rail-fill" style={{ scaleY: reduce ? 1 : fill }} />
        </div>
      )}
      <ol className="roles" ref={listRef}>
        {items.map((d, i) => (
          <Card key={d.key} data={d} index={i} node={rail} />
        ))}
      </ol>
    </div>
  )
}

export function Experience({ roles }: { roles: Role[] }) {
  return <CardTimeline items={roles.map(fromRole)} />
}

export function EducationList({ entries }: { entries: Education[] }) {
  return <CardTimeline items={entries.map(fromEducation)} />
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return <CardTimeline items={projects.map(fromProject)} rail={false} />
}
