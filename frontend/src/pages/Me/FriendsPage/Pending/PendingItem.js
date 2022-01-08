import React from 'react'
import { useQueryClient } from 'react-query'
import CloseIcon from '../../../../assets/close_icon.svg'
import MarkIcon from '../../../../assets/mark_icon.svg'
import DiscordIcon from '../../../../assets/discord_mini_icon.svg'
import { isIncoming, pendingUserName } from '../utils'
import {
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
} from '../../../../constants/queryKeys'
import {
  cancelPendingRequestApi,
  acceptPendingRequestApi,
} from '../../../../api/friend'
import { GetMe } from '../../../../hooks/redux'
import getSocket from '../../../../api/socket'
import { ME_SOCKET } from '../../../../constants/socket.routes'

const PENDING_WAY = {
  INCOMING: 'Incoming Friend Request',
  OUTGOING: 'Outgoing Friend Request',
}

function pendingStatus(user, request) {
  if (isIncoming(user, request)) return PENDING_WAY.INCOMING

  return PENDING_WAY.OUTGOING
}

export default function PendingItem({ user, pending, toggleModal }) {
  const me = GetMe()

  const cache = useQueryClient()
  const [isLoading, setIsLoading] = React.useState(false)

  const socket = getSocket(me?.tokens?.access?.token)

  async function cancelPending(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      await cancelPendingRequestApi(pending.id)
      if (isIncoming(user, pending)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY)
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
      }

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  async function acceptPending(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const result = await acceptPendingRequestApi(pending.id)
      cache.invalidateQueries(PENDING_REQUESTS_KEY)
      cache.invalidateQueries(ALL_FRIENDS_KEY)

      socket.emit(ME_SOCKET.SEND_ACCEPT_FRIEND_REQUEST, {
        receiverId: result?.data?.from,
      })

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  return (
    <li
      className='p-2 py-3 hover:bg-discord-itemHover cursor-pointer border-t-1 border-discord-backgroundModifierAccent'
      onClick={() => {
        toggleModal(pending)
      }}
    >
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div
              className={`flex justify-center items-center w-8 h-8 bg-discord-${
                isIncoming(user, pending)
                  ? pending?.from?.color
                  : pending?.to?.color
              } text-white hover:text-discord-100 rounded-full`}
            >
              <DiscordIcon className='w-5 h-5' />
            </div>
            <span className='bg-discord-green w-3 h-3 rounded-full absolute right-0 bottom-0 -mr-1 mb-1'></span>
          </div>
          <div className='flex items-start flex-col ml-4'>
            <p className='text-white text-sm font-bold'>
              {pendingUserName(user, pending)}
            </p>
            <p className='text-discord-mainText text-xs'>
              {pendingStatus(user, pending)}
            </p>
          </div>
        </div>

        <div className='flex'>
          {isIncoming(user, pending) && (
            <button
              onClick={acceptPending}
              disabled={isLoading}
              className='flex items-center justify-center p-2 mx-1 rounded-full bg-discord-bgSecondary focus:outline-none'
            >
              <MarkIcon className='fill-current w-5 h-5 text-discord-topIcons hover:text-discord-lightGreen' />
            </button>
          )}

          <button
            onClick={cancelPending}
            disabled={isLoading}
            className='flex items-center justify-center p-2 mx-1 rounded-full bg-discord-bgSecondary focus:outline-none'
          >
            <CloseIcon className='fill-current w-5 h-5 text-discord-topIcons hover:text-discord-redNotif' />
          </button>
        </div>
      </div>
    </li>
  )
}
