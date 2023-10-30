import type { Client } from '@urql/core'
import { createContext } from 'solid-js'

export type UrqlContextValue = {
  client: Client
}

export const UrqlContext = createContext<UrqlContextValue | null>(null)
