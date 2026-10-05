import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Info } from 'lucide-react'
import { usePresence } from '../hooks/usePresence'

interface HelpPopoverProps {
  onOpenTour: () => void
  /** 'icon': small circular header trigger. 'tab': bottom-nav tab trigger. */
  variant?: 'icon' | 'tab'
}

const MARGIN = 16

export const HelpPopover: React.FC<HelpPopoverProps> = ({
  onOpenTour,
  variant = 'icon',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const mounted = usePresence(isOpen, 160)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const [placement, setPlacement] = useState<'below' | 'above'>('below')
  const panelId = `help-popover-${useId()}`

  // Position as a fixed-viewport coordinate, clamped inside the screen —
  // a header-adjacent trigger can sit close enough to the right edge on
  // narrow phones that a CSS-only left/right anchor would clip the panel.
  // The bottom-nav trigger also has no room below it, so flip above when
  // there isn't enough space (same flip-to-fit idea as the Tour tooltip).
  useLayoutEffect(() => {
    if (!mounted || !triggerRef.current) return
    const place = () => {
      const trigger = triggerRef.current
      if (!trigger) return
      const btnRect = trigger.getBoundingClientRect()
      const panelWidth = panelRef.current?.offsetWidth ?? 320
      const panelHeight = panelRef.current?.offsetHeight ?? 260

      const spaceBelow = window.innerHeight - btnRect.bottom
      const spaceAbove = btnRect.top
      const openAbove = spaceBelow < panelHeight + MARGIN && spaceAbove > spaceBelow

      const left = Math.min(
        Math.max(btnRect.left, MARGIN),
        window.innerWidth - panelWidth - MARGIN
      )
      const top = openAbove
        ? btnRect.top - panelHeight - 8
        : btnRect.bottom + 8

      setPlacement(openAbove ? 'above' : 'below')
      setCoords({ top, left })
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [mounted])

  useEffect(() => {
    if (!isOpen) return
    const handlePointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return
      }
      setIsOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('pointerdown', handlePointer)
    window.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  return (
    <>
      {variant === 'tab' ? (
        <button
          ref={triggerRef}
          type='button'
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup='dialog'
          aria-controls={panelId}
          aria-label='Help'
          className='col-span-1 flex flex-col items-center justify-center gap-1 h-full text-ink-700 active:scale-[0.95] transition duration-150 ease-out'
        >
          <Info className='w-5 h-5' />
          <span className='text-[10px] font-medium tracking-wide'>Help</span>
        </button>
      ) : (
        <button
          ref={triggerRef}
          type='button'
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup='dialog'
          aria-controls={panelId}
          aria-label='Help'
          className='w-7 h-7 flex items-center justify-center rounded-full text-ink-500 hover:text-brand-700 hover:bg-cream-100 transition duration-150 ease-out active:scale-[0.92]'
        >
          <Info className='w-[18px] h-[18px]' />
        </button>
      )}

      {mounted &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            data-state={isOpen ? 'open' : 'closed'}
            role='dialog'
            aria-label='Help'
            style={{ top: coords.top, left: coords.left }}
            className={`fixed w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-panel-lg border border-cream-200 p-5 opacity-0 scale-95 transition-[transform,opacity] duration-150 ease-out-strong data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=open]:translate-y-0 z-50 ${
              placement === 'above'
                ? 'origin-bottom-left translate-y-1'
                : 'origin-top-left -translate-y-1'
            }`}
          >
            <h2 className='font-display text-base font-semibold text-brand-900 mb-2'>
              Help
            </h2>
            <p className='text-sm text-ink-700 mb-3'>How to use the application:</p>
            <ol className='list-decimal pl-5 space-y-1.5 text-sm text-ink-700'>
              <li>
                Click <span className='font-medium'>Connect to Server</span> and
                create/select a JSON file named after your company, e.g.{' '}
                <span className='font-mono text-xs'>companyName.json</span>.
              </li>
              <li>
                After connecting, click{' '}
                <span className='font-medium'>Add Row</span> and enter your
                inventory details.
              </li>
              <li>
                Your data is saved automatically to the connected file as you
                make changes.
              </li>
            </ol>
            <button
              onClick={() => {
                setIsOpen(false)
                onOpenTour()
              }}
              className='mt-4 w-full px-3.5 py-2 rounded-lg bg-brand-700 text-white hover:bg-brand-800 transition duration-150 ease-out active:scale-[0.97] text-sm font-medium'
            >
              View Quick Tour
            </button>
          </div>,
          document.body
        )}
    </>
  )
}
