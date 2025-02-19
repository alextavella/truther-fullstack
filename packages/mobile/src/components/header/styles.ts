import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    height: 235,
    width: '100%',
  },
  heading: {
    color: colors.gray[100],
    fontFamily: fontFamily.bold,
    fontSize: 36,
  },
})
