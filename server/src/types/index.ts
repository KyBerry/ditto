import { Response, Request } from 'express'
import { AddressRepo } from '../repositories/AddressRepo'
import { InvitationRepo } from '../repositories/InvitationRepo'
import { UserAccountRepo } from '../repositories/UserAccountRepo'

export type MyContext = {
  req: Request
  res: Response
  repos: {
    addressRepo: AddressRepo
    invitationRepo: InvitationRepo
    userAccountRepo: UserAccountRepo
  }
}
