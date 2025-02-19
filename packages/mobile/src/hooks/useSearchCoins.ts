import type { SearchCoins200ItemsItem } from '@/data/model'
import { searchCoins } from '@/data/store'
import React from 'react'
import { useError } from './useError'

export function useSearchCoins(query: string) {
  const { handleError } = useError()

  const [queryText, setQueryText] = React.useState<string>(query)
  const [data, setData] = React.useState<SearchCoins200ItemsItem[]>([])

  React.useEffect(() => {
    searchCoins({ query: queryText })
      .then(res => setData(res.items))
      .catch(handleError)
  }, [queryText])

  return [data, setQueryText] as const
}
