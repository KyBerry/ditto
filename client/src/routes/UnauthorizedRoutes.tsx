import { lazy } from 'solid-js'
import { Route, Routes } from '@solidjs/router'

const Home = lazy(async () => import('@/pages/Home'))
const SignIn = lazy(async () => import('@/pages/SignIn'))
const SignUp = lazy(async () => import('@/pages/SignUp'))

const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/*all" element={<h1>404</h1>} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Routes>
  )
}

export default UnauthorizedRoutes
