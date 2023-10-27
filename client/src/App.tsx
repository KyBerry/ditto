import type { Component } from 'solid-js'
import { BasicButton, Form } from '@/components'
import { globalResetStyles } from '@/styles/reset'

const App: Component = () => {
  return (
    <>
      {globalResetStyles()}
      <div>
        <h1>Hello from SolidJS!!</h1>
        <BasicButton label="This is a button" isLoading />
        <Form.Root defaultValues={{ name: '' }}>
          <h2>Hey</h2>
        </Form.Root>
      </div>
    </>
  )
}

export default App
