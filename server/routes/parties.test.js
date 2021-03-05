const request = require('supertest')
const _ = require('lodash')
const App = require('../app')
const { signUser } = require('../models/auth/helpers')

describe('parties', () => {
  let app
  const token = signUser({ email: 'john@party.haan', id: 1 })

  beforeAll(async () => {
    app = await App()
  })

  it('should able to create new party [/parties]', async () => {
    const party = {
      name: "DeFi Alpaca Party",
      detail: "Alpaca City is endeavoring to create a more accessible DeFi ecosystem by combining the power of yield farming and NFT.",
      size: 2,
      price: 999
    }
    return request(app)
      .post('/parties')
      .send(party)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        const result = res.body
        expect(result.name).toEqual(party.name)
        expect(result.detail).toEqual(party.detail)
        expect(result.size).toEqual(party.size)
        expect(result.price).toEqual(party.price)
        expect(_.find(res.body.users, { email: 'john@party.haan' })).toBeTruthy()
      })
  })

  it('should able to retrieve all parties [/parties]', async () => {
    return request(app)
      .get('/parties')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(_.find(res.body, { name: "DeFi Alpaca Party" })).toBeTruthy()
      })
  })

  it('should allow user to join party [/party/:id/join]', async () => {
    await request(app)
      .post(`/parties/2/join`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    return request(app)
      .get(`/parties/2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(_.find(res.body.users, { email: 'john@party.haan' })).toBeTruthy()
      })

  })
})
