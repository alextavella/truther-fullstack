import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      email: string
      name: string
      role: string
      sub: number
      iat: number
      exp: number
    }
  }
}
