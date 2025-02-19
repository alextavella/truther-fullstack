import { env } from '@/config/env'
import type { userEntitySchema } from '@/infra/db/schema'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { z } from 'zod'
import type { Auth } from './auth'

// Types
export type User = z.infer<typeof userEntitySchema>
export type UserKeys = keyof User
export type UserRoles = 'customer' | 'admin'
export type NewUser = Omit<User, 'id'>
export type EditUser = Omit<User, 'id'>
export type ListUser = Omit<User, 'password'>
export type GetUser = Pick<User, 'email' | 'password'>

export type AuthUser = Pick<User, 'name' | 'email' | 'role'>
export type AuthToken = AuthUser & {
  sub: string
}
export type AuthResult = {
  user: User
  auth: Auth
}

// Implementation
export class UserEntity {
  static readonly secret: string = env.AUTH_SECRET

  static newUser(user: NewUser): NewUser {
    const hashPassword = this.generatePassword(user.password)
    return { ...user, password: hashPassword.hash }
  }

  static editUser(id: number, user: EditUser): User {
    const hashPassword = this.generatePassword(user.password)
    return { ...user, id, password: hashPassword.hash }
  }

  static authUser(user: User, password: string): AuthResult | null {
    if (!this.validPassword(password, user.password)) return null
    const access_token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.role,
        sub: user.id,
      },
      this.secret,
      { expiresIn: '1h' },
    )
    return {
      user,
      auth: {
        access_token: access_token,
        uid: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }

  private static generatePassword(password: string) {
    const genHash = crypto
      .pbkdf2Sync(password, this.secret, 10000, 64, 'sha512')
      .toString('hex')
    return {
      salt: this.secret,
      hash: genHash,
    }
  }

  private static validPassword(password: string, hash: string) {
    const checkHash = crypto
      .pbkdf2Sync(password, this.secret, 10000, 64, 'sha512')
      .toString('hex')
    return hash === checkHash
  }

  static verifySessionToken(access_token: string) {
    try {
      jwt.verify(access_token, this.secret)
      return true
    } catch (error) {
      return false
    }
  }
}
