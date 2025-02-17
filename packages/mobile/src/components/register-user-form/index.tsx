import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { CreateUserBodyRole } from '@/data/model'
import { createUser } from '@/data/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { registerUserSchema } from './schema'
import { s } from './styles'

type Inputs = {
  name: string
  email: string
  password: string
}

export type RegisterUserFormProps = {
  onRegistered?: (data: Inputs) => void
}

export default function RegisterUserForm({
  onRegistered,
}: RegisterUserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: 'Alex Tavella',
      email: 'alextavella@outlook.com',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: CreateUserBodyRole.customer,
    })
      .then(() => {
        console.log('User created')
        onRegistered?.(data)
      })
      .catch(console.error)
  })

  return (
    <View style={s.container}>
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

      <Button.Root disabled={isSubmitting || !isValid} style={s.footer}>
        <Button.Text onPress={onSubmit}>Register</Button.Text>
      </Button.Root>
    </View>
  )
}
