'use strict'

const db = require('../server/db')
const {User, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({nickname: 'katey', email: 'katey@email.com', password: '123'}),
    User.create({nickname: 'tyler', email: 'tyler@email.com', password: '123'})
  ])

  const orders = await Promise.all([
    Order.create({symbol: 'msft', quantity: 1, price: '100', userId: 1})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed