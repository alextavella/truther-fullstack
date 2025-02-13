import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './.migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
})
