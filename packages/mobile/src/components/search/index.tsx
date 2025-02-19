import { useRedirect } from '@/hooks/useRedirect'
import React from 'react'
import {
  View,
  type NativeSyntheticEvent,
  type TextInputEndEditingEventData,
  type ViewProps,
} from 'react-native'
import { Input } from '../input'

type SearchProps = ViewProps

export function Search({ style, ...rest }: SearchProps) {
  const { goToSearchCoins } = useRedirect()
  const [searchText, setSearchText] = React.useState('ethereum')

  const handleSearch = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    goToSearchCoins(e.nativeEvent.text)
  }

  return (
    <View style={style} {...rest}>
      <Input
        icon="search"
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        onEndEditing={handleSearch}
        {...rest}
      />
    </View>
  )
}
