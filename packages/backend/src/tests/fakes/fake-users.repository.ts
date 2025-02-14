import type { EditUser, NewUser, User, UserKeys } from '@/domain/entity/user'
import type { PaginationOptions } from '@/infra/interfaces/pagination'
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
    _: PaginationOptions,
  ): Promise<User[]> {
    const filter = filterCommand(filters)
    return Array.from(this._data.values())
      .filter(filter.search('name'))
      .filter(filter.equal('email'))
      .filter(filter.equal('role'))
  }
}

const filterCommand = (filters: Map<string, any>) => {
  return {
    search: (key: UserKeys) => {
      return (source: User) => {
        if (!filters.get(key) || !source[key]) null
        if (key === 'role') return source[key] === filters.get(key)
        return source[key]?.toString().indexOf(filters.get(key)) >= 0
      }
    },
    equal: (key: UserKeys) => {
      return (source: User) => {
        if (!filters.get(key) || !source[key]) null
        if (key === 'role') return source[key] === filters.get(key)
        return source[key]?.toString() === filters.get(key)
      }
    },
  }
}
