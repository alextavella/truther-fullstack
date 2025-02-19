import { UserEntity, type AuthToken } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeUserRepository } from '@/tests/fakes/fake-users.repository'
import { faker } from '@faker-js/faker'
import { InternalServerError, UnprocessableEntity } from 'http-errors'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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
    const payload = UserEntity.newUser(user)
    const created = await usersRepository.create(user)
    // Act
    const findByEmailSpy = vi
      .spyOn(usersRepository, 'findByEmail')
      .mockResolvedValue(void 0)
    const createUserSpy = vi
      .spyOn(usersRepository, 'create')
      .mockResolvedValue(created)
    const result = await sut.execute(user)
    const decoded = jwt.decode(result.access_token) as AuthToken
    // Assert
    expect(findByEmailSpy).toHaveBeenCalledWith(user.email)
    expect(createUserSpy).toHaveBeenCalledWith(payload)
    expect(result.uid).toEqual(created.id)
    expect(result.name).toEqual(decoded.name)
    expect(result.email).toEqual(decoded.email)
    expect(result.role).toEqual(decoded.role)
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

  it('should throw 500 when failed on creating user', async () => {
    // Arrange
    const user = UserEntity.newUser({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'customer',
    })
    // Act
    vi.spyOn(usersRepository, 'create').mockRejectedValue(new Error())
    // Assert
    await expect(sut.execute(user)).rejects.toThrowError(InternalServerError)
  })
})
