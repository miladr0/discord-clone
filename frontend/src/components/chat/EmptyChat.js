import React from 'react'
import friendObject from '../../utils/friendObject'
import Lottie from 'react-lottie'
import animationData from '../../assets/lottie/start-chatting.json'

import DiscordIcon from '../../assets/discord_mini_icon.svg'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export default function EmptyChat({ room, user }) {
  let userName
  if (room && user) {
    userName = friendObject(user, room, 'sender.id', 'sender', 'receiver')
      .username
  }

  return (
    <div className='flex flex-col justify-end p-4'>
      <div className='flex flex-col justify-start w-64'>
        <Lottie
          className='text-left flex justify-start'
          options={defaultOptions}
          height={150}
          width={150}
        />
        <button className='mt-4 bg-discord-experiment500 hover:bg-discord-experiment500Disabled transition-colors duration-300 text-white text-sm py-2 px-3 rounded-mdx focus:outline-none'>
          Wave to {userName}
        </button>
      </div>
    </div>
  )
}
