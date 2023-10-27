import { darkColors, lightColors } from './colors'
import { radii } from './radii'
import { space } from './space'
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights } from './typography'

export const baseThemeTokens = {
  colors: {
    ...lightColors,
  },
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  space,
}

export const baseDarkThemeTokens = {
  colors: darkColors,
}
