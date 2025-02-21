import { router } from 'expo-router'

export function useRedirect() {
  return {
    goToHome: () => {
      router.dismissTo('/')
    },
    goToSignIn: () => {
      router.navigate(`/sign-in`)
    },
    goToSignUp: () => {
      router.navigate(`/sign-up`)
    },
    goToCoins: () => {
      router.navigate(`/coins`)
    },
    goToSearchCoins: (slug: string) => {
      router.navigate(`/coins/${slug}/search`)
    },
    goToDetailsCoins: (slug: string) => {
      router.navigate(`/coins/${slug}/details`)
    },
    goToBack: () => {
      if (router.canGoBack()) router.back()
      else router.dismissAll()
    },
  }
}
