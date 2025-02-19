import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
  },
  container: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 50,
    width: '100%',
    zIndex: 10,
  },
  icon: {
    pointerEvents: 'none',
    width: 18,
    height: 18,
  },
  content: {
    position: 'relative',
    width: '100%',
    zIndex: 10,
  },
  label: {
    fontFamily: fontFamily.regular,
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 15,
  },
  input: {
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
    fontSize: 16,
    height: 50,
    paddingTop: 16,
    paddingBottom: 8,
    width: '90%',
  },
  inputFocused: {
    borderColor: colors.gray[400],
  },
  inputError: {
    borderColor: colors.red.base,
  },
  footer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 4,
    width: '100%',
    zIndex: 5,
  },
  error: {
    backgroundColor: colors.red.base,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    color: colors.gray[100],
    fontFamily: fontFamily.regular,
    fontSize: 12,
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
})
