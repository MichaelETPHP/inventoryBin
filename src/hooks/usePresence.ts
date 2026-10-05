import { useEffect, useState } from 'react'

/**
 * Keeps a component mounted for `duration` after `isOpen` goes false,
 * so its exit CSS transition (driven by data-state) can finish playing
 * instead of the element vanishing instantly.
 */
export function usePresence(isOpen: boolean, duration = 260) {
  const [mounted, setMounted] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      return
    }
    const timeout = setTimeout(() => setMounted(false), duration)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return mounted
}
