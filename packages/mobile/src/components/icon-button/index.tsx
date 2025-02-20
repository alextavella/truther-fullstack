import {
  Button,
  type ButtonIconProps,
  type ButtonRootProps,
} from '@/components/button'
import { useRedirect } from '@/hooks/useRedirect'

export type IconButtonProps = ButtonRootProps & ButtonIconProps

export function IconButton({ name, color, ...rest }: IconButtonProps) {
  return (
    <Button.Root style={{ backgroundColor: 'none', width: 'auto' }} {...rest}>
      <Button.Icon name={name} color={color} />
    </Button.Root>
  )
}

export type IconBackButtonProps = Omit<IconButtonProps, 'name'>

export function IconBackButton({ ...rest }: Omit<IconBackButtonProps, 'name'>) {
  const { goToBack } = useRedirect()

  return (
    <IconButton
      {...rest}
      name="arrow-left"
      testID="back-button"
      onPress={goToBack}
    />
  )
}
