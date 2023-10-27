import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { FiLoader } from 'solid-icons/fi'
import { basicButtonStyles } from './styles'

type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element
  iconLeft?: JSX.Element
  iconOnly?: boolean
  isLoading?: boolean
  label?: string
}

const BasicButton: Component<Props> = (props) => {
  const [{ icon, iconLeft, iconOnly = false, isLoading = false, label }, others] = splitProps(
    props,
    ['icon', 'iconLeft', 'iconOnly', 'isLoading', 'label']
  )

  if (iconOnly) {
    return <button>{icon}</button>
  }

  return (
    <button
      class={basicButtonStyles({
        sizes: 'lg',
        variant: 'primary',
      })}
      {...others}
    >
      {iconLeft && iconLeft}
      {label && <span>{label}</span>}
      {isLoading && <FiLoader />}
    </button>
  )
}

export default BasicButton
