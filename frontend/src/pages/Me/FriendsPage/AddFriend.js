import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import classNames from 'classnames'

import { OUT_GOING_REQUESTS_KEY } from '../../../constants/queryKeys'
import { sendFriendRequest } from '../../../api/friend'
import AlertModal from '../../../components/shared/Modal/AlertModal'
import apiErrorHandler from '../../../utils/apiErrorHandler'
import AddFriendIcon from '../../../assets/add_friend_icon.svg'

//
function EmptyState() {
  return (
    <div className='flex flex-col flex-1 justify-center w-full items-center'>
      <AddFriendIcon className='fill-current w-85 h-85' />
      <p className='p-2 text-discord-popOutHeader mt-6'>
        Wumpus is waiting on friends. You don’t have to though!
      </p>
    </div>
  )
}

const alertTitle = 'Friend request failed'
const FRIEND_DESCRIPTION = {
  DEFAULT: "You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!",
  SUCCESS: (input) => `Success! Your friend request to ${input} was sent.`,
}

export default function Online() {
  const cache = useQueryClient()
  const [input, setInput] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [friendDescription, setFriendDescription] = useState(
    FRIEND_DESCRIPTION.DEFAULT
  )
  const [successInvite, setSuccessInvite] = useState(false)

  function closeAlert() {
    setShowAlert(false)
  }

  function isNumeric(value) {
    return /^\d+$/.test(value)
  }

  async function handleSendFriendRequest(e) {
    e.preventDefault()
    const [username, shortId] = input.split('#')

    if (!username) {
      setAlertMessage('Please enter a username')
      setShowAlert(true)
      return
    }
    if (!shortId || shortId.length !== 4) {
      setAlertMessage('Please enter user Id correctly')
      setShowAlert(true)
      return
    }
    if (!isNumeric(shortId)) {
      setAlertMessage('User Id should only contain numbers')
      setShowAlert(true)
      return
    }

    try {
      await sendFriendRequest({ username, shortId })
      setInput('')
      setFriendDescription(FRIEND_DESCRIPTION.SUCCESS(input))
      setSuccessInvite(true)

      cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
    } catch (e) {
      const result = apiErrorHandler(e)
      setAlertMessage(result)
      setShowAlert(true)
      setSuccessInvite(false)
      setFriendDescription(FRIEND_DESCRIPTION.DEFAULT)
    }
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='px-6 py-4'>
        <h6 className='text-white font-bold text-medium tracking-tight'>
          ADD FRIEND
        </h6>
        <p
          className={classNames('text-sm mt-2', {
            'text-discord-500': !successInvite,
            'text-discord-greenSuccess': successInvite,
          })}
        >
          {friendDescription}
        </p>
        <div className='w-full mt-4 bg-discord-deprecatedTextInput border-1 border-discord-deprecatedTextInputBorder w-full rounded-lg'>
          <form className='flex justify-between'>
            <input
              value={input}
              onInput={(e) => setInput(e.target.value)}
              type='text'
              placeholder='Enter a Username#0000'
              maxLength='37'
              className=' w-full text-discord-100 p-3 bg-discord-deprecatedTextInput placeholder-discord-200 focus:outline-none leading-normal text-base'
            />
            <button
              type='button'
              disabled={!!input === false}
              onClick={handleSendFriendRequest}
              className={classNames(
                'text-xs rounded-md text-white px-0 w-56 m-2',
                {
                  'bg-discord-experiment500Disabled': !!input === false,
                  'cursor-not-allowed': !!input === false,
                  'bg-discord-experiment500': !!input,
                }
              )}
            >
              Send Friend Request
            </button>
          </form>
        </div>
      </div>
      <EmptyState />
      <AlertModal
        show={showAlert}
        onClose={closeAlert}
        message={alertMessage}
        title={alertTitle}
      />
    </div>
  )
}
