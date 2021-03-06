module.exports = (app) => {
  const db = app.get('db')
  const { users } = db
  const module = {}

  // Create
  module.create = async (row) => {
    if (!row) throw new Error('No row data given')
    delete row.id
    return users.save(row)
  }

  // Get all
  module.get = async () => users.find()

  // Get one
  module.getOne = async (id) => users.findOne({ id })
  module.getOneByEmail = async (email) => users.findOne({ email })

  return module
}
