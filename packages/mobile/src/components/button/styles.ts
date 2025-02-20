import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.green.base,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 14,
    width: 'auto',
  },
  text: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    width: 'auto',
  },
})
