import { Text } from '@/components/text'
import { colors } from '@/styles/colors'
import React, { useEffect } from 'react'
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type TextInputProps,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Icon, type IconName } from '../icon'
import { s } from './styles'

type InputFocusEvent = NativeSyntheticEvent<TextInputFocusEventData>

export type InputProps = TextInputProps &
  Partial<{
    icon: IconName
    error: boolean
    helperText: string
  }>

export function Input({
  style,
  placeholder,
  value,
  onBlur,
  onFocus,
  icon,
  error,
  helperText,
  ...rest
}: InputProps) {
  const isFocused = useSharedValue(!!value)

  const labelStyle = useAnimatedStyle(() => ({
    top: withTiming(isFocused.get() ? 4 : 16, { duration: 200 }),
    fontSize: withTiming(isFocused.get() ? 12 : 16, { duration: 200 }),
    // color: isFocused.get() ? colors.gray[500] : colors.gray[300],
    color: colors.gray[500],
  }))

  const errorOpacity = useSharedValue(0)
  const errorTranslateY = useSharedValue(5)

  const errorStyle = useAnimatedStyle(() => ({
    opacity: error
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 }),
  }))

  useEffect(() => {
    if (error) {
      // Animação de entrada do erro (fade-in + slide-up)
      errorOpacity.value = withTiming(1, { duration: 200 })
      errorTranslateY.value = withTiming(0, { duration: 200 })
    } else {
      // Animação de saída do erro (fade-out + slide-down)
      errorOpacity.value = withTiming(0, { duration: 200 })
      errorTranslateY.value = withTiming(5, { duration: 200 })
    }
  }, [error])

  const handleFocus = (e: InputFocusEvent) => {
    isFocused.set(true)
    onFocus?.(e)
  }

  const handleBlur = (e: InputFocusEvent) => {
    if (!value) isFocused.set(false)
    onBlur?.(e)
  }

  return (
    <View style={s.root}>
      <View style={s.container}>
        {icon && (
          <View style={s.icon}>
            <Icon name={icon} size={18} color={colors.gray[500]} />
          </View>
        )}

        <View style={s.content}>
          {/* Label animado */}
          <Animated.Text style={[s.label, labelStyle]}>
            {placeholder}
          </Animated.Text>

          {/* Input */}
          <TextInput
            style={[
              s.input,
              style,
              isFocused.get() && s.inputFocused,
              error && s.inputError,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            {...rest}
          />
        </View>
      </View>

      {/* Error */}
      <Animated.View style={[s.footer, errorStyle]}>
        <Text style={s.error}>{helperText}</Text>
      </Animated.View>
    </View>
  )
}
