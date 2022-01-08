import React from 'react'
import { useQueryClient } from 'react-query'
import Modal from '../../../../components/shared/Modal'
import DiscordIcon from '../../../../assets/discord_mini_icon.svg'
import { pendingUserName, isIncoming } from '../utils'
import { cancelPendingRequestApi } from '../../../../api/friend'
import {
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
} from '../../../../constants/queryKeys'

export default function PendingProfileModal({
  user,
  pending,
  show = false,
  onClose = () => {},
}) {
  const cache = useQueryClient()
  const [isLoading, setIsLoading] = React.useState(false)

  async function cancelPending() {
    setIsLoading(true)

    try {
      await cancelPendingRequestApi(pending.id)
      if (isIncoming(user, pending)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY)
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
      }

      setIsLoading(false)
      onClose()
    } catch (err) {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} onClose={onClose} center big>
      <div className='flex flex-col lg:w-11/12 xl:w-8/12 md:w-10/12 sm:w-11/12 w-full bg-discord-bgBlackModal'>
        <div
          className={`w-full bg-discord-${
            isIncoming(user, pending)
              ? pending?.from?.color
              : pending?.to?.color
          } h-20 relative rounded-t-lg`}
        >
          <div className='flex items-center absolute bottom-0 left-0 -mb-16 ml-4'>
            <div className='flex flex-col'>
              <div className='relative flex justify-center'>
                <a
                  href='#'
                  className={`relative flex items-center mx-auto w-20 h-20 bg-discord-${
                    isIncoming(user, pending)
                      ? pending?.from?.color
                      : pending?.to?.color
                  } text-white rounded-full inline-block p-2 border-6 border-discord-900`}
                >
                  <DiscordIcon className={`w-12 h-12 text-center mx-auto`} />
                </a>
                <span className='bg-discord-green w-6 h-6 rounded-full absolute right-0 bottom-0 border-6 border-discord-900 mr-0 mb-2'></span>
              </div>
              <div className='flex items-center'>
                <p className='text-white text-medium font-bold'>
                  {pendingUserName(user, pending)}
                </p>
                <p className='text-discord-mainText text-medium'>
                  #
                  {isIncoming(user, pending)
                    ? pending.from.shortId
                    : pending.to.shortId}
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-center absolute bottom-0 right-0 -mb-16 mr-4'>
            {isIncoming(user, pending) && (
              <button
                disabled={isLoading}
                className='p-2 px-3 mx-1 text-xs bg-discord-lightGreen hover:bg-discord-greenHover text-white rounded-md focus:outline-none'
              >
                Accept
              </button>
            )}
            <button
              onClick={cancelPending}
              disabled={isLoading}
              className='p-2 px-3 mx-1 text-xs bg-discord-grayDeep hover:bg-discord-deepGrayHover text-white rounded-md focus:outline-none'
            >
              {isIncoming(user, pending) ? 'Ignore' : 'Cancel request'}
            </button>
          </div>
        </div>
        <div className='w-full flex'>
          <Tabs />
        </div>
      </div>
    </Modal>
  )
}

function Tabs() {
  const tabs = ['User Info', 'Mutual Servers', 'Mutual Friends']

  return (
    <div className='w-full flex flex-col mt-16'>
      <ul className='flex w-full justify-start items-start mt-2 py-4 border-b-1 border-discord-600'>
        {tabs.map((tab, i) => (
          <li
            key={i}
            className='cursor-pointer px-4 text-discord-mainText text-xs hover:text-discord-100'
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className='w-full flex flex-col mt-4 px-4'>
        <h6 className='text-sm text-discord-mainText font-bold'>NOTE</h6>
        <textarea
          className='w-full mt-4 mb-4 bg-discord-bgBlackModal text-sm text-discord-mainText placeholder-discord-mainText focus:outline-none focus:bg-discord-900'
          placeholder='Click to add a note'
          rows='2'
          maxLength='256'
        ></textarea>
      </div>
    </div>
  )
}
