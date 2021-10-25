import moment from 'moment'

export function getTimeDifference(date1, date2) {
  return moment(date1).diff(moment(date2), 'minutes')
}

export function getTime(date) {
  return moment(date).format('h:mm A')
}

export function chatDividerFormat(date) {
  return moment(date).format('MMMM D, YYYY')
}

export function isNewDay(date1, date2) {
  return !moment(date1).isSame(moment(date2), 'day')
}
