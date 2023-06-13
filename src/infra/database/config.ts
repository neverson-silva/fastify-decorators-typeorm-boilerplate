import { DataSourceOptions } from 'typeorm'
import { FastifyInstance } from 'fastify'

export type ConnectionOptionsType = Pick<FastifyInstance, 'config'> &
  Partial<DataSourceOptions>

export const connectionOptions = ({
  config: { DB_NAME, DB_USER, DB_PORT, DB_HOST, DB_PASSWORD },
  ...options
}: ConnectionOptionsType) => ({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD ?? '',
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    sslmode: 'requires',
  },
  ...options,
})
