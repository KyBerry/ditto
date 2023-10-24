import type { Component } from 'solid-js'
import { globalResetStyles } from '@/styles/reset'

const App: Component = () => {
  return (
    <>
      {globalResetStyles()}
      <div>
        <h1>Hello from SolidJS!!</h1>
      </div>
    </>
  )
}

export default App
