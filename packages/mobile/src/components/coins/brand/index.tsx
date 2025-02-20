import { Text } from '@/components/text'
import { COIN_IMAGE_FALLBACK } from '@/config/coin'
import { Image, View } from 'react-native'
import { s } from './styles'

export type BrandCoinProps = {
  name: string
  image?: string
}

export function BrandCoin({
  name,
  image = COIN_IMAGE_FALLBACK,
}: BrandCoinProps) {
  return (
    <View style={s.container}>
      <Image source={{ uri: image }} style={s.icon} />
      <Text style={s.name} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
    </View>
  )
}
