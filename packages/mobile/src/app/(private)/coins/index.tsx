import { Header } from '@/components/header'
import { useRedirect } from '@/hooks/useRedirect'
import { useSession } from '@/providers/SessionProvider'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Coins() {
  const { signOut, user } = useSession()
  const { goToHome } = useRedirect()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header.Root>
        <Header.Heading>{user?.name}</Header.Heading>
      </Header.Root>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            signOut()
            goToHome()
          }}
        >
          <Text>Coins</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
