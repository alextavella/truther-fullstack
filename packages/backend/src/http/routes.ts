import { coinsRouter } from '@/modules/coins/coins.router'
import { usersRouter } from '@/modules/users/users.router'
import { FastifyInstance } from 'fastify'

export const setupRoutes = (app: FastifyInstance) => {
  app.register(coinsRouter, { prefix: '/coins' })
  app.register(usersRouter, { prefix: '/users' })
}
