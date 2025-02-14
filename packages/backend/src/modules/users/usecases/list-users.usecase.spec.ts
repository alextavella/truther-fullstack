import { UserEntity } from '@/domain/entity/user'
import type { IUserRepository } from '@/infra/repositories/user.repository'
import { FakeUserRepository } from '@/tests/fakes/fake-users.repository'
import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListUserUseCase, type IListUserUseCase } from './list-users.usecase'

const customer = UserEntity.newUser({
  name: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'customer',
})

const admin = UserEntity.newUser({
  name: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'admin',
})

describe(ListUserUseCase.name, () => {
  let sut: IListUserUseCase
  let usersRepository: IUserRepository

  beforeEach(async () => {
    usersRepository = new FakeUserRepository()
    sut = new ListUserUseCase(usersRepository)
  })

  it('should list users by name', async () => {
    // Arrange
    await usersRepository.create(customer)
    await usersRepository.create(admin)
    // Act
    const result = await sut.execute({
      name: customer.name,
      page: 1,
      pageSize: 10,
    })
    // Assert
    expect(result.items).toHaveLength(1)
    expect(result.items[0].name).toEqual(customer.name)
  })

  it('should list users by email', async () => {
    // Arrange
    await usersRepository.create(customer)
    await usersRepository.create(admin)
    // Act
    const result = await sut.execute({
      email: customer.email,
      page: 1,
      pageSize: 10,
    })
    // Assert
    expect(result.items).toHaveLength(1)
    expect(result.items[0].email).toEqual(customer.email)
  })

  it('should list users by role', async () => {
    // Arrange
    await usersRepository.create(customer)
    await usersRepository.create(admin)
    // Act
    const result = await sut.execute({
      role: 'customer',
      page: 1,
      pageSize: 10,
    })
    // Assert
    expect(result.items).toHaveLength(1)
    expect(result.items[0].role).toEqual(customer.role)
  })

  it('should an empty list when not exists users', async () => {
    // Arrange
    // Act
    const result = await sut.execute({
      name: customer.name,
      page: 1,
      pageSize: 10,
    })
    // Assert
    expect(result.items).toHaveLength(0)
    expect(result.pagination.page).toEqual(1)
    expect(result.pagination.pageCount).toEqual(0)
    expect(result.pagination.total).toEqual(0)
  })
})
