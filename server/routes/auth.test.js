const request = require('supertest')
const App = require('../app')

describe('authentication', () => {
  let app, token
  const john = {
    email: 'john@party.haan',
    password: 'password',
    firstname: 'John',
    lastname: 'Doe',
  }

  beforeAll(async () => {
    app = await App()
  })

  it('should able to register new user [/register]', async () => {
    return request(app)
      .post('/auth/register')
      .send(john)
      .expect(200)
      .then(res => {
        expect(res.body.user.email).toEqual(john.email)
        expect(res.body.user.firstname).toEqual(john.firstname)
        expect(res.body.user.lastname).toEqual(john.lastname)
      })
  })

  it('should able to login [/login]', () => {
    return request(app)
      .post('/auth/login')
      .send(john)
      .expect(200)
      .then(res => {
        token = res.body.token
        expect(token).toBeDefined()
        expect(res.body.user).toBeDefined()
      })
  })

  it('should respond 401 for bad login credential', () => {
    return request(app)
      .post('/auth/login')
      .send({ email: john.email, password: 'wrong-password' })
      .expect(401)
      .then(res => {
        expect(res.body.token).toBeUndefined()
      })
  })

  it('should able to get current user [/me]', () => {
    return request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body.email).toEqual(john.email)
      })
  })
})
