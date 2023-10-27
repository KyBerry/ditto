import { css } from '@/styles/stitches.config'

export const basicButtonStyles = css({
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '$2',
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary-400',
        color: '$neutral-25',
      },
      secondary: {},
      ghost: {},
      danger: {},
    },
    sizes: {
      xs: {
        padding: '$1 $2',
        borderRadius: '$sm',
      },
      sm: {
        padding: '$1 $2',
        borderRadius: '$sm',
      },
      base: {
        padding: '$1_5 $2_5',
        borderRadius: '$sm',
      },
      md: {
        padding: '$2 $3',
        borderRadius: '$md',
      },
      lg: {
        padding: '$2_5 $3_5',
        borderRadius: '$md',
      },
    },
  },
})
