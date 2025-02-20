import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  icon: {
    height: 40,
    width: 40,
  },
  text: {
    color: colors.gray[600],
    fontFamily: fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: colors.blue.base,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    fontWeight: 'normal',
  },
})
