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
  currentPrice: z.number(),
  marketCap: z.number(),
  marketCapRank: z.number(),
  totalVolume: z.number(),
})

export type Coin = z.infer<typeof coinEntitySchema>
export type CoinMarket = z.infer<typeof coinMarketEntitySchema>
export type CoinCurrency = 'usd' | 'eur' | 'brl'
