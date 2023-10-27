import type { ParentProps } from 'solid-js'
import type { ThemeContextValue } from '@/contexts'
import type { AppTheme } from '@/styles/utils/colorMode'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { ThemeContext } from '@/contexts'
import { globalResetStyles } from '@/styles/reset'
import {
  extendBaseTheme,
  getDefaultTheme,
  setThemeInStorage,
  toggleThemeClassName,
} from '@/styles/utils/colorMode'

export type ThemeConfig = {
  initialTheme?: AppTheme
  lightTheme?: any
  darkTheme?: any
}

export type ThemeProviderProps = ParentProps<{
  config?: ThemeConfig
  enableCssReset?: boolean
}>

const ThemeProvider = (props: ThemeProviderProps) => {
  const defaultProps: ThemeProviderProps = {
    enableCssReset: true,
  }

  props = mergeProps(defaultProps, props)

  const lightTheme = extendBaseTheme('light', props.config?.lightTheme ?? {})
  const darkTheme = extendBaseTheme('dark', props.config?.darkTheme ?? {})

  const themeFromStorage = getDefaultTheme(props.config?.initialTheme ?? 'dark')
  const themeConfig = themeFromStorage === 'light' ? lightTheme : darkTheme

  const [savedTheme, setSavedTheme] = createSignal(themeFromStorage)
  const [theme, setTheme] = createSignal(themeConfig)

  const isDarkTheme = () => savedTheme() === 'dark'

  const updateSavedTheme = (theme: AppTheme) => {
    setSavedTheme(theme)
    setThemeInStorage(theme)
  }

  const toggleTheme = () => {
    updateSavedTheme(isDarkTheme() ? 'light' : 'dark')
  }

  const context: ThemeContextValue = {
    theme,
    savedTheme,
    updateSavedTheme,
    toggleTheme,
  }

  createEffect(() => {
    setTheme(isDarkTheme() ? darkTheme : lightTheme)
    toggleThemeClassName(isDarkTheme())
  })

  if (props.enableCssReset) {
    globalResetStyles()
  }

  return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>
}

export default ThemeProvider
