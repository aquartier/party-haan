exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    email: {
      type: 'varchar(255)',
      notNull: true
    },
    password: {
      type: 'varchar(72)',
      notNull: true
    },
    firstname: {
      type: 'varchar(255)',
      notNull: true
    },
    lastname: {
      type: 'varchar(255)',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
  pgm.createIndex('users', 'id')
}

exports.down = pgm => {}
