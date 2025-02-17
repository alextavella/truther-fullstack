import { registry } from '@/config/registry'
import type { CoinCurrency, CoinMarket } from '@/domain/entity/coin'
import {
  CoinsRepository,
  type ICoinsRepository,
} from '@/infra/interfaces/repository'
import type { UseCase } from '@/infra/interfaces/usecase'
import { NotFound } from 'http-errors'

type Input = { id: string; currency: CoinCurrency }
type Output = CoinMarket

export type IGetCoinMarketUseCase = UseCase<Input, Output>

export class GetCoinMarketUseCase implements IGetCoinMarketUseCase {
  constructor(private readonly coinsRepository: ICoinsRepository) {}

  async execute(input: Input): Promise<Output> {
    const coinMarket = await this.coinsRepository
      .getCoinMarket({
        id: input.id,
        currency: input.currency,
      })
      .catch(() => null)

    if (!coinMarket) throw new NotFound(`Coin ${input.id} not found`)

    return coinMarket
  }

  static build() {
    return new GetCoinMarketUseCase(registry.getModule(CoinsRepository.name))
  }
}
