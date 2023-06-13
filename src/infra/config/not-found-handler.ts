import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { HttpStatus } from '@routing'

export const setupNotFoundHanler = (app: FastifyInstance) => {
  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.status(HttpStatus.NOT_FOUND).send({
      message: 'A rota solicitada não foi encontrada',
      description: '',
      validations: ['Não encontrado'],
    })
  })
}
