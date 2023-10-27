import type { Component } from 'solid-js'
import { css } from '@/styles/stitches.config'
import { BasicButton, Form, Navbar, ThemeProvider } from '@/components'

const App: Component = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <h1>Hello from SolidJS!!</h1>
        <BasicButton label="This is a button" isLoading />
        <Form.Root defaultValues={{ name: '' }}>
          <h2>Hey</h2>
        </Form.Root>
        <div
          class={css({ background: '$neutral-100' })()}
          style={{ width: '100px', height: '100px' }}
        ></div>
      </div>
    </ThemeProvider>
  )
}

export default App
