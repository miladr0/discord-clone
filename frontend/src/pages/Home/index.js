import React from 'react'
import Header from '../../components/Header'
import InnerChannels from '../../components/InnerChannels'
import MessageContainer from '../../components/chat/MessageContainer'
import OnlineUsers from '../../components/OnlineUsers'
import { useLocation } from 'react-router-dom'

export default function Index({
  ProfileWidgetComponent,
  LogoChannelsComponent,
}) {
  const location = useLocation()

  return (
    <div className='flex'>
      <LogoChannelsComponent location={location} />
      <div className='flex flex-1 flex-col min-h-screen h-screen'>
        <Header ProfileWidgetComponent={ProfileWidgetComponent} />
        <div className='flex-1 flex overflow-y-hidden bg-discord-600'>
          <InnerChannels />
          <MessageContainer />
          <div className='flex justify-between'>
            <OnlineUsers />
          </div>
        </div>
      </div>
    </div>
  )
}
