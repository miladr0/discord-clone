import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, Link } from 'react-router-dom'
import classNames from 'classnames'

import { PENDING_REQUESTS_KEY, OPEN_ROOMS } from '../../../constants/queryKeys'
import { DM_URL, ME_PAGE } from '../../../constants/history.constants'
import { getOrCreateRoom, closeDMApi } from '../../../api/room'
import apiErrorHandler from '../../../utils/apiErrorHandler'
import DiscordIcon from '../../../assets/discord_mini_icon.svg'
import LoadingCircle from '../../../assets/loading_circle_icon.svg'
import CloseIcon from '../../../assets/close_icon.svg'

export function friendObject(user, room) {
  if (user?.user?.id === room.sender.id) return room.receiver

  return room.sender
}

export default function DMItem({ user, room, match }) {
  const cache = useQueryClient()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(false)

  function currentPath() {
    if (match?.url) {
      return match?.url === DM_URL(room.id)
    }

    return false
  }

  async function closeDM(e) {
    e.stopPropagation()
    e.preventDefault()

    setIsLoading(true)

    try {
      const { data } = await closeDMApi(room.id)
      setIsLoading(false)

      if (data) {
        cache.invalidateQueries(OPEN_ROOMS)
        history.push(ME_PAGE)
      }
    } catch (err) {
      apiErrorHandler(err)
      setIsLoading(false)
    }
  }

  async function openDM(e) {
    e.stopPropagation()
    e.preventDefault()

    try {
      const { data } = await getOrCreateRoom(friendObject(user, room).id)
      if (data) {
        history.push(DM_URL(data.id))
      }
    } catch (err) {
      apiErrorHandler(err)
    }
  }

  return (
    <li
      className={classNames(
        'w-full px-1 py-1 hover:bg-discord-itemHover rounded cursor-pointer border-t-1 border-discord-backgroundModifierAccent',
        {
          'bg-discord-itemHover': currentPath(),
        }
      )}
      onClick={openDM}
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <Link to={DM_URL(room?.id)} className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div className='flex justify-center items-center w-8 h-8 bg-discord-red text-white hover:text-discord-100 rounded-full'>
              <DiscordIcon className='w-5 h-5' />
            </div>
            <span className='bg-discord-green w-3 h-3 rounded-full absolute right-0 bottom-0 -mr-1 mb-1'></span>
          </div>
          <div className='flex items-start items-center ml-4'>
            <p
              className={classNames(' text-base', {
                'text-white': currentPath(),
                'text-discord-sideBarChannels': !currentPath(),
              })}
            >
              {friendObject(user, room).username}
            </p>
          </div>
        </div>

        <div className='flex'>
          {showCloseButton && (
            <button className='flex items-center justify-end p-2 rounded-full focus:outline-none z-10'>
              {isLoading ? (
                <LoadingCircle className='animate-spin h-4 w-4 text-discord-100' />
              ) : (
                <CloseIcon
                  onClick={closeDM}
                  className='fill-current w-4 h-4 text-discord-topIcons hover:text-discord-100'
                />
              )}
            </button>
          )}
        </div>
      </Link>
    </li>
  )
}
