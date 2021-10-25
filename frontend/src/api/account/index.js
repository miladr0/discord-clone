import client from '../client'

export const getProfile = (id) => {
  return client.get('/api/v1/users/' + id)
}

export const updateProfile = (data) => {
  return client.put('/api/v1/users/', data)
}
