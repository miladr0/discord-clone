import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import DMList from './DMList'
import { ME_PAGE } from '../../constants/history.constants'
import checkCurrentPath from '../../utils/checkCurrentPath'

import FriendsIcon from '../../assets/friends.svg'
import StageDiscoveryIcon from '../../assets/stage_discovery.svg'
import NitroIcon from '../../assets/nitro_icon.svg'
//
export default function Header({ ProfileWidgetComponent, location }) {
  return (
    <div className='relative w-64 bg-discord-700 flex flex-col items-center border-b border-discord-900  scrollbar--show--hide channels--scrollbar justify-between'>
      <div className='flex flex-col w-full'>
        <div className='px-3 w-full mt-2'>
          <form className='w-full '>
            <input
              type='text'
              placeholder='Find or start a conversation'
              className='rounded-smx w-full h-7 text-white p-1 pl-2 bg-gray-900 placeholder-discord-200 focus:outline-none leading-normal text-xsl'
            />
          </form>
        </div>
        <ul className='p-2 mt-1 px-3 w-full'>
          <li
            className={classNames(
              'w-full p-1 hover:curser-pointer hover:text-discord-100 hover:bg-discord-itemHover',
              {
                'text-discord-100': checkCurrentPath(location, ME_PAGE),
                'bg-discord-itemHover': checkCurrentPath(location, ME_PAGE),
                'text-discord-sideBarChannels': !checkCurrentPath(
                  location,
                  ME_PAGE
                ),
              }
            )}
          >
            <div className='flex justify-start'>
              <FriendsIcon className='w-5 h-5 mr-3' />
              <NavLink to={ME_PAGE} className='w-full text-sm font-semibold'>
                <span className='inline-block'></span>
                Friends
              </NavLink>
            </div>
          </li>
          <li className='w-full mt-2 p-1 text-discord-sideBarChannels hover:curser-pointer hover:text-discord-100 hover:bg-discord-itemHover'>
            <div className='flex justify-start '>
              <StageDiscoveryIcon className='w-5 h-5 mr-3' />
              <a href='#' className='text-sm font-semibold w-full'>
                <span className='inline-block'></span>
                Stage Discovery
              </a>
            </div>
          </li>
          <li className='w-full mt-3 p-1 text-discord-sideBarChannels hover:curser-pointer hover:text-discord-100 hover:bg-discord-itemHover'>
            <div className='flex justify-start'>
              <NitroIcon className='w-5 h-5 mr-3' />
              <a href='#' className='text-sm font-semibold w-full'>
                <span className='inline-block'></span>
                Nitro
              </a>
            </div>
          </li>
        </ul>
        <div className='flex-1 flex overflow-y-hidden'>
          <DMList />
        </div>
      </div>

      {ProfileWidgetComponent}
    </div>
  )
}
