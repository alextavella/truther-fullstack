import { registry } from '@/config/registry'
import { GetUserUseCase } from './usecases/get-user.usecase'

export function registerProviders() {
  registry.registerModule(GetUserUseCase.name, GetUserUseCase.build())
}
