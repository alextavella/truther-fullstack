import { useRedirect } from '@/hooks/useRedirect'
import { colors } from '@/styles/colors'
import { Button } from '../button'

export function BackButton() {
  const { goToBack } = useRedirect()

  return (
    <Button.Root
      style={{ backgroundColor: 'none', width: 'auto' }}
      testID="back-button"
      onPress={goToBack}
    >
      <Button.Icon name="arrow-left" color={colors.blue.base} />
    </Button.Root>
  )
}
