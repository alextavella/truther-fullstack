import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const setupOpenApi = async (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Notes API',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3333',
          description: 'Development',
        },
      ],
    },
    transform: jsonSchemaTransform,
  })
  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })
}

export const startOpenApi = (app: FastifyInstance) => {
  const yaml = app.swagger({ yaml: true })
  if (typeof yaml === 'string') {
    const output = resolve(__dirname, '../../../..', 'api', 'openapi.yaml')
    writeFileSync(output, yaml)
  }
}
