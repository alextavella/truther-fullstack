import { authMiddleware } from '@/http/middleware'
import { userEntitySchema, userRoles } from '@/infra/db/schema'
import {
  paginationQuerySchema,
  paginationResultSchema,
} from '@/infra/interfaces/pagination'
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
const updateBodySchema = userEntitySchema.omit({ id: true })
const updateResultSchema = userEntitySchema.omit({ id: true })
export const updateUserSchema = {
  onRequest: authMiddleware,
  schema: {
    tags: ['Users'],
    description: 'Update user',
    summary: 'Update user',
    operationId: 'updateUser',
    body: updateBodySchema,
    response: {
      200: updateResultSchema,
    },
  },
}

// List users schemas
const listQuerySchema = paginationQuerySchema.merge(
  z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.enum(userRoles).optional(),
  }),
)
const listUsersSchema = userEntitySchema.omit({ password: true })
const listResultSchema = z.object({
  items: listUsersSchema.array(),
  pagination: paginationResultSchema,
})
export const listUserSchema = {
  onRequest: authMiddleware,
  schema: {
    tags: ['Users'],
    description: 'List users',
    summary: 'List users',
    operationId: 'listUsers',
    querystring: listQuerySchema,
    response: {
      200: listResultSchema,
    },
  },
}
