import { registry } from '@/config/registry'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerProviders } from './auth.registry'
import { getUserSchema } from './auth.schema'
import { GetUserUseCase } from './usecases/get-user.usecase'

export const authRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
  app.post('/', getUserSchema, async request => {
    return await registry.getModule(GetUserUseCase.name).execute(request.body)
  })
}
