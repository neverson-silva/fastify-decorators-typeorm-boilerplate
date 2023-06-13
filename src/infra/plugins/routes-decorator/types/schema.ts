import { HttpStatus } from '@routes/http-status.enum'

type SchemaObject = {
  [key: string]: any
}

type SchemaProperties =
  | {
      [key: string]: SchemaObject
    }
  | string
  | number
  | object

type SchemaDefinition =
  | {
      type: 'object' | 'string' | 'array' | 'number'
    }
  | string
  | number
  | object

type SchemaResponse = {
  [key in HttpStatus | 'default']?: {
    type?: string | object
    description?: string
  }
}

export type FastifySwaggerSchema = {
  /**
   * Descrição do endpoint
   */
  description?: string
  /**
   * Tags a serem adicionados no swagger
   */
  tags?: string[]

  /**
   * Resumo da operação
   */
  summary?: string

  /**
   * Body da requisição
   */
  body?: SchemaDefinition

  /**
   * Route Params
   */
  params?:
    | SchemaDefinition
    | {
        type: 'string'
        properties: Record<
          string,
          {
            type: string
            description?: string
          }
        >
      }
  /**
   * Query String
   */
  query?: SchemaProperties

  /**
   * Headers
   */
  headers?: SchemaProperties

  /**
   * Response
   */
  response?: SchemaResponse
}
