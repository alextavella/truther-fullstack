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

export function Search({ ...rest }: SearchProps) {
  const { goToSearchCoins } = useRedirect()
  const [searchText, setSearchText] = React.useState('')

  const handleSearch = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    goToSearchCoins(e.nativeEvent.text)
    setSearchText('')
  }

  return (
    <View {...rest}>
      <Input
        testID="search-input"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={false}
        icon="search"
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  )
}
