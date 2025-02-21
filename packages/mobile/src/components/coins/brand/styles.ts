import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
  },
  icon: {
    height: 76,
    width: 76,
  },
  name: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
