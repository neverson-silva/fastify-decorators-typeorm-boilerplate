import { DataSource } from 'typeorm'
import { connectionOptions, ConnectionOptionsType } from './config'

export let datasource: DataSource

export const connectToDataBase = async (options: ConnectionOptionsType) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  datasource = new DataSource(connectionOptions(options))
  await datasource
    .initialize()
    .then(() => console.log('Conectado no banco de dados'))
    .catch((err) => {
      console.error('Erro ao conectar ao banco de dados:', err)
      process.exit(1)
    })
}
