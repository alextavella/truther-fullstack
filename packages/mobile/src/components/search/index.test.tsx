import { render, userEvent } from '@testing-library/react-native'

import { router } from '@/tests/mock/expo/expo-router'
import { Search } from './index'

describe('<Search />', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Search />)
    expect(getByText('Search')).toBeOnTheScreen()
  })

  it('should redirect correctly when searching', async () => {
    const { getByTestId } = render(<Search />)
    const element = getByTestId('search-input')
    const user = userEvent.setup()
    await user.press(element)
    await user.type(element, 'bitcoin', { submitEditing: true })
    expect(router.navigate).toHaveBeenCalledTimes(1)
    expect(router.navigate).toHaveBeenCalledWith('/coins/bitcoin/search')
  })
})
