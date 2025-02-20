import { AppBar } from '@/components/app-bar'
import { ListCoin } from '@/components/coins/list-item'
import { useRedirect } from '@/hooks/useRedirect'
import { useSearchCoins } from '@/hooks/useSearchCoins'
import { colors } from '@/styles/colors'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type ParamsProps = {
  slug: string
}

export default function SearchCoins() {
  const { slug } = useLocalSearchParams<ParamsProps>()
  const [coins] = useSearchCoins(slug)
  const { goToDetailsCoins } = useRedirect()

  return (
    <View style={s.container}>
      <AppBar title="Tokens" />
      <FlatList
        style={{ width: '100%' }}
        data={coins}
        keyExtractor={item => item.id}
        renderItem={({ index, item }) => (
          <ListCoin.Root
            onPress={() => goToDetailsCoins(item.id)}
            style={{
              backgroundColor:
                index % 2 === 0 ? colors.gray[200] : colors.gray[100],
            }}
          >
            <ListCoin.Icon src={item.image} />
            <ListCoin.Text>{item.name}</ListCoin.Text>
          </ListCoin.Root>
        )}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
