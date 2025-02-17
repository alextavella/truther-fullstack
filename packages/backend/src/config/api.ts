import axios from 'axios'
import { env } from './env'

export const apiCoinGecko = axios.create({
  baseURL: env.COINGECKO_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': env.COINGECKO_TOKEN,
  },
})
