import React from 'react'
import { useSelector } from 'react-redux'
import { Me } from '../../../hooks/reactQuery'
import Card from './Card'

export default function Account() {
  const { user } = useSelector((state) => state.user?.user)

  const { data: userData } = Me(user)

  return (
    <div className='flex flex-col mt-2'>
      <Card user={userData} />
    </div>
  )
}
