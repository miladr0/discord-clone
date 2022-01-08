import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import getSocket from './index'
import { GetMe } from '../../hooks/redux'
import { ME_SOCKET } from '../../constants/socket.routes'
import {
  OPEN_ROOMS,
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
} from '../../constants/queryKeys'

export default function useMeSocket() {
  const me = GetMe()
  const cache = useQueryClient()

  useEffect(() => {
    let socket

    if (me?.tokens?.access?.token) {
      socket = getSocket(me?.tokens?.access?.token)
      socket.connect()

      if (socket) {
        socket.emit(ME_SOCKET.ONLINE, { userId: me?.user?.id })

        socket.on('roomOpened', () => {
          cache.invalidateQueries(OPEN_ROOMS)
        })

        socket.on('friendRequest', () => {
          cache.invalidateQueries(PENDING_REQUESTS_KEY)
        })

        socket.on('friendAcceptRequest', () => {
          cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
          cache.invalidateQueries(ALL_FRIENDS_KEY)
        })
      }
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [me?.tokens?.access?.token, me?.user?.id, cache])
}
