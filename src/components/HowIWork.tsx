import type { Chapter } from '../content'
import { Reveal } from './Reveal'

/**
 * The three hero words, earned in one compact section: a row per word with its one-line stance
 * and the story behind it. Each row keeps its own anchor, so the hero words still jump to it.
 */
export function HowIWork({ chapters }: { chapters: Chapter[] }) {
  return (
    <ol className="how">
      {chapters.map((c, i) => (
        <Reveal as="li" key={c.id} delay={i * 80} className="how-row">
          <div className="how-word" id={c.id} tabIndex={-1}>
            <span className="how-num">{c.num}</span>
            <span className="how-term">{c.word}</span>
          </div>
          <div className="how-text">
            <h3 className="how-opener">{c.opener}</h3>
            <p className="how-lead">{c.lead}</p>
            <p className="how-aside">{c.muted}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
