import { UserEntity } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeUserRepository } from '@/tests/fakes/fake-users.repository'
import { faker } from '@faker-js/faker'
import { UnprocessableEntity } from 'http-errors'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  CreateUserUseCase,
  type ICreateUserUseCase,
} from './create-user.usecase'

describe(CreateUserUseCase.name, () => {
  let sut: ICreateUserUseCase
  let usersRepository: IUserRepository

  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should call methods with correct params', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    // Act
    const result = await sut.execute(user)
    // Assert
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(user.name)
    expect(result.email).toEqual(user.email)
    expect(result.password).toBeDefined()
  })

  it('should throw 422 when user already exists', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    // Act
    await usersRepository.create(user)
    // Assert
    await expect(sut.execute(user)).rejects.toThrowError(UnprocessableEntity)
  })
})
