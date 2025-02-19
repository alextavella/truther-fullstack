import type { FastifyReply, FastifyRequest } from 'fastify'
import { Unauthorized } from 'http-errors'

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify().catch(() => {
      throw Unauthorized('User not authenticated')
    })
  } catch (err) {
    reply.send(err)
  }
}
