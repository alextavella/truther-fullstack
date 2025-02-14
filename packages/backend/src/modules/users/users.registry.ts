import { registry } from '@/config/registry'
import { CreateUserUseCase } from './usecases/create-user.usecase'
import { UpdateUserUseCase } from './usecases/update-user.usecase'

export function registerProviders() {
  registry.registerModule(CreateUserUseCase.name, CreateUserUseCase.build())
  registry.registerModule(UpdateUserUseCase.name, UpdateUserUseCase.build())
}
