import React from 'react'
import UpdateCard from './UpdateCard'
import TextField from '../../shared/Inputs/TextField'
import UserNameUpdateSchema from '../../../validation/userNameUpdate.schema'

export default function Card({ user, onClose }) {
  const title = 'Change your username'
  const description = 'Enter a new username and your existing password.'
  const initData = { username: user?.username ?? '' }
  async function updateProfile() {}

  function Input() {
    return (
      <TextField
        fieldClass='mb-4 mt-4'
        labelClass='block text-discord-sideBarChannels font-semibold text-xs mb-2'
        inputClass='w-full text-discord-100 p-2 bg-discord-deprecatedTextInput placeholder-discord-200 focus:outline-none leading-normal'
        label='USERNAME'
        name='username'
        type='text'
      />
    )
  }

  return (
    <UpdateCard
      title={title}
      description={description}
      initData={initData}
      onClose={onClose}
      Input={Input}
      UserNameUpdateSchema={UserNameUpdateSchema}
      updateProfile={updateProfile}
    />
  )
}
