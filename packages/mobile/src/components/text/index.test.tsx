import { render } from '@testing-library/react-native'

import { Text } from './index'

describe('<Text />', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Text>Welcome!</Text>)
    expect(getByText('Welcome!')).toBeOnTheScreen()
  })

  it('snapshot', async () => {
    const tree = render(<Text>Some text</Text>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
