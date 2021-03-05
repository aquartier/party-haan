const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const _ = require('lodash')

module.exports = (app) => {
  const users = require('../users')(app)
  return new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await users.getOne(jwtPayload.id)
      done(null, _.omit(user, 'password'))
    } catch (err) {
      done(err)
    }
  })
}
