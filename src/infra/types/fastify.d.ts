import { FastifyInstance as Instance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance extends Instance {
    config: {
      // this should be same as the confKey in options
      PORT: number
      JWT_SECRET?: string
      DB_HOST?: string
      DB_PORT?: number
      DB_USER?: string
      DB_PASSWORD?: string
      DB_NAME?: string
      ENABLE_AUTHENTICATION: boolean
      ENABLE_AUTHORIZATION: boolean
    }
  }
}
