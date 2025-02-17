import type { Coin, CoinMarket } from '@/domain/entity/coin'
import type {
  GetCoinParams,
  GetCoinResponse,
  ICoinsRepository,
} from '@/infra/interfaces/repository'

export class FakeCoinsRepository implements ICoinsRepository {
  readonly coins = new Map<string, Coin>()
  readonly market = new Map<string, CoinMarket>()

  async searchCoin(query: string): Promise<Coin[]> {
    return Array.from(this.coins.values()).filter(
      coin => coin.name.includes(query) || coin.symbol?.includes(query),
    )
  }

  async getCoinMarket(params: GetCoinParams): Promise<GetCoinResponse> {
    return this.market.get(params.id)
  }
}
