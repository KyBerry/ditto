import type { Component } from 'solid-js'
import { useThemeToggle } from '@/hooks'

const Navbar: Component = () => {
  const { toggleTheme } = useThemeToggle()
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default Navbar
