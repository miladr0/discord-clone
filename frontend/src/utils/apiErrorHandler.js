const apiErrorHandler = (error) => {
  if (error.response?.data?.errors) {
    const errors = error.response?.data?.errors
    const errorMap = {}
    errors.forEach(({ field, message }) => {
      errorMap[field] = message
    })
    return errorMap
  } else if (error.response?.data) {
    return error.response?.data?.message ?? 'something wrong!'
  }

  return error
}

export default apiErrorHandler
