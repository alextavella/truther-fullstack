import { authRouter } from '@/modules/auth/auth.router'
import { coinsRouter } from '@/modules/coins/coins.router'
import { usersRouter } from '@/modules/users/users.router'
import { FastifyInstance } from 'fastify'

export const setupRoutes = (app: FastifyInstance) => {
  app.register(authRouter, { prefix: '/auth' })
  app.register(coinsRouter, { prefix: '/coins' })
  app.register(usersRouter, { prefix: '/users' })
}
