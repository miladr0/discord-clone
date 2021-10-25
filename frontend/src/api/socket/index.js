import client from 'socket.io-client'

export default function getSocket(token) {
  console.log('token: ', token)
  if (token) {
    return client(process.env.API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    })
  }

  return null
}
