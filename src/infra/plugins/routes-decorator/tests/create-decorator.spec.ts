import Fastify, { FastifyInstance } from 'fastify'
import path from 'path'
import { routesDecorator } from '../createDecorator'
import { ControllerMock } from './mock.controller'

describe('Plugin Routes Decorator', () => {
  let fastify: FastifyInstance

  const controllersPath = path.resolve(__dirname)
  const suffixes = ['controller']
  const mockController = new ControllerMock()

  beforeAll(() => {
    fastify = Fastify() // Cria uma nova instância do Fastify antes de todos os testes
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    routesDecorator({ controllersPath, suffixes })(fastify, {}, () => {})
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(async () => {
    await fastify.close() // Encerra a instância do Fastify após todos os testes
  })

  test('Register routes', () => {
    // Verifica se as rotas estão registradas corretamente no Fastify
    expect(fastify.hasRoute({ method: 'GET', url: '/v1/route' })).toBeTruthy()
    expect(fastify.hasRoute({ method: 'POST', url: '/v1/route' })).toBeTruthy()
    expect(fastify.hasRoute({ method: 'PUT', url: '/v1/route' })).toBeTruthy()
    // Adicione mais asserções conforme necessário
  })

  test('Test route behavior', async () => {
    jest.spyOn(mockController, 'getV1Route')

    // Simula uma requisição GET para uma rota específica
    const response = await fastify.inject({
      method: 'GET',
      url: '/v1/route',
    })

    // Verifica se a rota foi manipulada corretamente e se a resposta está correta
    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ message: 'Test response' })
  })
})
