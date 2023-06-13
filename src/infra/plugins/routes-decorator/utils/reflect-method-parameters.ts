import {
  EAvailableRequestDecorator,
  RequestDecoratorDefinition,
} from '../types/decorators'

export interface ReflectedParams {
  type: any
  metadata: {
    decorator?: RequestDecoratorDefinition
    value?: any
  }
}
const retrieveDecorators = (target: any, methodName: string) => {
  const decoratorKeys = [
    'bodyParams',
    'queryParams',
    'paramNames',
    'dependencyInjection',
    'request',
    'response',
    'header',
  ]

  return decoratorKeys.reduce((decorators, key) => {
    decorators[key] = Reflect.getMetadata(key, target, methodName)
    return decorators
  }, {} as Record<string, any>)
}

export function reflectMethodParameters(
  target: any,
  methodName: string
): Record<number, ReflectedParams> {
  const paramTypes =
    Reflect.getMetadata('design:paramtypes', target, methodName) || []

  const decorations = retrieveDecorators(target, methodName)

  const reflectedParams: Record<number, ReflectedParams> = {}

  paramTypes.forEach((paramType: any, index: number) => {
    let metadata: {
      decorator?: RequestDecoratorDefinition
      value?: any
    } = {}

    if (decorations?.body && index in decorations.body) {
      metadata = {
        decorator: EAvailableRequestDecorator.BODY,
        value: decorations.body[index],
      }
    } else if (decorations?.query && index in decorations.query) {
      metadata = {
        decorator: EAvailableRequestDecorator.QUERY,
        value: decorations.query[index],
      }
    } else if (decorations?.params && index in decorations.params) {
      metadata = {
        decorator: EAvailableRequestDecorator.PARAMS,
        value: decorations.params[index],
      }
    } else if (decorations?.dependencies && index in decorations.dependencies) {
      metadata = {
        decorator: EAvailableRequestDecorator.DEPENDENCIES,
        value: decorations.dependencies[index],
      }
    } else if (decorations?.request && index in decorations.request) {
      metadata = {
        decorator: EAvailableRequestDecorator.REQUEST,
        value: decorations.request[index],
      }
    } else if (decorations?.response && index in decorations.response) {
      metadata = {
        decorator: EAvailableRequestDecorator.RESPONSE,
        value: decorations.response[index],
      }
    } else if (decorations?.header && index in decorations.header) {
      metadata = {
        decorator: EAvailableRequestDecorator.HEADER,
        value: decorations.header[index],
      }
    }

    reflectedParams[index] = {
      type: paramType,
      metadata,
    }
  })

  return reflectedParams
}
