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
    goToBack: () => {
      router.back()
    },
  }
}
