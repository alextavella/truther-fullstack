import { View, type ViewProps } from 'react-native'
import { BackButton } from '../back-button'
import { Heading } from '../heading'
import { s } from './styles'

export type AppBarProps = ViewProps & {
  title: string
}

export function AppBar({ style, title, ...rest }: AppBarProps) {
  return (
    <View style={s.content} {...rest}>
      <BackButton />
      <Heading style={s.title}>{title}</Heading>
      <View style={{ width: 58 }} />
    </View>
  )
}
