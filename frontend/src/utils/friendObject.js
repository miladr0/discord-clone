import get from 'lodash.get'

export function isIncoming(user, request, userIdPath) {
  return user?.user?.id === get(request, userIdPath)
}

export default function friendObject(
  user,
  request,
  userIdPath = 'from.id',
  userPath = 'to',
  friendPath = 'from'
) {
  if (isIncoming(user, request, userIdPath)) return request?.[friendPath]

  return request?.[userPath]
}
