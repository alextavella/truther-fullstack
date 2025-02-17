import { UserEntity, type UserKeys } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeLogger } from '@/tests/fakes/fake-logger'
import { faker } from '@faker-js/faker'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { ILogger } from '../interfaces/logger'
import type { PaginationOptions } from '../interfaces/pagination'
import { UserRepository } from './user.repository'

describe(UserRepository.name, () => {
  let sut: IUserRepository
  let logger: ILogger

  beforeEach(() => {
    logger = new FakeLogger()
    sut = new UserRepository(logger)
  })

  describe('create', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const user = UserEntity.newUser({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'customer',
      })
      // Act
      const result = await sut.create(user)
      // Assert
      expect(result.id).toBeDefined()
      expect(result.name).toEqual(user.name)
      expect(result.email).toEqual(user.email)
      expect(result.password).toBeDefined()
    })
  })

  describe('update', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const user = UserEntity.newUser({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'customer',
      })
      const created = await sut.create(user)
      const update = UserEntity.editUser(created.id, {
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'admin',
      })
      // Act
      const result = await sut.update(created.id, update)
      // Assert
      expect(result.id).toBeDefined()
      expect(result.name).toEqual(update.name)
      expect(result.email).toEqual(update.email)
      expect(result.role).toEqual(update.role)
      expect(result.password).toBeDefined()
    })
  })

  describe('findByID', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const user = UserEntity.newUser({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'customer',
      })
      // Act
      const created = await sut.create(user)
      const result = await sut.findByID(created.id)
      // Assert
      expect(result?.id).toEqual(created.id)
      expect(result?.name).toEqual(user.name)
      expect(result?.email).toEqual(user.email)
      expect(result?.role).toEqual(user.role)
      expect(result?.password).toBeDefined()
    })
  })

  describe('findByEmail', () => {
    it('should call methods with correct params', async () => {
      // Arrange
      const user = UserEntity.newUser({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'customer',
      })
      // Act
      const created = await sut.create(user)
      const result = await sut.findByEmail(user.email)
      // Assert
      expect(result?.id).toEqual(created.id)
      expect(result?.name).toEqual(user.name)
      expect(result?.email).toEqual(user.email)
      expect(result?.role).toEqual(user.role)
      expect(result?.password).toBeDefined()
    })
  })

  describe('findAll', () => {
    const options: PaginationOptions = { page: 1, pageSize: 10 }
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })

    beforeAll(async () => {
      await sut.create(user)
    })

    it('should filter users by name', async () => {
      // Arrange
      const filter = new Map<UserKeys, any>()
      filter.set('name', user.name)
      // Act
      const result = await sut.findAll(filter, options)
      // Assert
      expect(result.items).toHaveLength(1)
    })

    it('should filter users by email', async () => {
      // Arrange
      const filter = new Map<UserKeys, any>()
      filter.set('email', user.email)
      // Act
      const result = await sut.findAll(filter, options)
      // Assert
      expect(result.items).toHaveLength(1)
    })

    it('should filter users by role', async () => {
      // Arrange
      const filter = new Map<UserKeys, any>()
      filter.set('role', user.role)
      // Act
      const result = await sut.findAll(filter, options)
      // Assert
      expect(result.items.length).toBeGreaterThanOrEqual(1)
    })

    it('should not return any user', async () => {
      // Arrange
      const filter = new Map<UserKeys, any>()
      filter.set('name', faker.internet.username())
      filter.set('email', faker.internet.email())
      filter.set('role', '-')
      // Act
      const result = await sut.findAll(filter, options)
      // Assert
      expect(result.items).toHaveLength(0)
    })
  })
})
