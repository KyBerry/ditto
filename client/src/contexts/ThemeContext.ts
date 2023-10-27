import type { Accessor } from 'solid-js'
import { createContext } from 'solid-js'
import type { AppTheme } from '@/styles/utils/colorMode'

export type ThemeConfig = {
  initialTheme?: AppTheme
  lightTheme?: any
  darkTheme?: any
}

export type ThemeContextValue = {
  theme: any
  savedTheme: Accessor<AppTheme>
  updateSavedTheme: (value: AppTheme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
