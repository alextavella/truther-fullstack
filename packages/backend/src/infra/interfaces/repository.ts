import type { Coin, CoinCurrency, CoinMarket } from '@/domain/entity/coin'

export const CoinsRepository = {
  name: 'CoinsRepository',
}

export type SearchParams = string
export type SearchResponse = Coin[]

export type GetCoinParams = {
  id: string
  currency: CoinCurrency
}
export type GetCoinResponse = CoinMarket | undefined

export interface ICoinsRepository {
  searchCoin(query: SearchParams): Promise<SearchResponse>
  getCoinMarket(params: GetCoinParams): Promise<GetCoinResponse>
}
