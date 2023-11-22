import { useEffect, useState } from 'react'
import i18next from 'i18next'

const useDirection = () => {
  const [direction, setDirection] = useState<string>('ltr')

  useEffect(() => {
    const updateDirection = (language: string) => {
      const isRtl = language === 'he'
      const newDirection = isRtl ? 'rtl' : 'ltr'

      // Update HTML attributes
      document.documentElement.setAttribute('dir', newDirection)
      document.documentElement.setAttribute('lang', language)

      // Update state
      setDirection(newDirection)
    }

    // Set direction on initial load
    updateDirection(i18next.language)

    // Listen for language changes
    i18next.on('languageChanged', updateDirection)

    // Cleanup event listener on unmount
    return () => {
      i18next.off('languageChanged', updateDirection)
    }
  }, [])

  return direction
}

export default useDirection
