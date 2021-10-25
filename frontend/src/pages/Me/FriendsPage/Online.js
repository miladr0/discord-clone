import React from 'react'
import NoOnlineIcon from '../../../assets/no_online_friends.svg'

function EmptyState() {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <NoOnlineIcon className='fill-current w-85  h-85' />
      <p className='p-2 text-discord-popOutHeader mt-6'>
        No one's around to play with Wumpus.
      </p>
    </div>
  )
}

export default function Online() {
  return (
    <div className='flex h-full flex-1'>
      <EmptyState />
    </div>
  )
}
