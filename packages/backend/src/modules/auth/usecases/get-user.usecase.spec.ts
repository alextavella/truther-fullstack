import { UserEntity, type AuthToken } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeUserRepository } from '@/tests/fakes/fake-users.repository'
import { faker } from '@faker-js/faker'
import { BadRequest } from 'http-errors'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserUseCase, type IGetUserUseCase } from './get-user.usecase'

describe(GetUserUseCase.name, () => {
  let sut: IGetUserUseCase
  let usersRepository: IUserRepository

  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new GetUserUseCase(usersRepository)
  })

  it('should call methods with correct params', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    const credentials = {
      email: user.email,
      password: user.password,
    }
    // Act
    const created = await usersRepository.create(user)
    const result = await sut.execute(credentials)
    const decoded = jwt.decode(result.access_token) as AuthToken
    // Assert
    expect(decoded.sub).toEqual(created.id)
    expect(decoded.name).toEqual(user.name)
    expect(decoded.email).toEqual(user.email)
    expect(decoded.role).toEqual(user.role)
  })

  it('should throw 400 when email invalid', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    const credentials = {
      email: faker.internet.email(),
      password: user.password,
    }
    // Act
    await usersRepository.create(user)
    // Assert
    await expect(sut.execute(credentials)).rejects.toThrowError(BadRequest)
  })

  it('should throw 400 when password invalid', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    const credentials = {
      email: user.email,
      password: faker.internet.password(),
    }
    // Act
    await usersRepository.create(user)
    // Assert
    await expect(sut.execute(credentials)).rejects.toThrowError(BadRequest)
  })
})
