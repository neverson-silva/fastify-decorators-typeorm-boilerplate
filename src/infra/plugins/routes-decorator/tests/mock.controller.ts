import { Controller, Get, Post, Put } from '@routes/decorators'

@Controller({ path: '', version: 1 })
export class ControllerMock {
  @Get('/route')
  async getV1Route() {
    return { message: 'Test response' }
  }

  @Post('/route')
  async postV1Route() {
    return { message: 'POST /v1/route' }
  }

  @Put('/route')
  async getV2Route() {
    return { message: 'PUT /v1/route' }
  }
}
