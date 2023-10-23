import type { Resolvers } from '../../types/__generated__/resolvers-types'
import { hash } from 'argon2'

export const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createUserAccount: async (_, { input }, { repos }) => {
      const hashedPassword = await hash(input.password)

      const response = await repos.userAccountRepo.createUserAccount({
        ...input,
        password: hashedPassword,
      })

      console.log('RESPONSE CREATE USER: ', response)

      return {
        token: 'some token',
      }
    },
  },
}
