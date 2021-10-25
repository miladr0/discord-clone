import React from 'react'
import { useSelector } from 'react-redux'
import { GetOpenRooms } from '../../../hooks/reactQuery'
import { useRouteMatch } from 'react-router-dom'
import EmptyDmListIcon from '../../../assets/empty_dm_list.svg'
import PlusIcon from '../../../assets/plus_icon.svg'
import DMItem from './DMItem'

function EmptyDmList() {
  return (
    <div className='p-3'>
      <EmptyDmListIcon className='text-discord-600 fill-current' />
    </div>
  )
}

function ShowOpenDms({ user, rooms }) {
  const match = useRouteMatch()

  return rooms.map((room, i) => (
    <DMItem key={i} user={user} room={room} match={match} />
  ))
}

export default function DMList() {
  const { user } = useSelector((state) => state.user)
  const { data: rooms } = GetOpenRooms()

  return (
    <div className='flex-none flex flex-col justify-between w-full'>
      <div className='scrollbar--show--hide flex-1 text-sm mt-2 channels--scrollbar'>
        <ul>
          <li className='text-discord-sideBarChannels hover:text-discord-100 mt-3'>
            <div className='flex justify-between items-center px-3 focus:outline-none '>
              <span className='font-semibold text-xs uppercase tracking-wide cursor-default'>
                DIRECT MESSAGES
              </span>
              <PlusIcon className='fill-current w-4 h-4 text-discord-500 cursor-pointer' />
            </div>
          </li>
        </ul>

        <ul className='p-3'>
          {rooms?.length ? (
            <ShowOpenDms user={user} rooms={rooms} />
          ) : (
            <EmptyDmList />
          )}
        </ul>
      </div>
    </div>
  )
}
