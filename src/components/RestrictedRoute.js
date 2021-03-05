import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { withStore } from '../store'

const RestrictedRoute = ({ store, component: Component, ...rest }) => {
  const user = store.get('user')
  return (
    <Route
      {...rest}
      render={(props) => (user && user.id ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      ))}
    />
  )
}

RestrictedRoute.propTypes = {
  store: PropTypes.object.isRequired,
  component: PropTypes.any.isRequired
}

export default withStore(RestrictedRoute)
