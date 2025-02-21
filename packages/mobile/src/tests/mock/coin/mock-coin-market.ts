import type { GetCoinMarket200 } from '@/data/model'
import { faker } from '@faker-js/faker'

export const mockCoinMarket = (): GetCoinMarket200 => ({
  currentPrice: faker.number.float(),
  id: faker.string.sample(),
  image: faker.internet.url(),
  name: faker.string.sample(),
  symbol: faker.string.symbol(),
  marketCap: faker.number.float(),
  marketCapRank: faker.number.float(),
  volume: faker.number.float(),
  volumeHigh24h: faker.number.float(),
  volumeHLow24h: faker.number.float(),
})
