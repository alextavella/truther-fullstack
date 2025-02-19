import { SESSION_KEY } from '@/config/session'
import type { CreateUser201, GetUser200 } from '@/data/model'
import { useStorageState } from '@/hooks/useStorageState'
import { setAuthorization } from '@/lib/api'
import React, { type PropsWithChildren } from 'react'

type SessionData = GetUser200 | CreateUser201

const AuthContext = React.createContext<{
  signIn: (user: SessionData) => void
  signOut: () => void
  user: SessionData | null
  session: string | null
  isLoading: boolean
  isSigned: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  session: null,
  isLoading: false,
  isSigned: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(SESSION_KEY)

  const user = React.useMemo(() => {
    if (!session) return null
    return JSON.parse(session) || null
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (user: SessionData) => {
          setSession(JSON.stringify(user))
          setAuthorization(user.access_token)
        },
        signOut: () => {
          setSession(null)
        },
        user,
        session,
        isLoading,
        isSigned: !!session && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
