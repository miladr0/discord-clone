import React from 'react'
import Header from '../../components/Header'
import InnerChannels from '../../components/InnerChannels'
import MessageContainer from '../../components/chat/MessageContainer'
import OnlineUsers from '../../components/OnlineUsers'

export default function index({
  ProfileWidgetComponent,
  LogoChannelsComponent,
}) {
  return (
    <div className='flex'>
      <LogoChannelsComponent />
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
