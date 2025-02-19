import { userRoles } from '@/infra/db/schema'
import { z } from 'zod'

export const authSchema = z.object({
  access_token: z.string(),
  uid: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(userRoles).optional().default('customer'),
})

export type Auth = z.infer<typeof authSchema>
