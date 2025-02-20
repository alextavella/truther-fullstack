import { colors } from '@/styles/colors'
import React from 'react'
import {
  Dimensions,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { s } from './styles'

const { width } = Dimensions.get('window') // Obtém a largura da tela
const height = (233 / 360) * width // Mantém a proporção original do SVG

function HeaderRoot({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[s.root, style]} {...rest}>
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        width={width}
        height={height}
        viewBox="0 0 360 233"
      >
        <Path
          d="M0 0H364V138.03C364 170.691 364 187.022 354.396 198.249C344.792 209.476 328.659 212.005 296.392 217.065L238.073 226.208C210.093 230.595 196.103 232.789 182 232.789C167.897 232.789 153.907 230.595 125.927 226.208L67.6082 217.065C35.3414 212.005 19.208 209.476 9.60398 198.249C0 187.022 0 170.691 0 138.03V0Z"
          fill={colors.red.base}
        />
      </Svg>
      {children}
    </View>
  )
}

function HeaderHeading({ style, ...rest }: TextProps) {
  return <Text style={[s.heading, style]} {...rest} />
}

export const Header = {
  Root: HeaderRoot,
  Heading: HeaderHeading,
}
