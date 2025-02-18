import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z
      .string()
      .email('E-mail must be valid')
      .min(6, 'E-mail must be at least 6 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .required()
