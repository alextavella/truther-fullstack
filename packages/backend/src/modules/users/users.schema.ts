import { userRoles, userRolesDefault } from '@/infra/db/schema'
import { z } from 'zod'

const inputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(userRoles).default(userRolesDefault),
})

const outputSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
})

export const createUserSchema = {
  schema: {
    description: 'Create an user',
    tags: ['Users'],
    summary: 'users',
    operationId: 'createUser',
    body: inputSchema,
    response: {
      201: outputSchema,
    },
  },
}
