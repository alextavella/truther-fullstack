import { registry } from '@/config/registry'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { CreateUsersUseCase } from './usecases/create-user.usecase'
import { registerProviders } from './users.registry'
import { createUserSchema } from './users.schema'

export const usersRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
  app.post('', createUserSchema, async request => {
    const { name, email, password } = request.body
    return await registry
      .getModule(CreateUsersUseCase.name)
      .execute({ name, email, password })
  })
}
