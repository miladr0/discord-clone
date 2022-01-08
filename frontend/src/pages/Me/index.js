import React from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import InnerProfile from './InnerProfile'
import Friends from './FriendsPage'
import DMPage from './DMPage'
import { ME_PAGE } from '../../constants/history.constants'
import useMeSocket from '../../api/socket/useMeSocket'

export default function Index({
  ProfileWidgetComponent,
  LogoChannelsComponent,
}) {
  useMeSocket()

  const match = useRouteMatch()
  const location = useLocation()
  return (
    <div className='flex'>
      <LogoChannelsComponent location={location} />
      <div className='flex flex-1 flex min-h-screen h-screen w-full bg-discord-700'>
        <InnerProfile
          ProfileWidgetComponent={ProfileWidgetComponent}
          location={location}
        />
        {match?.url === ME_PAGE ? <Friends /> : <DMPage />}
      </div>
    </div>
  )
}
