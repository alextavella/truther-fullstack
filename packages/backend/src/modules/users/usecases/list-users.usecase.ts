import { registry } from '@/config/registry'
import { UserKeys, type ListUser, type UserRoles } from '@/domain/entity/user'
import type {
  Pagination,
  PaginationRequest,
} from '@/infra/interfaces/pagination'
import type { UseCase } from '@/infra/interfaces/usecase'
import {
  UserRepository,
  type IUserRepository,
} from '@/infra/repositories/user.repository'

type Input = PaginationRequest<{
  name: string
  email: string
  role: UserRoles
}>
type Output = Pagination<ListUser>

export type IListUserUseCase = UseCase<Input, Output>

export class ListUserUseCase implements IListUserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async execute(input: Input): Promise<Output> {
    const filters = new Map<UserKeys, any>()
    if (input.name) filters.set('name', input.name)
    if (input.email) filters.set('email', input.email)
    if (input.role) filters.set('role', input.role)

    return await this.usersRepository.findAll(filters, {
      page: input.page,
      pageSize: input.pageSize,
    })
  }

  static build() {
    return new ListUserUseCase(registry.getModule(UserRepository.name))
  }
}
