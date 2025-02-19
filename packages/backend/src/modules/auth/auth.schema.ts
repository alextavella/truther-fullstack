import { authSchema } from '@/domain/entity/auth'
import { userEntitySchema } from '@/infra/db/schema'

// Get user schemas (auth)
const getBodySchema = userEntitySchema.pick({ email: true, password: true })
const getResultSchema = authSchema
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
