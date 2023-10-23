import type { UserInvitation } from '../types/__generated__/resolvers-types'
import db from '../db'

export class InvitationRepo {
  async findByUserAccountId(userId: Pick<UserInvitation, 'userAccountId'>) {
    db.query(
      `
        SELECT 
          ui.user_invitation_id,
          ui.token,
          ui.user_account_id,
          ui.created_at,
          ui.updated_at,
          ui.business_id,
          st.status_name
        FROM user_invitation ui
        JOIN status_type st ON ui.status_id = st.status_id
        WHERE ui.user_account_id = $1;
      `,
      [userId],
    )
  }
  async createInvitation() {}

  async updateInvitationStatus() {}

  async deleteInvitation() {}
}

export default new InvitationRepo()
