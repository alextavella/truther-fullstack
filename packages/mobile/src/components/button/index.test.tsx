import { act, fireEvent, render } from '@testing-library/react-native'

import { Button } from './index'

describe('<Button />', () => {
  const pressFn = jest.fn()

  it('should render correctly', () => {
    const { getByText } = render(
      <Button.Root onPress={pressFn}>
        <Button.Text>Click me</Button.Text>
      </Button.Root>,
    )
    const element = getByText('Click me')
    expect(element).toBeOnTheScreen()
  })

  it('should be clickable', async () => {
    const { getByText } = render(
      <Button.Root onPress={pressFn}>
        <Button.Text>Click me</Button.Text>
      </Button.Root>,
    )
    const element = getByText('Click me')
    await act(async () => {
      fireEvent.press(element)
    })
    expect(pressFn).toHaveBeenCalledTimes(1)
  })

  it('should not be clickable when disabled', async () => {
    const { getByText } = render(
      <Button.Root disabled onPress={pressFn}>
        <Button.Text>Click me</Button.Text>
      </Button.Root>,
    )
    const element = getByText('Click me')
    await act(async () => {
      fireEvent.press(element)
    })
    expect(pressFn).not.toHaveBeenCalledTimes(1)
  })

  it('should show spinner when loading state', async () => {
    const { getByTestId } = render(
      <Button.Root testID="button" isLoading onPress={pressFn}>
        <Button.Text>Click me</Button.Text>
      </Button.Root>,
    )
    const element = getByTestId('button')
    expect(element).not.toHaveTextContent('Click me')
  })
})
