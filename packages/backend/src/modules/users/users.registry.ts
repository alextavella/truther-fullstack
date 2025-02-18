import { registry } from '@/config/registry'
import { CreateUserUseCase } from './usecases/create-user.usecase'
import { GetUserUseCase } from './usecases/get-user.usecase'
import { ListUserUseCase } from './usecases/list-users.usecase'
import { UpdateUserUseCase } from './usecases/update-user.usecase'

export function registerProviders() {
  registry.registerModule(CreateUserUseCase.name, CreateUserUseCase.build())
  registry.registerModule(GetUserUseCase.name, GetUserUseCase.build())
  registry.registerModule(ListUserUseCase.name, ListUserUseCase.build())
  registry.registerModule(UpdateUserUseCase.name, UpdateUserUseCase.build())
}
