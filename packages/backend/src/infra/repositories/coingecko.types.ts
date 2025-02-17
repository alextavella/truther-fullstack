export type SearchCoinType = {
  id: string
  name: string
  api_symbol: string
  symbol: string
  market_cap_rank: number
  thumb: string
  large: string
}

export type SearchCoinResponse = {
  coins: SearchCoinType[]
}

export type GetCoinMarketType = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  high_24h: number
  low_24h: number
}

export type GetCoinMarketResponse = Array<GetCoinMarketType>
