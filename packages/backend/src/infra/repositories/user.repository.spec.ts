import { UserEntity } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserRepository } from './user.repository'

describe(UserRepository.name, () => {
  let sut: IUserRepository

  beforeEach(() => {
    sut = new UserRepository()
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
})
