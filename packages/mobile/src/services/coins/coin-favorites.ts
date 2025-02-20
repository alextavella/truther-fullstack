import type { GetCoinMarket200 } from '@/data/model'

type FavoriteCoin = GetCoinMarket200

export function formatFavoritesCoin(source: FavoriteCoin[]) {
  return {
    add: function (data: GetCoinMarket200): FavoriteCoin[] {
      return [...this.remove(data), data]
    },
    remove: function (data: GetCoinMarket200): FavoriteCoin[] {
      return source.filter(coin => coin.id !== data.id)
    },
  }
}
