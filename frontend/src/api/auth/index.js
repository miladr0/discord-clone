import { LOGIN_URL } from '../../constants/history.constants'
import client from '../client'

export const register = (data) => {
  return client.post('/api/v1/auth/register', data)
}
export const login = (data) => {
  return client.post(LOGIN_URL, data)
}

export const logout = (refreshToken) => {
  return client.post('/api/v1/auth/logout', { refreshToken })
}
