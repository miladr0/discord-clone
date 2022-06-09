import axios from 'axios'
import {
  LOGIN_PAGE,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
} from '../constants/history.constants'

axios.defaults.withCredentials = true

const client = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

client.interceptors.request.use(function (config) {
  if (localStorage.user) {
    const userStorage = JSON.parse(localStorage.getItem('user'))
    config.headers.Authorization = `Bearer ${userStorage?.tokens?.access?.token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { status } = err.response
    const originalReq = err.config

    if (originalReq.url !== LOGIN_URL && err.response) {
      if (
        err.response.status === 401 &&
        err.response?.data?.message === 'Token not found'
      ) {
        localStorage.removeItem('user')
        window.location.replace(LOGIN_PAGE)
        return Promise.reject()
      }

      if (
        (err.response.status === 401 &&
          err.response?.data?.message === 'Please authenticate',
        err.config && !err.config._retry)
      ) {
        originalReq._retry = true
        const userStorage = JSON.parse(localStorage.getItem('user'))
        const refreshToken = userStorage?.tokens?.refresh?.token

        // request to refresh token
        try {
          const res = await client.post(REFRESH_TOKEN_URL, {
            refreshToken: refreshToken,
          })

          localStorage.setItem('user', JSON.stringify(res.data))
          originalReq.headers[
            'Authorization'
          ] = `Bearer ${res.data?.tokens?.access?.token}`
          originalReq.headers['Device'] = 'device'

          return client(originalReq)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    switch (status) {
      case 403:
        localStorage.removeItem('user')
        window.location.replace(LOGIN_PAGE)
        break
      default:
        break
    }

    return Promise.reject(err)
  }
)
export default client
