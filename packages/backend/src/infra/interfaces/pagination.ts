import { z } from 'zod'

export const paginationQuerySchema = z.object({
  page: z.number().min(1, 'Page must be greater than 0').optional().default(1),
  pageSize: z
    .number()
    .min(10, 'Page must be greater or equal to 10')
    .optional()
    .default(10),
})

export const paginationResultSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
})

export type Pagination<T = any> = {
  items: T[]
  pagination: PaginationResult
}

export type PaginationQuery = z.infer<typeof paginationQuerySchema>
export type PaginationResult = z.infer<typeof paginationResultSchema>
export type PaginationRequest<T = any> = Partial<T> & PaginationQuery

export type PaginationOptions = {
  page: number
  pageSize: number
}
