import type { GetUser200 } from '@/data/model'
import { useStorageState } from '@/hooks/useStorageState'
import React, { createContext, useContext, type PropsWithChildren } from 'react'

type SessionData = GetUser200

const AuthContext = createContext<{
  signIn: (user: SessionData) => void
  signOut: () => void
  user: SessionData | null
  session: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  session: null,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

const SESSION_KEY = '@truther/session'

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = React.useState<SessionData | null>(null)
  const [[isLoading, session], setSession] = useStorageState(SESSION_KEY)

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: SessionData) => {
          setUser(user)
          setSession(user?.access_token)
        },
        signOut: () => {
          setUser(null)
          setSession(null)
        },
        user,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
