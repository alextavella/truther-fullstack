import { Heading } from '@/components/heading'
import { SignInForm } from '@/components/sign-in-form'
import { useRedirect } from '@/hooks/useRedirect'
import { colors } from '@/styles/colors'
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function SignIn() {
  const { goToSignUp, goToCoins } = useRedirect()

  return (
    <View style={s.container}>
      <SafeAreaView />
      <View style={s.content}>
        <Heading>Welcome back</Heading>
        <Text>Sign in to your account</Text>
        <SignInForm style={s.form} onSuccess={goToCoins} />
      </View>
      <View style={s.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={s.redirect}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  form: {
    marginTop: 40,
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 4,
    marginVertical: 40,
  },
  redirect: {
    color: colors.green.base,
  },
})
