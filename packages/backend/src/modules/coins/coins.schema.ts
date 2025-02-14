import { coinEntitySchema } from '@/domain/entity/coin'
import { z } from 'zod'

// List coins schemas
const searchQuerySchema = z.object({
  query: z.string(),
})
const searchResultSchema = z.object({
  items: coinEntitySchema.array(),
})
export const listCoinsSchema = {
  schema: {
    tags: ['Coins'],
    description: 'Search coins',
    summary: 'Search coins',
    operationId: 'searchCoins',
    querystring: searchQuerySchema,
    response: {
      200: searchResultSchema,
    },
  },
}
