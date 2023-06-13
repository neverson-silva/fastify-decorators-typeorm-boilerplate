import { datasource } from '@infra/database/connection'
import { Repository } from 'typeorm'
import { Usuario } from './usuario.entity'
import { Controller, Get, HttpCode, HttpStatus, Post, Response } from '@routing'
import { Public } from '@auth'
import { FastifyReply } from 'fastify'

@Controller('/')
export default class HomeHandler {
  private readonly usuarioRepository: Repository<Usuario> =
    datasource.manager.getRepository(Usuario)

  @Public()
  @Post()
  async index(@Response() response: FastifyReply): Promise<string> {
    const usuario = await this.usuarioRepository.findOneBy({ id: 1 })
    return response.jwtSign({ usuario })
  }
  @Get()
  @HttpCode(HttpStatus.CREATED)
  async home(): Promise<any> {
    const usuario = await this.usuarioRepository.findOneBy({ id: 1 })

    return usuario
  }
}
