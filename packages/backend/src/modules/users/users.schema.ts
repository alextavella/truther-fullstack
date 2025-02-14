import { userEntitySchema } from '@/infra/db/schema'
import { z } from 'zod'

// Create user schemas
const createBodySchema = userEntitySchema.omit({ id: true })
const createResultSchema = userEntitySchema.omit({ id: true })
export const createUserSchema = {
  schema: {
    tags: ['Users'],
    description: 'Create user',
    summary: 'Create user',
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
    tags: ['Users'],
    description: 'Update user',
    summary: 'Update user',
    operationId: 'updateUser',
    params: updateParamsSchema,
    body: updateBodySchema,
    response: {
      200: updateResultSchema,
    },
  },
}
