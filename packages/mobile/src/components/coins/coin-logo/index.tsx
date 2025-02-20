import { Image, Text, View } from 'react-native'
import { s } from './styles'

export type CoinLogoProps = {
  name: string
  image?: string
}

const IMAGE_DEFAULT =
  'https://static-00.iconduck.com/assets.00/generic-cryptocurrency-icon-2048x2048-011eiq5o.png'

export function CoinLogo({ name, image = IMAGE_DEFAULT }: CoinLogoProps) {
  return (
    <View style={s.container}>
      <Image source={{ uri: image }} style={s.icon} />
      <Text style={s.name} numberOfLines={2} ellipsizeMode="middle">
        {name}
      </Text>
    </View>
  )
}
