import {
  coinCurrency,
  coinEntitySchema,
  coinMarketEntitySchema,
} from '@/domain/entity/coin'
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

// Get coin market schemas
const getCoinMarketParamSchema = z.object({
  id: z.string(),
})
const getCoinMarketQuerySchema = z.object({
  currency: coinCurrency.optional().default('usd'),
})
const getCoinMarketResultSchema = coinMarketEntitySchema
export const getCoinMarketSchema = {
  schema: {
    tags: ['Coins'],
    description: 'Get coin market',
    summary: 'Get coin market',
    operationId: 'getCoinMarket',
    params: getCoinMarketParamSchema,
    querystring: getCoinMarketQuerySchema,
    response: {
      200: getCoinMarketResultSchema,
    },
  },
}
