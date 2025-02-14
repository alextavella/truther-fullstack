import { userEntitySchema } from '@/infra/db/schema'
import { z } from 'zod'

// Create user schemas
const createBodySchema = userEntitySchema.omit({ id: true })
const createResultSchema = userEntitySchema.omit({ id: true })
export const createUserSchema = {
  schema: {
    description: 'Create an user',
    tags: ['Users'],
    summary: 'users',
    operationId: 'createUser',
    body: createBodySchema,
    response: {
      201: createResultSchema,
    },
  },
}

// Update user schemas
const updateParamsSchema = z.object({ id: z.string() })
const updateBodySchema = createBodySchema
const updateResultSchema = createResultSchema
export const updateUserSchema = {
  schema: {
    description: 'Update an user',
    tags: ['Users'],
    summary: 'users',
    operationId: 'updateUser',
    params: updateParamsSchema,
    body: updateBodySchema,
    response: {
      200: updateResultSchema,
    },
  },
}
