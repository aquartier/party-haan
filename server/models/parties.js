module.exports = (app) => {
  const db = app.get('db')
  const { parties, users_parties } = db
  const module = {}

  // Create
  module.create = async (user, row) => {
    delete row.id
    const party = await parties.join('users_parties')
      .insert({
        ...row,
        users_parties: [{
          party_id: undefined,
          is_owner: true,
          user_id: user.id
        }]
      })
    return module.getOne(party.id)
  }

  // Get all
  module.get = async () => parties.join({
    users_parties: {
      type: 'LEFT OUTER',
      relation: 'users_parties',
      on: { party_id: 'id' },
      omit: true
    },
    users: {
      type: 'LEFT OUTER',
      relation: 'users',
      on: { id: 'users_parties.user_id' },
      omit: false
    }
  }).find({}, {
    order: [{
      field: 'created_at',
      direction: 'desc'
    }]
  })

  // Add user
  module.addUser = async (user, id) => {
    await users_parties.insert({
      party_id: id,
      is_owner: false,
      user_id: user.id
    })
    return module.getOne(id)
  }

  // Get one
  module.getOne = async (id) => parties.join({
    users_parties: {
      type: 'LEFT OUTER',
      relation: 'users_parties',
      on: { party_id: 'id' },
      omit: true
    },
    users: {
      type: 'LEFT OUTER',
      relation: 'users',
      on: { id: 'users_parties.user_id' },
      omit: false
    }
  }).find({ id }, {
    single: true,
    order: [{
      field: 'created_at',
      direction: 'desc'
    }]
  })

  return module
}
