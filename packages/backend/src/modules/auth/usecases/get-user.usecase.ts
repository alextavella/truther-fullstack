import { registry } from '@/config/registry'
import type { Auth } from '@/domain/entity/auth'
import { UserEntity, type GetUser } from '@/domain/entity/user'
import type { UseCase } from '@/infra/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/infra/repositories/user.repository'
import { BadRequest } from 'http-errors'

type Input = GetUser
type Output = Auth

export type IGetUserUseCase = UseCase<Input, Output>

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email).catch(() => null)
    if (!user) {
      throw new BadRequest('Password or email invalid')
    }

    const authUser = UserEntity.authUser(user, password)
    if (!authUser) {
      throw new BadRequest('Password or email invalid')
    }

    return authUser.auth
  }

  static build() {
    return new GetUserUseCase(registry.getModule(UserRepository.name))
  }
}
