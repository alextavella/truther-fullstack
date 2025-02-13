import { registry } from '@/config/registry'
import { CreateUsersUseCase } from './usecases/create-user.usecase'

export function registerProviders() {
  registry.registerModule(CreateUsersUseCase.name, CreateUsersUseCase.build())
}
