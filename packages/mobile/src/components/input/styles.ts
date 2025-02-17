import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: 24,
    position: 'relative',
    width: '100%',
  },
  label: {
    backgroundColor: 'white',
    fontFamily: fontFamily.regular,
    left: 16,
    position: 'absolute',
    paddingHorizontal: 4,
    zIndex: 20,
  },
  input: {
    height: 50,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 16,
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  inputFocused: {
    borderColor: colors.gray[400],
  },
  inputError: {
    borderColor: colors.red.base,
  },
  error: {
    backgroundColor: colors.red.base,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    color: colors.gray[100],
    fontSize: 12,
    paddingTop: 12,
    paddingBottom: 6,
    paddingHorizontal: 12,
    position: 'absolute',
    top: -12,
    width: '100%',
    zIndex: 5,
  },
})
