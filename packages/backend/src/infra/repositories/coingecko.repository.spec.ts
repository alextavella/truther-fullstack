import { FakeHttpClient } from '@/tests/fakes/fake-http-client'
import { FakeLogger } from '@/tests/fakes/fake-logger'
import { mockSearchCoins } from '@/tests/mock/search-coins.mock'
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IHttpClient } from '../interfaces/http'
import type { ILogger } from '../interfaces/logger'
import type { ICoinsRepository } from '../interfaces/repository'
import { CoinGeckoRepository } from './coingecko.repository'

describe(CoinGeckoRepository.name, () => {
  let sut: ICoinsRepository
  let httpClient: IHttpClient
  let logger: ILogger

  beforeEach(() => {
    httpClient = new FakeHttpClient()
    logger = new FakeLogger()
    sut = new CoinGeckoRepository(httpClient, logger)
  })

  describe('searchCoin', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const query = faker.string.sample()
      const response = mockSearchCoins()
      const httpSpy = vi.spyOn(httpClient, 'request').mockResolvedValueOnce({
        status: HttpStatusCode.Ok,
        data: response,
      })
      // Act
      const result = await sut.searchCoin(query)
      // Assert
      expect(httpSpy).toHaveBeenCalledWith({
        url: '/search',
        method: 'GET',
        params: { query },
      })
      expect(result).toStrictEqual(
        response.coins.map(CoinGeckoRepository.searchCoinMapper),
      )
    })
  })
})
