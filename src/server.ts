import { setupNotFoundHanler } from '@infra/config/not-found-handler'
import { setupPlugins } from '@infra/config/plugins'
import { setupRouteDecorations } from '@infra/config/route-decorations'
import { setupSwagger } from '@infra/config/swagger'
import { connectToDataBase } from '@infra/database/connection'
import fastify from 'fastify'
import chalk from 'chalk'
import { setupEnvironment } from '@infra/config/environment'
import jwt from '@fastify/jwt'

const app = fastify({
  logger: false,
})

const startApp = async () => {
  await setupEnvironment(app)

  await connectToDataBase({ config: app.config })

  if (app.config.ENABLE_AUTHENTICATION) {
    await app.register(jwt, {
      secret: app.config.JWT_SECRET ?? '',
      sign: {
        expiresIn: '1D',
      },
    })
  }

  await setupRouteDecorations(app)

  await setupPlugins(app)

  await setupNotFoundHanler(app)

  await setupSwagger(app)

  await app.listen({ port: app.config.PORT })

  console.log(chalk.green('Server running at port 9090'))
}

startApp()
