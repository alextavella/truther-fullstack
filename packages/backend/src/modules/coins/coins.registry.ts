import { registry } from '@/config/registry'
import { GetCoinMarketUseCase } from './usecases/get-coin-market.usecase'
import { SearchCoinsUseCase } from './usecases/search-coins.usecase'

export function registerProviders() {
  registry.registerModule(SearchCoinsUseCase.name, SearchCoinsUseCase.build())
  registry.registerModule(
    GetCoinMarketUseCase.name,
    GetCoinMarketUseCase.build(),
  )
}
