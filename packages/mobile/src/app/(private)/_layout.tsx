import { Loading } from '@/components/loading'
import { useSession } from '@/providers/SessionProvider'
import { colors } from '@/styles/colors'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

export default function PrivateLayout() {
  const { isLoading, isSigned, user } = useSession()

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
    />
  )
}
