import type { GetCoinMarket200 } from '@/data/model'
import { getCoinMarket } from '@/data/store'
import React from 'react'
import { useError } from './useError'

export function useCoinMarket(id: string) {
  const { handleError } = useError()

  const [queryText, setQueryText] = React.useState<string>(id)
  const [data, setData] = React.useState<GetCoinMarket200 | null>(null)

  React.useEffect(() => {
    getCoinMarket(id).then(setData).catch(handleError)
  }, [queryText])

  return [data, setQueryText] as const
}
