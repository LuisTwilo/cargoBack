import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;
}
