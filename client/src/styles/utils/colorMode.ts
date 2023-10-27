import merge from 'lodash.merge'
import { baseDarkThemeTokens } from '@/styles/tokens'
import { baseTheme, createTheme } from '@/styles/stitches.config'

export type AppTheme = 'dark' | 'light' | 'system'

export const THEME_STORAGE_KEY = 'ditto-ui-theme' as const

export const themeClassNames = {
  light: 'ditto-ui-light',
  dark: 'ditto-ui-dark',
} as const

export const getThemeFromLocalStorage = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) as AppTheme | null
}

export const setThemeInStorage = (theme: AppTheme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export const getDefaultTheme = (fallback: AppTheme): AppTheme => {
  const preferredTheme = getThemeFromLocalStorage()

  if (preferredTheme) return preferredTheme

  if (fallback === 'system') {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return isSystemDark ? 'dark' : 'light'
  } else {
    return fallback
  }
}

export const toggleThemeClassName = (isDark: boolean) => {
  const body = document.body

  body.classList.add(isDark ? themeClassNames.dark : themeClassNames.light)
  body.classList.remove(isDark ? themeClassNames.light : themeClassNames.dark)
}

export const extendBaseTheme = (type: 'dark' | 'light', themeConfig: any) => {
  const isDark = type === 'dark'
  const className = isDark ? themeClassNames.dark : themeClassNames.light

  const extendedTheme = isDark ? merge({}, baseDarkThemeTokens, themeConfig) : themeConfig
  const darkTheme = createTheme(className, extendedTheme)

  return merge({}, baseTheme, darkTheme)
}
