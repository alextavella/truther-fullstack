import { BrandCoin } from '@/components/coins/brand'
import { Header } from '@/components/header'
import { IconBackButton, IconButton } from '@/components/icon-button'
import { Loading } from '@/components/loading'
import { Text } from '@/components/text'
import { useFavoriteCoins } from '@/hooks/useFavoriteCoins'
import { useGetCoinMarket } from '@/hooks/useGetCoinMarket'
import { CoinMarketService } from '@/services/coins'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

type ParamsProps = {
  slug: string
}

export default function SearchCoins() {
  const { slug: coinId } = useLocalSearchParams<ParamsProps>()
  const { setAsFavorite, isFavorite } = useFavoriteCoins(coinId)
  const { data: coinMarket, isLoading, isError } = useGetCoinMarket(coinId)

  if (isLoading) return <Loading />
  if (isError) return <Redirect href="/" />

  return (
    <View style={s.container}>
      <Header.Root>
        <View style={s.header}>
          <IconBackButton color={colors.gray[100]} />
          <Header.Heading style={s.heading}>
            {coinMarket && (
              <BrandCoin name={coinMarket.name} image={coinMarket.image} />
            )}
          </Header.Heading>
          <IconButton
            name="heart"
            color={isFavorite ? colors.red.dark : colors.gray[100]}
            onPress={() => coinMarket && setAsFavorite(coinMarket)}
          />
        </View>
      </Header.Root>

      <View style={s.content}>
        <Text style={s.contentHeader}>USDT Historical Price</Text>
        {coinMarket && (
          <FlatList
            style={{ width: '100%' }}
            data={Array.from(CoinMarketService.formatCoinMarket(coinMarket))}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, value], index }) => (
              <View
                style={[
                  s.contentInfo,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.gray[200] : colors.gray[100],
                  },
                ]}
              >
                <Text>{key}</Text>
                <Text>{value}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  heading: {
    flex: 1,
  },
  content: {
    marginTop: 32,
  },
  contentHeader: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  contentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})
