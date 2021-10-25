export function isIncoming(user, request) {
  return user?.user?.id === request.to.id
}

export function pendingUserName(user, request) {
  if (isIncoming(user, request)) return request.from.username

  return request.to.username
}
