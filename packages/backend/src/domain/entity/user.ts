import { userRoles, userRolesDefault } from '@/db/schema'
import crypto from 'node:crypto'
import { z } from 'zod'

// Schema
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(userRoles).default(userRolesDefault).optional(),
})

// Types
export type User = z.infer<typeof userSchema>
export type NewUser = Omit<User, 'id'>

// Config
const salt = crypto.randomBytes(32).toString('hex')

// Implementation
export class UserEntity {
  static newUser(user: NewUser): NewUser {
    const hashPassword = this.generatePassword(user.password)
    return { ...user, password: hashPassword.hash }
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
