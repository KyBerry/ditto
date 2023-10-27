import type { Component, JSX } from 'solid-js'
import { createContext, splitProps, useContext } from 'solid-js'

export type FormContextValues = {
  defaultValues: { [key: string]: any }
}

export type FormProps = JSX.FormHTMLAttributes<HTMLFormElement> & {
  defaultValues: { [key: string]: any }
}

export type FieldProps = {
  children?: JSX.Element | Array<JSX.Element>
}

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>

export const FormContext = createContext<FormContextValues | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('Component must me used inside of Form component')
  }

  return context
}

const Root: Component<FormProps> = (props) => {
  const [{ defaultValues }, formProps] = splitProps(props, ['defaultValues'])
  return (
    <FormContext.Provider value={{ defaultValues }}>
      <form {...formProps} />
    </FormContext.Provider>
  )
}

const Field: Component<FieldProps> = (props) => {
  return <div>{props.children}</div>
}

const Label: Component<LabelProps> = (props) => {
  return <label {...props}>{props.children}</label>
}

export default {
  Root,
  Field,
  Label,
}
