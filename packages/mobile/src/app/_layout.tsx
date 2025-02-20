import { Loading } from '@/components/loading'
import { AppProvider } from '@/providers/AppProvider'
import { Slot, SplashScreen } from 'expo-router'
import React from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated'

import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from '@expo-google-fonts/dm-sans'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function Layout() {
  const [fontsLoaded] = useFonts([
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  ])

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView>
      <StatusBar translucent />
      <AppProvider>
        <Slot />
      </AppProvider>
    </GestureHandlerRootView>
  )
}
