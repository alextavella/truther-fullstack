import { render } from '@testing-library/react-native'

import { Input } from './index'

describe('<Input />', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Input placeholder="Name" />)
    expect(getByText('Name')).toBeOnTheScreen()
  })
})
