import type { GetCoinMarket200 } from '@/data/model'
import { CoinMarketService } from '@/services/coins'
import React from 'react'
import { useStorageState } from './useStorageState'

export function useFavoriteCoins(coinId?: string) {
  const [[_, favoritesCoins], setFavoriteCoins] =
    useStorageState('favorite-coins')

  const data = React.useMemo(() => {
    if (!favoritesCoins) return []
    const source = JSON.parse(favoritesCoins)
    return Array.isArray(source) ? source : []
  }, [favoritesCoins])

  const service = React.useMemo(
    () => CoinMarketService.formatFavoritesCoin(data),
    [data],
  )

  const isFavorite = React.useMemo(
    () => data.some(c => c.id === coinId),
    [data, coinId],
  )

  function addAsFavorite(coin: GetCoinMarket200) {
    setFavoriteCoins(JSON.stringify(service.add(coin)))
  }

  function removeAsFavorite(coin: GetCoinMarket200) {
    setFavoriteCoins(JSON.stringify(service.remove(coin)))
  }

  const setAsFavorite = isFavorite ? removeAsFavorite : addAsFavorite

  return [[data, setAsFavorite], { isFavorite }] as const
}
