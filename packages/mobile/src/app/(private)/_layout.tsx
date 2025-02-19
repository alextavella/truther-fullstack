import { Loading } from '@/components/loading'
import { useSession } from '@/providers/SessionProvider'
import { colors } from '@/styles/colors'
import { Redirect, Slot, Stack } from 'expo-router'
import React from 'react'

export default function PrivateLayout() {
  const { isLoading, isSigned } = useSession()

  if (isLoading) {
    return <Loading />
  }

  if (!isSigned) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.gray[100],
        },
      }}
    >
      <Slot />
    </Stack>
  )
}
