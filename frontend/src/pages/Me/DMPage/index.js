import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MessageContainer from '../../../components/chat/MessageContainer'
import OnlineUsers from '../../../components/OnlineUsers'
import { GetOpenRooms } from '../../../hooks/reactQuery'
import useMessageSocket from '../../../api/socket/useMessageSocket'
import { ROOM_MESSAGES_KEY } from '../../../constants/queryKeys'

export default function Index() {
  const { isLoading, data: rooms } = GetOpenRooms()
  const { user } = useSelector((state) => state.user)
  const { dmId } = useParams()

  let room
  if (dmId && rooms?.length) {
    room = rooms.find((r) => r.id === dmId)
  }

  useMessageSocket(room?.id, ROOM_MESSAGES_KEY(room?.id))

  return (
    <div className='flex flex-1 flex-col min-h-screen h-screen'>
      <Header room={room} user={user} />
      <div className='flex-1 flex overflow-y-hidden bg-discord-600'>
        <MessageContainer room={room} isLoading={isLoading} user={user} />
        {/* <div className='flex justify-between'>
          <OnlineUsers />
        </div> */}
      </div>
    </div>
  )
}
