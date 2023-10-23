import type { MyContext } from './types'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'node:http'
import cors from 'cors'
import { json } from 'body-parser'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from './gql/resolvers'
import addressRepo from './repositories/AddressRepo'
import invitationRepo from './repositories/InvitationRepo'
import userAccountRepo from './repositories/UserAccountRepo'
import db from './db'
import { GRAPHQL_SCHEMA_PATH } from './constants'

const initServer = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  // Load schema from the file
  const schema = await loadSchema(GRAPHQL_SCHEMA_PATH, {
    loaders: [new GraphQLFileLoader()],
  })

  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

  const server = new ApolloServer<MyContext>({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpServer })],
  })

  await db.connect()
  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        repos: {
          addressRepo,
          invitationRepo,
          userAccountRepo,
        },
      }),
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

export default initServer
