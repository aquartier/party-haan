import React from 'react'
import API from '../api'

class AddParty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      party: { name: '', detail: '', size: 2, price: 100 },
      formErrors: { }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { party, formErrors } = this.state
    const { history } = this.props

    Object.keys(party).forEach((field) => this.validateField(field))
    const hasErrors = Object.values(formErrors).filter((e) => e).length

    if (!party || hasErrors) return
    API.post('parties', party)
      .then(() => {
        history.push('/')
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  handleChange(event) {
    const { party } = this.state
    const { value } = event.target
    party[event.target.id] = value
    this.setState({ party }, () => { this.validateField(party, value) })
  }

  validateField(fieldName) {
    const { formErrors, party } = this.state
    const value = party[fieldName]
    let valid

    switch (fieldName) {
      case 'name':
      case 'detail':
        valid = !!value
        formErrors[fieldName] = valid ? '' : 'This field is required'
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
    const { party, formErrors, error } = this.state
    return (
      <div>
        <h1 className="title">Add Party</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">
              Enter your party name
            </label>
            <input
              type="text"
              className={`input ${this.errorClass(formErrors.name)}`}
              id="name"
              placeholder="Your party name"
              onChange={this.handleChange}
              value={party.name}
            />
            {formErrors.name && (
              <div className="help is-danger">{formErrors.name}</div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="detail">
              Please help describe the detail of your party
            </label>
            <textarea
              type="text"
              className={`textarea ${this.errorClass(formErrors.detail)}`}
              id="detail"
              placeholder="Please specify as much as possible eg, location, date and time, and rules"
              onChange={this.handleChange}
              value={party.detail}
            />
            {formErrors.detail && (
              <div className="help is-danger">{formErrors.detail}</div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="size">
              How many people you want for this party? (including yourself)
            </label>
            <input
              type="number"
              min="2"
              max="100"
              step="1"
              className={`input ${this.errorClass(formErrors.size)}`}
              id="size"
              onChange={this.handleChange}
              value={party.size}
            />
            {formErrors.size && (
              <div className="help is-danger">{formErrors.size}</div>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="price">
              Price per head (currency in Thai Baht)
            </label>
            <input
              type="number"
              min="10"
              max="10000"
              className={`input ${this.errorClass(formErrors.price)}`}
              id="price"
              placeholder="Enter party price"
              onChange={this.handleChange}
              value={party.price}
            />
            {formErrors.price && (
              <div className="help is-danger">{formErrors.price}</div>
            )}
          </div>

          <button type="submit" className="button is-medium is-black">
            Submit
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

export default AddParty
