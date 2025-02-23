import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().default('3333'),
  AUTH_SECRET: z.string().default('secret'),
  DB_DRIVER: z.string().default('mysql'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('3306'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('root'),
  DB_NAME: z.string().default('truther'),
  COINGECKO_API_URL: z.string(),
  COINGECKO_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
