import { useContext } from 'solid-js'
import { ThemeContext } from '@/contexts'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('[Ditto UI]: useTheme must be used within a ThemeProvider')
  }

  return context.theme
}
