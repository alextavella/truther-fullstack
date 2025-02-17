import { FakeHttpClient } from '@/tests/fakes/fake-http-client'
import { FakeLogger } from '@/tests/fakes/fake-logger'
import { mockGetCoinMarket } from '@/tests/mock/coins/mock-get-coin-market'
import { mockSearchCoins } from '@/tests/mock/coins/mock-search-coins'
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

    it('should return empty when failed', async () => {
      // Arrange
      const query = faker.string.sample()
      vi.spyOn(httpClient, 'request').mockResolvedValueOnce({
        status: HttpStatusCode.InternalServerError,
        data: null,
      })
      // Act
      const result = await sut.searchCoin(query)
      // Assert
      expect(result).toHaveLength(0)
    })
  })

  describe('getCoinMarket', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const coinId = faker.string.sample()
      const response = mockGetCoinMarket()
      const httpSpy = vi.spyOn(httpClient, 'request').mockResolvedValueOnce({
        status: HttpStatusCode.Ok,
        data: response,
      })
      // Act
      const result = await sut.getCoinMarket({ id: coinId, currency: 'usd' })
      // Assert
      expect(httpSpy).toHaveBeenCalledWith({
        url: '/coins/markets',
        method: 'GET',
        params: { ids: coinId, vs_currency: 'usd' },
      })
      expect(result).toStrictEqual(
        CoinGeckoRepository.getCoinMarketMapper(response[0]),
      )
    })

    it('should be undefined when failed', async () => {
      // Arrange
      const coinId = faker.string.sample()
      vi.spyOn(httpClient, 'request').mockResolvedValueOnce({
        status: HttpStatusCode.InternalServerError,
        data: null,
      })
      // Act
      const result = await sut.getCoinMarket({ id: coinId, currency: 'usd' })
      // Assert
      expect(result).toBeUndefined()
    })
  })
})
