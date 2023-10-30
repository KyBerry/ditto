import { Link } from '@solidjs/router'
import { Form } from '@/components'

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link href="/signup">sign up</Link>
      <Link href="/signin">sign in</Link>

      <Form.Root defaultValues={{ firstName: '' }}>
        <Form.Field>
          <Form.Label>First name</Form.Label>
          <Form.Input name="firstName" />
        </Form.Field>
      </Form.Root>
    </>
  )
}

export default Home
