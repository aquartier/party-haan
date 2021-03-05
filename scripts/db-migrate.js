#!/usr/bin/env node
const migrate = require('node-pg-migrate')
require('dotenv').config()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const databaseUrl = process.env.DATABASE_URL
const direction = 'up'
const dir = './migrations'
const migrationsTable = 'migrations'

function main() {
  console.log("Running the migrations...")
  return migrate.default({
    databaseUrl,
    migrationsTable,
    direction,
    dir
  })
}

if (require.main === module) {
  main()
} else {
  module.exports = main
}
