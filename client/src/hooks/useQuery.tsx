import type { AnyVariables, CombinedError, DocumentInput, OperationContext } from '@urql/core'
import { createSignal, useContext } from 'solid-js'
import { UrqlContext } from '@/contexts'

export const useQuery = <Data = any, Variables extends AnyVariables = AnyVariables>(
  query: DocumentInput<Data, Variables>,
  variables: Variables,
  opts?: Partial<OperationContext>
) => {
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<CombinedError>()
  const [data, setData] = createSignal<Data>()

  const context = useContext(UrqlContext)

  if (!context) {
    throw new Error('[Ditto Urql Client]: useQuery must be used within a UrqlProvider')
  }

  context.client
    .query<Data>(query, variables, opts)
    .toPromise()
    .then((response) => {
      setLoading(false)

      if (response.data) {
        setData(() => response.data)
      }

      if (response.error) {
        setError(() => response.error)

        // TODO: only console.error in development environment
        console.error(response.error.message)
      }
    })

  return {
    data,
    error,
    loading,
  }
}
