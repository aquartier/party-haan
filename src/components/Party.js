import React from 'react'
import PropTypes from 'prop-types'
import { truncate, random, find } from 'lodash'
import API from '../api'
import { withStore } from '../store'

class Party extends React.Component {
  constructor(props) {
    super(props)
    this.handleJoin = this.handleJoin.bind(this)
  }

  handleJoin(event) {
    event.preventDefault()
    const { party, refreshAllParty } = this.props

    if (!party) return
    API.post(`parties/${party.id}/join`, party)
      .then(() => {
        refreshAllParty()
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  render() {
    const { store, party } = this.props
    const user = store.get('user')
    const isJoined = find(party.users, u => u.id === user.id)
    const isAvaliable = party.users.length < party.size

    return (
      <div className="column is-one-third">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={`https://loremflickr.com/300/400?random=${random(1,100)}`} alt="Placeholder"/>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{party.name}</p>
                <p className="subtitle is-6">Price: <span className="has-text-danger">{party.price}</span> THB</p>
              </div>
            </div>
            <div className="content">{truncate(party.detail, { length: 100 })}</div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>Party : {party.users.length} / {party.size}</span>
            </p>
            {isJoined && (
              <p className="card-footer-item"><span>Joined</span></p>
            )}
            {!isJoined && isAvaliable && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className="card-footer-item has-background-danger has-text-light"
                onClick={ this.handleJoin }>JOIN NOW!</a>
            )}
            {!isJoined && !isAvaliable && (
              <p className="card-footer-item has-background-grey has-text-light">FULL</p>
            )}
          </footer>
        </div>
      </div>
    )
  }
}

Party.propTypes = {
  refreshAllParty: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
}

export default withStore(Party)