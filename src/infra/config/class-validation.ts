import { instanceToPlain } from 'class-transformer'
import { FastifyInstance } from 'fastify'

/**
 * Desabilitando default ajv schema validation
 * @param app
 */
export const setupClassValidation = (app: FastifyInstance) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  app.setValidatorCompiler(({ _schema, _method, _url, _httpPart }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  })

  app.setSerializerCompiler(() => {
    return (data) => JSON.stringify(instanceToPlain(data))
  })
}
