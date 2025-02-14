import { registry } from '@/config/registry'
import type { Coin } from '@/domain/entity/coin'
import { Logger } from '../handlers/logger.handler'
import { HttpClient, type IHttpClient } from '../interfaces/http'
import type { ILogger } from '../interfaces/logger'
import type { ICoinsRepository } from '../interfaces/repository'

type SearchCoinType = {
  coins: {
    id: string
    name: string
    api_symbol: string
    symbol: string
    market_cap_rank: number
    thumb: string
    large: string
  }[]
}

export class CoinGeckoRepository implements ICoinsRepository {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly logger: ILogger,
  ) {}

  async searchCoin(query: string): Promise<Coin[]> {
    return await this.httpClient
      .request<SearchCoinType>({
        url: '/search',
        method: 'GET',
        params: { query },
      })
      .then(res => res.data.coins)
      .then(res => {
        return res.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.thumb,
        }))
      })
      .catch(err => {
        this.logger.error(err)
        return []
      })
  }

  static build(): ICoinsRepository {
    return new CoinGeckoRepository(
      registry.getModule(HttpClient.name),
      registry.getModule(Logger.name),
    )
  }
}
