import { UserRepository } from '@/infra/repositories/user.repository'
import { FastifyInstance } from 'fastify'
import { ModuleRegistry } from 'singleton-module-registry'

export const registry = new ModuleRegistry()

export const setupRegistry = (_: FastifyInstance) => {
  registry.registerModule(UserRepository.name, new UserRepository())
}
