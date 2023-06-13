import { getSwaggerSchema } from './utils/get-swagger-schema'
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from 'fastify'
import { readdirSync, statSync } from 'fs'
import { extname, join, resolve } from 'path'
import 'reflect-metadata'
import { resolveParams } from './utils/resolve-params'

import chalk from 'chalk'
import { verifyIsAuth, verifyIsAuthorized } from '@auth'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RouteOptionsWithParams extends RouteOptions {
  routeParams?: string[]
}

async function registerControllers(
  fastify: FastifyInstance,
  controllerPath: string,
  suffixes: string[]
) {
  let files
  try {
    files = readdirSync(controllerPath)
  } catch (e: any) {
    console.warn(chalk.yellow('Nenhuma rota registrada ainda'))
    return
  }

  for (const file of files) {
    const filePath = join(controllerPath, file)

    const fileStats = statSync(filePath)
    if (fileStats.isDirectory()) {
      registerControllers(fastify, filePath, suffixes)
    } else {
      const fileExtension = extname(file)
      const fileNameWithoutExtension = file.slice(0, -fileExtension.length)

      if (
        suffixes.some((suffix) => fileNameWithoutExtension.endsWith(suffix)) &&
        ['.js', '.ts'].includes(fileExtension)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const controller = require(resolve(filePath))

        const ControllerClass =
          controller?.default ?? Object.values(controller)[0]

        if (ControllerClass && typeof ControllerClass === 'function') {
          const controllerInstance = new ControllerClass()

          const { prefix, version } = Reflect.getMetadata(
            'prefix',
            ControllerClass
          )

          const fullPrefix = `${version ? `/v${version}` : ''}/${prefix}`
            .replace(/^\/+/, '/')
            .replace(/\/{2,}/g, '/')

          const routes = Object.getOwnPropertyNames(ControllerClass.prototype)

          for (const route of routes.filter((r) => r !== 'constructor')) {
            const routeOptions: RouteOptionsWithParams =
              fastify.options as unknown as RouteOptionsWithParams

            const method: HttpMethod = Reflect.getMetadata(
              'method',
              controllerInstance,
              route
            )

            const url: string = (
              Reflect.getMetadata('url', controllerInstance, route) ?? ''
            ).replace(/^(\/)?(.*)$/, '/$2')

            const httpCode: number =
              Reflect.getMetadata('httpCode', controllerInstance, route) || 200

            let uri = `${fullPrefix}${url}`
              .replace(/^\/+/, '/')
              .replace(/\/{2,}/g, '/')
              .replace(/\/$/, '')

            if (uri === '') {
              uri = '/'
            }

            if (
              routeOptions &&
              method &&
              url &&
              !fastify.hasRoute({
                method: method,
                url: uri,
              })
            ) {
              const { schema, ...otherOptions } = routeOptions

              const swaggerSchema = getSwaggerSchema(
                Reflect.getMetadata('swagger', controllerInstance, route)
              )

              if (swaggerSchema) {
                const tags = Reflect.getMetadata('apiUseTags', ControllerClass)
                swaggerSchema.tags = tags ?? swaggerSchema?.tags
              }

              const responseHeaders = Reflect.getMetadata(
                'headers',
                controllerInstance,
                route
              )
              const message =
                chalk.yellow('Mapped route: ') +
                chalk.cyan(method.toUpperCase()) +
                chalk.gray(' | ') +
                chalk.green(uri)

              console.log(message)

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              fastify[method.toLowerCase()](
                uri,
                {
                  ...otherOptions,
                  schema: swaggerSchema ?? schema,
                },
                async (request: FastifyRequest, reply: FastifyReply) => {
                  if (fastify.config.ENABLE_AUTHENTICATION) {
                    await verifyIsAuth({
                      request: request,
                      controller: ControllerClass,
                      controllerInstance: controllerInstance,
                      method: route,
                    })
                  }

                  if (fastify.config.ENABLE_AUTHORIZATION) {
                    verifyIsAuthorized({
                      request: request,
                      controller: controllerInstance,
                      method: route,
                      controllerInstance: controllerInstance,
                    })
                  }
                  const resolvedParameters = await resolveParams(
                    request,
                    reply,
                    controllerInstance,
                    route
                  )

                  const result = await controllerInstance[route].apply(
                    controllerInstance,
                    [...resolvedParameters]
                  )

                  if (responseHeaders) {
                    return reply
                      .code(httpCode)
                      .headers(responseHeaders)
                      .send(result)
                  }
                  return reply.code(httpCode).send(result)
                }
              )
            }
          }
        }
      }
    }
  }
}

export function routesDecorator({
  controllersPath,
  suffixes = ['controller'],
}: {
  controllersPath: string
  suffixes: string[]
}): (fastify: FastifyInstance, opts: any, next: () => void) => void {
  return (fastify: FastifyInstance, _opts: any, next: () => void) => {
    registerControllers(fastify, controllersPath, suffixes)
    next()
  }
}
