import { useSession } from '@/providers/SessionProvider'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'

export function useError() {
  const router = useRouter()
  const { signOut } = useSession()

  return {
    handleError: (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('[FAIL]', error)
      }
      if (error instanceof AxiosError) {
        if (error.status?.toString().startsWith('4')) {
          signOut()
          router.dismissAll()
        }
      }
    },
  }
}
