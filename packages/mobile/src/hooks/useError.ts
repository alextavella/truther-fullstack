import { useSession } from '@/providers/SessionProvider'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'

export function useError() {
  const router = useRouter()
  const { signOut } = useSession()

  return {
    handleError: (error: Error) => {
      // if (process.env.NODE_ENV === 'development') {
      //   console.error('[FAIL]', error)
      // }
      if (error instanceof AxiosError) {
        if (error.status?.toString().startsWith('4')) {
          signOut()
          return router.dismissAll()
        }
      }
      Alert.alert('Error', error.message)
    },
  }
}
