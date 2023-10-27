import { globalCss } from '@/styles/stitches.config'

export const globalResetStyles = globalCss({
  '@font-face': {
    fontFamily: 'Raleway',
    src: 'url("@/assets/fonts/Raleway.ttf") format("truetype")',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  '*, *::before, *::after': {
    padding: 0,
    margin: 0,
    boxSizing: 'inherit',
  },
  'html, body': {
    height: '100vh',
  },
  html: {
    boxSizing: 'border-box',
    fontFamily: '$sans',
    lineHeight: '$base',
  },
  h1: {
    fontWeight: '$light',
  },
})
