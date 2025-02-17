import type { ICoinsRepository } from '@/infra/interfaces/repository'
import { CoinGeckoRepository } from '@/infra/repositories/coingecko.repository'
import { FakeCoinsRepository } from '@/tests/fakes/fake-coins.repository'
import { mockGetCoinMarket } from '@/tests/mock/coins/mock-get-coin-market'
import { faker } from '@faker-js/faker'
import { NotFound } from 'http-errors'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  GetCoinMarketUseCase,
  type IGetCoinMarketUseCase,
} from './get-coin-market.usecase'

describe(GetCoinMarketUseCase.name, () => {
  let sut: IGetCoinMarketUseCase
  let coinsRepository: ICoinsRepository
  const currency = 'brl'

  beforeEach(() => {
    coinsRepository = new FakeCoinsRepository()
    sut = new GetCoinMarketUseCase(coinsRepository)
  })

  it('should call methods with correct params', async () => {
    // Arrange
    const id = faker.string.sample()
    const response = CoinGeckoRepository.getCoinMarketMapper(
      mockGetCoinMarket()[0],
    )
    const searchSpy = vi
      .spyOn(coinsRepository, 'getCoinMarket')
      .mockResolvedValueOnce(response)
    // Act
    const result = await sut.execute({ id, currency })
    // Assert
    expect(searchSpy).toHaveBeenCalledWith({ id, currency })
    expect(result).toStrictEqual(response)
  })

  it('should return 404 when failed', async () => {
    // Arrange
    const id = faker.string.sample()
    vi.spyOn(coinsRepository, 'getCoinMarket').mockRejectedValueOnce(
      new Error(),
    )
    // Act
    // Assert
    await expect(sut.execute({ id, currency })).rejects.toThrowError(NotFound)
  })
})
