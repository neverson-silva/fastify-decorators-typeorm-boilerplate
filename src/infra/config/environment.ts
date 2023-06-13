import { FastifyInstance } from 'fastify'
import path from 'path'

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 9090,
    },
    JWT_SECRET: {
      type: 'string',
    },
    DB_HOST: {
      type: 'string',
      default: 'localhost',
    },
    DB_PORT: {
      type: 'number',
      default: 5432,
    },
    DB_USER: {
      type: 'string',
      default: 'root',
    },
    DB_PASSWORD: {
      type: 'string',
      default: 'root',
    },
    DB_NAME: {
      type: 'string',
      default: 'test',
    },
    ENABLE_AUTHENTICATION: {
      type: 'boolean',
      default: false,
    },
    ENABLE_AUTHORIZATION: {
      type: 'boolean',
      default: false,
    },
  },
}

const envFile = path.join(
  path.resolve(__dirname, './../../../'),
  `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
)
const options = {
  schema,
  dotenv: {
    path: envFile,
    debug: true,
  },
}
export const setupEnvironment = async (app: FastifyInstance) => {
  await app.register(import('@fastify/env'), options)
}
