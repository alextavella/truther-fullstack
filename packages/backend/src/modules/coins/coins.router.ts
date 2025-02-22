import { registry } from '@/config/registry'
import { authMiddleware } from '@/http/middleware'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerProviders } from './coins.registry'
import { getCoinMarketOptions, listCoinsOptions } from './coins.schema'
import { GetCoinMarketUseCase } from './usecases/get-coin-market.usecase'
import { SearchCoinsUseCase } from './usecases/search-coins.usecase'

export const coinsRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
  app.addHook('onRequest', authMiddleware)
  app.get('/search', listCoinsOptions, async request => {
    return await registry
      .getModule(SearchCoinsUseCase.name)
      .execute(Object.assign({}, request.query))
  })
  app.get('/:id/market', getCoinMarketOptions, async request => {
    return await registry
      .getModule(GetCoinMarketUseCase.name)
      .execute(Object.assign({}, request.query, request.params))
  })
}
