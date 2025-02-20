import { Icon, type IconName } from '@/components/icon'
import { Text } from '@/components/text'
import { View } from 'react-native'

export type EmptyProps = {
  icon: IconName
  label: string
  children?: React.ReactNode
}

export type DefinedEmptyProps = Omit<EmptyProps, 'label' | 'icon'>

export function Empty({ icon, label, children }: EmptyProps) {
  return (
    <View
      style={{
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={icon} size={64} color="gray" />
      <Text style={{ alignSelf: 'center', paddingVertical: 24 }}>{label}</Text>
      {children}
    </View>
  )
}

export function NoFavoriteCoins(props: DefinedEmptyProps) {
  return <Empty {...props} icon="bookmark" label="No favorite coin" />
}

export function NoCoinsFound(props: DefinedEmptyProps) {
  return <Empty {...props} icon="alert-triangle" label="No coins found" />
}

export function SomethingWrong(props: DefinedEmptyProps) {
  return <Empty {...props} icon="alert-circle" label="Something is wrong!" />
}
