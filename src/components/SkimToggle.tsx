import { setSkim, useSkim } from '../lib/skim'

/** On/off switch for skim mode. `long` shows the friendlier "In a hurry?" label. */
export function SkimToggle({ long = false }: { long?: boolean }) {
  const on = useSkim()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={long ? 'skim-toggle skim-long' : 'skim-toggle'}
      onClick={() => setSkim(!on)}
      title="Skim mode: hide the long-form detail"
    >
      <span className="skim-label">{long ? 'In a hurry? Skim mode' : 'Skim'}</span>
      <span className="skim-switch" aria-hidden="true">
        <span />
      </span>
    </button>
  )
}
