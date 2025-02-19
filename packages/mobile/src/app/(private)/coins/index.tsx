import { Header } from '@/components/header'
import { Search } from '@/components/search'
import { useRedirect } from '@/hooks/useRedirect'
import { useSession } from '@/providers/SessionProvider'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Coins() {
  const { signOut, user } = useSession()
  const { goToHome } = useRedirect()

  return (
    <>
      <Header.Root>
        <Header.Heading>{user?.name}</Header.Heading>
      </Header.Root>

      <View style={{ flex: 1, alignItems: 'center', top: -20 }}>
        <Search style={{ width: '80%' }} />

        <TouchableOpacity
          onPress={() => {
            signOut()
            goToHome()
          }}
        >
          <Text>Coins</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
