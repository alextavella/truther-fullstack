import { SearchCoins200 } from '@/data/model'
import { searchCoins } from '@/data/store'
import React from 'react'

export function useCoins() {
  const [listCoins, setListCoins] = React.useState<SearchCoins200 | null>(null)

  const handleSearchCoins = (query: string) => {
    searchCoins({ query }).then(setListCoins)
  }

  return {
    serachCoins: handleSearchCoins,
    listCoins,
  }
}
