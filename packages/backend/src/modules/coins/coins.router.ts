import { registry } from '@/config/registry'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerProviders } from './coins.registry'
import { listCoinsSchema } from './coins.schema'
import { SearchCoinsUseCase } from './usecases/search-coins.usecase'

export const coinsRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
  app.get('/search', listCoinsSchema, async request => {
    return await registry
      .getModule(SearchCoinsUseCase.name)
      .execute(Object.assign({}, request.query))
  })
}
