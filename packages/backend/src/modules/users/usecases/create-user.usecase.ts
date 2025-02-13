import { registry } from '@/config/registry'
import { UserEntity, type NewUser, type User } from '@/domain/entity/user'
import type { UseCase } from '@/domain/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/repositories/user.repository'
import { UnprocessableEntity } from 'http-errors'

type Input = NewUser
type Output = User

export type ICreateUserUseCase = UseCase<Input, Output>

export class CreateUsersUseCase implements ICreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute({ name, email, password, role }: Input): Promise<Output> {
    const user = UserEntity.newUser({ name, email, password, role })

    const exists = await this.repository.findByEmail(email)
    if (exists) {
      throw new UnprocessableEntity('User already exists')
    }

    return await this.repository.create(user)
  }

  static build() {
    return new CreateUsersUseCase(registry.getModule(UserRepository.name))
  }
}
