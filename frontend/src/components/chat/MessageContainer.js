import React, { useRef, useCallback, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import EmptyChat from './EmptyChat'
import Input from './Input'
import Message from './Message'
import { getMessages } from '../../api/messages'
import { ROOM_MESSAGES_KEY } from '../../constants/queryKeys'
import ChatBeginner from './ChatBeginner'
import { getTimeDifference, isNewDay } from '../../utils/dateUtils'
import Divider from './Divider'
import LoadingCircle from '../../assets/loading_circle_icon.svg'

function checkSameTime(message1, message2) {
  if (message1.senderId.id !== message2.senderId.id) return false
  if (message1.createdAt === message2.createdAt) return false
  return getTimeDifference(message1.createdAt, message2.createdAt) < 5
}

export default function MessageContainer({ room, user }) {
  const observer = useRef()
  const [currentMsgEditId, setCurrentMsgEditId] = useState(null)

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ROOM_MESSAGES_KEY(room?.id),
    async ({ pageParam }) => {
      const { data } = await getMessages(room.id, pageParam)

      return data
    },
    {
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage
        return page < totalPages ? page + 1 : undefined
      },
    }
  )

  const lastMessageRef = useCallback(
    (node) => {
      if (isLoading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasNextPage, fetchNextPage]
  )

  const messages = data ? data.pages.flatMap((page) => page?.results ?? []) : []

  const setEditMessage = (msgId) => {
    setCurrentMsgEditId(msgId)
  }

  return (
    <div className='bg-discord-600 flex flex-1 flex-col'>
      <div className='overflow-y-auto h-full main--chat--scrollbar flex-1 flex flex-col-reverse'>
        {isLoading === false && messages.length ? (
          messages.map((message, index) => {
            if (messages.length === index + 1) {
              return (
                <>
                  <div key={message.id} ref={lastMessageRef}>
                    <Message
                      isSameTime={checkSameTime(
                        message,
                        messages[Math.min(index + 1, messages.length - 1)]
                      )}
                      chat={message}
                      currentMsgEditId={currentMsgEditId}
                      setEditMessage={setEditMessage}
                    />
                  </div>
                  {isNewDay(
                    message.createdAt,
                    messages[Math.min(index + 1, messages.length - 1)].createdAt
                  ) && <Divider date={message.createdAt} />}
                </>
              )
            }

            return (
              <>
                <Message
                  key={message.id}
                  isSameTimePrev={checkSameTime(
                    message,
                    messages[Math.min(index + 1, messages.length - 1)]
                  )}
                  isSameTimeNext={checkSameTime(
                    message,
                    messages[index - 1 < 0 ? 0 : index - 1]
                  )}
                  chat={message}
                  currentMsgEditId={currentMsgEditId}
                  setEditMessage={setEditMessage}
                />
                {isNewDay(
                  message.createdAt,
                  messages[Math.min(index + 1, messages.length - 1)].createdAt
                ) && <Divider date={message.createdAt} />}
              </>
            )
          })
        ) : (
          <EmptyChat room={room} user={user} />
        )}
        {isLoading || (isFetchingNextPage && messages.length) ? (
          <p>
            <LoadingCircle className='animate-spin mt-2 h-5 w-5 text-white mx-auto' />
          </p>
        ) : null}

        {isLoading === false && hasNextPage === false && (
          <ChatBeginner room={room} user={user} />
        )}
      </div>
      <Input room={room} user={user} />
    </div>
  )
}
