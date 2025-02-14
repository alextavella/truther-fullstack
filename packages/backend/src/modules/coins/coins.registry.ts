import { registry } from '@/config/registry'
import { SearchCoinsUseCase } from './usecases/search-coins.usecase'

export function registerProviders() {
  registry.registerModule(SearchCoinsUseCase.name, SearchCoinsUseCase.build())
}
