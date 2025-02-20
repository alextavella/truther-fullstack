import { COIN_IMAGE_FALLBACK } from '@/config/coin'
import { Image, Text, View } from 'react-native'
import { s } from './styles'

export type CoinLogoProps = {
  name: string
  image?: string
}

export function CoinLogo({ name, image = COIN_IMAGE_FALLBACK }: CoinLogoProps) {
  return (
    <View style={s.container}>
      <Image source={{ uri: image }} style={s.icon} />
      <Text style={s.name} numberOfLines={2} ellipsizeMode="tail">
        {name}
      </Text>
    </View>
  )
}
