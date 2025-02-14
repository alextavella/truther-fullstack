import { registry } from '@/config/registry'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { CreateUserUseCase } from './usecases/create-user.usecase'
import { ListUserUseCase } from './usecases/list-users.usecase'
import { UpdateUserUseCase } from './usecases/update-user.usecase'
import { registerProviders } from './users.registry'
import {
  createUserSchema,
  listUserSchema,
  updateUserSchema,
} from './users.schema'

export const usersRouter: FastifyPluginAsyncZod = async app => {
  app.addHook('onReady', registerProviders)
  app.post('/', createUserSchema, async request => {
    return await registry
      .getModule(CreateUserUseCase.name)
      .execute(request.body)
  })
  app.put('/:id', updateUserSchema, async request => {
    const { id } = request.params
    return await registry
      .getModule(UpdateUserUseCase.name)
      .execute({ id, ...request.body })
  })
  app.get('/', listUserSchema, async request => {
    return await registry
      .getModule(ListUserUseCase.name)
      .execute(Object.assign({}, request.query))
  })
}
