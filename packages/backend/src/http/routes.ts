import { usersRouter } from '@/modules/users/users.router'
import { FastifyInstance } from 'fastify'

export const setupRoutes = (app: FastifyInstance) => {
  app.register(usersRouter, { prefix: '/users' })
}
