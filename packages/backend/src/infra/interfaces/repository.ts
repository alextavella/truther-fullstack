import type { Coin } from '@/domain/entity/coin'

export const CoinsRepository = {
  name: 'CoinsRepository',
}

export interface ICoinsRepository {
  searchCoin(query: string): Promise<Coin[]>
}
