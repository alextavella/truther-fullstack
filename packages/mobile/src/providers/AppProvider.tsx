import { SessionProvider } from './SessionProvider'

export function AppProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
