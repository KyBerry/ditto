import type { ParentComponent } from 'solid-js'
import type { Client } from '@urql/core'
import { UrqlContext } from '@/contexts'

export type UrqlProviderProps = {
  client: Client
}

const UrqlProvider: ParentComponent<UrqlProviderProps> = (props) => {
  return (
    <UrqlContext.Provider value={{ client: props.client }}>{props.children}</UrqlContext.Provider>
  )
}

export default UrqlProvider
