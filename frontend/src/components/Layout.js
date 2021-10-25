import React from 'react'
import ProfileWidget from './ProfileWidget'
import LogoChannels from './LogoChannels'
import { Me } from '../hooks/reactQuery'

export default function Layout({ Component, user, ...props }) {
  const { data: me } = Me(user?.user)

  return (
    <>
      <Component
        user={me}
        ProfileWidgetComponent={<ProfileWidget user={me} />}
        LogoChannelsComponent={LogoChannels}
        {...props}
      />
    </>
  )
}
