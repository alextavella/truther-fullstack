import type { NewUser, User } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { randomUUID } from 'crypto'

export class FakeUserRepository implements IUserRepository {
  readonly _data = new Map<string, User>()

  async create(data: NewUser): Promise<User> {
    const id = randomUUID()
    const user: User = { ...data, id: 1, role: data?.role ?? 'customer' }
    this._data.set(id, user)
    return user
  }

  async findByEmail(email: string): Promise<User | void> {
    return Array.from(this._data.values()).find(user => user.email === email)
  }
}
