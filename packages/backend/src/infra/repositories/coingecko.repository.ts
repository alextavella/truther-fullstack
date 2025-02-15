import { registry } from '@/config/registry'
import type { Coin } from '@/domain/entity/coin'
import { HttpStatusCode } from 'axios'
import { Logger } from '../handlers/logger.handler'
import { HttpClient, type IHttpClient } from '../interfaces/http'
import type { ILogger } from '../interfaces/logger'
import type { ICoinsRepository } from '../interfaces/repository'

type SearchCoinType = {
  id: string
  name: string
  api_symbol: string
  symbol: string
  market_cap_rank: number
  thumb: string
  large: string
}
type SearchCoinResponse = {
  coins: SearchCoinType[]
}

export class CoinGeckoRepository implements ICoinsRepository {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly logger: ILogger,
  ) {}

  async searchCoin(query: string): Promise<Coin[]> {
    const httpResponse = await this.httpClient
      .request<SearchCoinResponse>({
        url: '/search',
        method: 'GET',
        params: { query },
      })
      .catch(err => {
        this.logger.error(err)
        throw err
      })

    switch (httpResponse.status) {
      case HttpStatusCode.Ok:
        return httpResponse.data.coins.map(CoinGeckoRepository.searchCoinMapper)
      default:
        return []
    }
  }

  static searchCoinMapper = (coin: SearchCoinType): Coin => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.thumb,
    }
  }

  static build(): ICoinsRepository {
    return new CoinGeckoRepository(
      registry.getModule(HttpClient.name),
      registry.getModule(Logger.name),
    )
  }
}
