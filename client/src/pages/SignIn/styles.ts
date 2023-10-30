import { css } from '@/styles/stitches.config'

export const signInStyles = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const signInTitleStyles = css({
  fontSize: '$4xl',
  fontWeight: '$bold',
  color: '$neutral-900',
  marginBottom: '$8',
})

export const signInFormStyles = css({
  width: 'fit-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$bg-100',
  padding: '$6',
  borderRadius: '$lg',
})
