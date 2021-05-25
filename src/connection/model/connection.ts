import { FlowEntity } from 'src/integration/model/flow.entity';

export abstract class Connection {
  name: string;
  flows: FlowEntity[];
}
