import type { GetCoinMarket200 } from '@/data/model'
import { getCoinMarket } from '@/data/store'
import React from 'react'
import { useError } from './useError'

type State = {
  isLoading: boolean
  isError: boolean
  data: GetCoinMarket200 | null
}

export function useGetCoinMarket(id: string) {
  const { handleError } = useError()
  const [state, setState] = React.useState<State>({
    data: null,
    isError: false,
    isLoading: true,
  })

  React.useEffect(() => {
    getCoinMarket(id, { currency: 'usd' })
      .then(data => {
        setState({ isLoading: false, isError: false, data })
      })
      .catch(err => {
        setState(prev => ({ ...prev, isLoading: false, isError: true }))
        handleError(err)
      })
  }, [id])

  return state
}
