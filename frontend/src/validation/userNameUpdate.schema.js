import * as yup from 'yup'

export default yup.object().shape({
  username: yup.string().min(3).max(20).trim().required('Username is required'),
})
