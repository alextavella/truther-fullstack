import { registry } from '@/config/registry'
import { UserEntity, type GetUser, type UserRoles } from '@/domain/entity/user'
import type { UseCase } from '@/infra/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/infra/repositories/user.repository'
import { BadRequest } from 'http-errors'

type Input = GetUser
type Output = {
  access_token: string
  uid: number
  email: string
  role: UserRoles | null
}

export type IGetUserUseCase = UseCase<Input, Output>

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email).catch(() => null)
    if (!user) {
      throw new BadRequest('Password or email invalid')
    }

    const auth = UserEntity.authUser(user, password)
    if (!auth) {
      throw new BadRequest('Password or email invalid')
    }

    return {
      access_token: auth.token,
      uid: user.id,
      email: user.email,
      role: user.role,
    }
  }

  static build() {
    return new GetUserUseCase(registry.getModule(UserRepository.name))
  }
}
