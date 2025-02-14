import { sql } from 'drizzle-orm'
import type { MySqlSelect } from 'drizzle-orm/mysql-core'
import { db } from '.'
import type { Pagination, PaginationOptions } from '../interfaces/pagination'

export function withPagination<T extends MySqlSelect>(
  qb: T,
  page: number,
  pageSize: number,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize)
}

export async function queryWithCount<T extends MySqlSelect>(
  qb: T,
): Promise<[Awaited<T>, number]> {
  const result = await qb
  // @ts-ignore hack to override internals (not the ideal way)
  qb.config.fields = { count: count() }
  // @ts-ignore
  qb.config.orderBy = []
  const [total] = await qb
  return [result, total.count]
}

export async function paginateQuery<T extends any, Q extends MySqlSelect>(
  query: Q,
  options: PaginationOptions,
): Promise<Pagination<T>> {
  const subQuery = query.as('sub')
  const totalRecordsQuery = db
    .select({ total: sql<number>`count(*)` })
    .from(subQuery)

  const totalRecordsResult = await totalRecordsQuery.execute()
  const totalRecords = Number(totalRecordsResult[0].total)
  const totalPages = Math.ceil(totalRecords / options.pageSize)

  query.limit(options.pageSize).offset((options.page - 1) * options.pageSize)

  const results = (await query.execute()) as T[]

  return {
    items: results,
    pagination: {
      page: options.page,
      pageSize: options.pageSize,
      pageCount: totalPages,
      total: totalRecords,
    },
  }
}
