import { db } from '@/db'
import { users } from '@/db/schema'
import { UserEntity, type NewUser, type User } from '@/domain/entity/user'
import { eq, getTableColumns } from 'drizzle-orm'

export interface IUserRepository {
  create(user: NewUser): Promise<User>
  findByEmail(email: string): Promise<User | void>
}

export class UserRepository implements IUserRepository {
  async create(user: NewUser): Promise<User> {
    const entity = UserEntity.newUser(user)
    const created = await db.insert(users).values(entity).$returningId()
    return {
      id: created?.[0].id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity?.role || null,
    }
  }

  async findByEmail(email: string): Promise<User | void> {
    const { ...rest } = getTableColumns(users)
    const result = await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.email, email))
    return result?.[0]
  }
}
