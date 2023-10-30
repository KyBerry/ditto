import type { Component } from 'solid-js'
import { Suspense } from 'solid-js'
import { Client, cacheExchange, fetchExchange } from '@urql/core'
import { UnauthorizedRoutes } from '@/routes'
import { ThemeProvider, UrqlProvider } from '@/components'

const client = new Client({
  // TODO: don't hardcode this
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

const App: Component = () => {
  return (
    <ThemeProvider>
      <UrqlProvider client={client}>
        <Suspense fallback="Loading...">
          <UnauthorizedRoutes />
        </Suspense>
      </UrqlProvider>
    </ThemeProvider>
  )
}

export default App
