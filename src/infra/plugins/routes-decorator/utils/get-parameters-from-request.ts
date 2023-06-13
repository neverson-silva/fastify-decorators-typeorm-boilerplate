import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { FastifyRequest } from 'fastify'
import { ValitationException } from '../exceptions/validation.exceptions'
import { getAllValidationErrors } from './get-all-validations-errors'

const PRIMITIVE_TYPES = {
  Number: true,
  String: true,
  Boolean: true,
  Array: true,
}

export async function getParametersFromRequest(
  request: FastifyRequest,
  paramType: any,
  origin: 'query' | 'body' | 'params',
  propertyName?: string
): Promise<any> {
  const requestParams: any = propertyName
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      request[origin]?.[propertyName]
    : request[origin]

  if (requestParams) {
    if (typeof paramType === 'function' && paramType.name in PRIMITIVE_TYPES) {
      return requestParams
    } else {
      const transformedData = plainToInstance(paramType, requestParams, {
        ignoreDecorators: true,
        enableImplicitConversion: true,
      })
      const errors = await validate(transformedData)
      if (errors.length > 0) {
        const [message, validations] = getAllValidationErrors(errors)

        throw new ValitationException(message, validations)
      }
      return transformedData
    }
  }
  return undefined
}
