import { css } from '@/styles/stitches.config'

export const formRootStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const formFieldStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '$0_5',
  width: 'fit-content',
  variants: {},
})

export const formLabelStyles = css({
  color: '$neutral-900',
  fontSize: '$lg',
  fontWeight: '$medium',
})

export const formInputStyles = css({
  border: 'none',
  borderRadius: '$sm',
  width: '350px',
  height: '40px',
  padding: '$4',
  backgroundColor: '$bg-300',
  fontSize: '$lg',
  color: '$neutral-900',
  '&::placeholder': {
    color: '$neutral-900',
  },
})

export const formActionStyles = css({
  display: 'flex',
  justifyContent: 'flex-end',
})
