import { Logger } from '@/infra/handlers/logger.handler'
import { HttpClient } from '@/infra/interfaces/http'
import { CoinsRepository } from '@/infra/interfaces/repository'
import { CoinGeckoRepository } from '@/infra/repositories/coingecko.repository'
import { UserRepository } from '@/infra/repositories/user.repository'
import { FastifyInstance } from 'fastify'
import { ModuleRegistry } from 'singleton-module-registry'
import { apiCoinGecko } from './api'

export const registry = new ModuleRegistry()

export const setupRegistry = (_: FastifyInstance) => {
  registry.registerModule(HttpClient.name, apiCoinGecko)
  registry.registerModule(Logger.name, new Logger())
  registry.registerModule(UserRepository.name, UserRepository.build())
  registry.registerModule(CoinsRepository.name, CoinGeckoRepository.build())
}
