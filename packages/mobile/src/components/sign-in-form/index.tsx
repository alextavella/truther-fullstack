import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View, type ViewProps } from 'react-native'
import { signInSchema } from './schema'
import { s } from './styles'

type Inputs = {
  email: string
  password: string
}

export type SignInFormProps = ViewProps & {
  onSuccess?: (data: Inputs) => void
}

export function SignInForm({ onSuccess, style, ...rest }: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'alextavella@outlook.com',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    console.log(data)
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
