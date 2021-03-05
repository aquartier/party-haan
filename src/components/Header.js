import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStore } from '../store'
import API from '../api'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isNavActive: false }
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    const { store } = this.props
    if (!store.get('user')) {
      API.get('auth/me')
        .then(({ data }) => {
          store.set('user', data)
        })
    }
  }

  toggleActive() {
    this.setState({ isNavActive: !this.state.isNavActive })
  }

  handleLogout() {
    const { store } = this.props
    store.set('user', {})
    localStorage.removeItem('token')
  }

  render() {
    const { store } = this.props
    const user = store.get('user')
    const authenticated = user && user.id
    return (
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand" >
            <p className="navbar-item" href="/">PARTY HAAAANNN</p>
            <span onClick={ () => { this.toggleActive() }}
            role="button"
            className={`navbar-burger burger ${this.state.isNavActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div id="navbarMenu" className={`navbar-menu ${this.state.isNavActive ? "is-active" : ""}`}>
            <div className="navbar-end">
              <Link to="/" className="navbar-item">
                  Home
              </Link>
              {!user.id && (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              )}
              {!user.id && (
                <Link to="/register" className="navbar-item">
                  Register
                </Link>
              )}
              {authenticated && (
                <Link to="/" onClick={this.handleLogout} className="navbar-item">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  store: PropTypes.object.isRequired,
}

export default withStore(Header)
