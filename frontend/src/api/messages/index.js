import client from '../client'

export const sendMessage = (data) => {
  return client.post('/api/v1/messages/send-message', data)
}

export const getMessages = (roomId, page) => {
  return client.get(`/api/v1/messages/${roomId}${page ? `?page=${page}` : ''}`)
}
