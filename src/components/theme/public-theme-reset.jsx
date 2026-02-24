import { useEffect } from 'react'

export const PublicThemeReset = () => {
  useEffect(() => {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'

    return () => {
      document.documentElement.style.colorScheme = ''
    }
  }, [])

  return null
}
