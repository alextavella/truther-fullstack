import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { Text as BaseText, TextProps } from 'react-native'

export function Text({ style, ...rest }: TextProps) {
  return (
    <BaseText
      {...rest}
      style={[
        {
          color: colors.gray[600],
          fontFamily: fontFamily.regular,
          fontSize: 16,
          fontWeight: 'regular',
          textAlign: 'left',
        },
        style,
      ]}
    />
  )
}
