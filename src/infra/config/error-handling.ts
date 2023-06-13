import { HttpException } from '@infra/exceptions/http.exception'
import { ValitationException } from '@infra/plugins/routes-decorator/exceptions/validation.exceptions'
import { HttpStatus } from '@routing'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const setupErrorHandling = (app: FastifyInstance) => {
  app.setErrorHandler(function (
    error: any,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    if (error instanceof HttpException) {
      return reply.status(error.httpStatusCode).send({
        message: error.message,
        data: error.body,
        description: error.description,
        validations: [],
      })
    } else if (error instanceof ValitationException) {
      return reply.status(HttpStatus.BAD_REQUEST).send({
        message: error.message,
        description: '',
        data: {},
        validations: error.valitations,
      })
    } else {
      console.error(error.message, error)
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Erro inesperado. Tente novamente mais tarde',
        description: 'Erro inesperado. Tente novamente mais tarde',
      })
    }
  })
}
