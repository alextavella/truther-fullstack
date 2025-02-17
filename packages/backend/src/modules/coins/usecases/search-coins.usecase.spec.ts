import type { ICoinsRepository } from '@/infra/interfaces/repository'
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
    const response = mockSearchCoins().coins
    const searchSpy = vi
      .spyOn(coinsRepository, 'searchCoin')
      .mockResolvedValueOnce(response)
    const query = faker.string.sample()
    // Act
    const result = await sut.execute({ query })
    // Assert
    expect(searchSpy).toHaveBeenCalledWith(query)
    expect(result).toStrictEqual({ items: response })
  })
})
