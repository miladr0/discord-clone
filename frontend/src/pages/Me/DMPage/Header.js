import React from 'react'
import friendObject from '../../../utils/friendObject'

import UserPlusIcon from '../../../assets/user_plus_icon.svg'
import CameraIcon from '../../../assets/camera_icon.svg'
import RingPhoneIcon from '../../../assets/ring_phone_icon.svg'
import QuestionMarkIcon from '../../../assets/question_mark_icon.svg'
import InboxIcon from '../../../assets/inbox_icon.svg'
import PinIcon from '../../../assets/pin_icon.svg'
import AtSignIcon from '../../../assets/at_sign_icon.svg'
import OfflineStatusIcon from '../../../assets/offline_status_icon.svg'

export default function Header({ user, room }) {
  let userName
  if (room && user) {
    userName = friendObject(user, room, 'sender.id', 'sender', 'receiver')
      .username
  }

  return (
    <div className='flex text-white h-12 border-b-1 border-discord-900'>
      <div className='flex-1 flex items-center justify-between bg-discord-600 border-b border-discord-900 px-4'>
        <div className='flex items-center'>
          <div className='text-discord-200 text-2xl'>
            <AtSignIcon className='w-6 h-6' />
          </div>
          <h5 className='flex justify-start items-center ml-2 cursor-pointer text-sm text-white font-bold'>
            {userName} <OfflineStatusIcon className='w-4 h-4 ml-1' />
          </h5>
        </div>
        <div className='flex items-center'>
          <a href='#' className='mr-3'>
            <RingPhoneIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
          <a href='#' className='mr-3'>
            <CameraIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
          <a href='#' className='mr-3'>
            <PinIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
          <a href='#' className='mr-3'>
            <UserPlusIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
          <a href='#' className='mr-3'>
            <form className='relative'>
              <input
                type='text'
                placeholder='Search'
                className='w-40 rounded bg-gray-900 placeholder-discord-200 p-1 focus:outline-none leading-normal text-xs'
              />
              <span>
                <svg
                  className='absolute right-0 top-0 w-4 h-4 text-discord-200 mr-2'
                  style={{ top: '6px' }}
                  aria-hidden='false'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z'
                  ></path>
                </svg>
              </span>
            </form>
          </a>
          <a href='#' className='mr-3'>
            <InboxIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
          <a href='#' className='mr-3'>
            <QuestionMarkIcon className='w-6 h-6 text-discord-topIcons hover:text-gray-200' />
          </a>
        </div>
      </div>
    </div>
  )
}
