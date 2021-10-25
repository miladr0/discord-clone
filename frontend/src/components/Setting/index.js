import React from 'react'
import Sidebar from './Sidebar'
import Account from './Account'
import CloseIcon from '../../assets/close_icon.svg'

export default function Setting({ onClose }) {
  return (
    <div className='bg-discord-800 flex w-full'>
      <div className='mx-auto flex w-2/3'>
        <Sidebar className='w-64' />
        <div className='flex-1 px-4'>
          <div className='flex justify-between mt-16'>
            <h3 className='text-white text-xl font-bold'>My Account</h3>
            <div className='flex flex-col' onClick={onClose}>
              <button className='rounded-full p-2 flex items-center justify-center hover:bg-discord-closeButton border-2 border-discord-popOutHeader focus:outline-none'>
                <CloseIcon className='fill-current w-4 h-4 text-discord-topIcons' />
              </button>
              <h6 className='text-discord-popOutHeader text-sm text-center'>
                Esc
              </h6>
            </div>
          </div>
          <Account />
        </div>
      </div>
    </div>
  )
}
