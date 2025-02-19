import { registry } from '@/config/registry'
import {
  type EditUser,
  type ListUser,
  type NewUser,
  type User,
  type UserKeys,
} from '@/domain/entity/user'
import { db } from '@/infra/db'
import { users } from '@/infra/db/schema'
import { and, asc, eq, getTableColumns, like, SQL } from 'drizzle-orm'
import { paginateQuery } from '../db/pagination'
import { Logger } from '../handlers/logger.handler'
import type { ILogger } from '../interfaces/logger'
import type { Pagination, PaginationOptions } from '../interfaces/pagination'

export interface IUserRepository {
  create(user: NewUser): Promise<User>
  update(id: number, user: EditUser): Promise<User>
  findByID(id: number): Promise<User | void>
  findByEmail(email: string): Promise<User | void>
  findAll(
    filters: Map<UserKeys, any>,
    options: PaginationOptions,
  ): Promise<Pagination<ListUser>>
}

export class UserRepository implements IUserRepository {
  constructor(private readonly logger: ILogger) {}

  async create(user: NewUser): Promise<User> {
    const id = await db
      .insert(users)
      .values(user)
      .$returningId()
      .then(r => r?.[0].id)
      .catch((err: Error) => {
        this.logger.error(err)
        throw err
      })

    return {
      id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user?.role || null,
    }
  }

  async update(id: number, user: EditUser): Promise<User> {
    await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .catch((err: Error) => {
        this.logger.error(err)
        throw err
      })

    return { ...user, id }
  }

  async findByID(id: number): Promise<User | void> {
    const { ...rest } = getTableColumns(users)
    return await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, id))
      .then((r: User[]) => r?.[0])
      .catch((err: Error) => {
        this.logger.error(err)
        return undefined
      })
  }

  async findByEmail(email: string): Promise<User | void> {
    const { ...rest } = getTableColumns(users)
    return await db
      .select({ ...rest })
      .from(users)
      .where(eq(users.email, email))
      .then((r: User[]) => r?.[0])
      .catch((err: Error) => {
        this.logger.error(err)
        return undefined
      })
  }

  async findAll(
    filters: Map<UserKeys, any>,
    options: PaginationOptions,
  ): Promise<Pagination<ListUser>> {
    const filterSQL: SQL[] = []

    if (filters.get('name'))
      filterSQL.push(like(users.name, `%${filters.get('name')}%`))

    if (filters.get('email'))
      filterSQL.push(eq(users.email, filters.get('email')))

    if (filters.get('role')) filterSQL.push(eq(users.role, filters.get('role')))

    const { password, ...rest } = getTableColumns(users)

    const qb = db
      .select({ ...rest })
      .from(users)
      .where(and(...filterSQL))
      .orderBy(asc(users.id))
      .$dynamic()

    const result = await paginateQuery<ListUser, any>(qb, options).catch(
      (err: Error) => {
        this.logger.error(err)
        return {
          items: [],
          pagination: { total: 0, page: 0, pageSize: 0, pageCount: 0 },
        }
      },
    )

    return result
  }

  static build() {
    return new UserRepository(registry.getModule(Logger.name))
  }
}
