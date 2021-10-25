import client from '../client'

export const sendFriendRequest = (data) => {
  return client.post('/api/v1/friends/add-friend-request', data)
}

export const getPendingRequestsApi = () => {
  return client.get('/api/v1/friends/pending-requests')
}

export const getOutGoingRequestsApi = () => {
  return client.get('/api/v1/friends/outgoing-requests')
}

export const cancelPendingRequestApi = (id) => {
  return client.patch('/api/v1/friends/cancel-pending-request', { id })
}

export const acceptPendingRequestApi = (id) => {
  return client.patch('/api/v1/friends/accept-pending-request', { id })
}

export const allFriendsRequestApi = () => {
  return client.get('/api/v1/friends/all-friends')
}
