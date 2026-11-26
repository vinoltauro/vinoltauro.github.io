import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import { Reveal } from './Reveal'

type Arrows = { edge: { start: boolean; end: boolean }; page: (dir: 1 | -1) => void; label: string }

type Props = {
  icon: IconName
  /** Mono label in the header strip, e.g. "Food passport". */
  label: string
  /** Right side of the header strip, e.g. "Dublin · 11 shots". */
  meta?: ReactNode
  title: string
  body: ReactNode
  /** Visual on the right (fan, stamps). Without one, the text spans the card. */
  visual?: ReactNode
  /** Footer strip: a short note, plus arrows for the photo row that follows. */
  foot?: { note: ReactNode; arrows?: Arrows }
}

/** One card shape for every feature in Outside of work, so the section reads as a set. */
export function FeatureCard({ icon, label, meta, title, body, visual, foot }: Props) {
  return (
    <Reveal className="feature-card">
      <div className="card-strip">
        <span>
          <Icon name={icon} /> {label}
        </span>
        {meta && <span className="card-strip-meta">{meta}</span>}
      </div>
      <div className={visual ? 'feature-body has-visual' : 'feature-body'}>
        <div className="feature-text">
          <h3 className="life-title">{title}</h3>
          <div className="life-body">{body}</div>
        </div>
        {visual}
      </div>
      {foot && (
        <div className="card-strip card-strip-foot">
          <span>{foot.note}</span>
          {foot.arrows && (
            <div className="film-arrows">
              <button
                type="button"
                onClick={() => foot.arrows!.page(-1)}
                disabled={foot.arrows.edge.start}
                aria-label={`Previous: ${foot.arrows.label}`}
              >
                <Icon name="caret" className="arrow-prev" />
              </button>
              <button
                type="button"
                onClick={() => foot.arrows!.page(1)}
                disabled={foot.arrows.edge.end}
                aria-label={`Next: ${foot.arrows.label}`}
              >
                <Icon name="caret" className="arrow-next" />
              </button>
            </div>
          )}
        </div>
      )}
    </Reveal>
  )
}
