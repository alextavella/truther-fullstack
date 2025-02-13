import { env } from '@/config/env'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

const poolConnection = mysql.createPool({
  host: env.DB_HOST,
  port: +env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

export const client = poolConnection
export const db = drizzle({ client: poolConnection })
