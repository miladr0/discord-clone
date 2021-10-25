import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, Link } from 'react-router-dom'
import ThreeDotIcon from '../../../../assets/three_dot_icon.svg'
import DMIcon from '../../../../assets/dm_icon.svg'
import DiscordIcon from '../../../../assets/discord_mini_icon.svg'
import { OPEN_ROOMS } from '../../../../constants/queryKeys'
import { DM_URL } from '../../../../constants/history.constants'
import LoadingCircle from '../../../../assets/loading_circle_icon.svg'
import { getOrCreateRoom } from '../../../../api/room'
import { isIncoming } from '../utils'
import AlertModal from '../../../../components/shared/Modal/AlertModal'
import apiErrorHandler from '../../../../utils/apiErrorHandler'

export function friendObject(user, request) {
  if (isIncoming(user, request)) return request.from

  return request.to
}

export default function PendingItem({ user, friend, toggleModal }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const cache = useQueryClient()
  const history = useHistory()

  function closeAlert(e) {
    e.stopPropagation()
    setShowAlert(false)
  }

  async function openDM(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const { data } = await getOrCreateRoom(friendObject(user, friend).id)
      if (data) {
        cache.invalidateQueries(OPEN_ROOMS)
        history.push(DM_URL(data.id))
      }
      setIsLoading(false)
    } catch (err) {
      const result = apiErrorHandler(err)
      setAlertMessage(result)
      setShowAlert(true)
      setIsLoading(false)
    }
  }

  return (
    <li
      className='p-2 py-3 hover:bg-discord-itemHover cursor-pointer border-t-1 border-discord-backgroundModifierAccent'
      onClick={openDM}
    >
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div className='flex justify-center items-center w-8 h-8 bg-discord-red text-white hover:text-discord-100 rounded-full'>
              <DiscordIcon className='w-5 h-5' />
            </div>
            <span className='bg-discord-green w-3 h-3 rounded-full absolute right-0 bottom-0 -mr-1 mb-1'></span>
          </div>
          <div className='flex items-start flex-col ml-4'>
            <p className='text-white text-sm font-bold'>
              {friendObject(user, friend).username}
            </p>
            <p className='text-discord-mainText text-xs'>{'online'}</p>
          </div>
        </div>

        <div className='flex'>
          <button
            onClick={openDM}
            className='flex items-center justify-center p-2 mx-1 rounded-full bg-discord-bgSecondary focus:outline-none'
          >
            {isLoading ? (
              <LoadingCircle className='animate-spin h-5 w-5 text-discord-100' />
            ) : (
              <DMIcon className='fill-current w-5 h-5 text-discord-topIcons hover:text-discord-100' />
            )}
          </button>

          <button className='flex items-center justify-center p-2 mx-1 rounded-full bg-discord-bgSecondary focus:outline-none'>
            <ThreeDotIcon className='fill-current w-5 h-5 text-discord-topIcons hover:text-discord-100' />
          </button>
        </div>
      </div>
      <AlertModal
        show={showAlert}
        onClose={closeAlert}
        message={alertMessage}
        title={'Error'}
      />
    </li>
  )
}
