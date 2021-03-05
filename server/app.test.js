const request = require('supertest')
const migrate = require('../scripts/db-migrate')
const seed = require('../scripts/db-seed')
const App = require('./app')

describe('web server', () => {
  let app = {}

  beforeAll(async () => {
    await migrate()
    const { db } = await seed.openDB()
    await seed.clearDB(db)
    await seed.seed(db)
    await seed.closeDB(db)
  })

  beforeAll(async () => {
    app = await App()
  })

  it('should contains a DB instance', () => {
    const db = app.get('db')
    return expect(typeof db).toBe('object')
  })

  it('should respond 200 on the root path', () => {
    request(app).get('/').expect(200)
  })
})
