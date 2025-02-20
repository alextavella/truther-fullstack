import { fontFamily } from '@/styles/font-family'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
})
