import React from 'react'
import PropTypes from 'prop-types'
import PartyList from '../components/PartyList'
import { Link } from 'react-router-dom'
import { withStore } from '../store'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <h1 className="title">Let&apos;s party!</h1>
            <h1 className="subtitle">Haaaaaaaaaaannnnnn</h1>
          </div>
          <div className="column is-one-fifth">
            <Link to="/add-party" className="button is-black mt-3 is-medium">
              Create Party
            </Link>
          </div>
        </div>
        <PartyList />
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}
export default withStore(Home)
