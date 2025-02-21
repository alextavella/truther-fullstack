import { Button } from '@/components/button'
import { Input } from '@/components/input'
import type { GetUser200 } from '@/data/model'
import { getUser } from '@/data/store'
import { useSession } from '@/providers/SessionProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View, type ViewProps } from 'react-native'
import { signInSchema } from './schema'
import { s } from './styles'

type Inputs = {
  email: string
  password: string
}

export type SignInFormProps = ViewProps & {
  onSuccess?: (data: GetUser200) => void
}

export function SignInForm({ onSuccess, style, ...rest }: SignInFormProps) {
  const { signIn } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    getUser({ email: data.email, password: data.password })
      .then(user => {
        signIn(user)
        onSuccess?.(user)
      })
      .catch(() => Alert.alert('Error', 'Usuário ou senha inválidos'))
  })

  return (
    <View style={[s.container, style]} {...rest}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            autoCorrect={false}
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

      <Button.Root
        style={s.button}
        onPress={onSubmit}
        disabled={isSubmitting || !isValid}
      >
        <Button.Icon name="chevron-right" />
      </Button.Root>
    </View>
  )
}
