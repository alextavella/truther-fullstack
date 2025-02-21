import { useRedirect } from '@/hooks/useRedirect'
import React from 'react'
import {
  type NativeSyntheticEvent,
  type TextInputEndEditingEventData,
} from 'react-native'
import { Input, type InputProps } from '../input'

type SearchProps = InputProps

export function Search({ style, ...rest }: SearchProps) {
  const { goToSearchCoins } = useRedirect()
  const [searchText, setSearchText] = React.useState('')

  const handleSearch = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    goToSearchCoins(e.nativeEvent.text)
    setSearchText('')
  }

  return (
    <Input
      style={style}
      autoComplete="off"
      autoCorrect={false}
      autoFocus={false}
      icon="search"
      placeholder="Search"
      value={searchText}
      onChangeText={setSearchText}
      onSubmitEditing={handleSearch}
      {...rest}
    />
  )
}
