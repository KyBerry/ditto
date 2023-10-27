import { createStitches } from '@stitches/core'
import { baseThemeTokens } from './tokens'

export const {
  theme: baseTheme,
  createTheme,
  css,
  globalCss,
} = createStitches({
  theme: baseThemeTokens,
})
