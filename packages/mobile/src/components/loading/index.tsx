import { ActivityIndicator } from 'react-native'

import { colors } from '@/styles/theme'
import { s } from './styles'

export function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color={colors.green.base}
      style={s.container}
    />
  )
}
