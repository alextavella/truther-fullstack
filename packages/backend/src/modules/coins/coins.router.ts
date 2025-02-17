import { registry } from '@/config/registry'
<<<<<<< HEAD
import { authMiddleware } from '@/http/middleware'
=======
>>>>>>> ff30e9a (feat: coins)
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerProviders } from './coins.registry'
import { getCoinMarketSchema, listCoinsSchema } from './coins.schema'
import { GetCoinMarketUseCase } from './usecases/get-coin-market.usecase'
import { SearchCoinsUseCase } from './usecases/search-coins.usecase'

export const coinsRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
<<<<<<< HEAD
  app.addHook('onRequest', authMiddleware)
=======
>>>>>>> ff30e9a (feat: coins)
  app.get('/search', listCoinsSchema, async request => {
    return await registry
      .getModule(SearchCoinsUseCase.name)
      .execute(Object.assign({}, request.query))
  })
  app.get('/:id/market', getCoinMarketSchema, async request => {
    return await registry
      .getModule(GetCoinMarketUseCase.name)
      .execute(Object.assign({}, request.query, request.params))
  })
}
