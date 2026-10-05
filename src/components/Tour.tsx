import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Step = {
  id: string
  title: string
  text: string
}

interface TourProps {
  steps: Step[]
  isOpen: boolean
  onClose: () => void
}

const MARGIN = 12
const GAP = 10

export const Tour: React.FC<TourProps> = ({ steps, isOpen, onClose }) => {
  const [current, setCurrent] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [pos, setPos] = useState({ top: 80, left: 12 })
  const cardRef = useRef<HTMLDivElement | null>(null)

  const active = steps[current]

  const calcRect = () => {
    if (!isOpen) return setRect(null)
    // Some targets exist twice (desktop toolbar + mobile action bar); use
    // whichever copy is actually visible at the current viewport width.
    const candidates = document.querySelectorAll<HTMLElement>(
      `[data-tour-id="${active.id}"]`
    )
    let found: DOMRect | null = null
    candidates.forEach((el) => {
      if (found) return
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) found = r
    })
    setRect(found)
  }

  useLayoutEffect(() => {
    calcRect()
    // Reposition on resize/scroll
    const onWin = () => calcRect()
    window.addEventListener('resize', onWin)
    window.addEventListener('scroll', onWin, true)
    return () => {
      window.removeEventListener('resize', onWin)
      window.removeEventListener('scroll', onWin, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, current])

  // Place the card wherever it actually fits: below the target by default,
  // flipped above it when the target sits too close to the bottom edge
  // (e.g. the mobile action bar), then clamped inside the viewport.
  useLayoutEffect(() => {
    if (!isOpen || !active) return
    const card = cardRef.current
    const cw = card?.offsetWidth ?? 300
    const ch = card?.offsetHeight ?? 160

    let top: number
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      top =
        spaceBelow >= ch + GAP || spaceBelow >= spaceAbove
          ? rect.bottom + GAP
          : rect.top - ch - GAP
    } else {
      top = 80
    }
    top = Math.min(Math.max(top, MARGIN), window.innerHeight - ch - MARGIN)

    let left = rect ? rect.left + rect.width / 2 - cw / 2 : MARGIN
    left = Math.min(Math.max(left, MARGIN), window.innerWidth - cw - MARGIN)

    setPos({ top, left })
  }, [rect, isOpen, active])

  useEffect(() => {
    if (!isOpen) setCurrent(0)
  }, [isOpen])

  if (!isOpen || !active) return null

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent((v) => v + 1)
    } else {
      onClose()
    }
  }

  const prev = () => setCurrent((v) => Math.max(0, v - 1))

  return (
    <div className='fixed inset-0 z-[1000] pointer-events-none'>
      {/* Dimmer */}
      <div className='absolute inset-0 bg-ink-900/50'></div>

      {/* Beacon (pin) */}
      {rect && (
        <div
          className='absolute -translate-x-1/2 -translate-y-1/2'
          style={{ top: rect.top, left: rect.left + rect.width / 2 }}
        >
          <div className='relative'>
            <span className='block w-3 h-3 bg-gold-300 rounded-full animate-ping'></span>
            <span className='absolute inset-0 m-auto w-3 h-3 bg-gold-500 rounded-full shadow'></span>
          </div>
        </div>
      )}

      {/* Tooltip card */}
      <div
        ref={cardRef}
        className='absolute max-w-xs md:max-w-sm bg-white rounded-xl shadow-panel-lg border border-cream-200 p-4 pointer-events-auto'
        style={{ top: pos.top, left: pos.left }}
      >
        <div className='text-xs text-ink-500 mb-1'>
          Step {current + 1} of {steps.length}
        </div>
        <div className='text-brand-900 font-semibold mb-1'>{active.title}</div>
        <div className='text-ink-700 text-sm mb-3'>{active.text}</div>
        <div className='flex gap-2 justify-end'>
          <button
            onClick={onClose}
            className='px-2.5 py-1.5 text-sm rounded-lg border border-cream-200 hover:bg-cream-50 transition duration-150 ease-out active:scale-[0.97]'
          >
            Skip
          </button>
          <button
            onClick={prev}
            disabled={current === 0}
            className={`px-2.5 py-1.5 text-sm rounded-lg border transition duration-150 ease-out ${
              current === 0
                ? 'text-ink-500/50 border-cream-200 cursor-not-allowed'
                : 'border-cream-200 hover:bg-cream-50 active:scale-[0.97]'
            }`}
          >
            Back
          </button>
          <button
            onClick={next}
            className='px-2.5 py-1.5 text-sm rounded-lg bg-brand-700 text-white hover:bg-brand-800 transition duration-150 ease-out active:scale-[0.97]'
          >
            {current === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
