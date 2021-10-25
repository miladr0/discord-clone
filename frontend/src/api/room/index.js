import client from '../client'

export const getOrCreateRoom = (id) => {
  return client.post('/api/v1/rooms/get-or-create', { id })
}

export const getOpenRoomsApi = () => {
  return client.get('/api/v1/rooms/open-rooms')
}

export const closeDMApi = (id) => {
  return client.put(`/api/v1/rooms/close-room/${id}`)
}
