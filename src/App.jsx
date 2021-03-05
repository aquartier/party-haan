import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'bulma'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddParty from './pages/AddParty'

import Header from './components/Header'
import RestrictedRoute from './components/RestrictedRoute'

import { createStore } from './store'
import API from './api'

const App = ({ store }) => {
  const user = store.get('user')
  if (!user) {
    API.get('auth/me').then(({ data }) => {
      store.set('user', data)
    }).catch(() => {
      store.set('user', {})
    })
    return null
  }

  return (
    <Router>
      <Header />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column is-three-fifths">
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <RestrictedRoute path="/add-party" component={AddParty} />
                <RestrictedRoute exact path="/" component={Home} />
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      </section>
    </Router>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default createStore(App)
