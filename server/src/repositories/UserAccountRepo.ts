import type {
  UserAccount,
  CreateAccountInput,
} from '../types/__generated__/resolvers-types'
import db from '../db'
import {} from 'pg'

export class UserAccountRepo {
  async getUserById(userAccountId: Pick<UserAccount, 'userAccountId'>) {
    const { rows } = await db.query<UserAccount>(
      `
      SELECT * FROM user_account WHERE user_account_id = $1 
    `,
      [userAccountId],
    )

    if (rows.length !== 0) return rows

    return []
  }
  async assignUserAccountRole(userAccountId: number, roleId: number) {
    await db.query(
      `
      INSERT INTO user_account_role_type (user_account_id, role_id)
      VALUES ($1, $2);
    `,
      [userAccountId, roleId],
    )
  }
  async getUserAccountRoles(userAccountId: number) {
    const { rows: userRoles } = await db.query(
      `
        SELECT
          u.user_account_id,
          r.role_name
        FROM user_account_role_type u
        JOIN role_type r ON u.role_id = r.role_id
        WHERE u.user_account_id = $1;
      `,
      [userAccountId],
    )

    return userRoles
  }
  async createUserAccount({
    business,
    email,
    firstName,
    lastName,
    password,
    username,
  }: CreateAccountInput) {
    if (!business) {
      const {
        rows: [{ user_account_id: userAccountId }],
      } = await db.query<{ user_account_id: number }>(
        `
          INSERT INTO user_account (email, first_name, last_name, password_hash, username)
          Values ($1, $2, $3, $4, $5)
          RETURNING user_account_id;
        `,
        [email, firstName, lastName, password, username],
      )

      await this.assignUserAccountRole(userAccountId, 5)

      const userRoles = await this.getUserAccountRoles(userAccountId)

      return {
        userAccountId,
        userRoles,
      }
    } else {
      // const { businessName, businessDescription } = business
      // const {
      //   rows: [{ user_account_id: userAccountId }],
      // } = await db.query<{ user_account_id: number }>(
      //   `
      //   `,
      // )
    }
  }
  async updateAccount() {}
  async deleteAccount(userAccountId: number) {
    const {
      rows: [deletedUserAccount],
    } = await db.query(
      `
      DELETE FROM user_account WHERE user_account_id = $1 RETURNING *;
    `,
      [userAccountId],
    )

    return deletedUserAccount
  }
}

export default new UserAccountRepo()
