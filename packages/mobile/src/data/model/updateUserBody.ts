/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Truther API
 * Truther API Documentation
 * OpenAPI spec version: 1.0.0
 */
import type { UpdateUserBodyRole } from './updateUserBodyRole'

export type UpdateUserBody = {
  name: string
  email: string
  password: string
  /** @nullable */
  role?: UpdateUserBodyRole
}
