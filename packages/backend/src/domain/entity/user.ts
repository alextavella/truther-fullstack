import type { userInsertSchema, userSelectSchema } from '@/db/schema'
import crypto from 'node:crypto'
import { z } from 'zod'

export type User = z.infer<typeof userSelectSchema>
export type NewUser = z.infer<typeof userInsertSchema>

const salt = crypto.randomBytes(32).toString('hex')

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
