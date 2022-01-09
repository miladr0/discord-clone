import axios from 'axios'
import { LOGIN_PAGE } from '../constants/history.constants'

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
  (err) => {
    const { status } = err.response

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
