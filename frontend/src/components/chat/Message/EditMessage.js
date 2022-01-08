import React, { useCallback, useEffect, useState } from 'react'
import { editMessage } from '../../../api/messages'
import { useQueryClient } from 'react-query'
import { ROOM_MESSAGES_KEY } from '../../../constants/queryKeys'
import { ROOM_SOCKET } from '../../../constants/socket.routes'

import getSocket from '../../../api/socket'
import { GetMe } from '../../../hooks/redux'

export default function EditMessage({ chat, onClose }) {
  const me = GetMe()

  const { message, id } = chat
  const [textMessage, setTextMessage] = useState(message)

  const cache = useQueryClient()

  const socket = getSocket(me.tokens?.access?.token)

  const closeOnEscape = useCallback((event) => {
    event = event || window.event

    let isEscape = false
    if ('key' in event) {
      isEscape = event.key === 'Escape' || event.key === 'Esc'
    } else {
      isEscape = event.keyCode === 27
    }

    if (isEscape) {
      onClose()
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape, true)

    return function cleanUp() {
      return document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  async function handleInputSubmit(e) {
    if (e.key === 'Enter') {
      if (!textMessage || !textMessage.trim()) return

      try {
        const { data } = await editMessage(id, textMessage.trim())

        // populate actual sender object
        data.senderId = me?.user

        cache.setQueryData(ROOM_MESSAGES_KEY(data.roomId), (d) => {
          let index = -1
          let editId = -1
          let alreadyFound = false

          d?.pages.forEach((p, i) => {
            const foundIndex = p.results.findIndex((m) => m.id === data.id)

            if (foundIndex !== -1 && alreadyFound === false) {
              editId = foundIndex
              alreadyFound = true
              index = i
            }
          })

          if (index !== -1 && editId !== -1) {
            d.pages[index].results[editId] = data
          }

          return d
        })

        // notify by socket
        socket.emit(ROOM_SOCKET.ROOM_SEND_EDIT_MESSAGE, data)

        onClose()
      } catch (e) {
        console.log('e: ', e)
      }
    }
  }

  return (
    <div className='w-full flex'>
      <div className='relative w-full bg-discord-chatInputBg flex items-center m-4 rounded-lg p-1 mb-5'>
        <div className='w-full flex flex-1 bg-discord-chatInputBg'>
          <input
            type='text'
            className='flex-1 bg-discord-chatInputBg placeholder-discord-200 p-1 text-discord-100 text-sm focus:outline-none leading-normal'
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={handleInputSubmit}
          />
        </div>
        <div className='flex items-center'>
          <div>
            <button className='flex items-center p-2 text-discord-topIcons hover:text-discord-100  rounded-lg inline-block'>
              <svg
                className='w-6 h-6 text-center mx-auto'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 36 36'
              >
                <path
                  fill='currentColor'
                  d='M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18'
                />
                <ellipse fill='#664500' cx='11.5' cy='12.5' rx='2.5' ry='5.5' />
                <ellipse fill='#664500' cx='24.5' cy='12.5' rx='2.5' ry='5.5' />
                <path
                  fill='#664500'
                  d='M18 22c-3.623 0-6.027-.422-9-1-.679-.131-2 0-2 2 0 4 4.595 9 11 9 6.404 0 11-5 11-9 0-2-1.321-2.132-2-2-2.973.578-5.377 1-9 1z'
                />
                <path fill='#FFF' d='M9 23s3 1 9 1 9-1 9-1-2 4-9 4-9-4-9-4z' />
              </svg>
            </button>
          </div>
        </div>
        <p className='text-white text-xxs absolute -bottom-4'>
          escape to{' '}
          <span
            onClick={() => onClose()}
            className='text-discord-textLink hover:underline cursor-pointer'
          >
            cancel
          </span>{' '}
          • enter to{' '}
          <span
            onClick={() => onClose()}
            className='text-discord-textLink hover:underline cursor-pointer'
          >
            save
          </span>
        </p>
      </div>
    </div>
  )
}
