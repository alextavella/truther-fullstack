import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'

export function WhiteBoard() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.gray[100],
        },
      }}
    />
  )
}
