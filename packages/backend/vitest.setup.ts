import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './src/db'

async function setup() {
  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './.migrations' })
  console.log('Migrations completed.')
}

setup().catch(err => {
  console.error('Error running migrations:', err)
  process.exit(1)
})
