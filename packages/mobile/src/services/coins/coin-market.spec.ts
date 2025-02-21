import { mockCoinMarket } from '@/tests/mock/coin/mock-coin-market'
import { NumberUtils } from '../utils/number'
import { formatCoinMarket } from './coin-market'

describe('formatCoinMarket', () => {
  it('should contain the correct keys', () => {
    // Arrange
    const coin = mockCoinMarket()
    // Act
    const result = formatCoinMarket(coin)
    const entry = Array.from(result.keys())
    // Assert
    expect(entry[0]).toEqual('Market Cap')
    expect(entry[1]).toEqual('24h Range')
    expect(entry[2]).toEqual('All-Time High')
    expect(entry[3]).toEqual('All-Time Low')
  })

  it('should contain the correct values', () => {
    // Arrange
    const coin = mockCoinMarket()
    // Act
    const result = formatCoinMarket(coin)
    const entry = Array.from(result.values())
    // Assert
    expect(entry[0]).toEqual(NumberUtils.formatCurrency(coin.marketCap))
    expect(entry[1]).toEqual(NumberUtils.formatCurrency(coin.volume))
    expect(entry[2]).toEqual(NumberUtils.formatCurrency(coin.volumeHigh24h))
    expect(entry[3]).toEqual(NumberUtils.formatCurrency(coin.volumeHLow24h))
  })
})
