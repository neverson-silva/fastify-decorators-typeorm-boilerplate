import { targetConstructorToSchema } from 'class-validator-jsonschema'
import { FastifySwaggerSchema } from '../types/schema'

export function getSwaggerSchema(
  schema?: FastifySwaggerSchema
): Record<any, any> | null {
  if (!schema) {
    return null
  }

  const query = schema.query && targetConstructorToSchema(schema.query as any)
  const body = schema.body && targetConstructorToSchema(schema.body as any)
  const params =
    schema.params && targetConstructorToSchema(schema.params as any)
  const headers =
    schema.headers && targetConstructorToSchema(schema.headers as any)

  let response: any

  if (schema.response) {
    response = {}
    for (const [code, value] of Object.entries(schema.response)) {
      response[Number(code)] = {
        description: value.description,
        ...(['number', 'string', 'array', 'boolean'].includes(
          value.type as string
        )
          ? { type: value.type }
          : targetConstructorToSchema(value.type as any)),
      }
    }
  }

  const schemaDefined = { ...schema }

  if (query) {
    schemaDefined.query = query
  }
  if (body) {
    schemaDefined.body = body
  }
  if (response) {
    schemaDefined.response = response
  }

  if (params) {
    schemaDefined.params = params
  }

  if (headers) {
    schemaDefined.headers = headers
  }
  return schemaDefined
}
