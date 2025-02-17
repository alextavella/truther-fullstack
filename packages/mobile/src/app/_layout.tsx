import { AppProvider } from '@/providers/AppProvider'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
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

import { Loading } from '@/components/loading'
import { colors } from '@/styles/theme'

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.gray[100],
            },
          }}
        />
      </AppProvider>
    </GestureHandlerRootView>
  )
}
