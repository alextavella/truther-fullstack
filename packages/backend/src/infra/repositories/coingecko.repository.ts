import { registry } from '@/config/registry'
import type { Coin, CoinMarket } from '@/domain/entity/coin'
import { HttpStatusCode } from 'axios'
import { Logger } from '../handlers/logger.handler'
import { HttpClient, type IHttpClient } from '../interfaces/http'
import type { ILogger } from '../interfaces/logger'
import type {
  GetCoinParams,
  GetCoinResponse,
  ICoinsRepository,
  SearchParams,
  SearchResponse,
} from '../interfaces/repository'
import type {
  GetCoinMarketResponse,
  GetCoinMarketType,
  SearchCoinResponse,
  SearchCoinType,
} from './coingecko.types'

export class CoinGeckoRepository implements ICoinsRepository {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly logger: ILogger,
  ) {}

  async searchCoin(query: SearchParams): Promise<SearchResponse> {
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

  async getCoinMarket(params: GetCoinParams): Promise<GetCoinResponse> {
    const httpResponse = await this.httpClient
      .request<GetCoinMarketResponse>({
        url: '/coins/markets',
        method: 'GET',
        params: {
          vs_currency: params.currency,
          ids: params.id,
        },
      })
      .catch(err => {
        this.logger.error(err)
        throw err
      })

    switch (httpResponse.status) {
      case HttpStatusCode.Ok: {
        const firstCoin = httpResponse.data?.[0]
        return firstCoin
          ? CoinGeckoRepository.getCoinMarketMapper(firstCoin)
          : undefined
      }
      default:
        return undefined
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

  static getCoinMarketMapper = (coin: GetCoinMarketType): CoinMarket => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      marketCapRank: coin.market_cap_rank,
      totalVolume: coin.total_volume,
    }
  }

  static build(): ICoinsRepository {
    return new CoinGeckoRepository(
      registry.getModule(HttpClient.name),
      registry.getModule(Logger.name),
    )
  }
}
