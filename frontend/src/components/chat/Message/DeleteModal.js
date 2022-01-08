import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { ROOM_MESSAGES_KEY } from '../../../constants/queryKeys'

import Modal from '../../shared/Modal'
import { chatMainTime } from '../../../utils/dateUtils'
import { deleteMessage } from '../../../api/messages'
import LoadingCircle from '../../../assets/loading_circle_icon.svg'
import getSocket from '../../../api/socket'
import { ROOM_SOCKET } from '../../../constants/socket.routes'
import { GetMe } from '../../../hooks/redux'
export default function DeleteModal({
  chat,
  showDeleteModal,
  toggleDeleteModal,
}) {
  const me = GetMe()

  const { senderId, message, id, roomId } = chat
  const [loading, setLoading] = useState(false)

  const socket = getSocket(me.tokens?.access?.token)

  const cache = useQueryClient()

  async function handleDelete(e) {
    e.preventDefault()

    setLoading(true)
    try {
      await deleteMessage(id)
      setLoading(false)

      socket.emit(ROOM_SOCKET.SEND_ROOM_DELETE_MESSAGE, {
        roomId,
        messageId: id,
      })

      cache.setQueryData(ROOM_MESSAGES_KEY(roomId), (d) => {
        let index = -1
        d?.pages?.forEach((p, i) => {
          if (p.results.findIndex((m) => m.id === id) !== -1) index = i
        })
        if (index !== -1) {
          d.pages[index].results = d?.pages[index].results.filter(
            (m) => m.id !== id
          )
        }
        return d
      })

      toggleDeleteModal()
    } catch (err) {
      console.log('err: ', err)
      setLoading(false)
    }
  }

  return (
    <Modal show={showDeleteModal} onClose={toggleDeleteModal} center>
      <div className='w-full md:w-1/2 flex flex-col mx-4 mx-auto bg-discord-selectMuted'>
        <div className='w-full  relative flex flex-col items-center justify-center p-4'>
          <h4 className='w-full text-xl font-bold text-white text-left'>
            Delete Message
          </h4>
          <p className='w-full text-sm mt-2 text-discord-mainText text-left'>
            Are you sure you want to delete this message?
          </p>
        </div>

        <div className='w-full  flex flex-col'>
          <div className='flex justify-start items-start mx-2 px-2 my-4 shadow-lg'>
            <div className='flex justify-center'>
              <a
                href='#'
                className={`flex items-center mx-auto w-10 h-10 bg-discord-${chat?.senderId?.color} text-white rounded-full inline-block`}
              >
                <svg
                  className='w-6 h-6 text-center mx-auto'
                  aria-hidden='false'
                  width='28'
                  height='20'
                  viewBox='0 0 28 20'
                >
                  <path
                    fill='currentColor'
                    d='M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z'
                  ></path>
                </svg>
              </a>
            </div>
            <div className='flex flex-col ml-4'>
              <div className='flex items-center'>
                <a href='#' className='text-white hover:underline text-sm'>
                  {senderId.username}
                </a>
                <span className='text-discord-sideBarChannels ml-2 text-xxs'>
                  {chatMainTime(chat.createdAt)}
                </span>
              </div>
              <div className='overflow-y-auto'>
                <p className='break-all text-discord-100 text-sm font-light text-left'>
                  {message}
                </p>
              </div>
            </div>
          </div>

          <div className='flex bg-discord-700 justify-end p-4 items-center'>
            <button
              className='focus:outline-none text-sm text-white mr-4 hover:underline'
              onClick={toggleDeleteModal}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className='bg-discord-red2 focus:outline-none hover:bg-discord-red2Hover text-sm rounded-md text-white p-2 px-6'
            >
              {loading ? (
                <LoadingCircle className='animate-spin h-5 w-5 text-white mx-auto' />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
