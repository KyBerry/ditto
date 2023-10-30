import { BasicButton, Form } from '@/components'
import { signInFormStyles, signInStyles, signInTitleStyles } from './styles'
import { useThemeToggle } from '@/hooks'

const SignIn = () => {
  const { toggleTheme } = useThemeToggle()
  return (
    <section class={signInStyles()}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <h1 class={signInTitleStyles()}>Sign In</h1>
      <div class={signInFormStyles()}>
        <Form.Root defaultValues={{ username: '', password: '' }}>
          <Form.Field>
            <Form.Label for="username">Username</Form.Label>
            <Form.Input name="username" />
          </Form.Field>
          <Form.Field>
            <Form.Label for="password">Password</Form.Label>
            <Form.Input type="password" name="passowrd" />
          </Form.Field>
          <Form.Action>
            <BasicButton label="Sign in" />
          </Form.Action>
        </Form.Root>
      </div>
    </section>
  )
}

export default SignIn
