import type { CSSProperties } from 'react'
import { site } from '../content'
import { FeatureCard } from './FeatureCard'
import { Flag, type FlagCode } from './Flag'
import { DriftRow } from './Gallery'
import { lqip } from '../lib/lqip'

/* Hand-set tilts, so the prints look placed by hand rather than random each render. */
const PRINT_TILT = [-2.6, 1.8, -1.2, 2.4, -2, 1.4, -2.8, 2.1, -1.6, 2.6, -1.9]

type Dish = { src: string; width: number; height: number; label: string; tag: string; alt: string; flag?: FlagCode }

/** Eating out in Dublin: the cuisines (flags), then a row of the dishes. */
export function FoodPassport() {
  const e = site.eatingOut
  const dishes = e.photos as Dish[]

  return (
    <div className="feature">
      <FeatureCard
        icon="food"
        label="Food"
        meta="Dublin · IE"
        title={e.title}
        body={
          <>
            <p>{e.body}</p>
            <ul className="cuisines" aria-label="Cuisines I’ve tried">
              {e.cuisines.map((c) => (
                <li key={c.name}>
                  <Flag code={c.flag} />
                  {c.name}
                </li>
              ))}
            </ul>
          </>
        }
        foot={{ note: 'A few favourites · many more eaten' }}
      />

      <DriftRow label="Dishes from around Dublin">
        {dishes.map((ph, i) => (
          <figure key={ph.src} className="print print-tilted" style={{ '--rot': `${PRINT_TILT[i % PRINT_TILT.length]}deg` } as CSSProperties}>
            <img className="lqip" style={lqip(ph.src)} src={ph.src} alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" decoding="async" />
            <figcaption>
              <span className="print-label">{ph.label}</span>
              <span className="print-tag">
                {ph.flag && <Flag code={ph.flag} />}
                {ph.tag}
              </span>
            </figcaption>
          </figure>
        ))}
      </DriftRow>
    </div>
  )
}
