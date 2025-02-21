import { View } from 'react-native'

export const router = {
  back: jest.fn(),
  canGoBack: jest.fn(),
  push: jest.fn(),
  navigate: jest.fn(),
  replace: jest.fn(),
  dismiss: jest.fn(),
  dismissTo: jest.fn(),
  dismissAll: jest.fn(),
  setParams: jest.fn(),
  reload: jest.fn(),
}

export const useRouter = jest.fn(() => router)

export const useLocalSearchParams = jest.fn(() => ({}))

export const useSegments = jest.fn(() => [])

export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
}

export const useNavigation = jest.fn(() => navigation)

export const Link = ({ href, children }: any) => <View>{children}</View>

export const Redirect = jest.fn()
