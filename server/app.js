require('dotenv').config()

const express = require("express")
const path = require("path")
const logger = require('morgan')
const passport = require('passport')
const createError = require('http-errors')

const auth = require('./routes/auth')
const parties = require('./routes/parties')

const port = process.env.PORT || 5000

const app = async () => {
  const app = express()

  const { db } = await require('./db.js')()
  app.set('db', db)

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(express.static(path.join(__dirname, "../build")))

    // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
  })

  passport.use(require('./models/auth/local')(app))
  passport.use(require('./models/auth/jwt')(app))

  app.get('/', (req, res) => res.json({ status: 'ok' }))
  app.use('/auth', auth(app))
  app.use('/parties', parties(app))

  app.use((req, res, next) => {
    next(createError(404))
  })

  return app
}

if (require.main === module) {
  app().then(app => {
    app.listen(port, () => { console.log(`Server started on port ${port}`)})
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
} else {
  module.exports = app
}
