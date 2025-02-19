import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from '@/config/env'
import { setupRegistry } from '@/config/registry'
import { errorHandler } from '@/infra/handlers/error.handler'
import { setupOpenApi, startOpenApi } from './openai'
import { setupRoutes } from './routes'

const app = fastify({
  ignoreTrailingSlash: true,
}).withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, { origin: '*' })
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyJwt, { secret: env.AUTH_SECRET })

//
setupOpenApi(app)
setupRegistry(app)
setupRoutes(app)
//
app.setErrorHandler(errorHandler)
///
;(async function run() {
  await app.ready()
  await app.listen({ host: '0.0.0.0', port: +env.PORT })
  startOpenApi(app)
  console.log(`🚀 Server running at http://localhost:${env.PORT}/docs`)
})()
