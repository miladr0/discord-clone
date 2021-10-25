import React from 'react'
import friendObject from '../../utils/friendObject'

import DiscordIcon from '../../assets/discord_mini_icon.svg'

export default function EmptyChat({ room, user }) {
  let userName
  if (room && user) {
    userName = friendObject(user, room, 'sender.id', 'sender', 'receiver')
      .username
  }

  return (
    <div className='flex flex-col justify-end p-4'>
      <div className='relative flex items-center justify-start'>
        <div className='flex justify-center items-center w-20 h-20 bg-discord-red text-white rounded-full'>
          <DiscordIcon className='w-12 h-12' />
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <h1 className='text-white text-3xl font-bold'>{userName}</h1>
        <p className='text-discord-mainText text-sm'>
          This is the beginning of your direct message history with{' '}
          <span className='font-semibold'>@{userName}.</span>
        </p>
        <div className='flex mt-4'>
          <p className='text-discord-mainText text-sm'>No servers in common</p>
          <div className='flex ml-8'>
            <button className='bg-discord-darkButton1 transition-colors duration-300 hover:bg-discord-popOutHeader text-white text-smx py-1 px-3 rounded-mdx focus:outline-none'>
              Remove friend
            </button>
            <button className='ml-2 bg-discord-darkButton1 transition-colors duration-300 hover:bg-discord-popOutHeader text-white text-smx py-1 px-3 rounded-mdx focus:outline-none'>
              Block
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
