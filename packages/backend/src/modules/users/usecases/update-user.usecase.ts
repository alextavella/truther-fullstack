import { registry } from '@/config/registry'
import { UserEntity, type User } from '@/domain/entity/user'
import type { UseCase } from '@/infra/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/infra/repositories/user.repository'
import { BadRequest } from 'http-errors'

type Input = User
type Output = User

export type IUpdateUserUseCase = UseCase<Input, Output>

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ id, name, email, password, role }: Input): Promise<Output> {
    const user = UserEntity.editUser(id, { name, email, password, role })

    const exists = await this.usersRepository.findByID(id)
    if (!exists) {
      throw new BadRequest('User not found')
    }

    return await this.usersRepository.update(user.id, user)
  }

  static build() {
    return new UpdateUserUseCase(registry.getModule(UserRepository.name))
  }
}
