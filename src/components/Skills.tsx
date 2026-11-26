import { useState } from 'react'
import type { SkillRow } from '../content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

/** Rows shown before "Show all". The rest stay in the HTML (for search and no-JS), just hidden. */
const VISIBLE = 6

export function Skills({ rows }: { rows: SkillRow[] }) {
  const [all, setAll] = useState(false)
  return (
    <>
      <dl className={all ? 'skills is-all' : 'skills'}>
        {rows.map((r, i) => (
          <Reveal key={r.label} delay={Math.min(i, 4) * 60} className={i >= VISIBLE ? 'skills-row is-extra' : 'skills-row'}>
            <dt>
              <span className="icon-tile">
                <Icon name={r.icon} size={17} />
              </span>
              {r.label}
            </dt>
            <dd>
              <ul className="skill-chips">
                {r.items.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
      {rows.length > VISIBLE && (
        <button type="button" className="show-more" aria-expanded={all} onClick={() => setAll((a) => !a)}>
          {all ? 'Show fewer' : `Show all ${rows.length}`}
          <Icon name="caret" className={all ? 'chev up' : 'chev'} />
        </button>
      )}
    </>
  )
}
