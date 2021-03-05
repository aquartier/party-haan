const LocalStrategy = require('passport-local').Strategy
const _ = require('lodash')
const auth = require('./helpers')

module.exports = (app) => {
  const users = require('../users')(app)
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await users.getOneByEmail(email)
      if (!user || !auth.checkPassword(password, user.password)) {
        done(null, false, { message: 'Incorrect email or password.' })
        return
      }
      done(null, _.omit(user, 'password'), {})
    } catch (err) {
      done(err)
    }
  })
}
