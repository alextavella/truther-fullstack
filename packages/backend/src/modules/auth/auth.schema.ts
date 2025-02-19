import { userEntitySchema, userRoles } from '@/infra/db/schema'
import { z } from 'zod'

// Get user schemas (auth)
const getBodySchema = userEntitySchema.pick({ email: true, password: true })
const getResultSchema = z.object({
  access_token: z.string(),
  uid: z.number(),
  email: z.string(),
  role: z.enum(userRoles).nullable(),
})
export const getUserSchema = {
  schema: {
    tags: ['Auth'],
    description: 'Get user',
    summary: 'Get user',
    operationId: 'getUser',
    body: getBodySchema,
    response: {
      200: getResultSchema,
    },
  },
}
