import { AppBar } from '@/components/app-bar'
import { Button } from '@/components/button'
import { NoCoinsFound } from '@/components/coins/empty'
import { ListCoin } from '@/components/coins/list-item'
import { Loading } from '@/components/loading'
import { useRedirect } from '@/hooks/useRedirect'
import { useSearchCoins } from '@/hooks/useSearchCoins'
import { colors } from '@/styles/colors'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type ParamsProps = {
  slug: string
}

export default function SearchCoins() {
  const { goToDetailsCoins, goToBack } = useRedirect()

  const { slug } = useLocalSearchParams<ParamsProps>()
  const { data: coins, isLoading, isError } = useSearchCoins(slug)

  if (isLoading) return <Loading />
  if (isError) return <Redirect href="/" />

  return (
    <View style={s.container}>
      <AppBar title="Tokens" />
      {!coins?.length ? (
        <NoCoinsFound>
          <Button.Root onPress={goToBack}>
            <Button.Icon name="chevron-left" />
            <Button.Text>go back</Button.Text>
          </Button.Root>
        </NoCoinsFound>
      ) : (
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
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
