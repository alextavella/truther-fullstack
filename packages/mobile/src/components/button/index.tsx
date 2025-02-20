import { Text } from '@/components/text'
import {
  ActivityIndicator,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors } from '@/styles/colors'
import { Icon, type IconName } from '../icon'
import { s } from './styles'

export type ButtonRootProps = TouchableOpacityProps & {
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

export type ButtonTextProps = TextProps

function ButtonText({ style, ...rest }: ButtonTextProps) {
  return <Text {...rest} style={[s.title, style]} />
}

export type ButtonIconProps = {
  name: IconName
  color?: string
}

function ButtonIcon({ name, color = colors.gray[100] }: ButtonIconProps) {
  return <Icon name={name} color={color} size={24} />
}

export const Button = {
  Root: ButtonRoot,
  Text: ButtonText,
  Icon: ButtonIcon,
}
