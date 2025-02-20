import { colors } from '@/styles/colors'
import { View, type ViewProps } from 'react-native'
import { Heading } from '../heading'
import { IconBackButton } from '../icon-button'
import { s } from './styles'

export type AppBarProps = ViewProps & {
  title: string
}

export function AppBar({ style, title, ...rest }: AppBarProps) {
  return (
    <View style={s.content} {...rest}>
      <IconBackButton color={colors.blue.base} />
      <Heading style={s.title}>{title}</Heading>
      <View style={{ width: 58 }} />
    </View>
  )
}
