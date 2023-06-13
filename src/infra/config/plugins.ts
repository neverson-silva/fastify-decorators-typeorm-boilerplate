import cors from '@fastify/cors'
import formBody from '@fastify/formbody'
import helmet from '@fastify/helmet'
import multipart from '@fastify/multipart'
import { FastifyInstance } from 'fastify'

export const setupPlugins = async (app: FastifyInstance) => {
  await app.register(cors)
  await app.register(helmet)
  //https://github.com/fastify/fastify-formbody
  await app.register(formBody)

  //https://github.com/fastify/fastify-multipart
  await app.register(multipart, {
    limits: {
      fieldNameSize: 100,
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 1000000, // For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs,
    },
  })
}
