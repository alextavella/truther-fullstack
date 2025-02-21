const { configureReanimatedLogger } = require('react-native-reanimated')

// Router
jest.mock('expo-router', () => require('./src/tests/mock/expo/expo-router'))
// Icons
jest.mock('@expo/vector-icons/Feather', () => require('./src/tests/mock/expo/expo-icons'))
// Reanimated
configureReanimatedLogger({
  level: 'warn',
  strict: false,
})