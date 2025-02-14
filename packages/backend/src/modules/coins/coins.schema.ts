import { coinEntitySchema } from '@/domain/entity/coin'
import { z } from 'zod'

// List coins schemas
const listQuerySchema = z.object({
  query: z.string(),
})
const listResultSchema = z.object({
  items: coinEntitySchema.array(),
})
export const listCoinsSchema = {
  schema: {
    tags: ['Coins'],
    description: 'List coins',
    summary: 'List coins',
    operationId: 'listCoins',
    querystring: listQuerySchema,
    response: {
      200: listResultSchema,
    },
  },
}
