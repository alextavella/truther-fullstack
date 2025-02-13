import { client, db } from '@/infra/db'
import { users } from './schema'

async function seed() {
  await db.delete(users)
  await db.insert(users).values([
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: 'admin',
    },
  ])
}

seed().then(() => {
  console.log('🌱 Database seeded successfully!')
  client.end()
})
