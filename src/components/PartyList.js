import React from 'react'
import chunk from 'lodash/chunk'

import Party from './Party'
import API from '../api'

class PartyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { parties: [] }
    this.fetchAllParty = this.fetchAllParty.bind(this)
  }

  componentDidMount() {
    this.fetchAllParty()
  }

  fetchAllParty() {
    API.get('/parties')
      .then((res) => {
        this.setState({ parties: res.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { parties } = this.state
    const chunks = chunk(parties, 3)
    return (
      <div>
        <div className="notification">
          Please note that all photos below are random placeholder photos.
        </div>
        {chunks.map((parties, index) => (
          <div className="columns" key={index}>
            {
              parties.map(party => (
                <Party key={party.id} party={party} refreshAllParty={this.fetchAllParty}/>
              ))
            }
          </div>
        ))}
      </div>
    )
  }
}

export default PartyList
