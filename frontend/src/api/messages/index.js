import client from '../client'

export const sendMessage = (data) => {
  return client.post('/api/v1/messages/send-message', data)
}

export const editMessage = (messageId, message) => {
  return client.put(`/api/v1/messages/edit-message/${messageId}`, { message })
}

export const getMessages = (roomId, page) => {
  return client.get(`/api/v1/messages/${roomId}${page ? `?page=${page}` : ''}`)
}

export const deleteMessage = (messageId) => {
  return client.delete(`/api/v1/messages/${messageId}`)
}
