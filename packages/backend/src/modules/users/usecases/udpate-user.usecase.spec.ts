import { UserEntity } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeUserRepository } from '@/tests/fakes/fake-users.repository'
import { faker } from '@faker-js/faker'
import { BadRequest } from 'http-errors'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  UpdateUserUseCase,
  type IUpdateUserUseCase,
} from './update-user.usecase'

describe(UpdateUserUseCase.name, () => {
  let sut: IUpdateUserUseCase
  let usersRepository: IUserRepository

  beforeEach(() => {
    usersRepository = new FakeUserRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should call methods with correct params', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    const userCreated = await usersRepository.create(user)
    const update = UserEntity.editUser(userCreated.id, {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin',
    })
    // Act
    const result = await sut.execute(update)
    // Assert
    expect(result.id).toEqual(userCreated.id)
    expect(result.name).toEqual(update.name)
    expect(result.email).toEqual(update.email)
    expect(result.role).toEqual(update.role)
    expect(result.password).toBeDefined()
  })

  it('should throw 400 when user not exists', async () => {
    // Arrange
    const userId = faker.number.int()
    const update = UserEntity.editUser(userId, {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin',
    })
    // Act
    // #
    // Assert
    await expect(sut.execute(update)).rejects.toThrowError(BadRequest)
  })
})
