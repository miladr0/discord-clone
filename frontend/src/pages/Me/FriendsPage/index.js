import React, { useState } from 'react'
import Menu from './Menu'
import Online from './Online'
import AddFriend from './AddFriend'
import Blocked from './Blocked'
import Pending from './Pending'
import All from './All'
import { PendingRequests } from '../../../hooks/reactQuery'

function showSubPage(page, setPage, componentData) {
  let component

  switch (page) {
    case 'online':
      component = <Online />
      break
    case 'all':
      component = <All setPage={setPage} />
      break
    case 'pending':
      component = <Pending {...componentData} />
      break
    case 'add_friend':
      component = <AddFriend />
      break
    case 'blocked':
      component = <Blocked />
      break
    default:
      component = <Online />
      break
  }

  return component
}

export default function Friends() {
  const [page, setPage] = useState('online')

  const { data: pendingRequestsData } = PendingRequests()

  return (
    <div className='flex-1 w-full flex-col overflow-hidden'>
      <Menu
        setPage={setPage}
        page={page}
        pendingRequests={pendingRequestsData?.length}
      />
      <div className='flex-1 flex bg-discord-selectMuted min-h-screen h-screen'>
        <div className='flex flex-1'>
          {showSubPage(page, setPage, { pendingRequestsData })}
        </div>

        <div className='flex flex-col p-3 w-96 border-l-1 border-discord-backgroundModifierAccent min-h-screen h-screen hidden lg:block'>
          <h5 className='text-white text-xl font-bold mt-3'>Active Now</h5>
          <h6 className='text-white text-lg font-bold mt-5 text-center'>
            It's quiet for now...
          </h6>
          <p className='text-discord-500 text-sm mt-2 text-center'>
            When a friend starts an activity—like playing a game or hanging out
            on voice—we’ll show it here!
          </p>
        </div>
      </div>
    </div>
  )
}
