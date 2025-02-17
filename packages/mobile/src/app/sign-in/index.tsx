import { Heading } from '@/components/heading'
import RegisterUserForm from '@/components/register-user-form'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function SignIn() {
  return (
    <View style={s.container}>
      <SafeAreaView />
      <Heading>Personal information</Heading>
      <Text style={{ marginBottom: 16 }}>
        We ask for your personal information to verify your identity
      </Text>
      <RegisterUserForm />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingTop: 120,
    paddingHorizontal: 20,
  },
})
