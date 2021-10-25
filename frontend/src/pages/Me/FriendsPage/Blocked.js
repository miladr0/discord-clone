import React from 'react'
import BlockedUsersIcon from '../../../assets/blocked_users_icon.svg'

function EmptyState() {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <BlockedUsersIcon className='fill-current w-85  h-85' />
      <p className='p-2 text-discord-popOutHeader mt-6'>
        You can't unblock the Wumpus.
      </p>
    </div>
  )
}

export default function Blocked() {
  return (
    <div className='flex h-full flex-1'>
      <EmptyState />
    </div>
  )
}
