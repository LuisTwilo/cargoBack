import { SalesforceConnection } from 'src/connection/application/Salesforce/connection.salesforce.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IntegrationEntity } from './integration.entity';

@Entity()
export class FlowEntity {
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

  @ManyToOne(() => IntegrationEntity, (integration) => integration.flows)
  @JoinColumn({ name: 'integrationId' })
  integration: IntegrationEntity;

  @ManyToOne(() => SalesforceConnection, (connection) => connection.flows)
  @JoinColumn({ name: 'sourceConnection' })
  souerceConnection: SalesforceConnection;

  @ManyToOne(() => SalesforceConnection, (connection) => connection.flows)
  @JoinColumn({ name: 'destinationConnection' })
  destinationConnection: SalesforceConnection;
}
