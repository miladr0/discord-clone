import React from 'react'
import { chatDividerFormat } from '../../utils/dateUtils'

export default function Divider({ date }) {
  return (
    <div className='flex h-1 border-b-1 justify-center text-center border-discord-backgroundModifierAccent mx-4 my-2'>
      <span className='px-4 py-2 bg-discord-selectMuted text-discord-popOutHeader text-xxs'>
        {chatDividerFormat(date)}
      </span>
    </div>
  )
}
