const Router = require('express-promise-router')
const _ = require('lodash')
const Parties = require('../models/parties')
const auth = require('../models/auth/helpers')

module.exports = (app) => {
  const router = Router()
  const parties = Parties(app)

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await parties.create(req.user, _.pick(req.body, 'name', 'detail', 'size', 'price'))
    res.json(data)
  })

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await parties.get()
    res.json(data)
  })

  router.post('/:id(\\d+)/join', auth.authenticate, async (req, res) => {
    const data = await parties.addUser(req.user, req.params.id)
    res.json(data)
  })

  // Get one
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await parties.getOne(req.params.id)
    res.json(data)
  })

  return router
}
