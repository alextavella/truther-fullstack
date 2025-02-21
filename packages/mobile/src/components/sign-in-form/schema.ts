import { z } from 'zod'

export const signInSchema = z
  .object({
    email: z
      .string()
      .email('E-mail must be valid')
      .min(6, 'E-mail must be at least 6 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .required()
