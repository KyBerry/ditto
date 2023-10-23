import type { QueryResult, QueryResultRow } from 'pg'
import { Pool } from 'pg'

class ConnectionPool {
  private pool: Pool

  constructor() {
    const { DB_USER, DB_HOST, DB_NAME, DB_PASS } = process.env

    if (!DB_USER || !DB_HOST || !DB_NAME || !DB_PASS) {
      throw new Error('Missing required environment variables for database connection.')
    }

    this.pool = new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASS,
    })
  }

  connect() {
    return this.pool.connect()
  }

  query<T extends QueryResultRow>(queryText: string, values?: any[]): Promise<QueryResult<T>> {
    return this.pool.query(queryText, values)
  }
}

export default new ConnectionPool()
