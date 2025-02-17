import { Text, type TextProps } from 'react-native'
import { s } from './styles'

export type HeadingProps = TextProps

export function Heading({ style, children }: HeadingProps) {
  return <Text style={[s.text, style]}>{children}</Text>
}
