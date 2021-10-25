export default function checkCurrentPath(location, path, contains = false) {
  if (location?.pathname) {
    if (contains) {
      return location.pathname.includes(path)
    }
    return location?.pathname === path
  }

  return false
}
