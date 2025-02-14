import { z } from 'zod'

export const coinEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
})

export const coinMarketEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  total_volume: z.number(),
})

export type Coin = z.infer<typeof coinEntitySchema>
export type CoinMarket = z.infer<typeof coinMarketEntitySchema>
