import { registry } from '@/config/registry'
import type { Coin } from '@/domain/entity/coin'
import {
  CoinsRepository,
  type ICoinsRepository,
} from '@/infra/interfaces/repository'
import type { UseCase } from '@/infra/interfaces/usecase'

type Input = { query: string }
type Output = { items: Coin[] }

export type ISearchCoinsUseCase = UseCase<Input, Output>

export class SearchCoinsUseCase implements ISearchCoinsUseCase {
  constructor(private readonly coinsRepository: ICoinsRepository) {}

  async execute(input: Input): Promise<Output> {
    const coins = await this.coinsRepository.searchCoin(input.query)
    return { items: coins }
  }

  static build() {
    return new SearchCoinsUseCase(registry.getModule(CoinsRepository.name))
  }
}
