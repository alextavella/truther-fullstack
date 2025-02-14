import type { EditUser, NewUser, User, UserKeys } from '@/domain/entity/user'
import type {
  Pagination,
  PaginationOptions,
} from '@/infra/interfaces/pagination'
import type { IUserRepository } from '@/infra/repositories/user.repository'

export class FakeUserRepository implements IUserRepository {
  readonly _data = new Map<number, User>()

  async create(data: NewUser): Promise<User> {
    const ids = Array.from(this._data.keys())
    const userId: number = ids.length ? ids?.[ids.length - 1] + 1 : 1
    const user: User = { ...data, id: userId, role: data?.role ?? 'customer' }
    this._data.set(userId, user)
    return user
  }

  async update(id: number, data: EditUser): Promise<User> {
    const user = this._data.get(id)
    if (!user) throw new Error('User not found')
    const update = { ...data, id }
    this._data.set(id, update)
    return update
  }

  async findByID(id: number): Promise<User | void> {
    return Array.from(this._data.values()).find(user => user.id === id)
  }

  async findByEmail(email: string): Promise<User | void> {
    return Array.from(this._data.values()).find(user => user.email === email)
  }

  async findAll(
    filters: Map<UserKeys, any>,
    opts: PaginationOptions,
  ): Promise<Pagination<User>> {
    const filter = filterCommand(filters)
    const items = Array.from(this._data.values())
      .filter(filter.search('name'))
      .filter(filter.equal('email'))
      .filter(filter.equal('role'))
    return {
      items,
      pagination: { ...opts, pageCount: items.length, total: items.length },
    }
  }
}

const filterCommand = (filters: Map<string, any>) => {
  return {
    search: (key: UserKeys) => {
      return (source: User) => {
        if (!filters.get(key) || !source[key]) return true
        if (key === 'role') return source[key] === filters.get(key)
        return source[key]?.toString().indexOf(filters.get(key)) >= 0
      }
    },
    equal: (key: UserKeys) => {
      return (source: User) => {
        if (!filters.get(key) || !source[key]) return true
        if (key === 'role') return source[key] === filters.get(key)
        return source[key]?.toString() === filters.get(key)
      }
    },
  }
}
