import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number

  @Column({ name: 'email' })
  login: string
}
