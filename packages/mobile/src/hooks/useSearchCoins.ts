import type { SearchCoins200ItemsItem } from '@/data/model'
import { searchCoins } from '@/data/store'
import React from 'react'
import { useError } from './useError'

type State = {
  isLoading: boolean
  isError: boolean
  data: SearchCoins200ItemsItem[] | null
}

export function useSearchCoins(query: string) {
  const { handleError } = useError()
  const [state, setState] = React.useState<State>({
    data: null,
    isLoading: true,
    isError: false,
  })

  React.useEffect(() => {
    searchCoins({ query })
      .then(res =>
        setState({ isLoading: false, isError: false, data: res.items }),
      )
      .catch(err => {
        setState(prev => ({ ...prev, isLoading: false, isError: true }))
        handleError(err)
      })
  }, [handleError, query])

  return state
}
