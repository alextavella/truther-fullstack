import { AppBar } from '@/components/app-bar'
import { Slot } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Layout() {
  return (
    <View style={s.container}>
      <AppBar title="Tokens" />
      <Slot />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
