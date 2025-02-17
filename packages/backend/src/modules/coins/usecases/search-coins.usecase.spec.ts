import type { ICoinsRepository } from '@/infra/interfaces/repository'
import { CoinGeckoRepository } from '@/infra/repositories/coingecko.repository'
import { FakeCoinsRepository } from '@/tests/fakes/fake-coins.repository'
import { mockSearchCoins } from '@/tests/mock/coins/mock-search-coins'
import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  SearchCoinsUseCase,
  type ISearchCoinsUseCase,
} from './search-coins.usecase'

describe(SearchCoinsUseCase.name, () => {
  let sut: ISearchCoinsUseCase
  let coinsRepository: ICoinsRepository

  beforeEach(() => {
    coinsRepository = new FakeCoinsRepository()
    sut = new SearchCoinsUseCase(coinsRepository)
  })

  it('should call methods with correct params', async () => {
    // Arrange
    const query = faker.string.sample()
    const response = mockSearchCoins().coins.map(
      CoinGeckoRepository.searchCoinMapper,
    )
    const searchSpy = vi
      .spyOn(coinsRepository, 'searchCoin')
      .mockResolvedValueOnce(response)
    // Act
    const result = await sut.execute({ query })
    // Assert
    expect(searchSpy).toHaveBeenCalledWith(query)
    expect(result).toStrictEqual({ items: response })
  })

  it('should return empty list when failed', async () => {
    // Arrange
    const query = faker.string.sample()
    vi.spyOn(coinsRepository, 'searchCoin').mockRejectedValueOnce(new Error())
    // Act
    const result = await sut.execute({ query })
    // Assert
    expect(result.items).toHaveLength(0)
  })
})
