import type { EditUser, NewUser, User } from '@/domain/entity/user'
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
}
