import { ListCoin } from '@/components/coins/list-item'
import { useSearchCoins } from '@/hooks/useSearchCoins'
import { colors } from '@/styles/colors'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

type ParamsProps = {
  slug: string
}

export default function SearchCoins() {
  const { slug } = useLocalSearchParams<ParamsProps>()
  const [coins] = useSearchCoins(slug)

  return (
    <>
      <FlatList
        style={{ width: '100%' }}
        data={coins}
        keyExtractor={item => item.id}
        renderItem={({ index, item }) => (
          <ListCoin.Root
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
    </>
  )
}
