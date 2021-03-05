const massive = require('massive')

module.exports = async () => {
  const db = await massive(process.env.DATABASE_URL || "postgres:///party_haan")
  return { db }
}
