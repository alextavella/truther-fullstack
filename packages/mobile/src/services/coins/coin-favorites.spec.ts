import { mockCoinMarket } from '@/tests/mock/coin/mock-coin-market'
import { formatFavoritesCoin, type FavoriteCoin } from './coin-favorites'

describe('formatFavoritesCoin', () => {
  describe('add', () => {
    it('should add coin correctly', () => {
      // Arrange
      const source: FavoriteCoin[] = []
      const service = formatFavoritesCoin(source)
      const coin: FavoriteCoin = mockCoinMarket()
      // Act
      const result = service.add(coin)
      // Assert
      expect(result).toHaveLength(1)
      expect(result[0]).toStrictEqual(coin)
    })

    it('should multiply coins correctly', () => {
      // Arrange
      const source: FavoriteCoin[] = []
      const service = formatFavoritesCoin(source)
      const coin1: FavoriteCoin = mockCoinMarket()
      const coin2: FavoriteCoin = mockCoinMarket()
      // Act
      service.add(coin1)
      const result = service.add(coin2)
      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toStrictEqual(coin1)
      expect(result[1]).toStrictEqual(coin2)
    })

    it('should not add repeated coins', () => {
      // Arrange
      const source: FavoriteCoin[] = []
      const service = formatFavoritesCoin(source)
      const coin1: FavoriteCoin = mockCoinMarket()
      const coin2: FavoriteCoin = mockCoinMarket()
      // Act
      service.add(coin1)
      service.add(coin2)
      const result = service.add(coin1)
      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toStrictEqual(coin2)
      expect(result[1]).toStrictEqual(coin1)
    })
  })

  describe('remove', () => {
    it('should remove coin correctly', () => {
      // Arrange
      const source: FavoriteCoin[] = []
      const service = formatFavoritesCoin(source)
      const coin: FavoriteCoin = mockCoinMarket()
      // Act
      service.add(coin)
      const result = service.remove(coin)
      // Assert
      expect(result).toHaveLength(0)
    })

    it('should not remove not found coins', () => {
      // Arrange
      const source: FavoriteCoin[] = []
      const service = formatFavoritesCoin(source)
      const coin1: FavoriteCoin = mockCoinMarket()
      const coin2: FavoriteCoin = mockCoinMarket()
      const coin3: FavoriteCoin = mockCoinMarket()
      // Act
      service.add(coin1)
      service.add(coin2)
      const result = service.remove(coin3)
      // Assert
      expect(result).toHaveLength(2)
      expect(result[0]).toStrictEqual(coin1)
      expect(result[1]).toStrictEqual(coin2)
    })
  })
})
