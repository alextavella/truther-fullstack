import { favoriteCoinsAtom } from '@/data/atoms/coin'
import type { GetCoinMarket200 } from '@/data/model'
import { CoinMarketService } from '@/services/coins'
import { useAtom } from 'jotai/react'
import React from 'react'

export function useFavoriteCoins(coinId?: string) {
  const [data, setFavoriteCoins] = useAtom(favoriteCoinsAtom)

  const service = React.useMemo(
    () => CoinMarketService.formatFavoritesCoin(data),
    [data],
  )

  const isFavorite = React.useMemo(
    () => data.some(c => c.id === coinId),
    [data, coinId],
  )

  function addAsFavorite(coin: GetCoinMarket200) {
    setFavoriteCoins(service.add(coin))
  }

  function removeAsFavorite(coin: GetCoinMarket200) {
    setFavoriteCoins(service.remove(coin))
  }

  const setAsFavorite = isFavorite ? removeAsFavorite : addAsFavorite

  return {
    data,
    setAsFavorite,
    isFavorite,
  } as const
}
