import type { userEntitySchema } from '@/infra/db/schema'
import crypto from 'node:crypto'
import { z } from 'zod'

// Types
export type User = z.infer<typeof userEntitySchema>
export type NewUser = Omit<User, 'id'>
export type EditUser = Omit<User, 'id'>

// Config
const salt = crypto.randomBytes(32).toString('hex')

// Implementation
export class UserEntity {
  static newUser(user: NewUser): NewUser {
    const hashPassword = this.generatePassword(user.password)
    return { ...user, password: hashPassword.hash }
  }

  static editUser(id: number, user: EditUser): User {
    const hashPassword = this.generatePassword(user.password)
    return { ...user, id, password: hashPassword.hash }
  }

  private static generatePassword(password: string) {
    const genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex')
    return {
      salt: salt,
      hash: genHash,
    }
  }

  private static validPassword(password: string, hash: string) {
    const checkHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex')
    return hash === checkHash
  }
}
