import type { Achievement } from '../content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

/** Competitive programming results and teaching: a compact strip of headline tiles. */
export function Achievements({ items }: { items: Achievement[] }) {
  return (
    <div className="achievements">
      <Reveal as="p" className="card-list-label achievements-label">
        Competitive programming & teaching
      </Reveal>
      <ul className="achievement-tiles">
        {items.map((a, i) => (
          <Reveal as="li" key={a.label} delay={i * 80}>
            <Icon name={a.icon} size={18} className="achievement-icon" />
            <span className="metric-value">{a.value}</span>
            <span className="metric-label">{a.label}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
