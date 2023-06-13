import { FastifyInstance } from 'fastify'

export const setupSwagger = (app: FastifyInstance) => {
  app.register(import('@fastify/swagger'))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  app.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'My APP',
        // description: 'My FirstApp Backend Documentation description',
        // version: '0.1.0',
        // termsOfService: 'https://mywebsite.io/tos',
        // contact: {
        //   name: 'John Doe',
        //   url: 'https://www.johndoe.com',
        //   email: 'john.doe@email.com',
        // },
      },
      externalDocs: {
        url: 'https://www.johndoe.com/api/',
        description: 'Find more info here',
      },
      host: '127.0.0.1:9009',
      basePath: '',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    uiConfig: {
      docExpansion: 'none', // expand/not all the documentations none|list|full
      deepLinking: true,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  })
  app.ready().then(() => {
    app.swagger()
  })
}
