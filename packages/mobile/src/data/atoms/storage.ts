import * as SecureStore from 'expo-secure-store'
import { createJSONStorage } from 'jotai/utils'

export const storage = createJSONStorage<any>(() => ({
  getItem: (key: string) => SecureStore.getItem(key),
  setItem: (key: string, newValue: string) =>
    SecureStore.setItem(key, newValue),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}))
