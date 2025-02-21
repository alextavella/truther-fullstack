import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  icon: {
    height: 40,
    width: 40,
  },
  text: {
    color: colors.gray[600],
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  price: {
    color: colors.blue.base,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    fontWeight: 'normal',
  },
})
