import { useRedirect } from '@/hooks/useRedirect'
import { useSession } from '@/providers/SessionProvider'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Coins() {
  const { signOut } = useSession()
  const { goToBack } = useRedirect()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          signOut()
          goToBack()
        }}
      >
        <Text>Coins</Text>
      </TouchableOpacity>
    </View>
  )
}
