import { int, mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { z } from 'zod'

export const userRoles = ['customer', 'admin'] as const
export const userRolesDefault = 'customer'

// Drizzle
export const users = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: mysqlEnum(userRoles).default(userRolesDefault),
})

// Zod
export const userEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(userRoles).default(userRolesDefault).nullable().optional(),
})
