export enum EAvailableRequestDecorator {
  QUERY = 'query',
  BODY = 'body',
  PARAMS = 'params',
  HEADER = 'header',
  DEPENDENCIES = 'dependencies',
  RESPONSE = 'response',
  REQUEST = 'request',
}

export type RequestDecoratorDefinition = `${EAvailableRequestDecorator}` // this equals 'foo' | 'bar'
