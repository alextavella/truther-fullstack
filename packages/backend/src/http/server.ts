import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { setupRegistry } from '@/config/registry'
import { setupOpenApi, startOpenApi } from './openai'
import { setupRoutes } from './routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, { origin: '*' })
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
//
setupOpenApi(app)
setupRegistry(app)
setupRoutes(app)
///
;(async function run() {
  await app.ready()
  await app.listen({ port: 3333 })
  startOpenApi(app)
  console.log(`🚀 Server running at http://localhost:3333/docs`)
})()
