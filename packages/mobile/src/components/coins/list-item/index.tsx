import {
  Image,
  Text,
  TouchableOpacity,
  type TextProps,
  type TouchableOpacityProps,
} from 'react-native'
import { s } from './styles'

export type ListCoinItemProps = {
  icon: string
  text: string
}

function ListCoinRoot({ style, ...rest }: TouchableOpacityProps) {
  return <TouchableOpacity style={[s.root, style]} {...rest} />
}

function ListCoinIcon({ src }: { src?: string | null }) {
  if (!src) return null
  return <Image style={s.icon} source={{ uri: src }} />
}

function ListCoinText({ style, children, ...rest }: TextProps) {
  return (
    <Text style={[s.text, style]} {...rest}>
      {children}
    </Text>
  )
}
function ListCoinPrice({ style, children, ...rest }: TextProps) {
  return (
    <Text style={[s.price, style]} {...rest}>
      {children}
    </Text>
  )
}

export const ListCoin = {
  Root: ListCoinRoot,
  Icon: ListCoinIcon,
  Text: ListCoinText,
  Price: ListCoinPrice,
}
