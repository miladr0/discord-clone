import * as yup from 'yup'

export default yup.object().shape({
  email: yup
    .string()
    .email('Not a well formed email address')
    .lowercase()
    .required('Email is required')
    .defined(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100)
    .required('Password is required')
    .defined(),
})
