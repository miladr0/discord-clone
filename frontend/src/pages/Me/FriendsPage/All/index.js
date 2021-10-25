import React from 'react'
import { useSelector } from 'react-redux'
import { AllFriendsRequests } from '../../../../hooks/reactQuery'
import AllUsersIcon from '../../../../assets/all_users_icon.svg'
import FriendItem from './FriendItem'

function EmptyState({ setPage }) {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <AllUsersIcon className='fill-current w-85  h-85' />
      <p className='p-2 text-discord-popOutHeader mt-6'>
        Wumpus is waiting on friends. You don’t have to though!
      </p>
      <button
        onClick={() => setPage('add_friend')}
        className='bg-discord-experiment500 text-sm rounded-md text-white py-2 px-3 mt-3'
      >
        Add friend
      </button>
    </div>
  )
}

function PendingHeader({ allFriends }) {
  const pendingCount = allFriends?.length ?? 0
  return (
    <div className='flex justify-start items-center w-full mt-2'>
      <h6 className='my-2 text-discord-topIcons text-xs font-semibold'>
        ALL FRIENDS — {pendingCount}
      </h6>
    </div>
  )
}

export default function All({ setPage }) {
  const { user } = useSelector((state) => state.user)
  const { data: allFriends } = AllFriendsRequests()

  if (allFriends?.length) {
    return (
      <div className='flex h-full flex-1'>
        <div className='flex flex-col w-full p-4 px-10'>
          <PendingHeader allFriends={allFriends} />

          <div className='flex w-full'>
            <ul className='w-full flex flex-col'>
              {allFriends?.map((friend, index) => (
                <FriendItem key={index} user={user} friend={friend} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex h-full flex-1'>
      <EmptyState setPage={setPage} />
    </div>
  )
}
