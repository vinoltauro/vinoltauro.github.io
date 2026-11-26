import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type Shot = { src: string; alt: string; width: number; height: number; caption?: string; chart?: boolean }

type Props = { shots: Shot[]; index: number | null; onIndex: (i: number | null) => void }

/**
 * Minimal image viewer on the native <dialog>: Esc, a click outside or × closes it; ← → step
 * through the shots of the same project. The browser handles focus trapping and restoring.
 */
export function Lightbox({ shots, index, onIndex }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && index! < shots.length - 1) onIndex(index! + 1)
      if (e.key === 'ArrowLeft' && index! > 0) onIndex(index! - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, shots.length, onIndex])

  const shot = index !== null ? shots[index] : null
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Image viewer"
      onClose={() => onIndex(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onIndex(null) // click on the backdrop
      }}
    >
      {shot && (
        <figure className="lightbox-figure">
          <div className={shot.chart ? 'lightbox-frame is-chart' : 'lightbox-frame'}>
            <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
          </div>
          <figcaption>
            <span>{shot.caption ?? shot.alt}</span>
            {shots.length > 1 && (
              <span className="lightbox-count">
                {index! + 1} / {shots.length}
              </span>
            )}
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox-close" onClick={() => onIndex(null)} aria-label="Close">
        ×
      </button>
      {shots.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => onIndex(index! - 1)}
            disabled={index === 0}
            aria-label="Previous image"
          >
            <Icon name="caret" className="arrow-prev" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => onIndex(index! + 1)}
            disabled={index === shots.length - 1}
            aria-label="Next image"
          >
            <Icon name="caret" className="arrow-next" />
          </button>
        </>
      )}
    </dialog>
  )
}
