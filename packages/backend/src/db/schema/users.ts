import { int, mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userRoles = ['customer', 'admin'] as const
export const userRolesDefault = 'customer'

export const users = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: mysqlEnum(userRoles).default(userRolesDefault),
})

export const userSelectSchema = createSelectSchema(users)
export const userInsertSchema = createInsertSchema(users)
