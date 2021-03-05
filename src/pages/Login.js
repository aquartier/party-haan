import React from 'react'
import PropTypes from 'prop-types'
import { withStore } from '../store'
import API from '../api'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { email: '', password: '' },
      formErrors: { }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { user, formErrors } = this.state
    const { history, store } = this.props

    Object.keys(user).forEach((field) => this.validateField(field))
    const hasErrors = Object.values(formErrors).filter((e) => e).length

    if (!user || hasErrors) return
    API.post('auth/login', user)
      .then(({ data }) => {
        this.setState({ error: null })
        store.set('user', data.user)
        localStorage.setItem('token', data.token)
        history.push('/')
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  handleChange(event) {
    const { user } = this.state
    const name = event.target.id
    const { value } = event.target
    user[name] = value
    this.setState({ user }, () => { this.validateField(name, value) })
  }

  validateField(fieldName) {
    const { formErrors, user } = this.state
    const value = user[fieldName]
    let valid

    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        formErrors.email = valid ? '' : 'Email is invalid'
        break
      case 'password':
        valid = value.length >= 6
        formErrors.password = valid ? '' : 'Password is too short'
        break
      default:
        break
    }
    this.setState({ formErrors })
  }

  errorClass(error) {
    return (error ? 'is-danger' : '')
  }

  render() {
    const { user, formErrors, error } = this.state
    return (
      <div>
        <h1 className="title">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={`input ${this.errorClass(formErrors.email)}`}
              id="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={user.email}
            />
            {formErrors.email && (
              <div className="help is-danger">{formErrors.email}</div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className={`input ${this.errorClass(formErrors.password)}`}
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange}
              value={user.password}
            />
            {formErrors.password && (
              <div className="help is-danger">{formErrors.password}</div>
            )}
          </div>
          <button type="submit" className="button is-medium is-black">
            Login
          </button>
          { error && (
            <div className="mt-3 notification is-danger">
              Invalid credentials
            </div>
          )}
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}
export default withStore(Login)
