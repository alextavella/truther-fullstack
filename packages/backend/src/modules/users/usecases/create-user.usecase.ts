import { registry } from '@/config/registry'
import type { Auth } from '@/domain/entity/auth'
import { UserEntity, type NewUser } from '@/domain/entity/user'
import type { UseCase } from '@/infra/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/infra/repositories/user.repository'
import { InternalServerError, UnprocessableEntity } from 'http-errors'

type Input = NewUser
type Output = Auth

export type ICreateUserUseCase = UseCase<Input, Output>

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ name, email, password, role }: Input): Promise<Output> {
    const user = UserEntity.newUser({ name, email, password, role })

    const exists = await this.usersRepository.findByEmail(email)
    if (exists) {
      throw new UnprocessableEntity('User already exists')
    }

    const createdUser = await this.usersRepository
      .create(user)
      .catch(() => null)
    if (!createdUser) {
      throw new InternalServerError('Error creating user')
    }

    const authUser = UserEntity.authUser(createdUser, password)
    if (!authUser) {
      throw new InternalServerError('Error creating user')
    }

    return authUser.auth
  }

  static build() {
    return new CreateUserUseCase(registry.getModule(UserRepository.name))
  }
}
