import AsyncStorage from '@react-native-async-storage/async-storage'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import type { GetCoinMarket200 } from '../model'

// Storage
const storage = createJSONStorage<any>(() => AsyncStorage)

// Favorite
export const favoriteCoinsAtom = atomWithStorage<GetCoinMarket200[]>(
  'favorite-coins',
  [],
  storage,
)
