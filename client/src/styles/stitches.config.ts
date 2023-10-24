import { createStitches } from '@stitches/core'
import { baseThemeTokens } from './tokens'

export const { css, globalCss } = createStitches({
  theme: baseThemeTokens,
})
