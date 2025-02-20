import type { GetCoinMarket200 } from '@/data/model'
import { NumberUtils } from '../utils/number'

export function formatCoinMarket(
  coinMarket: GetCoinMarket200,
): Map<string, string> {
  const map = new Map<string, string>()
  map.set('Market Cap', NumberUtils.formatCurrency(coinMarket.marketCap))
  map.set('24h Range', NumberUtils.formatCurrency(coinMarket.volume))
  map.set('All-Time High', NumberUtils.formatCurrency(coinMarket.volumeHigh24h))
  map.set('All-Time Low', NumberUtils.formatCurrency(coinMarket.volumeHLow24h))
  return map
}
