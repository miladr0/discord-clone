import client from '../client'

export const register = (data) => {
  return client.post('/api/v1/auth/register', data)
}
export const login = (data) => {
  return client.post('/api/v1/auth/login', data)
}

export const logout = (refreshToken) => {
  return client.post('/api/v1/auth/logout', { refreshToken })
}
