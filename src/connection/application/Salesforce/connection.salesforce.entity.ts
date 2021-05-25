import { FlowEntity } from 'src/integration/model/flow.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Connection } from '../../model/connection';

@Entity()
export class SalesforceConnection extends Connection {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  _id: number;

  @Column()
  name: string;

  @Column()
  clientId: string;

  @Column({ unique: true })
  refresh_token?: string;

  @Column()
  instance_url?: string;

  @OneToMany(() => FlowEntity, (flow) => flow.souerceConnection)
  flows: FlowEntity[];
}
