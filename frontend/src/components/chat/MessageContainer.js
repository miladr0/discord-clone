import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Input from './Input'
import Message from './Message'

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`

export default function MessageContainer() {
  const { data } = useQuery(GET_MESSAGES)

  return (
    <div className='bg-discord-600 flex flex-1 flex-col'>
      <div className='overflow-y-auto main--chat--scrollbar flex-1'>
        {data && data.messages.map((message) => <Message message={message} />)}
      </div>
      <Input />
    </div>
  )
}
