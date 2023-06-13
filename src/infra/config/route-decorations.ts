import { routesDecorator } from '@infra/plugins/routes-decorator/createDecorator'
import { FastifyInstance } from 'fastify'
import path from 'path'
import { setupClassValidation } from './class-validation'
import { setupErrorHandling } from './error-handling'

export const setupRouteDecorations = async (app: FastifyInstance) => {
  const controllerPath = path.resolve(__dirname, './../../app')
  setupErrorHandling(app)
  setupClassValidation(app)
  await app.register(
    routesDecorator({
      controllersPath: controllerPath,
      suffixes: ['controller', 'handler'],
    })
  )
}
