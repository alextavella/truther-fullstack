import { Loading } from '@/components/loading'
import { WhiteBoard } from '@/components/white-board'
import { useSession } from '@/providers/SessionProvider'
import { Redirect } from 'expo-router'
import React from 'react'

export default function PrivateLayout() {
  const { isLoading, session } = useSession()

  if (isLoading) {
    return <Loading />
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return <WhiteBoard />
}
