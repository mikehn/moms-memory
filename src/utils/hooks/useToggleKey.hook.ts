import { useState, useEffect, useCallback } from 'react'

interface UseToggleKeyOptions {
  key: string
  ctrl?: boolean
  shift?: boolean
}

export function useToggleKey({
  key,
  ctrl = false,
  shift = false
}: UseToggleKeyOptions): boolean {
  const [toggled, setToggled] = useState(false)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!key || !event.key) return false
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift
      ) {
        setToggled((prev) => !prev)
      }
    },
    [key, ctrl, shift]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return toggled
}
