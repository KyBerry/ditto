import { useContext } from 'solid-js'
import { ThemeContext } from '@/contexts'

export const useThemeToggle = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('[Ditto UI]: useThemeToggle must be used within a ThemeProvider')
  }

  const { savedTheme, toggleTheme, updateSavedTheme } = context

  return {
    savedTheme,
    updateSavedTheme,
    toggleTheme,
  }
}
