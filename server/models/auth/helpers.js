const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const passport = require('passport')


const createHash = (password, salt) => {
  const s = salt || crypto.randomBytes(4).toString('hex')
  const hmac = crypto.createHmac('sha256', s)
  return s + hmac.update(password).digest('hex')
}

const checkPassword = (plain, hashed) => {
  const salt = hashed.slice(0, 8)
  return createHash(plain, salt) === hashed
}

const signUser = (user) => (
  jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET)
)

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    req.logIn(user, { session: false }, (err2) => {
      if (err2) {
        res.send(err2)
      } else {
        next()
      }
    })
  })(req, res)
}

module.exports = { createHash, checkPassword, signUser, authenticate }
