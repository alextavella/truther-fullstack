import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './.migrations',
  schema: './src/infra/db/schema/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: `${process.env.DB_DRIVER}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
})
