import { ListCoin } from '@/components/coins/list-item'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
import { useFavoriteCoins } from '@/hooks/useFavoriteCoins'
import { useRedirect } from '@/hooks/useRedirect'
import { useSession } from '@/providers/SessionProvider'
import { NumberUtils } from '@/services/utils/number'
import { colors } from '@/styles/colors'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function Coins() {
  const { user } = useSession()
  const { goToDetailsCoins } = useRedirect()
  const { data: favoriteCoins } = useFavoriteCoins()

  return (
    <>
      <Header.Root>
        <Header.Heading>Welcome, {user?.name}</Header.Heading>
      </Header.Root>

      <View style={{ flex: 1, alignItems: 'center', top: -20 }}>
        <Search style={{ width: '80%' }} />

        <FlatList
          style={{ width: '100%' }}
          data={favoriteCoins}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ListCoin.Root
              onPress={() => goToDetailsCoins(item.id)}
              style={{
                backgroundColor:
                  index % 2 === 0 ? colors.gray[200] : colors.gray[100],
              }}
            >
              <ListCoin.Icon src={item.image} />
              <ListCoin.Text>{item.name}</ListCoin.Text>
              <ListCoin.Price>
                {NumberUtils.formatCurrency(item.volume)}
              </ListCoin.Price>
            </ListCoin.Root>
          )}
        />
      </View>
    </>
  )
}
