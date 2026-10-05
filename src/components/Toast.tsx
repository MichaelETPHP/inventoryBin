import React, { useEffect, useState } from 'react'

interface ToastProps {
  toast: { id: number; message: string } | null
}

const VISIBLE_MS = 2200
const EXIT_MS = 220

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!toast) return
    setMounted(true)
    const raf = requestAnimationFrame(() => setOpen(true))
    const hide = setTimeout(() => setOpen(false), VISIBLE_MS)
    const unmount = setTimeout(() => setMounted(false), VISIBLE_MS + EXIT_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hide)
      clearTimeout(unmount)
    }
  }, [toast])

  if (!mounted || !toast) return null

  return (
    <div
      className='fixed inset-x-0 bottom-24 sm:bottom-6 z-[60] flex justify-center pointer-events-none print:hidden'
      aria-live='polite'
    >
      <div
        data-state={open ? 'open' : 'closed'}
        className='flex items-center gap-2.5 bg-white border border-cream-200 shadow-panel-lg rounded-full pl-3 pr-4 py-2 translate-y-2 opacity-0 transition-[transform,opacity] duration-200 ease-out-strong data-[state=open]:translate-y-0 data-[state=open]:opacity-100'
      >
        <span className='relative flex w-2 h-2 flex-shrink-0'>
          <span className='absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping' />
          <span className='relative inline-flex w-2 h-2 rounded-full bg-emerald-500' />
        </span>
        <span className='text-sm font-medium text-emerald-700'>{toast.message}</span>
      </div>
    </div>
  )
}
