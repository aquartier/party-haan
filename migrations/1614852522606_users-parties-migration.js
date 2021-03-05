exports.up = pgm => {
  pgm.createTable('users_parties', {
    id: 'id',
    is_owner: {
      type: 'boolean',
      default: false,
      notNull: true
    },
    user_id: {
      type: 'integer',
      references: 'users',
      notNull: true
    },
    party_id: {
      type: 'integer',
      references: 'parties',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('users_parties', 'user_id')
  pgm.createIndex('users_parties', 'party_id')
}

exports.down = pgm => {}
