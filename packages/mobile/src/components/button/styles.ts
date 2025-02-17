import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.green.base,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  title: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
})
