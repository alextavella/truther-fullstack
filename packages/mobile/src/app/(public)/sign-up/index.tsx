import { Heading } from '@/components/heading'
import { SignUpForm } from '@/components/sign-up-form'
import { useRedirect } from '@/hooks/useRedirect'
import { colors } from '@/styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function SignUp() {
  const { goToBack, goToCoins } = useRedirect()

  return (
    <View style={s.container}>
      <SafeAreaView />
      <View style={s.content}>
        <Heading>Personal information</Heading>
        <Text>
          We ask for your personal information to verify your identity
        </Text>
        <SignUpForm style={s.form} onSuccess={goToCoins} />
      </View>
      <View style={s.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={goToBack}>
          <Text style={s.redirect}>Sign In</Text>
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
