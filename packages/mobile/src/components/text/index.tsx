import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { Text as BaseText, TextProps } from 'react-native'

export function Text({ style, ...rest }: TextProps) {
  return (
    <BaseText
      style={[
        { fontFamily: fontFamily.regular, color: colors.gray[400] },
        style,
      ]}
      {...rest}
    />
  )
}
