import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlowEntity } from './flow.entity';

@Entity()
export class IntegrationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description?: string;

  @CreateDateColumn()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @OneToMany(() => FlowEntity, (flow) => flow.integration, { eager: true })
  @JoinColumn()
  flows: FlowEntity[];
}
