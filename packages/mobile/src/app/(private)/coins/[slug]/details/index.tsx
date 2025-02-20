import { CoinLogo } from '@/components/coins/coin-logo'
import { Header } from '@/components/header'
import { IconBackButton, IconButton } from '@/components/icon-button'
import { useCoinMarket } from '@/hooks/useCoinMarket'
import { CoinMarketService } from '@/services/coins/coin-market'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

type ParamsProps = {
  slug: string
}

export default function SearchCoins() {
  const { slug } = useLocalSearchParams<ParamsProps>()
  const [coinMarket] = useCoinMarket(slug)

  return (
    <View style={s.container}>
      <Header.Root>
        <View style={s.header}>
          <IconBackButton color={colors.gray[100]} />
          <Header.Heading style={s.heading}>
            {coinMarket && (
              <CoinLogo name={coinMarket.name} image={coinMarket.image} />
            )}
          </Header.Heading>
          <IconButton name="heart" />
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
