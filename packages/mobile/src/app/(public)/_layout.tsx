import { Stack } from 'expo-router'
import React from 'react'

import { colors } from '@/styles/colors'

export default function PublicLayout() {
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
