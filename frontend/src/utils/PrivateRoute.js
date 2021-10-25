import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../components/Layout'

import { LOGIN_PAGE } from '../constants/history.constants'

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state?.user?.user)

  function renderComponent(props) {
    if (user) {
      return <Layout Component={Component} user={user} {...props} />
    }

    return (
      <Redirect
        to={{ pathname: LOGIN_PAGE, state: { from: props.location } }}
      />
    )
  }
  return <Route {...rest} render={renderComponent} />
}
