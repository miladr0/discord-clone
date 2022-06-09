export const HOME_PAGE = '/channels'
export const ME_PAGE = '/channels/me'
export const LOGIN_PAGE = '/login'
export const DM_URL = (dmId = ':dmId') => `/channels/me/${dmId}`
export const LOGIN_URL = '/api/v1/auth/login'
export const REFRESH_TOKEN_URL = '/api/v1/auth/refresh-tokens'
