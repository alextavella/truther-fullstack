import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors } from '@/styles/colors'
import { s } from './styles'

type ButtonRootProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function ButtonRoot({
  children,
  style,
  isLoading = false,
  ...rest
}: ButtonRootProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

type ButtonTextProps = TextProps

function ButtonText({ style, ...rest }: ButtonTextProps) {
  return <Text {...rest} style={[s.title, style]} />
}

export const Button = {
  Root: ButtonRoot,
  Text: ButtonText,
}
