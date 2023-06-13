/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import 'reflect-metadata'
import { FastifySwaggerSchema } from '../types/schema'
import { HttpStatus } from './http-status.enum'

/**
 * Decorator para marcar uma classe como Controller.
 * @param params - O caminho do prefixo ou um objeto com o caminho e a versão.
 */
export function Controller(
  params: string | { path: string; version?: number }
): ClassDecorator {
  if (typeof params === 'object') {
    return function (target: any, propertyKey?: string | symbol) {
      Reflect.defineMetadata(
        'prefix',
        { prefix: params.path, version: params.version },
        target,
        propertyKey
      )
    }
  }
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('prefix', { prefix: params }, target, propertyKey)
  }
}

/**
 * Decorator para marcar um método como rota GET.
 * @param url - Opcional. O caminho da rota.
 */
export function Get(url = ''): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('method', 'GET', target, propertyKey)
    Reflect.defineMetadata('url', url, target, propertyKey)
  }
}

/**
 * Decorator para marcar um método como rota POST.
 * @param url - Opcional. O caminho da rota.
 */
export function Post(url = ''): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('method', 'POST', target, propertyKey)
    Reflect.defineMetadata('url', url, target, propertyKey)
  }
}

/**
 * Decorator para marcar um método como rota PUT.
 * @param url - Opcional. O caminho da rota.
 */
export function Put(url = ''): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('method', 'PUT', target, propertyKey)
    Reflect.defineMetadata('url', url, target, propertyKey)
  }
}

/**
 * Decorator para marcar um método como rota DELETE.
 * @param url - Opcional. O caminho da rota.
 */
export function Delete(url = ''): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('method', 'DELETE', target, propertyKey)
    Reflect.defineMetadata('url', url, target, propertyKey)
  }
}

/**
 * Decorator para marcar um método como rota PATCH.
 * @param url - Opcional. O caminho da rota.
 */
export function Patch(url = ''): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('method', 'PATCH', target, propertyKey)
    Reflect.defineMetadata('url', url, target, propertyKey)
  }
}

/**
 * Decorator para definir o código HTTP da resposta de um método.
 * @param code - O código HTTP da resposta.
 */
export function HttpCode(code: HttpStatus): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return function (target: any, propertyKey?: string | symbol) {
    Reflect.defineMetadata('httpCode', code, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como corpo da requisição.
 * @param propertyName - Opcional. O nome do parâmetro.
 */
export function Body(propertyName = ''): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params = Reflect.getMetadata('bodyParams', target, propertyKey) || {}
    params[parameterIndex] = propertyName
    Reflect.defineMetadata('bodyParams', params, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como parâmetro da rota.
 * @param propertyName - O nome do parâmetro.
 */
export function Param(propertyName: string): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params = Reflect.getMetadata('paramNames', target, propertyKey) || {}
    params[parameterIndex] = propertyName
    Reflect.defineMetadata('paramNames', params, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como parâmetro de consulta (query) da rota.
 * @param propertyName - Opcional. O nome do parâmetro.
 */
export function Query(propertyName = ''): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params = Reflect.getMetadata('queryParams', target, propertyKey) || {}
    params[parameterIndex] = propertyName
    Reflect.defineMetadata('queryParams', params, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como resposta da rota.
 */
export function Response(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params = Reflect.getMetadata('response', target, propertyKey) || {}
    params[parameterIndex] = true
    Reflect.defineMetadata('response', params, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como objeto de requisição.
 */
export function Request(): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params = Reflect.getMetadata('request', target, propertyKey) || {}
    params[parameterIndex] = true
    Reflect.defineMetadata('request', params, target, propertyKey)
  }
}

/**
 * Decorator para marcar um parâmetro como injeção de dependência.
 * @param parameters - Opcional. Um objeto com as propriedades "instance" e "scoped".
 */
export function Inject(
  parameters?: { instance: any; scoped: true } | any
): ParameterDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const params =
      Reflect.getMetadata('dependencyInjection', target, propertyKey) || {}
    params[parameterIndex] = {
      instance: parameters?.instance ?? parameters,
      scoped: parameters?.scoped,
    }
    Reflect.defineMetadata('dependencyInjection', params, target, propertyKey)
  }
}

/**
 * Decorator para adicionar informações Swagger a um método.
 * @param schema - O esquema Swagger.
 */
export function Swagger(schema: FastifySwaggerSchema): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol): void {
    Reflect.defineMetadata('swagger', schema, target, propertyKey)
  }
}

/**
 * Decorator para adicionar tags de uso ao Swagger.
 * @param tags - As tags a serem usadas.
 */
export function ApiUseTags(...tags: string[]): ClassDecorator {
  return function (target: any, propertyKey?: string | symbol): void {
    Reflect.defineMetadata('apiUseTags', tags, target, propertyKey)
  }
}

/**
 * Decorator para adicionar headers à rota.
 * @param headers - Os headers a serem adicionados.
 */
export function Headers(headers: Record<string, any>): MethodDecorator {
  return function (target: any, propertyKey?: string | symbol): void {
    Reflect.defineMetadata('headers', headers, target, propertyKey)
  }
}

/**
 * Decorator para obter um header à requisição.
 * @param header - O nome do header.
 */
export function Header(header: string): ParameterDecorator {
  return function (
    target: any,
    propertyKey?: string | symbol,
    parameterIndex: number
  ): void {
    const params = Reflect.getMetadata('header', target, propertyKey) || {}
    params[parameterIndex] = header
    Reflect.defineMetadata('header', params, target, propertyKey)
  }
}
