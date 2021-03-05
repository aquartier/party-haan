#!/usr/bin/env node
const faker = require('faker')
const _ = require('lodash')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config()

const DB = require('../server/db')
const auth = require('../server/models/auth/helpers')

const tableParties = 'parties'
const tableUsers = 'users'
const tableUsersParties = 'users_parties'

const createParty = (db, table, user) => db[table].join(tableUsersParties).insert({
  name: faker.commerce.productName(),
  detail: faker.commerce.productDescription(),
  size: _.random(2, 10),
  price: _.random(100, 2000),
  users_parties: [{
    party_id: undefined,
    is_owner: true,
    user_id: user.id
  }]
})

function openDB() {
  console.log('Connecting to the DB...')
  return DB()
}

function seedUsers(db) {
  console.log('Seeding [users]...')
  const users = [{
    email: 'john@party.haan',
    password: auth.createHash('password'),
    firstname: 'John',
    lastname: 'Doe'
  },
  {
    email: 'joe@party.haan',
    password: auth.createHash('password'),
    firstname: 'Joe',
    lastname: 'Doe'
  },
  {
    email: 'jane@party.haan',
    password: auth.createHash('password'),
    firstname: 'Joe',
    lastname: 'Doe'
  }]

  return db[tableUsers].insert(users)
}

function seedParties(db, users) {
  console.log('Seeding [parties]...')
  const records = []
  try {
    for (let i = 1; i <= 5; i += 1) {
      const user = users[i % users.length]
      records.push(createParty(db, tableParties, user))
    }
  } catch (e) {
    console.error(e)
  }

  return Promise.all(records)
}

function seed(db) {
  // Run seeding functions
  return seedUsers(db)
    .then(users => seedParties(db, users))
    .then(() => {
      console.log('Successfully completed the seeding process')
    })
}

function clearDB(db) {
  return db[tableUsersParties].destroy({})
    .then(() => db.query('ALTER SEQUENCE users_parties_id_seq RESTART WITH 1'))
    .then(() => db[tableParties].destroy({}))
    .then(() => db.query('ALTER SEQUENCE parties_id_seq RESTART WITH 1'))
    .then(() => db[tableUsers].destroy({}))
    .then(() => db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1'))
    .then(() => {
      console.log('Successfully cleared the DB')
    })
}

function closeDB(db) {
  return db.instance.$pool.end()
}

if (require.main === module) {
  openDB().then(db => seed(db.db))
} else {
  module.exports = {
    openDB, seed, clearDB, closeDB
  }
}
