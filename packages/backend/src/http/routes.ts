<<<<<<< HEAD
import { authRouter } from '@/modules/auth/auth.router'
=======
>>>>>>> ff30e9a (feat: coins)
import { coinsRouter } from '@/modules/coins/coins.router'
import { usersRouter } from '@/modules/users/users.router'
import { FastifyInstance } from 'fastify'

export const setupRoutes = (app: FastifyInstance) => {
<<<<<<< HEAD
  app.register(authRouter, { prefix: '/auth' })
=======
>>>>>>> ff30e9a (feat: coins)
  app.register(coinsRouter, { prefix: '/coins' })
  app.register(usersRouter, { prefix: '/users' })
}
