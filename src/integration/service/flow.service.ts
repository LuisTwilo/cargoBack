import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesforceAPI } from 'src/connection/application/Salesforce/salesforceApiService';
import { ConnectionService } from 'src/connection/service/connection.service';
import { Repository } from 'typeorm';
import { FlowDTO } from '../dto/flow.dto';
import { FlowEntity } from '../model/flow.entity';
import { IntegrationEntity } from '../model/integration.entity';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(FlowEntity)
    private readonly flowRepository: Repository<FlowEntity>,
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>,
    private readonly connectionService: ConnectionService,
    private readonly salesforceApi: SalesforceAPI,
  ) {}

  async createflow(flow: FlowDTO) {
    const integration = await this.getIntegrationById(flow.integrationId);
    const sourceConnection = await this.connectionService.getOneConnection(
      flow.sourceConnection,
    );
    const destinationConnection = await this.connectionService.getOneConnection(
      flow.destinationConnection,
    );
    const newFlow = new FlowEntity();
    newFlow.name = flow.name;
    newFlow.description = flow.description;
    newFlow.integration = integration;
    newFlow.souerceConnection = sourceConnection;
    newFlow.destinationConnection = destinationConnection;
    return await this.flowRepository.save(newFlow);
  }

  async getAllFlows(integration) {
    return await this.flowRepository.find({
      where: { integration },
    });
  }

  async getIntegrationById(id: number) {
    return await this.integrationRepository.findOne({ id });
  }

  async getSalesforceObjects(connectionId: number) {
    let instanceUrl = await (
      await this.connectionService.getOneConnection(connectionId)
    ).instance_url;

    let bearer = await this.connectionService.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );

    return await this.salesforceApi.getListofAvailableObjects(
      instanceUrl,
      bearer.access_token,
    );
  }

  async getObjectFields(object: string, connectionId: number) {
    let instanceUrl = await (
      await this.connectionService.getOneConnection(connectionId)
    ).instance_url;

    let bearer = await this.connectionService.getSalesforeBearerTokenWithRefresToken(
      connectionId,
    );

    return await this.salesforceApi.getObjectFields(
      bearer.access_token,
      object,
      instanceUrl,
    );
  }
}
