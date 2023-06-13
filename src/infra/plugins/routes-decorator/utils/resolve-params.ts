import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { EAvailableRequestDecorator } from '../types/decorators'
import { getParametersFromRequest } from './get-parameters-from-request'
import {
  ReflectedParams,
  reflectMethodParameters,
} from './reflect-method-parameters'

export async function resolveParams(
  request: FastifyRequest,
  reply: FastifyReply,
  target: any,
  methodName: string
): Promise<any[]> {
  const resolvedParameters = []
  const parameters: Record<number, ReflectedParams> = reflectMethodParameters(
    target,
    methodName
  )

  for (const [key, value] of Object.entries(parameters)) {
    switch (value?.metadata?.decorator) {
      case EAvailableRequestDecorator.BODY:
      case EAvailableRequestDecorator.QUERY:
        resolvedParameters[Number(key)] = await getParametersFromRequest(
          request,
          value.type,
          value.metadata.decorator,
          value.metadata.value
        )

        break
      case EAvailableRequestDecorator.PARAMS:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        resolvedParameters[Number(key)] = request.params?.[value.metadata.value]
        break
      case EAvailableRequestDecorator.DEPENDENCIES:
        // eslint-disable-next-line no-case-declarations
        const type = value.metadata.value?.instance ?? value.type
        // eslint-disable-next-line no-case-declarations
        const scoped = value.metadata.value?.scoped

        if (!container.isRegistered(type)) {
          if (scoped) {
            container.registerInstance(type, type)
          } else {
            container.registerSingleton(type, type)
          }
        }
        resolvedParameters[Number(key)] = container.resolve(type)
        break
      case EAvailableRequestDecorator.RESPONSE:
        resolvedParameters[Number(key)] = reply
        break
      case EAvailableRequestDecorator.REQUEST:
        resolvedParameters[Number(key)] = request
        break
      case EAvailableRequestDecorator.HEADER:
        resolvedParameters[Number(key)] = request.headers[value.metadata.value]
        break
      default:
        break
    }
  }

  return resolvedParameters
}
