import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView, Text, View } from 'react-native'
import { z } from 'zod'
import { s } from './styles'

type Inputs = {
  name: string
  email: string
  password: string
}

const schema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z
      .string()
      .email('E-mail must be valid')
      .min(6, 'E-mail must be at least 6 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .required()

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'Alex Tavella',
      email: 'alextavella@outlook.com',
      password: '',
    },
  })

  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <View style={s.container}>
      <SafeAreaView />
      <Heading>Personal information</Heading>
      <Text style={{ marginBottom: 16 }}>
        We ask for your personal information to verify your identity
      </Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoFocus
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCorrect={true}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            secureTextEntry
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
        name="password"
      />

      <Button.Root style={s.footer}>
        <Button.Text onPress={onSubmit}>Register</Button.Text>
      </Button.Root>
    </View>
  )
}
