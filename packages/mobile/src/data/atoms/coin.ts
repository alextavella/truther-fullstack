import { atomWithStorage } from 'jotai/utils'
import type { GetCoinMarket200 } from '../model'
import { storage } from './storage'

// Favorite
export const favoriteCoinsAtom = atomWithStorage<GetCoinMarket200[]>(
  'favorite-coins',
  [],
  storage,
)
