import { type EditUser, type NewUser, type User } from '@/domain/entity/user'
import { db } from '@/infra/db'
import { users } from '@/infra/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export interface IUserRepository {
  create(user: NewUser): Promise<User>
  update(id: number, user: EditUser): Promise<User>
  findByID(id: number): Promise<User | void>
  findByEmail(email: string): Promise<User | void>
}

export class UserRepository implements IUserRepository {
  async create(user: NewUser): Promise<User> {
    const id = await db
      .insert(users)
      .values(user)
      .$returningId()
      .then(r => r?.[0].id)
    return {
      id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user?.role || null,
    }
  }

  async update(id: number, user: EditUser): Promise<User> {
    await db.update(users).set(user).where(eq(users.id, id))
    return { ...user, id }
  }

  async findByID(id: number): Promise<User | void> {
    const { ...rest } = getTableColumns(users)
    return await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, id))
      .then((r: User[]) => r?.[0])
  }

  async findByEmail(email: string): Promise<User | void> {
    const { ...rest } = getTableColumns(users)
    return await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.email, email))
      .then((r: User[]) => r?.[0])
  }
}
