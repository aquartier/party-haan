exports.up = pgm => {
   pgm.createTable('parties', {
    id: 'id',
    name: {
      type: 'text',
      notNull: true
    },
    detail: {
      type: 'text',
      notNull: true
    },
    size: {
      type: 'integer',
      notNull: true
    },
    price: {
      type: 'integer',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = pgm => {}
