import type { Coin } from '@/domain/entity/coin'
import type { ICoinsRepository } from '@/infra/interfaces/repository'

export class FakeCoinsRepository implements ICoinsRepository {
  readonly _data = new Map<number, Coin>()

  async searchCoin(query: string): Promise<Coin[]> {
    return Array.from(this._data.values()).filter(
      coin => coin.name.includes(query) || coin.symbol?.includes(query),
    )
  }
}
