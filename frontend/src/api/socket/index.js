import client from 'socket.io-client'

let socketIo

export default function getSocket(token) {
  if (token) {
    if (socketIo) {
      return socketIo
    } else {
      socketIo = client(process.env.API_URL, {
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

      socketIo.on('connect', () => {
        // console.log(socket.disconnected) // false
      })

      return socketIo
    }
  }
  return null
}
