import { render } from '@testing-library/react-native'

import { Text } from './index'

describe('<Text />', () => {
  test('should render correctly', () => {
    const { getByText } = render(<Text>Welcome!</Text>)
    getByText('Welcome!')
  })

  it('snapshot', async () => {
    const tree = render(<Text>Some text</Text>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
