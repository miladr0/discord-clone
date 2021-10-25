import { useQuery } from 'react-query'
import {
  getPendingRequestsApi,
  getOutGoingRequestsApi,
  allFriendsRequestApi,
} from '../../api/friend'
import { getOpenRoomsApi } from '../../api/room'
import { getProfile } from '../../api/account'
import {
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
  ACCOUNT_KEY,
  OPEN_ROOMS,
} from '../../constants/queryKeys'

export function PendingRequests() {
  return useQuery(PENDING_REQUESTS_KEY, () => {
    return getPendingRequestsApi().then((res) => res.data)
  })
}

export function OutGoingRequests() {
  return useQuery(OUT_GOING_REQUESTS_KEY, () => {
    return getOutGoingRequestsApi().then((res) => res.data)
  })
}

export function AllFriendsRequests() {
  return useQuery(ALL_FRIENDS_KEY, () => {
    return allFriendsRequestApi().then((res) => res.data)
  })
}

export function Me(user) {
  return useQuery(ACCOUNT_KEY, async () => {
    if (user) {
      return getProfile(user?.id).then((res) => res.data)
    }
    return null
  })
}

export function GetOpenRooms() {
  return useQuery(OPEN_ROOMS, async () => {
    return getOpenRoomsApi().then((res) => res.data)
  })
}
