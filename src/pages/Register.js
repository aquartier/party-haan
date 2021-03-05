import React from 'react'
import PropTypes from 'prop-types'

import API from '../api'
import { withStore } from '../store'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        password_confirm: '',
        accept_consent: true
      },
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
    API.post('auth/register', user)
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
    const { value, checked } = event.target
    user[name] = event.target.type === "checkbox" ? checked : value
    this.setState({ user }, () => { this.validateField(name) })
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
      case 'firstname':
      case 'lastname':
        valid = !!value
        formErrors[fieldName] = valid ? '' : 'This field is required'
        break
      case 'password':
        valid = value.length >= 6
        formErrors.password = valid ? '' : 'Password is too short'
        break
      case 'password_confirm':
        valid = value === user.password
        formErrors.password_confirm = valid ? '' : 'Repeat password doesn\'t match'
        break
      case 'accept_consent':
        valid = !!value
        formErrors.accept_consent = valid ? '' : 'Please read and accept terms and conditions'
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
        <h1 className="title">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
            <input
              type="email"
              className={`input ${this.errorClass(formErrors.email)}`}
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={user.email}
            />
            </div>
            {formErrors.email && (
              <div className="help is-danger">
                {formErrors.email}
              </div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="firstname">
              First Name
            </label>
            <div className="control">
            <input
              type="text"
              className={`input ${this.errorClass(formErrors.firstname)}`}
              id="firstname"
              aria-describedby="firstname"
              placeholder="Enter first name"
              onChange={this.handleChange}
              value={user.firstname}
            />
            </div>
            {formErrors.firstname && (
              <div className="help is-danger">
                {formErrors.firstname}
              </div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="lastname">
              Last Name
            </label>
            <div className="control">
            <input
              type="lastname"
              className={`input ${this.errorClass(formErrors.lastname)}`}
              id="lastname"
              aria-describedby="lastname"
              placeholder="Enter last name"
              onChange={this.handleChange}
              value={user.lastname}
            />
            </div>
            {formErrors.lastname && (
              <div className="help is-danger">
                {formErrors.lastname}
              </div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <div className="control">
            <input
              type="password"
              className={`input ${this.errorClass(formErrors.password)}`}
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange}
              value={user.password}
            />
            </div>
            {formErrors.password && (
              <div className="help is-danger">
                {formErrors.password}
              </div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="password_confirm">
              Repeat Password
            </label>
            <div className="control">
            <input
              type="password"
              className={`input ${this.errorClass(formErrors.password_confirm)}`}
              id="password_confirm"
              placeholder="Enter password again"
              onChange={this.handleChange}
              value={user.password_confirm}
            />
            </div>
            {formErrors.password_confirm && (
              <div className="help is-danger">
                {formErrors.password_confirm}
              </div>
            )}
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  id="accept_consent"
                  onChange={this.handleChange}
                  checked={user.accept_consent}
                />
                <span> I agree to the terms and conditions</span>
              </label>
              {formErrors.accept_consent && (
                <div className="help is-danger">
                  {formErrors.accept_consent}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="button is-medium is-black">
            Register
          </button>
          { error && (
            <div className="mt-3 notification is-danger">
              Sorry, there is something went wrong. We will investigate shortly.
            </div>
          )}
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default withStore(Register)
