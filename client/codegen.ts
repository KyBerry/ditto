import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../schema.graphql',
  documents: 'src/gql/**/*.gql',
  generates: {
    'src/gql/__generated__/graphql.ts': {
      plugins: ['typescript'],
    },
  },
}

export default config
