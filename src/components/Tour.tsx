import React, { useEffect, useLayoutEffect, useState } from 'react'

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

export const Tour: React.FC<TourProps> = ({ steps, isOpen, onClose }) => {
  const [current, setCurrent] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const active = steps[current]

  const calcRect = () => {
    if (!isOpen) return setRect(null)
    const el = document.querySelector<HTMLElement>(
      `[data-tour-id="${active.id}"]`
    )
    setRect(el ? el.getBoundingClientRect() : null)
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

  // Defaults if element missing
  const top = (rect?.bottom ?? 80) + 8
  const left = rect
    ? Math.min(Math.max(rect.left, 12), window.innerWidth - 300)
    : 12

  return (
    <div className='fixed inset-0 z-[1000] pointer-events-none'>
      {/* Dimmer */}
      <div className='absolute inset-0 bg-black/40'></div>

      {/* Beacon (pin) */}
      {rect && (
        <div
          className='absolute -translate-x-1/2 -translate-y-1/2'
          style={{ top: rect.top, left: rect.left + rect.width / 2 }}
        >
          <div className='relative'>
            <span className='block w-3 h-3 bg-green-500 rounded-full animate-ping'></span>
            <span className='absolute inset-0 m-auto w-3 h-3 bg-green-500 rounded-full shadow'></span>
          </div>
        </div>
      )}

      {/* Tooltip card */}
      <div
        className='absolute max-w-xs md:max-w-sm bg-white rounded-lg shadow-xl border border-amber-200 p-4 pointer-events-auto'
        style={{ top, left }}
      >
        <div className='text-xs text-gray-500 mb-1'>
          Step {current + 1} of {steps.length}
        </div>
        <div className='text-amber-900 font-semibold mb-1'>{active.title}</div>
        <div className='text-gray-700 text-sm mb-3'>{active.text}</div>
        <div className='flex gap-2 justify-end'>
          <button
            onClick={onClose}
            className='px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50'
          >
            Skip
          </button>
          <button
            onClick={prev}
            disabled={current === 0}
            className={`px-2 py-1 text-sm rounded border ${
              current === 0
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Back
          </button>
          <button
            onClick={next}
            className='px-2 py-1 text-sm rounded bg-amber-600 text-white hover:bg-amber-700'
          >
            {current === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
