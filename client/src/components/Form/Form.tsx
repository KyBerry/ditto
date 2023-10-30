import type { Component, JSX, ParentComponent } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import { createContext, createEffect, splitProps, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import {
  formRootStyles,
  formFieldStyles,
  formInputStyles,
  formLabelStyles,
  formActionStyles,
} from './styles'

export type FormContextValues = {
  formValues: { [key: string]: any }
  setFormValues: SetStoreFunction<{
    [key: string]: any
  }>
}

export type FormRootProps = JSX.FormHTMLAttributes<HTMLFormElement> & {
  defaultValues: { [key: string]: any }
}

export type FieldProps = {
  children?: JSX.Element | Array<JSX.Element>
}

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

export const FormContext = createContext<FormContextValues | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('Component must me used inside of Form component')
  }

  return context
}

const Root: Component<FormRootProps> = (props) => {
  const [{ defaultValues }, formProps] = splitProps(props, ['defaultValues'])
  const [formValues, setFormValues] = createStore(defaultValues)

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form class={formRootStyles()} {...formProps} />
    </FormContext.Provider>
  )
}

const Field: Component<FieldProps> = (props) => {
  return <div class={formFieldStyles()}>{props.children}</div>
}

const Label: Component<LabelProps> = (props) => {
  return (
    <label class={formLabelStyles()} {...props}>
      {props.children}
    </label>
  )
}

const Input: Component<InputProps> = (props) => {
  const [{ name }, other] = splitProps(props, ['name'])
  const { formValues, setFormValues } = useFormContext()

  createEffect(() => {
    console.log(formValues[name])
  })

  return (
    <input
      {...other}
      class={formInputStyles()}
      value={formValues[name]}
      onInput={(e) => setFormValues({ [name]: e.target.value })}
    />
  )
}

const Action: ParentComponent = (props) => {
  return <div class={formActionStyles()}>{props.children}</div>
}

export default {
  Root,
  Field,
  Label,
  Input,
  Action,
}
